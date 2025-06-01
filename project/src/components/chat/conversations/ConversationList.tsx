import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { useChatStore } from '../../../store/chatStore';
import ConversationItem from './ConversationItem';

const ConversationList = () => {
  const { searchQuery } = useChatContext();
  const { chats } = useChatStore();

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map(chat => (
        <ConversationItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ConversationList;