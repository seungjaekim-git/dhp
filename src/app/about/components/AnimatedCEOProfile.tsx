'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface AnimatedCEOProfileProps {
  imageSrc: string;
  name: string;
  title: string;
}

export default function AnimatedCEOProfile({
  imageSrc,
  name,
  title,
}: AnimatedCEOProfileProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="md:w-1/3"
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 blur-lg rounded-lg"></div>
        <Card className="overflow-hidden border border-gray-800 shadow-lg relative bg-gray-900/50 backdrop-blur-sm">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={imageSrc}
              alt={`${name} 프로필`}
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-xl font-medium mb-1"
              >
                {name}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="text-sm text-blue-300"
              >
                {title}
              </motion.p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
} 