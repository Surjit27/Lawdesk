import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Settings, Trash2, HelpCircle } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

interface ChatHeaderProps {
  onSettingsClick: () => void;
  onHelpClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick, onHelpClick }) => {
  const clearChat = useChatStore((state) => state.clearChat);

  return (
    <div className="flex-shrink-0 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
          >
            <Bot className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold">Alis Bot</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHelpClick}
            className="text-gray-500 hover:text-green-500 transition-colors p-2 rounded-md hover:bg-gray-100"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-gray-100"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSettingsClick}
            className="text-gray-500 hover:text-green-500 transition-colors p-2 rounded-md hover:bg-gray-100"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;