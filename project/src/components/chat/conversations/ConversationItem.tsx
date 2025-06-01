import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Chat } from '../../../types/chat';
import { useChatContext } from '../context/ChatContext';

interface ConversationItemProps {
  chat: Chat;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ chat }) => {
  const { selectedChat, setSelectedChat } = useChatContext();
  const isSelected = selectedChat?.id === chat.id;

  return (
    <button
      onClick={() => setSelectedChat(chat)}
      className={`w-full p-4 flex items-start gap-3 hover:bg-gray-100 transition-colors ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
        </div>
        <div className="flex items-center gap-1">
          {chat.lastMessageSent && (
            chat.lastMessageRead ? (
              <CheckCheck className="w-4 h-4 text-green-500" />
            ) : (
              <Check className="w-4 h-4 text-gray-400" />
            )
          )}
          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;