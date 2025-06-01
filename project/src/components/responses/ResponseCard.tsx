import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, DollarSign } from "lucide-react";
import { Bid } from "../../types/case";
import LawyerInfo from "./LawyerInfo";
import ResponseActions from "./ResponseActions";

interface ResponseCardProps {
  bid: Bid;
  onComment: (comment: string) => void;
  onAccept: () => void;
}

const ResponseCard: React.FC<ResponseCardProps> = ({
  bid,
  onComment,
  onAccept,
}) => {
  const lawyer = bid.lawyerId;
  if (!lawyer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
    >
      <LawyerInfo lawyerid={lawyer} />

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {new Date(bid.timestamp).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2 text-green-600 font-medium">
            ₹{bid.amount.toLocaleString()}
          </div>
        </div>
        <p className="text-gray-700">{bid.proposal}</p>
      </div>

      {/* <ResponseComments comments={bid.comments || []} /> */}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>{(bid.comments || []).length} Comments</span>
          </div>
          <ResponseActions
            status={bid.status}
            onComment={onComment}
            onAccept={onAccept}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ResponseCard;
