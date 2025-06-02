// Simulates API calls for fetching recommendations

// Mock API delay
const mockApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockRecommendations = [
  {
    id: 'rec1',
    item_id: 'savings_plus_account',
    name: 'High-Interest Savings Account',
    description: 'Boost your savings with our competitive interest rates. Secure and flexible.',
    score: 0.95,
    details: { interest_rate: '2.5%', type: 'Savings Account' }
  },
  {
    id: 'rec2',
    item_id: 'eco_friendly_loan',
    name: 'Eco-Friendly Personal Loan',
    description: 'Fund your green projects with our special low-rate eco loans.',
    score: 0.88,
    details: { loan_rate: '3.1%', type: 'Loan', purpose: 'Green Energy' }
  },
  {
    id: 'rec3',
    item_id: 'investment_starter_pack',
    name: 'Investment Starter Pack',
    description: 'New to investing? Get started with our guided investment portfolio.',
    score: 0.82,
    details: { min_investment: '$500', risk_level: 'Low-Medium', type: 'Investment' }
  },
  {
    id: 'rec4',
    item_id: 'travel_rewards_card',
    name: 'Travel Rewards Credit Card',
    description: 'Earn points on every purchase and travel the world for less.',
    score: 0.91,
    details: { annual_fee: '$99', rewards_type: 'Air Miles', type: 'Credit Card' }
  }
];

export const getRecommendations = async (token) => {
  await mockApiDelay(1000); // Simulate network latency
  console.log('recommendationService.getRecommendations called with token:', token);

  // In a real app, the backend would use the token to identify the user
  // and fetch personalized recommendations. Here, we just return a fixed list.

  if (!token) {
    return { success: false, error: { message: 'Authentication token is required.' } };
  }

  // Simulate successful response
  return {
    success: true,
    data: {
      user_id: 123, // Mock user ID
      recommendations: mockRecommendations,
      timestamp: new Date().toISOString(),
      // model_version: 'v1.2.0' // Example
    },
  };

  // To simulate an error:
  // return { success: false, error: { message: 'Recommendation service is currently unavailable.' } };
};
