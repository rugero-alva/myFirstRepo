import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="nav-title">
            Banking App
          </Link>
          <ul className="nav-links">
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/chat">Chatbot</Link></li>
                <li><Link to="/recommendations">Recommendations</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </header>
      <main className="page-container"> {/* Added class for consistent page styling */}
        <Outlet /> {/* Child routes will render here */}
      </main>
      {/* Footer could be added here if needed, inside or outside page-container */}
      {/*
      <footer style={{ textAlign: 'center', padding: '20px 0', marginTop: 'auto', color: '#777' }}>
        <p>© 2023 Banking App</p>
      </footer>
      */}
    </>
  );
};
export default Layout;
