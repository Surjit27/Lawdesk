import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Link as LinkIcon, Send, X } from "lucide-react";
import { useSocket } from "../../providers/SocketProvider";
import { useAuth, useUser } from "@clerk/clerk-react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const { socket } = useSocket();
  const { userId } = useAuth();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    const newPost = {
      content,
      authorId: userId,
      author: {
        name: user?.fullName,
        avatar: user?.imageUrl,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      image: image
        ? {
            name: image.name,
            type: image.type,
            size: image.size,
            url: imagePreview,
          }
        : null,
      link: link || null,
    };

    socket?.emit("createpost", newPost);
    setContent("");
    setImage(null);
    setImagePreview(null);
    setLink("");
    setShowLinkInput(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center mb-4">
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt={user?.fullName || "User"}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <h3 className="font-semibold">{user?.fullName || "Anonymous"}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
          rows={3}
        />

        {imagePreview && (
          <div className="mt-4 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg max-h-64 object-contain"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showLinkInput && (
          <div className="mt-4 relative">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste a link..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setLink("");
                setShowLinkInput(false);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="text-gray-500 hover:text-green-500"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="text-gray-500 hover:text-green-500"
              onClick={() => setShowLinkInput(!showLinkInput)}
            >
              <LinkIcon className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
            disabled={!content.trim() && !image}
          >
            Post
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
