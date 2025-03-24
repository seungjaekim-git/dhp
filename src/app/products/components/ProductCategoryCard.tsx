'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCategoryProps {
  category: {
    title: string;
    description: string;
    icon: string;
    color: string;
    href?: string;
  };
  index: number;
}

export function ProductCategoryCard({ category, index }: ProductCategoryProps) {
  const content = (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:bg-gray-750 transition-colors group h-full">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br mb-4 text-2xl"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})` }}
      >
        {category.icon}
      </div>
      
      <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors mb-2">
        {category.title}
      </h3>
      
      <p className="text-gray-300 text-sm">
        {category.description}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
    >
      {category.href ? (
        <Link href={category.href}>{content}</Link>
      ) : (
        content
      )}
    </motion.div>
  );
} 