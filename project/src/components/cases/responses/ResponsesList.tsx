import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, ThumbsUp, Send } from 'lucide-react';
import { Case } from '../../../types/case';
import { useAuthStore } from '../../../store/authStore';
import { useCaseStore } from '../../../store/caseStore';

interface ResponsesListProps {
  caseData: Case;
}

const ResponsesList: React.FC<ResponsesListProps> = ({ caseData }) => {
  const { user } = useAuthStore();
  const { addComment } = useCaseStore();
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleCommentSubmit = (bidId: string) => {
    if (comments[bidId]?.trim()) {
      addComment(caseData.id, bidId, comments[bidId]);
      setComments(prev => ({ ...prev, [bidId]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-green-500" />
        Lawyer Responses
      </h2>

      {caseData.bids.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No responses yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {caseData.bids.map((bid) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                      alt="Lawyer avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>4.8</span>
                        <span>•</span>
                        <span>Corporate Law</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl font-semibold text-green-600">
                    ₹{bid.amount.toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{bid.proposal}</p>

                <div className="space-y-4">
                  {bid.comments?.map((comment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=100&h=100"
                          alt="User avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-medium">Client</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">{comment}</p>
                    </div>
                  ))}

                  {user?.type === 'client' && (
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={comments[bid.id] || ''}
                        onChange={(e) => setComments(prev => ({
                          ...prev,
                          [bid.id]: e.target.value
                        }))}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCommentSubmit(bid.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                      >
                        Reply
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <ThumbsUp className="w-5 h-5" />
                      <span>Helpful</span>
                    </button>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    bid.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : bid.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bid.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponsesList;