import React from 'react';

interface CaseFilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const CaseFilterBar: React.FC<CaseFilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Cases' },
    { id: 'pending', label: 'Pending Responses' },
    { id: 'accepted', label: 'Accepted Cases' },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === id
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CaseFilterBar;