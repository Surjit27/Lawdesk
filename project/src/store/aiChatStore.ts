import { create } from 'zustand';

export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface AIState {
  messages: AIMessage[];
  isLoading: boolean;
  model: string;
  temperature: number;
  sendMessage: (content: string) => Promise<void>; // Made async for API call
  setModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  clearChat: () => void;
}

// API configuration from your Colab output
const API_URL = "https://87cc-34-16-190-173.ngrok-free.app/api/alis";
const API_KEY = "83d09f7997c8c2ae10202cafe97b30538c865ac54ef78ca2994fc0b328dd5709";

export const useAIChatStore = create<AIState>((set) => ({
  messages: [
    {
      id: '1',
      content: "Hello! I'm your AI legal assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString(),
    },
  ],
  isLoading: false,
  model: 'lawlama2', // Updated to match your Colab model (not gpt-4)
  temperature: 0.7,
  sendMessage: async (content: string) => {
    // Add user message and set loading state
    const userMessage: AIMessage = {
      id: Math.random().toString(36).substring(7),
      content,
      role: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      const controller = new AbortController();

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ query: content }),
        signal: controller.signal,
      });


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

      const data = await response.json();
      if (!data || typeof data.response !== 'string') {
        throw new Error('Invalid response format from server');
      }

      const assistantMessage: AIMessage = {
        id: Math.random().toString(36).substring(7),
        content: data.response,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error fetching AI response:', error);

      let errorMessage = "Sorry, I encountered an error. Please try again.";
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

      const errorAssistantMessage: AIMessage = {
        id: Math.random().toString(36).substring(7),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      };

      set((state) => ({
        messages: [...state.messages, errorAssistantMessage],
        isLoading: false,
      }));
    }
  },
  setModel: (model: string) => set({ model }),
  setTemperature: (temperature: number) => set({ temperature }),
  clearChat: () =>
    set({
      messages: [
        {
          id: '1',
          content: "Hello! I'm your AI legal assistant. How can I help you today?",
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
      isLoading: false,
    }),
}));