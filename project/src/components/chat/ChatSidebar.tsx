import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import ChatList from "./ChatList";

const ChatSidebar = ({
  chats = [],
  onlineUsers = [],
  onSelectChat,
  onCreateChat,
  userId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatParticipant, setNewChatParticipant] = useState("");

  const filteredChats = chats.filter((chat) => {
    // Find the other participant's name (assuming 1:1 chats)
    const otherParticipant = chat.participants.find((p) => p !== userId);
    return otherParticipant?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCreateChat = () => {
    if (newChatParticipant.trim()) {
      onCreateChat([userId, newChatParticipant.trim()]);
      setNewChatParticipant("");
      setIsCreatingChat(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatList
          chats={filteredChats}
          onlineUsers={onlineUsers}
          onSelectChat={onSelectChat}
          userId={userId}
        />
      </div>

      <div className="p-4 border-t border-gray-200">
        {isCreatingChat ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter user ID to chat with"
              value={newChatParticipant}
              onChange={(e) => setNewChatParticipant(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateChat}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreatingChat(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingChat(true)}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
