"use client";

import { useState, useEffect, ReactNode } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterProps {
  label: string;
  onFilter: (value: any) => void;
  className?: string;
  onReset?: () => void;
  badge?: boolean;
  isActive?: boolean;
}

// 텍스트 입력 필터
export function TextFilter({
  label,
  onFilter,
  className,
  onReset,
  isActive = false,
}: FilterProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilter(value);
    }
  };

  const handleReset = () => {
    setValue('');
    if (onReset) onReset();
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center">
        <Input
          placeholder={label}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="h-9 bg-gray-800 border-gray-700 text-gray-200"
        />
        {(value || isActive) && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 h-9 w-9 text-gray-400 hover:text-gray-300"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// 단일 슬라이더 필터
export function SingleSliderFilter({
  label,
  onFilter,
  className,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  isActive = false,
}: FilterProps & {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  const [value, setValue] = useState<number>(min);

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  const handleValueChange = () => {
    onFilter(value);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-normal text-gray-400">{label}</Label>
        <span className="text-xs font-medium text-gray-300">
          {value}{unit}
        </span>
      </div>
      <Slider
        defaultValue={[min]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        onValueCommit={handleValueChange}
        className="cursor-pointer"
      />
    </div>
  );
}

// 듀얼 슬라이더 필터
export function DualSliderFilter({
  label,
  onFilter,
  className,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  isActive = false,
  defaultValue = [min, max],
  onReset,
}: FilterProps & {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue?: [number, number];
}) {
  const [values, setValues] = useState<[number, number]>(defaultValue);

  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues as [number, number]);
  };

  const handleValueChange = () => {
    onFilter(values);
  };

  const handleReset = () => {
    setValues([min, max]);
    if (onReset) onReset();
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-normal text-gray-400">{label}</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-300">
            {values[0]}{unit} - {values[1]}{unit}
          </span>
          {isActive && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full p-0 text-gray-400 hover:text-gray-300"
              onClick={handleReset}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      <Slider
        value={values}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        onValueCommit={handleValueChange}
        className="cursor-pointer"
      />
    </div>
  );
}

// 체크박스 필터
export function CheckboxFilter({
  label,
  options,
  onFilter,
  className,
  isActive = false,
  onReset,
}: FilterProps & {
  options: {
    id: string;
    label: string;
    count?: number;
    icon?: ReactNode;
  }[];
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        const newSelected = prev.filter(item => item !== id);
        onFilter(newSelected);
        return newSelected;
      } else {
        const newSelected = [...prev, id];
        onFilter(newSelected);
        return newSelected;
      }
    });
  };

  const handleReset = () => {
    setSelected([]);
    if (onReset) onReset();
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-200">{label}</Label>
        {isActive && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
        {options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selected.includes(option.id)}
              onCheckedChange={() => toggleOption(option.id)}
              className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-normal cursor-pointer flex-1 flex items-center gap-2 text-gray-300"
            >
              {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
              {option.label}
            </Label>
            {option.count !== undefined && (
              <span className="text-xs text-gray-400">{option.count}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 드롭다운 셀렉트 필터
export function SelectFilter({
  label,
  options,
  onFilter,
  className,
  isActive = false,
  onReset,
  placeholder = "선택..."
}: FilterProps & {
  options: {
    value: string;
    label: string;
    icon?: ReactNode;
  }[];
  placeholder?: string;
}) {
  const [value, setValue] = useState<string>('');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onFilter(newValue);
  };

  const handleReset = () => {
    setValue('');
    if (onReset) onReset();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-200">{label}</Label>
        {isActive && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-gray-200">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
          {options.map(option => (
            <SelectItem key={option.value} value={option.value} className="focus:bg-gray-700 focus:text-white">
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// 컴보박스 필터
export function ComboboxFilter({
  label,
  options,
  onFilter,
  className,
  isActive = false,
  onReset,
  placeholder = "검색..."
}: FilterProps & {
  options: {
    value: string;
    label: string;
    icon?: ReactNode;
  }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const filteredOptions = search
    ? options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    onFilter(currentValue);
  };

  const handleReset = () => {
    setValue('');
    if (onReset) onReset();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-200">{label}</Label>
        {isActive && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          >
            {value
              ? options.find(option => option.value === value)?.label || value
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700 text-gray-200">
          <Command className="w-full bg-gray-800">
            <CommandInput 
              placeholder={placeholder}
              className="bg-gray-800 text-gray-200"
              onValueChange={setSearch}
            />
            <CommandEmpty className="py-2 px-4 text-gray-400 text-sm">
              검색 결과가 없습니다.
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {filteredOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-700"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.icon}
                    {option.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 