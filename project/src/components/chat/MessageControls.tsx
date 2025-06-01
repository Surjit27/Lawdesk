import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Paperclip, Image } from 'lucide-react';

const MessageControls = () => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
      >
        <Smile className="w-5 h-5" />
      </motion.button>
      
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
      >
        <Paperclip className="w-5 h-5" />
      </motion.button>
      
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
      >
        <Image className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default MessageControls;