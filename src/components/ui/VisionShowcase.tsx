"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const VisionShowcase = ({
  visions,
}: {
  visions: { title: string; description: string; icon: React.ReactNode }[];
}) => {
  const [activeVision, setActiveVision] = useState(0);
  const visionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // 기준점을 화면 중앙으로 설정

      const closestVisionIndex = visionRefs.current.findIndex((vision, index) => {
        if (!vision) return false;
        const rect = vision.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + vision.offsetHeight;
        return scrollPosition >= elementTop && scrollPosition <= elementBottom;
      });

      if (closestVisionIndex !== -1 && closestVisionIndex !== activeVision) {
        setActiveVision(closestVisionIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeVision]);

  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <motion.div
          key={activeVision}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{visions[activeVision].icon}</div>
          <h1 className="text-4xl font-bold">{visions[activeVision].title}</h1>
          <p className="mt-4 text-xl max-w-xl mx-auto">
            {visions[activeVision].description}
          </p>
        </motion.div>
      </div>
      <div className="absolute top-0 w-full">
        {visions.map((vision, index) => (
          <div
            key={index}
            className="h-screen flex items-center justify-center"
            ref={(el) => (visionRefs.current[index] = el)}
          >
            <div className="text-transparent">{vision.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
