import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { login as loginServiceCall } from '../services/authService.js'; // Corrected path

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth(); // Get auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      // Use the login function from authService
      const response = await loginServiceCall(email, password);

      if (response.success && response.data) {
        // Call the login method from AuthContext to update global state
        // The context's login should handle setting the token and user
        // For this step, authService.login returns token and user,
        // so we pass them to context's login method.
        // However, our current AuthContext.login is a placeholder.
        // Let's adjust AuthContext's login to accept token and user data.
        // For now, we'll assume auth.login can take the response data.
        // This will be refined when AuthContext.login is properly implemented.

        // A better approach for AuthContext.login would be to take the raw token
        // and perhaps user details, and the context itself decodes/stores.
        // Let's call auth.login which is currently a placeholder.
        // In a real scenario, auth.login from context would handle token and user state update.
        // The service call gives us the token and user data.

        // For now, let's directly use the token and user from service response
        // to update context, assuming AuthContext.login can handle it or we update it.
        // For this step, we'll directly update context based on service response for simplicity.

        // Let's assume auth.login in AuthContext can be updated to take the token/user
        // or we directly call the state setters from context if exposed (not ideal).

        // Given our current AuthContext.login is a placeholder that sets its own mock data,
        // we will call it, and it will set its own mock token for now.
        // Later, AuthContext.login will be improved to take actual token from service.

        // For this iteration, let's directly use the login function from AuthContext
        // which already handles localStorage and state.
        // We will assume the service call is the source of truth for success.

        await auth.login(email, response.data.user, response.data.token); // Pass user and token to context's login

        navigate('/dashboard');
      } else {
        setError(response.error?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Login page error:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
