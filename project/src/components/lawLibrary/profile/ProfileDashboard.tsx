import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileDetails from "./ProfileDetails";
import { LegalDocument } from "../../../types/lawLibrary";

interface ProfileDashboardProps {
  profile: LegalDocument;
  onBack: () => void;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  profile,
  onBack,
}) => {
  console.log("dkjnjbndxkjkdcjcn", profile);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <motion.button
        whileHover={{ x: -5 }}
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to List
      </motion.button>

      <ProfileHeader profile={profile} />
      <ProfileStats profile={profile} />
      <ProfileDetails profile={profile} />
    </div>
  );
};

export default ProfileDashboard;
