import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Award, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/SocketProvider";
import { useAuth } from "@clerk/clerk-react";

const LawyersList = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (socket && userId) {
      setIsLoading(true);
      socket.emit("getAllLawyers", userId); // Changed from "getAllCases" to "getAllLawyers"

      const handleLawyerList = (details) => {
        setLawyers(Array.isArray(details) ? details : []);
        setIsLoading(false);
        console.log(details);
      };

      socket.on("lawyerList", handleLawyerList); // Changed from "caseList" to "lawyerList"

      return () => {
        socket.off("lawyerList", handleLawyerList);
      };
    }
  }, [socket, userId]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading lawyers...</p>
      </div>
    );
  }

  if (!lawyers || lawyers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No lawyers found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lawyers.map((lawyer, index) => (
        <motion.div
          key={lawyer.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative">
            <img
              src={lawyer.profile.avatar || "/default-lawyer.jpg"}
              alt={lawyer.profile.name || "Lawyer"}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-lawyer.jpg";
              }}
            />

            <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Available
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              {lawyer.profile.name || "Unknown Lawyer"}
            </h3>
            <p className="text-green-600 font-medium mb-4">
              {lawyer.profile.specialization || "General Practice"}
            </p>

            {/* <div className="grid grid-cols-2 gap-4 mb-4"> */}
            {/* <div className="flex items-center gap-2"> */}
            {/* <Award className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">
                  {lawyer.experience || 0} Years
                </span>
              </div> */}
            {/* <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-600">
                  {lawyer.rating ? lawyer.rating.toFixed(1) : "N/A"}/5.0
                </span>
              </div> */}
            {/* <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">
                  {lawyer.casesWon || 0} Won
                </span>
              </div> */}
            {/* <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {lawyer.totalCases || 0} Total
                </span>
              </div> */}
            {/* </div> */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                lawyer._id && navigate(`/lawyer/${lawyer.clerkUserId}`)
              }
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              View Profile
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LawyersList;
