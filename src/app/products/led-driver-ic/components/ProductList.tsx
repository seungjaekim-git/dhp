'use client'

import React, { useState, useEffect, useMemo, useCallback, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useBookmarkStore } from '@/store/bookmarkStore'
import { useQuoteCartStore } from '@/store/quoteCartStore'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import ProductCard from "./ProductCard"
import ProductFilter from './ProductFilter'
import ProductFilterBadges from './ProductFilterBadges'

interface ProductListProps {
  products: any[];
  filterOptions: any;
}

export default function ProductList({ products, filterOptions }: ProductListProps) {
  const { toast } = useToast()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const { addItem, isInQuote } = useQuoteCartStore();
  const [isPending, startTransition] = useTransition();
  
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [currentItems, setCurrentItems] = useState<any[]>([])
  
  // 정렬 상태
  const [sortOption, setSortOption] = useState<{field: string, direction: 'asc' | 'desc'}>({
    field: 'name',
    direction: 'asc'
  });
  
  // 필터 상태
  const [activeFilters, setActiveFilters] = useState<{
    manufacturers: number[];
    topologies: string[];
    dimmingMethods: string[];
    packageTypes: string[];
    channels: string[];
    inputVoltage: [number, number];
    outputVoltage: [number, number];
    outputCurrent: [number, number];
    switchingFrequency: [number, number];
    operatingTemperature: [number, number];
    hasInternalSwitch: boolean | null;
    hasThermalPad: boolean | null;
    communicationInterfaces: string[];
    pwmResolutions: string[];
  }>({
    manufacturers: [],
    topologies: [],
    dimmingMethods: [],
    packageTypes: [],
    channels: [],
    inputVoltage: [0, 100],
    outputVoltage: [0, 100],
    outputCurrent: [0, 5000],
    switchingFrequency: [0, 2000],
    operatingTemperature: [-40, 125],
    hasInternalSwitch: null,
    hasThermalPad: null,
    communicationInterfaces: [],
    pwmResolutions: [],
  })
  
  // 알림 상태
  const [filterNotice, setFilterNotice] = useState<{show: boolean, count: number}>({
    show: false,
    count: 0
  });

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
      }));
    }

    if (filterOptions?.current) {
      setActiveFilters(prev => ({
        ...prev,
        outputCurrent: [
          filterOptions.current.output?.min || 0,
          filterOptions.current.output?.max || 5000
        ]
      }));
    }

    if (filterOptions?.frequency) {
      setActiveFilters(prev => ({
        ...prev,
        switchingFrequency: [
          filterOptions.frequency.switching?.min || 0,
          filterOptions.frequency.switching?.max || 2000
        ]
      }));
    }

    if (filterOptions?.temperature) {
      setActiveFilters(prev => ({
        ...prev,
        operatingTemperature: [
          filterOptions.temperature.operating?.min || -40,
          filterOptions.temperature.operating?.max || 125
        ]
      }));
    }

    // filterOptions.packageTypes가 없으면 products에서 추출
    if (!filterOptions.packageTypes && products.length > 0) {
      const packageTypes = Array.from(
        new Set(
          products
            .filter(p => p.specifications?.package_type)
            .map(p => p.specifications.package_type)
        )
      );
      filterOptions.packageTypes = packageTypes;
    }
    
    // PWM 해상도 추출
    if (!filterOptions.pwmResolutions && products.length > 0) {
      const resolutions = products
        .filter(p => p.specifications?.pwm?.resolution)
        .flatMap(p => {
          const res = p.specifications.pwm.resolution;
          return Array.isArray(res) ? res : [res];
        })
        .filter(Boolean);
      
      filterOptions.pwmResolutions = Array.from(new Set(resolutions));
    }
  }, [filterOptions, products])

  // 필터 적용 개수 계산
  const filterCounts = useMemo<{
    manufacturers: number;
    topologies: number;
    dimmingMethods: number;
    packageTypes: number;
    channels: number;
    voltages: number;
    currents: number;
    frequencies: number;
    temperatures: number;
    internalSwitch: number;
    thermalPad: number;
    communicationInterfaces: number;
    pwmResolutions: number;
    total: number;
  }>(() => {
    return {
      manufacturers: activeFilters.manufacturers.length,
      topologies: activeFilters.topologies.length,
      dimmingMethods: activeFilters.dimmingMethods.length,
      packageTypes: activeFilters.packageTypes.length,
      channels: activeFilters.channels.length,
      voltages: (
        activeFilters.inputVoltage[0] > (filterOptions?.voltage?.input?.min || 0) ||
        activeFilters.inputVoltage[1] < (filterOptions?.voltage?.input?.max || 100) ||
        activeFilters.outputVoltage[0] > (filterOptions?.voltage?.output?.min || 0) ||
        activeFilters.outputVoltage[1] < (filterOptions?.voltage?.output?.max || 100)
      ) ? 1 : 0,
      currents: (
        activeFilters.outputCurrent[0] > (filterOptions?.current?.output?.min || 0) ||
        activeFilters.outputCurrent[1] < (filterOptions?.current?.output?.max || 5000)
      ) ? 1 : 0,
      frequencies: (
        activeFilters.switchingFrequency[0] > (filterOptions?.frequency?.switching?.min || 0) ||
        activeFilters.switchingFrequency[1] < (filterOptions?.frequency?.switching?.max || 2000)
      ) ? 1 : 0,
      temperatures: (
        activeFilters.operatingTemperature[0] > (filterOptions?.temperature?.operating?.min || -40) ||
        activeFilters.operatingTemperature[1] < (filterOptions?.temperature?.operating?.max || 125)
      ) ? 1 : 0,
      internalSwitch: activeFilters.hasInternalSwitch !== null ? 1 : 0,
      thermalPad: activeFilters.hasThermalPad !== null ? 1 : 0,
      communicationInterfaces: activeFilters.communicationInterfaces.length,
      pwmResolutions: activeFilters.pwmResolutions.length,
      total: 0 // 아래에서 계산
    };
  }, [
    activeFilters, 
    filterOptions?.voltage?.input, 
    filterOptions?.voltage?.output,
    filterOptions?.current?.output,
    filterOptions?.frequency?.switching,
    filterOptions?.temperature?.operating
  ]);

  // 총 필터 개수 계산
  useEffect(() => {
    (filterCounts as any).total = 
      filterCounts.manufacturers + 
      filterCounts.topologies + 
      filterCounts.dimmingMethods + 
      filterCounts.packageTypes + 
      filterCounts.channels +
      filterCounts.voltages +
      filterCounts.currents +
      filterCounts.frequencies +
      filterCounts.temperatures +
      filterCounts.internalSwitch +
      filterCounts.thermalPad +
      filterCounts.communicationInterfaces +
      filterCounts.pwmResolutions;
  }, [filterCounts]);

  // 제품 정렬 함수
  const sortProducts = useCallback((products: any[], option: {field: string, direction: 'asc' | 'desc'}) => {
    return [...products].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      // 정렬 필드에 따라 값 추출
      switch (option.field) {
        case 'name':
          valueA = a.name || '';
          valueB = b.name || '';
          break;
        case 'manufacturer':
          valueA = a.manufacturers?.name || '';
          valueB = b.manufacturers?.name || '';
          break;
        case 'channels':
          valueA = a.specifications?.channels || 0;
          valueB = b.specifications?.channels || 0;
          break;
        case 'voltage':
          valueA = a.specifications?.input_voltage?.max || 0;
          valueB = b.specifications?.input_voltage?.max || 0;
          break;
        default:
          valueA = a.name || '';
          valueB = b.name || '';
      }

      // 오름차순/내림차순에 따라 비교
      if (option.direction === 'asc') {
        return typeof valueA === 'string' ? valueA.localeCompare(valueB) : valueA - valueB;
      } else {
        return typeof valueA === 'string' ? valueB.localeCompare(valueA) : valueB - valueA;
      }
    });
  }, []);

  // Filter products when search or filters change
  const applyFilters = useCallback(() => {
    startTransition(() => {
      let results = [...products]
      const originalCount = results.length;
      
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
      
      // 입력 전압 필터링 (최대값 기준)
      if (activeFilters.inputVoltage[0] > (filterOptions?.voltage?.input?.min || 0) || 
          activeFilters.inputVoltage[1] < (filterOptions?.voltage?.input?.max || 100)) {
        results = results.filter(product => {
          if (product.specifications?.input_voltage?.max !== undefined) {
            const maxVoltage = product.specifications.input_voltage.max;
            // 최대값이 필터 범위 내에 있는지 확인
            return maxVoltage >= activeFilters.inputVoltage[0] && 
                   maxVoltage <= activeFilters.inputVoltage[1];
            }
          return false; // 입력 전압 정보가 없으면 필터링에서 제외
        });
      }
      
      // 출력 전압 필터링 (최대값 기준)
      if (activeFilters.outputVoltage[0] > (filterOptions?.voltage?.output?.min || 0) || 
          activeFilters.outputVoltage[1] < (filterOptions?.voltage?.output?.max || 100)) {
        results = results.filter(product => {
          if (product.specifications?.output_voltage?.max !== undefined) {
            const maxVoltage = product.specifications.output_voltage.max;
            // 최대값이 필터 범위 내에 있는지 확인
            return maxVoltage >= activeFilters.outputVoltage[0] && 
                   maxVoltage <= activeFilters.outputVoltage[1];
          }
          return false; // 출력 전압 정보가 없으면 필터링에서 제외
        });
      }
      
      // 출력 전류 필터링 (최대값 기준)
      if (activeFilters.outputCurrent[0] > (filterOptions?.current?.output?.min || 0) || 
          activeFilters.outputCurrent[1] < (filterOptions?.current?.output?.max || 5000)) {
        results = results.filter(product => {
          if (product.specifications?.output_current?.max !== undefined) {
            const maxCurrent = product.specifications.output_current.max;
            // 최대값이 필터 범위 내에 있는지 확인
            return maxCurrent >= activeFilters.outputCurrent[0] && 
                   maxCurrent <= activeFilters.outputCurrent[1];
          }
          return false; // 출력 전류 정보가 없으면 필터링에서 제외
        });
      }
      
      // 스위칭 주파수 필터링 (최대값 기준)
      if (activeFilters.switchingFrequency[0] > (filterOptions?.frequency?.switching?.min || 0) || 
          activeFilters.switchingFrequency[1] < (filterOptions?.frequency?.switching?.max || 2000)) {
        results = results.filter(product => {
          if (product.specifications?.switching_frequency?.max !== undefined) {
            const maxFreq = product.specifications.switching_frequency.max;
            // 최대값이 필터 범위 내에 있는지 확인
            return maxFreq >= activeFilters.switchingFrequency[0] && 
                   maxFreq <= activeFilters.switchingFrequency[1];
          }
          return false; // 스위칭 주파수 정보가 없으면 필터링에서 제외
        });
      }
      
      // 동작 온도 범위 필터링
      if (activeFilters.operatingTemperature[0] > (filterOptions?.temperature?.operating?.min || -40) || 
          activeFilters.operatingTemperature[1] < (filterOptions?.temperature?.operating?.max || 125)) {
        results = results.filter(product => {
          if (product.specifications?.operating_temperature) {
            const min = product.specifications.operating_temperature.min;
            const max = product.specifications.operating_temperature.max;
            
            if (min !== undefined && max !== undefined) {
              // 온도 범위가 필터 범위와 겹치는지 확인
              return max >= activeFilters.operatingTemperature[0] && 
                     min <= activeFilters.operatingTemperature[1];
            }
          }
          return false; // 동작 온도 정보가 없으면 필터링에서 제외
        });
      }
      
      // 내부 스위치 필터링
      if (activeFilters.hasInternalSwitch !== null) {
        results = results.filter(product =>
          product.specifications?.internal_switch === activeFilters.hasInternalSwitch
        )
      }
      
      // Thermal Pad 필터링
      if (activeFilters.hasThermalPad !== null) {
        results = results.filter(product =>
          product.specifications?.thermal_pad === activeFilters.hasThermalPad
        )
      }
      
      // 통신 인터페이스 필터링
      if (activeFilters.communicationInterfaces.length > 0) {
        results = results.filter(product => {
          if (!product.specifications?.communication_interface?.type) return false
          
          if (Array.isArray(product.specifications.communication_interface.type)) {
            return product.specifications.communication_interface.type.some((t: string) => 
              activeFilters.communicationInterfaces.includes(t)
            )
          }
          
          return activeFilters.communicationInterfaces.includes(product.specifications.communication_interface.type)
        })
      }
      
      // PWM 해상도 필터링
      if (activeFilters.pwmResolutions.length > 0) {
        results = results.filter(product => {
          if (!product.specifications?.pwm?.resolution) return false
          
          if (Array.isArray(product.specifications.pwm.resolution)) {
            return product.specifications.pwm.resolution.some((r: string) => 
              activeFilters.pwmResolutions.includes(r)
            )
          }
          
          return activeFilters.pwmResolutions.includes(product.specifications.pwm.resolution)
        })
      }
      
      // 필터링 결과가 변경되었으면 알림
      if (results.length !== originalCount) {
        setFilterNotice({
          show: true,
          count: results.length
        });
        
        // 3초 후 알림 숨김
        setTimeout(() => {
          setFilterNotice(prev => ({...prev, show: false}));
        }, 3000);
      }
      
      // 정렬 적용
      results = sortProducts(results, sortOption);
      
      // 결과 저장
      setFilteredProducts(results);

      // 페이지네이션 업데이트
      const total = Math.ceil(results.length / itemsPerPage);
      setTotalPages(total);
      
      // 현재 페이지가 총 페이지 수보다 크면 첫 페이지로 리셋
      if (currentPage > total && total > 0) {
        setCurrentPage(1);
      }
    });
  }, [
    products, 
    searchQuery, 
    activeFilters, 
    sortOption, 
    sortProducts, 
    itemsPerPage, 
    currentPage,
    filterOptions
  ]);

  // 필터 변경 시 필터 적용 (버튼 클릭으로 변경되어 자동 적용 X)
  const handleFilterChange = useCallback((filterType: string, value: any) => {
    setActiveFilters(prev => {
      // 배열 필터인 경우
      if (Array.isArray(prev[filterType]) && !Array.isArray(value)) {
        // 체크박스 토글 형식 (추가/제거)
        const array = prev[filterType] as any[];
        return {
          ...prev,
          [filterType]: array.includes(value)
            ? array.filter(item => item !== value)
            : [...array, value]
        };
      }
      // 그 외의 경우 직접 값 설정
      return {
        ...prev,
        [filterType]: value
      };
    });
  }, []);

  // 필터 초기화
  const resetFilters = useCallback(() => {
    setActiveFilters({
      manufacturers: [],
      topologies: [],
      dimmingMethods: [],
      packageTypes: [],
      channels: [],
      inputVoltage: [
        filterOptions?.voltage?.input?.min || 0, 
        filterOptions?.voltage?.input?.max || 100
      ],
      outputVoltage: [
        filterOptions?.voltage?.output?.min || 0, 
        filterOptions?.voltage?.output?.max || 100
      ],
      outputCurrent: [
        filterOptions?.current?.output?.min || 0, 
        filterOptions?.current?.output?.max || 5000
      ],
      switchingFrequency: [
        filterOptions?.frequency?.switching?.min || 0, 
        filterOptions?.frequency?.switching?.max || 2000
      ],
      operatingTemperature: [
        filterOptions?.temperature?.operating?.min || -40, 
        filterOptions?.temperature?.operating?.max || 125
      ],
      hasInternalSwitch: null,
      hasThermalPad: null,
      communicationInterfaces: [],
      pwmResolutions: [],
    });
    
    // 필터 초기화 후 필터 적용
    setTimeout(() => applyFilters(), 0);
  }, [filterOptions, applyFilters]);

  // 전압 필터 초기화
  const resetVoltageFilters = useCallback(() => {
    setActiveFilters(prev => ({
      ...prev,
      inputVoltage: [
        filterOptions?.voltage?.input?.min || 0, 
        filterOptions?.voltage?.input?.max || 100
      ],
      outputVoltage: [
        filterOptions?.voltage?.output?.min || 0, 
        filterOptions?.voltage?.output?.max || 100
      ]
    }));
  }, [filterOptions?.voltage?.input, filterOptions?.voltage?.output]);

  // 정렬 변경 핸들러
  const handleSortChange = useCallback((field: string) => {
    setSortOption(prev => {
      if (prev.field === field) {
        // 같은 필드면 방향만 전환
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      
      // 다른 필드면 해당 필드로 오름차순 정렬
      return {
        field,
        direction: 'asc'
      };
    });
    
    // 정렬 변경 시 필터 적용
    setTimeout(() => applyFilters(), 0);
  }, [applyFilters]);

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로
  }, []);

  // 검색어 변경 시 필터 적용 (즉시)
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, applyFilters]);

  // 페이지 변경 시 아이템 슬라이싱
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  // 초기 필터 적용
  useEffect(() => {
    applyFilters();
  }, [sortOption, applyFilters]);

  // 상품 즐겨찾기 핸들러
  const handleProductBookmark = useCallback((productId: number) => {
    if (isBookmarked(productId)) {
      removeBookmark(productId);
      toast({
        title: "북마크 제거",
        description: "제품이 북마크에서 제거되었습니다.",
        variant: "default",
      });
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        addBookmark({
          id: product.id,
          name: product.name,
          subtitle: product.subtitle || '',
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
    }
  }, [products, addBookmark, removeBookmark, isBookmarked, toast]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 영역 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색 입력창 */}
        <div className="relative flex-1">
          <Input
            placeholder="제품명, 제조사 또는 파트 번호로 검색..." 
            className="pl-10 h-12 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              onClick={() => {
                setSearchQuery('');
                applyFilters();
              }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* 필터 컴포넌트 */}
        <ProductFilter 
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          filterCounts={filterCounts}
          sortOption={sortOption}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onResetFilters={resetFilters}
        />
      </div>

      {/* 필터 뱃지 (활성화된 필터 표시) */}
      <ProductFilterBadges 
        activeFilters={activeFilters}
        filterOptions={filterOptions}
        filterCounts={filterCounts}
        onFilterChange={handleFilterChange}
        onResetVoltageFilters={resetVoltageFilters}
      />

      {/* 검색 결과 카운트 및 필터 알림 */}
      <div className="flex items-center justify-between">
        <div className="text-white">
          총 <span className="font-semibold text-blue-400">{filteredProducts.length}</span>개 제품
        </div>
          </div>
          
      {/* 필터링 적용 버튼 */}
      {filterCounts.total > 0 && (
        <div className="flex justify-end mt-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={applyFilters}
          >
            필터링 적용하기
          </Button>
        </div>
      )}
      
      {/* 필터링 알림 */}
      {filterNotice.show && (
        <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 p-2 rounded-md text-sm">
          필터 적용 결과: {filterNotice.count}개 제품
        </div>
      )}
      
      {/* 제품 목록 */}
      <div className="space-y-6">
            {currentItems.length > 0 ? (
          currentItems.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))
            ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 text-center">
            <Search className="w-12 h-12 mb-4 text-gray-600" />
            <h3 className="text-xl font-medium mb-2">검색 결과가 없습니다</h3>
            <p className="max-w-md text-gray-500">
              다른 검색어를 입력하거나 필터 조건을 변경해보세요.
            </p>
            {filterCounts.total > 0 && (
              <Button
                variant="outline"
                className="mt-4 border-gray-700 text-gray-300 hover:text-white"
                onClick={resetFilters}
              >
                필터 초기화
              </Button>
            )}
          </div>
        )}
        </div>
        
        {/* 페이지네이션 */}
        {totalPages > 1 && (
        <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={cn(
                  currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              
            {/* 페이지 링크 */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // 표시할 페이지 번호를 계산 (현재 페이지 기준으로 -2 ~ +2 범위로)
              let pageNum: number;
              
              if (totalPages <= 5) {
                // 총 페이지가 5개 이하면 순차적으로 표시
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                // 앞부분이면 1~5까지 표시
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                // 뒷부분이면 마지막 5개 표시
                pageNum = totalPages - 4 + index;
              } else {
                // 중간이면 현재 페이지 기준 +-2 표시
                pageNum = currentPage - 2 + index;
              }
              
                  return (
                <PaginationItem key={pageNum}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                      handlePageChange(pageNum);
                        }}
                    isActive={currentPage === pageNum}
                      >
                    {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
            })}
            
            {/* 이후 페이지가 많이 있으면 생략 표시 */}
            {currentPage < totalPages - 2 && totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
                    </PaginationItem>
            )}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={cn(
                  currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
    </div>
  )
} 