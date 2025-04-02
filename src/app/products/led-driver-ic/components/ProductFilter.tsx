'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, X, Filter, ArrowDownUp, ChevronDown, ChevronUp, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProductFilterProps {
  filterOptions: any;
  activeFilters: {
    manufacturers: number[];
    topologies: string[];
    dimmingMethods: string[];
    packageTypes: string[];
    channels: string[];
    inputVoltage: [number, number];
    outputVoltage: [number, number];
    outputCurrent: [number, number];
    switchingFrequency: [number, number];
    operatingTemperature: [number, number];
    hasInternalSwitch: boolean | null;
    hasThermalPad: boolean | null;
    communicationInterfaces: string[];
    pwmResolutions: string[];
    [key: string]: any;
  };
  filterCounts: {
    manufacturers: number;
    topologies: number;
    dimmingMethods: number;
    packageTypes: number;
    channels: number;
    voltages: number;
    currents: number;
    frequencies: number;
    temperatures: number;
    internalSwitch: number;
    thermalPad: number;
    communicationInterfaces: number;
    pwmResolutions: number;
    total: number;
  };
  sortOption: {field: string, direction: 'asc' | 'desc'};
  onFilterChange: (filterType: string, value: any) => void;
  onSortChange: (field: string) => void;
  onResetFilters: () => void;
}

export default function ProductFilter({
  filterOptions,
  activeFilters,
  filterCounts,
  sortOption,
  onFilterChange,
  onSortChange,
  onResetFilters
}: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const [expandAdvanced, setExpandAdvanced] = useState(false)
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>(['basic'])
  const [tempFilters, setTempFilters] = useState(activeFilters)

  // 컴포넌트 마운트 시 임시 필터 상태 초기화
  useEffect(() => {
    setTempFilters(activeFilters);
  }, [activeFilters]);

  // 아코디언 토글 핸들러
  const toggleAccordion = useCallback((value: string) => {
    setExpandedAccordions(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    )
  }, [])

  // 임시 필터 변경 핸들러
  const changeTempFilter = useCallback((filterType: string, value: any) => {
    setTempFilters(prev => {
      // 배열 필터인 경우
      if (Array.isArray(prev[filterType]) && !Array.isArray(value)) {
        // 체크박스 토글 형식 (추가/제거)
        const array = prev[filterType] as any[];
        return {
          ...prev,
          [filterType]: array.includes(value)
            ? array.filter(item => item !== value)
            : [...array, value]
        };
      }
      // 그 외의 경우 직접 값 설정
      return {
        ...prev,
        [filterType]: value
      };
    });
  }, []);

  // 필터 적용 핸들러
  const applyFilters = useCallback(() => {
    // 실제 필터 상태에 임시 필터 상태 적용
    Object.entries(tempFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
    setOpen(false);
  }, [tempFilters, onFilterChange]);

  // 필터 초기화 핸들러
  const resetTempFilters = useCallback(() => {
    // 모든 필터 초기화
    const resetFilters = {
      manufacturers: [],
      topologies: [],
      dimmingMethods: [],
      packageTypes: [],
      channels: [],
      inputVoltage: [
        filterOptions?.voltage?.input?.min || 0, 
        filterOptions?.voltage?.input?.max || 100
      ],
      outputVoltage: [
        filterOptions?.voltage?.output?.min || 0, 
        filterOptions?.voltage?.output?.max || 100
      ],
      outputCurrent: [
        filterOptions?.current?.output?.min || 0, 
        filterOptions?.current?.output?.max || 5000
      ],
      switchingFrequency: [
        filterOptions?.frequency?.switching?.min || 0, 
        filterOptions?.frequency?.switching?.max || 2000
      ],
      operatingTemperature: [
        filterOptions?.temperature?.operating?.min || -40, 
        filterOptions?.temperature?.operating?.max || 125
      ],
      hasInternalSwitch: null,
      hasThermalPad: null,
      communicationInterfaces: [],
      pwmResolutions: [],
    };
    
    setTempFilters(resetFilters);
  }, [filterOptions]);

  // 필터 변경 후 즉시 적용
  useEffect(() => {
    const handleResetAllFilters = () => {
      resetTempFilters();
      onResetFilters();
    };

    window.addEventListener('reset-all-filters', handleResetAllFilters);
    return () => window.removeEventListener('reset-all-filters', handleResetAllFilters);
  }, [resetTempFilters, onResetFilters]);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* 모바일 필터 버튼 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "gap-2 h-12 px-4",
              open 
                ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
            )}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">필터</span>
            {filterCounts.total > 0 && (
              <Badge className="ml-1 bg-blue-500/20 text-blue-400 border-blue-500/30">
                {filterCounts.total}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md bg-gray-900 border-gray-800 text-white p-0"
        >
          <SheetHeader className="p-6 border-b border-gray-800">
            <SheetTitle className="text-xl text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-400" />
              필터 옵션
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              원하는 조건에 맞게 제품을 필터링하세요
              <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-yellow-300 text-xs">
                <p>참고: 선택한 필터 조건에 해당하는 정보가 없는 제품은 검색 결과에서 제외됩니다.</p>
              </div>
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-12rem)] pt-2">
            <div className="p-6 space-y-6">
              <Accordion 
                type="multiple"
                value={expandedAccordions}
                className="w-full"
              >
                {/* 기본 필터 섹션 */}
                <AccordionItem value="basic" className="border-b border-gray-800">
                  <AccordionTrigger 
                    onClick={() => toggleAccordion('basic')}
                    className="py-4 text-white hover:no-underline"
                  >
                    <span className="text-md font-medium">기본 정보</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 space-y-5">
                    {/* 제조사 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>제조사</span>
                        {tempFilters.manufacturers.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.manufacturers.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1">
                        {filterOptions?.manufacturers?.map((manufacturer: any) => (
                          <div key={manufacturer.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-manufacturer-${manufacturer.id}`}
                              checked={tempFilters.manufacturers.includes(manufacturer.id)}
                              onCheckedChange={() => changeTempFilter('manufacturers', manufacturer.id)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-manufacturer-${manufacturer.id}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {manufacturer.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 토폴로지 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>토폴로지</span>
                        {tempFilters.topologies.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.topologies.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1">
                        {filterOptions?.topologies?.map((topology: string) => (
                          <div key={topology} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-topology-${topology}`}
                              checked={tempFilters.topologies.includes(topology)}
                              onCheckedChange={() => changeTempFilter('topologies', topology)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-topology-${topology}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {topology}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 디밍 방식 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>디밍 방식</span>
                        {tempFilters.dimmingMethods.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.dimmingMethods.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1">
                        {filterOptions?.dimmingMethods?.map((method: string) => (
                          <div key={method} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-dimming-${method}`}
                              checked={tempFilters.dimmingMethods.includes(method)}
                              onCheckedChange={() => changeTempFilter('dimmingMethods', method)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-dimming-${method}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {method}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 채널 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>채널</span>
                        {tempFilters.channels.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.channels.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1 grid grid-cols-2">
                        {filterOptions?.channels?.map((channel: string) => (
                          <div key={channel} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-channel-${channel}`}
                              checked={tempFilters.channels.includes(channel)}
                              onCheckedChange={() => changeTempFilter('channels', channel)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-channel-${channel}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {channel} 채널
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 내부 스위치 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium">내부 스위치</h3>
                      <div className="space-y-2 pl-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sheet-internal-switch-yes"
                            checked={tempFilters.hasInternalSwitch === true}
                            onCheckedChange={() => changeTempFilter('hasInternalSwitch', 
                              tempFilters.hasInternalSwitch === true ? null : true)}
                            className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <Label 
                            htmlFor="sheet-internal-switch-yes"
                            className="text-sm text-gray-300 cursor-pointer hover:text-white"
                          >
                            내장
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sheet-internal-switch-no"
                            checked={tempFilters.hasInternalSwitch === false}
                            onCheckedChange={() => changeTempFilter('hasInternalSwitch', 
                              tempFilters.hasInternalSwitch === false ? null : false)}
                            className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <Label 
                            htmlFor="sheet-internal-switch-no"
                            className="text-sm text-gray-300 cursor-pointer hover:text-white"
                          >
                            외장
                          </Label>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 물리적 특성 섹션 */}
                <AccordionItem value="physical" className="border-b border-gray-800">
                  <AccordionTrigger 
                    onClick={() => toggleAccordion('physical')}
                    className="py-4 text-white hover:no-underline"
                  >
                    <span className="text-md font-medium">물리적 특성</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 space-y-5">
                    {/* 패키지 타입 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>패키지 타입</span>
                        {tempFilters.packageTypes.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.packageTypes.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1 grid grid-cols-2">
                        {filterOptions?.packageTypes?.map((type: string) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-package-${type}`}
                              checked={tempFilters.packageTypes.includes(type)}
                              onCheckedChange={() => changeTempFilter('packageTypes', type)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-package-${type}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Thermal Pad 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium">Thermal Pad</h3>
                      <div className="space-y-2 pl-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sheet-thermal-pad-yes"
                            checked={tempFilters.hasThermalPad === true}
                            onCheckedChange={() => changeTempFilter('hasThermalPad', 
                              tempFilters.hasThermalPad === true ? null : true)}
                            className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <Label 
                            htmlFor="sheet-thermal-pad-yes"
                            className="text-sm text-gray-300 cursor-pointer hover:text-white"
                          >
                            있음
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sheet-thermal-pad-no"
                            checked={tempFilters.hasThermalPad === false}
                            onCheckedChange={() => changeTempFilter('hasThermalPad', 
                              tempFilters.hasThermalPad === false ? null : false)}
                            className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <Label 
                            htmlFor="sheet-thermal-pad-no"
                            className="text-sm text-gray-300 cursor-pointer hover:text-white"
                          >
                            없음
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* 동작 온도 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>동작 온도 범위</span>
                        {(tempFilters.operatingTemperature[0] > (filterOptions?.temperature?.operating?.min || -40) || 
                          tempFilters.operatingTemperature[1] < (filterOptions?.temperature?.operating?.max || 125)) && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            설정됨
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{tempFilters.operatingTemperature[0]}°C</span>
                          <span>{tempFilters.operatingTemperature[1]}°C</span>
                        </div>
                        <Slider
                          defaultValue={[
                            filterOptions?.temperature?.operating?.min || -40, 
                            filterOptions?.temperature?.operating?.max || 125
                          ]}
                          value={tempFilters.operatingTemperature}
                          min={filterOptions?.temperature?.operating?.min || -40}
                          max={filterOptions?.temperature?.operating?.max || 125}
                          step={1}
                          onValueChange={(value) => changeTempFilter('operatingTemperature', value)}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 전기적 특성 섹션 */}
                <AccordionItem value="electrical" className="border-b border-gray-800">
                  <AccordionTrigger 
                    onClick={() => toggleAccordion('electrical')}
                    className="py-4 text-white hover:no-underline"
                  >
                    <span className="text-md font-medium">전기적 특성</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 space-y-5">
                    {/* 입력 전압 범위 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>입력 전압 범위</span>
                        {(tempFilters.inputVoltage[0] > (filterOptions?.voltage?.input?.min || 0) || 
                          tempFilters.inputVoltage[1] < (filterOptions?.voltage?.input?.max || 100)) && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            설정됨
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{tempFilters.inputVoltage[0]}V</span>
                          <span>{tempFilters.inputVoltage[1]}V</span>
                        </div>
                        <Slider
                          defaultValue={[
                            filterOptions?.voltage?.input?.min || 0, 
                            filterOptions?.voltage?.input?.max || 100
                          ]}
                          value={tempFilters.inputVoltage}
                          min={filterOptions?.voltage?.input?.min || 0}
                          max={filterOptions?.voltage?.input?.max || 100}
                          step={1}
                          onValueChange={(value) => changeTempFilter('inputVoltage', value)}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                      </div>
                    </div>

                    {/* 출력 전압 범위 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>출력 전압 범위</span>
                        {(tempFilters.outputVoltage[0] > (filterOptions?.voltage?.output?.min || 0) || 
                          tempFilters.outputVoltage[1] < (filterOptions?.voltage?.output?.max || 100)) && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            설정됨
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{tempFilters.outputVoltage[0]}V</span>
                          <span>{tempFilters.outputVoltage[1]}V</span>
                        </div>
                        <Slider
                          defaultValue={[
                            filterOptions?.voltage?.output?.min || 0, 
                            filterOptions?.voltage?.output?.max || 100
                          ]}
                          value={tempFilters.outputVoltage}
                          min={filterOptions?.voltage?.output?.min || 0}
                          max={filterOptions?.voltage?.output?.max || 100}
                          step={1}
                          onValueChange={(value) => changeTempFilter('outputVoltage', value)}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                    </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 주파수 특성 섹션 */}
                <AccordionItem value="frequency" className="border-b border-gray-800">
                  <AccordionTrigger 
                    onClick={() => toggleAccordion('frequency')}
                    className="py-4 text-white hover:no-underline"
                  >
                    <span className="text-md font-medium">주파수 특성</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 space-y-5">
                    {/* 스위칭 주파수 범위 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>스위칭 주파수</span>
                        {(tempFilters.switchingFrequency[0] > (filterOptions?.frequency?.switching?.min || 0) || 
                          tempFilters.switchingFrequency[1] < (filterOptions?.frequency?.switching?.max || 2000)) && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            설정됨
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{tempFilters.switchingFrequency[0]}kHz</span>
                          <span>{tempFilters.switchingFrequency[1]}kHz</span>
                        </div>
                        <Slider
                          defaultValue={[
                            filterOptions?.frequency?.switching?.min || 0, 
                            filterOptions?.frequency?.switching?.max || 2000
                          ]}
                          value={tempFilters.switchingFrequency}
                          min={filterOptions?.frequency?.switching?.min || 0}
                          max={filterOptions?.frequency?.switching?.max || 2000}
                          step={10}
                          onValueChange={(value) => changeTempFilter('switchingFrequency', value)}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 통신 인터페이스 섹션 */}
                <AccordionItem value="interface" className="border-b border-gray-800">
                  <AccordionTrigger 
                    onClick={() => toggleAccordion('interface')}
                    className="py-4 text-white hover:no-underline"
                  >
                    <span className="text-md font-medium">통신 인터페이스</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 space-y-5">
                    {/* 통신 인터페이스 타입 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>인터페이스 타입</span>
                        {tempFilters.communicationInterfaces.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.communicationInterfaces.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1">
                        {filterOptions?.communicationTypes?.map((type: string) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-comm-${type}`}
                              checked={tempFilters.communicationInterfaces.includes(type)}
                              onCheckedChange={() => changeTempFilter('communicationInterfaces', type)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-comm-${type}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PWM 해상도 필터 */}
                    <div className="space-y-3">
                      <h3 className="text-white font-medium flex items-center justify-between">
                        <span>PWM 해상도</span>
                        {tempFilters.pwmResolutions.length > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tempFilters.pwmResolutions.length}
                          </Badge>
                        )}
                      </h3>
                      <div className="space-y-2 pl-1 grid grid-cols-2">
                        {filterOptions?.pwmResolutions?.map((resolution: string) => (
                          <div key={resolution} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sheet-pwm-${resolution}`}
                              checked={tempFilters.pwmResolutions.includes(resolution)}
                              onCheckedChange={() => changeTempFilter('pwmResolutions', resolution)}
                              className="border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label 
                              htmlFor={`sheet-pwm-${resolution}`}
                              className="text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                              {resolution}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
          
          <SheetFooter className="flex-row justify-between gap-2 p-4 border-t border-gray-800">
            <Button
              variant="outline"
              onClick={resetTempFilters}
              className="flex-1 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
            >
              필터 초기화
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={applyFilters}
            >
              필터링 적용하기
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* 정렬 드롭다운 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 h-12 px-4 bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowDownUp className="h-5 w-5" />
            <span className="hidden sm:inline">정렬</span>
            {sortOption.direction === 'asc' ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
          <DropdownMenuLabel className="text-gray-400">정렬 기준</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem
            className={cn(
              "gap-2 cursor-pointer hover:bg-gray-800",
              sortOption.field === 'name' && "text-blue-400"
            )}
            onClick={() => onSortChange('name')}
          >
            <Check className={cn("h-4 w-4", sortOption.field === 'name' ? "opacity-100" : "opacity-0")} />
            제품명
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              "gap-2 cursor-pointer hover:bg-gray-800",
              sortOption.field === 'manufacturer' && "text-blue-400"
            )}
            onClick={() => onSortChange('manufacturer')}
          >
            <Check className={cn("h-4 w-4", sortOption.field === 'manufacturer' ? "opacity-100" : "opacity-0")} />
            제조사
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              "gap-2 cursor-pointer hover:bg-gray-800",
              sortOption.field === 'channels' && "text-blue-400"
            )}
            onClick={() => onSortChange('channels')}
          >
            <Check className={cn("h-4 w-4", sortOption.field === 'channels' ? "opacity-100" : "opacity-0")} />
            채널 수
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              "gap-2 cursor-pointer hover:bg-gray-800",
              sortOption.field === 'voltage' && "text-blue-400"
            )}
            onClick={() => onSortChange('voltage')}
          >
            <Check className={cn("h-4 w-4", sortOption.field === 'voltage' ? "opacity-100" : "opacity-0")} />
            최대 입력 전압
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 