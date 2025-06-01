import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export const TextAnimation = ({ children, delay = 0 }: TextAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      {children}
    </motion.div>
  );
};

export const SlideInText = ({ children, delay = 0 }: TextAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};