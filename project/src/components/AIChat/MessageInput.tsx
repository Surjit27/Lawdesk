import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useChatStore } from './store/chatStore';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a legal question..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
};

export default MessageInput;