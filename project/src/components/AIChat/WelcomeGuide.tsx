import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, MessageCircle } from 'lucide-react';

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeGuide: React.FC<WelcomeGuideProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-8 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Welcome!</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600">
                I'm Alis Bot, your friendly AI assistant. I'm here to chat and help you with any questions you might have.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Start a Conversation</span>
                </div>
                <p className="text-sm text-gray-600">
                  Feel free to ask me anything! I'm here to help and engage in meaningful conversations.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Let's Chat!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeGuide;