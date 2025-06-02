import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    // 'replace' avoids adding the login page to history if user tries to go back
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child route content
  return <Outlet />;
};

export default ProtectedRoute;
