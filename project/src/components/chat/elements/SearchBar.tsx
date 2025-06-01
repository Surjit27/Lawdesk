import React from 'react';
import { Search } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useChatContext();

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search conversations"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
      />
    </div>
  );
};

export default SearchBar;