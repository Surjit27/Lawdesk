import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatStore } from './store/chatStore';

const ChatWindow: React.FC = () => {
  const { toggleChat } = useChatStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden"
      >
        <div className="bg-green-500 p-4 flex justify-between items-center">
          <h3 className="text-white font-semibold">Legal Assistant</h3>
          <button
            onClick={toggleChat}
            className="text-white hover:text-green-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <MessageList />
        <MessageInput />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWindow;