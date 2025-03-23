'use client';

import { motion } from "framer-motion";
import { Card, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnimatedFeatureCardProps {
  name: string;
  description: string;
  href: string;
  color: string;
  iconColor: string;
  iconName: string;
  index: number;
}

export default function AnimatedFeatureCard({
  name,
  description,
  href,
  color,
  iconColor,
  iconName,
  index,
}: AnimatedFeatureCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={href} className="h-full block">
        <Card className="h-full overflow-hidden border-0 bg-gray-900 shadow-lg hover:shadow-blue-500/5 transition-all duration-300 relative group">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-blue-500/30 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Blur effect in background */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 h-full">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-blue-300 transition-colors">{name}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 backdrop-blur-sm flex items-center justify-center border border-blue-500/20">
                <IconComponent className={cn("w-5 h-5 text-blue-400")} />
              </div>
            </div>
            
            <div className="mt-8 text-xs text-gray-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
              자세히 보기
              <ExternalLink className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
} 