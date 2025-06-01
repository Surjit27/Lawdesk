import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages = [], userId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble
              key={message._id || message.timestamp} // Fallback to timestamp if no _id
              message={message}
              isCurrentUser={message.sender === userId}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
