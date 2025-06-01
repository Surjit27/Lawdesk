import { create } from 'zustand';
import { Message, MessageType } from '../types';

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  sendMessage: (content: string) => void;
}

const formatTimestamp = () => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date());
};

// Your API configuration
const API_URL = "https://b0dd-35-197-155-74.ngrok-free.app/api/alis"; // Replace with your ngrok URL from Colab
const API_KEY = "16ee9cf52899f4199a86c3df4a016be5aaa93da53759f721b2694b2dc2009daf"; // Replace with your API key from Colab

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [
    {
      content: "Hello! I'm your AI legal assistant. How can I help you today?",
      type: 'ai',
      timestamp: formatTimestamp(),
    },
  ],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  sendMessage: async (content: string) => {
    // Add the user's message immediately
    set((state) => ({
      messages: [
        ...state.messages,
        {
          content,
          type: 'user' as MessageType,
          timestamp: formatTimestamp(),
        },
      ],
    }));

    try {
      // Make the API call to your Colab server with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ query: content }),
        signal: controller.signal, // For timeout handling
      });

      clearTimeout(timeoutId); // Clear timeout if response is received

      // Handle HTTP status codes
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed: Invalid API key');
        } else if (response.status === 400) {
          throw new Error('Bad request: Invalid query format');
        } else if (response.status === 500) {
          throw new Error('Server error: Something went wrong on the AI server');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      // Parse JSON response
      const data = await response.json();

      // Validate response structure
      if (!data || typeof data.response !== 'string') {
        throw new Error('Invalid response format from server');
      }

      const aiResponse = data.response;

      // Add the AI's response to the chat
      set((state) => ({
        messages: [
          ...state.messages,
          {
            content: aiResponse,
            type: 'ai' as MessageType,
            timestamp: formatTimestamp(),
          },
        ],
      }));
    } catch (error: any) {
      console.error('Error fetching AI response:', error);

      let errorMessage = "Sorry, I encountered an error. Please try again.";
      
      // Handle specific exception cases
      if (error.name === 'AbortError') {
        errorMessage = "Request timed out. The server is taking too long to respond.";
      } else if (error.message.includes('Authentication failed')) {
        errorMessage = "Authentication error: Please check the API key.";
      } else if (error.message.includes('Bad request')) {
        errorMessage = "Invalid request: Please rephrase your question.";
      } else if (error.message.includes('Server error')) {
        errorMessage = "Server error: The AI service is currently unavailable.";
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = "Server returned an invalid response. Please try again.";
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage = "Network error: Please check your internet connection.";
      }

      // Add the error message to the chat
      set((state) => ({
        messages: [
          ...state.messages,
          {
            content: errorMessage,
            type: 'ai' as MessageType,
            timestamp: formatTimestamp(),
          },
        ],
      }));
    }
  },
}));