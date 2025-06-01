import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft, Scale, Clock, FileText, Users } from "lucide-react";
import { useSocket } from "../providers/SocketProvider";
import { useAuth } from "@clerk/clerk-react";
import ProfileStats from "../components/dashboard/ProfileStats";
import ActivityFeed from "../components/dashboard/ActivityFeed";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  available: boolean;
  profileImage: string;
  casesWon: number;
  experience: number;
  totalCases: number;
  rating: number;
}

const LawyerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [activities, setactivities] = useState(null);
  const [stats, setstats] = useState(null);

  useEffect(() => {
    if (!socket || !userId) return;

    const handleLawyerProfile = (profile: Lawyer) => {
      setLawyer(profile);
      console.log(profile);
      setIsLoading(false);
    };

    socket.emit("getLawyerProfile", id);

    socket.emit("dashboard:init", { userId: id });
    socket.on("lawyerProfile", handleLawyerProfile);

    socket.on("dashboard:stats", (stats) => {
      setstats(stats);
    });

    socket.on("dashboard:activities", (activities) => {
      setactivities(activities);
    });

    // Call a fuction and set on stats

    return () => {
      socket.off("lawyerProfile", handleLawyerProfile);
    };
  }, [socket, userId, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">Loading lawyer profile...</div>
        </div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">Lawyer profile not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Lawyers
        </motion.button>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={lawyer.profile.avatar}
              alt={lawyer.profile.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {lawyer.profile.name}
              </h1>
              <p className="text-green-600 font-medium mb-3">
                {lawyer.profile.specialization}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${"bg-green-100 text-green-800"}`}
                >
                  "Available"
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={() =>
                (window.location.href = `mailto:${lawyer.profile.email}`)
              }
            >
              Contact Now
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <ProfileStats stats={stats} />
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600">
            Experienced {lawyer.profile.specialization} with several years of
            practice. Specializing in complex legal matters with a proven track
            record of success.
          </p>
        </div>

        {/* Recent Cases */}
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export default LawyerProfile;
