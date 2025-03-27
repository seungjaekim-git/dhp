"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "검색...",
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  
  // 외부 값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // 입력 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // 입력 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(inputValue);
  };
  
  // 입력 지우기
  const handleClear = () => {
    setInputValue("");
    onChange("");
  };
  
  return (
    <form 
      className={cn("relative w-full", className)}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-9 pr-9 h-10"
          autoFocus={autoFocus}
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full aspect-square text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
} 