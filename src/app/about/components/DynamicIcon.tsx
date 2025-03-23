'use client';

import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  
  return <IconComponent className={cn(className)} />;
} 