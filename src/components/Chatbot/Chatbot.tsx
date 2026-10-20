import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

type Message = {
  id: string | number;
  text: string;
  sender: "bot" | "user";
};

const INITIAL_MESSAGE: Message = {
  id: "init",
  text: "Hi! 👋 Welcome to **Mycodu Agency**.\n\nHow can I help you today with your web, mobile, AI, or digital engineering project?",
  sender: "bot",
};

const SUGGESTED_PROMPTS = [
  "💼 What services do you offer?",
  "💰 Can I get a project quote?",
  "🚀 Show me case studies",
  "⚡ What is your tech stack?",
];

// Helper to render basic Markdown elements (bold, lists, linebreaks) cleanly
function renderFormattedText(text: string) {
  // Split by double newline for paragraphs
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((paragraph, pIdx) => {
    // Check if this paragraph is a list
    const lines = paragraph.split('\n');
    const isList = lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- ') || line.trim().match(/^\d+\.\s/));

    if (isList) {
      return (
        <ul key={pIdx} className="chatbot-list">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^[*-]\s+|\d+\.\s+/, '');
            return (
              <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanLine) }} />
            );
          })}
        </ul>
      );
    }

    // Normal paragraph with linebreaks
    const formattedHtml = lines
      .map(line => formatInlineMarkdown(line))
      .join('<br />');

    return (
      <p key={pIdx} className="chatbot-paragraph" dangerouslySetInnerHTML={{ __html: formattedHtml }} />
    );
  });
}

function formatInlineMarkdown(str: string): string {
  // Escape HTML tags to prevent XSS
  let safe = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic *text* or _text_
  safe = safe.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
  // Inline code `code`
  safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');

  return safe;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getApiBaseUrl = () => {
    const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    return import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:5000' : '');
  };

  // 1. Initialize or load sessionId from localStorage
  useEffect(() => {
    let currentSessionId = localStorage.getItem("mycodu_chat_session_id");
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("mycodu_chat_session_id", currentSessionId);
    }
    setSessionId(currentSessionId);

    // Fetch existing messages if session exists
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/chat/history/${currentSessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
            const loaded: Message[] = data.messages.map((m: { role: string; text: string }, idx: number) => ({
              id: `hist_${idx}`,
              text: m.text,
              sender: m.role === "model" ? "bot" : "user",
            }));
            setMessages(loaded);
          }
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    fetchHistory();
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleResetChat = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("mycodu_chat_session_id", newSessionId);
    setSessionId(newSessionId);
    setMessages([INITIAL_MESSAGE]);
  };

  const executeSendMessage = async (textToSend: string) => {
    const messageText = textToSend.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      text: messageText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId || "default-session",
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          text: data.reply,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const botErrorMessage: Message = {
          id: `bot_err_${Date.now()}`,
          text: data.error || "Sorry, I am having trouble responding right now. Please try again in a moment.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botErrorMessage]);
      }
    } catch (error) {
      console.error("Chat API error:", error);
      const botErrorMessage: Message = {
        id: `bot_err_${Date.now()}`,
        text: "⚠️ Could not connect to the backend server. Please verify your internet connection or start the local server with `npm run dev:all`.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      executeSendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Mycodu AI Assistant"
        >
          <span className="chatbot-icon">💬</span>
          <span className="chatbot-badge">AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="bot-avatar">🤖</div>
              <div>
                <h3>Mycodu AI Assistant</h3>
                <span>
                  <span className="online-dot"></span>
                  Online &bull; Live RAG &amp; Lead Agent
                </span>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                className="reset-chat"
                onClick={handleResetChat}
                title="Start New Chat Session"
                aria-label="New Chat Session"
              >
                🔄
              </button>
              <button
                className="close-chat"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender}`}
              >
                {message.sender === "bot" && (
                  <div className="small-avatar">🤖</div>
                )}
                <div className={`message ${message.sender}`}>
                  {message.sender === "bot" ? (
                    renderFormattedText(message.text)
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips (show when only greeting exists or user is idle) */}
            {messages.length <= 2 && !isTyping && (
              <div className="chatbot-chips-container">
                <span className="chips-title">Suggested questions:</span>
                <div className="chips-list">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="suggestion-chip"
                      onClick={() => executeSendMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="message-row bot">
                <div className="small-avatar">🤖</div>
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask about web, mobile, AI, pricing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />

            <button
              className="send-button"
              onClick={() => executeSendMessage(input)}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              style={{ opacity: isTyping || !input.trim() ? 0.6 : 1 }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;