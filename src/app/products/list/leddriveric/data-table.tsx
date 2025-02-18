"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge, Filter, Info, X, Copy, FileText, Scale, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { UnitSelector } from "./columns";
import { TextFilter, SingleSliderFilter, DualSliderFilter, CheckboxFilter, SelectFilter, ComboboxFilter } from "./filter";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
    subheader?: string;
    filterType?: 'text' | 'single-slider' | 'dual-slider' | 'checkbox' | 'select' | 'combobox';
    filterOptions?: string[];
    render?: (row: T) => React.ReactNode;
    symbol?: string;
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
  }[];
}

type ActionType = 'compare' | 'quote' | 'copy' | null;

export function DataTable<T extends { id: number }>({ data: initialData, columns }: DataTableProps<T>) {
  const router = useRouter();
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{ column: string | null, direction: 'asc' | 'desc' }>({
    column: null,
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const tableRef = useRef<HTMLDivElement>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
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

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(item => {
          const itemValue = (item as any)[key];
          if (itemValue === null || itemValue === undefined) return false;

          if (Array.isArray(itemValue)) {
            return itemValue.some(v => String(v).toLowerCase().includes(String(value).toLowerCase()));
          }

          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        });
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
  }, [initialData, searchTerm, filters, sortConfig]);

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
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-max" ref={tableRef}>
      <div className="sticky top-0 z-50 shadow-sm bg-white">
        <div className="flex flex-col gap-4 p-4">
          <div className="sticky left-2 z-40 flex items-center gap-4">
            <input
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-80"
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 min-w-[100px]">
                  <Filter size={16} />
                  필터
                  {Object.keys(filters).length > 0 && (
                    <div className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {Object.keys(filters).length}
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
                            value={filters[column.key] || ''}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                          />
                        )}
                        {column.filterType === 'single-slider' && column.tooltip?.ranges && (
                          <SingleSliderFilter
                            label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                            value={filters[column.key] || column.tooltip.ranges.min}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                            min={column.tooltip.ranges.min}
                            max={column.tooltip.ranges.max}
                            unit={column.tooltip.ranges.unit}
                          />
                        )}
                        {column.filterType === 'dual-slider' && column.tooltip?.ranges && (
                          <DualSliderFilter
                            label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                            value={filters[column.key] || [column.tooltip.ranges.min, column.tooltip.ranges.max]}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                            min={column.tooltip.ranges.min}
                            max={column.tooltip.ranges.max}
                            unit={column.tooltip.ranges.unit}
                          />
                        )}
                        {column.filterType === 'checkbox' && column.filterOptions && (
                          <CheckboxFilter
                            label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                            value={filters[column.key] || []}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                            options={column.filterOptions}
                          />
                        )}
                        {column.filterType === 'select' && column.filterOptions && (
                          <SelectFilter
                            label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                            value={filters[column.key] || ''}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                            options={column.filterOptions}
                          />
                        )}
                        {column.filterType === 'combobox' && column.filterOptions && (
                          <ComboboxFilter
                            label={`${column.header}${column.subheader ? ` (${column.subheader})` : ''}`}
                            value={filters[column.key] || ''}
                            onChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
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
                    onClick={() => setFilters({})}
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
          </div>

          {/* 활성화된 필터 표시 */}
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap gap-2 ml-4">
              {Object.entries(filters).map(([key, value]) => {
                const column = columns.find(col => col.key === key);
                return (
                  <div key={key} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg text-sm">
                    <span className="font-medium text-blue-700">{column?.header}</span>
                    <span className="text-blue-500">{column?.subheader}</span>
                    <span className="text-blue-900">: {value}</span>
                    <button
                      onClick={() => removeFilter(key)}
                      className="ml-2 p-1 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <X size={14} className="text-blue-600" />
                    </button>
                  </div>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({})}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                모든 필터 지우기
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 테이블 컨테이너 */}
      <div className="sticky top-[72px] z-40 shadow-lg border-b border-gray-300 pb-[60px]">
        <table className="w-max min-w-full divide-y divide-gray-200 table-auto text-[11px]">
          <thead className=" sticky top-[72px] bg-gray-50 z-40 shadow-md">
            <tr className="border-b border-gray-300">
              <th className="sticky left-0 z-40 bg-gray-50 px-2 py-1.5 hover:bg-gray-100 transition-colors border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-2.5 h-2.5 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(new Set(data.map(row => row.id)));
                      } else {
                        setSelectedRows(new Set());
                      }
                    }}
                  />
                  <span className="text-[9px] text-gray-500 font-medium">전체</span>
                </div>
              </th>
              {Object.entries(
                columns.reduce((acc, column) => {
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
                    className={cn(
                      "px-3 py-2 text-left text-[11px] font-semibold text-gray-900 whitespace-nowrap hover:bg-gray-100 transition-colors cursor-pointer border-r border-gray-200"
                    )}
                    style={{ width: totalWidth }}
                    onClick={() => handleHeaderClick(header)}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <span className="text-[9px] text-gray-400">({cols.length})</span>
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className="border-b border-gray-300">
              <th className="sticky left-0 z-40 bg-gray-50 px-2 py-1.5 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    disabled
                    className="w-2.5 h-2.5 cursor-not-allowed opacity-50"
                  />
                  <span className="text-[9px] text-gray-400 font-medium">선택</span>
                </div>
              </th>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-3 py-2 text-left text-[11px] font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 transition-colors relative border-r border-gray-200",
                    index === 0 && "sticky left-12 z-40 bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                  )}
                  style={{ 
                    width: columnWidths[column.key] || 120,
                    minWidth: index === 0 ? 120 : undefined
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {column.subheader && (
                        <div className="flex items-center gap-1">
                          {column.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info size={11} className="text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1 z-50">
                                    <h4 className="font-medium text-[11px]">{column.tooltip.title}</h4>
                                    <p className="text-[9px] text-gray-500">{column.tooltip.description}</p>
                                    {column.tooltip.specs && (
                                      <div className="space-y-1">
                                        {column.tooltip.specs.map((spec, i) => (
                                          <div key={i} className="flex justify-between text-[9px]">
                                            <span className="text-gray-500">{spec.label}:</span>
                                            <span>{spec.value}{spec.unit}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {column.tooltip.ranges && (
                                      <div className="mt-1 text-[9px]">
                                        <div className="text-gray-500">범위:</div>
                                        <div>{column.tooltip.ranges.min} ~ {column.tooltip.ranges.max} {column.tooltip.ranges.unit}</div>
                                      </div>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <span className="text-[9px] text-gray-400">{column.subheader}</span>
                        </div>
                      )}
                      <span className="flex items-center gap-1 text-[9px]">({column.symbol})</span>
                      {column.unit && (
                        <UnitSelector
                          currentUnit={column.unit.current}
                          availableUnits={column.unit.available}
                          onUnitChange={column.unit.onChange}
                        />
                      )}
                    </div>
                    <div className="flex text-[11px] font-semibold items-center gap-1">
                      {sortConfig.column === column.key ? (
                        <span className="text-blue-500">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      ) : (
                        <span className="text-gray-300">↕</span>
                      )}
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
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-gray-500 text-[11px]">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors cursor-pointer group",
                    selectedRows.has(row.id) && "bg-blue-50 hover:bg-blue-100",
                    rowIndex % 2 === 0 && "bg-gray-50/30"
                  )}
                >
                  <td
                    className={cn(
                      "sticky left-0 z-30 w-10 p-2 bg-white transition-colors border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                      "group-hover:bg-gray-50",
                      selectedRows.has(row.id) && "bg-blue-50 group-hover:bg-blue-100"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRowSelection(row.id);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="w-2.5 h-2.5 cursor-pointer"
                      checked={selectedRows.has(row.id)}
                      onChange={() => { }}
                    />
                  </td>
                  {columns.map((column, index) => (
                    <td
                      key={column.key}
                      style={{ width: columnWidths[column.key] || 120 }}
                      className={cn(
                        "px-3 py-2 text-[11px] text-gray-900 whitespace-nowrap transition-colors border-r border-gray-200",
                        index === 0 && "sticky left-12 z-30 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                        "group-hover:bg-gray-50",
                        selectedRows.has(row.id) && index === 0 && "bg-blue-50 group-hover:bg-blue-100"
                      )}
                    >
                      <div className="flex w-full items-center gap-1">
                        {column.render ? column.render(row) : (row as any)[column.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 네비게이션 */}
      <div className="sticky bottom-0 z-40 bg-white shadow-sm border-t-black border-t-2">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4 sticky left-4 z-40">
            {selectedRows.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600">
                  {selectedRows.size}개 선택됨
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRows(new Set())}
                  className="text-gray-500 hover:text-gray-700"
                >
                  선택 해제
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">페이지당 행:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 text-sm border rounded-lg min-w-[100px] cursor-pointer hover:border-gray-400 transition-colors"
              >
                {itemsPerPageOptions.map(option => (
                  <option key={option} value={option}>{option}개</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-gray-500">
              총 {data.length}개의 항목
            </span>

            {/* 선택된 항목이 있을 때 표시되는 액션 버튼들 */}
            {selectedRows.size > 0 && (
              <div className="flex justify-center gap-4">
                <Button
                  variant={selectedAction === 'compare' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleActionSelect('compare')}
                  className="flex items-center gap-2"
                >
                  <Scale size={16} />
                  비교하기
                </Button>
                <Button
                  variant={selectedAction === 'quote' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleActionSelect('quote')}
                  className="flex items-center gap-2"
                >
                  <FileText size={16} />
                  견적서 추가
                </Button>
                <Button
                  variant={selectedAction === 'copy' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleActionSelect('copy')}
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  복사하기
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 sticky right-4 z-40">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="min-w-[40px]"
            >
              ≪
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="min-w-[80px]"
            >
              이전
            </Button>
            <div className="flex items-center gap-1">
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
                className="w-16 px-2 py-1 text-sm text-center border rounded"
              />
              <span className="text-sm text-gray-700">/ {totalPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="min-w-[80px]"
            >
              다음
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="min-w-[40px]"
            >
              ≫
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
