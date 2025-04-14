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
      description?: string;
    };
    output_current?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
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
    operating_temperature?: {
      min?: number;
      max?: number;
      unit?: string;
    };
    thermal_pad?: boolean;
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
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Boost':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Buck-Boost':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'Flyback':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Linear Regulator':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Charge Pump':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
      onClick={() => onClick(product)}
      className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border border-gray-800 hover:border-blue-900/50 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-800/10 transition-all group cursor-pointer relative"
    >
      {/* Glowing effect elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5"></div>
      
      <div className="p-5 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left column: Main info */}
          <div className="lg:w-1/4 flex flex-col">
            {/* Header - Part number and bookmark */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-px w-6 bg-blue-500"></div>
                  <span className="text-blue-400 text-xs font-medium">LED DRIVER IC</span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-1 group-hover:text-blue-300 transition-colors">
                  {product.name}
                </h3>
                <div className="text-sm font-light text-gray-400 mb-1">{product.subtitle || 'LED Driver IC'}</div>
                <div className="text-xs text-blue-400/70 font-mono bg-blue-500/5 px-2 py-0.5 rounded inline-block mt-1">
                  {product.part_number}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkToggle(product.id);
                }}
                className={cn(
                  "rounded-full p-2 backdrop-blur-sm transition-all",
                  isBookmarked 
                    ? "text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20" 
                    : "text-gray-500 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
                )}
              >
                <BookmarkIcon className="h-4 w-4" />
              </button>
            </div>
            
            {/* Manufacturer */}
            {product.manufacturers && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">제조사</div>
                <Badge 
                  variant="outline" 
                  className="border-indigo-500/30 text-indigo-300 bg-indigo-500/5 text-xs px-2 py-0.5"
                >
                  {product.manufacturers.name}
                </Badge>
              </div>
            )}
            
            {/* Subcategory */}
            {product.specifications.subcategory && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">카테고리</div>
                <div className="text-sm text-gray-300">{product.specifications.subcategory}</div>
              </div>
            )}
            
            {/* Topology */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">토폴로지</div>
              <Badge 
                className={cn(
                  "border border-opacity-30 px-2 py-0.5",
                  getTopologyTagColor()
                )}
              >
                {getTopology()}
              </Badge>
            </div>
            
            {/* Package */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">패키지</div>
              <div className="flex items-center">
                <Box className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-sm text-gray-300">{product.specifications.package_type || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* Middle column: Technical specs */}
          <div className="lg:w-2/4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Header for specs section */}
            <div className="col-span-full mb-1">
              <div className="text-sm font-medium text-blue-300 border-b border-blue-900/30 pb-1 mb-3">주요 사양</div>
            </div>
            
            {/* Channels */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
              <div className="text-xs text-gray-500 mb-1">채널</div>
              <div className="text-sm text-white font-medium">
                {product.specifications.channels || 'N/A'}
              </div>
            </div>
            
            {/* Input Voltage */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
              <div className="text-xs text-gray-500 mb-1">입력 전압</div>
              <div className="text-sm text-white font-medium">
                {formatVoltageValue(
                  product.specifications.input_voltage?.min,
                  product.specifications.input_voltage?.max,
                  product.specifications.input_voltage?.typ,
                  product.specifications.input_voltage?.unit || 'V'
                )}
              </div>
            </div>
            
            {/* Output Voltage */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
              <div className="text-xs text-gray-500 mb-1">출력 전압</div>
              <div className="text-sm text-white font-medium">
                {formatVoltageValue(
                  product.specifications.output_voltage?.min,
                  product.specifications.output_voltage?.max,
                  product.specifications.output_voltage?.typ,
                  product.specifications.output_voltage?.unit || 'V'
                )}
              </div>
            </div>
            
            {/* Output Current */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
              <div className="text-xs text-gray-500 mb-1">출력 전류</div>
              <div className="text-sm text-white font-medium">
                {formatCurrentValue(
                  product.specifications.output_current?.min,
                  product.specifications.output_current?.max,
                  product.specifications.output_current?.typ,
                  product.specifications.output_current?.unit || 'mA'
                )}
              </div>
            </div>
            
            {/* Current Accuracy - Between ICs */}
            {product.specifications.current_accuracy?.between_ics !== undefined && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
                <div className="text-xs text-gray-500 mb-1">IC 정확도</div>
                <div className="text-sm text-white font-medium">
                  ±{product.specifications.current_accuracy.between_ics}%
                </div>
              </div>
            )}
            
            {/* Current Accuracy - Between Channels */}
            {product.specifications.current_accuracy?.between_channels !== undefined && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
                <div className="text-xs text-gray-500 mb-1">채널 정확도</div>
                <div className="text-sm text-white font-medium">
                  ±{product.specifications.current_accuracy.between_channels}%
                </div>
              </div>
            )}
            
            {/* Dimming Method */}
            {product.specifications.dimming_method && product.specifications.dimming_method.length > 0 && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
                <div className="text-xs text-gray-500 mb-1">조광 방식</div>
                <div className="text-sm text-white font-medium">
                  {product.specifications.dimming_method.join(', ')}
                </div>
              </div>
            )}
            
            {/* Operating Temperature */}
            {product.specifications.operating_temperature && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
                <div className="text-xs text-gray-500 mb-1">동작 온도</div>
                <div className="text-sm text-white font-medium">
                  {product.specifications.operating_temperature.min !== undefined && 
                    product.specifications.operating_temperature.max !== undefined ? 
                    `${product.specifications.operating_temperature.min}~${product.specifications.operating_temperature.max}${product.specifications.operating_temperature.unit || '°C'}` : 
                    'N/A'}
                </div>
              </div>
            )}
            
            {/* Switching Frequency */}
            {product.specifications.switching_frequency && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-800 p-2.5 rounded-lg flex flex-col hover:border-blue-900/40 transition-colors">
                <div className="text-xs text-gray-500 mb-1">스위칭 주파수</div>
                <div className="text-sm text-white font-medium">
                  {formatFrequencyValue(
                    product.specifications.switching_frequency.min,
                    product.specifications.switching_frequency.max,
                    product.specifications.switching_frequency.typ,
                    product.specifications.switching_frequency.unit || 'kHz'
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Right column: Actions */}
          <div className="lg:w-1/4 flex flex-col space-y-5">
            {/* Key Features */}
            <div className="col-span-2 lg:col-span-1">
              <div className="text-sm font-medium text-blue-300 border-b border-blue-900/30 pb-1 mb-3 flex items-center justify-between">
                <span>주요 특징</span>
                {hasMoreFeatures && showAllFeatures && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllFeatures(false);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                  >
                    <span>접기</span>
                    <ChevronUp className="h-3 w-3 ml-1" />
                  </button>
                )}
              </div>
              <div className={cn(
                "space-y-2.5 pb-1 bg-gray-800/20 backdrop-blur-sm border border-gray-800 p-3 rounded-lg hover:border-blue-900/30 transition-colors",
                showAllFeatures && "max-h-72 overflow-y-auto custom-scrollbar pr-2"
              )}>
                {features.length > 0 ? (
                  <>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start group/feature">
                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center mr-2 group-hover/feature:bg-blue-500/20 transition-colors">
                          {feature.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-300 group-hover/feature:text-blue-300 transition-colors">{feature.text}</div>
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
                        className="flex items-center justify-center w-full text-blue-400 hover:text-blue-300 text-xs mt-2 py-1 border-t border-gray-800"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5 mr-1" />
                        <span>{hiddenFeaturesCount}개 더 보기</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-gray-500 italic text-center py-2">
                    특징 정보가 없습니다
                  </div>
                )}
              </div>
            </div>
            
            {/* Buttons section */}
            <div className="flex flex-col space-y-3 mt-auto">
              <Link 
                href={`/products/detail/${product.id}`}
                className="w-full flex items-center justify-center px-3 py-2.5 text-sm rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition-all relative overflow-hidden group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <ExternalLink className="h-4 w-4 mr-2" />
                상세 정보 보기
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick(product);
                }}
                className="w-full flex items-center justify-center px-3 py-2.5 text-sm rounded-lg font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors bg-gray-800/30 backdrop-blur-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                데이터시트 미리보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 