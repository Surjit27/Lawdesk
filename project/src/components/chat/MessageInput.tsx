import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Paperclip, X } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: {
    content: string;
    attachments?: Array<{ url: string; type: string }>;
  }) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    try {
      setIsUploading(true);

      // Upload files if any
      const uploadedAttachments = await Promise.all(
        attachments.map(async (attachment) => {
          // In a real app, you would upload the file to your server here
          // This is a mock implementation
          return {
            url: attachment.preview, // Replace with actual URL from upload
            type: attachment.file.type.split("/")[0], // 'image', 'video', etc.
          };
        })
      );

      onSendMessage({
        content: message.trim(),
        attachments:
          uploadedAttachments.length > 0 ? uploadedAttachments : undefined,
      });

      // Reset form
      setMessage("");
      setAttachments([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setAttachments((prev) => [...prev, ...newAttachments]);
      e.target.value = ""; // Reset file input
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].preview);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        URL.revokeObjectURL(attachment.preview);
      });
    };
  }, [attachments]);

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      {/* Preview attachments */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative">
              {attachment.file.type.startsWith("image/") ? (
                <img
                  src={attachment.preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Paperclip className="w-6 h-6 text-gray-400" />
                  <span className="text-xs mt-1 text-gray-500 truncate w-full px-1">
                    {attachment.file.name}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-gray-600 p-2"
            aria-label="Emoji picker"
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-gray-600 p-2"
            aria-label="Attach file"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept="image/*,video/*,audio/*,application/pdf"
            />
          </motion.button>
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm max-h-[120px]"
          rows={1}
          aria-label="Message input"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={
            (!message.trim() && attachments.length === 0) || isUploading
          }
          className={`p-3 rounded-full ${
            (message.trim() || attachments.length > 0) && !isUploading
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-100 text-gray-400"
          } transition-colors`}
          aria-label="Send message"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;
