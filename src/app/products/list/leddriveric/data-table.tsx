"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge, Filter, Info, X, Copy, FileText, Scale, ArrowRight, ChevronDown, ChevronUp, Heart, ShoppingCart, BarChart2, Bookmark, Star, RefreshCw, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { UnitSelector } from "./columns";
import { TextFilter, SingleSliderFilter, DualSliderFilter, CheckboxFilter, SelectFilter, ComboboxFilter } from "./filter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useBookmarks, useQuoteCart } from "@/hooks/useClientStore";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ProductSchema } from "./leddrivericListPage";
import { motion, AnimatePresence } from "framer-motion";

interface Column<T> {
  key: string;
  header: string;
  subheader?: string;
  filterType?: 'text' | 'single-slider' | 'dual-slider' | 'checkbox' | 'select' | 'combobox';
  filterOptions?: string[];
  render?: (row: T) => React.ReactNode;
  symbol?: React.ReactNode;
  unit?: {
    current: string;
    available: string[];
    onChange: (value: string) => void;
  };
  tooltip?: {
    title: string;
    description: string;
    specs?: Array<{
      label: string;
      value: string;
      unit?: string;
    }>;
    ranges?: {
      min: number;
      max: number;
      unit: string;
    };
  };
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  filterFields?: Array<{
    id: string;
    label: string;
    options: Array<{
      label: string;
      value: string;
    }>
  }>;
  defaultColumnFilters?: Array<{
    id: string;
    value: string;
  }>;
}

type ActionType = 'compare' | 'quote' | 'copy' | null;

export function DataTable<T extends { id: number }>({ 
  data: initialData, 
  columns,
  filterFields = [],
  defaultColumnFilters = []
}: DataTableProps<T>) {
  const router = useRouter();
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, any>>(
    defaultColumnFilters.reduce((acc, filter) => ({ ...acc, [filter.id]: filter.value }), {})
  );
  const [sortConfig, setSortConfig] = useState<{ column: string | null, direction: 'asc' | 'desc' }>({
    column: null,
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const tableRef = useRef<HTMLDivElement>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(columns.map(col => col.key)));
  const resizingRef = useRef<{
    isResizing: boolean;
    columnKey: string | null;
    startX: number;
    startWidth: number;
  }>({
    isResizing: false,
    columnKey: null,
    startX: 0,
    startWidth: 0
  });

  const itemsPerPageOptions = [10, 20, 30, 40, 50, 100];

  const toggleColumnVisibility = (columnKey: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(columnKey)) {
      newVisibleColumns.delete(columnKey);
    } else {
      newVisibleColumns.add(columnKey);
    }
    setVisibleColumns(newVisibleColumns);
  };

  const startResizing = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    const startX = e.pageX;
    const columnWidth = columnWidths[columnKey] || 150;

    resizingRef.current = {
      isResizing: true,
      columnKey,
      startX,
      startWidth: columnWidth
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current.isResizing) return;

    const { columnKey, startX, startWidth } = resizingRef.current;
    if (!columnKey) return;

    const diff = e.pageX - startX;
    const newWidth = Math.max(150, startWidth + diff);

    setColumnWidths(prev => ({
      ...prev,
      [columnKey]: newWidth
    }));
  };

  const stopResizing = () => {
    resizingRef.current.isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    let filteredData = [...initialData];

    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Process filter logic for custom filter types in filterFields
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        // Handle special filter fields
        const filterField = filterFields.find(f => f.id === key);
        if (filterField) {
          filteredData = filteredData.filter(item => {
            // Handle different property structures based on filter type
            if (key === 'applications') {
              return (item as any).applications?.some((a: any) => 
                a.application.name === value
              );
            } else if (key === 'certifications') {
              return (item as any).certifications?.some((c: any) => 
                c.certification.name === value
              );
            } else if (key === 'categories') {
              return (item as any).category?.name === value;
            } else {
              return String((item as any)[key]).toLowerCase() === String(value).toLowerCase();
            }
          });
        } else {
          // Handle regular column filters
          filteredData = filteredData.filter(item => {
            const itemValue = (item as any)[key];
            if (itemValue === null || itemValue === undefined) return false;

            if (Array.isArray(itemValue)) {
              return itemValue.some(v => String(v).toLowerCase().includes(String(value).toLowerCase()));
            }

            return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
          });
        }
      }
    });

    if (sortConfig.column) {
      filteredData.sort((a, b) => {
        const aValue = (a as any)[sortConfig.column!];
        const bValue = (b as any)[sortConfig.column!];

        if (Array.isArray(aValue) && Array.isArray(bValue)) {
          return sortConfig.direction === 'asc'
            ? aValue.join(',') > bValue.join(',') ? 1 : -1
            : aValue.join(',') < bValue.join(',') ? 1 : -1;
        }

        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }

    setData(filteredData);
    setCurrentPage(1);
  }, [initialData, searchTerm, columnFilters, sortConfig, filterFields]);


  const toggleRowSelection = (id: number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  const handleHeaderClick = (header: string) => {
    if (tableRef.current) {
      const headerElement = tableRef.current.querySelector(`[data-header="${header}"]`);
      if (headerElement) {
        const fixedColumnsWidth = 200;
        const headerRect = headerElement.getBoundingClientRect();
        const containerRect = tableRef.current.getBoundingClientRect();
        const scrollLeft = headerRect.left - containerRect.left - fixedColumnsWidth;

        tableRef.current.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleActionSelect = (action: ActionType) => {
    setSelectedAction(action);
    switch (action) {
      case 'compare':
        break;
      case 'quote':
        break;
      case 'copy':
        break;
    }
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[key];
    setColumnFilters(newFilters);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredColumns = columns.filter(column => visibleColumns.has(column.key));

  // 타입 안전한 groupColumns 함수
  const groupColumns = (cols: Column<T>[]) => {
    return cols.reduce<Record<string, Column<T>[]>>((acc, column) => {
      const group = column.header || '기본';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(column);
      return acc;
    }, {});
  };

  // 북마크 및 장바구니 스토어 훅 사용
  const bookmarks = useBookmarks();
  const { addToCart } = useQuoteCart();
  const { toast } = useToast();
  
  // 선택된 항목 중 비교 목록에 추가할 항목 관리
  const [compareItems, setCompareItems] = useState<number[]>([]);
  
  // 북마크 전환 함수
  const handleToggleBookmark = (row: T) => {
    const product = row as unknown as ProductSchema;
    
    const bookmarkItem = {
      id: product.id,
      name: product.name || `Product ${product.id}`,
      subtitle: product.subtitle || "",
      manufacturerName: product.manufacturer?.name || "Unknown",
      manufacturerId: product.manufacturer_id || 0,
      addedAt: new Date().toISOString(),
      imageUrl: product.images?.[0]?.url || "",
      packageType: product.package_type || "",
      category: product.category?.name || "기타"
    };
    
    // 북마크 추가 또는 제거
    const isCurrentlyBookmarked = bookmarks.isBookmarked(product.id);
    
    if (isCurrentlyBookmarked) {
      bookmarks.removeBookmark(product.id);
      toast({
        title: "북마크가 해제되었습니다",
        description: "관심제품 목록에서 제거되었습니다.",
        variant: "default"
      });
    } else {
      bookmarks.addBookmark(bookmarkItem);
      toast({
        title: "북마크에 추가되었습니다",
        description: "관심제품 목록에서 확인하실 수 있습니다.",
        variant: "default"
      });
    }
  };
  
  // 견적 장바구니에 추가 함수
  const handleAddToQuoteCart = (row: T) => {
    const product = row as unknown as ProductSchema;
    
    const cartItem = {
      id: product.id,
      name: product.name || `Product ${product.id}`,
      quantity: 1,
      subtitle: product.subtitle || "",
      manufacturerName: product.manufacturer?.name || "Unknown",
      manufacturerId: product.manufacturer_id || 0,
      addedAt: new Date().toISOString(),
      imageUrl: product.images?.[0]?.url || "",
      packageType: product.package_type || "",
      category: product.category?.name || "기타"
    };
    
    addToCart(cartItem);
    
    toast({
      title: "견적 장바구니에 추가되었습니다",
      description: "견적 요청 목록에 제품이 추가되었습니다.",
      action: (
        <Button variant="outline" size="sm" asChild>
          <Link href="/quote-cart">견적함 보기</Link>
        </Button>
      ),
    });
  };
  
  // 선택된 항목을 비교 목록에 추가/제거
  const toggleCompareItem = (id: number) => {
    if (compareItems.includes(id)) {
      setCompareItems(compareItems.filter(item => item !== id));
    } else {
      // 최대 4개까지만 비교 가능
      if (compareItems.length < 4) {
        setCompareItems([...compareItems, id]);
      } else {
        toast({
          title: "비교 항목 초과",
          description: "최대 4개 제품만 비교할 수 있습니다.",
          variant: "destructive"
        });
      }
    }
  };
  
  // 비교하기 버튼 클릭 처리
  const handleCompare = () => {
    if (compareItems.length < 2) {
      toast({
        title: "비교 항목 부족",
        description: "최소 2개 이상의 제품을 선택해야 합니다.",
        variant: "destructive"
      });
      return;
    }
    
    // 비교 페이지로 이동 (ids 파라미터로 전달)
    const compareUrl = `/products/compare?ids=${compareItems.join(',')}`;
    window.open(compareUrl, '_blank');
  };

  // 개별 행의 액션 렌더러 함수
  const renderRowActions = (row: T) => {
    const product = row as unknown as ProductSchema;
    const isBookmarked = bookmarks.isBookmarked(product.id);
    
    return (
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleBookmark(row);
                }}
                className={cn(
                  "h-7 w-7 p-0 rounded-full",
                  isBookmarked ? "text-rose-500 hover:text-rose-600 hover:bg-rose-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
              >
                <Heart className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isBookmarked ? '북마크 해제' : '북마크 추가'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToQuoteCart(row);
                }}
                className="h-7 w-7 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              견적 장바구니에 추가
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompareItem(row.id);
                }}
                className={cn(
                  "h-7 w-7 p-0 rounded-full",
                  compareItems.includes(row.id) ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {compareItems.includes(row.id) ? '비교 목록에서 제거' : '비교 목록에 추가'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/products/detail/${row.id}`);
                }}
                className="h-7 w-7 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              제품 상세 보기
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-max" ref={tableRef}>
      {/* 테이블 컨트롤 영역 - About 스타일 적용 */}
      <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-t-xl border-b border-blue-100">
        <div className="flex flex-col gap-6">
          {/* 테이블 상단 컨트롤 */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[280px] max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="제품명, 부품번호, 제조사 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-white border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm">
                    <Filter size={16} className="mr-2" />
                    필터
                    {Object.keys(columnFilters).length > 0 && (
                      <div className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {Object.keys(columnFilters).length}
                      </div>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="min-w-[300px] max-w-[400px] h-full bg-gradient-to-b from-blue-50 via-white to-blue-50">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-2xl font-semibold text-blue-900">필터 설정</SheetTitle>
                    <SheetDescription className="text-blue-600">원하는 조건으로 필터링하세요</SheetDescription>
                  </SheetHeader>
                  
                  <div className="flex-1 max-h-3/4 h-[500px] overflow-y-auto py-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                      {columns.map(column => (
                        <div key={column.key} className="space-y-2">
                          {column.filterType === 'text' && (
                            <TextFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || ''}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                            />
                          )}
                          {column.filterType === 'single-slider' && column.tooltip?.ranges && (
                            <SingleSliderFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || column.tooltip.ranges.min}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                              min={column.tooltip.ranges.min}
                              max={column.tooltip.ranges.max}
                              unit={column.tooltip.ranges.unit}
                            />
                          )}
                          {column.filterType === 'dual-slider' && column.tooltip?.ranges && (
                            <DualSliderFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || [column.tooltip.ranges.min, column.tooltip.ranges.max]}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                              min={column.tooltip.ranges.min}
                              max={column.tooltip.ranges.max}
                              unit={column.tooltip.ranges.unit}
                            />
                          )}
                          {column.filterType === 'checkbox' && column.filterOptions && (
                            <CheckboxFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || []}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                              options={column.filterOptions}
                            />
                          )}
                          {column.filterType === 'select' && column.filterOptions && (
                            <SelectFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || ''}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                              options={column.filterOptions}
                            />
                          )}
                          {column.filterType === 'combobox' && column.filterOptions && (
                            <ComboboxFilter
                              label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                              value={columnFilters[column.key] || ''}
                              onChange={(value) => setColumnFilters(prev => ({ ...prev, [column.key]: value }))}
                              options={column.filterOptions}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <SheetFooter className="border-t pt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setColumnFilters({})}
                      className="px-6 py-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      초기화
                    </Button>
                    <Button 
                      onClick={() => {}}
                      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      필터 적용
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* 뷰 옵션 다이얼로그 */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm">
                    <FileText size={16} className="mr-2" />
                    보기 설정
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-2xl h-[90vh] flex flex-col">
                  <DialogHeader className="h-[80px] shrink-0">
                    <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      테이블 설정
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      원하는 컬럼을 선택하고 순서를 조정하세요
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="columns" className="flex-1 min-h-0 flex flex-col">
                    <TabsList className="grid w-full grid-cols-2 bg-blue-50/50 shrink-0">
                      <TabsTrigger value="columns" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                        컬럼 선택
                      </TabsTrigger>
                      <TabsTrigger value="layout" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                        레이아웃 설정
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="columns" className="flex-1 min-h-0 mt-4 overflow-hidden">
                      <div className="h-full overflow-y-auto pr-4">
                        <div className="space-y-4">
                          {Object.entries(groupColumns(columns)).map(([group, cols]) => (
                            <div key={group} className="border rounded-lg p-4">
                              <div className="flex items-center space-x-3 mb-4">
                                <Checkbox
                                  id={`group-${group}`}
                                  checked={cols.some(col => visibleColumns.has(col.key))}
                                  onCheckedChange={(checked) => {
                                    const newVisibleColumns = new Set(visibleColumns);
                                    cols.forEach(col => {
                                      if (checked) {
                                        newVisibleColumns.add(col.key);
                                      } else {
                                        newVisibleColumns.delete(col.key);
                                      }
                                    });
                                    setVisibleColumns(newVisibleColumns);
                                  }}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                                <label 
                                  htmlFor={`group-${group}`}
                                  className="text-sm font-semibold cursor-pointer"
                                >
                                  {group}
                                </label>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                                {cols.map(column => (
                                  <div 
                                    key={column.key} 
                                    className="flex items-center p-2 space-x-3 rounded-lg hover:bg-blue-50/50 transition-colors"
                                  >
                                    <Checkbox
                                      id={column.key}
                                      checked={visibleColumns.has(column.key)}
                                      onCheckedChange={() => toggleColumnVisibility(column.key)}
                                      className="data-[state=checked]:bg-blue-600"
                                    />
                                    <label 
                                      htmlFor={column.key} 
                                      className="flex-1 text-sm cursor-pointer"
                                    >
                                      <div>{column.header}</div>
                                      {column.subheader && (
                                        <div className="text-xs text-gray-500">{column.subheader}</div>
                                      )}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="layout" className="flex-1 min-h-0 mt-4 overflow-hidden">
                      <div className="h-full overflow-y-auto">
                        <div className="space-y-6 p-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium text-gray-700">테이블 밀도</h3>
                            <Select defaultValue="compact">
                              <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="밀도 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="compact">좁게</SelectItem>
                                <SelectItem value="normal">보통</SelectItem>
                                <SelectItem value="comfortable">넓게</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <DialogFooter className="h-[80px] shrink-0 mt-6 flex flex-col md:flex-row gap-3 justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setVisibleColumns(new Set(columns.map(col => col.key)))}
                      className="w-full md:w-auto text-blue-600 hover:bg-blue-50"
                    >
                      기본값으로 복원
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                    >
                      설정 저장
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* 활성화된 필터 표시 */}
          {Object.keys(columnFilters).length > 0 && (
            <div className="mt-4 px-4 py-3 bg-white rounded-xl border border-blue-100 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {Object.entries(columnFilters).map(([key, value]) => {
                  const column = columns.find(col => col.key === key);
                  return (
                    <div 
                      key={key} 
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg text-sm border border-blue-100"
                    >
                      <span className="font-medium text-blue-700">{column?.header}</span>
                      {column?.subheader && (
                        <span className="text-blue-500">{column.subheader}</span>
                      )}
                      <span className="text-blue-900">: {value.toString()}</span>
                      <button
                        onClick={() => removeFilter(key)}
                        className="ml-2 p-1 hover:bg-blue-100 rounded-full transition-colors"
                        aria-label="필터 제거"
                      >
                        <X size={14} className="text-blue-600" />
                      </button>
                    </div>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setColumnFilters({})}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-50"
                >
                  모든 필터 지우기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 테이블 본문 */}
      <div className="">
        <table className="w-max min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700">
            <tr className="border-b border-gray-200">
              <th className="sticky left-0 z-40 bg-gradient-to-r from-gray-50 to-blue-50 p-3 text-left font-medium whitespace-nowrap border-r border-gray-200">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={paginatedData.length > 0 && paginatedData.every(row => selectedRows.has(row.id))}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRows(new Set([...selectedRows, ...paginatedData.map(row => row.id)]));
                      } else {
                        const newSelection = new Set(selectedRows);
                        paginatedData.forEach(row => {
                          newSelection.delete(row.id);
                        });
                        setSelectedRows(newSelection);
                      }
                    }}
                    className="rounded-sm h-4 w-4 data-[state=checked]:bg-blue-600"
                  />
                  <span className="text-xs font-semibold">선택</span>
                </div>
              </th>
              {Object.entries(
                filteredColumns.reduce((acc, column) => {
                  const header = column.header;
                  if (!acc[header]) {
                    acc[header] = [];
                  }
                  acc[header].push(column);
                  return acc;
                }, {} as Record<string, typeof columns>)
              ).map(([header, cols], index) => {
                const totalWidth = cols.reduce((sum, col) => {
                  return sum + (columnWidths[col.key] || 120);
                }, 0);

                return (
                  <th
                    key={header}
                    data-header={header}
                    colSpan={cols.length}
                    className="p-3 text-left font-medium text-gray-700 whitespace-nowrap transition-colors cursor-pointer border-r border-gray-200 hover:bg-blue-50"
                    style={{ width: totalWidth }}
                    onClick={() => handleHeaderClick(header)}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <span className="text-xs text-gray-400">({cols.length})</span>
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className="border-b border-gray-200">
              <th className="sticky left-0 z-40 bg-gradient-to-r from-gray-50 to-blue-50 p-3 text-left font-medium whitespace-nowrap border-r border-gray-200">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">순서</span>
                </div>
              </th>
              {filteredColumns.map((column, index) => (
                <th
                  key={column.key}
                  className={cn(
                    "p-3 text-left font-medium text-gray-500 whitespace-nowrap transition-colors relative border-r border-gray-200 hover:bg-blue-50",
                    index === 0 && "sticky left-[50px] z-30 bg-blue-50/50 border-r border-gray-200"
                  )}
                  style={{ 
                    width: columnWidths[column.key] || 120,
                    minWidth: index === 0 ? 120 : undefined
                  }}
                  onClick={() => {
                    setSortConfig({
                      column: column.key,
                      direction: sortConfig.column === column.key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                    });
                  }}
                >
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-1">
                      <span>{column.subheader || column.header}</span>
                      {column.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={14} className="text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1 max-w-xs">
                                <h4 className="font-medium">{column.tooltip.title}</h4>
                                <p className="text-xs text-gray-500">{column.tooltip.description}</p>
                                {column.tooltip.specs && (
                                  <div className="space-y-1 mt-2">
                                    {column.tooltip.specs.map((spec, i) => (
                                      <div key={i} className="flex justify-between text-xs">
                                        <span className="text-gray-500">{spec.label}:</span>
                                        <span>{spec.value}{spec.unit}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {column.unit && (
                        <UnitSelector
                          currentUnit={column.unit.current}
                          availableUnits={column.unit.available}
                          onUnitChange={column.unit.onChange}
                        />
                      )}
                      <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {sortConfig.column === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp size={14} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={14} className="text-blue-600" />
                          )
                        ) : (
                          <ChevronUp size={14} />
                        )}
                      </div>
                    </div>
                  </div>
                  {index !== 0 && (
                    <div
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500/50"
                      onMouseDown={(e) => startResizing(e, column.key)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={filteredColumns.length + 1} className="p-6 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={cn(
                    "group transition-colors border-b border-gray-100 hover:bg-blue-50/30",
                    rowIndex % 2 === 0 && "bg-gray-50/20",
                    selectedRows.has(row.id) && "bg-blue-50/60 hover:bg-blue-50/80"
                  )}
                >
                  <td
                    className={cn(
                      "sticky left-0 z-30 p-3 whitespace-nowrap border-r border-gray-200",
                      rowIndex % 2 === 0 ? "bg-gray-50/20" : "bg-white",
                      selectedRows.has(row.id) && "bg-blue-50/60",
                      "group-hover:bg-blue-50/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows(new Set([...selectedRows, row.id]));
                          } else {
                            const newSelection = new Set(selectedRows);
                            newSelection.delete(row.id);
                            setSelectedRows(newSelection);
                          }
                        }}
                        className="rounded-sm h-4 w-4 data-[state=checked]:bg-blue-600"
                      />
                      <span className="text-xs text-gray-500">{rowIndex + 1 + (currentPage - 1) * itemsPerPage}</span>
                    </div>
                  </td>
                  {filteredColumns.map((column, index) => (
                    <td
                      key={column.key}
                      style={{ width: columnWidths[column.key] || 120 }}
                      className={cn(
                        "p-3 text-gray-700 whitespace-nowrap border-r border-gray-100",
                        index === 0 && "sticky left-[50px] z-30 border-r border-gray-200",
                        rowIndex % 2 === 0 ? (index === 0 ? "bg-gray-50/20" : "bg-gray-50/20") : (index === 0 ? "bg-white" : "bg-white"),
                        selectedRows.has(row.id) && (index === 0 ? "bg-blue-50/60" : "bg-blue-50/60"),
                        "group-hover:bg-blue-50/30"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {column.render ? column.render(row) : (row as any)[column.key]}
                      </div>
                    </td>
                  ))}
                  <td
                    className={cn(
                      "sticky right-0 z-30 p-3 whitespace-nowrap border-l border-gray-200",
                      rowIndex % 2 === 0 ? "bg-gray-50/20" : "bg-white",
                      selectedRows.has(row.id) && "bg-blue-50/60",
                      "group-hover:bg-blue-50/30"
                    )}
                  >
                    {renderRowActions(row)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 테이블 푸터 및 페이지네이션 */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {selectedRows.size > 0 && (
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm">
                <span className="text-sm font-medium">
                  {selectedRows.size}개 항목 선택됨
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompare()}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-8"
                  >
                    <BarChart2 size={14} className="mr-1" />
                    비교
                  </Button>
                  <Button
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      // 선택된 모든 항목을 장바구니에 추가
                      const selectedItems = data.filter(item => selectedRows.has(item.id));
                      selectedItems.forEach(item => handleAddToQuoteCart(item));
                    }}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-8"
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    견적
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRows(new Set())}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-8"
                  >
                    선택 취소
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">페이지당 항목:</span>
              <Select 
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px] text-sm border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map(option => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="text-sm text-gray-500">
              총 <span className="font-medium text-gray-900">{data.length}</span>개 항목 중 
              <span className="font-medium text-blue-600 mx-1">{ data.length}</span>개 표시
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="h-8 w-8 p-0 text-gray-600"
            >
              <span className="sr-only">첫 페이지</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="h-8 px-2.5 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
              이전
            </Button>
            
            <div className="flex items-center gap-1 px-2">
              <span className="text-sm text-gray-600">페이지</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = Number(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-12 h-8 text-sm text-center border border-gray-200 rounded-md"
              />
              <span className="text-sm text-gray-600">/ {totalPages}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="h-8 px-2.5 text-gray-600"
            >
              다음
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="h-8 w-8 p-0 text-gray-600"
            >
              <span className="sr-only">마지막 페이지</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* 비교 아이템 플로팅 버튼 */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white p-4 rounded-xl shadow-xl border border-blue-200 z-50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">
                <BarChart2 className="inline-block mr-1 h-4 w-4 text-blue-600" />
                비교할 제품 <span className="text-blue-600 font-semibold">{compareItems.length}</span>개
              </h3>
              <Button
                size="sm" 
                variant="ghost" 
                onClick={() => setCompareItems([])} 
                className="h-7 w-7 p-0 rounded-full hover:bg-gray-100"
              >
                <X size={14} />
              </Button>
            </div>
            
            <Button 
              size="sm" 
              onClick={handleCompare}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={compareItems.length < 2}
            >
              제품 비교하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
