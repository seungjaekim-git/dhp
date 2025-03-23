'use client';

import { motion } from "framer-motion";

interface AnimatedSectionTitleProps {
  title: string;
  description?: string;
}

export default function AnimatedSectionTitle({
  title,
  description,
}: AnimatedSectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
} 