import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useSocket } from "../../providers/SocketProvider";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  online?: boolean;
}

interface ChatHeaderProps {
  chat: {
    _id: string;
    participants: string[];
    participantData?: Participant[]; // Added for participant details
  };
  userId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, userId }) => {
  const socket = useSocket();
  const [typingStatus, setTypingStatus] = useState<string | null>(null);
  const [otherParticipant, setOtherParticipant] = useState<Participant | null>(
    null
  );
  const [onlineStatus, setOnlineStatus] = useState(false);

  // Get the other participant's info (for 1:1 chats)
  useEffect(() => {
    if (chat.participantData) {
      const otherUser = chat.participantData.find((p) => p.id !== userId);
      if (otherUser) {
        setOtherParticipant(otherUser);
        setOnlineStatus(otherUser.online || false);
      }
    }
  }, [chat.participantData, userId]);

  // Listen for typing events
  useEffect(() => {
    if (!socket) return;

    const handleTyping = (data: {
      chatId: string;
      userId: string;
      isTyping: boolean;
    }) => {
      if (data.chatId === chat._id && data.userId !== userId) {
        const participant = chat.participantData?.find(
          (p) => p.id === data.userId
        );
        setTypingStatus(
          data.isTyping
            ? `${participant?.name || "Someone"} is typing...`
            : null
        );
      }
    };

    socket.on("typing", handleTyping);
    socket.on("user-online", (onlineUserId) => {
      if (otherParticipant?.id === onlineUserId) setOnlineStatus(true);
    });
    socket.on("user-offline", (offlineUserId) => {
      if (otherParticipant?.id === offlineUserId) setOnlineStatus(false);
    });

    return () => {
      socket.off("typing", handleTyping);
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [socket, chat._id, userId, otherParticipant, chat.participantData]);

  const initiateCall = (type: "audio" | "video") => {
    // Implement call initiation logic
    console.log(`Initiating ${type} call with ${otherParticipant?.id}`);
  };

  return (
    <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={otherParticipant?.avatar || "/default-avatar.png"}
            alt={otherParticipant?.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          {onlineStatus && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">
            {otherParticipant?.name || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500 h-5">
            {typingStatus || otherParticipant?.role || ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-gray-50"
          onClick={() => initiateCall("audio")}
          disabled={!onlineStatus}
        >
          <Phone className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-gray-50"
          onClick={() => initiateCall("video")}
          disabled={!onlineStatus}
        >
          <Video className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-gray-50"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHeader;
