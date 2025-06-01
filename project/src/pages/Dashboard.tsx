import React, { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useAuth } from "@clerk/clerk-react";
import ProfileHeader from "../components/dashboard/ProfileHeader";
import ProfileStats from "../components/dashboard/ProfileStats";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import Advertisement from "../components/dashboard/Advertisement";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    stats: null,
    activities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Navigate = useNavigate();

  // Initialize dashboard and set up socket listeners
  useEffect(() => {
    if (!socket || !userId) return;

    const initDashboard = () => {
      socket.emit("dashboard:init", { userId });
    };

    // Set up event listeners
    socket.on("dashboard:profile", (profile) => {
      setDashboardData((prev) => ({ ...prev, profile }));
    });

    socket.on("dashboard:stats", (stats) => {
      setDashboardData((prev) => ({ ...prev, stats }));
    });

    socket.on("dashboard:activities", (activities) => {
      console.log(activities);
      setDashboardData((prev) => ({ ...prev, activities }));
      setLoading(false);
    });

    socket.on("dashboard:activity:new", (newActivity) => {
      setDashboardData((prev) => ({
        ...prev,
        activities: [newActivity, ...prev.activities.slice(0, 19)],
      }));
    });

    socket.on("dashboard:error", (err) => {
      setError(err.message || "Failed to load dashboard data");
      setLoading(false);
    });

    // Initialize the dashboard
    initDashboard();

    // Clean up listeners
    return () => {
      socket.off("dashboard:profile");
      socket.off("dashboard:stats");
      socket.off("dashboard:activities");
      socket.off("dashboard:activity:new");
      socket.off("dashboard:error");
    };
  }, [socket, userId]);

  // Handle profile updates
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      socket.emit("updateProfile", {
        userId,
        profile: updatedProfile,
      });
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              socket.emit("dashboard:init", { userId });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content (70%) */}
          <div className="flex-1 space-y-6">
            {/* Profile Header with Skeleton Loading */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton variant="circular" width={80} height={80} />
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" height={24} />
                  </div>
                </div>
              </div>
            ) : (
              <ProfileHeader
                profile={dashboardData.profile}
                onUpdate={handleProfileUpdate}
              />
            )}

            {/* Stats Section with Skeleton Loading */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={120}
                    className="rounded-xl"
                  />
                ))}
              </div>
            ) : (
              <ProfileStats stats={dashboardData.stats} />
            )}

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <Skeleton variant="circular" width={8} height={8} />
                      <div className="space-y-2 flex-1">
                        <Skeleton variant="text" width="80%" height={16} />
                        <Skeleton variant="text" width="40%" height={12} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ActivityFeed activities={dashboardData.activities} />
              )}
            </div>
          </div>

          {/* Sidebar (30%) */}
          <div className="w-full lg:w-80 space-y-6">
            <Advertisement />

            {/* Quick Actions */}
            {!loading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => Navigate("/bidding")}
                    className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    New Case
                  </button>
                  <button
                    onClick={() => Navigate("/feed")}
                    className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    New Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
