import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, MessageCircle } from "lucide-react";
import { LegalDocument } from "../../../types/lawLibrary";

interface ProfileDetailsProps {
  profile: LegalDocument;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" />
          About
        </h2>
        <p className="text-gray-600">{profile.about}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          Recent Cases
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium mb-1">Corporate Case #{index + 1}</h3>
              <p className="text-sm text-gray-600">
                Successfully resolved complex legal matter
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-500" />
          Client Reviews
        </h2>
        <div className="space-y-4">
          {[1, 2].map((_, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://images.unsplash.com/photo-${
                    index + 1
                  }?auto=format&fit=crop&q=80&w=50&h=50`}
                  alt="Client"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">Client Name</h4>
                  <p className="text-sm text-gray-500">2 months ago</p>
                </div>
              </div>
              <p className="text-gray-600">
                Excellent legal counsel. Very professional and knowledgeable.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
