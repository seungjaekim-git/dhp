'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bookmark, ShoppingCart, Badge, ExternalLink
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
} from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import ProductTabs from './ProductTabs'

interface ProductCardProps {
  product: any;
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

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const { addItem, isInQuote } = useQuoteCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const isBookmarkedStatus = product.id ? isBookmarked(product.id) : false;
  const isInQuoteStatus = product.id ? isInQuote(product.id) : false;
  
  const handleBookmarkToggle = () => {
    if (isBookmarkedStatus) {
      removeBookmark(product.id);
      toast({
        title: "북마크 제거",
        description: "제품이 북마크에서 제거되었습니다.",
        variant: "default",
      });
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
      toast({
        title: "북마크 추가",
        description: "제품이 북마크에 추가되었습니다.",
        variant: "default",
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
    toast({
      title: "견적 추가",
      description: "제품이 견적 목록에 추가되었습니다.",
      variant: "default",
    });
  };

  return (
    <div 
      className={cn(
        "group bg-gray-900/70 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300",
        isHovered && "bg-gray-900/90 border-gray-700"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row">
        {/* 제품 정보 영역 */}
        <div className="w-full lg:w-2/5 xl:w-1/3 p-4 border-b lg:border-b-0 lg:border-r border-gray-800">
          <div className="flex flex-col h-full">
            {/* 제조사 및 패키지 정보 */}
            <div className="flex items-center text-sm text-gray-400 mb-1">
            {product.manufacturers && typeof product.manufacturers === 'object' && 'name' in product.manufacturers
              ? product.manufacturers.name
              : "미상 제조사"}
              {product.specifications?.package_type && (
                <Badge className="ml-2 bg-gray-800 text-gray-300 border-none text-xs font-normal">
                  {product.specifications.package_type}
                </Badge>
              )}
          </div>
            
            {/* 제품명 및 채널 정보 */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg text-white font-semibold break-words line-clamp-2">
            {product.name}
              </h3>
              {product.specifications?.channels && (
                <Badge className="bg-blue-500/20 text-blue-400 border-none text-xs shrink-0">
                  {product.specifications.channels} 채널
                </Badge>
              )}
            </div>
            
            {/* 부제목 또는 파트 번호 */}
            <p className="text-sm text-gray-400 mb-3">
              {product.subtitle || product.part_number || ''}
            </p>

            {/* 주요 스펙 하이라이트 */}
            {product.specifications && (
              <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-t border-gray-800 pt-3">
                {/* 전압 정보 */}
                {product.specifications.input_voltage && product.specifications.input_voltage.max && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-1">입력:</span>
                    <span className="text-gray-300">~{product.specifications.input_voltage.max}{product.specifications.input_voltage.unit || 'V'}</span>
                  </div>
                )}
                
                {/* 출력 전압 정보 */}
                {product.specifications.output_voltage && product.specifications.output_voltage.max && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-1">출력:</span>
                    <span className="text-gray-300">~{product.specifications.output_voltage.max}{product.specifications.output_voltage.unit || 'V'}</span>
                  </div>
                )}
                
                {/* 패키지 정보 */}
                {product.specifications.package_type && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-1">패키지:</span>
                    <span className="text-gray-300">{product.specifications.package_type}</span>
                  </div>
                )}
                
                {/* 디밍 방식 */}
                {product.specifications.dimming_method && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-1">디밍:</span>
                    <span className="text-gray-300">
                      {Array.isArray(product.specifications.dimming_method) 
                        ? product.specifications.dimming_method[0]
                        : product.specifications.dimming_method}
                    </span>
            </div>
          )}
              </div>
            )}
            
            {/* 액션 버튼 영역 */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
              {/* 북마크 버튼 */}
              <Button
                variant="ghost"
                size="icon"
              onClick={handleBookmarkToggle}
                className={cn(
                  "rounded-full w-9 h-9 bg-gray-800 border border-gray-700",
                  isBookmarkedStatus ? "text-yellow-400 hover:text-yellow-500" : "text-gray-400 hover:text-white"
                )}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarkedStatus ? "currentColor" : "none"} />
              </Button>
              
              {/* 견적 추가 버튼 */}
              <Button
                variant="ghost"
                size="icon"
              onClick={handleAddToQuote}
                className={cn(
                  "rounded-full w-9 h-9 bg-gray-800 border border-gray-700",
                  isInQuoteStatus ? "text-green-400 hover:text-green-500" : "text-gray-400 hover:text-white"
                )}
              >
                <ShoppingCart className="h-5 w-5" fill={isInQuoteStatus ? "currentColor" : "none"} />
              </Button>
              
              {/* 데이터시트 버튼 */}
              {product.datasheet_url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={product.datasheet_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full w-9 h-9 bg-gray-800 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>데이터시트 보기</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>

        {/* 사양 정보 영역 */}
        <div className="w-full lg:w-3/5 xl:w-2/3 p-4">
          {/* 새로운 ProductTabs 컴포넌트 사용 */}
          <ProductTabs specifications={product.specifications} />
        </div>
      </div>
    </div>
  )
} 