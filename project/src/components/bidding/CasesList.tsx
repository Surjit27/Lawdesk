import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSocket } from "../../providers/SocketProvider";
import { useAuth } from "@clerk/clerk-react";

interface CasesListProps {
  userCasesOnly?: boolean;
}

const CasesList: React.FC<CasesListProps> = ({ userCasesOnly = false }) => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [filteredCases, setfilteredcases] = useState<any[]>([]);

  useEffect(() => {
    if (socket) {
      const payload = userCasesOnly ? userId : null; // Send userId only if userCasesOnly is true
      socket.emit("getAllCases", payload);

      const handleCaseList = (details) => {
        setfilteredcases(Array.isArray(details) ? details : []);
        console.log(details);
      };

      socket.on("caseList", handleCaseList);

      return () => {
        socket.off("caseList", handleCaseList);
      };
    }
  }, [socket, userId, userCasesOnly]);

  // Early return if no cases or data not loaded yet
  if (!filteredCases || filteredCases.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No cases found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredCases.map((caseItem, index) => (
        <motion.div
          key={caseItem._id || index} // Fallback to index if id is missing
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {caseItem.title || "Untitled Case"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {caseItem.description || "No description provided"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  caseItem.status === "open"
                    ? "bg-green-100 text-green-800"
                    : caseItem.status === "in_progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {caseItem.category || "Uncategorized"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{caseItem.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>
                  {caseItem.createdAt
                    ? new Date(caseItem.createdAt).toLocaleDateString()
                    : "Date not available"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span>
                  ₹
                  {caseItem.budget
                    ? caseItem.budget.toLocaleString()
                    : "Budget not specified"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-5 h-5" />
                <span>
                  {(caseItem.bidding && caseItem.bidding.length) || 0} Responses
                </span>
              </div>

              {userCasesOnly && (
                <Link
                  to={`/case-responses/${caseItem._id}/responses`}
                  className="flex items-center gap-2 px-4 py-2 text-green-500 hover:text-green-600 font-medium"
                >
                  View Responses
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CasesList;
