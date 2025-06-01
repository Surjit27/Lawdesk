import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextAnimation } from "./animations/TextAnimation";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
          alt="Law firm interior"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <TextAnimation>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Justice with{" "}
              <motion.span
                className="text-green-500"
                animate={{
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Excellence
              </motion.span>{" "}
              & Integrity
            </h1>
          </TextAnimation>

          <TextAnimation delay={0.3}>
            <p className="text-xl text-gray-300 mb-8">
              With over 25 years of experience, we provide exceptional legal
              services across corporate, civil, and criminal law matters.
            </p>
          </TextAnimation>

          <TextAnimation delay={0.6}>
            <motion.button
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-8 py-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors group"
              onClick={() => {
                navigate("/user-onboarding");
              }}
            >
              Schedule Consultation
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </TextAnimation>
        </div>
      </div>
    </div>
  );
};

export default Hero;
