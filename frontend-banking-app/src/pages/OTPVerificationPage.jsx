import React, { useState } from 'react';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call logic
    console.log('OTP verification attempt with:', { otp });
    alert('OTP verification functionality not yet implemented.');
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>An OTP has been sent to your email. Please enter it below.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP Code:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      {/* TODO: Add resend OTP option later */}
    </div>
  );
};

export default OTPVerificationPage;
