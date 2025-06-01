import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface = () => {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <ChatMessages />
      </div>
    </>
  );
};

export default ChatInterface;