import React from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

const ChatList = () => {
  const { chats, selectedChat, selectChat } = useChatStore();

  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <motion.button
          key={chat.id}
          whileHover={{ scale: 1.01 }}
          onClick={() => selectChat(chat.id)}
          className={`w-full p-4 flex items-start gap-3 transition-colors ${
            selectedChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"
          }`}
        >
          <div className="relative">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium truncate">{chat.name}</h3>
              {chat.lastMessageTime && (
                <span className="text-xs text-gray-500">
                  {chat.lastMessageTime}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {chat.lastMessageSent &&
                (chat.lastMessageRead ? (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <Check className="w-4 h-4 text-gray-400" />
                ))}
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage || `Start chatting with ${chat.name}`}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ChatList;
