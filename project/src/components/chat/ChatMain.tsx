import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatMain = ({
  chat,
  messages = [],
  onSendMessage,
  onMarkRead,
  userId,
}) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (chat?._id) {
      onMarkRead(chat._id);
    }
  }, [chat, onMarkRead]);

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
          <p className="text-gray-500">
            Choose a chat from the sidebar to start messaging
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <ChatHeader chat={chat} />

      <div className="flex-1 overflow-y-auto relative">
        <MessageList messages={messages} userId={userId} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSend={(content) => {
          const newMessage = {
            chatId: chat._id,
            sender: userId,
            receiver: chat.participants.find((p) => p !== userId),
            content,
            timestamp: new Date().toISOString(),
            read: false,
          };
          onSendMessage(newMessage);
        }}
      />
    </div>
  );
};

export default ChatMain;
