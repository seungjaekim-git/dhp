'use client';

import { Fragment, useState } from 'react';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import { SearchIcon, SlidersHorizontal, XIcon, ChevronDown, CheckIcon, Filter, Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

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

// Individual filter component for category-based filters
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
  const activeCount = options.filter(opt => opt.checked).length;
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border-gray-700 bg-gray-900/70 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-between w-full",
          activeCount > 0 && "border-blue-700 text-blue-400"
        )}
      >
        <span>{title}</span>
        {activeCount > 0 && (
          <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-0">
            {activeCount}
          </Badge>
        )}
        <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", isOpen && "transform rotate-180")} />
      </Button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3 max-h-64 overflow-y-auto custom-scrollbar">
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

// Individual filter component for numerical range filters with min/max inputs
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
          "border-gray-700 bg-gray-900/70 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-between w-full",
          isActive && "border-blue-700 text-blue-400"
        )}
      >
        <span>{title}</span>
        {isActive && (
          <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-0">
            {filter.value[0]}-{filter.value[1]}{filter.unit}
          </Badge>
        )}
        <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", isOpen && "transform rotate-180")} />
      </Button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Min: {filter.min}{filter.unit}</span>
              <span>Max: {filter.max}{filter.unit}</span>
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

// Toggle button for quick filters
const ToggleButton = ({ 
  label,
  checked,
  onChange
}: { 
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      onClick={onChange}
      className={cn(
        "px-3 py-1.5 text-sm border rounded-md transition-colors",
        checked 
          ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700" 
          : "bg-gray-900/70 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-gray-300"
      )}
    >
      {label}
    </button>
  );
};

// Radio button for price range
const RadioFilterOption = ({
  id,
  label,
  checked,
  onToggle
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "h-4 w-4 rounded-full border",
          checked
            ? "bg-blue-600 border-blue-700 ring-1 ring-offset-1 ring-offset-gray-900 ring-blue-600"
            : "border-gray-700 bg-gray-800"
        )}
      >
        {checked && (
          <span className="block w-1.5 h-1.5 mx-auto rounded-full bg-white" />
        )}
      </button>
      <label
        className={cn(
          "ml-3 text-sm cursor-pointer",
          checked ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
        )}
        onClick={() => onToggle(id)}
      >
        {label}
      </label>
    </div>
  );
};

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showPriceCustom, setShowPriceCustom] = useState(false);
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("0");
  
  // Create various filter option groups
  const createFeatureFilterOptions = () => {
    if (!filterOptions.features) return [];
    
    return filterOptions.features.map(feature => ({
      value: `feature_${feature.id}`,
      label: feature.name,
      checked: filters[`feature_${feature.id}`] || false
    }));
  };
  
  const createMfrFilterOptions = () => {
    if (!filterOptions.manufacturers) return [];
    
    return filterOptions.manufacturers.map(mfr => ({
      value: `mfr_${mfr.id}`,
      label: mfr.name,
      checked: filters[`mfr_${mfr.id}`] || false
    }));
  };
  
  const createTopologyFilterOptions = () => {
    if (!filterOptions.topologies) return [];
    
    return filterOptions.topologies.map(topology => ({
      value: `topology_${topology}`,
      label: topology,
      checked: filters[`topology_${topology}`] || false
    }));
  };
  
  const createDimmingMethodFilterOptions = () => {
    if (!filterOptions.dimmingMethods) return [];
    
    return filterOptions.dimmingMethods.map(method => ({
      value: `dimming_${method}`,
      label: method,
      checked: filters[`dimming_${method}`] || false
    }));
  };
  
  const createPackageTypeFilterOptions = () => {
    if (!filterOptions.packageTypes) return [];
    
    return filterOptions.packageTypes.map(pkgType => ({
      value: `package_${pkgType}`,
      label: pkgType,
      checked: filters[`package_${pkgType}`] || false
    }));
  };
  
  const createMountingTypeFilterOptions = () => {
    if (!filterOptions.mountingTypes) return [];
    
    return filterOptions.mountingTypes.map(type => ({
      value: `mounting_${type}`,
      label: type,
      checked: filters[`mounting_${type}`] || false
    }));
  };
  
  const createChannelsFilterOptions = () => {
    if (!filterOptions.channels) return [];
    
    return filterOptions.channels.map(channels => ({
      value: `channels_${channels}`,
      label: `${channels} channels`,
      checked: filters[`channels_${channels}`] || false
    }));
  };
  
  const createCommunicationTypeFilterOptions = () => {
    if (!filterOptions.communicationTypes) return [];
    
    return filterOptions.communicationTypes.map(type => ({
      value: `comm_${type}`,
      label: type,
      checked: filters[`comm_${type}`] || false
    }));
  };
  
  const featureOptions = createFeatureFilterOptions();
  const mfrOptions = createMfrFilterOptions();
  const topologyOptions = createTopologyFilterOptions();
  const dimmingOptions = createDimmingMethodFilterOptions();
  const packageOptions = createPackageTypeFilterOptions();
  const mountingOptions = createMountingTypeFilterOptions();
  const channelsOptions = createChannelsFilterOptions();
  const communicationOptions = createCommunicationTypeFilterOptions();
  
  // Group filters into categories
  const filterGroups = [
    {
      id: 'general',
      title: '일반',
      filters: [
        { id: 'highVoltage', label: 'High Voltage (>40V)' },
        { id: 'aecQ100', label: 'AEC-Q100 Qualified' },
        { id: 'automotive', label: 'Automotive Grade' },
      ]
    },
    {
      id: 'price',
      title: '가격대',
      filters: [
        { id: 'under1', label: '1만원 미만' },
        { id: 'under5', label: '1~5만원 이하' },
        { id: 'under10', label: '5~10만원 이하' },
        { id: 'under20', label: '10~20만원 이하' },
        { id: 'under30', label: '20~30만원 이하' },
        { id: 'under50', label: '30~50만원 이하' },
        { id: 'under70', label: '50~70만원 이하' },
        { id: 'under100', label: '70~100만원 이하' },
        { id: 'over100', label: '100만원 초과' }
      ]
    },
    {
      id: 'voltage',
      title: '전압 범위',
      filters: [
        { id: 'voltage_low', label: '5V 이하' },
        { id: 'voltage_mid', label: '5~12V' },
        { id: 'voltage_high', label: '12~24V' },
        { id: 'voltage_vhigh', label: '24V 이상' }
      ]
    },
    {
      id: 'current',
      title: '전류 범위',
      filters: [
        { id: 'current_low', label: '100mA 이하' },
        { id: 'current_mid', label: '100~500mA' },
        { id: 'current_high', label: '500mA~1A' },
        { id: 'current_vhigh', label: '1A 이상' }
      ]
    },
    {
      id: 'switching',
      title: '스위칭 주파수',
      filters: [
        { id: 'freq_low', label: '100kHz 이하' },
        { id: 'freq_mid', label: '100~500kHz' },
        { id: 'freq_high', label: '500kHz~1MHz' },
        { id: 'freq_vhigh', label: '1MHz 이상' }
      ]
    }
  ];

  return (
    <div className="mb-8">
      {/* Search field and filter toggle */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800 py-4 px-4 mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-white">제품 필터</h3>
              {activeFiltersCount > 0 && (
                <Badge className="bg-blue-500/20 text-blue-400 border-0">
                  {activeFiltersCount} active
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearFilters}
                  className="text-gray-400 hover:text-white"
                >
                  Clear filters
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="border-gray-700 bg-gray-900/80 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products by name, part number, manufacturer..."
              className="pl-9 bg-gray-900/50 border-gray-800 text-white focus:border-blue-600"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                onClick={() => onSearchChange('')}
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Quick filter toggle buttons */}
          <div className="flex flex-wrap gap-2">
            {filterGroups[0].filters.map(filter => (
              <ToggleButton
                key={filter.id}
                label={filter.label}
                checked={filters[filter.id]}
                onChange={() => onFilterToggle(filter.id)}
              />
            ))}
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="space-y-6 mt-6 pt-4 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Manufacturer section */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">Manufacturer</div>
                <CategoryFilter 
                  title="Manufacturer" 
                  options={mfrOptions} 
                  onToggle={(value) => onFilterToggle(value)} 
                />
              </div>
              
              {/* Price Range section */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">가격대</div>
                <div className="bg-gray-900/70 border border-gray-800 rounded-md p-3 space-y-2.5">
                  {filterGroups[1].filters.map(filter => (
                    <RadioFilterOption
                      key={filter.id}
                      id={filter.id}
                      label={filter.label}
                      checked={filters[filter.id]}
                      onToggle={(id) => {
                        // Uncheck all price filters first
                        filterGroups[1].filters.forEach(f => {
                          if (filters[f.id]) onFilterToggle(f.id);
                        });
                        // Toggle the selected filter
                        onFilterToggle(id);
                        setShowPriceCustom(false);
                      }}
                    />
                  ))}
                  
                  {/* Custom price option */}
                  <div>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          // Uncheck all price filters first
                          filterGroups[1].filters.forEach(f => {
                            if (filters[f.id]) onFilterToggle(f.id);
                          });
                          setShowPriceCustom(!showPriceCustom);
                        }}
                        className={cn(
                          "h-4 w-4 rounded-full border",
                          showPriceCustom
                            ? "bg-blue-600 border-blue-700 ring-1 ring-offset-1 ring-offset-gray-900 ring-blue-600"
                            : "border-gray-700 bg-gray-800"
                        )}
                      >
                        {showPriceCustom && (
                          <span className="block w-1.5 h-1.5 mx-auto rounded-full bg-white" />
                        )}
                      </button>
                      <label
                        className={cn(
                          "ml-3 text-sm cursor-pointer",
                          showPriceCustom ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                        )}
                        onClick={() => {
                          // Uncheck all price filters first
                          filterGroups[1].filters.forEach(f => {
                            if (filters[f.id]) onFilterToggle(f.id);
                          });
                          setShowPriceCustom(!showPriceCustom);
                        }}
                      >
                        직접 입력
                      </label>
                    </div>
                    
                    {showPriceCustom && (
                      <div className="mt-3 flex items-center gap-2 px-7">
                        <Input
                          type="text"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-20 h-8 bg-gray-800 border-gray-700 focus:border-blue-600 text-sm text-center"
                        />
                        <span className="text-gray-500">-</span>
                        <Input
                          type="text"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-20 h-8 bg-gray-800 border-gray-700 focus:border-blue-600 text-sm text-center"
                        />
                        <span className="text-xs text-gray-500">만원</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 ml-1 bg-blue-600/80 text-white border-blue-700 hover:bg-blue-700"
                          onClick={() => {
                            // Apply custom price filter logic here
                            // For now, just close the custom price input
                            // In a real implementation, you would set appropriate filters
                            // based on the minPrice and maxPrice values
                          }}
                        >
                          적용하기
                        </Button>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-2 px-7">
                      *각 제품의 가격 범위는 제메이커 기준으로 검색됩니다.
                    </div>
                  </div>
                </div>
              </div>

              {/* Voltage Range */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">입력 전압 범위</div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {filterGroups[2].filters.map(filter => (
                      <ToggleButton
                        key={filter.id}
                        label={filter.label}
                        checked={filters[filter.id]}
                        onChange={() => onFilterToggle(filter.id)}
                      />
                    ))}
                  </div>
                  {rangeFilters && rangeFilters.find(f => f.id === 'inputVoltage') && (
                    <RangeFilterComponent
                      title="Custom Range"
                      filter={rangeFilters.find(f => f.id === 'inputVoltage')!}
                      onChange={onRangeFilterChange || (() => {})}
                    />
                  )}
                </div>
              </div>
              
              {/* Current Range */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">출력 전류 범위</div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {filterGroups[3].filters.map(filter => (
                      <ToggleButton
                        key={filter.id}
                        label={filter.label}
                        checked={filters[filter.id]}
                        onChange={() => onFilterToggle(filter.id)}
                      />
                    ))}
                  </div>
                  {rangeFilters && rangeFilters.find(f => f.id === 'outputCurrent') && (
                    <RangeFilterComponent
                      title="Custom Range"
                      filter={rangeFilters.find(f => f.id === 'outputCurrent')!}
                      onChange={onRangeFilterChange || (() => {})}
                    />
                  )}
                </div>
              </div>
              
              {/* Switching Frequency */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">스위칭 주파수</div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {filterGroups[4].filters.map(filter => (
                      <ToggleButton
                        key={filter.id}
                        label={filter.label}
                        checked={filters[filter.id]}
                        onChange={() => onFilterToggle(filter.id)}
                      />
                    ))}
                  </div>
                  {rangeFilters && rangeFilters.find(f => f.id === 'switchingFrequency') && (
                    <RangeFilterComponent
                      title="Custom Range"
                      filter={rangeFilters.find(f => f.id === 'switchingFrequency')!}
                      onChange={onRangeFilterChange || (() => {})}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Topology and Dimming */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">Specifications</div>
                <div className="space-y-3">
                  <CategoryFilter 
                    title="Topology" 
                    options={topologyOptions} 
                    onToggle={(value) => onFilterToggle(value)} 
                  />
                  <CategoryFilter 
                    title="Dimming Method" 
                    options={dimmingOptions} 
                    onToggle={(value) => onFilterToggle(value)} 
                  />
                </div>
              </div>
              
              {/* Package Types */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">Package</div>
                <div className="space-y-3">
                  <CategoryFilter 
                    title="Package Type" 
                    options={packageOptions} 
                    onToggle={(value) => onFilterToggle(value)} 
                  />
                  <CategoryFilter 
                    title="Mounting Type" 
                    options={mountingOptions} 
                    onToggle={(value) => onFilterToggle(value)} 
                  />
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-blue-400">Product Features</div>
                <div className="space-y-3">
                  <CategoryFilter 
                    title="Features" 
                    options={featureOptions} 
                    onToggle={(value) => onFilterToggle(value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 