import React, { useEffect, useState } from "react";
import { Star, MapPin, Scale } from "lucide-react";
import { User } from "../../types/auth";
import { useSocket } from "../../providers/SocketProvider";

interface LawyerInfoProps {
  lawyerid: string; // Changed from lawyer to lawyerid
}

const LawyerInfo: React.FC<LawyerInfoProps> = ({ lawyerid }) => {
  const [lawyer, setLawyer] = useState<User | null>(null); // Added proper typing
  const { socket } = useSocket();

  useEffect(() => {
    if (!lawyerid || !socket) return;

    const handler = (details: User) => {
      // Added type for details
      setLawyer(details);
    };

    socket.emit("get-lawyer", lawyerid);
    socket.on("get-lawyer-response", handler);

    return () => {
      socket.off("get-lawyer-response", handler);
    };
  }, [lawyerid, socket]);

  if (!lawyer) {
    return <div className="text-gray-500">Loading lawyer info...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={lawyer.profile?.avatar || "/default-avatar.png"} // Added fallback
        alt={lawyer.profile?.name || "Lawyer"} // Added fallback
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">
          {lawyer.profile?.name || "Unknown Lawyer"}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Scale className="w-4 h-4" />
            <span>{lawyer.specialization || "Not Specified"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{lawyer.rating || "N/A"}</span> {/* Added rating fallback */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerInfo;
