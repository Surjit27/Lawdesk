import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, FileText, Send } from "lucide-react";
import { Case } from "../../types/case";
import { useAuth } from "@clerk/clerk-react";
import { useSocket } from "../../providers/SocketProvider";

interface BidModalProps {
  caseData: Case;
  onClose: () => void;
}

const BidModal: React.FC<BidModalProps> = ({ caseData, onClose }) => {
  const { userId } = useAuth();
  const [amount, setAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { socket } = useSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && amount && proposal) {
      setIsSubmitting(true);
      socket.emit(
        "bidding",
        caseData._id,
        userId,
        parseFloat(amount),
        proposal
      );
    }
  };

  // useEffect(() => {
  //   if (!userId || !socket) return;
  //   const bidHandler = () => {
  //     setIsSubmitting(false);
  //     onClose();
  //   };
  //   socket.on("bidSuccess", bidHandler);
  //   return () => {
  //     socket.off("bidSuccess", bidHandler);
  //   };
  // }, [userId, socket]);

  /*

try {
        await addBid({
          caseId: caseData.id,
          lawyerId: user.id,
          amount: parseFloat(amount),
          proposal,
        });
        onClose();
      } finally {
        setIsSubmitting(false);
      }


  **/

  return (
    <AnimatePresence>
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
          className="bg-white rounded-xl p-8 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Place Your Bid</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">{caseData.title}</h3>
            <p className="text-gray-600">{caseData.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <DollarSign className="w-4 h-4" />
              <span>Budget: ₹{caseData.budget.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bid Amount (₹)
              </label>
              <div className="relative">
                <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  min={0}
                  max={caseData.budget}
                  placeholder="Enter your bid amount"
                />
              </div>
              {parseFloat(amount) > caseData.budget && (
                <p className="mt-1 text-sm text-red-500">
                  Bid amount cannot exceed the budget
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposal
              </label>
              <div className="relative">
                <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  required
                  placeholder="Describe your approach to handling this case..."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || parseFloat(amount) > caseData.budget}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isSubmitting || parseFloat(amount) > caseData.budget
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition-colors`}
              type="submit"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Bid
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BidModal;
