import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useLawyerStore } from "../store/lawyerStore";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLawyerById } = useLawyerStore();
  const lawyer = getLawyerById(id || "");

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">Profile not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-6">
          <ProfileHeader user={lawyer} />
          <ProfileStats stats={lawyer.stats} />
          <ProfileDetails lawyer={lawyer} />
        </div>
      </div>
    </div>
  );
};
