import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CaseManagement from "../components/cases/CaseManagement";
import LawyerProfile from "../components/cases/LawyerProfile";
import CasesFeed from "../components/cases/CasesFeed";
import BidModal from "../components/cases/BidModal";
import { useSocket } from "../providers/SocketProvider";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Cases = () => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [filter, setfilter] = useState("all");
  const [Case, setCase] = useState([]);
  const { user } = useUser();
  const [isClient, setisClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && !socket) {
      return;
    }
    if (filter === "all") {
      socket.emit("cm-getallcases", null);
    } else if (filter === "pending") {
      socket.emit("cm-getallcases", null, "pending");
    } else if (filter === "accepted") {
      socket.emit("cm-getallcases", null, "accepted");
    } else {
      console.log("Invalid");
    }

    const handleCase = (details) => {
      console.log(details);
      setCase(details);
    };

    socket.on("caseList", handleCase);

    return () => socket.off("caseList", handleCase);
  }, [userId, socket, filter]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    if (!user) return;
    const role = user?.publicMetadata?.role;

    setisClient(role === "client");
    console.log(isClient);
  }, [user]);

  useEffect(() => {
    if (isClient === true) {
      navigate("/dashboard");
    }
  }, [isClient]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Case Management</h1>
            <CaseManagement
              cases={Case}
              onFilterChange={(filter) => {
                setfilter(filter);
                // You can perform additional actions here when filter changes
              }}
              onBidChange={(_case) => {
                setSelectedCase(_case);
              }}
            />
          </div>
          <div className="space-y-8">
            {/* <LawyerProfile onAvailabilityToggle={handleAvailabilityToggle} /> */}
            <CasesFeed cases={Case} filter={filter} />
          </div>
        </motion.div>
      </div>
      {selectedCase && (
        <BidModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
};

export default Cases;
