'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building, UserRound, History, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicIcon from "./components/DynamicIcon";

const navigationItems = [
  { 
    label: "회사 소개", 
    href: "/about", 
    iconName: "Building",
    description: "대한플러스전자의 소개"
  },
  { 
    label: "CEO 인사말", 
    href: "/about/greeting", 
    iconName: "UserRound",
    description: "대표이사 인사말" 
  },
  { 
    label: "회사 연혁", 
    href: "/about/history", 
    iconName: "History",
    description: "Since 1997" 
  },
  { 
    label: "찾아오시는 길", 
    href: "/about/location", 
    iconName: "MapPin",
    description: "주소 및 주차 안내" 
  },
];

export function AboutSidebar() {
  const pathname = usePathname();

  return (
    <div className="lg:sticky lg:top-8 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            회사소개
          </h2>
          <p className="text-gray-400 text-sm">
            대한플러스전자에 대해 알아보세요
          </p>
        </div>

        <ScrollArea className="h-auto max-h-[calc(100vh-150px)]">
          <nav className="p-3">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                    "hover:bg-blue-500/10",
                    isActive
                      ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                      : "text-gray-400 border-l-2 border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    isActive ? "bg-blue-500/20" : "bg-gray-800"
                  )}>
                    <DynamicIcon 
                      name={item.iconName} 
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-blue-400" : "text-gray-500"
                      )} 
                    />
                  </div>
                  
                  <div>
                    <div className={cn(
                      "font-medium",
                      isActive ? "text-white" : "text-gray-300"
                    )}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        
        {/* Decorative gradient bar at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
      </motion.div>
    </div>
  );
} 