import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-8"
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Select a Conversation
        </h3>
        <p className="text-gray-500 max-w-sm">
          Choose a chat from the sidebar to start messaging
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyState;