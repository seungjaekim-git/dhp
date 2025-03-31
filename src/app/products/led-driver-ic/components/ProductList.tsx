'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/hooks/use-toast'
import { useBookmarkStore } from '@/store/bookmarkStore'
import { useQuoteCartStore } from '@/store/quoteCartStore'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Search, SlidersHorizontal, X, Bookmark, ShoppingCart, ExternalLink, List } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChevronDown,
  ChevronRight,
  Info,
  Cpu,
  Zap,
  Settings,
  Box,
  Clock,
  RadioTower,
  Grid,
  Terminal
} from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ProductCard from "./ProductCard"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

interface ProductListProps {
  products: any[];
  filterOptions: any;
}

export default function ProductList({ products, filterOptions }: ProductListProps) {
  const { toast } = useToast()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const { addItem, isInQuote } = useQuoteCartStore();
  
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [currentItems, setCurrentItems] = useState<any[]>([])
  
  const [activeFilters, setActiveFilters] = useState<{
    manufacturers: number[];
    topologies: string[];
    dimmingMethods: string[];
    packageTypes: string[];
    channels: string[];
    inputVoltage: [number, number];
    outputVoltage: [number, number];
    hasInternalSwitch: boolean | null;
  }>({
    manufacturers: [],
    topologies: [],
    dimmingMethods: [],
    packageTypes: [],
    channels: [],
    inputVoltage: [0, 100],
    outputVoltage: [0, 100],
    hasInternalSwitch: null,
  })

  const [activeTab, setActiveTab] = useState("basics");
  const [cardTabs, setCardTabs] = useState<{ [key: string]: string }>({});

  const tabs = [
    { title: "기본 정보", icon: Info },
    { title: "전력 특성", icon: Zap },
    { title: "성능 특성", icon: Cpu },
    { title: "물리적 특성", icon: Box },
    { title: "주파수 특성", icon: Clock },
    { title: "인터페이스", icon: Terminal },
    { title: "LED 매트릭스", icon: Grid }
  ];

  // 북마크 토글 핸들러
  const handleBookmarkToggle = (product: any) => {
    const isBookmarkedStatus = product.id ? isBookmarked(product.id) : false;
    
    if (isBookmarkedStatus) {
      removeBookmark(product.id);
      toast({
        title: "북마크 제거",
        description: `${product.name} 북마크가 제거되었습니다.`,
        variant: "default",
        duration: 3000,
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
        description: `${product.name} 북마크에 추가되었습니다.`,
        variant: "default",
        duration: 3000,
      });
    }
  };

  // 견적 추가 핸들러
  const handleAddToQuote = (product: any) => {
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
      description: `${product.name} 견적에 추가되었습니다.`,
      variant: "default",
      duration: 3000,
    });
  };

  // Initialize voltage ranges from filter options if available
  useEffect(() => {
    if (filterOptions?.voltage) {
      setActiveFilters(prev => ({
        ...prev,
        inputVoltage: [
          filterOptions.voltage.input?.min || 0,
          filterOptions.voltage.input?.max || 100
        ],
        outputVoltage: [
          filterOptions.voltage.output?.min || 0,
          filterOptions.voltage.output?.max || 100
        ]
      }))
    }
  }, [filterOptions])

  // Filter products when search or filters change
  useEffect(() => {
    let results = [...products]
    
    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(product => 
        product.name?.toLowerCase().includes(query) ||
        product.subtitle?.toLowerCase().includes(query) ||
        product.part_number?.toLowerCase().includes(query) ||
        (product.manufacturers && typeof product.manufacturers === 'object' && 
         'name' in product.manufacturers && 
         product.manufacturers.name?.toLowerCase().includes(query))
      )
    }
    
    // 제조사 필터링
    if (activeFilters.manufacturers.length > 0) {
      results = results.filter(product => 
        activeFilters.manufacturers.includes(product.manufacturer_id)
      )
    }
    
    // 토폴로지 필터링
    if (activeFilters.topologies.length > 0) {
      results = results.filter(product => {
        if (!product.specifications?.topology) return false
        
        if (Array.isArray(product.specifications.topology)) {
          return product.specifications.topology.some((t: string) => 
            activeFilters.topologies.includes(t)
          )
        }
        
        return activeFilters.topologies.includes(product.specifications.topology)
      })
    }
    
    // 디밍 방식 필터링
    if (activeFilters.dimmingMethods.length > 0) {
      results = results.filter(product => {
        if (!product.specifications?.dimming_method) return false
        
        if (Array.isArray(product.specifications.dimming_method)) {
          return product.specifications.dimming_method.some((d: string) => 
            activeFilters.dimmingMethods.includes(d)
          )
        }
        
        return activeFilters.dimmingMethods.includes(product.specifications.dimming_method)
      })
    }
    
    // 패키지 타입 필터링
    if (activeFilters.packageTypes.length > 0) {
      results = results.filter(product =>
        activeFilters.packageTypes.includes(product.specifications?.package_type)
      )
    }
    
    // 채널 필터링
    if (activeFilters.channels.length > 0) {
      results = results.filter(product =>
        activeFilters.channels.includes(String(product.specifications?.channels))
      )
    }
    
    // 전압 범위 필터링
    results = results.filter(product => {
      // 입력 전압 필터링
      if (product.specifications?.input_voltage) {
        const min = product.specifications.input_voltage.min
        const max = product.specifications.input_voltage.max
        
        if (min !== undefined && max !== undefined) {
          // 제품 전압 범위가 필터 범위와 겹치는지 확인
          return (
            (min <= activeFilters.inputVoltage[1] && max >= activeFilters.inputVoltage[0])
          )
        }
      }
      
      return true // 입력 전압 정보가 없으면 필터링하지 않음
    })
    
    // 출력 전압 필터링
    results = results.filter(product => {
      if (product.specifications?.output_voltage) {
        const min = product.specifications.output_voltage.min
        const max = product.specifications.output_voltage.max
        
        if (min !== undefined && max !== undefined) {
          return (
            (min <= activeFilters.outputVoltage[1] && max >= activeFilters.outputVoltage[0])
          )
        }
      }
      
      return true // 출력 전압 정보가 없으면 필터링하지 않음
    })
    
    // 내부 스위치 필터링
    if (activeFilters.hasInternalSwitch !== null) {
      results = results.filter(product =>
        product.specifications?.internal_switch === activeFilters.hasInternalSwitch
      )
    }
    
    setFilteredProducts(results)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }, [searchQuery, activeFilters, products])

  // 페이지네이션 처리
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    setTotalPages(totalPages || 1)
    
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const items = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    setCurrentItems(items)
  }, [filteredProducts, currentPage, itemsPerPage])

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 필터 초기화
  const resetFilters = () => {
    setActiveFilters({
      manufacturers: [],
      topologies: [],
      dimmingMethods: [],
      packageTypes: [],
      channels: [],
      inputVoltage: filterOptions?.voltage?.input 
        ? [filterOptions.voltage.input.min || 0, filterOptions.voltage.input.max || 100]
        : [0, 100],
      outputVoltage: filterOptions?.voltage?.output
        ? [filterOptions.voltage.output.min || 0, filterOptions.voltage.output.max || 100] 
        : [0, 100],
      hasInternalSwitch: null,
    })
    setSearchQuery('')
  }

  // 토글 필터
  const toggleFilter = (filterType: keyof typeof activeFilters, value: any) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev }
      
      if (Array.isArray(newFilters[filterType])) {
        const arrayFilter = newFilters[filterType] as any[]
        if (arrayFilter.includes(value)) {
          // 이미 있으면 제거
          newFilters[filterType] = arrayFilter.filter(item => item !== value) as any
        } else {
          // 없으면 추가
          newFilters[filterType] = [...arrayFilter, value] as any
        }
      } else {
        // Boolean 값이나 다른 타입의 필터
        newFilters[filterType] = value as any
      }
      
      return newFilters
    })
  }

  const handleTabChange = (productId: string, tab: string) => {
    setCardTabs(prev => ({
      ...prev,
      [productId]: tab
    }));
  };

  const handleGlobalTabChange = (index: number | null) => {
    if (index !== null) {
      const tabKeys = ["basics", "power", "performance", "physical", "frequency", "interface", "led"];
      setActiveTab(tabKeys[index]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제품명, 제조사, 부품번호 검색..."
            className="bg-white border-gray-200 pl-10 h-12 text-gray-900 placeholder:text-gray-500"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5"
            >
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline" 
            className={cn(
              "gap-2 h-12 px-4",
              showFilters && "bg-blue-50 text-blue-600 border-blue-200"
            )}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">필터</span>
            {Object.values(activeFilters).some(f => 
              Array.isArray(f) ? f.length > 0 : f !== null
            ) && (
              <Badge className="ml-1 bg-blue-100 text-blue-600">
                {(activeFilters.manufacturers.length + 
                 activeFilters.topologies.length + 
                 activeFilters.dimmingMethods.length + 
                 activeFilters.packageTypes.length + 
                 activeFilters.channels.length +
                 (activeFilters.hasInternalSwitch !== null ? 1 : 0)
                )}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={resetFilters}
            variant="ghost" 
            className="h-12 text-gray-500 hover:text-gray-700"
          >
            <span className="hidden sm:inline">초기화</span>
            <X className="h-5 w-5 sm:hidden" />
          </Button>
        </div>
      </div>

      {/* Active filter 표시 */}
      {Object.values(activeFilters).some(f => Array.isArray(f) ? f.length > 0 : f !== null) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.manufacturers.length > 0 && activeFilters.manufacturers.map(id => {
            const manufacturer = filterOptions?.manufacturers?.find((m: any) => m.id === id);
            return manufacturer ? (
              <Badge key={`manufacturer-${id}`} variant="outline" className="bg-gray-50 gap-2 px-3 py-1.5 text-gray-600">
                {manufacturer.name}
                <button onClick={() => toggleFilter('manufacturers', id)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          
          {activeFilters.topologies.length > 0 && activeFilters.topologies.map(topology => (
            <Badge key={`topology-${topology}`} variant="outline" className="bg-gray-50 gap-2 px-3 py-1.5 text-gray-600">
              {topology}
              <button onClick={() => toggleFilter('topologies', topology)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {/* ... 기타 활성 필터들 표시 ... */}
        </div>
      )}

      {/* 필터 패널 */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          <ScrollArea className="h-[300px] pr-4">
            <Accordion type="multiple" className="space-y-2">
              {/* 제조사 필터 */}
              <AccordionItem value="manufacturers" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">제조사</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-1">
                  {filterOptions?.manufacturers?.map((manufacturer: any) => (
                    <div key={manufacturer.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`manufacturer-${manufacturer.id}`}
                        checked={activeFilters.manufacturers.includes(manufacturer.id)}
                        onCheckedChange={() => toggleFilter('manufacturers', manufacturer.id)}
                      />
                      <Label 
                        htmlFor={`manufacturer-${manufacturer.id}`}
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        {manufacturer.name}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* 토폴로지 필터 */}
              <AccordionItem value="topology" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">토폴로지</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-1">
                  {filterOptions?.topologies?.map((topology: string) => (
                    <div key={topology} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`topology-${topology}`}
                        checked={activeFilters.topologies.includes(topology)}
                        onCheckedChange={() => toggleFilter('topologies', topology)}
                      />
                      <Label 
                        htmlFor={`topology-${topology}`}
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        {topology}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* 디밍 방식 필터 */}
              <AccordionItem value="dimming" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">디밍 방식</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-1">
                  {filterOptions?.dimmingMethods?.map((method: string) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dimming-${method}`}
                        checked={activeFilters.dimmingMethods.includes(method)}
                        onCheckedChange={() => toggleFilter('dimmingMethods', method)}
                      />
                      <Label 
                        htmlFor={`dimming-${method}`}
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        {method}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* 전압 필터 */}
              <AccordionItem value="voltage" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">전압</AccordionTrigger>
                <AccordionContent className="space-y-4 pl-1">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-300">
                      입력 전압: {activeFilters.inputVoltage[0]}V - {activeFilters.inputVoltage[1]}V
                    </Label>
                    <Slider
                      value={activeFilters.inputVoltage}
                      min={filterOptions?.voltage?.input?.min || 0}
                      max={filterOptions?.voltage?.input?.max || 100}
                      step={1}
                      onValueChange={(value) => {
                        setActiveFilters(prev => ({...prev, inputVoltage: value as [number, number]}))
                      }}
                      className="py-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-300">
                      출력 전압: {activeFilters.outputVoltage[0]}V - {activeFilters.outputVoltage[1]}V
                    </Label>
                    <Slider
                      value={activeFilters.outputVoltage}
                      min={filterOptions?.voltage?.output?.min || 0}
                      max={filterOptions?.voltage?.output?.max || 100}
                      step={1}
                      onValueChange={(value) => {
                        setActiveFilters(prev => ({...prev, outputVoltage: value as [number, number]}))
                      }}
                      className="py-2"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 채널 필터 */}
              <AccordionItem value="channels" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">채널</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-1">
                  {filterOptions?.channels?.map((channel: string) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`channel-${channel}`}
                        checked={activeFilters.channels.includes(channel)}
                        onCheckedChange={() => toggleFilter('channels', channel)}
                      />
                      <Label 
                        htmlFor={`channel-${channel}`}
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        {channel}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* 내부 스위치 필터 */}
              <AccordionItem value="internalSwitch" className="border-gray-800">
                <AccordionTrigger className="hover:no-underline py-2">내부 스위치</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="internal-switch-yes"
                      checked={activeFilters.hasInternalSwitch === true}
                      onCheckedChange={() => toggleFilter(
                        'hasInternalSwitch', 
                        activeFilters.hasInternalSwitch === true ? null : true
                      )}
                    />
                    <Label 
                      htmlFor="internal-switch-yes"
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      내장
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="internal-switch-no"
                      checked={activeFilters.hasInternalSwitch === false}
                      onCheckedChange={() => toggleFilter(
                        'hasInternalSwitch', 
                        activeFilters.hasInternalSwitch === false ? null : false
                      )}
                    />
                    <Label 
                      htmlFor="internal-switch-no"
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      외장
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
      )}

      {/* 제품 목록 및 페이지네이션 */}
      <div>
        <p className="text-gray-600 mb-4">총 {filteredProducts.length}개 제품</p>
        
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <ExpandableTabs
              tabs={tabs}
              className="flex-1"
              activeColor="text-blue-600"
              onChange={handleGlobalTabChange}
            />
          </div>
          
          <div className="grid gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  activeTab={activeTab}
                  onTabChange={handleGlobalTabChange}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg bg-white">
                검색 조건에 맞는 제품이 없습니다
              </div>
            )}
          </div>
        </div>
        
        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "text-gray-600 hover:text-gray-900"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={page === currentPage}
                        className="text-gray-600 hover:text-gray-900 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                if (
                  (page === 2 && currentPage > 3) || 
                  (page === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationEllipsis className="text-gray-500" />
                    </PaginationItem>
                  );
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "text-gray-600 hover:text-gray-900"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
} 