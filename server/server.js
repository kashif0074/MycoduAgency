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
