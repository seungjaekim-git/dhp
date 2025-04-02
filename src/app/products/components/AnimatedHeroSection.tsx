'use client';

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface AnimatedHeroSectionProps {
  title: string;
  icon: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
  theme?: 'light' | 'dark';
}

export default function AnimatedHeroSection({
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
  theme = 'light',
}: AnimatedHeroSectionProps) {
  return (
    <div className="relative">
      {/* Background with blue gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/80 z-10" />
        <div className="absolute inset-0 bg-[url('/images/background_img.webp')] bg-cover bg-center opacity-30" />
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-blue-500/10 blur-xl" />
          <div className="absolute top-[40%] right-[10%] w-32 h-32 rounded-full bg-blue-500/5 blur-2xl" />
          <div className="absolute bottom-[20%] left-[30%] w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
      </div>

      <div className="relative z-20 px-6 py-16 sm:px-10 sm:py-24 max-w-7xl mx-auto">
        {/* Breadcrumbs at top - Enlarged */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-base md:text-lg text-gray-300 mb-10"
        >
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-blue-300">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-400/50" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Icon and title group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-500/20">
              {icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              {title}
            </h1>
          </div>

          {/* Description text - enhanced with more prominent styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl max-w-4xl font-light text-gray-200 leading-relaxed">
              {description}
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-400/20 rounded-full"></div>
            <p className="text-lg max-w-3xl text-gray-400">
              신뢰와 기술로 글로벌 전자 부품 산업을 선도하는 기업입니다.
            </p>
          </motion.div>

          {/* Badges - modern, glassy look */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {badges.map((badge, index) => (
              <Badge
                key={index}
                className={`px-4 py-2 text-sm font-medium ${badge.bgColor} ${badge.textColor} ${badge.hoverColor} backdrop-blur-sm border border-blue-500/20 rounded-full`}
              >
                {badge.text}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </div>
  );
} 