'use client';

import { SearchInput } from '@/components/SearchInput';

// FilterOptions type
type FilterOptions = {
  manufacturers?: Array<{ id: number; name: string }>;
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

// Filter state type
type FilterState = {
  highVoltage: boolean;
  aecQ100: boolean;
  automotive: boolean;
  [key: string]: boolean;
};

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FilterState;
  onFilterToggle: (filterName: string) => void;
  filterOptions?: FilterOptions;
}

export function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterToggle,
  filterOptions 
}: FilterBarProps) {
  return (
    <div className="mb-8 space-y-4">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search products by name, part number, or manufacturer..."
      />
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterToggle('highVoltage')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filters.highVoltage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          High Voltage
        </button>
        <button
          onClick={() => onFilterToggle('aecQ100')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filters.aecQ100
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          AEC-Q100 Certified
        </button>
        <button
          onClick={() => onFilterToggle('automotive')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filters.automotive
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Automotive Grade
        </button>
        
        {/* Topology Filters */}
        {filterOptions?.topologies && filterOptions.topologies.length > 0 && (
          <div className="relative group ml-2">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Topology ▼
            </button>
            <div className="absolute hidden group-hover:block mt-1 bg-white shadow-lg rounded-md z-10 min-w-[200px]">
              {filterOptions.topologies.map(topology => (
                <button
                  key={topology}
                  onClick={() => onFilterToggle(`topology_${topology}`)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filters[`topology_${topology}`]
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {topology}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Package Type Filters */}
        {filterOptions?.packageTypes && filterOptions.packageTypes.length > 0 && (
          <div className="relative group ml-2">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Package ▼
            </button>
            <div className="absolute hidden group-hover:block mt-1 bg-white shadow-lg rounded-md z-10 min-w-[200px]">
              {filterOptions.packageTypes.map(packageType => (
                <button
                  key={packageType}
                  onClick={() => onFilterToggle(`package_${packageType}`)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filters[`package_${packageType}`]
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {packageType}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Dimming Method Filters */}
        {filterOptions?.dimmingMethods && filterOptions.dimmingMethods.length > 0 && (
          <div className="relative group ml-2">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Dimming ▼
            </button>
            <div className="absolute hidden group-hover:block mt-1 bg-white shadow-lg rounded-md z-10 min-w-[200px]">
              {filterOptions.dimmingMethods.map(method => (
                <button
                  key={method}
                  onClick={() => onFilterToggle(`dimming_${method}`)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filters[`dimming_${method}`]
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* More filter dropdowns can be added here */}
      </div>
    </div>
  );
} 