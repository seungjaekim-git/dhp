'use client';

import React, { Fragment, useState, useMemo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { SearchIcon, XIcon, ChevronDown, CheckIcon, Filter, Plus, Minus, Zap, Cpu, Package, Building2, ShieldCheck, ChevronUp, Layers, Check, Car, Bolt, ArrowRight, CircuitBoard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type FilterOption = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
};

type RangeFilter = {
  id: string;
  name: string;
  min: number;
  max: number;
  unit: string;
  value: [number, number];
};

type QuickFilter = {
  id: string;
  label: string;
  checked: boolean;
  color: string;
  icon: React.ComponentType<any>;
};

type FilterOptions = {
  manufacturers?: Array<{ id: number; name: string }>;
  features?: Array<{ id: number; name: string; description?: string }>;
  topologies?: string[];
  dimmingMethods?: string[];
  packageTypes?: string[];
  mountingTypes?: string[];
  channels?: string[];
  communicationTypes?: string[];
  voltage?: {
    input?: { min: number; max: number };
    output?: { min: number; max: number };
  };
  current?: {
    output?: { min: number; max: number };
  };
  temperature?: {
    operating?: { min: number; max: number };
  };
  frequency?: {
    switching?: { min: number; max: number };
  };
  certifications?: Array<{ id: number; name: string }>;
  categories?: Array<{ id: number; name: string }>;
};

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: { [key: string]: boolean };
  rangeFilters?: RangeFilter[];
  onFilterToggle: (filterName: string) => void;
  onRangeFilterChange?: (filterId: string, range: [number, number]) => void;
  filterOptions: FilterOptions;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

// 개별 카테고리(체크박스) 필터
const CategoryFilter = ({
  title,
  options,
  onToggle
}: {
  title: string;
  options: { value: string; label: string; checked: boolean }[];
  onToggle: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = options.filter((opt) => opt.checked).length;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'border-gray-700 bg-gray-900/70 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-between w-full',
          activeCount > 0 && 'border-blue-700 text-blue-400'
        )}
      >
        <span>{title}</span>
        {activeCount > 0 && (
          <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-0">
            {activeCount}
          </Badge>
        )}
        <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', isOpen && 'transform rotate-180')} />
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3 max-h-64 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <button
                  onClick={() => onToggle(option.value)}
                  className="h-4 w-4 rounded border border-gray-700 bg-gray-800 flex items-center justify-center focus:outline-none"
                >
                  {option.checked && (
                    <CheckIcon className="h-3 w-3 text-blue-400" aria-hidden="true" />
                  )}
                </button>
                <label
                  className="ml-3 text-sm text-gray-400 cursor-pointer hover:text-gray-300"
                  onClick={() => onToggle(option.value)}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 범위 필터
const RangeFilterComponent = ({
  title,
  filter,
  onChange
}: {
  title: string;
  filter: RangeFilter;
  onChange: (id: string, range: [number, number]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState<string>(filter.value[0].toString());
  const [maxValue, setMaxValue] = useState<string>(filter.value[1].toString());
  const isActive = filter.value[0] > filter.min || filter.value[1] < filter.max;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setMinValue(newVal);

    const numVal = parseFloat(newVal);
    if (!isNaN(numVal) && numVal >= filter.min && numVal <= filter.value[1]) {
      onChange(filter.id, [numVal, filter.value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setMaxValue(newVal);

    const numVal = parseFloat(newVal);
    if (!isNaN(numVal) && numVal <= filter.max && numVal >= filter.value[0]) {
      onChange(filter.id, [filter.value[0], numVal]);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'border-gray-700 bg-gray-900/70 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-between w-full',
          isActive && 'border-blue-700 text-blue-400'
        )}
      >
        <span>{title}</span>
        {isActive && (
          <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-0">
            {filter.value[0]}-{filter.value[1]}
            {filter.unit}
          </Badge>
        )}
        <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', isOpen && 'transform rotate-180')} />
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>
                Min: {filter.min}
                {filter.unit}
              </span>
              <span>
                Max: {filter.max}
                {filter.unit}
              </span>
            </div>

            <div className="px-2 py-4">
              <Slider
                defaultValue={[filter.value[0], filter.value[1]]}
                min={filter.min}
                max={filter.max}
                step={1}
                value={[filter.value[0], filter.value[1]]}
                onValueChange={(value) => {
                  onChange(filter.id, [value[0], value[1]]);
                  setMinValue(value[0].toString());
                  setMaxValue(value[1].toString());
                }}
                className="mt-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start">
                <label className="text-xs text-gray-500 mb-1">Min</label>
                <div className="flex items-center bg-gray-800 rounded-md">
                  <button
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    onClick={() => {
                      const newVal = Math.max(filter.min, filter.value[0] - 1);
                      onChange(filter.id, [newVal, filter.value[1]]);
                      setMinValue(newVal.toString());
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <Input
                    type="text"
                    value={minValue}
                    onChange={handleMinChange}
                    className="w-16 border-0 bg-transparent text-white text-center focus:ring-0"
                  />
                  <button
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    onClick={() => {
                      const newVal = Math.min(filter.value[1], filter.value[0] + 1);
                      onChange(filter.id, [newVal, filter.value[1]]);
                      setMinValue(newVal.toString());
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="text-gray-500">-</div>

              <div className="flex flex-col items-start">
                <label className="text-xs text-gray-500 mb-1">Max</label>
                <div className="flex items-center bg-gray-800 rounded-md">
                  <button
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    onClick={() => {
                      const newVal = Math.max(filter.value[0], filter.value[1] - 1);
                      onChange(filter.id, [filter.value[0], newVal]);
                      setMaxValue(newVal.toString());
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <Input
                    type="text"
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="w-16 border-0 bg-transparent text-white text-center focus:ring-0"
                  />
                  <button
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    onClick={() => {
                      const newVal = Math.min(filter.max, filter.value[1] + 1);
                      onChange(filter.id, [filter.value[0], newVal]);
                      setMaxValue(newVal.toString());
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <span className="text-xs text-gray-400">{filter.unit}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 새로운 타입 정의 - 필터 카테고리 구조
type RangeFilterOption = {
  id: string;
  name: string;
  type: 'range';
  filter?: RangeFilter;
};

type FilterItem = {
  id: string;
  name: string;
  options?: {
    value: string;
    label: string;
    checked: boolean;
  }[];
  type?: 'range';
  filter?: RangeFilter;
};

type FilterCategory = {
  id: string;
  name: string;
  filters: FilterItem[];
};

// 퀵 필터 컴포넌트
const QuickFilter = ({ filter, onClick }: { filter: QuickFilter; onClick?: () => void }) => {
  const Icon = filter.icon;
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        'gap-1.5 h-9 px-3 border rounded-md flex items-center',
        filter.checked
          ? `border-${filter.color}-500 bg-${filter.color}-500/20 text-${filter.color}-400`
          : 'border-gray-700 bg-gray-900/70 text-gray-400 hover:bg-gray-800 hover:text-white'
      )}
    >
      <Icon className={cn('h-4 w-4 mr-1', filter.checked ? `text-${filter.color}-400` : 'text-gray-500')} />
      <span>{filter.label}</span>
      {filter.checked && <Check className="h-3.5 w-3.5 ml-1 text-green-400" />}
    </Button>
  );
};

// 필터 범위 처리 함수
function handleRangeFilter(filters: Record<string, any>, category: string, fil: FilterOption, value: [number, number]) {
  if (fil && fil.options && fil.options.length > 0) {
    // options가 있고 길이가 0보다 클 경우에만 실행
    const min = Number(fil.options[0].value);
    const max = Number(fil.options[fil.options.length - 1].value);
    
    // 전체 범위가 선택된 경우 해당 필터 제거
    if (value[0] <= min && value[1] >= max) {
      const { [category]: _, ...rest } = filters;
      return rest;
    }
  }
  
  // 범위 필터 적용
  return {
    ...filters,
    [category]: value,
  };
}

// 실제 필터 패널
export function FilterPanel({
  searchQuery,
  onSearchChange,
  filters,
  rangeFilters,
  onFilterToggle,
  onRangeFilterChange,
  filterOptions,
  activeFiltersCount,
  onClearFilters
}: FilterPanelProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // 필요한 옵션들 구성
  const createFeatureFilterOptions = () => {
    if (!filterOptions.features) return [];
    return filterOptions.features.map((feature) => ({
      value: `feature_${feature.id}`,
      label: feature.name,
      checked: filters[`feature_${feature.id}`] || false
    }));
  };

  const createMfrFilterOptions = () => {
    if (!filterOptions.manufacturers) return [];
    return filterOptions.manufacturers.map((mfr) => ({
      value: `mfr_${mfr.id}`,
      label: mfr.name,
      checked: filters[`mfr_${mfr.id}`] || false
    }));
  };

  const createTopologyFilterOptions = () => {
    if (!filterOptions.topologies) return [];
    return filterOptions.topologies.map((topology) => ({
      value: `topology_${topology}`,
      label: topology,
      checked: filters[`topology_${topology}`] || false
    }));
  };

  const createDimmingMethodFilterOptions = () => {
    if (!filterOptions.dimmingMethods) return [];
    return filterOptions.dimmingMethods.map((method) => ({
      value: `dimming_${method}`,
      label: method,
      checked: filters[`dimming_${method}`] || false
    }));
  };

  const createPackageTypeFilterOptions = () => {
    if (!filterOptions.packageTypes) return [];
    return filterOptions.packageTypes.map((pkg) => ({
      value: `package_${pkg}`,
      label: pkg,
      checked: filters[`package_${pkg}`] || false
    }));
  };

  const createMountingTypeFilterOptions = () => {
    if (!filterOptions.mountingTypes) return [];
    return filterOptions.mountingTypes.map((type) => ({
      value: `mounting_${type}`,
      label: type,
      checked: filters[`mounting_${type}`] || false
    }));
  };

  const createChannelsFilterOptions = () => {
    if (!filterOptions.channels) return [];
    return filterOptions.channels.map((ch) => ({
      value: `channels_${ch}`,
      label: ch,
      checked: filters[`channels_${ch}`] || false
    }));
  };

  const createCommunicationTypeFilterOptions = () => {
    if (!filterOptions.communicationTypes) return [];
    return filterOptions.communicationTypes.map((type) => ({
      value: `communication_${type}`,
      label: type,
      checked: filters[`communication_${type}`] || false
    }));
  };

  const createCertificationsFilterOptions = () => {
    if (!filterOptions.certifications) return [];
    return filterOptions.certifications?.map((cert) => ({
      value: `certification_${cert.id}`,
      label: cert.name,
      checked: filters[`certification_${cert.id}`] || false
    }));
  };

  const createCategoriesFilterOptions = () => {
    if (!filterOptions.categories) return [];
    return filterOptions.categories?.map((cat) => ({
      value: `category_${cat.id}`,
      label: cat.name,
      checked: filters[`category_${cat.id}`] || false
    }));
  };

  // 퀵 필터 생성 함수
  const createQuickFilters = (): QuickFilter[] => [
    {
      id: 'aec_q100_true',
      label: 'AEC-Q100',
      checked: filters['aec_q100_true'] || false,
      color: 'blue',
      icon: CircuitBoard,
    },
    {
      id: 'thermal_pad_true',
      label: '써멀 패드',
      checked: filters['thermal_pad_true'] || false,
      color: 'amber',
      icon: Bolt,
    },
    {
      id: 'internal_switch_true',
      label: '내부 스위치',
      checked: filters['internal_switch_true'] || false,
      color: 'green',
      icon: Cpu,
    },
  ];

  // filterCategories를 만들고, 범위 필터는 type: 'range' 형태로, 체크박스는 options가 있는 형태로 정리
  const filterCategories: FilterCategory[] = [
    {
      id: 'basic',
      name: '기본 사양',
      filters: [
        {
          id: 'channels',
          name: '채널 수',
          options: createChannelsFilterOptions()
        },
        {
          id: 'topology',
          name: '토폴로지',
          options: createTopologyFilterOptions()
        },
        {
          id: 'dimming',
          name: '조광 방식',
          options: createDimmingMethodFilterOptions()
        }
      ]
    },
    {
      id: 'electrical',
      name: '전기적 특성',
      filters: [
        {
          id: 'inputVoltage',
          name: '입력 전압',
          type: 'range',
          filter: rangeFilters?.find((f) => f.id === 'inputVoltage')
        },
        {
          id: 'outputVoltage',
          name: '출력 전압',
          type: 'range',
          filter: rangeFilters?.find((f) => f.id === 'outputVoltage')
        },
        {
          id: 'outputCurrent',
          name: '출력 전류',
          type: 'range',
          filter: rangeFilters?.find((f) => f.id === 'outputCurrent')
        },
        {
          id: 'switchingFrequency',
          name: '스위칭 주파수',
          type: 'range',
          filter: rangeFilters?.find((f) => f.id === 'switchingFrequency')
        }
      ]
    },
    {
      id: 'physical',
      name: '물리적 특성',
      filters: [
        {
          id: 'packageType',
          name: '패키지 타입',
          options: createPackageTypeFilterOptions()
        },
        {
          id: 'mountingType',
          name: '실장 유형',
          options: createMountingTypeFilterOptions()
        }
      ]
    },
    {
      id: 'interface',
      name: '통신 및 인터페이스',
      filters: [
        {
          id: 'communication',
          name: '통신 인터페이스',
          options: createCommunicationTypeFilterOptions()
        }
      ]
    },
    {
      id: 'certifications',
      name: '인증 및 규격',
      filters: [
        {
          id: 'certifications',
          name: '인증 종류',
          options: createCertificationsFilterOptions()
        }
      ]
    },
    {
      id: 'categories',
      name: '제품 카테고리',
      filters: [
        {
          id: 'categories',
          name: '카테고리',
          options: createCategoriesFilterOptions()
        }
      ]
    }
  ];

  // 모든 필터 렌더링
  const renderAllFilters = () => {
    return (
      <div className="space-y-6">
        {/* 기존 필터 카테고리들 */}
        {filterCategories.map((category) => (
          <div key={category.id} className="border-t border-gray-800 pt-6 first:border-t-0 first:pt-0">
            <h3 className="text-blue-400 text-sm font-medium mb-3">{category.name}</h3>
            <div className="space-y-4">
              {category.filters.map((fil) => {
                // range 타입이면 슬라이더
                if ('type' in fil && fil.type === 'range' && fil.filter && onRangeFilterChange) {
                  return (
                    <div key={fil.id}>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">{fil.name}</div>
                        <div className="text-xs text-gray-500">
                          {fil.filter.value[0]}-{fil.filter.value[1]}
                          {fil.filter.unit}
                        </div>
                      </div>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[fil.filter.value[0], fil.filter.value[1]]}
                          min={fil.filter.min}
                          max={fil.filter.max}
                          step={1}
                          value={[fil.filter.value[0], fil.filter.value[1]]}
                          onValueChange={(value) => {
                            onRangeFilterChange(fil.filter!.id, [value[0], value[1]]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }

                // options가 있으면 체크박스 목록
                if ('options' in fil && fil.options && fil.options.length > 0) {
                  return (
                    <div key={fil.id}>
                      <div className="text-sm text-gray-400 mb-2">{fil.name}</div>
                      <div className="space-y-2">
                        {fil.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <button
                              onClick={() => onFilterToggle(option.value)}
                              className="h-4 w-4 rounded border border-gray-700 bg-gray-800 flex items-center justify-center focus:outline-none"
                            >
                              {option.checked && (
                                <CheckIcon className="h-3 w-3 text-blue-400" aria-hidden="true" />
                              )}
                            </button>
                            <label
                              className="ml-3 text-sm text-gray-400 cursor-pointer hover:text-gray-300"
                              onClick={() => onFilterToggle(option.value)}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-gray-800 mb-6 overflow-hidden">
      {/* 모바일 필터 다이얼로그 */}
      <Transition show={mobileFiltersOpen} as={Fragment}>
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 lg:hidden" />

        {/* 다이얼로그 콘텐츠 */}
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl transition-transform duration-300 transform translate-x-0">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4">
              <div className="text-lg font-medium text-white">필터</div>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">닫기</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* 필터 콘텐츠 */}
            <div className="mt-4 border-t border-gray-800 px-4 py-6">
              {renderAllFilters()}
            </div>
          </div>
        </div>
      </Transition>

      {/* 데스크톱 필터 다이얼로그 */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">상세 필터</DialogTitle>
          </DialogHeader>
          <div className="mt-4 px-1">
            {renderAllFilters()}
          </div>
        </DialogContent>
      </Dialog>

      {/* 데스크톱 필터 영역 */}
      <div className="w-full px-6 py-6">
        {/* 검색창, 초기화 버튼 등 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <div className="w-full sm:w-auto flex-1 max-w-lg">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 text-sm border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                placeholder="제품명, 부품번호 검색..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-300 border-gray-700 bg-gray-800/50 hover:bg-gray-700"
              >
                필터 초기화 ({activeFiltersCount})
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center lg:hidden text-gray-300 border-gray-700 bg-gray-800/50 hover:bg-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterDialogOpen(true)}
              className="hidden lg:flex items-center text-gray-300 border-gray-700 bg-gray-800/50 hover:bg-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              상세 필터
            </Button>
          </div>
        </div>

        {/* 퀵 필터 버튼 그룹 */}
        <div className="mb-6 bg-gray-800/20 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-blue-400">빠른 필터</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {createQuickFilters().map((filter) => (
              <QuickFilter
                key={filter.id}
                filter={filter}
                onClick={() => onFilterToggle(filter.id)}
              />
            ))}

            {/* 인증 Popover 버튼 */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all text-sm ${
                      open
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                        : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-blue-500/30 hover:text-blue-300'
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>인증</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'transform rotate-180' : ''}`} />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-50 mt-2 w-64 transform left-0 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4">
                      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {createCertificationsFilterOptions().map((option) => (
                          <div key={option.value} className="flex items-center">
                            <button
                              onClick={() => onFilterToggle(option.value)}
                              className="h-4 w-4 rounded border border-gray-700 bg-gray-800 flex items-center justify-center focus:outline-none"
                            >
                              {option.checked && <CheckIcon className="h-3 w-3 text-blue-400" aria-hidden="true" />}
                            </button>
                            <label
                              className="ml-3 text-sm text-gray-400 cursor-pointer hover:text-gray-300"
                              onClick={() => onFilterToggle(option.value)}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
