import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { verifyOtp as verifyOtpServiceCall, sendOtp as sendOtpServiceCall } from '../services/authService.js'; // Corrected path

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      // Optionally, you could automatically trigger a sendOtp here if desired,
      // or assume it was sent by the signup process.
      // For now, we'll just set the email and provide a resend option.
      setMessage(`OTP was sent to ${location.state.email}. Please check your inbox.`);
    } else {
      setError('Email not found. Please go back to signup or login.');
      // Consider redirecting if email is essential and not present
      // navigate('/signup');
    }
  }, [location.state]);

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is missing. Cannot verify OTP.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await verifyOtpServiceCall(email, otp);
      if (response.success && response.data) {
        // Assuming verifyOtpServiceCall returns user and token upon successful OTP verification
        await auth.login(email, response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.error?.message || 'OTP verification failed. Please try again.');
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError('An unexpected error occurred during OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Email is missing. Cannot resend OTP.');
      return;
    }
    setError('');
    setMessage('');
    setResendLoading(true);
    try {
      const response = await sendOtpServiceCall(email);
      if (response.success) {
        setMessage(response.data?.message || 'A new OTP has been sent to your email.');
      } else {
        setError(response.error?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError('An unexpected error occurred while resending OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Please enter the OTP sent to {email || 'your email'}.</p>
      <form onSubmit={handleVerifySubmit}>
        <div>
          <label htmlFor="otp">OTP Code:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading || !email}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="btn" disabled={loading || resendLoading || !email}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      <button onClick={handleResendOtp} className="btn btn-secondary" disabled={resendLoading || loading || !email} style={{ marginTop: '10px' }}>
        {resendLoading ? 'Sending...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OTPVerificationPage;
