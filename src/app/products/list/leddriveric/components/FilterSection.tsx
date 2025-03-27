"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, X } from "lucide-react";
import {
  Battery,
  Zap,
  Timer,
  Thermometer,
  Package,
  Layers,
  ThermometerSnowflake,
  Workflow,
  Sliders,
  ToggleLeft,
  TagIcon,
  CheckCircle2,
  Cpu
} from "lucide-react";
import {
  DualSliderFilter,
  SelectFilter,
  MultiSelectFilter,
  CheckboxFilter
} from "../filter";

// 필터 기본 구조
export interface FilterSchema {
  id: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
  icon?: React.ReactNode;
}

export interface FilterSectionProps {
  filterState: Record<string, any>;
  setFilterState: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  filterOptions?: any;
  filterStats?: Record<string, any>;
  clearAllFilters?: () => void;
  applyFilters: (filters: Record<string, any>) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filterState,
  setFilterState,
  filterOptions = {},
  filterStats = {},
  clearAllFilters,
  applyFilters,
  isOpen,
  onOpenChange
}) => {
  // 임시 필터 상태를 관리하기 위한 state 추가
  const [tempFilterState, setTempFilterState] = React.useState<Record<string, any>>(filterState);

  // filterState가 변경될 때 tempFilterState도 업데이트
  React.useEffect(() => {
    setTempFilterState(filterState);
  }, [filterState]);

  // 필터 스키마 옵션
  const filterSchemaOptions = React.useMemo(() => {
    return {
      // 전기적 특성 필터
      electrical: [
        {
          id: 'input_voltage',
          label: '입력 전압 범위',
          type: 'dual-slider',
          min: 3.0,
          max: 60.0,
          step: 0.1,
          unit: 'V',
          icon: <Battery className="w-3.5 h-3.5 text-blue-600" />
        },
        {
          id: 'output_voltage',
          label: '출력 전압 범위',
          type: 'dual-slider',
          min: 0,
          max: 60.0,
          step: 0.1, 
          unit: 'V',
          icon: <Zap className="w-3.5 h-3.5 text-amber-600" />
        },
        {
          id: 'output_current',
          label: '출력 전류 범위',
          type: 'dual-slider',
          min: 0,
          max: 1500,
          step: 10,
          unit: 'mA',
          icon: <Zap className="w-3.5 h-3.5 text-orange-600" />
        },
        {
          id: 'switching_frequency',
          label: '스위칭 주파수',
          type: 'dual-slider',
          min: 0,
          max: 2000,
          step: 10,
          unit: 'kHz',
          icon: <Timer className="w-3.5 h-3.5 text-purple-600" />
        }
      ],
      // 물리적 특성 필터
      physical: [
        {
          id: 'operating_temperature',
          label: '동작 온도 범위',
          type: 'dual-slider',
          min: -40,
          max: 125,
          step: 5,
          unit: '°C',
          icon: <Thermometer className="w-3.5 h-3.5 text-red-600" />
        },
        {
          id: 'package_type',
          label: '패키지 타입',
          type: 'multi-select',
          options: filterOptions.packageTypes?.map((type: string) => type) || 
                  ['QFN', 'SOIC', 'SOT23', 'TSSOP', 'WLCSP', 'DFN', 'BGA'],
          icon: <Package className="w-3.5 h-3.5 text-blue-600" />
        },
        {
          id: 'mounting_style',
          label: '실장 방식',
          type: 'select',
          options: filterOptions.mountingStyles?.map((style: string) => style) || 
                  ['SMD', 'SMT', 'Through-Hole'],
          icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />
        },
        {
          id: 'thermal_pad',
          label: 'Thermal Pad',
          type: 'checkbox',
          options: ['있음', '없음'],
          icon: <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-500" />
        }
      ],
      // 제어 특성 필터
      control: [
        {
          id: 'topology',
          label: '토폴로지',
          type: 'multi-select',
          options: filterOptions.topologies?.map((topo: string) => topo) || 
                  ['Buck', 'Boost', 'Buck-Boost', 'Charge Pump', 'Linear Regulator', 'SEPIC', 'Flyback'],
          icon: <Workflow className="w-3.5 h-3.5 text-purple-600" />
        },
        {
          id: 'dimming_method',
          label: '디밍 방식',
          type: 'multi-select',
          options: filterOptions.dimmingMethods?.map((method: string) => method) || 
                  ['PWM', 'Analog', 'Digital', 'S-PWM'],
          icon: <Sliders className="w-3.5 h-3.5 text-amber-600" />
        },
        {
          id: 'internal_switch',
          label: '내부 스위치',
          type: 'checkbox',
          options: ['있음', '없음'],
          icon: <ToggleLeft className="w-3.5 h-3.5 text-blue-600" />
        }
      ],
      // 기타 정보 필터
      others: [
        {
          id: 'categories',
          label: '카테고리',
          type: 'select',
          options: filterOptions.categories?.map((cat: string) => cat) || [],
          icon: <TagIcon className="w-3.5 h-3.5 text-blue-600" />
        },
        {
          id: 'certifications',
          label: '인증',
          type: 'multi-select',
          options: filterOptions.certifications?.map((cert: string) => cert) || [],
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
        },
        {
          id: 'applications',
          label: '응용분야',
          type: 'multi-select',
          options: filterOptions.applications?.map((app: string) => app) || [],
          icon: <Cpu className="w-3.5 h-3.5 text-indigo-600" />
        }
      ]
    };
  }, [filterOptions]);

  // 필터 값 변경 핸들러
  const handleFilterChange = (filterId: string, value: any) => {
    setTempFilterState(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  // 필터 적용 핸들러
  const handleApplyFilters = () => {
    applyFilters(tempFilterState);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // 필터 초기화 핸들러
  const handleClearFilters = () => {
    if (clearAllFilters) {
      clearAllFilters();
    }
    setTempFilterState({});
  };

  // 활성 필터 개수 계산
  const activeFilterCount = React.useMemo(() => {
    return Object.keys(filterState).filter(key => {
      const value = filterState[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== undefined && v !== null);
      }
      return value !== undefined && value !== null && value !== '';
    }).length;
  }, [filterState]);

  // 필터 렌더링 함수
  const renderFilter = (filter: FilterSchema) => {
    const value = tempFilterState[filter.id];
    const count = filterStats[filter.id] || 0;

    const renderCount = () => {
      if (typeof count === 'number' && count > 0) {
        return (
          <Badge variant="secondary" className="ml-auto text-xs py-0 h-5 px-1.5 bg-blue-50 text-blue-700">
            {count}
          </Badge>
        );
      }
      return null;
    };

    switch (filter.type) {
      case 'dual-slider':
        return (
          <div key={filter.id} className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                <h4 className="text-sm font-medium">{filter.label}</h4>
              </div>
              {renderCount()}
            </div>
            <DualSliderFilter
              label=""
              value={value || [filter.min || 0, filter.max || 100]}
              onChange={(newValue) => handleFilterChange(filter.id, newValue)}
              min={filter.min || 0}
              max={filter.max || 100}
              unit={filter.unit}
            />
          </div>
        );
      case 'select':
        return (
          <div key={filter.id} className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                <h4 className="text-sm font-medium">{filter.label}</h4>
              </div>
              {renderCount()}
            </div>
            <SelectFilter
              label=""
              value={value || ''}
              onChange={(newValue) => handleFilterChange(filter.id, newValue)}
              options={filter.options || []}
            />
          </div>
        );
      case 'multi-select':
        return (
          <div key={filter.id} className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                <h4 className="text-sm font-medium">{filter.label}</h4>
              </div>
              {renderCount()}
            </div>
            <MultiSelectFilter
              label=""
              value={value || []}
              onChange={(newValue) => handleFilterChange(filter.id, newValue)}
              options={filter.options || []}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div key={filter.id} className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                <h4 className="text-sm font-medium">{filter.label}</h4>
              </div>
              {renderCount()}
            </div>
            <CheckboxFilter
              label=""
              value={value || []}
              onChange={(newValue) => handleFilterChange(filter.id, newValue)}
              options={filter.options || []}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          <h3 className="font-medium">고급 필터</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            if (onOpenChange) {
              onOpenChange(false);
            }
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="electrical" className="flex-1 overflow-hidden">
        <div className="p-2 px-4 border-b">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="electrical" className="text-xs py-1.5">전기적 특성</TabsTrigger>
            <TabsTrigger value="physical" className="text-xs py-1.5">물리적 특성</TabsTrigger>
            <TabsTrigger value="control" className="text-xs py-1.5">제어 방식</TabsTrigger>
            <TabsTrigger value="others" className="text-xs py-1.5">기타 정보</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="electrical" className="m-0">
            {filterSchemaOptions.electrical.map(renderFilter)}
          </TabsContent>
          
          <TabsContent value="physical" className="m-0">
            {filterSchemaOptions.physical.map(renderFilter)}
          </TabsContent>
          
          <TabsContent value="control" className="m-0">
            {filterSchemaOptions.control.map(renderFilter)}
          </TabsContent>
          
          <TabsContent value="others" className="m-0">
            {filterSchemaOptions.others.map(renderFilter)}
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="p-4 border-t bg-slate-50 flex space-x-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleClearFilters}
        >
          초기화
        </Button>
        <Button
          className="flex-1"
          onClick={handleApplyFilters}
        >
          필터 적용
        </Button>
      </div>
    </div>
  );
};

export default FilterSection; 