const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load environment variables relative to this directory
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import schemas
const Contact = require('./models/Contact');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const ChatSession = require('./models/ChatSession');

const app = express();

app.use(cors());
app.use(express.json());

let isDbConnected = false;
let connectionError = null;

// Enforce strict MongoDB connection (Atlas first, fallback to local)
const connectDB = async () => {
  const atlasUri = process.env.MONGODB_URI;
  const localUri = 'mongodb://127.0.0.1:27017/mycodu';
  
  if (atlasUri && !atlasUri.includes('<db_password>')) {
    try {
      console.log('Connecting strictly to MongoDB Atlas...');
      await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 5000 });
      isDbConnected = true;
      connectionError = null;
      console.log('Strict Mode: Connected to MongoDB Atlas');
      return;
    } catch (err) {
      console.error('MongoDB Atlas strict connection failed:', err.message);
      connectionError = err.message;
    }
  }

  try {
    console.log('Strict Mode: Falling back to Local MongoDB (127.0.0.1:27017)...');
    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 3000 });
    isDbConnected = true;
    connectionError = null;
    console.log('Strict Mode: Connected to Local MongoDB');
  } catch (err) {
    console.error('Strict Mode: Local MongoDB connection failed:', err.message);
    connectionError = err.message;
    isDbConnected = false;
    console.error('CRITICAL: Strict Database Mode active. App has no active MongoDB connection.');
  }
};

connectDB();

// Middleware to check database connection status
const checkDbConnection = (req, res, next) => {
  if (!isDbConnected || mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable: MongoDB database is not connected.',
      details: connectionError || 'Could not connect to database host. Check your connection string.'
    });
  }
  next();
};

// --- SYSTEM HEALTH ENDPOINT ---
app.get('/api/status', (req, res) => {
  res.json({
    status: isDbConnected ? 'ONLINE' : 'DATABASE_ERROR',
    database: {
      connected: isDbConnected && mongoose.connection.readyState === 1,
      connectionState: mongoose.connection.readyState,
      error: connectionError
    },
    timestamp: new Date()
  });
});

// --- CONTACT INQUIRIES API ---
app.post('/api/contact', checkDbConnection, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been stored properly in the MongoDB database!' 
    });
  } catch (error) {
    console.error('Error saving contact query:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Mycodu Agency Knowledge Base (Context)
const MYCODU_KNOWLEDGE = `
You are the official AI assistant for Mycodu Agency, a professional web and mobile app development company based in Pakistan/remote.
Here is information about Mycodu Agency:
- Services: Custom Website Development, E-commerce Stores, Frontend & Full-stack Web Apps (React, Next.js, Node.js, ASP.NET Core), Cross-platform Mobile Apps (React Native, Expo), 3D Interactive Web Experiences (Three.js), and UI/UX Design.
- Tech Stack: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, React Native, Python, C# .NET.
- Portfolio Projects: Mycodu Agency platform (3D WebGL), e-commerce analytics dashboards, restaurant mobile apps (Malik Pizza).
- Pricing & Engagement: Custom quotes based on project scope. Typically web projects start around $1,000+ depending on features.
- Goal: Be polite, helpful, concise, and guide potential clients to share their project details, budget, name, and email so the team can prepare a proposal.
`;

// Tool definition for AI Agent function calling (Step 7)
const saveLeadTool = {
  name: 'saveLeadToDatabase',
  description: 'Save the client project lead details into the database once name, email, and project requirements are provided.',
  parameters: {
    type: 'OBJECT',
    properties: {
      name: { type: 'STRING', description: 'The name of the client' },
      email: { type: 'STRING', description: 'The email address of the client' },
      service: { type: 'STRING', description: 'The type of service they need (e.g., E-commerce, Web App, Mobile App, 3D Website)' },
      budget: { type: 'STRING', description: 'Their estimated budget if provided' },
      message: { type: 'STRING', description: 'Summary of project requirements' }
    },
    required: ['name', 'email', 'service']
  }
};

// In-memory fallback stores for when DB is temporarily offline
const memorySessions = new Map();
const fallbackProducts = [
  { name: 'Custom E-Commerce Store', price: 1500, category: 'E-commerce', description: 'Full-stack Next.js and Stripe powered online shop with inventory management and analytics.' },
  { name: 'Corporate Business Website', price: 999, category: 'Web Development', description: 'High-converting responsive 3D Three.js website with CMS integration and SEO optimization.' },
  { name: 'Cross-Platform Mobile App', price: 2500, category: 'Mobile App', description: 'iOS and Android app built with React Native & Expo, including push notifications and backend API.' },
  { name: 'SaaS MVP Platform', price: 3500, category: 'Full-Stack', description: 'Scalable multi-tenant web application with user auth, subscriptions, and custom dashboard.' }
];

// --- CHATBOT API ENDPOINTS (Knowledge Base, Multi-turn Memory, RAG & AI Agent Tools) ---

// Get chat history for a session
app.get('/api/chat/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    let session = null;
    if (isDbConnected && mongoose.connection.readyState === 1) {
      session = await ChatSession.findOne({ sessionId });
    } else {
      session = memorySessions.get(sessionId);
    }

    if (!session) {
      return res.json({ success: true, messages: [], leadInfo: {} });
    }
    res.json({
      success: true,
      sessionId: session.sessionId,
      messages: session.messages || [],
      leadInfo: session.leadInfo || {}
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Chat endpoint with RAG + AI Agent Tools + Multi-turn Memory (Step 6 & 7)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default-session' } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    // 1. RAG: Search products/services based on keywords (DB if available, fallback list otherwise)
    let dbKnowledge = "";
    try {
      const keywords = message
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !['what', 'have', 'with', 'your', 'about', 'this', 'that', 'from', 'they', 'some', 'need', 'want', 'please'].includes(word.toLowerCase()));

      let matchingProducts = [];
      if (isDbConnected && mongoose.connection.readyState === 1) {
        if (keywords.length > 0) {
          const searchQuery = {
            $or: keywords.map(kw => ({
              $or: [
                { name: { $regex: kw, $options: 'i' } },
                { description: { $regex: kw, $options: 'i' } },
                { category: { $regex: kw, $options: 'i' } }
              ]
            }))
          };
          matchingProducts = await Product.find(searchQuery).limit(5);
        }
        if (matchingProducts.length === 0 && /(product|service|catalog|item|price|offer|package)/i.test(message)) {
          matchingProducts = await Product.find().limit(5);
        }
      } else {
        // In-memory fallback RAG search
        if (keywords.length > 0) {
          matchingProducts = fallbackProducts.filter(p =>
            keywords.some(kw =>
              p.name.toLowerCase().includes(kw.toLowerCase()) ||
              p.description.toLowerCase().includes(kw.toLowerCase()) ||
              p.category.toLowerCase().includes(kw.toLowerCase())
            )
          );
        }
        if (matchingProducts.length === 0 && /(product|service|catalog|item|price|offer|package)/i.test(message)) {
          matchingProducts = fallbackProducts;
        }
      }

      if (matchingProducts.length > 0) {
        dbKnowledge = "\n\nLive Database Search Results (Products/Services available at Mycodu):\n" + 
          matchingProducts.map(p => `- ${p.name} (${p.category || 'General'}): $${p.price} - ${p.description || ''}`).join('\n');
      }
    } catch (dbErr) {
      console.error('RAG database search error:', dbErr);
    }

    // 2. Find or create chat session
    let session = null;
    const dbActive = isDbConnected && mongoose.connection.readyState === 1;

    if (dbActive) {
      session = await ChatSession.findOne({ sessionId });
      if (!session) {
        session = new ChatSession({ sessionId, messages: [], leadInfo: {} });
      }
    } else {
      if (memorySessions.has(sessionId)) {
        session = memorySessions.get(sessionId);
      } else {
        session = { sessionId, messages: [], leadInfo: {} };
        memorySessions.set(sessionId, session);
      }
    }

    // 3. Format history for Gemini chat session
    const history = (session.messages || []).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // 4. Combine static knowledge, live RAG data, and agent instructions
    const fullSystemPrompt = MYCODU_KNOWLEDGE + dbKnowledge + 
      "\n\nInstructions: You are the official AI Agent for Mycodu Agency. " +
      "Use the live database search results above when relevant to answer product/pricing questions accurately. " +
      "If the user provides their name, email, and project requirements, invoke the saveLeadToDatabase tool to record their inquiry into the database. " +
      "Keep responses professional, conversational, concise, and helpful.";

    // 5. Initialize chat with Tools and History
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const chat = ai.chats.create({
      model: modelName,
      config: {
        tools: [{ functionDeclarations: [saveLeadTool] }]
      },
      history: [
        {
          role: 'user',
          parts: [{ text: fullSystemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: "Understood! I am the Mycodu AI Agent equipped with live database search and lead-saving tools." }]
        },
        ...history
      ]
    });

    // 6. Send user message to Gemini
    const result = await chat.sendMessage({ message });

    let aiReply = result.text;
    const functionCalls = result.functionCalls;

    // 7. Check if AI Agent triggered a tool call
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'saveLeadToDatabase') {
        const args = call.args || {};

        if (!session.leadInfo) session.leadInfo = {};
        session.leadInfo = {
          name: args.name || session.leadInfo.name,
          email: args.email || session.leadInfo.email,
          service: args.service || session.leadInfo.service,
          budget: args.budget || session.leadInfo.budget
        };

        // Create Contact record if MongoDB is active
        if (dbActive) {
          try {
            await Contact.create({
              name: args.name || 'Anonymous Client',
              email: args.email || 'no-email@provided.com',
              subject: `AI Lead: ${args.service || 'Web/Mobile Project'}`,
              message: `Budget: ${args.budget || 'Not specified'}. Requirements: ${args.message || message}`
            });
          } catch (contactErr) {
            console.error('Error creating Contact lead:', contactErr);
          }
        }

        aiReply = `Thank you ${args.name || ''}! I have successfully recorded your project requirements for ${args.service || 'your project'} and forwarded them to the Mycodu team. Someone will get back to you at ${args.email} shortly.`;
      }
    }

    // Fallback extraction if tool wasn't triggered but email exists
    if (!session.leadInfo) session.leadInfo = {};
    if (message.includes('@') && !session.leadInfo.email) {
      const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) session.leadInfo.email = emailMatch[0];
    }
    const budgetMatch = message.match(/(\$\s*\d+[\d,]*|\d+[\d,]*\s*(usd|dollars|\$)|budget\s*(is|of|:)?\s*[$0-9a-zA-Z\s,-]+)/i);
    if (budgetMatch && !session.leadInfo.budget) {
      session.leadInfo.budget = budgetMatch[0].trim();
    }

    const finalReply = aiReply || "Thanks for reaching out! How else can I assist you with your project today?";

    // 8. Save messages to session
    session.messages.push({ role: 'user', text: message });
    session.messages.push({ role: 'model', text: finalReply });
    if (dbActive && typeof session.save === 'function') {
      await session.save();
    } else {
      memorySessions.set(sessionId, session);
    }

    res.json({ 
      success: true,
      reply: finalReply,
      sessionId,
      leadInfo: session.leadInfo
    });
  } catch (error) {
    console.error('Error with AI Agent & RAG chat:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
});

// Seed endpoint for sample products
app.post('/api/seed', checkDbConnection, async (req, res) => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      const products = await Product.find();
      return res.json({ success: true, message: 'Products already exist in database.', count: existingCount, data: products });
    }

    const sampleProducts = [
      { name: 'Custom E-Commerce Store', price: 1500, category: 'E-commerce', description: 'Full-stack Next.js and Stripe powered online shop with inventory management and analytics.' },
      { name: 'Corporate Business Website', price: 999, category: 'Web Development', description: 'High-converting responsive 3D Three.js website with CMS integration and SEO optimization.' },
      { name: 'Cross-Platform Mobile App', price: 2500, category: 'Mobile App', description: 'iOS and Android app built with React Native & Expo, including push notifications and backend API.' },
      { name: 'SaaS MVP Platform', price: 3500, category: 'Full-Stack', description: 'Scalable multi-tenant web application with user auth, subscriptions, and custom dashboard.' }
    ];

    const inserted = await Product.insertMany(sampleProducts);
    res.status(201).json({ success: true, message: 'Sample products seeded successfully!', data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ==========================================
// --- USERS CRUD ENDPOINTS ---
// ==========================================

// Create User
app.post('/api/users', checkDbConnection, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required.' });
    }
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Email already exists.' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read All Users
app.get('/api/users', checkDbConnection, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read Single User
app.get('/api/users/:id', checkDbConnection, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update User
app.put('/api/users/:id', checkDbConnection, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete User
app.delete('/api/users/:id', checkDbConnection, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// ==========================================
// --- PRODUCTS CRUD ENDPOINTS ---
// ==========================================

// Create Product
app.post('/api/products', checkDbConnection, async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, error: 'Product name and price are required.' });
    }
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read All Products
app.get('/api/products', checkDbConnection, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read Single Product
app.get('/api/products/:id', checkDbConnection, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Product
app.put('/api/products/:id', checkDbConnection, async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Product
app.delete('/api/products/:id', checkDbConnection, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// ==========================================
// --- ORDERS CRUD ENDPOINTS ---
// ==========================================

// Create Order
app.post('/api/orders', checkDbConnection, async (req, res) => {
  try {
    const { userId, products, totalAmount, status } = req.body;
    if (!userId || !products || products.length === 0 || totalAmount === undefined) {
      return res.status(400).json({ success: false, error: 'UserId, products (array), and totalAmount are required.' });
    }
    const newOrder = new Order({ userId, products, totalAmount, status });
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read All Orders (Populated details)
app.get('/api/orders', checkDbConnection, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId')
      .populate('products.productId')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read Single Order
app.get('/api/orders/:id', checkDbConnection, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId')
      .populate('products.productId');
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Order
app.put('/api/orders/:id', checkDbConnection, async (req, res) => {
  try {
    const { status, products, totalAmount } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, products, totalAmount },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Order
app.delete('/api/orders/:id', checkDbConnection, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });
    res.json({ success: true, message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database Connection State: ${isDbConnected ? 'CONNECTED' : 'NOT CONNECTED'}`);
});
