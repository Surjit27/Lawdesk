import React from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck, FileText, Image, Video, File } from "lucide-react";
import { Message } from "../../types/chat";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
}) => {
  // Format timestamp
  const formattedTime = format(new Date(message.timestamp), "h:mm a");

  // Determine file type icon
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="w-4 h-4" />;
    if (type.startsWith("video/")) return <Video className="w-4 h-4" />;
    if (type === "application/pdf") return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isCurrentUser
            ? "bg-green-500 text-white rounded-tr-none"
            : "bg-gray-100 text-gray-900 rounded-tl-none"
        }`}
      >
        {/* Message content or attachments */}
        {message.content && (
          <p className="text-sm whitespace-pre-wrap break-words mb-1">
            {message.content}
          </p>
        )}

        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mb-2 last:mb-0">
            {attachment.type === "image" ? (
              <img
                src={attachment.url}
                alt="Attachment"
                className="max-w-full max-h-60 rounded-lg object-cover"
              />
            ) : (
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isCurrentUser
                    ? "bg-green-600 text-green-50"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {getFileIcon(attachment.type)}
                <span className="text-xs truncate max-w-[160px]">
                  {attachment.url.split("/").pop()}
                </span>
              </a>
            )}
          </div>
        ))}

        {/* Message metadata */}
        <div
          className={`flex items-center gap-1 mt-1 ${
            isCurrentUser ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`text-xs ${
              isCurrentUser ? "text-green-100" : "text-gray-500"
            }`}
          >
            {formattedTime}
          </span>
          {isCurrentUser && (
            <span className={message.read ? "text-blue-300" : "text-green-200"}>
              {message.read ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
