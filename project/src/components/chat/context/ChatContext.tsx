import React, { createContext, useContext, useState } from 'react';
import { Chat } from '../../../types/chat';
import { useChatStore } from '../../../store/chatStore';

interface ChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedChat, selectChat } = useChatStore();

  const value = {
    selectedChat,
    setSelectedChat: selectChat,
    searchQuery,
    setSearchQuery,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};