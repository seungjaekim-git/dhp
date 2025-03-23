'use client';

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTabContentProps {
  children: React.ReactNode;
}

export default function AnimatedTabContent({
  children,
}: AnimatedTabContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
      {/* Add subtle blur effect at the edges */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-gray-900 to-transparent z-10 pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-900 to-transparent z-10 pointer-events-none opacity-30" />
      
      {/* Subtle blue glow on one side */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
      
      <div className="relative z-0">
        {children}
      </div>
    </motion.div>
  );
} 