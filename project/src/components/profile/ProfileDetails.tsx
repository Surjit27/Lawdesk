import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, BookOpen } from 'lucide-react';
import { LawyerProfile } from '../../types/lawyer';

interface ProfileDetailsProps {
  lawyer: LawyerProfile;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ lawyer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" />
          Expertise
        </h2>
        <div className="space-y-3">
          {lawyer.expertise.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-600"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          Education & Certifications
        </h2>
        <div className="space-y-4">
          {lawyer.education.map((edu, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-medium">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};