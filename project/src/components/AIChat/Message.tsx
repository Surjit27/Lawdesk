import React from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { MessageType } from './types';

interface MessageProps {
  content: string;
  type: MessageType;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ content, type, timestamp }) => {
  const isUser = type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-white" />
          </div>
        )}
        <div
          className={`rounded-lg p-3 ${
            isUser
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p className="text-sm">{content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;