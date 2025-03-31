"use client";

import React, { useState, useEffect } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface TripleValueSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number, number]; // [min, typical, max]
  onValueChange: (value: [number, number, number]) => void;
  formatLabel?: (value: number) => string;
  disabled?: boolean;
  showInputs?: boolean;
  unit?: string;
  className?: string;
  formatOptions?: Intl.NumberFormatOptions;
}

export function TripleValueSlider({
  min,
  max,
  step = 1,
  defaultValue = [min, (min + max) / 2, max],
  onValueChange,
  formatLabel,
  disabled = false,
  showInputs = true,
  unit = "",
  className,
  formatOptions = { maximumFractionDigits: 2 }
}: TripleValueSliderProps) {
  const [value, setValue] = useState<[number, number, number]>(defaultValue);
  const [inputMin, setInputMin] = useState<string>(value[0].toString());
  const [inputTyp, setInputTyp] = useState<string>(value[1].toString());
  const [inputMax, setInputMax] = useState<string>(value[2].toString());

  useEffect(() => {
    setValue(defaultValue);
    setInputMin(defaultValue[0].toString());
    setInputTyp(defaultValue[1].toString());
    setInputMax(defaultValue[2].toString());
  }, [defaultValue]);

  const handleMinChange = (newMin: number) => {
    if (newMin <= value[1] && newMin >= min) {
      setValue([newMin, value[1], value[2]]);
      setInputMin(newMin.toString());
      onValueChange([newMin, value[1], value[2]]);
    }
  };

  const handleTypChange = (newTyp: number) => {
    if (newTyp >= value[0] && newTyp <= value[2]) {
      setValue([value[0], newTyp, value[2]]);
      setInputTyp(newTyp.toString());
      onValueChange([value[0], newTyp, value[2]]);
    }
  };

  const handleMaxChange = (newMax: number) => {
    if (newMax >= value[1] && newMax <= max) {
      setValue([value[0], value[1], newMax]);
      setInputMax(newMax.toString());
      onValueChange([value[0], value[1], newMax]);
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setInputMin(newMin);
    
    const numericValue = parseFloat(newMin);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= value[1]) {
      setValue([numericValue, value[1], value[2]]);
      onValueChange([numericValue, value[1], value[2]]);
    }
  };

  const handleTypInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTyp = e.target.value;
    setInputTyp(newTyp);
    
    const numericValue = parseFloat(newTyp);
    if (!isNaN(numericValue) && numericValue >= value[0] && numericValue <= value[2]) {
      setValue([value[0], numericValue, value[2]]);
      onValueChange([value[0], numericValue, value[2]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setInputMax(newMax);
    
    const numericValue = parseFloat(newMax);
    if (!isNaN(numericValue) && numericValue <= max && numericValue >= value[1]) {
      setValue([value[0], value[1], numericValue]);
      onValueChange([value[0], value[1], numericValue]);
    }
  };

  const handleMinBlur = () => {
    const numericValue = parseFloat(inputMin);
    if (isNaN(numericValue) || numericValue < min) {
      setInputMin(min.toString());
      setValue([min, value[1], value[2]]);
      onValueChange([min, value[1], value[2]]);
    } else if (numericValue > value[1]) {
      setInputMin(value[1].toString());
      setValue([value[1], value[1], value[2]]);
      onValueChange([value[1], value[1], value[2]]);
    }
  };

  const handleTypBlur = () => {
    const numericValue = parseFloat(inputTyp);
    if (isNaN(numericValue) || numericValue < value[0]) {
      setInputTyp(value[0].toString());
      setValue([value[0], value[0], value[2]]);
      onValueChange([value[0], value[0], value[2]]);
    } else if (numericValue > value[2]) {
      setInputTyp(value[2].toString());
      setValue([value[0], value[2], value[2]]);
      onValueChange([value[0], value[2], value[2]]);
    }
  };

  const handleMaxBlur = () => {
    const numericValue = parseFloat(inputMax);
    if (isNaN(numericValue) || numericValue > max) {
      setInputMax(max.toString());
      setValue([value[0], value[1], max]);
      onValueChange([value[0], value[1], max]);
    } else if (numericValue < value[1]) {
      setInputMax(value[1].toString());
      setValue([value[0], value[1], value[1]]);
      onValueChange([value[0], value[1], value[1]]);
    }
  };

  const handleReset = () => {
    const defaultTyp = (min + max) / 2;
    setValue([min, defaultTyp, max]);
    setInputMin(min.toString());
    setInputTyp(defaultTyp.toString());
    setInputMax(max.toString());
    onValueChange([min, defaultTyp, max]);
  };

  // Format value with unit
  const formatValueWithUnit = (value: number) => {
    if (formatLabel) {
      return formatLabel(value);
    }
    return `${value.toLocaleString(undefined, formatOptions)}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {showInputs && (
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">최소 (Min)</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={inputMin}
                onChange={handleMinInputChange}
                onBlur={handleMinBlur}
                min={min}
                max={value[1]}
                step={step}
                disabled={disabled}
                className="w-full h-8 text-xs"
              />
              {unit && <span className="text-xs ml-1">{unit}</span>}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">대표값 (Typ)</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={inputTyp}
                onChange={handleTypInputChange}
                onBlur={handleTypBlur}
                min={value[0]}
                max={value[2]}
                step={step}
                disabled={disabled}
                className="w-full h-8 text-xs"
              />
              {unit && <span className="text-xs ml-1">{unit}</span>}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">최대 (Max)</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={inputMax}
                onChange={handleMaxInputChange}
                onBlur={handleMaxBlur}
                min={value[1]}
                max={max}
                step={step}
                disabled={disabled}
                className="w-full h-8 text-xs"
              />
              {unit && <span className="text-xs ml-1">{unit}</span>}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <label className="text-xs text-muted-foreground">Min</label>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={handleReset}
          disabled={disabled || (value[0] === min && value[1] === (min + max) / 2 && value[2] === max)}
        >
          <RefreshCw className="h-3 w-3" />
          <span className="sr-only">초기화</span>
        </Button>
        <label className="text-xs text-muted-foreground">Max</label>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="space-y-1.5">
          <div className="relative">
            <SliderPrimitive.Root
              disabled={disabled}
              min={min}
              max={value[1]}
              step={step}
              value={[value[0]]}
              onValueChange={(newValue) => handleMinChange(newValue[0])}
              className={cn(
                "relative flex h-5 w-full touch-none select-none items-center",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-blue-500 bg-background shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-blue-500 hover:bg-blue-50" />
            </SliderPrimitive.Root>
            <div className="absolute top-0 right-0 h-5 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>{formatValueWithUnit(min)}</span>
            <span className="text-blue-500 font-medium">{formatValueWithUnit(value[0])}</span>
            <span>{formatValueWithUnit(value[1])}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="relative">
            <SliderPrimitive.Root
              disabled={disabled}
              min={value[0]}
              max={value[2]}
              step={step}
              value={[value[1]]}
              onValueChange={(newValue) => handleTypChange(newValue[0])}
              className={cn(
                "relative flex h-5 w-full touch-none select-none items-center",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-green-500" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-green-500 bg-background shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-green-500 hover:bg-green-50" />
            </SliderPrimitive.Root>
            <div className="absolute top-0 left-0 h-5 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="absolute top-0 right-0 h-5 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>{formatValueWithUnit(value[0])}</span>
            <span className="text-green-500 font-medium">{formatValueWithUnit(value[1])}</span>
            <span>{formatValueWithUnit(value[2])}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="relative">
            <SliderPrimitive.Root
              disabled={disabled}
              min={value[1]}
              max={max}
              step={step}
              value={[value[2]]}
              onValueChange={(newValue) => handleMaxChange(newValue[0])}
              className={cn(
                "relative flex h-5 w-full touch-none select-none items-center",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-red-500" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-red-500 bg-background shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-red-500 hover:bg-red-50" />
            </SliderPrimitive.Root>
            <div className="absolute top-0 left-0 h-5 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>{formatValueWithUnit(value[1])}</span>
            <span className="text-red-500 font-medium">{formatValueWithUnit(value[2])}</span>
            <span>{formatValueWithUnit(max)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 