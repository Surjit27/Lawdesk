import React from 'react';
import ChatHeader from '../ChatHeader';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import { useChatContext } from '../context/ChatContext';

const ChatView = () => {
  const { selectedChat } = useChatContext();

  if (!selectedChat) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      <ChatHeader chat={selectedChat} />
      <div className="flex-1 overflow-hidden relative">
        <MessageList messages={selectedChat.messages} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatView;