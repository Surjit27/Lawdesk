import React from 'react';
import SearchBar from '../elements/SearchBar';
import ConversationList from '../conversations/ConversationList';
import NewChatButton from '../elements/NewChatButton';

const Sidebar = () => {
  return (
    <div className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-100">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          <SearchBar />
        </div>
        <ConversationList />
        <NewChatButton />
      </div>
    </div>
  );
};

export default Sidebar;