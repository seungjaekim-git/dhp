"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { 
  CircleIcon, 
  LayoutGrid, 
  List, 
  Search, 
  SlidersHorizontal, 
  SortAsc,
  ChevronRight, 
  Cpu, 
  Gauge, 
  Laptop, 
  Ruler, 
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { FilterDialog } from "../../components/FilterDialog";
import { generateProductColumns } from "./columns";
import { ProductCard } from "../../components/ProductCard";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductListPage } from "../productListPage";
import { filterProducts, sortProducts, createSearchParamsURL } from "../client-utils";
import { Product, FilterOption } from "../constants";

// 카테고리 아이콘 매핑
const categoryIcons: Record<string, React.ReactNode> = {
  "마이크로컨트롤러": <Cpu className="h-4 w-4 text-blue-400" />,
  "센서": <Gauge className="h-4 w-4 text-green-400" />,
  "통신 모듈": <Laptop className="h-4 w-4 text-purple-400" />,
  "전력 관리": <Zap className="h-4 w-4 text-amber-400" />,
  "메모리": <Ruler className="h-4 w-4 text-red-400" />,
};

interface ProductListClientProps {
  products: Product[];
  categories: FilterOption[];
  manufacturers: FilterOption[];
  applications: FilterOption[];
  initialSearchParams?: { [key: string]: string | string[] };
}

export function ProductListClient({
  products,
  categories,
  manufacturers,
  applications,
  initialSearchParams = {},
}: ProductListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL 검색 매개변수 상태 관리
  const [categoryParam, setCategoryParam] = useState<string[]>([]);
  const [manufacturerParam, setManufacturerParam] = useState<string[]>([]);
  const [applicationParam, setApplicationParam] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<string>("table");
  
  // 필터링된 제품 상태
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // 검색 파라미터에 따라 제품 필터링
  useEffect(() => {
    // 검색 파라미터 추출
    const newCategoryParam = searchParams.getAll("category");
    const newManufacturerParam = searchParams.getAll("manufacturer");
    const newApplicationParam = searchParams.getAll("application");
    const newSearchQuery = searchParams.get("search") || "";
    const newSortOrder = searchParams.get("sort");
    const newViewMode = searchParams.get("view") || "table";
    
    // 상태 업데이트
    setCategoryParam(newCategoryParam);
    setManufacturerParam(newManufacturerParam);
    setApplicationParam(newApplicationParam);
    setSearchQuery(newSearchQuery);
    setSortOrder(newSortOrder);
    setViewMode(newViewMode);
    
    // 제품 필터링
    const filtered = filterProducts(
      products,
      newCategoryParam,
      newManufacturerParam,
      newApplicationParam,
      newSearchQuery
    );
    
    // 정렬 적용
    const sortedProducts = newSortOrder ? sortProducts(filtered, newSortOrder) : filtered;
    
    setFilteredProducts(sortedProducts);
  }, [searchParams, products]);
  
  // URL 파라미터 업데이트 함수
  const updateSearchParams = (params: Record<string, string | string[]>) => {
    const url = createSearchParamsURL(pathname, params);
    router.push(url);
  };
  
  // 필터 옵션 생성
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: category.name,
    count: products.filter(p => p.category === category.id).length,
    icon: categoryIcons[category.name] || <CircleIcon className="h-4 w-4 text-gray-400" />
  }));
  
  const manufacturerOptions = manufacturers.map((manufacturer) => ({
    id: manufacturer.id,
    label: manufacturer.name,
    count: products.filter(p => p.manufacturer_id === manufacturer.id).length,
  }));
  
  const applicationOptions = applications.map((application) => ({
    id: application.id,
    label: application.name,
    count: products.filter(p => 
      p.applications?.includes(application.id)
    ).length,
  }));
  
  // 활성화된 필터 상태
  const activeFilters = {
    category: categoryParam,
    manufacturer: manufacturerParam,
    application: applicationParam
  };
  
  // 필터 설명 생성
  let filterDescription = "";
  
  if (categoryParam.length > 0) {
    const categoryNames = categoryParam.map((id: string) => {
      const category = categories.find(c => c.id === id);
      return category ? category.name : id;
    });
    filterDescription += `${categoryNames.join(", ")} 카테고리의 `;
  }
  
  if (manufacturerParam.length > 0) {
    const manufacturerNames = manufacturerParam.map((id: string) => {
      const manufacturer = manufacturers.find(m => m.id === id);
      return manufacturer ? manufacturer.name : id;
    });
    filterDescription += `${manufacturerNames.join(", ")} 제조사의 `;
  }
  
  if (applicationParam.length > 0) {
    const applicationNames = applicationParam.map((id: string) => {
      const application = applications.find(a => a.id === id);
      return application ? application.name : id;
    });
    filterDescription += `${applicationNames.join(", ")} 응용 분야의 `;
  }
  
  filterDescription += "제품";
  
  // 필터 뱃지 생성
  const filterBadges = [];
  
  if (filteredProducts.length > 0) {
    filterBadges.push(
      <Badge key="count" variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
        {filteredProducts.length}개의 제품
      </Badge>
    );
  }
  
  if (categoryParam.length > 0 || manufacturerParam.length > 0 || applicationParam.length > 0) {
    filterBadges.push(
      <Badge key="filter" variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
        필터 활성화됨
      </Badge>
    );
  }
  
  if (searchQuery) {
    filterBadges.push(
      <Badge key="search" variant="outline" className="bg-amber-500/10 text-amber-300 border-amber-500/20">
        검색: {searchQuery}
      </Badge>
    );
  }
  
  // URL 매개변수를 제거하기 위한 함수
  const removeUrlParam = (paramName: string, paramValue?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (paramValue) {
      // 특정 값만 제거
      const values = params.getAll(paramName);
      params.delete(paramName);
      values.forEach(value => {
        if (value !== paramValue) {
          params.append(paramName, value);
        }
      });
    } else {
      // 매개변수 전체 제거
      params.delete(paramName);
    }
    
    return `/products/list?${params.toString()}`;
  };
  
  return (
    <div className="space-y-6">
      {/* 헤더 영역 */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">제품 목록</h1>
          <p className="text-sm text-gray-400 mt-1">
            {filterDescription}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative w-full lg:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <form action="/products/list" method="GET" className="w-full lg:w-auto">
              {/* 기존 필터 유지 */}
              {categoryParam.map((category) => (
                <input 
                  key={`hidden-category-${category}`} 
                  type="hidden" 
                  name="category" 
                  value={category} 
                />
              ))}
              
              {manufacturerParam.map((manufacturer) => (
                <input 
                  key={`hidden-manufacturer-${manufacturer}`} 
                  type="hidden" 
                  name="manufacturer" 
                  value={manufacturer} 
                />
              ))}
              
              {applicationParam.map((application) => (
                <input 
                  key={`hidden-application-${application}`} 
                  type="hidden" 
                  name="application" 
                  value={application} 
                />
              ))}
              
              {searchQuery && (
                <input 
                  type="hidden" 
                  name="search" 
                  value={searchQuery} 
                />
              )}
              
              <Input
                type="search"
                name="q"
                placeholder="제품 검색..."
                className="pl-8 w-full lg:w-[250px] h-9 bg-gray-900 border-gray-800"
              />
            </form>
          </div>
          
          <FilterDialog
            trigger={
              <Button variant="outline" size="sm" className="w-[5.5rem] border-gray-800 text-gray-300 hover:bg-gray-800">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                필터
                {filterBadges.length > 0 && (
                  <Badge className="ml-2 bg-blue-600 text-white hover:bg-blue-700">{filterBadges.length}</Badge>
                )}
              </Button>
            }
            categories={categoryOptions}
            manufacturers={manufacturerOptions}
            applications={applicationOptions}
            activeFilters={activeFilters}
            defaultTab="category"
          />
          
          {filterBadges.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-800 text-gray-300 hover:bg-gray-800 hidden lg:flex"
                >
                  <Badge className="bg-blue-600 text-white mr-2">{filterBadges.length}</Badge>
                  필터 상태
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gray-900 border-gray-800 text-gray-300">
                <SheetHeader>
                  <SheetTitle className="text-gray-100">현재 적용된 필터</SheetTitle>
                  <SheetDescription className="text-gray-400">
                    제품 목록에 적용된 필터를 확인하고 관리합니다.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {categoryParam.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">카테고리</h4>
                      <div className="flex flex-wrap gap-2">
                        {categoryParam.map((category) => (
                          <Link
                            key={category}
                            href={removeUrlParam('category', category)}
                            className="inline-block"
                          >
                            <Badge 
                              variant="outline" 
                              className="bg-blue-500/10 text-blue-300 border-blue-500/20 gap-1 group cursor-pointer"
                            >
                              {categories.find(c => c.id === category)?.name || category}
                              <span className="opacity-60 group-hover:opacity-100">×</span>
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {manufacturerParam.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">제조사</h4>
                      <div className="flex flex-wrap gap-2">
                        {manufacturerParam.map((manufacturerId) => {
                          const manufacturer = manufacturers.find(m => m.id === manufacturerId);
                          
                          return (
                            <Link
                              key={manufacturerId}
                              href={removeUrlParam('manufacturer', manufacturerId)}
                              className="inline-block"
                            >
                              <Badge 
                                variant="outline" 
                                className="bg-green-500/10 text-green-300 border-green-500/20 gap-1 group cursor-pointer"
                              >
                                {manufacturer?.name || manufacturerId}
                                <span className="opacity-60 group-hover:opacity-100">×</span>
                              </Badge>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {applicationParam.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">응용 분야</h4>
                      <div className="flex flex-wrap gap-2">
                        {applicationParam.map((application) => (
                          <Link
                            key={application}
                            href={removeUrlParam('application', application)}
                            className="inline-block"
                          >
                            <Badge 
                              variant="outline" 
                              className="bg-amber-500/10 text-amber-300 border-amber-500/20 gap-1 group cursor-pointer"
                            >
                              {applications.find(a => a.id === application)?.name || application}
                              <span className="opacity-60 group-hover:opacity-100">×</span>
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">검색어</h4>
                      <Link
                        href={removeUrlParam('q')}
                        className="inline-block"
                      >
                        <Badge 
                          variant="outline" 
                          className="bg-purple-500/10 text-purple-300 border-purple-500/20 gap-1 group cursor-pointer"
                        >
                          {searchQuery}
                          <span className="opacity-60 group-hover:opacity-100">×</span>
                        </Badge>
                      </Link>
                    </div>
                  )}
                </div>
                <SheetFooter className="mt-6 border-t border-gray-800 pt-4">
                  <div className="text-sm text-gray-400">
                    총 {filteredProducts.length}개의 제품이 표시됩니다.
                  </div>
                  <Link 
                    href="/products/list"
                    className="w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-800 text-gray-300 hover:bg-gray-800"
                    >
                      모든 필터 초기화
                    </Button>
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      
      {/* 필터 배지들 (모바일용) */}
      {filterBadges.length > 0 && (
        <div className="flex flex-wrap gap-2 lg:hidden">
          {filterBadges}
        </div>
      )}
      
      {/* 카테고리 빠른 탐색 */}
      <div className="overflow-x-auto scrollbar-hide pb-2">
        <div className="flex space-x-2 min-w-max">
          <Link 
            href="/products/list" 
            className={`px-3 py-1.5 flex items-center gap-2 text-sm rounded-full ${
              !categoryParam || categoryParam.length === 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            } transition-colors`}
          >
            <CircleIcon className="h-3.5 w-3.5" />
            모든 카테고리
          </Link>
          
          {categoryOptions.slice(0, 6).map(option => {
            // 카테고리 선택/해제를 위한 URL 생성
            let newUrl = '';
            
            if (categoryParam && categoryParam.includes(option.id)) {
              // 이미 선택된 경우, 해제하는 URL 생성
              newUrl = removeUrlParam('category', option.id);
            } else {
              // 선택되지 않은 경우, 선택하는 URL 생성
              const params = new URLSearchParams(searchParams.toString());
              params.append('category', option.id);
              newUrl = `/products/list?${params.toString()}`;
            }
            
            return (
              <Link 
                key={option.id} 
                href={newUrl}
                className={`px-3 py-1.5 flex items-center gap-2 text-sm rounded-full ${
                  categoryParam && categoryParam.includes(option.id)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                } transition-colors`}
              >
                {option.icon}
                {option.label}
                <span className="text-xs opacity-70">({option.count})</span>
              </Link>
            );
          })}
          
          {categoryOptions.length > 6 && (
            <FilterDialog 
              trigger={
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-3 py-1.5 h-auto rounded-full bg-gray-800 border-0 hover:bg-gray-700 text-gray-300"
                >
                  더 보기... <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              }
              categories={categoryOptions}
              manufacturers={manufacturerOptions}
              applications={applicationOptions}
              activeFilters={activeFilters}
              defaultTab="category"
            />
          )}
        </div>
      </div>
      
      <Separator className="bg-gray-800" />
      
      <Tabs 
        defaultValue={viewMode || "table"} 
        className="space-y-4"
        onValueChange={(value) => {
          // 뷰 모드 변경 시 URL 업데이트
          const params = new URLSearchParams(searchParams.toString());
          params.set('view', value);
          router.push(`/products/list?${params.toString()}`, { scroll: false });
        }}
      >
        <div className="flex items-center justify-between">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="table" className="data-[state=active]:bg-gray-800">
              <List className="h-4 w-4 mr-2" />
              테이블
            </TabsTrigger>
            <TabsTrigger value="grid" className="data-[state=active]:bg-gray-800">
              <LayoutGrid className="h-4 w-4 mr-2" />
              그리드
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-800 text-gray-300 hover:bg-gray-800"
                >
                  <SortAsc className="mr-2 h-4 w-4" />
                  정렬
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="w-48 bg-gray-900 border-gray-800 text-gray-300"
              >
                {[
                  { id: 'name:asc', label: '이름 오름차순' },
                  { id: 'name:desc', label: '이름 내림차순' },
                  { id: 'manufacturer:asc', label: '제조사 오름차순' },
                  { id: 'category:asc', label: '카테고리 오름차순' },
                ].map(option => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('sort', option.id);
                  
                  return (
                    <Link
                      key={option.id}
                      href={`/products/list?${params.toString()}`}
                      className="w-full"
                    >
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                        <ChevronRight className={`mr-2 h-4 w-4 ${sortOrder === option.id ? 'text-blue-400' : 'opacity-0'}`} />
                        {option.label}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <TabsContent value="table" className="mt-0">
          <ProductListPage
            products={filteredProducts}
            categories={categories}
            manufacturers={manufacturers}
            applications={applications}
          />
        </TabsContent>
        
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-40 border border-dashed border-gray-800 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-400">검색 결과가 없습니다.</p>
                  <p className="text-sm text-gray-500 mt-1">필터를 조정하거나 다른 검색어를 시도해보세요.</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 