import React from 'react';
import { Link } from 'react-router-dom';

// Basic styling for the dashboard (can be moved to a CSS file later)
const dashboardStyles = {
  padding: '20px',
};

const welcomeSectionStyles = {
  marginBottom: '30px',
};

const navigationSectionStyles = {
  display: 'flex',
  gap: '20px',
};

const navLinkStyles = {
  padding: '10px 15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  textDecoration: 'none',
  color: '#333',
  backgroundColor: '#f9f9f9',
};

const DashboardPage = () => {
  // Placeholder for user's name - will be dynamic later
  const userName = "User";

  return (
    <div style={dashboardStyles}>
      <section style={welcomeSectionStyles}>
        <h1>Welcome, {userName}!</h1>
        <p>This is your central hub for managing your banking activities.</p>
      </section>

      <section>
        <h2>Quick Access</h2>
        <div style={navigationSectionStyles}>
          <Link to="/chat" style={navLinkStyles}>
            AI Chatbot
          </Link>
          <Link to="/recommendations" style={navLinkStyles}>
            View Recommendations
          </Link>
        </div>
      </section>

      {/* Placeholder for future summary info */}
      <section style={{ marginTop: '40px' }}>
        <h3>Account Summary (Placeholder)</h3>
        <p>Details about your accounts will appear here.</p>
      </section>
    </div>
  );
};

export default DashboardPage;
