"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterStatusProps {
  appliedFilters: string[];
  filterState: Record<string, any>;
  onRemoveFilter: (key: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function FilterStatus({
  appliedFilters,
  filterState,
  onRemoveFilter,
  onClearFilters,
  className
}: FilterStatusProps) {
  // 필터가 없을 경우 렌더링하지 않음
  if (appliedFilters.length === 0) return null;
  
  // 필터 레이블 가져오기
  const getFilterLabel = (key: string, value: any): string => {
    switch (key) {
      case 'manufacturers':
        return `제조사: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'packageTypes':
        return `패키지: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'topologies':
        return `토폴로지: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'channels':
        return `채널 수: ${value}`;
      case 'inputVoltage':
        return `입력 전압: ${value[0]}~${value[1]}V`;
      case 'outputVoltage':
        return `출력 전압: ${value[0]}~${value[1]}V`;
      case 'outputCurrent':
        return `출력 전류: ${value[0]}~${value[1]}mA`;
      case 'operatingTemperature':
        return `동작 온도: ${value[0]}~${value[1]}°C`;
      case 'dimmingMethods':
        return `디밍 방식: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'internalSwitch':
        return `내부 스위치: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'thermalPad':
        return `열 패드: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'certifications':
        return `인증: ${Array.isArray(value) ? value.join(', ') : value}`;
      case 'applications':
        return `응용 분야: ${Array.isArray(value) ? value.join(', ') : value}`;
      default:
        return `${key}: ${JSON.stringify(value).replace(/"/g, '')}`;
    }
  };

  return (
    <div className={cn("p-4 border rounded-lg bg-slate-50", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">적용된 필터</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="h-7 text-xs"
        >
          모두 지우기
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map(key => {
          const value = filterState[key];
          if (!value) return null;
          
          return (
            <Badge 
              key={key}
              variant="secondary" 
              className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {getFilterLabel(key, value)}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onRemoveFilter(key)}
              />
            </Badge>
          );
        })}
      </div>
    </div>
  );
} 