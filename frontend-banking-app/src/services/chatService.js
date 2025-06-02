// Simulates API calls for the chatbot

// Mock API delay
const mockApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Keep track of a simple conversation context for slightly more interesting mock responses
let conversationContext = {};

export const postChatMessage = async (messageText, token) => {
  await mockApiDelay(700); // Simulate network latency
  console.log('chatService.postChatMessage called with:', { messageText, token });

  // Basic mock logic for responses
  let botResponse = "I'm sorry, I didn't understand that. Can you rephrase?";
  const lowerMessage = messageText.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    botResponse = "Hello there! How can I help you today?";
    conversationContext.greetingDone = true;
  } else if (lowerMessage.includes("balance")) {
    if (conversationContext.greetingDone) {
      botResponse = "Your current balance is $1,234.56. Is there anything else?";
    } else {
      botResponse = "Please greet me first! Then I can share your balance.";
    }
  } else if (lowerMessage.includes("transfer")) {
    botResponse = "I can help with transfers. To whom would you like to transfer and how much?";
  } else if (lowerMessage.includes("help")) {
    botResponse = "I can help you check your balance, make transfers, or answer general banking questions.";
  } else if (lowerMessage.includes("bye") || lowerMessage.includes("thanks")) {
    botResponse = "You're welcome! Have a great day.";
    conversationContext = {}; // Reset context
  }

  // Simulate successful response
  return {
    success: true,
    data: {
      user_message: messageText, // Echoing user message (backend might do this)
      bot_response: botResponse,
      timestamp: new Date().toISOString(),
    },
  };

  // To simulate an error:
  // return { success: false, error: { message: 'Chat service is currently unavailable.' } };
};
