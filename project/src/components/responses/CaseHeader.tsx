import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Users } from "lucide-react";
import { Case } from "../../types/case";

interface CaseHeaderProps {
  case_: Case;
}

const CaseHeader: React.FC<CaseHeaderProps> = ({ case_ }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{case_.title}</h2>
      <p className="text-gray-600 mb-6">{case_.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span>{case_.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span>{new Date(case_.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span>₹{case_.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-gray-400" />
          <span>{case_.bidding.length} Responses</span>
        </div>
      </div>
    </div>
  );
};

export default CaseHeader;
