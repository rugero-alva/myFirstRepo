// Simulates API calls for authentication

// Mock API delay
const mockApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email, password) => {
  await mockApiDelay(500);
  console.log('authService.login called with:', { email, password });
  // Simulate a successful login
  if (email === 'user@example.com' && password === 'password') {
    return {
      success: true,
      data: {
        token: 'fake-jwt-token',
        user: { id: 1, email: email, fullName: 'Test User' }
      }
    };
  }
  return { success: false, error: { message: 'Invalid credentials' } };
};

export const signup = async (userData) => {
  await mockApiDelay(500);
  console.log('authService.signup called with:', userData);
  // Simulate a successful signup
  return {
    success: true,
    data: {
      message: 'Signup successful. Please verify OTP.',
      user: { id: 2, email: userData.email, fullName: userData.fullName }
    }
  };
};

export const sendOtp = async (email) => {
  await mockApiDelay(500);
  console.log('authService.sendOtp called for:', email);
  // Simulate OTP sent successfully
  return { success: true, data: { message: 'OTP sent to your email.' } };
};

export const verifyOtp = async (email, otp) => {
  await mockApiDelay(500);
  console.log('authService.verifyOtp called with:', { email, otp });
  // Simulate successful OTP verification
  if (otp === '123456') { // Mock OTP
    return {
      success: true,
      data: {
        message: 'OTP verified successfully.',
        token: 'another-fake-jwt-token', // Could issue token after OTP
        user: { id: 2, email: email, fullName: 'Verified User' }
      }
    };
  }
  return { success: false, error: { message: 'Invalid OTP.' } };
};
