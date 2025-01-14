"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
    subheader?: string;
    filterType?: 'text' | 'range' | 'select';
    filterOptions?: string[];
    render?: (row: T) => React.ReactNode;
  }[];
}

export function DataTable<T extends { id: number }>({ data: initialData, columns }: DataTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{column: string | null, direction: 'asc' | 'desc'}>({
    column: null,
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const itemsPerPageOptions = [10, 20, 30, 40, 50, 100];

  // 검색 및 필터링 로직
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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 고정 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
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
                    <Badge variant="secondary" className="ml-2">
                      {Object.keys(filters).length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="min-w-[400px]">
                <SheetHeader>
                  <SheetTitle>필터 설정</SheetTitle>
                  <SheetDescription>원하는 조건으로 필터링하세요</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {columns.map(column => (
                    <div key={column.key} className="space-y-2">
                      <label className="text-sm font-medium">
                        {column.header}
                        {column.subheader && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({column.subheader})
                          </span>
                        )}
                      </label>
                      {column.filterType === 'select' && column.filterOptions ? (
                        <select
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            [column.key]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="">전체</option>
                          {column.filterOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={column.filterType === 'range' ? 'number' : 'text'}
                          placeholder={`${column.header} 필터...`}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            [column.key]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* 테이블 컨테이너 */}
          <table className="w-max min-w-full overflow-x-auto divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50 z-40">
              <tr>
                <th className="sticky left-0 z-50 w-12 p-3 bg-gray-50" rowSpan={2}>
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(new Set(data.map(row => row.id)));
                      } else {
                        setSelectedRows(new Set());
                      }
                    }}
                  />
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
                ).map(([header, cols], index) => (
                  <th
                    key={header}
                    colSpan={cols.length}
                    className={cn(
                      "px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b whitespace-nowrap min-w-[150px]",
                      index === 0 && "sticky left-12 z-40 bg-gray-50"
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-6 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap min-w-[150px]",
                      index === 0 && "sticky left-12 z-40 bg-gray-50"
                    )}
                    onClick={() => {
                      setSortConfig({
                        column: column.key,
                        direction: sortConfig.column === column.key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                      });
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {column.subheader && (
                        <span className="text-xs text-gray-400">{column.subheader}</span>
                      )}
                      {sortConfig.column === column.key && (
                        <span className="text-xs">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row) => (
                <tr 
                  key={row.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    selectedRows.has(row.id) && "bg-blue-50"
                  )}
                >
                  <td className="sticky left-0 z-30 w-12 p-3 bg-white">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  {columns.map((column, index) => (
                    <td 
                      key={column.key} 
                      className={cn(
                        "px-6 py-4 text-sm text-gray-900 whitespace-nowrap min-w-[150px]",
                        index === 0 && "sticky left-12 z-30 bg-white"
                      )}
                    >
                      {column.render ? column.render(row) : (row as any)[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

      {/* 하단 페이지네이션 */}
      <div className="sticky bottom-0 z-50 bg-white border-t">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {selectedRows.size > 0 && (
              <span className="text-sm text-gray-700">
                {selectedRows.size}개 선택됨
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">페이지당 행:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1 text-sm border rounded-lg min-w-[100px]"
              >
                {itemsPerPageOptions.map(option => (
                  <option key={option} value={option}>{option}개</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="min-w-[80px]"
            >
              이전
            </Button>
            <span className="text-sm text-gray-700 min-w-[80px] text-center">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="min-w-[80px]"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
