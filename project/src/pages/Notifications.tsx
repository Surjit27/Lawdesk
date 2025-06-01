import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Scale, Clock, ArrowRight } from 'lucide-react';
import { useCaseStore } from '../store/caseStore';
import { useAuthStore } from '../store/authStore';

const Notifications = () => {
  const { cases } = useCaseStore();
  const { user } = useAuthStore();
  
  const userCases = cases.filter(case_ => case_.clientId === user?.id);
  const hasUnreadNotifications = userCases.some(case_ => 
    case_.bids.some(bid => !bid.read)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-8 h-8 text-green-500" />
              {hasUnreadNotifications && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated on your case activities</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {userCases.map((case_) => (
            <motion.div
              key={case_.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{case_.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    case_.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : case_.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {case_.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-4">
                  {case_.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`p-4 rounded-lg ${
                        !bid.read ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">New Response Received</p>
                            <p className="text-sm text-gray-600">
                              A lawyer has submitted a proposal for your case
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Scale className="w-4 h-4" />
                            <span>₹{bid.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(bid.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          onClick={() => {/* Handle view details */}}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {userCases.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;