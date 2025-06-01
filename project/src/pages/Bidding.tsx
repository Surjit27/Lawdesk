import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Scale } from "lucide-react";
import LawyersList from "../components/bidding/LawyersList";
import PostCase from "../components/bidding/PostCase";
import CasesList from "../components/bidding/CasesList";
import { useSocket } from "../providers/SocketProvider";
import { useCaseStore } from "../store/caseStore";
import { useUser } from "@clerk/clerk-react";
const Bidding = () => {
  const { socket } = useSocket();
  const { user } = useUser();
  const { addCase } = useCaseStore();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isClient, setisClient] = useState(true);
  // Wrap addCase in useCallback to prevent unnecessary recreations
  const handleNewCase = useCallback(
    (newCase) => {
      addCase(newCase);
    },
    [addCase]
  );

  useEffect(() => {
    if (!user) return;
    const role = user?.publicMetadata?.role;

    setisClient(role === "client");
    console.log(isClient);
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new cases
    socket.on("newCase", handleNewCase);

    // Clean up
    return () => {
      socket.off("newCase", handleNewCase);
    };
  }, [socket, handleNewCase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pt-20">
      <div className="relative h-[calc(100vh-5rem)]">
        {/* Main Content */}
        <div
          className="h-full overflow-y-auto px-6 py-8 transition-all duration-300"
          style={{
            marginRight: isPanelOpen ? "400px" : "0",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isClient ? "Find Legal Representation" : "Available Cases"}
                  </h1>
                  <p className="mt-2 text-gray-600">
                    {isClient
                      ? "Connect with experienced lawyers for your legal needs"
                      : "Browse and bid on available legal cases"}
                  </p>
                </div>
                {isClient && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {isPanelOpen ? (
                      <ChevronRight className="w-5 h-5" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" />
                    )}
                    {isPanelOpen ? "Hide Cases" : "View Your Cases"}
                  </motion.button>
                )}
              </div>

              {/* Search and Filter Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Search by name or expertise..."
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                    <option value="">All Practice Areas</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="family">Family Law</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                    <option value="">All Locations</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                </div>
              </div>

              {isClient && <PostCase />}

              {/* Main Content Section */}
              <div className="grid grid-cols-1 gap-8">
                {isClient ? (
                  <>
                    <div>
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Scale className="w-6 h-6 text-green-500" />
                        Top Rated Lawyers
                      </h2>
                      <LawyersList />
                    </div>
                  </>
                ) : (
                  <CasesList />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sliding Panel */}
        <AnimatePresence>
          {isPanelOpen && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed top-[5rem] right-0 w-[400px] h-[calc(100vh-5rem)] bg-white border-l border-gray-200 shadow-lg overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Your Posted Cases
                </h2>
                <div className="space-y-4">
                  <CasesList userCasesOnly={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bidding;
