"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X, Filter, ChevronUp, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FilterIcon } from "lucide-react";

interface TextFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextFilter({ label, value, onChange }: TextFilterProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={`${label} 검색...`}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="h-8"
      />
    </div>
  );
}

interface CheckboxFilterProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

export function CheckboxFilter({ label, value = [], onChange, options }: CheckboxFilterProps) {
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="space-y-2 mt-1">
        {options.map(option => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${label}-${option}`}
              checked={value.includes(option)}
              onCheckedChange={() => handleToggle(option)}
              className="data-[state=checked]:bg-blue-600"
            />
            <label
              htmlFor={`${label}-${option}`}
              className="text-sm cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function SelectFilter({ label, value, onChange, options }: SelectFilterProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={value || 'all'} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`${label || '옵션'} 선택...`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface MultiSelectFilterProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

export function MultiSelectFilter({ label, value = [], onChange, options }: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };
  
  const clearSelection = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-9"
          >
            {value.length > 0 ? (
              <div className="flex items-center gap-1 flex-wrap max-w-full">
                <span className="text-sm truncate mr-1">
                  {value.length}개 선택됨
                </span>
                {value.length > 0 && (
                  <X
                    className="h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelection();
                    }}
                  />
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">{label || '옵션'} 선택...</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={`${label || '옵션'} 검색...`} />
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {options.map(option => (
                    <CommandItem
                      key={option}
                      onSelect={() => handleToggle(option)}
                      className="flex items-center"
                    >
                      <Checkbox
                        className="mr-2"
                        checked={value.includes(option)}
                      />
                      <span>{option}</span>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
            <div className="border-t p-2 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearSelection()}
                className="text-xs"
              >
                초기화
              </Button>
              <Button
                size="sm"
                onClick={() => setOpen(false)}
                className="text-xs"
              >
                적용
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map(item => (
            <Badge
              key={item}
              variant="secondary"
              className="text-xs py-0 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              {item}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleToggle(item)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

interface ComboboxFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function ComboboxFilter({ label, value, onChange, options }: ComboboxFilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-8"
          >
            {value || `${label || '옵션'} 선택...`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`${label || '옵션'} 검색...`} />
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onChange('all');
                    setOpen(false);
                  }}
                  className="flex items-center"
                >
                  <span>전체</span>
                  {value === 'all' && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
                {options.map(option => (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <span>{option}</span>
                    {value === option && <Check className="ml-auto h-4 w-4" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface SingleSliderFilterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
}

export function SingleSliderFilter({ label, value, onChange, min, max, unit }: SingleSliderFilterProps) {
  const displayValue = value !== undefined ? value : min;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        {label && <Label>{label}</Label>}
        <span className="text-sm">
          {displayValue} {unit && unit}
        </span>
      </div>
      <Slider
        value={[displayValue]}
        min={min}
        max={max}
        step={(max - min) / 100}
        onValueChange={values => onChange(values[0])}
        className="py-4"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min} {unit && unit}</span>
        <span>{max} {unit && unit}</span>
      </div>
    </div>
  );
}

interface DualSliderFilterProps {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  unit?: string;
}

export function DualSliderFilter({ label, value = [0, 100], onChange, min, max, unit }: DualSliderFilterProps) {
  const displayValues: [number, number] = [
    value[0] !== undefined ? value[0] : min,
    value[1] !== undefined ? value[1] : max
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        {label && <Label>{label}</Label>}
        <span className="text-sm">
          {displayValues[0]} ~ {displayValues[1]} {unit && unit}
        </span>
      </div>
      <Slider
        value={displayValues}
        min={min}
        max={max}
        step={(max - min) / 100}
        onValueChange={values => onChange([values[0], values[1]])}
        className="py-4"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min} {unit && unit}</span>
        <span>{max} {unit && unit}</span>
      </div>
    </div>
  );
}

export function LEDDriverICFilters({
  filterState,
  filterOptions,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  appliedFilters
}: {
  filterState: Record<string, any>;
  filterOptions: any;
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  appliedFilters: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 제조사 필터 */}
        <MultiSelectFilter
          label="제조사"
          value={filterState.manufacturers || []}
          onChange={(value) => onFilterChange('manufacturers', value.length > 0 ? value : undefined)}
          options={filterOptions.manufacturers || []}
        />

        {/* 패키지 타입 필터 */}
        <MultiSelectFilter
          label="패키지 타입"
          value={filterState.packageTypes || []}
          onChange={(value) => onFilterChange('packageTypes', value.length > 0 ? value : undefined)}
          options={filterOptions.packageTypes || []}
        />

        {/* 채널 수 필터 */}
        <TextFilter
          label="채널 수"
          value={filterState.channels || ''}
          onChange={(value) => onFilterChange('channels', value || undefined)}
        />

        {/* 입력 전압 필터 */}
        <DualSliderFilter
          label="입력 전압"
          value={filterState.inputVoltage || [filterOptions.voltageRange?.input?.min || 0, filterOptions.voltageRange?.input?.max || 60]}
          onChange={(value) => onFilterChange('inputVoltage', value)}
          min={filterOptions.voltageRange?.input?.min || 0}
          max={filterOptions.voltageRange?.input?.max || 60}
          unit="V"
        />

        {/* 출력 전류 필터 */}
        <DualSliderFilter
          label="출력 전류"
          value={filterState.outputCurrent || [filterOptions.currentRange?.output?.min || 0, filterOptions.currentRange?.output?.max || 1500]}
          onChange={(value) => onFilterChange('outputCurrent', value)}
          min={filterOptions.currentRange?.output?.min || 0}
          max={filterOptions.currentRange?.output?.max || 1500}
          unit="mA"
        />

        {/* 토폴로지 필터 */}
        <MultiSelectFilter
          label="토폴로지"
          value={filterState.topologies || []}
          onChange={(value) => onFilterChange('topologies', value.length > 0 ? value : undefined)}
          options={filterOptions.topologies || ["Buck", "Boost", "Buck-Boost", "Charge Pump", "Linear Regulator", "Constant Current Sink", "SEPIC", "Flyback", "Forward", "Half-Bridge", "Full-Bridge"]}
        />

        {/* 디밍 방식 필터 */}
        <MultiSelectFilter
          label="디밍 방식"
          value={filterState.dimmingMethods || []}
          onChange={(value) => onFilterChange('dimmingMethods', value.length > 0 ? value : undefined)}
          options={filterOptions.dimmingMethods || ["PWM", "Analog"]}
        />

        {/* 내부 스위치 필터 */}
        <MultiSelectFilter
          label="내부 스위치"
          value={filterState.internalSwitch || []}
          onChange={(value) => onFilterChange('internalSwitch', value.length > 0 ? value : undefined)}
          options={["있음", "없음"]}
        />

        {/* 써멀 패드 필터 */}
        <MultiSelectFilter
          label="써멀 패드"
          value={filterState.thermalPad || []}
          onChange={(value) => onFilterChange('thermalPad', value.length > 0 ? value : undefined)}
          options={["있음", "없음"]}
        />

        {/* 동작 온도 필터 */}
        <DualSliderFilter
          label="동작 온도"
          value={filterState.operatingTemperature || [-40, 125]}
          onChange={(value) => onFilterChange('operatingTemperature', value)}
          min={-55}
          max={150}
          unit="°C"
        />

        {/* 인증 필터 */}
        <MultiSelectFilter
          label="인증"
          value={filterState.certifications || []}
          onChange={(value) => onFilterChange('certifications', value.length > 0 ? value : undefined)}
          options={filterOptions.certifications || []}
        />

        {/* 응용 분야 필터 */}
        <MultiSelectFilter
          label="응용 분야"
          value={filterState.applications || []}
          onChange={(value) => onFilterChange('applications', value.length > 0 ? value : undefined)}
          options={filterOptions.applications || []}
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="outline" onClick={onClearFilters} disabled={appliedFilters.length === 0}>
          <X className="mr-2 h-4 w-4" />
          필터 초기화
        </Button>
        <Button onClick={onApplyFilters}>
          <Check className="mr-2 h-4 w-4" />
          필터 적용
        </Button>
      </div>
    </div>
  );
}

// 간소화된 필터 컴포넌트 (모바일 최적화)
export function CompactLEDDriverICFilters({
  filterState,
  filterOptions,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  appliedFilters
}: {
  filterState: Record<string, any>;
  filterOptions: any;
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  appliedFilters: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 items-center">
        {/* 필터 버튼 */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <FilterIcon className="h-4 w-4 mr-2" />
              필터
              {appliedFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {appliedFilters.length}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>필터 설정</DialogTitle>
            </DialogHeader>
            <LEDDriverICFilters
              filterState={filterState}
              filterOptions={filterOptions}
              onFilterChange={onFilterChange}
              onApplyFilters={onApplyFilters}
              onClearFilters={onClearFilters}
              appliedFilters={appliedFilters}
            />
          </DialogContent>
        </Dialog>

        {/* 주요 필터 빠른 접근 */}
        {/* 제조사 필터 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 truncate max-w-[150px]">
              제조사 {filterState.manufacturers && filterState.manufacturers.length > 0 && 
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {filterState.manufacturers.length}
                </Badge>
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <MultiSelectFilter
                label=""
                value={filterState.manufacturers || []}
                onChange={(value) => onFilterChange('manufacturers', value.length > 0 ? value : undefined)}
                options={filterOptions.manufacturers || []}
              />
              <div className="flex justify-end pt-2">
                <Button size="sm" onClick={onApplyFilters}>적용</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* 패키지 타입 필터 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 truncate max-w-[150px]">
              패키지 {filterState.packageTypes && filterState.packageTypes.length > 0 && 
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {filterState.packageTypes.length}
                </Badge>
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <MultiSelectFilter
                label=""
                value={filterState.packageTypes || []}
                onChange={(value) => onFilterChange('packageTypes', value.length > 0 ? value : undefined)}
                options={filterOptions.packageTypes || []}
              />
              <div className="flex justify-end pt-2">
                <Button size="sm" onClick={onApplyFilters}>적용</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* 토폴로지 필터 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 truncate max-w-[150px]">
              토폴로지 {filterState.topologies && filterState.topologies.length > 0 && 
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {filterState.topologies.length}
                </Badge>
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <MultiSelectFilter
                label=""
                value={filterState.topologies || []}
                onChange={(value) => onFilterChange('topologies', value.length > 0 ? value : undefined)}
                options={filterOptions.topologies || ["Buck", "Boost", "Buck-Boost", "Charge Pump", "Linear Regulator", "Constant Current Sink", "SEPIC", "Flyback", "Forward", "Half-Bridge", "Full-Bridge"]}
              />
              <div className="flex justify-end pt-2">
                <Button size="sm" onClick={onApplyFilters}>적용</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {appliedFilters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters} 
            className="h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4 mr-1" />
            초기화
          </Button>
        )}
      </div>

      {/* 활성화된 필터 태그 표시 */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(filterState)
            .filter(([key]) => appliedFilters.includes(key))
            .map(([key, value]) => (
              <Badge 
                key={key}
                variant="secondary" 
                className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {getFilterLabel(key, value)}
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={() => {
                    onFilterChange(key, undefined);
                    onApplyFilters();
                  }}
                />
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}

function getFilterLabel(key: string, value: any) {
  switch (key) {
    case 'manufacturers':
      return `제조사: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'packageTypes':
      return `패키지: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'topologies':
      return `토폴로지: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'channels':
      return `채널 수: ${value}`;
    case 'inputVoltage':
      return `입력 전압: ${value[0]}~${value[1]}V`;
    case 'outputCurrent':
      return `출력 전류: ${value[0]}~${value[1]}mA`;
    case 'dimmingMethods':
      return `디밍 방식: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'certifications':
      return `인증: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'applications':
      return `응용 분야: ${Array.isArray(value) ? `${value.length}개 선택됨` : value}`;
    case 'internalSwitch':
      return `내부 스위치: ${Array.isArray(value) ? value.join(', ') : value}`;
    case 'thermalPad':
      return `써멀 패드: ${Array.isArray(value) ? value.join(', ') : value}`;
    case 'operatingTemperature':
      return `동작 온도: ${value[0]}~${value[1]}°C`;
    default:
      return `${key}: ${value}`;
  }
}

