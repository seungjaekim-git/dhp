"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
  minStepsBetweenThumbs?: number;
  disabled?: boolean;
  className?: string;
}

export function DualRangeSlider({
  min,
  max,
  step = 1,
  defaultValue = [min, max],
  onValueChange,
  formatLabel = (value) => `${value}`,
  minStepsBetweenThumbs = 1,
  disabled = false,
  className
}: DualRangeSliderProps) {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleValueChange = (newValue: number[]) => {
    // Ensure the minimum distance between thumbs
    if (newValue.length === 2) {
      const [newMin, newMax] = newValue;
      if (newMax - newMin < minStepsBetweenThumbs * step) {
        return;
      }
      setValue([newMin, newMax]);
      onValueChange([newMin, newMax]);
    }
  };

  return (
    <div className={cn("w-full px-1", className)}>
      <Slider
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        className={cn("w-full", disabled && "opacity-50 cursor-not-allowed")}
      />
      <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
        <div>{formatLabel(value[0])}</div>
        <div>{formatLabel(value[1])}</div>
      </div>
    </div>
  );
} 