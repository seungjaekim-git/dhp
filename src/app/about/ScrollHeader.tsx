"use client";

import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScrollHeaderProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
  children?: React.ReactNode;
}

export default function ScrollHeader({
  title,
  icon,
  description,
  badges = [],
  children,
}: ScrollHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);

    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 0);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky top-4 z-40 transition-all duration-300 ease-in-out rounded-2xl",
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-800 p-4"
          : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 border border-gray-200 dark:border-gray-800 p-6"
      )}
    >
      <div className="w-full flex flex-col">
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex items-center justify-center rounded-xl transition-all duration-300",
                isScrolled
                  ? "w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  : "w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
              )}
            >
              {icon}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  className={cn(
                    "transition-all duration-300 text-gray-900 dark:text-gray-100",
                    isScrolled
                      ? "text-base font-medium"
                      : "text-xl font-bold"
                  )}
                >
                  {title}
                </h1>

                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "transition-all text-xs font-medium",
                        badge.bgColor,
                        badge.textColor,
                        badge.hoverColor,
                        isScrolled ? "scale-90" : "scale-100"
                      )}
                    >
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isScrolled && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
