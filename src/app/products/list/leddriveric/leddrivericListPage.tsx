'use client';

import { z } from "zod";
import { getData } from "./constants";
import { searchParamsCache } from "./search-params";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { LEDDriverICInfoSchema } from "@/app/supabase/schemas/LEDDriverIC";
import { Card, CardContent } from "@/components/ui/card";

// 분리된 컴포넌트 및 훅 가져오기
import IntroSection from "./components/IntroSection";
import SearchBar from "./components/SearchBar";
import FilterStatus from "./components/FilterStatus";
import { useFilteredData } from "./hooks/useFilteredData";

// 뷰 모드 전환을 위한 컴포넌트 가져오기
import ViewToggle, { ViewMode } from "./components/ViewToggle";
import ProductGrid from "./components/ProductGrid";
import ProductList from "./components/ProductList";
import { useBookmarks, useQuoteCart } from "@/hooks/useClientStore";
import { useCompareItems } from "./hooks/useCompareItems";
import FloatingFilterButton from "./components/FloatingFilterButton";
import CompareDialog from "./components/CompareDialog";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { LEDDriverICFilters } from "./filter";
import ListLayout from "./ListLayout";
import { Cpu } from "lucide-react";
import { PackageX } from "lucide-react";

// Product 스키마 정의 개선 - 타입 에러 해결을 위한 확장된 정의
export type ProductSchema = {
  id: number;
  name: string;
  manufacturer_id: number | null;
  manufacturer: {
    id: number;
    name: string;
    slug?: string;
  };
  part_number: string | null;
  specifications: z.infer<typeof LEDDriverICInfoSchema>;
  tables: any | null;
  description: string | null;
  storage_type_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  subtitle: string;
  category: {
    id: number;
    name: string;
  };
  package_type?: string;
  package_case?: string;
  supply_package?: string;
  images: {
    id: number;
    title: string | null;
    url: string;
    description: string | null;
  }[];
  applications: {
    application: {
      id: number;
      name: string;
    }
  }[];
  certifications: {
    certification: {
      id: number;
      name: string;
    }
  }[];
  categories?: {
    category: {
      id: number;
      name: string;
      description?: string;
      parent_id?: number;
    }
  }[];
  // 필터링에 필요한 추가 필드
  input_voltage_range?: string;
  output_voltage_range?: string;
  output_current_range?: string;
  operating_temperature?: string;
  options?: {
    package_types?: {
      package_type: {
        name: string;
      }
    }[];
    mounting_style?: string;
  }[];
  topologies?: string[];
  dimming_methods?: string[];
};

export default function LEDDriverICListPage() {
  const [search, setSearch] = React.useState<Record<string, any>>({});
  const [data, setData] = React.useState<ProductSchema[]>([]);
  const [filterOptions, setFilterOptions] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  // 뷰 모드 상태 ('list', 'grid')
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [filterState, setFilterState] = React.useState<Record<string, any>>({});
  const [appliedFilterState, setAppliedFilterState] = React.useState<Record<string, any>>({});
  const [itemsPerPage, setItemsPerPage] = React.useState(viewMode === 'grid' ? 12 : 10);

  // compareStore 추가
  const compareStore = useCompareItems();
  const bookmarkStore = useBookmarks();
  const quoteStore = useQuoteCart();

  // URL 매개변수 검색
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsedSearch = searchParamsCache.parse(Object.fromEntries(searchParams));
      setSearch(parsedSearch || {});
      
      // 활성 필터 추적
      setActiveFilters(Object.keys(parsedSearch || {}));
    }
  }, []);

  // 데이터 가져오기
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
      const result = await getData();
        // API 응답을 우리 타입에 맞게 변환
        const transformedProducts = result.products.map((product: any) => {
          // 필요한 필드 추가 및 변환
          const inputVoltageRange = product.specifications?.input_voltage ? 
            JSON.stringify([
              product.specifications.input_voltage.min || 0, 
              product.specifications.input_voltage.max || 0
            ]) : null;
            
          const outputVoltageRange = product.specifications?.output_voltage ? 
            JSON.stringify([
              product.specifications.output_voltage.min || 0, 
              product.specifications.output_voltage.max || 0
            ]) : null;
            
          const outputCurrentRange = product.specifications?.output_current ? 
            JSON.stringify([
              product.specifications.output_current.min || 0, 
              product.specifications.output_current.max || 0
            ]) : null;
            
          const operatingTemperature = product.specifications?.operating_temperature ? 
            JSON.stringify([
              product.specifications.operating_temperature.min || -40, 
              product.specifications.operating_temperature.max || 125
            ]) : null;
            
          return {
            ...product,
            input_voltage_range: inputVoltageRange,
            output_voltage_range: outputVoltageRange,
            output_current_range: outputCurrentRange,
            operating_temperature: operatingTemperature,
            topologies: product.specifications?.topology || [],
            dimming_methods: product.specifications?.dimming_method || [],
            options: [{
              package_types: product.specifications?.package_type ? [{
                package_type: {
                  name: product.specifications.package_type
                }
              }] : [],
              mounting_style: product.specifications?.mounting_type
            }]
          };
        });
        
        setData(transformedProducts as ProductSchema[]);
      setFilterOptions(result.filterOptions);
      } catch (error) {
        console.error("Error fetching LED Driver IC data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 뷰 모드가 변경될 때 itemsPerPage 조정
  React.useEffect(() => {
    if (viewMode === 'grid') {
      setItemsPerPage(12);
    } else if (viewMode === 'list') {
      setItemsPerPage(10);
    }
  }, [viewMode]);

  const categoryFilterFields = React.useMemo(() => {
    return [
      {
        id: 'categories',
        label: '카테고리',
        options: filterOptions.categories?.map((cat: string) => ({
          label: cat,
          value: cat
        })) || []
      },
      {
        id: 'certifications',
        label: '인증',
        options: filterOptions.certifications?.map((cert: string) => ({
          label: cert,
          value: cert
        })) || []
      },
      {
        id: 'applications',
        label: '응용분야',
        options: filterOptions.applications?.map((app: string) => ({
          label: app,
          value: app
        })) || []
      }
    ];
  }, [filterOptions]);

  // 필터링된 데이터 및 필터 통계 가져오기
  const { filteredData, filterStats } = useFilteredData(data, appliedFilterState, searchQuery);

  const searchFilters = React.useMemo(() => {
    return Object.entries(search)
      .map(([key, value]) => ({
        id: key,
        value: value as string,
      }))
      .filter(({ value }) => value != null);
  }, [search]);

  // 필터 제거 함수
  const removeFilter = (filterKey: string) => {
    const newSearch = { ...search };
    delete newSearch[filterKey];
    setSearch(newSearch);
    setActiveFilters(activeFilters.filter(key => key !== filterKey));
    
    // 필터 상태에서도 제거
    const newFilterState = { ...filterState };
    delete newFilterState[filterKey];
    setFilterState(newFilterState);
    setAppliedFilterState(newFilterState);
    
    // URL 업데이트
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams();
      Object.entries(newSearch).forEach(([key, value]) => {
        if (value != null) {
          searchParams.set(key, value.toString());
        }
      });
      
      const queryString = searchParams.toString();
      window.history.replaceState(
        null,
        "",
        queryString ? `?${queryString}` : window.location.pathname
      );
    }
  };

  // 모든 필터 제거
  const clearAllFilters = () => {
    setSearch({});
    setActiveFilters([]);
    setFilterState({});
    setAppliedFilterState({});
    
    // URL 업데이트
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // 뷰 모드 토글
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // 뷰 모드 전환 UI
  const renderViewToggle = () => (
    <ViewToggle
      viewMode={viewMode} 
      onChange={toggleViewMode}
    />
  );

  // 활성 필터 수 계산
  const activeFilterCount = React.useMemo(() => {
    return Object.keys(appliedFilterState).filter(key => {
      const value = appliedFilterState[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== undefined && v !== null);
      }
      return value !== undefined && value !== null && value !== '' && value !== 'all';
    }).length;
  }, [appliedFilterState]);

  // 필터 변경 처리
  const handleFilterChange = (key: string, value: any) => {
    if (value === undefined) {
      // 필터 제거
      const newState = { ...filterState };
      delete newState[key];
      setFilterState(newState);
    } else {
      // 필터 추가 또는 업데이트
      setFilterState({
        ...filterState,
        [key]: value
      });
    }
  };

  // 검색어 적용
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 모바일 필터 패널 표시 여부
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  // 필터 적용 함수
  const applyFilters = React.useCallback(() => {
    // 빈 배열이나 빈 문자열 등 의미없는 필터값은 제거
    const cleanedFilterState = Object.fromEntries(
      Object.entries(filterState).filter(([_, value]) => {
        if (value === undefined || value === null) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'string' && value === '') return false;
        return true;
      })
    );
    
    // 활성 필터 추적 업데이트
    setActiveFilters(Object.keys(cleanedFilterState));
    
    // 적용된 필터 상태 업데이트
    setAppliedFilterState(cleanedFilterState);
    
    // 필터링 로직 업데이트를 위한 강제 리렌더링
    setForceUpdate(prev => !prev);
    
    // URL 쿼리 파라미터 업데이트 (선택사항)
    if (typeof window !== "undefined") {
      // searchParamsCache.stringify 메소드를 구현하거나 다른 방법으로 쿼리 문자열 생성
      const queryParams = new URLSearchParams();
      Object.entries(cleanedFilterState).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.set(key, String(value));
        }
      });
      
      const url = new URL(window.location.href);
      
      if (queryParams.toString()) {
        url.search = queryParams.toString();
      } else {
        url.search = '';
      }
      
      window.history.pushState({}, '', url);
    }
    
    // 모바일에서 필터 패널 닫기
    setShowFilterPanel(false);
  }, [filterState, setShowFilterPanel]);

  // 비교 상품 추가/제거 함수
  const handleToggleCompare = React.useCallback((product: ProductSchema) => {
    const { items, addItem, removeItem } = compareStore;
    const isInCompare = items.some(item => item.id === product.id);
    
    if (isInCompare) {
      removeItem(product.id);
    } else {
      // 최대 4개 제한
      if (items.length >= 4) {
        // 알림 표시 로직 추가
        alert('최대 4개 상품까지 비교 가능합니다.');
        return;
      }
      
      // 추가 시 이벤트 발생
      addItem({
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer?.name || '',
        part_number: product.part_number || '',
        thumbnail: product.images?.[0]?.url || '/placeholder.webp',
        category: product.category?.name || '',
        specifications: product.specifications || {}
      } as any); // specifications 타입 이슈를 해결하기 위해 as any 사용
    }
    
    // 비교 다이얼로그 업데이트를 위한 상태 변경 트리거
    setForceUpdate(prev => !prev);
  }, [compareStore]);

  // 비교 목록 초기화
  const handleClearCompare = React.useCallback(() => {
    compareStore.clearItems();
    
    // 비교 다이얼로그 업데이트를 위한 상태 변경 트리거
    setForceUpdate(prev => !prev);
  }, [compareStore]);
  
  // 비교 다이얼로그 상태 업데이트를 위한 강제 리렌더링 상태
  const [forceUpdate, setForceUpdate] = React.useState(false);

  // 북마크 토글 함수
  const handleToggleBookmark = React.useCallback((product: ProductSchema) => {
    const isBookmarked = bookmarkStore.isBookmarked(product.id);
    
    if (isBookmarked) {
      bookmarkStore.removeBookmark(product.id);
    } else {
      bookmarkStore.addBookmark({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || '',
        manufacturerName: product.manufacturer?.name || '',
        manufacturerId: product.manufacturer?.id || 0,
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || '',
        packageType: product.specifications?.package_type || '',
        category: product.category?.name || '기타'
      });
    }
  }, [bookmarkStore]);

  // 견적함 토글 함수
  const handleToggleQuote = React.useCallback((product: ProductSchema) => {
    const isInQuote = quoteStore.isInQuote(product.id);
    
    if (isInQuote) {
      quoteStore.removeItem(product.id);
    } else {
      quoteStore.addItem({
        id: product.id,
        name: product.name,
        quantity: 1,
        subtitle: product.subtitle || '',
        manufacturerName: product.manufacturer?.name || '',
        manufacturerId: product.manufacturer?.id || 0,
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || '',
        packageType: product.specifications?.package_type || ''
      });
    }
  }, [quoteStore]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-slate-100 animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-3">
          <div className="h-10 w-full bg-slate-100 animate-pulse rounded-md"></div>
          <div className="h-64 w-full bg-slate-100 animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[350px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 소개 섹션 */}
      <IntroSection />
      
      {isLoading ? (
        // 로딩 상태 표시
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <>
          <ListLayout
            title="LED 드라이버 IC"
            icon={<Cpu className="w-6 h-6 text-blue-400" />}
            breadcrumb={[
              { label: "홈", href: "/" },
              { label: "제품", href: "/products" },
              { label: "LED 드라이버 IC" }
            ]}
            description="LED 드라이버 IC는 LED 조명의 효율적이고 안정적인 작동을 위한 핵심 반도체 부품입니다."
            badges={[
              { text: "고효율", bgColor: "bg-blue-100", textColor: "text-blue-800", hoverColor: "hover:bg-blue-200" },
              { text: "저전력", bgColor: "bg-green-100", textColor: "text-green-800", hoverColor: "hover:bg-green-200" },
              { text: "다양한 패키지", bgColor: "bg-purple-100", textColor: "text-purple-800", hoverColor: "hover:bg-purple-200" }
            ]}
            filterState={filterState}
            appliedFilterState={appliedFilterState}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onClearFilters={clearAllFilters}
            activeFilters={activeFilters}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            totalProducts={data.length}
          >
            {/* 결과 요약 및 뷰 전환 */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="text-sm text-muted-foreground">
                {filterStats.filtered} / {filterStats.total} 제품 ({filterStats.percentage}%)
              </div>

              {renderViewToggle()}
              
              {/* 비교 버튼: 비교 항목이 있을 때만 표시 */}
              {compareStore?.items?.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => compareStore?.openCompareDialog()}
                  className="ml-auto"
                >
                  <Scale className="h-4 w-4 mr-1.5" />
                  비교하기 ({compareStore?.items?.length})
                </Button>
              )}
            </div>
            
            {filteredData.length === 0 ? (
              <div className="p-8 text-center border rounded-lg bg-gray-50">
                <PackageX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                <p className="text-muted-foreground mb-4">다른 검색어나 필터 조건을 사용해보세요.</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  모든 필터 초기화
                </Button>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <ProductGrid 
                  products={filteredData} 
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                  isBookmarked={(id) => bookmarkStore.isBookmarked(id)}
                  isInQuote={(id) => quoteStore.isInQuote(id)}
                  isInCompare={(id) => compareStore.items.some(item => item.id === id)}
                  onToggleBookmark={handleToggleBookmark}
                  onToggleQuote={handleToggleQuote}
                  onToggleCompare={handleToggleCompare}
                />
              ) : (
                <ProductList 
                  products={filteredData} 
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={setItemsPerPage}
                  isBookmarked={(id) => bookmarkStore.isBookmarked(id)}
                  isInQuote={(id) => quoteStore.isInQuote(id)}
                  isInCompare={(id) => compareStore.items.some(item => item.id === id)}
                  onToggleBookmark={handleToggleBookmark}
                  onToggleQuote={handleToggleQuote}
                  onToggleCompare={handleToggleCompare}
                />
              )
            )}
          </ListLayout>
            
          {/* 비교 다이얼로그 */}
          {compareStore?.isCompareDialogOpen && (
            <CompareDialog 
              items={compareStore?.items || []} 
              onClear={handleClearCompare}
              onRemoveItem={(id: number) => compareStore?.removeItem(id)}
            />
          )}
            
          {/* 모바일 필터 버튼 */}
          <FloatingFilterButton 
            onToggle={() => setShowFilterPanel(!showFilterPanel)}
            badgeCount={activeFilters.length}
          />
        </>
      )}
    </>
  );
}
