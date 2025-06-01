import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useChatStore } from './store/chatStore';

const ChatButton: React.FC = () => {
  const { toggleChat } = useChatStore();

  return (
    <motion.button
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleChat}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MessageSquare className="w-6 h-6" />
    </motion.button>
  );
};

export default ChatButton;