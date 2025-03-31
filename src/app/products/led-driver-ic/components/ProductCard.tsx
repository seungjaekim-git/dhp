'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bookmark, ShoppingCart, ChevronDown, ChevronRight, 
  Info, Cpu, Zap, Box, Clock, Terminal, Grid, HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { useBookmarkStore } from "@/store/bookmarkStore"
import { useQuoteCartStore } from "@/store/quoteCartStore"
import { cn } from "@/lib/utils"
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ExternalLink,
} from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

interface ProductCardProps {
  product: any;
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

interface SpecItem {
  label: string;
  value: string | number | boolean;
  tooltip?: string;
}

interface SpecGroup {
  icon: JSX.Element;
  title: string;
  items: SpecItem[];
}

interface SpecGroups {
  basics: SpecGroup;
  power: SpecGroup;
  performance: SpecGroup;
  physical: SpecGroup;
  frequency: SpecGroup;
  interface: SpecGroup;
  led: SpecGroup;
}

// 사양 항목별 툴팁 텍스트
const tooltips = {
  channels: "LED 드라이버가 제어할 수 있는 독립 LED 채널의 수",
  topology: "LED 드라이버 IC의 내부 회로 구성 방식",
  dimming_method: "LED 밝기를 제어하는 방식",
  internal_switch: "LED 드라이버 IC 내부에 스위치가 내장되어 있는지 여부",
  input_voltage: "LED 드라이버 IC의 입력 전압 범위",
  output_voltage: "LED 드라이버 IC에서 출력되는 전압 범위",
  output_current: "LED 드라이버 IC에서 출력되는 전류 범위",
  current_accuracy: "채널 간 또는 IC 간의 전류 정확도",
  operating_temperature: "IC의 정상 작동 가능한 온도 범위",
  package_type: "IC의 물리적 패키지 유형",
  thermal_pad: "열 발산을 위한 패드 존재 여부",
  switching_frequency: "LED 드라이버의 스위칭 주파수",
  gray_scale_clock: "그레이스케일 디밍에 사용되는 클럭 주파수",
  data_clock: "데이터 전송에 사용되는 클럭 주파수",
  transmission_interface: "데이터 전송에 사용되는 인터페이스 방식",
  communication_interface: "IC 제어를 위한 통신 인터페이스",
  pwm: "펄스 폭 변조 신호 특성",
  led_matrix: "LED 매트릭스 구성 정보",
};

export default function ProductCard({ product, activeTab, onTabChange }: ProductCardProps) {
  const { toast } = useToast()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const { addItem, isInQuote } = useQuoteCartStore();
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);

  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);

  const isBookmarkedStatus = product.id ? isBookmarked(product.id) : false;
  const isInQuoteStatus = product.id ? isInQuote(product.id) : false;
  
  const handleBookmarkToggle = () => {
    if (isBookmarkedStatus) {
      removeBookmark(product.id);
    } else {
      addBookmark({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || product.part_number || '',
        manufacturerName: product.manufacturers && typeof product.manufacturers === 'object' && 'name' in product.manufacturers
          ? product.manufacturers.name
          : '미상 제조사',
        manufacturerId: product.manufacturer_id || 0,
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || '',
        packageType: product.specifications?.package_type || '',
        category: 'LED 드라이버 IC'
      });
    }
  };
  
  const handleAddToQuote = () => {
    addItem({
      id: product.id,
      name: product.name,
      quantity: 1,
      subtitle: product.subtitle || product.part_number || '',
      manufacturerName: product.manufacturers && typeof product.manufacturers === 'object' && 'name' in product.manufacturers
        ? product.manufacturers.name
        : '미상 제조사',
      manufacturerId: product.manufacturer_id || 0,
      addedAt: new Date().toISOString(),
      imageUrl: product.images?.[0]?.url || '',
      packageType: product.specifications?.package_type || '',
    });
  };

  const tabs = [
    { title: "기본 정보", icon: Info },
    { title: "전력 특성", icon: Zap },
    { title: "성능 특성", icon: Cpu },
    { title: "물리적 특성", icon: Box },
    { title: "주파수 특성", icon: Clock },
    { title: "인터페이스", icon: Terminal },
    { title: "LED 매트릭스", icon: Grid }
  ];

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tabKeys = ["basics", "power", "performance", "physical", "frequency", "interface", "led"];
      const selectedTab = tabKeys[index];
      setLocalActiveTab(selectedTab);
      if (onTabChange) {
        onTabChange(selectedTab);
      }
    }
  };

  // 사양 항목의 툴팁 키를 가져오는 함수
  const getTooltipKey = (label: string): string => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('채널')) return 'channels';
    if (lowerLabel.includes('토폴로지')) return 'topology';
    if (lowerLabel.includes('디밍')) return 'dimming_method';
    if (lowerLabel.includes('내부 스위치')) return 'internal_switch';
    if (lowerLabel.includes('입력 전압')) return 'input_voltage';
    if (lowerLabel.includes('출력 전압')) return 'output_voltage';
    if (lowerLabel.includes('출력 전류')) return 'output_current';
    if (lowerLabel.includes('전류 정확도')) return 'current_accuracy';
    if (lowerLabel.includes('동작 온도')) return 'operating_temperature';
    if (lowerLabel.includes('패키지')) return 'package_type';
    if (lowerLabel.includes('thermal')) return 'thermal_pad';
    if (lowerLabel.includes('스위칭 주파수')) return 'switching_frequency';
    if (lowerLabel.includes('그레이스케일')) return 'gray_scale_clock';
    if (lowerLabel.includes('데이터 클럭')) return 'data_clock';
    if (lowerLabel.includes('전송 인터페이스')) return 'transmission_interface';
    if (lowerLabel.includes('통신 인터페이스')) return 'communication_interface';
    if (lowerLabel.includes('pwm')) return 'pwm';
    if (lowerLabel.includes('led 매트릭스')) return 'led_matrix';
    return '';
  };

  // 탭 컨텐츠 렌더링 함수
  const renderTabContent = (tabKey: string) => {
    const specs = product.specifications;
    if (!specs) return null;

    const specGroups: SpecGroups = {
      basics: {
        icon: <Info className="w-4 h-4 mr-2" />,
        title: "기본 정보",
        items: []
      },
      power: {
        icon: <Zap className="w-4 h-4 mr-2" />,
        title: "전력 특성",
        items: []
      },
      performance: {
        icon: <Cpu className="w-4 h-4 mr-2" />,
        title: "성능 특성",
        items: []
      },
      physical: {
        icon: <Box className="w-4 h-4 mr-2" />,
        title: "물리적 특성",
        items: []
      },
      frequency: {
        icon: <Clock className="w-4 h-4 mr-2" />,
        title: "주파수 특성",
        items: []
      },
      interface: {
        icon: <Terminal className="w-4 h-4 mr-2" />,
        title: "인터페이스",
        items: []
      },
      led: {
        icon: <Grid className="w-4 h-4 mr-2" />,
        title: "LED 매트릭스",
        items: []
      }
    };

    // 기본 정보
    if (specs.channels) {
      specGroups.basics.items.push({
        label: "채널",
        value: specs.channels
      });
    }
    
    if (specs.topology) {
      specGroups.basics.items.push({
        label: "토폴로지",
        value: Array.isArray(specs.topology) ? specs.topology.join(', ') : specs.topology
      });
    }
    
    if (specs.dimming_method) {
      specGroups.basics.items.push({
        label: "디밍 방식",
        value: Array.isArray(specs.dimming_method) ? specs.dimming_method.join(', ') : specs.dimming_method
      });
    }
    
    if (specs.internal_switch !== undefined) {
      specGroups.basics.items.push({
        label: "내부 스위치",
        value: specs.internal_switch ? "내장" : "외장"
      });
    }
    
    // 전력 특성
    if (specs.input_voltage) {
      const minV = specs.input_voltage.min !== undefined ? specs.input_voltage.min : '?';
      const maxV = specs.input_voltage.max !== undefined ? specs.input_voltage.max : '?';
      const typV = specs.input_voltage.typ !== undefined ? specs.input_voltage.typ : null;
      const unit = specs.input_voltage.unit || 'V';
      
      let value = `${minV}-${maxV}${unit}`;
      if (typV) value += ` (일반: ${typV}${unit})`;
      
      specGroups.power.items.push({
        label: "입력 전압",
        value: value
      });
    }
    
    if (specs.output_voltage) {
      const minV = specs.output_voltage.min !== undefined ? specs.output_voltage.min : '?';
      const maxV = specs.output_voltage.max !== undefined ? specs.output_voltage.max : '?';
      const typV = specs.output_voltage.typ !== undefined ? specs.output_voltage.typ : null;
      const unit = specs.output_voltage.unit || 'V';
      
      let value = `${minV}-${maxV}${unit}`;
      if (typV) value += ` (일반: ${typV}${unit})`;
      
      specGroups.power.items.push({
        label: "출력 전압",
        value: value
      });
    }
    
    if (specs.output_current) {
      const minC = specs.output_current.min !== undefined ? specs.output_current.min : '?';
      const maxC = specs.output_current.max !== undefined ? specs.output_current.max : '?';
      const typC = specs.output_current.typ !== undefined ? specs.output_current.typ : null;
      const unit = specs.output_current.unit || 'mA';
      
      let value = `${minC}-${maxC}${unit}`;
      if (typC) value += ` (일반: ${typC}${unit})`;
      
      specGroups.power.items.push({
        label: "출력 전류",
        value: value
      });
    }
    
    // 성능 특성
    if (specs.current_accuracy) {
      if (specs.current_accuracy.between_ics !== undefined) {
        specGroups.performance.items.push({
          label: "IC 간 전류 정확도",
          value: `${specs.current_accuracy.between_ics}%`
        });
      }
      
      if (specs.current_accuracy.between_channels !== undefined) {
        specGroups.performance.items.push({
          label: "채널 간 전류 정확도",
          value: `${specs.current_accuracy.between_channels}%`
        });
      }
    }
    
    if (specs.operating_temperature) {
      const minT = specs.operating_temperature.min !== undefined ? specs.operating_temperature.min : '?';
      const maxT = specs.operating_temperature.max !== undefined ? specs.operating_temperature.max : '?';
      const unit = specs.operating_temperature.unit || '°C';
      
      specGroups.performance.items.push({
        label: "동작 온도",
        value: `${minT}~${maxT}${unit}`
      });
    }
    
    // 물리적 특성
    if (specs.package_type) {
      specGroups.physical.items.push({
        label: "패키지 타입",
        value: specs.package_type
      });
    }
    
    if (specs.thermal_pad !== undefined) {
      specGroups.physical.items.push({
        label: "Thermal Pad",
        value: specs.thermal_pad ? "있음" : "없음"
      });
    }
    
    if (specs.package_case) {
      specGroups.physical.items.push({
        label: "패키지/케이스",
        value: specs.package_case
      });
    }
    
    if (specs.mounting_type) {
      specGroups.physical.items.push({
        label: "실장 유형",
        value: specs.mounting_type
      });
    }
    
    if (specs.supply_package) {
      specGroups.physical.items.push({
        label: "공급 장치 패키지",
        value: specs.supply_package
      });
    }
    
    // 주파수 특성
    if (specs.switching_frequency) {
      const minF = specs.switching_frequency.min !== undefined ? specs.switching_frequency.min : '?';
      const maxF = specs.switching_frequency.max !== undefined ? specs.switching_frequency.max : '?';
      const typF = specs.switching_frequency.typ !== undefined ? specs.switching_frequency.typ : null;
      const unit = specs.switching_frequency.unit || 'kHz';
      
      let value = `${minF}-${maxF}${unit}`;
      if (typF) value += ` (일반: ${typF}${unit})`;
      
      specGroups.frequency.items.push({
        label: "스위칭 주파수",
        value: value
      });
    }
    
    if (specs.gray_scale_clock_frequency) {
      const minF = specs.gray_scale_clock_frequency.min !== undefined ? specs.gray_scale_clock_frequency.min : '?';
      const maxF = specs.gray_scale_clock_frequency.max !== undefined ? specs.gray_scale_clock_frequency.max : '?';
      const typF = specs.gray_scale_clock_frequency.typ !== undefined ? specs.gray_scale_clock_frequency.typ : null;
      const unit = specs.gray_scale_clock_frequency.unit || 'Hz';
      
      let value = `${minF}-${maxF}${unit}`;
      if (typF) value += ` (일반: ${typF}${unit})`;
      
      specGroups.frequency.items.push({
        label: "그레이스케일 주파수",
        value: value
      });
    }
    
    if (specs.data_clock_frequency) {
      const minF = specs.data_clock_frequency.min !== undefined ? specs.data_clock_frequency.min : '?';
      const maxF = specs.data_clock_frequency.max !== undefined ? specs.data_clock_frequency.max : '?';
      const typF = specs.data_clock_frequency.typ !== undefined ? specs.data_clock_frequency.typ : null;
      const unit = specs.data_clock_frequency.unit || 'Hz';
      
      let value = `${minF}-${maxF}${unit}`;
      if (typF) value += ` (일반: ${typF}${unit})`;
      
      specGroups.frequency.items.push({
        label: "데이터 클럭 주파수",
        value: value
      });
    }
    
    // 인터페이스
    if (specs.transmission_interface) {
      if (specs.transmission_interface.topology) {
        specGroups.interface.items.push({
          label: "전송 인터페이스",
          value: specs.transmission_interface.topology
        });
      }
      
      if (specs.transmission_interface.clock_integrity) {
        specGroups.interface.items.push({
          label: "클럭 무결성",
          value: specs.transmission_interface.clock_integrity
        });
      }
      
      if (specs.transmission_interface.clock_direction) {
        specGroups.interface.items.push({
          label: "클럭 방향",
          value: specs.transmission_interface.clock_direction
        });
      }
      
      if (specs.transmission_interface.bidirectional !== undefined) {
        specGroups.interface.items.push({
          label: "양방향 지원",
          value: specs.transmission_interface.bidirectional ? "지원" : "미지원"
        });
      }
    }
    
    if (specs.communication_interface) {
      if (specs.communication_interface.type) {
        specGroups.interface.items.push({
          label: "통신 인터페이스",
          value: specs.communication_interface.type
        });
      }
      
      if (specs.communication_interface.speed !== undefined) {
        specGroups.interface.items.push({
          label: "통신 속도",
          value: `${specs.communication_interface.speed} MHz`
        });
      }
      
      if (specs.communication_interface.proprietary !== undefined) {
        specGroups.interface.items.push({
          label: "독점 프로토콜",
          value: specs.communication_interface.proprietary ? "독점" : "표준"
        });
      }
    }
    
    // PWM 특성
    if (specs.pwm) {
      if (specs.pwm.resolution) {
        const resolution = Array.isArray(specs.pwm.resolution) 
          ? specs.pwm.resolution.join(', ') 
          : specs.pwm.resolution;
        
        specGroups.interface.items.push({
          label: "PWM 해상도",
          value: resolution
        });
      }
      
      if (specs.pwm.frequency !== undefined) {
        specGroups.interface.items.push({
          label: "PWM 주파수",
          value: `${specs.pwm.frequency} kHz`
        });
      }
    }
    
    // LED 매트릭스
    if (specs.led_matrix) {
      if (specs.led_matrix.max_pixels !== undefined) {
        specGroups.led.items.push({
          label: "최대 RGB LED 픽셀",
          value: specs.led_matrix.max_pixels
        });
      }
      
      if (specs.led_matrix.configuration) {
        specGroups.led.items.push({
          label: "LED 매트릭스 구성",
          value: specs.led_matrix.configuration
        });
      }
    }
    
    const group = specGroups[tabKey as keyof typeof specGroups];
    if (!group || group.items.length === 0) return null;

    return (
      <TooltipProvider>
        <div className="flex flex-col px-4 pb-4 text-sm">
          {group.items.map((item, i) => {
            const tooltipKey = getTooltipKey(item.label);
            const tooltipText = tooltips[tooltipKey as keyof typeof tooltips] || '';
            
            return (
              <React.Fragment key={i}>
                {i > 0 && <Separator className="my-2" />}
                <div className="flex justify-between items-center py-1.5">
                  <div className="flex items-center">
                    <span className="text-gray-600">{item.label}</span>
                    {tooltipText && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="inline-flex ml-1 text-gray-400 hover:text-gray-500">
                            <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="start" className="max-w-xs">
                          <p>{tooltipText}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <span className="text-blue-600 font-medium">{item.value}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </TooltipProvider>
    );
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col lg:flex-row p-0 overflow-hidden">
        {/* 제품명 섹션 */}
        <div className="w-full lg:w-1/3 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="text-blue-600 text-sm font-medium mb-1">
            {product.manufacturers && typeof product.manufacturers === 'object' && 'name' in product.manufacturers
              ? product.manufacturers.name
              : "미상 제조사"}
          </div>
          <CardTitle className="text-lg text-gray-900 font-semibold break-words">
            {product.name}
          </CardTitle>
          {product.part_number && (
            <div className="text-sm text-gray-500 mt-1">
              {product.part_number}
            </div>
          )}
          {product.subtitle && (
            <CardDescription className="mt-2 text-gray-500 break-words">
              {product.subtitle}
            </CardDescription>
          )}

          {/* 액션 버튼 섹션 */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleBookmarkToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={isBookmarkedStatus ? "북마크 제거" : "북마크 추가"}
            >
              <Bookmark 
                className={cn(
                  "w-4 h-4", 
                  isBookmarkedStatus ? "fill-blue-600 text-blue-600" : "text-gray-400"
                )} 
              />
            </button>
            <button
              onClick={handleAddToQuote}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="견적에 추가"
            >
              <ShoppingCart 
                className={cn(
                  "w-4 h-4", 
                  isInQuoteStatus ? "fill-purple-600 text-purple-600" : "text-gray-400"
                )} 
              />
            </button>
            <Link
              href={`/products/led-driver-ic/${product.id}`}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="상세 정보"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* 사양 정보 섹션 */}
        <div className="w-full lg:w-2/3 p-4">
          <div className="flex items-center">
            <ExpandableTabs
              tabs={tabs}
              className="flex-1"
              activeColor="text-blue-600"
              onChange={handleTabChange}
              defaultSelectedIndex={0}
            />
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg">
            {renderTabContent(localActiveTab) || (
              <div className="flex items-center justify-center py-6 text-gray-500">
                <Info className="w-4 h-4 mr-2" />
                <span>관련 정보 없음</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
} 