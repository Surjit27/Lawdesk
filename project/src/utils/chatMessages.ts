import { Message } from '../types/chat';

const legalResponses = [
  "I'll review the case details and get back to you shortly.",
  "Based on the legal precedents, here's what we should consider...",
  "Let me check the relevant statutes regarding your situation.",
  "We should schedule a consultation to discuss this in detail.",
  "I understand your concern. From a legal perspective...",
  "Here's my preliminary legal analysis of your situation..."
];

export const generateLegalResponse = (message: string): string => {
  // Add some context-aware responses based on keywords
  if (message.toLowerCase().includes('contract')) {
    return "I'll review the contract terms and provide my legal opinion. In the meantime, please gather any related documentation.";
  }
  if (message.toLowerCase().includes('court')) {
    return "Regarding the court proceedings, let me check the current status and applicable procedures.";
  }
  
  // Default to random professional responses
  return legalResponses[Math.floor(Math.random() * legalResponses.length)];
};

export const formatMessage = (content: string, senderId: string): Message => ({
  id: Math.random().toString(36).substring(7),
  content,
  senderId,
  timestamp: new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  }),
});