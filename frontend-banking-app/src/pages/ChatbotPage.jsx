import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // To get token
import { postChatMessage } from '../services/chatService.js';

const pageStyles = {
  padding: '20px',
  maxWidth: '700px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
};

const chatWindowStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  height: '400px',
  padding: '15px',
  overflowY: 'auto',
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f9f9f9',
};

const messageStyles = {
  padding: '8px 12px',
  borderRadius: '15px',
  marginBottom: '10px',
  maxWidth: '70%',
  wordWrap: 'break-word',
};

const userMessageStyles = {
  ...messageStyles,
  backgroundColor: '#007bff',
  color: 'white',
  alignSelf: 'flex-end',
  marginLeft: 'auto',
};

const botMessageStyles = {
  ...messageStyles,
  backgroundColor: '#e9ecef',
  color: '#333',
  alignSelf: 'flex-start',
  marginRight: 'auto',
};

const inputAreaStyles = {
  display: 'flex',
  gap: '10px',
};

const inputStyle = {
  flexGrow: 1,
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 'initial', text: 'Hello! I am your banking assistant. How can I help you today?', sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = useAuth(); // Get auth context for token
  const chatWindowRef = useRef(null); // For auto-scrolling

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(), // Simple ID generation
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError('');

    try {
      // Pass the token from AuthContext to the service
      const response = await postChatMessage(userMessage.text, auth.token);
      if (response.success && response.data) {
        const botMessage = {
          id: (Date.now() + 1).toString(), // Simple ID generation
          text: response.data.bot_response,
          sender: 'bot',
          timestamp: new Date(response.data.timestamp),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        setError(response.error?.message || 'Failed to get response from bot.');
        // Optionally add the error as a system message in chat
        // setMessages(prev => [...prev, {id: 'err', text: 'Error from bot.', sender: 'system'}]);
      }
    } catch (err) {
      console.error("Chatbot page error:", err);
      setError('An error occurred while communicating with the chatbot.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={pageStyles}>
      <h1>AI Chatbot</h1>
      <div style={chatWindowStyles} ref={chatWindowRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={msg.sender === 'user' ? userMessageStyles : botMessageStyles}
          >
            {msg.text}
            {/* Optionally display timestamp: <div style={{fontSize: '0.7em'}}>{new Date(msg.timestamp).toLocaleTimeString()}</div> */}
          </div>
        ))}
        {isLoading && <div style={{ ...botMessageStyles, fontStyle: 'italic' }}>Bot is typing...</div>}
      </div>
      <form onSubmit={handleSendMessage} style={inputAreaStyles}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={inputStyle}
          disabled={isLoading}
        />
        <button type="submit" style={isLoading ? disabledButtonStyle : buttonStyle} disabled={isLoading}>
          Send
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
    </div>
  );
};

export default ChatbotPage;
