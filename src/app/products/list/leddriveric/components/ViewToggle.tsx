"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export default function ViewToggle({
  viewMode,
  onChange,
  className,
}: ViewToggleProps) {
  return (
    <div className={cn("flex items-center border rounded-md overflow-hidden", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('grid')}
        className={cn(
          "rounded-none h-8 px-2",
          viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'
        )}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        <span className="text-xs">그리드</span>
      </Button>
      <div className="h-7 w-px bg-border" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('list')}
        className={cn(
          "rounded-none h-8 px-2",
          viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'
        )}
      >
        <LayoutList className="h-4 w-4 mr-1" />
        <span className="text-xs">리스트</span>
      </Button>
    </div>
  );
} 