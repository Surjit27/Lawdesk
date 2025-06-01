import React from 'react';
import { motion } from 'framer-motion';
import ResponseCard from './ResponseCard';
import { Case } from '../../types/case';

interface CaseResponseListProps {
  case_: Case;
}

const CaseResponseList: React.FC<CaseResponseListProps> = ({ case_ }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">{case_.title}</h2>
        <p className="text-gray-600 mb-6">{case_.description}</p>
        
        <div className="space-y-4">
          {case_.bids.map((bid) => (
            <ResponseCard key={bid.id} bid={bid} caseId={case_.id} />
          ))}
          
          {case_.bids.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No responses yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseResponseList;