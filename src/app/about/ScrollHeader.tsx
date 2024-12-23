"use client";

import React, { useState, useEffect } from "react";
import { throttle } from "lodash";

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
    };
  }, []);

  return (
    <div
      className={`sticky top-[64px] z-40 transition-all duration-300 ease-in-out rounded-2xl grid grid-cols-5 gap-4 ${
        isScrolled
          ? "bg-white shadow-md border border-gray-200 p-4 m-2"
          : "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4"
      }`}
    >
      <div className="flex flex-col md:col-span-4 col-span-3">
        <div
          className={`flex items-center gap-2 text-sm text-gray-600 mb-4 ${
            isScrolled ? "hidden" : ""
          }`}
        >
          {children}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`transition-all duration-300 ${
                isScrolled
                  ? "w-6 h-6 bg-gray-100 text-gray-600"
                  : "w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-500 to-sky-400 text-white"
              } rounded-xl flex items-center justify-center`}
            >
              {icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h1
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "text-sm md:text-base font-medium"
                      : "text-lg md:text-xl font-bold"
                  } text-gray-900`}
                >
                  {title}
                </h1>

                <div className="flex gap-2 ml-2">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${badge.bgColor} ${badge.textColor} ${badge.hoverColor}`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`mt-4 text-gray-600 text-sm leading-relaxed ${
            isScrolled ? "hidden" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
