import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageCircle, DollarSign, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "document",
    icon: FileText,
    color: "text-blue-500",
    content: "Contract review completed for Smith & Co",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "message",
    icon: MessageCircle,
    color: "text-green-500",
    content: "Client consultation scheduled with Johnson LLC",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "payment",
    icon: DollarSign,
    color: "text-yellow-500",
    content: "Payment received for case #1234",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "case",
    icon: CheckCircle,
    color: "text-purple-500",
    content: "Case resolution achieved for Brown vs State",
    time: "8 hours ago",
  },
];

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: activity.id * 0.1 }}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600">{activity.content}</p>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentActivity;
