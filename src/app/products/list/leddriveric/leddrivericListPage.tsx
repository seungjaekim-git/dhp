'use client';

import { z } from "zod";
import { getData } from "./constants";
import { DataTable } from "./data-table";
import { searchParamsCache } from "./search-params";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { LEDDriverICInfoSchema } from "@/app/supabase/schemas/LEDDriverIC";
import { useColumns } from "./columns";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, FilterIcon, Search, SlidersHorizontal, Table, List, Grid, Cpu } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Product 스키마 정의 개선 - 타입 에러 해결을 위한 확장된 정의
export type ProductSchema = {
  id: number;
  name: string;
  manufacturer_id: number | null;
  manufacturer: {
    id: number;
    name: string;
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
};

export default function LEDDriverICListPage() {
  const [search, setSearch] = React.useState<Record<string, any>>({});
  const [data, setData] = React.useState<ProductSchema[]>([]);
  const [filterOptions, setFilterOptions] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<'table' | 'list' | 'grid'>('table');

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsedSearch = searchParamsCache.parse(Object.fromEntries(searchParams));
      setSearch(parsedSearch || {});
      
      // Track active filters for animation and display
      setActiveFilters(Object.keys(parsedSearch || {}));
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getData();
        // 타입 안전성을 위해 타입 단언 사용
        setData(result.products as ProductSchema[]);
        setFilterOptions(result.filterOptions);
      } catch (error) {
        console.error("Error fetching LED Driver IC data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const checkFilterCondition = React.useCallback((item: ProductSchema, key: string, value: any) => {
    if (!value) return true;

    const filterConditions: Record<string, () => boolean> = {
      certifications: () => item.certifications?.some(c => c.certification.name === value),
      applications: () => item.applications?.some(a => a.application.name === value),
      categories: () => item.category?.name === value
    };

    return filterConditions[key]?.() ?? true;
  }, []);

  // 문자열 검색을 위한 함수
  const matchesSearchQuery = React.useCallback((item: ProductSchema) => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.subtitle.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.part_number?.toLowerCase().includes(searchLower) ||
      item.manufacturer?.name.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

  const filteredData = React.useMemo(() => {
    return data.filter(item => 
      Object.entries(search).every(([key, value]) => 
        checkFilterCondition(item, key, value)
      ) && matchesSearchQuery(item)
    );
  }, [data, search, checkFilterCondition, matchesSearchQuery]);

  const searchFilters = React.useMemo(() => {
    return Object.entries(search)
      .map(([key, value]) => ({
        id: key,
        value: value as string,
      }))
      .filter(({ value }) => value != null);
  }, [search]);

  // 필터 통계
  const filterStats = React.useMemo(() => {
    return {
      total: data.length,
      filtered: filteredData.length,
      percentage: data.length > 0 ? Math.round((filteredData.length / data.length) * 100) : 0
    };
  }, [data, filteredData]);

  // 필터 제거 함수
  const removeFilter = (filterKey: string) => {
    const newSearch = { ...search };
    delete newSearch[filterKey];
    setSearch(newSearch);
    setActiveFilters(activeFilters.filter(key => key !== filterKey));
    
    // URL 업데이트
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams();
      Object.entries(newSearch).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
      
      const newUrl = `${window.location.pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  // 모든 필터 초기화
  const clearAllFilters = () => {
    setSearch({});
    setActiveFilters([]);
    
    // URL 업데이트
    if (typeof window !== "undefined") {
      const newUrl = window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  // 컬럼 초기화 (조건적 초기화가 아닌, 컴포넌트 시작 시 한 번만 초기화)
  const columns = useColumns(filterOptions);

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* 소개 섹션 추가 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start gap-6">
            <div className="hidden sm:block rounded-xl overflow-hidden bg-gradient-to-tr from-blue-100 to-blue-50 p-3 border border-blue-200/80">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">LED 드라이버 IC</h2>
              <p className="text-gray-600 max-w-3xl text-sm leading-relaxed">
                LED 드라이버 IC는 LED에 전류를 공급하고 제어하는 반도체 소자입니다. 
                효율적인 전력 관리와 밝기 제어 기능을 제공하며, 다양한 응용 분야에서 사용됩니다. 
                아래에서 다양한 제조사의 제품을 비교하고 최적의 솔루션을 찾아보세요.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">고효율</Badge>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100">에너지 절약</Badge>
                <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100">정밀 제어</Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100">다양한 패키지</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 상단 검색 및 뷰 컨트롤 영역 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="제품 이름, 부품 번호, 브랜드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <RadioGroup 
              defaultValue="table" 
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'table' | 'list' | 'grid')}
              className="flex bg-gray-100 p-1 rounded-lg"
            >
              <div className="flex items-center space-x-1">
                <Label 
                  htmlFor="table" 
                  className={`p-2 cursor-pointer rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Table className="h-4 w-4" />
                </Label>
                <RadioGroupItem value="table" id="table" className="sr-only" />
              </div>
              
              <div className="flex items-center space-x-1">
                <Label 
                  htmlFor="list" 
                  className={`p-2 cursor-pointer rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List className="h-4 w-4" />
                </Label>
                <RadioGroupItem value="list" id="list" className="sr-only" />
              </div>
              
              <div className="flex items-center space-x-1">
                <Label 
                  htmlFor="grid" 
                  className={`p-2 cursor-pointer rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid className="h-4 w-4" />
                </Label>
                <RadioGroupItem value="grid" id="grid" className="sr-only" />
              </div>
            </RadioGroup>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 p-2 border-gray-200">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">고급 필터</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => {}}>
                  전압 범위 필터
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  전류 범위 필터
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  출시일 필터
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 필터 통계 및 정보 */}
      <AnimatePresence>
        {(activeFilters.length > 0 || filteredData.length !== data.length) && (
          <motion.div 
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  필터 상태:
                </span>
                <span className="text-sm">
                  {isLoading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    <>
                      전체 <span className="font-bold">{filterStats.total}</span>개 제품 중 
                      <span className="font-bold text-blue-700 mx-1">{filterStats.filtered}</span>개 표시 중
                      (<span className="font-medium">{filterStats.percentage}%</span>)
                    </>
                  )}
                </span>
              </div>
              
              {/* 활성 필터 표시 */}
              <div className="flex flex-wrap gap-2">
                {activeFilters.length > 0 ? (
                  <>
                    {activeFilters.map((filterKey, index) => {
                      const value = search[filterKey];
                      const fieldLabel = categoryFilterFields.find(f => f.id === filterKey)?.label || filterKey;
                      const optionLabel = categoryFilterFields
                        .find(f => f.id === filterKey)?.options
                        .find((o: any) => o.value === value)?.label || value;
                      
                      return (
                        <motion.div
                          key={`${filterKey}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Badge 
                            variant="outline" 
                            className="group bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 px-2 py-1 flex items-center gap-1 cursor-pointer"
                            onClick={() => removeFilter(filterKey)}
                          >
                            <span className="font-normal mr-1">{fieldLabel}:</span>
                            <span className="font-medium">{optionLabel}</span>
                            <span className="w-3.5 h-3.5 rounded-full bg-blue-200 group-hover:bg-blue-300 flex items-center justify-center ml-1">
                              <span className="text-blue-700 text-[8px]">✕</span>
                            </span>
                          </Badge>
                        </motion.div>
                      );
                    })}
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: activeFilters.length * 0.05 }}
                    >
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="h-6 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        모두 지우기
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  searchQuery && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-sm text-gray-500">
                            <InfoIcon className="w-3.5 h-3.5 mr-1" />
                            <span>검색 중: &ldquo;{searchQuery}&rdquo;</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>검색어를 지우려면 검색창을 비우세요</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 데이터 테이블 및 로딩 상태 */}
      {isLoading ? (
        <Card className="rounded-xl overflow-hidden shadow-md border border-gray-100">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-[500px] w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-xl overflow-hidden shadow-md border border-gray-100">
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={filteredData}
              filterFields={categoryFilterFields}
              defaultColumnFilters={searchFilters}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
