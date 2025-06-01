import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface CommentListProps {
  comments: string[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) return null;

  return (
    <div className="space-y-4 mb-6">
      {comments.map((comment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p className="text-gray-600">{comment}</p>
            <span className="text-xs text-gray-400 mt-1">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommentList;