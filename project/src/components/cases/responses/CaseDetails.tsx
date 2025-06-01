import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Case } from '../../../types/case';

interface CaseDetailsProps {
  caseData: Case;
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/bidding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          </Link>
          <h1 className="text-2xl font-bold">Case Details</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{caseData.title}</h2>
            <p className="text-gray-600">{caseData.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{caseData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">
                {new Date(caseData.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">₹{caseData.budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{caseData.bids.length} Responses</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              caseData.status === 'open'
                ? 'bg-green-100 text-green-800'
                : caseData.status === 'in_progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {caseData.status.replace('_', ' ')}
            </span>
            <span className="text-sm text-gray-500">
              • {caseData.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;