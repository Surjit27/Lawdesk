import React from 'react';
import CategoryIcon from './CategoryIcon';

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  id,
  name,
  icon,
  count,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
        isSelected
          ? 'bg-green-50 text-green-600'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <CategoryIcon iconName={icon} />
        <span>{name}</span>
      </div>
      <span className="text-sm text-gray-500">{count}</span>
    </button>
  );
};

export default CategoryButton;