import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Briefcase, Mail, Phone, MapPin, Toggle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCaseStore } from '../../store/caseStore';

interface LawyerProfileProps {
  onAvailabilityToggle: (available: boolean) => void;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ onAvailabilityToggle }) => {
  const { user } = useAuthStore();
  const { lawyers } = useCaseStore();
  const lawyer = lawyers.find((l) => l.id === user?.id);

  if (!lawyer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={lawyer.profileImage}
          alt={lawyer.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-white text-xl font-semibold">{lawyer.name}</h2>
          <p className="text-green-400">{lawyer.specialization}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">{lawyer.experience} Years</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-600">{lawyer.rating}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">{lawyer.casesWon} Won</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{lawyer.totalCases} Total</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">+91 987-654-3210</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Mumbai, India</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Available for new cases</span>
          <button
            onClick={() => onAvailabilityToggle(!lawyer.available)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              lawyer.available ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                lawyer.available ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LawyerProfile;