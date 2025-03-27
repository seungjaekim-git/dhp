"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FloatingFilterButtonProps {
  onToggle: () => void;
  badgeCount?: number;
}

export default function FloatingFilterButton({
  onToggle,
  badgeCount = 0
}: FloatingFilterButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        className="h-12 w-12 rounded-full shadow-xl flex items-center justify-center"
        size="icon"
        onClick={onToggle}
      >
        <FilterIcon className="h-5 w-5" />
        {badgeCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white"
          >
            {badgeCount}
          </Badge>
        )}
      </Button>
    </div>
  );
} 