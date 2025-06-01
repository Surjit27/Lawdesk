import React from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatView from '../chat/ChatView';
import EmptyState from '../elements/EmptyState';

const MainContent = () => {
  const { selectedChat } = useChatContext();

  return (
    <div className="flex-1 flex flex-col">
      {selectedChat ? <ChatView /> : <EmptyState />}
    </div>
  );
};

export default MainContent;