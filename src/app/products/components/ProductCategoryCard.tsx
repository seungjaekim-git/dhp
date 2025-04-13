'use client';

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";

interface SubCategory {
  name: string;
  description?: string;
}

interface ProductCategoryProps {
  category: {
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
    href?: string;
    disabled?: boolean;
    comingSoon?: boolean;
    subcategories?: SubCategory[];
  };
  index: number;
}

export function ProductCategoryCard({ category, index }: ProductCategoryProps) {
  const content = (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 group h-full relative overflow-hidden ${category.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10'}`}>
      {category.comingSoon && (
        <div className="absolute top-3 right-3 bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          <span>준비중</span>
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br text-white"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})` }}
        >
          {category.icon}
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
            {category.title}
          </h3>
          
          <p className="text-gray-300 text-sm mt-1">
            {category.description}
          </p>
        </div>
      </div>
      
      {category.subcategories && category.subcategories.length > 0 && !category.disabled && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <h4 className="text-sm font-medium text-gray-400 mb-2">주요 제품</h4>
          <ul className="space-y-2">
            {category.subcategories.slice(0, 3).map((sub, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <ChevronRight className="w-3 h-3 mr-1 text-blue-400" />
                {sub.name}
              </li>
            ))}
            {category.subcategories.length > 3 && (
              <li className="text-xs text-gray-500">
                +{category.subcategories.length - 3}개 더 보기
              </li>
            )}
          </ul>
        </div>
      )}
      
      {category.disabled && (
        <div className="mt-4 text-xs text-gray-500">
          현재 준비 중입니다. 곧 서비스가 시작될 예정입니다.
        </div>
      )}
      
      {!category.disabled && (
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-end">
          <span className="text-xs text-blue-400 flex items-center">
            자세히 보기
            <ChevronRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className="h-full"
    >
      {category.href && !category.disabled ? (
        <Link href={category.href} className="block h-full">{content}</Link>
      ) : (
        content
      )}
    </motion.div>
  );
} 