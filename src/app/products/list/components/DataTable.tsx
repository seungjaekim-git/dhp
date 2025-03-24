"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Download, 
  FileText, 
  SlidersHorizontal, 
  BookmarkIcon,
  Copy,
  Info,
  X,
  ArrowUpDown
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UnitSelector } from "../columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  onFilter?: (value: string) => void;
  categoryParam?: string | string[];
  manufacturerParam?: string | string[];
  applicationParam?: string | string[];
}

interface ResizableHeaderProps {
  column: ColumnDef<any, any>;
  onResize: (width: number) => void;
  onSort?: () => void;
  isSorted?: 'asc' | 'desc' | false;
  onUnitChange?: (unit: string) => void;
  children: React.ReactNode;
}

// 리사이즈 가능한 헤더 컴포넌트
const ResizableHeader: React.FC<ResizableHeaderProps> = ({
  column,
  onResize,
  onSort,
  isSorted,
  onUnitChange,
  children,
}) => {
  const [resizing, setResizing] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = headerRef.current?.getBoundingClientRect().width || column.columnDef.meta?.width || 150;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizing) return;
    
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(
      column.columnDef.meta?.minWidth || 50,
      Math.min(column.columnDef.meta?.maxWidth || 500, startWidthRef.current + deltaX)
    );
    
    if (headerRef.current) {
      headerRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    if (resizing) {
      const newWidth = headerRef.current?.getBoundingClientRect().width || column.columnDef.meta?.width || 150;
      onResize(newWidth);
      setResizing(false);
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      ref={headerRef} 
      className={cn(
        "flex items-center justify-between relative select-none",
        onSort && "cursor-pointer hover:text-gray-100"
      )}
      style={{ width: column.columnDef.meta?.width || 150 }}
    >
      <div 
        className={cn(
          "flex items-center gap-1",
          onSort && "cursor-pointer hover:text-gray-100"
        )}
        onClick={onSort}
      >
        {children}
        {onSort && (
          <ArrowUpDown className={cn(
            "h-4 w-4 transition-opacity",
            isSorted === false && "opacity-50"
          )} />
        )}
        {isSorted === 'asc' && <Badge variant="outline" className="px-1 py-0 h-4 border-blue-400 text-blue-400">↑</Badge>}
        {isSorted === 'desc' && <Badge variant="outline" className="px-1 py-0 h-4 border-blue-400 text-blue-400">↓</Badge>}
      </div>
      
      {column.columnDef.meta?.unit && onUnitChange && (
        <UnitSelector
          unit={column.columnDef.meta.unit}
          onChange={onUnitChange}
          disabled={resizing}
        />
      )}
      
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-1 cursor-col-resize group-hover:bg-gray-600",
          resizing ? "bg-blue-500" : "hover:bg-blue-400"
        )}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  filterColumn,
  onFilter,
  categoryParam,
  manufacturerParam,
  applicationParam
}: DataTableProps<TData, TValue>) {
  // 상태 관리
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  // 리사이징 상태 관리
  const tableRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<{
    isResizing: boolean;
    columnId: string | null;
    startX: number;
    startWidth: number;
  }>({
    isResizing: false,
    columnId: null,
    startX: 0,
    startWidth: 0
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 테이블 설정
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // URL 쿼리 파라미터로 필터 적용
  const applyFilters = (filters: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 기존 필터 제거
    Object.keys(filters).forEach(key => {
      params.delete(key);
    });
    
    // 새 필터 추가
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => {
          params.append(key, val.toString());
        });
      } else if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // 필터 제거
  const removeFilter = (key: string, value?: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value !== undefined) {
      // 특정 값만 제거
      const values = params.getAll(key);
      params.delete(key);
      values.filter(v => v !== value.toString()).forEach(v => {
        params.append(key, v);
      });
    } else {
      // 키 전체 제거
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // 선택된 행 토글
  const toggleRowSelection = (id: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  // 열 리사이징 시작
  const startResizing = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    const startX = e.pageX;
    const columnWidth = columnWidths[columnId] || 150;

    resizingRef.current = {
      isResizing: true,
      columnId,
      startX,
      startWidth: columnWidth
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  // 마우스 이동 핸들러
  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current.isResizing) return;

    const { columnId, startX, startWidth } = resizingRef.current;
    if (!columnId) return;

    const diff = e.pageX - startX;
    const newWidth = Math.max(100, startWidth + diff);

    setColumnWidths(prev => ({
      ...prev,
      [columnId]: newWidth
    }));
  };

  // 리사이징 중지
  const stopResizing = () => {
    resizingRef.current.isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  // 컬럼 너비 계산
  const getColumnWidth = (columnId: string) => {
    return columnWidths[columnId] || 'auto';
  };

  // 선택된 행으로 액션 수행
  const performAction = (action: 'compare' | 'export' | 'bookmark') => {
    if (selectedRows.size === 0) return;
    
    switch (action) {
      case 'compare':
        // 비교 페이지로 이동
        const ids = Array.from(selectedRows).join(',');
        router.push(`/products/compare?ids=${ids}`);
        break;
      case 'export':
        // CSV 내보내기 로직
        console.log('Export selected rows:', selectedRows);
        // 실제 내보내기 기능 구현 필요
        break;
      case 'bookmark':
        // 북마크 추가 로직
        console.log('Bookmark selected rows:', selectedRows);
        // 실제 북마크 기능 구현 필요
        break;
    }
  };

  // 활성화된 필터 표시
  const activeFilterElements = () => {
    const elements = [];
    
    if (categoryParam) {
      const categories = Array.isArray(categoryParam) ? categoryParam : [categoryParam];
      categories.forEach(category => {
        elements.push(
          <Badge 
            key={`cat-${category}`} 
            variant="outline" 
            className="bg-blue-500/10 text-blue-300 border-blue-500/20 gap-1 group"
          >
            카테고리: {category}
            <X 
              className="h-3 w-3 cursor-pointer group-hover:text-white" 
              onClick={() => removeFilter('category', category)}
            />
          </Badge>
        );
      });
    }
    
    if (manufacturerParam) {
      const manufacturers = Array.isArray(manufacturerParam) ? manufacturerParam : [manufacturerParam];
      manufacturers.forEach(manufacturer => {
        elements.push(
          <Badge 
            key={`man-${manufacturer}`} 
            variant="outline" 
            className="bg-green-500/10 text-green-300 border-green-500/20 gap-1 group"
          >
            제조사: {manufacturer}
            <X 
              className="h-3 w-3 cursor-pointer group-hover:text-white" 
              onClick={() => removeFilter('manufacturer', manufacturer)}
            />
          </Badge>
        );
      });
    }
    
    if (applicationParam) {
      const applications = Array.isArray(applicationParam) ? applicationParam : [applicationParam];
      applications.forEach(application => {
        elements.push(
          <Badge 
            key={`app-${application}`} 
            variant="outline" 
            className="bg-amber-500/10 text-amber-300 border-amber-500/20 gap-1 group"
          >
            응용분야: {application}
            <X 
              className="h-3 w-3 cursor-pointer group-hover:text-white" 
              onClick={() => removeFilter('application', application)}
            />
          </Badge>
        );
      });
    }
    
    if (searchTerm) {
      elements.push(
        <Badge 
          key="search" 
          variant="outline" 
          className="bg-purple-500/10 text-purple-300 border-purple-500/20 gap-1 group"
        >
          검색: {searchTerm}
          <X 
            className="h-3 w-3 cursor-pointer group-hover:text-white" 
            onClick={() => {
              setSearchTerm("");
              table.getColumn(filterColumn || 'name')?.setFilterValue("");
            }}
          />
        </Badge>
      );
    }
    
    return elements;
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center py-4 gap-2">
        <div className="flex-1 flex flex-wrap gap-2">
          <div className="relative min-w-[250px]">
            <Input
              placeholder="제품명으로 필터링..."
              value={searchTerm}
              onChange={(event) => {
                const value = event.target.value;
                setSearchTerm(value);
                table.getColumn(filterColumn || 'name')?.setFilterValue(value);
                if (onFilter) onFilter(value);
              }}
              className="pl-8 bg-gray-900 border-gray-800"
            />
            <ChevronRight className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
          </div>
          
          {activeFilterElements().length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {activeFilterElements()}
              
              {activeFilterElements().length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 border-gray-800 text-gray-300 hover:bg-gray-800"
                  onClick={() => {
                    router.push(pathname);
                    setSearchTerm("");
                  }}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  모두 제거
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                {selectedRows.size}개 선택됨
              </Badge>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-800 text-gray-300 hover:bg-gray-800"
                onClick={() => performAction('compare')}
              >
                <Info className="mr-2 h-4 w-4" />
                비교
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-800 text-gray-300 hover:bg-gray-800"
                onClick={() => performAction('export')}
              >
                <Download className="mr-2 h-4 w-4" />
                내보내기
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-800 text-gray-300 hover:bg-gray-800"
                onClick={() => performAction('bookmark')}
              >
                <BookmarkIcon className="mr-2 h-4 w-4" />
                북마크
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-800 text-gray-300 hover:bg-gray-800"
            onClick={() => performAction('export')}
          >
            <FileText className="mr-2 h-4 w-4" />
            보고서
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-800 text-gray-300 hover:bg-gray-800"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                보기
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="bg-gray-900 border-gray-800 text-gray-300 w-56"
            >
              <DropdownMenuCheckboxItem
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                className="hover:bg-gray-800"
              >
                모든 행 선택
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              {table.getAllColumns().filter(
                (column) => column.getCanHide()
              ).map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hover:bg-gray-800"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "manufacturer_name" ? "제조사" :
                      column.id === "category" ? "카테고리" :
                      column.id === "applications" ? "응용 분야" :
                      column.id === "stock_status" ? "재고 상태" :
                      column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="rounded-md overflow-hidden border border-gray-800" ref={tableRef}>
        <Table className="border-collapse">
          <TableHeader className="bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-800 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-300 font-medium px-4 py-3 border-b border-gray-800 relative"
                      style={{ width: getColumnWidth(header.id) }}
                    >
                      {header.isPlaceholder
                        ? null
                        : (
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex-1 select-none"
                              onClick={() => {
                                header.column.getCanSort()
                                  ? header.column.toggleSorting()
                                  : null;
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            
                            {/* 리사이징 핸들 */}
                            <div
                              onMouseDown={(e) => startResizing(e, header.id)}
                              className="absolute right-0 top-0 h-full w-1 cursor-col-resize group"
                            >
                              <div className="h-full w-1 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-800 hover:bg-gray-900/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id} 
                      className="py-2 px-4"
                      style={{ width: getColumnWidth(cell.column.id) }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-24 text-center text-gray-400"
                >
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-gray-900 border-gray-800">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
              {[10, 20, 30, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className="hover:bg-gray-800">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>행 / 페이지</span>
        </div>
        
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center justify-center text-sm font-medium text-gray-400">
            {table.getFilteredRowModel().rows.length > 0
              ? `${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`
              : "0 / 0"}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-800 text-gray-300 hover:bg-gray-800"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">첫 페이지</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-800 text-gray-300 hover:bg-gray-800"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">이전 페이지</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-800 text-gray-300 hover:bg-gray-800"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">다음 페이지</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-800 text-gray-300 hover:bg-gray-800"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">마지막 페이지</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 