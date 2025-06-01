import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import { useChatStore } from "../../store/chatStore";

const Chat = () => {
  const { selectedChat } = useChatStore();

  return (
    <div className="fixed inset-0 bg-gray-50">
      <div className="h-full pt-16">
        <div className="h-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-12 h-full bg-white">
            <div className="col-span-12 md:col-span-3 border-r border-gray-200">
              <ChatSidebar />
            </div>
            <div className="hidden md:block md:col-span-9 h-full">
              {selectedChat ? (
                <ChatMain />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Welcome to Chat
                    </h3>
                    <p className="text-gray-400">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
