'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building } from "lucide-react";
import { motion } from "framer-motion";

interface ManufacturerCardProps {
  manufacturer: any;
  index: number;
}

export function ManufacturerCard({ manufacturer, index }: ManufacturerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/products/manufacturers/${manufacturer.id}`}>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:bg-gray-750 transition-colors group">
          <div className="flex items-center gap-4 mb-4">
            {manufacturer.logo ? (
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src={manufacturer.logo} 
                  alt={manufacturer.name} 
                  width={48} 
                  height={48}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-gray-400" />
              </div>
            )}
            
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{manufacturer.name}</h3>
              <p className="text-sm text-gray-400">{manufacturer.country_id}</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{manufacturer.description}</p>
          
          {manufacturer.product_category && (
            <div className="flex flex-wrap gap-2">
              {Array.isArray(manufacturer.product_category) ? 
                manufacturer.product_category.map((category: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full">
                    {category}
                  </span>
                )) : 
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full">
                  {manufacturer.product_category}
                </span>
              }
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
} 