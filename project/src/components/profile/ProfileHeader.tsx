import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LawyerProfile } from '../../types/lawyer';

interface ProfileHeaderProps {
  user: LawyerProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-6">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <p className="text-green-600 font-medium mb-3">{user.specialization}</p>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Contact Now
        </motion.button>
      </div>
    </div>
  );
};