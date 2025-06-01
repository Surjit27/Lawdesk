import React from 'react';
import { motion } from 'framer-motion';
import Message from './Message';
import { useChatStore } from './store/chatStore';

const MessageList: React.FC = () => {
  const { messages } = useChatStore();

  return (
    <motion.div 
      className="h-96 overflow-y-auto p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </motion.div>
  );
};

export default MessageList;