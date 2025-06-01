import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';

interface CaseMetadataProps {
  location: string;
  createdAt: string;
  budget: number;
}

const CaseMetadata: React.FC<CaseMetadataProps> = ({ location, createdAt, budget }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-5 h-5 text-gray-400" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="w-5 h-5 text-gray-400" />
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <DollarSign className="w-5 h-5 text-gray-400" />
        <span>₹{budget.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CaseMetadata;