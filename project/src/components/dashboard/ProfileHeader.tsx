import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const ProfileHeader = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const handleEditProfile = () => {
    openUserProfile(); // Opens Clerk's default user profile editor
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-500">
                {user?.firstName?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.fullName || "User"}
            </h2>
            <p className="text-gray-600">
              {user?.primaryEmailAddress?.emailAddress || "No email provided"}
            </p>
          </div>
        </div>
        <button
          onClick={handleEditProfile}
          className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
