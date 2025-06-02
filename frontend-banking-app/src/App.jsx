import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Assuming Layout is for overall page structure
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import RecommendationsPage from './pages/RecommendationsPage';
import './assets/global.css';

function App() {
  return (
    <Routes>
      {/* Routes accessible by everyone, often wrapped in a common Layout */}
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp-verify" element={<OTPVerificationPage />} />
        {/* Default route: redirect to login, or dashboard if logged in (handled by ProtectedRoute/logic) */}
        <Route index element={<Navigate to="/login" replace />} />
      </Route>

      {/* Protected Routes - also wrapped by Layout for consistent UI */}
      {/* Or, if Layout should only apply to non-protected, adjust accordingly */}
      {/* Assuming Layout is general and ProtectedRoute handles auth logic */}
      <Route element={<Layout />}> {/* Or a different Layout for authenticated users if needed */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          {/* Add other protected routes here */}
        </Route>
      </Route>

      {/* Fallback for unmatched routes, could be inside a Layout too */}
      <Route path="*" element={
        <Layout> {/* Optional: wrap 404 in Layout */}
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
