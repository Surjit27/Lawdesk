import React from "react";
import { motion } from "framer-motion";
import { Scale, Clock, FileText, Star } from "lucide-react";
import { LegalDocument } from "../../../types/lawLibrary";

interface ProfileStatsProps {
  profile: LegalDocument;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  const stats = [
    { icon: Scale, label: "Cases Won", value: profile.casesWon },
    { icon: Clock, label: "Experience", value: profile.experience },
    { icon: FileText, label: "Total Cases", value: profile.totalCases },
    { icon: Star, label: "Rating", value: profile.rating?.toString() },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <stat.icon className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileStats;
