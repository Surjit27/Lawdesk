import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import { SAMPLE_CHATS } from '../data/sampleChats';

interface ChatState {
  chats: Chat[];
  selectedChat: Chat | null;
  selectChat: (chatId: string) => void;
  sendMessage: (content: string) => void;
}

const generateResponse = (message: string): string => {
  const responses = [
    "I'll look into that and get back to you shortly.",
    "Thanks for your message. Let me check the details.",
    "I understand your concern. Here's what we can do...",
    "That's a good point. Let me consult with my team.",
    "I'll review this and provide my recommendations.",
  ];
  
  // Add context-aware responses
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! How can I assist you today?";
  }
  if (message.toLowerCase().includes('thank')) {
    return "You're welcome! Let me know if you need anything else.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: SAMPLE_CHATS,
  selectedChat: null,
  
  selectChat: (chatId) => {
    const chat = get().chats.find(c => c.id === chatId);
    set({ selectedChat: chat || null });
  },

  sendMessage: (content) => {
    if (!get().selectedChat) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      content,
      senderId: 'currentUser',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    // Update with user message
    set(state => {
      const updatedChat = {
        ...state.selectedChat!,
        messages: [...state.selectedChat!.messages, newMessage],
        lastMessage: content,
        lastMessageTime: newMessage.timestamp,
        lastMessageSent: true,
        lastMessageRead: false
      };

      return {
        chats: state.chats.map(chat => 
          chat.id === updatedChat.id ? updatedChat : chat
        ),
        selectedChat: updatedChat
      };
    });

    // Simulate response after delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: Math.random().toString(),
        content: generateResponse(content),
        senderId: get().selectedChat!.id,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      set(state => {
        const updatedChat = {
          ...state.selectedChat!,
          messages: [...state.selectedChat!.messages, responseMessage],
          lastMessage: responseMessage.content,
          lastMessageTime: responseMessage.timestamp,
          lastMessageSent: false,
          lastMessageRead: true
        };

        return {
          chats: state.chats.map(chat => 
            chat.id === updatedChat.id ? updatedChat : chat
          ),
          selectedChat: updatedChat
        };
      });
    }, 1000);
  }
}));