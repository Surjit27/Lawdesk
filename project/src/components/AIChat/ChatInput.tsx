import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import { useAIChatStore } from '../../store/aiChatStore';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useAIChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="w-full pl-12 pr-16 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-2 text-green-500 hover:text-green-600 disabled:text-gray-300"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;