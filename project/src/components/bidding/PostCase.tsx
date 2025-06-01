import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Link, Send, Plus, X } from "lucide-react";
import { useSocket } from "../../providers/SocketProvider";
import { useAuth } from "@clerk/clerk-react";

const categories = [
  "Corporate Law",
  "Civil Litigation",
  "Criminal Law",
  "Family Law",
  "Real Estate",
  "Intellectual Property",
];

const PostCase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { socket } = useSocket();
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
  });

  const handleSubmit = (e) => {
    if (
      formData.title &&
      formData.description &&
      formData.category &&
      formData.location &&
      formData.budget
    ) {
      console.log("Sending data to backend...");
      socket.emit("createCase", formData, userId);
    }
    e.preventDefault();
    if (userId) {
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        budget: "",
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-3 py-6 hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-lg text-gray-600 group-hover:text-gray-900">
            Post a New Case
          </span>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Post a New Case</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter a descriptive title for your case"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                  placeholder="Describe your legal matter in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="City, State"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                Post Case
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PostCase;
