"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// 텍스트 필터
interface TextFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextFilter({ label, value, onChange, placeholder, className }: TextFilterProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      <Input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `${label} 입력...`}
        className="w-full"
      />
    </div>
  );
}

// 단일 슬라이더 필터
interface SingleSliderFilterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function SingleSliderFilter({ 
  label, value, onChange, min, max, step = 1, unit = "", className 
}: SingleSliderFilterProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Label>{label}</Label>
      <div className="px-2">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(vals) => onChange(vals[0])}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{min}{unit}</span>
          <span>{value}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
}

// 듀얼 슬라이더 필터
interface DualSliderFilterProps {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function DualSliderFilter({ 
  label, value, onChange, min, max, step = 1, unit = "", className 
}: DualSliderFilterProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Label>{label}</Label>
      <div className="px-2">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={(vals) => onChange(vals as [number, number])}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{value[0]}{unit}</span>
          <span>{value[1]}{unit}</span>
        </div>
      </div>
    </div>
  );
}

// 체크박스 필터
interface CheckboxFilterProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  className?: string;
}

export function CheckboxFilter({ label, value, onChange, options, className }: CheckboxFilterProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...value, option]);
                } else {
                  onChange(value.filter(v => v !== option));
                }
              }}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 셀렉트 필터
interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export function SelectFilter({ 
  label, value, onChange, options, placeholder, className 
}: SelectFilterProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || `${label} 선택...`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// 콤보박스 필터
interface ComboboxFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function ComboboxFilter({ 
  label, value, onChange, options, placeholder, searchPlaceholder, className 
}: ComboboxFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {value || placeholder || `${label} 선택...`}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder || `${label} 검색...`} />
            <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(option === value ? "" : option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

