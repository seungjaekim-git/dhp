'use client';

import { motion } from "framer-motion";

interface AnimatedCEOMessageProps {
  title: string;
  children: React.ReactNode;
}

export default function AnimatedCEOMessage({
  title,
  children,
}: AnimatedCEOMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="md:w-2/3 space-y-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-3xl font-bold text-white leading-tight"
      >
        <span className="text-blue-400">"</span>
        {title}
        <span className="text-blue-400">"</span>
      </motion.h2>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
} 