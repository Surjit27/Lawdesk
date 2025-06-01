import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ResponseActionsProps {
  status: string;
  onComment: (comment: string) => void;
  onAccept: () => void;
}

const ResponseActions: React.FC<ResponseActionsProps> = ({
  status,
  onComment,
  onAccept,
}) => {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(comment.trim());
      setComment("");
      setIsCommenting(false);
    }
  };

  return (
    <div className="space-y-4">
      {isCommenting ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            Send
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      ) : (
        <div className="flex gap-2">
          {/* <button
            onClick={() => setIsCommenting(true)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Reply
          </button> */}
          {status === "pending" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAccept}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Accept Proposal
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseActions;
