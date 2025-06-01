import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { Case } from "../../../types/case";
import CaseMetadata from "./CaseMetadata";
import BidResponse from "./BidResponse";
import { useAuth } from "@clerk/clerk-react";

interface CaseCardProps {
  case_: Case;
  onBidClick: (caseData: Case) => void;
  index: number;
}

const statusColorMap = {
  open: { bg: "bg-green-100", text: "text-green-800" },
  in_progress: { bg: "bg-blue-100", text: "text-blue-800" },
  closed: { bg: "bg-gray-100", text: "text-gray-800" },
};

const CaseCard: React.FC<CaseCardProps> = ({ case_, onBidClick, index }) => {
  const { userId } = useAuth();
  const userBid = case_.bidding.find((bid) => bid.lawyerId === userId);

  console.log("Bid case", userBid);

  const statusColors = statusColorMap[case_.status] || statusColorMap.closed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{case_.title}</h3>
            <p className="text-gray-600 mb-4">{case_.description}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${statusColors.bg} ${statusColors.text}`}
          >
            {case_.category}
          </span>
        </div>

        <CaseMetadata
          location={case_.location}
          createdAt={case_.createdAt}
          budget={case_.budget}
        />

        {userBid && <BidResponse bid={userBid} />}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>{case_.bidding.length} Responses</span>
          </div>
          {case_.status === "open" && !userBid && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBidClick(case_)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Respond to Case
              <Send className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;
