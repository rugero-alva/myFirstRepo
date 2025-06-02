import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupServiceCall } from '../services/authService.js'; // Corrected path

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For success messages
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);

    const userData = {
      fullName,
      email,
      password, // The backend will hash this
      age: age ? parseInt(age) : undefined,
      income: income ? parseInt(income) : undefined,
    };

    try {
      const response = await signupServiceCall(userData);

      if (response.success && response.data) {
        setMessage(response.data.message || 'Signup successful! Please proceed to verify OTP or login.');
        // Navigate to OTP verification page, passing email as state if needed by OTP page
        // Or navigate to login page
        // For now, let's assume OTP is next and OTP page can use the email from context or prompt
        navigate('/otp-verify', { state: { email: userData.email } });
      } else {
        setError(response.error?.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error("Signup page error:", err);
      setError('An unexpected error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="income">Income (Annual):</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
