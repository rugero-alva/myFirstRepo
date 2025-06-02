import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Could store user object
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Persist token
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  // Placeholder login function (to be integrated with authService)
  const login = async (email, user, token) => { // Modified to accept user and token directly
    console.log('AuthContext.login called with user and token from service');
    localStorage.setItem('authToken', token);
    setToken(token);
    setCurrentUser(user); // User object from authService
    setIsAuthenticated(true);
    return { success: true, user: user }; // Return the user from service
  };

  // Placeholder signup function
  const signup = async (userData) => {
    console.log('AuthContext.signup called (placeholder)', userData);
    // After successful signup and OTP verification, user might be logged in
    // or redirected to login.
    return { success: true };
  };

  const logout = () => {
    console.log('AuthContext.logout called');
    localStorage.removeItem('authToken');
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    token,
    isAuthenticated,
    login, // This will be replaced by more robust logic later
    signup, // This will be replaced
    logout,
    // verifyOtp, // etc.
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
