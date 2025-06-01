import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import ChatInterface from '../components/AIChat/ChatInterface';
import { useAIChatStore } from '../store/aiChatStore';

const AIChat = () => {
  const { messages, sendMessage, isLoading } = useAIChatStore();
  const [input, setInput] = useState('');
  const hasMessages = messages.length > 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput('');
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-sm p-4 flex items-center gap-3 border-b border-gray-200"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-green-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Legal AI Assistant</h1>
      </motion.header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Legal AI</h2>
                  <p className="text-gray-600 mb-6">
                    Ask any legal question and get instant, AI-powered guidance.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      'How do I register a company?',
                      'What are my tenant rights?',
                      'Patent filing process',
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Interface always present, hidden when empty */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasMessages ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={hasMessages ? 'block' : 'hidden'}
          >
            <ChatInterface />
          </motion.div>
        </div>

        {/* Single Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-t border-gray-200 p-4"
        >
          <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your legal question..."
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-full text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin inline-block w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChat;