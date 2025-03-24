'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  app: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    count: number;
    featured: boolean;
  };
  isFeatured: boolean;
}

export function ApplicationCard({ app, isFeatured }: ApplicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/products/applications/${app.id}`} className="block group">
        <div 
          className={cn(
            "rounded-xl p-6 border transition-all duration-300 h-full",
            isFeatured 
              ? "bg-gradient-to-br border-transparent" 
              : "bg-gray-800 border-gray-700 hover:border-gray-600"
          )}
          style={isFeatured ? { backgroundImage: `linear-gradient(to bottom right, ${app.color.split(' ')[1]}20, ${app.color.split(' ')[3]}30)` } : {}}
        >
          <div className="flex justify-between items-start mb-4">
            <div 
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                isFeatured 
                  ? `bg-gradient-to-br ${app.color} text-white` 
                  : "bg-gray-750 text-gray-400"
              )}
            >
              {app.icon}
            </div>
            
            <div 
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium",
                isFeatured 
                  ? "bg-white/10 text-white backdrop-blur-sm" 
                  : "bg-gray-700 text-gray-400"
              )}
            >
              {app.count}개 제품
            </div>
          </div>
          
          <h3 className={cn(
            "text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors",
            isFeatured ? "text-white" : "text-gray-200"
          )}>
            {app.name}
          </h3>
          
          <p className={cn(
            "text-sm line-clamp-2",
            isFeatured ? "text-gray-200" : "text-gray-400"
          )}>
            {app.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
} 