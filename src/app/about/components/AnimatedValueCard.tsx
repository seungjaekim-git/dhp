'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface AnimatedValueCardProps {
  title: string;
  description: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
  delay: number;
}

export default function AnimatedValueCard({
  title,
  description,
  iconName,
  color,
  bg,
  border,
  delay,
}: AnimatedValueCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={cn(
        "h-full border transition-all duration-300",
        bg,
        border,
        "hover:shadow-md hover:-translate-y-1"
      )}>
        <CardContent className="p-6 space-y-4">
          <div className={cn(
            "rounded-full w-12 h-12 flex items-center justify-center",
            "bg-white dark:bg-gray-800",
            "shadow-sm"
          )}>
            <IconComponent className={cn("w-6 h-6", color)} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
} 