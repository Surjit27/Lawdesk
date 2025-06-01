import { Message } from '../types/chat';

export const formatTimestamp = () => {
  return new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

export const createMessage = (content: string, senderId: string): Message => ({
  id: Math.random().toString(36).substring(7),
  content,
  senderId,
  timestamp: formatTimestamp(),
});

export const generateLegalResponse = (message: string): string => {
  const responses = [
    "I understand your legal concern. Let me help you with that.",
    "Based on the legal precedents, here's what we should consider...",
    "From a legal perspective, here's my initial assessment...",
    "Let me review the relevant statutes and get back to you.",
    "That's an interesting legal question. Here's my professional opinion...",
  ];

  // Add some context-aware responses based on keywords
  if (message.toLowerCase().includes('contract')) {
    return "I'll review the contract terms and provide my legal opinion. In the meantime, please gather any related documentation.";
  }
  if (message.toLowerCase().includes('court')) {
    return "Regarding the court proceedings, let me check the current status and applicable procedures.";
  }
  if (message.toLowerCase().includes('rights')) {
    return "Let me explain your legal rights in this situation and the best course of action.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};