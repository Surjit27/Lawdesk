import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Advertisement from '../Advertisement';

const ChatLayout = () => {
  return (
    <div className="fixed inset-0 pt-16 bg-white">
      <div className="h-full flex">
        <Sidebar />
        <MainContent />
        <div className="w-[30%] flex-shrink-0">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;