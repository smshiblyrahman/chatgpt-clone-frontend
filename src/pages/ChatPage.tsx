import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Message type definition
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am ugpt, your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Keep this dependency as we need to scroll when messages change

  // Auto-focus input on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Simulate AI responses
  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I assist you today?";
    }

    if (lowerInput.includes('help')) {
      return "I'm here to help! You can ask me questions, request information, or just chat.";
    }

    if (lowerInput.includes('name')) {
      return "I'm ugpt, your friendly AI assistant.";
    }

    if (lowerInput.includes('weather')) {
      return "I don't have real-time access to weather data, but I can help you find weather information if you tell me your location.";
    }

    if (lowerInput.includes('joke')) {
      const jokes = [
        "Why did the AI go to art school? To learn how to draw conclusions!",
        "What do you call an AI that sings? Artificial Harmonies!",
        "Why did the chatbot go to therapy? It had too many interface issues!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    const responses = [
      "That's an interesting point. Can you tell me more about it?",
      "I understand. What else would you like to know?",
      "I'm thinking about what you said. Is there anything specific you're looking for?",
      "Let me process that. Is there something specific you'd like me to help with?",
      "I'm here to assist you with that. What kind of information would be most helpful?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Auto-resize textarea as user types
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Reset height to auto to correctly calculate scroll height
    e.target.style.height = 'auto';
    // Set height to scrollHeight to expand textarea
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  // Handle Enter key to send message (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Log out functionality
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '"Inter", "Open Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      color: '#222',
    }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        backgroundColor: '#f7f7f8',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid #e5e5e5',
      }}>
        {/* New chat button */}
        <button
          onClick={() => {
            setMessages([{
              id: '1',
              role: 'assistant',
              content: 'Hello! I am ugpt, your AI assistant. How can I help you today?',
              timestamp: new Date(),
            }]);
            setInputValue('');
            inputRef.current?.focus();
          }}
          style={{
            padding: '10px 16px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            fontWeight: 500,
          }}
        >
          <span style={{ marginRight: '8px' }}>+</span> New chat
        </button>

        {/* Chat history (for demo just placeholders) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#e5e5e5',
            fontSize: '14px',
          }}>
            Current Chat
          </div>
          <div style={{
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}>
            Previous Chat 1
          </div>
          <div style={{
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}>
            Previous Chat 2
          </div>
        </div>

        {/* User section at bottom */}
        <div style={{
          marginTop: 'auto',
          padding: '10px',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}>
              U
            </div>
            <div style={{ fontSize: '14px' }}>User</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        backgroundColor: '#fff',
      }}>
        {/* Chat messages */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '8px 60px',
                backgroundColor: message.role === 'assistant' ? '#f7f7f8' : 'transparent',
                borderTop: message.role === 'assistant' ? '1px solid #e5e5e5' : 'none',
                borderBottom: message.role === 'assistant' ? '1px solid #e5e5e5' : 'none',
                animation: 'fadeIn 0.5s ease-out',
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: message.role === 'assistant' ? '#000' : '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                flexShrink: 0,
              }}>
                {message.role === 'assistant' ? 'U' : 'Y'}
              </div>

              {/* Message content */}
              <div style={{
                fontSize: '16px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                paddingTop: '8px',
              }}>
                {message.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                padding: '8px 60px',
                backgroundColor: '#f7f7f8',
                borderTop: '1px solid #e5e5e5',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                flexShrink: 0,
              }}>
                U
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#888',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0s',
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#888',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0.2s',
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#888',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0.4s',
                }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          borderTop: '1px solid #e5e5e5',
          padding: '16px',
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#fff',
        }}>
          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '768px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Message ugpt..."
              style={{
                padding: '12px 60px 12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '16px',
                resize: 'none',
                minHeight: '48px',
                maxHeight: '150px',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                transition: 'border-color 0.2s ease',
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              style={{
                position: 'absolute',
                right: '12px',
                bottom: '14px',
                backgroundColor: inputValue.trim() && !isTyping ? '#000' : '#eee',
                color: inputValue.trim() && !isTyping ? '#fff' : '#888',
                border: 'none',
                borderRadius: '4px',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              ↑
            </button>
          </form>
          <div style={{
            fontSize: '12px',
            color: '#888',
            textAlign: 'center',
            marginTop: '8px',
            maxWidth: '768px',
            margin: '8px auto 0',
          }}>
            ugpt can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
          }

          textarea:focus {
            border-color: #000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          button:hover {
            opacity: 0.9;
          }

          button:active {
            transform: scale(0.98);
          }

          /* Mobile responsive styles */
          @media (max-width: 768px) {
            .chat-container {
              flex-direction: column;
            }
            .sidebar {
              width: 100%;
              height: auto;
              min-height: 60px;
            }
            .chat-messages {
              padding: 10px;
            }
            .message {
              padding: 8px 20px;
            }
          }
        `}
      </style>
    </div>
  );
}
