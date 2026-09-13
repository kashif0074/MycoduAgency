import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

type Message = {
  id: string | number;
  text: string;
  sender: "bot" | "user";
};

const INITIAL_MESSAGE: Message = {
  id: "init",
  text: "Hi! 👋 Welcome to Mycodu Agency. How can I help you today with your web, mobile, or design project?",
  sender: "bot",
};

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

  const sendMessage = async () => {
    const messageText = input.trim();
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
          text: data.error || "Sorry, I am having trouble responding right now. Please try again.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botErrorMessage]);
      }
    } catch (error) {
      console.error("Chat API error:", error);
      const botErrorMessage: Message = {
        id: `bot_err_${Date.now()}`,
        text: "Could not connect to the server. Please ensure the backend is running.",
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
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Mycodu AI Chat"
        >
          <span className="chatbot-icon">💬</span>
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
                <h3>Mycodu AI</h3>
                <span>
                  <span className="online-dot"></span>
                  Online
                </span>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                className="reset-chat"
                onClick={handleResetChat}
                title="New Chat Session"
                aria-label="New Chat Session"
              >
                🔄
              </button>
              <button
                className="close-chat"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
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
                  {message.text}
                </div>
              </div>
            ))}

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
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />

            <button
              className="send-button"
              onClick={sendMessage}
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