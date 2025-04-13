'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookmarkIcon, Download, ExternalLink, ShoppingCart, Zap, ChevronRight, Percent, Box, BarChart3, Check, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Feature = {
  id: number;
  name: string;
  description?: string;
  description_jsonb?: any;
};

type ProductFeature = {
  feature_id: number;
  description?: string;
  features: Feature;
};

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
    };
    output_current?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    switching_current?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    current_accuracy?: {
      between_ics?: number;
      between_channels?: number;
    };
    efficiency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    subcategory?: string;
    topology?: string[];
    dimming_method?: string[];
    package_type?: string;
    switching_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    datasheet_url?: string;
  };
  product_features?: ProductFeature[];
};

interface ProductCardProps {
  product: Product;
  isBookmarked: boolean;
  onBookmarkToggle: (productId: number) => void;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, isBookmarked, onBookmarkToggle, onClick }: ProductCardProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  const formatVoltageValue = (min?: number, max?: number, typ?: number, unit = 'V') => {
    if (typ !== undefined) return `${typ}${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max}${unit}`;
    if (min !== undefined) return `≥${min}${unit}`;
    if (max !== undefined) return `≤${max}${unit}`;
    return 'N/A';
  };

  const formatCurrentValue = (min?: number, max?: number, typ?: number, unit = 'mA') => {
    if (typ !== undefined) return `${typ}${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max}${unit}`;
    if (min !== undefined) return `≥${min}${unit}`;
    if (max !== undefined) return `≤${max}${unit}`;
    return 'N/A';
  };

  const formatFrequencyValue = (min?: number, max?: number, typ?: number, unit = 'kHz') => {
    if (typ !== undefined) return `${typ}${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max}${unit}`;
    if (min !== undefined) return `≥${min}${unit}`;
    if (max !== undefined) return `≤${max}${unit}`;
    return 'N/A';
  };
  
  const formatPercentValue = (value?: number) => {
    return value !== undefined ? `${value}%` : 'N/A';
  };

  const getTopology = () => {
    if (!product.specifications.topology) return 'N/A';
    return Array.isArray(product.specifications.topology) 
      ? product.specifications.topology[0] 
      : product.specifications.topology;
  };

  // Get tag color based on topology
  const getTopologyTagColor = () => {
    const topology = getTopology();
    switch(topology) {
      case 'Buck':
        return 'bg-blue-500/20 text-blue-400';
      case 'Boost':
        return 'bg-purple-500/20 text-purple-400';
      case 'Buck-Boost':
        return 'bg-indigo-500/20 text-indigo-400';
      case 'Flyback':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'Linear':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Get features to display
  const getFeaturesToDisplay = () => {
    if (!product.product_features || product.product_features.length === 0) {
      // Fallback to topology and other data if no product_features
      const fallbackFeatures = [];
      
      if (Array.isArray(product.specifications.topology) && product.specifications.topology.length > 0) {
        fallbackFeatures.push({
          icon: <Zap className="h-3.5 w-3.5 text-blue-400 mr-1.5 mt-0.5" />,
          text: `${product.specifications.topology[0]} topology`,
          description: undefined
        });
      }
      
      if (product.specifications.channels) {
        fallbackFeatures.push({
          icon: <BarChart3 className="h-3.5 w-3.5 text-blue-400 mr-1.5 mt-0.5" />,
          text: `${product.specifications.channels} channels`,
          description: undefined
        });
      }
      
      if (product.specifications.dimming_method && 
          Array.isArray(product.specifications.dimming_method) && 
          product.specifications.dimming_method.length > 0) {
        fallbackFeatures.push({
          icon: <ChevronRight className="h-3.5 w-3.5 text-blue-400 mr-1.5 mt-0.5" />,
          text: `${product.specifications.dimming_method[0]} dimming`,
          description: undefined
        });
      }
      
      return fallbackFeatures;
    }
    
    // Use actual product_features - limit to 5 features, add ellipsis if more
    const productFeatures = showAllFeatures 
      ? product.product_features 
      : product.product_features.slice(0, 5);
    
    return productFeatures.map(pf => ({
      icon: <Check className="h-3.5 w-3.5 text-blue-400 mr-1.5 mt-0.5" />,
      text: pf.features.name,
      description: pf.description || pf.features.description
    }));
  };
  
  const features = getFeaturesToDisplay();
  const totalFeatures = product.product_features?.length || 0;
  const hasMoreFeatures = totalFeatures > 5;
  const hiddenFeaturesCount = totalFeatures - 5;

  return (
    <div 
      className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-900/10 transition-all hover:bg-gray-800/30 group"
    >
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Left column: Main info */}
          <div className="lg:w-1/4 flex flex-col">
            {/* Header - Part number and bookmark */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-medium text-lg mb-1 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <div className="text-sm font-light text-gray-400 mb-1">{product.subtitle || 'LED Driver IC'}</div>
                <div className="text-xs text-gray-500 font-mono">{product.part_number}</div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkToggle(product.id);
                }}
                className={cn(
                  "rounded-full p-1.5",
                  isBookmarked 
                    ? "text-yellow-400 bg-yellow-400/10" 
                    : "text-gray-500 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
                )}
              >
                <BookmarkIcon className="h-4 w-4" />
              </button>
            </div>
            
            {/* Manufacturer */}
            {product.manufacturers && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Manufacturer</div>
                <Badge 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 bg-transparent text-xs px-2 py-0 h-5"
                >
                  {product.manufacturers.name}
                </Badge>
              </div>
            )}
            
            {/* Subcategory */}
            {product.specifications.subcategory && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="text-sm text-gray-300">{product.specifications.subcategory}</div>
              </div>
            )}
            
            {/* Topology */}
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Topology</div>
              <Badge className={cn("border-0", getTopologyTagColor())}>
                {getTopology()}
              </Badge>
            </div>
            
            {/* Package */}
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Package</div>
              <div className="flex items-center">
                <Box className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-sm text-gray-300">{product.specifications.package_type || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* Middle column: Technical specs */}
          <div className="lg:w-2/4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Input Voltage */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Input Voltage</div>
              <div className="text-sm text-white font-medium">
                {formatVoltageValue(
                  product.specifications.input_voltage?.min,
                  product.specifications.input_voltage?.max,
                  product.specifications.input_voltage?.typ
                )}
              </div>
            </div>
            
            {/* Output Voltage */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Output Voltage</div>
              <div className="text-sm text-white font-medium">
                {formatVoltageValue(
                  product.specifications.output_voltage?.min,
                  product.specifications.output_voltage?.max,
                  product.specifications.output_voltage?.typ
                )}
              </div>
            </div>
            
            {/* Output Current */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Output Current</div>
              <div className="text-sm text-white font-medium">
                {formatCurrentValue(
                  product.specifications.output_current?.min,
                  product.specifications.output_current?.max,
                  product.specifications.output_current?.typ
                )}
              </div>
            </div>
            
            {/* Switching Current */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Switching Current</div>
              <div className="text-sm text-white font-medium">
                {formatCurrentValue(
                  product.specifications.switching_current?.min,
                  product.specifications.switching_current?.max,
                  product.specifications.switching_current?.typ,
                  product.specifications.switching_current?.unit || 'mA'
                )}
              </div>
            </div>
            
            {/* Switching Frequency */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Frequency</div>
              <div className="text-sm text-white font-medium">
                {formatFrequencyValue(
                  product.specifications.switching_frequency?.min,
                  product.specifications.switching_frequency?.max,
                  product.specifications.switching_frequency?.typ,
                  product.specifications.switching_frequency?.unit || 'kHz'
                )}
              </div>
            </div>
            
            {/* Efficiency */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Efficiency</div>
              <div className="text-sm text-white font-medium flex items-center">
                <Percent className="h-3 w-3 text-gray-400 mr-1" />
                {formatPercentValue(product.specifications.efficiency?.typ)}
              </div>
            </div>
            
            {/* Channels */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Channels</div>
              <div className="text-sm text-white font-medium">
                {product.specifications.channels || 'N/A'}
              </div>
            </div>
            
            {/* Current Accuracy - Between ICs */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">IC Accuracy</div>
              <div className="text-sm text-white font-medium">
                {product.specifications.current_accuracy?.between_ics !== undefined 
                  ? `±${product.specifications.current_accuracy.between_ics}%` 
                  : 'N/A'}
              </div>
            </div>
            
            {/* Current Accuracy - Between Channels */}
            <div className="bg-gray-800/40 p-2 rounded-md flex flex-col">
              <div className="text-xs text-gray-500 mb-1">Channel Accuracy</div>
              <div className="text-sm text-white font-medium">
                {product.specifications.current_accuracy?.between_channels !== undefined 
                  ? `±${product.specifications.current_accuracy.between_channels}%` 
                  : 'N/A'}
              </div>
            </div>
          </div>
          
          {/* Right column: Actions */}
          <div className="lg:w-1/4 flex flex-col space-y-4">
            {/* Key Features */}
            <div className="col-span-2 lg:col-span-1">
              <div className="text-xs text-gray-500 mb-2 flex items-center justify-between">
                <span>Key Features</span>
                {hasMoreFeatures && showAllFeatures && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllFeatures(false);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                  >
                    <span>Show less</span>
                    <ChevronUp className="h-3 w-3 ml-1" />
                  </button>
                )}
              </div>
              <div className={cn(
                "space-y-2 pb-1",
                showAllFeatures && "max-h-72 overflow-y-auto custom-scrollbar pr-2"
              )}>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    {feature.icon}
                    <div>
                      <div className="text-sm text-gray-300">{feature.text}</div>
                      {feature.description && (
                        <div className="text-xs text-gray-500 mt-0.5">{feature.description}</div>
                      )}
                    </div>
                  </div>
                ))}
                {!showAllFeatures && hasMoreFeatures && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllFeatures(true);
                    }}
                    className="flex items-center text-blue-400 hover:text-blue-300 text-xs mt-2"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5 mr-1" />
                    <span>{hiddenFeaturesCount} more features</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Buttons section */}
            <div className="mt-4 flex flex-col space-y-2">
              <Link 
                href={`/products/detail/${product.id}`}
                className="w-full flex items-center justify-center px-3 py-2 text-xs rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Detail
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClick(product);
                }}
                className="w-full flex items-center justify-center px-3 py-2 text-xs rounded-md font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                View Datasheet Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 