import React from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useChatStore } from './store/chatStore';

const AIChat: React.FC = () => {
  const { isOpen } = useChatStore();

  return (
    <>
      <ChatButton />
      {isOpen && <ChatWindow />}
    </>
  );
};

export default AIChat;