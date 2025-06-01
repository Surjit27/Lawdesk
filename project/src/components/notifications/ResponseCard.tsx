import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, MessageCircle, Scale } from 'lucide-react';
import { Bid } from '../../types/case';
import { useCaseStore } from '../../store/caseStore';
import ResponseComments from './ResponseComments';

interface ResponseCardProps {
  bid: Bid;
  caseId: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ bid, caseId }) => {
  const { connectWithLawyer } = useCaseStore();

  const handleConnect = () => {
    connectWithLawyer(caseId, bid.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border ${!bid.read ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium">Lawyer Name</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.8</span>
                <span>•</span>
                <span>Corporate Law</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-green-600">₹{bid.amount.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{bid.proposal}</p>

        <ResponseComments comments={bid.comments || []} />

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span>{(bid.comments || []).length} Comments</span>
          </div>
          
          {bid.status === 'pending' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConnect}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Connect
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResponseCard;