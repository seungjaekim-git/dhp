'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface ProductFilterBadgesProps {
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
  };
  filterOptions: any;
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
  onFilterChange: (filterType: string, value: any) => void;
  onResetVoltageFilters: () => void;
}

export default function ProductFilterBadges({
  activeFilters,
  filterOptions,
  filterCounts,
  onFilterChange,
  onResetVoltageFilters
}: ProductFilterBadgesProps) {
  if (filterCounts.total === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {/* 제조사 필터 뱃지 */}
      {activeFilters.manufacturers.length > 0 && activeFilters.manufacturers.map(id => {
        const manufacturer = filterOptions?.manufacturers?.find((m: any) => m.id === id);
        return manufacturer ? (
          <Badge 
            key={`manufacturer-${id}`} 
            variant="outline" 
            className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
          >
            <span className="text-gray-300 text-xs mr-1.5">제조사:</span>
            {manufacturer.name}
            <button 
              onClick={() => onFilterChange('manufacturers', id)}
              className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ) : null;
      })}
      
      {/* 토폴로지 필터 뱃지 */}
      {activeFilters.topologies.length > 0 && activeFilters.topologies.map(topology => (
        <Badge 
          key={`topology-${topology}`} 
          variant="outline" 
          className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">토폴로지:</span>
          {topology}
          <button 
            onClick={() => onFilterChange('topologies', topology)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* 디밍 방식 필터 뱃지 */}
      {activeFilters.dimmingMethods.length > 0 && activeFilters.dimmingMethods.map(method => (
        <Badge 
          key={`dimming-${method}`} 
          variant="outline" 
          className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">디밍:</span>
          {method}
          <button 
            onClick={() => onFilterChange('dimmingMethods', method)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* 패키지 타입 필터 뱃지 */}
      {activeFilters.packageTypes.length > 0 && activeFilters.packageTypes.map(type => (
        <Badge 
          key={`package-${type}`} 
          variant="outline" 
          className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">패키지:</span>
          {type}
          <button 
            onClick={() => onFilterChange('packageTypes', type)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* 채널 필터 뱃지 */}
      {activeFilters.channels.length > 0 && activeFilters.channels.map(channel => (
        <Badge 
          key={`channel-${channel}`} 
          variant="outline" 
          className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">채널:</span>
          {channel} 채널
          <button 
            onClick={() => onFilterChange('channels', channel)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* 전압 필터 뱃지 */}
      {filterCounts.voltages > 0 && (
        <Badge 
          variant="outline" 
          className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">전압:</span>
          {activeFilters.inputVoltage[0]}-{activeFilters.inputVoltage[1]}V 입력 
          / {activeFilters.outputVoltage[0]}-{activeFilters.outputVoltage[1]}V 출력
          <button 
            onClick={onResetVoltageFilters}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* 출력 전류 필터 뱃지 */}
      {filterCounts.currents > 0 && (
        <Badge 
          variant="outline" 
          className="bg-purple-500/10 text-purple-400 border-purple-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">출력 전류:</span>
          {activeFilters.outputCurrent[0]}-{activeFilters.outputCurrent[1]}mA
          <button 
            onClick={() => onFilterChange('outputCurrent', [
              filterOptions?.current?.output?.min || 0, 
              filterOptions?.current?.output?.max || 5000
            ])}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* 스위칭 주파수 필터 뱃지 */}
      {filterCounts.frequencies > 0 && (
        <Badge 
          variant="outline" 
          className="bg-amber-500/10 text-amber-400 border-amber-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">스위칭 주파수:</span>
          {activeFilters.switchingFrequency[0]}-{activeFilters.switchingFrequency[1]}kHz
          <button 
            onClick={() => onFilterChange('switchingFrequency', [
              filterOptions?.frequency?.switching?.min || 0, 
              filterOptions?.frequency?.switching?.max || 2000
            ])}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* 동작 온도 필터 뱃지 */}
      {filterCounts.temperatures > 0 && (
        <Badge 
          variant="outline" 
          className="bg-red-500/10 text-red-400 border-red-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">동작 온도:</span>
          {activeFilters.operatingTemperature[0]}-{activeFilters.operatingTemperature[1]}°C
          <button 
            onClick={() => onFilterChange('operatingTemperature', [
              filterOptions?.temperature?.operating?.min || -40, 
              filterOptions?.temperature?.operating?.max || 125
            ])}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* 내부 스위치 필터 뱃지 */}
      {activeFilters.hasInternalSwitch !== null && (
        <Badge 
          variant="outline" 
          className="bg-green-500/10 text-green-400 border-green-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">스위치:</span>
          {activeFilters.hasInternalSwitch ? "내장 스위치" : "외장 스위치"}
          <button 
            onClick={() => onFilterChange('hasInternalSwitch', null)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* Thermal Pad 필터 뱃지 */}
      {activeFilters.hasThermalPad !== null && (
        <Badge 
          variant="outline" 
          className="bg-orange-500/10 text-orange-400 border-orange-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">Thermal Pad:</span>
          {activeFilters.hasThermalPad ? "있음" : "없음"}
          <button 
            onClick={() => onFilterChange('hasThermalPad', null)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
      {/* 통신 인터페이스 필터 뱃지 */}
      {activeFilters.communicationInterfaces.length > 0 && activeFilters.communicationInterfaces.map(type => (
        <Badge 
          key={`comm-${type}`} 
          variant="outline" 
          className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">인터페이스:</span>
          {type}
          <button 
            onClick={() => onFilterChange('communicationInterfaces', type)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* PWM 해상도 필터 뱃지 */}
      {activeFilters.pwmResolutions.length > 0 && activeFilters.pwmResolutions.map(resolution => (
        <Badge 
          key={`pwm-${resolution}`} 
          variant="outline" 
          className="bg-violet-500/10 text-violet-400 border-violet-500/30 gap-2 px-3 py-1.5 group"
        >
          <span className="text-gray-300 text-xs mr-1.5">PWM:</span>
          {resolution}
          <button 
            onClick={() => onFilterChange('pwmResolutions', resolution)}
            className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {/* 모든 필터 초기화 버튼 */}
      {filterCounts.total > 3 && (
        <Badge 
          variant="outline" 
          className="bg-gray-700/80 text-gray-300 border-gray-600 gap-2 px-3 py-1.5 group cursor-pointer hover:bg-gray-600/80"
          onClick={() => window.dispatchEvent(new CustomEvent('reset-all-filters'))}
        >
          모든 필터 초기화
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
    </div>
  )
} 