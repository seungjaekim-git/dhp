'use client';

import React from "react";
import { motion } from "framer-motion";

interface ContentSectionClientProps {
  children: React.ReactNode;
}

export function ContentSectionClient({
  children,
}: ContentSectionClientProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
        {/* Decorative blue accent at top */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-blue-500/5 blur-2xl" />
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        
        {children}
      </div>
    </motion.div>
  );
} 