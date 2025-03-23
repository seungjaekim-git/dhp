'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedLogoImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function AnimatedLogoImage({
  src,
  alt,
  width,
  height,
}: AnimatedLogoImageProps) {
  return (
    <div className="relative group">
      {/* Subtle glow effect behind logo */}
      <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10"
      >
        {/* Logo with subtle hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain filter drop-shadow-lg"
            style={{ 
              filter: "drop-shadow(0px 2px 8px rgba(59, 130, 246, 0.2))"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 