import React from 'react';

const pageStyles = {
  padding: '20px',
};

const chatAreaPlaceholderStyles = {
  border: '1px dashed #ccc',
  height: '300px',
  marginBottom: '20px',
  padding: '10px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

const inputAreaPlaceholderStyles = {
  display: 'flex',
  gap: '10px',
};

const inputStyle = {
  flexGrow: 1,
  padding: '10px',
};

const buttonStyle = {
  padding: '10px 15px',
};

const ChatbotPage = () => {
  return (
    <div style={pageStyles}>
      <h1>AI Chatbot</h1>
      <p>Interact with our AI assistant to get help with your banking queries, check balances, and more.</p>

      <div style={{ marginTop: '30px' }}>
        <h3>Chat Window (Placeholder)</h3>
        <div style={chatAreaPlaceholderStyles}>
          {/* Chat messages will appear here */}
          <p style={{ fontStyle: 'italic', color: '#777' }}>Chat history will be displayed here...</p>
        </div>
        <div style={inputAreaPlaceholderStyles}>
          <input type="text" placeholder="Type your message..." style={inputStyle} disabled />
          <button style={buttonStyle} disabled>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
