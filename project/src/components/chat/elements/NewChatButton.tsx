import React from 'react';
import { Plus } from 'lucide-react';

const NewChatButton = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
        <Plus className="w-4 h-4" />
        New Conversation
      </button>
    </div>
  );
};

export default NewChatButton;