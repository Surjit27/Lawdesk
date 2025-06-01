import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookOpen, Star } from 'lucide-react';

const ChatSidebar = () => {
  return (
    <div className="w-80 border-r border-gray-200 p-4 space-y-6">
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Quick Access</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Clock className="w-4 h-4" />
            Recent Chats
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Star className="w-4 h-4" />
            Saved Responses
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <BookOpen className="w-4 h-4" />
            Legal Templates
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Conversations</h3>
        <div className="space-y-2">
          {/* Placeholder for recent conversations */}
          <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium text-sm">Contract Review</div>
            <p className="text-xs text-gray-500 truncate">Last message: 2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;