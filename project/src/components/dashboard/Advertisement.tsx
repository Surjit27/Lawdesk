import React from "react";
import { motion } from "framer-motion";
import { Bot, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Advertisement = () => {
  const Navigate = useNavigate();
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Legal AI Assistant</h3>
        </div>
        <p className="mb-4 text-blue-100">
          Get instant answers to your legal questions 24/7
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg"
        >
          Try Now <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Law Library</h3>
        </div>
        <p className="mb-4 text-green-100">
          Access comprehensive legal resources
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg"
          onClick={() => Navigate("/law-library")}
        >
          Browse Library <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Advertisement;
