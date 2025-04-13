'use client';

import { useState } from 'react';
import { FilterPanel } from './FilterPanel';
import { ProductCard } from './ProductCard';
import { ProductDetailsModal } from './ProductDetailsModal';
import { Button } from '@/components/ui/button';

// Type definitions based on the provided schema
type Product = {
  id: number;
  name: string;
  subtitle: string;
  part_number: string;
  description?: string;
  manufacturers?: {
    id: number;
    name: string;
  };
  specifications: {
    channels?: number | string;
    input_voltage?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    output_voltage?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    output_current?: {
      min?: number;
      max?: number;
      typ?: number;
      description?: string;
      unit?: string;
    };
    current_accuracy?: {
      between_ics?: number;
      between_channels?: number;
    };
    operating_temperature?: {
      min?: number;
      max?: number;
      unit?: string;
    };
    package_type?: string;
    thermal_pad?: boolean;
    topology?: string[];
    dimming_method?: string[];
    switching_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    gray_scale_clock_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    data_clock_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    supply_package?: string;
    package_case?: string;
    mounting_type?: string;
    internal_switch?: boolean;
    transmission_interface?: {
      topology?: string;
      clock_integrity?: string;
      clock_direction?: string;
      bidirectional?: boolean;
    };
    led_matrix?: {
      max_pixels?: number;
      configuration?: string;
      description?: string;
    };
    communication_interface?: {
      type?: string;
      speed?: number;
      proprietary?: boolean;
      description?: string;
    };
    pwm?: {
      resolution?: string | string[];
      frequency?: number;
      description?: string;
    };
    scan_design?: {
      type?: string;
      max_channels?: number;
      description?: string;
    };
    datasheet_url?: string;
    // Additional properties for filtering
    certifications?: string[];
    applications?: string[];
  };
  images?: Array<{
    id: number;
    url: string;
    title?: string;
    description?: string;
  }>;
  product_categories?: Array<{
    category_id: number;
    categories: {
      id: number;
      name: string;
      description?: string;
    };
  }>;
  product_features?: Array<{
    feature_id: number;
    description?: string;
    features: {
      id: number;
      name: string;
      description?: string;
      description_jsonb?: any;
    };
  }>;
  product_documents?: Array<{
    document_id: number;
    documents: {
      id: number;
      title: string;
      url: string;
      type_id?: number;
    };
  }>;
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

// Define FilterState type
type FilterState = {
  highVoltage: boolean;
  aecQ100: boolean;
  automotive: boolean;
  under1: boolean;
  under5: boolean;
  under10: boolean;
  under20: boolean;
  under30: boolean;
  under50: boolean;
  under70: boolean;
  under100: boolean;
  over100: boolean;
  // Voltage range filters
  voltage_low: boolean;
  voltage_mid: boolean;
  voltage_high: boolean;
  voltage_vhigh: boolean;
  // Current range filters
  current_low: boolean;
  current_mid: boolean;
  current_high: boolean;
  current_vhigh: boolean;
  // Frequency range filters
  freq_low: boolean;
  freq_mid: boolean;
  freq_high: boolean;
  freq_vhigh: boolean;
  [key: string]: boolean;
};

// Define RangeFilter type
type RangeFilter = {
  id: string;
  name: string;
  min: number;
  max: number;
  unit: string;
  value: [number, number];
};

interface ProductListProps {
  products: Product[];
  filterOptions: FilterOptions;
}

export function ProductList({ products, filterOptions }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProducts, setBookmarkedProducts] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    highVoltage: false,
    aecQ100: false,
    automotive: false,
    under1: false,
    under5: false,
    under10: false,
    under20: false,
    under30: false,
    under50: false,
    under70: false,
    under100: false,
    over100: false,
    // Voltage range filters
    voltage_low: false,
    voltage_mid: false,
    voltage_high: false,
    voltage_vhigh: false,
    // Current range filters
    current_low: false,
    current_mid: false,
    current_high: false,
    current_vhigh: false,
    // Frequency range filters
    freq_low: false,
    freq_mid: false,
    freq_high: false,
    freq_vhigh: false
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rangeFilters, setRangeFilters] = useState<RangeFilter[]>([
    {
      id: 'inputVoltage',
      name: 'Input Voltage',
      min: filterOptions.voltage?.input?.min || 0,
      max: filterOptions.voltage?.input?.max || 100,
      unit: 'V',
      value: [filterOptions.voltage?.input?.min || 0, filterOptions.voltage?.input?.max || 100] as [number, number]
    },
    {
      id: 'outputCurrent',
      name: 'Output Current',
      min: filterOptions.current?.output?.min || 0,
      max: filterOptions.current?.output?.max || 1000,
      unit: 'mA',
      value: [filterOptions.current?.output?.min || 0, filterOptions.current?.output?.max || 1000] as [number, number]
    },
    {
      id: 'switchingFrequency',
      name: 'Switching Frequency',
      min: filterOptions.frequency?.switching?.min || 0,
      max: filterOptions.frequency?.switching?.max || 1000,
      unit: 'kHz',
      value: [filterOptions.frequency?.switching?.min || 0, filterOptions.frequency?.switching?.max || 1000] as [number, number]
    }
  ]);

  // Filter products based on search query and filter buttons
  const filteredProducts = products.filter(product => {
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const partNumberMatch = product.part_number?.toLowerCase().includes(searchLower);
      const descriptionMatch = product.description?.toLowerCase().includes(searchLower);
      const manufacturerMatch = product.manufacturers?.name.toLowerCase().includes(searchLower);
      
      if (!(nameMatch || partNumberMatch || descriptionMatch || manufacturerMatch)) {
        return false;
      }
    }
    
    // Apply common filters
    if (filters.highVoltage) {
      const maxInputVoltage = product.specifications?.input_voltage?.max;
      if (!maxInputVoltage || maxInputVoltage < 40) { // Assuming high voltage is above 40V
        return false;
      }
    }
    
    if (filters.aecQ100) {
      const hasAecQ100 = product.specifications?.certifications?.includes('AEC-Q100');
      if (!hasAecQ100) {
        return false;
      }
    }
    
    if (filters.automotive) {
      const isAutomotive = product.specifications?.applications?.includes('Automotive');
      if (!isAutomotive) {
        return false;
      }
    }

    // Apply price range filters (simulated price filtering - in a real app you would use actual price data)
    // This is just a placeholder implementation for the UI demonstration
    const estimatedPrice = product.id * 3; // Just a placeholder calculation
    
    if (filters.under1 && estimatedPrice >= 10000) return false;
    if (filters.under5 && (estimatedPrice < 10000 || estimatedPrice > 50000)) return false;
    if (filters.under10 && (estimatedPrice < 50000 || estimatedPrice > 100000)) return false;
    if (filters.under20 && (estimatedPrice < 100000 || estimatedPrice > 200000)) return false;
    if (filters.under30 && (estimatedPrice < 200000 || estimatedPrice > 300000)) return false;
    if (filters.under50 && (estimatedPrice < 300000 || estimatedPrice > 500000)) return false;
    if (filters.under70 && (estimatedPrice < 500000 || estimatedPrice > 700000)) return false;
    if (filters.under100 && (estimatedPrice < 700000 || estimatedPrice > 1000000)) return false;
    if (filters.over100 && estimatedPrice <= 1000000) return false;
    
    // Apply range filters
    const voltageFilter = rangeFilters.find(f => f.id === 'inputVoltage');
    if (voltageFilter && (voltageFilter.value[0] > voltageFilter.min || voltageFilter.value[1] < voltageFilter.max)) {
      const inputVoltage = product.specifications?.input_voltage;
      if (!inputVoltage || 
          (inputVoltage.max !== undefined && inputVoltage.max < voltageFilter.value[0]) || 
          (inputVoltage.min !== undefined && inputVoltage.min > voltageFilter.value[1])) {
        return false;
      }
    }
    
    const currentFilter = rangeFilters.find(f => f.id === 'outputCurrent');
    if (currentFilter && (currentFilter.value[0] > currentFilter.min || currentFilter.value[1] < currentFilter.max)) {
      const outputCurrent = product.specifications?.output_current;
      if (!outputCurrent || 
          (outputCurrent.max !== undefined && outputCurrent.max < currentFilter.value[0]) || 
          (outputCurrent.min !== undefined && outputCurrent.min > currentFilter.value[1])) {
        return false;
      }
    }
    
    const frequencyFilter = rangeFilters.find(f => f.id === 'switchingFrequency');
    if (frequencyFilter && (frequencyFilter.value[0] > frequencyFilter.min || frequencyFilter.value[1] < frequencyFilter.max)) {
      const frequency = product.specifications?.switching_frequency;
      if (!frequency || 
          (frequency.max !== undefined && frequency.max < frequencyFilter.value[0]) || 
          (frequency.min !== undefined && frequency.min > frequencyFilter.value[1])) {
        return false;
      }
    }
    
    // Apply manufacturer filters
    const mfrFilters = Object.keys(filters).filter(key => key.startsWith('mfr_') && filters[key]);
    if (mfrFilters.length > 0) {
      const mfrId = product.manufacturers?.id;
      if (!mfrId || !mfrFilters.includes(`mfr_${mfrId}`)) {
        return false;
      }
    }
    
    // Apply topology filters
    const topologyFilters = Object.keys(filters).filter(key => key.startsWith('topology_') && filters[key]);
    if (topologyFilters.length > 0) {
      const topologies = product.specifications?.topology;
      if (!topologies || !topologyFilters.some(filter => 
        topologies.includes(filter.replace('topology_', '')))) {
        return false;
      }
    }
    
    // Apply dimming method filters
    const dimmingFilters = Object.keys(filters).filter(key => key.startsWith('dimming_') && filters[key]);
    if (dimmingFilters.length > 0) {
      const methods = product.specifications?.dimming_method;
      if (!methods || !dimmingFilters.some(filter => 
        methods.includes(filter.replace('dimming_', '')))) {
        return false;
      }
    }
    
    // Apply package type filters
    const packageFilters = Object.keys(filters).filter(key => key.startsWith('package_') && filters[key]);
    if (packageFilters.length > 0) {
      const packageType = product.specifications?.package_type;
      if (!packageType || !packageFilters.some(filter => 
        packageType === filter.replace('package_', ''))) {
        return false;
      }
    }
    
    // Apply channels filters
    const channelsFilters = Object.keys(filters).filter(key => key.startsWith('channels_') && filters[key]);
    if (channelsFilters.length > 0) {
      const channels = product.specifications?.channels;
      if (!channels || !channelsFilters.some(filter => 
        channels.toString() === filter.replace('channels_', ''))) {
        return false;
      }
    }

    // Apply mounting type filters
    const mountingFilters = Object.keys(filters).filter(key => key.startsWith('mounting_') && filters[key]);
    if (mountingFilters.length > 0) {
      const mountingType = product.specifications?.mounting_type;
      if (!mountingType || !mountingFilters.some(filter => 
        mountingType === filter.replace('mounting_', ''))) {
        return false;
      }
    }

    // Apply communication type filters
    const commFilters = Object.keys(filters).filter(key => key.startsWith('comm_') && filters[key]);
    if (commFilters.length > 0) {
      const commType = product.specifications?.communication_interface?.type;
      if (!commType || !commFilters.some(filter => 
        commType === filter.replace('comm_', ''))) {
        return false;
      }
    }
    
    // Apply voltage range filters
    if (filters.voltage_low && 
        (!product.specifications.input_voltage?.max || product.specifications.input_voltage.max > 5)) {
      return false;
    }
    
    if (filters.voltage_mid && 
        (!product.specifications.input_voltage?.min || product.specifications.input_voltage.min < 5 ||
         !product.specifications.input_voltage?.max || product.specifications.input_voltage.max > 12)) {
      return false;
    }
    
    if (filters.voltage_high && 
        (!product.specifications.input_voltage?.min || product.specifications.input_voltage.min < 12 ||
         !product.specifications.input_voltage?.max || product.specifications.input_voltage.max > 24)) {
      return false;
    }
    
    if (filters.voltage_vhigh && 
        (!product.specifications.input_voltage?.min || product.specifications.input_voltage.min < 24)) {
      return false;
    }
    
    // Apply current range filters
    if (filters.current_low && 
        (!product.specifications.output_current?.max || product.specifications.output_current.max > 100)) {
      return false;
    }
    
    if (filters.current_mid && 
        (!product.specifications.output_current?.min || product.specifications.output_current.min < 100 ||
         !product.specifications.output_current?.max || product.specifications.output_current.max > 500)) {
      return false;
    }
    
    if (filters.current_high && 
        (!product.specifications.output_current?.min || product.specifications.output_current.min < 500 ||
         !product.specifications.output_current?.max || product.specifications.output_current.max > 1000)) {
      return false;
    }
    
    if (filters.current_vhigh && 
        (!product.specifications.output_current?.min || product.specifications.output_current.min < 1000)) {
      return false;
    }
    
    // Apply frequency range filters
    if (filters.freq_low && 
        (!product.specifications.switching_frequency?.max || product.specifications.switching_frequency.max > 100)) {
      return false;
    }
    
    if (filters.freq_mid && 
        (!product.specifications.switching_frequency?.min || product.specifications.switching_frequency.min < 100 ||
         !product.specifications.switching_frequency?.max || product.specifications.switching_frequency.max > 500)) {
      return false;
    }
    
    if (filters.freq_high && 
        (!product.specifications.switching_frequency?.min || product.specifications.switching_frequency.min < 500 ||
         !product.specifications.switching_frequency?.max || product.specifications.switching_frequency.max > 1000)) {
      return false;
    }
    
    if (filters.freq_vhigh && 
        (!product.specifications.switching_frequency?.min || product.specifications.switching_frequency.min < 1000)) {
      return false;
    }
    
    // Apply feature filters
    const featureFilters = Object.keys(filters).filter(key => key.startsWith('feature_') && filters[key]);
    if (featureFilters.length > 0) {
      const productFeatures = product.product_features?.map(pf => pf.feature_id) || [];
      const matchesFeature = featureFilters.some(filter => {
        const featureId = parseInt(filter.replace('feature_', ''));
        return productFeatures.includes(featureId);
      });
      
      if (!matchesFeature) {
        return false;
      }
    }
    
    return true;
  });

  const toggleBookmark = (productId: number) => {
    setBookmarkedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFilter = (filterName: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRangeFilterChange = (filterId: string, range: [number, number]) => {
    setRangeFilters(prev => 
      prev.map(filter => 
        filter.id === filterId ? { ...filter, value: range } : filter
      )
    );
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    
    // Count boolean filters
    count += Object.values(filters).filter(Boolean).length;
    
    // Count range filters
    rangeFilters.forEach(filter => {
      if (filter.value[0] > filter.min || filter.value[1] < filter.max) {
        count++;
      }
    });
    
    return count;
  };
  
  const activeFiltersCount = countActiveFilters();

  const clearFilters = () => {
    setFilters({
      highVoltage: false,
      aecQ100: false,
      automotive: false,
      under1: false,
      under5: false,
      under10: false,
      under20: false,
      under30: false,
      under50: false,
      under70: false,
      under100: false,
      over100: false,
      // Reset voltage range filters
      voltage_low: false,
      voltage_mid: false,
      voltage_high: false,
      voltage_vhigh: false,
      // Reset current range filters
      current_low: false,
      current_mid: false,
      current_high: false,
      current_vhigh: false,
      // Reset frequency range filters
      freq_low: false,
      freq_mid: false,
      freq_high: false,
      freq_vhigh: false
    });
    
    setRangeFilters(prev => 
      prev.map(filter => ({
        ...filter,
        value: [filter.min, filter.max]
      }))
    );
    
    setSearchQuery('');
  };

  return (
    <div>
      <FilterPanel 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        rangeFilters={rangeFilters}
        onFilterToggle={toggleFilter}
        onRangeFilterChange={handleRangeFilterChange}
        filterOptions={filterOptions}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />
      
      <div className="mt-4 grid grid-cols-1 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="bg-gray-900/40 rounded-lg p-8 max-w-lg mx-auto">
              <div className="text-gray-400 mb-4">No products match your current filters</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="border-gray-700 bg-gray-800/60 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isBookmarked={bookmarkedProducts.includes(product.id)}
              onBookmarkToggle={toggleBookmark}
              onClick={handleCardClick}
            />
          ))
        )}
      </div>
      
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
} 