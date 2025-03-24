"use client";

import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, Minus } from "lucide-react";
import { tagsColor } from "./constants";
import type { ColumnSchema } from "./schema";
import { isArrayOfDates, isArrayOfNumbers } from "@/lib/is-array";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Zap,
  Thermometer,
  Box,
  Gauge,
  Power,
  Clock,
  RefreshCw,
  Component,
  CircuitBoard,
} from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// 단위 타입 정의
export type UnitType = 'v' | 'a' | 'w' | 'hz' | 'c' | '℃' | 'mm' | 'pcs' | '';

// 기본 컬럼 정의
export interface Column {
  id: string;
  header: string;
  accessorKey: string;
  enableSorting?: boolean;
  filterFn?: string;
  unit?: UnitType;
  render?: (value: any, row: any) => React.ReactNode;
  showTooltip?: boolean;
  description?: string;
  // 컬럼 가시성, 순서, 너비 등
  isVisible?: boolean;
  order?: number;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

// 단위 선택기 컴포넌트
export function UnitSelector({ 
  unit, 
  onChange,
  disabled = false
}: { 
  unit: string;
  onChange: (unit: string) => void;
  disabled?: boolean;
}) {
  const unitOptions = {
    'v': ['V', 'mV', 'kV'],
    'a': ['A', 'mA', 'μA'],
    'w': ['W', 'mW', 'kW'],
    'hz': ['Hz', 'kHz', 'MHz'],
    'c': ['℃', '℉'],
    'mm': ['mm', 'cm', 'inch'],
  };
  
  const options = unitOptions[unit as keyof typeof unitOptions] || [];
  
  if (options.length === 0) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400">
          {unit.toUpperCase()}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="cursor-pointer hover:bg-gray-700"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 값 형식화 함수
export function formatValue(value: number | string | null | undefined, unit: UnitType | string = '', selectedUnit?: string): string {
  if (value === null || value === undefined || value === '') return '-';
  
  if (typeof value === 'string') {
    // 숫자로 변환 가능한지 확인
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    value = numValue;
  }
  
  // 단위 변환
  if (selectedUnit) {
    value = convertUnit(value, unit as UnitType, selectedUnit);
  }
  
  // 소수점 이하 자릿수 조정
  const formattedValue = value < 1 && value > 0 
    ? value.toPrecision(3) 
    : value % 1 === 0 
      ? value.toString() 
      : value.toFixed(2);
  
  // 단위 추가
  return `${formattedValue}${selectedUnit || unit}`;
}

// 단위 변환 함수
export function convertUnit(value: number, fromUnit: UnitType, toUnit: string): number {
  if (!fromUnit || !toUnit || fromUnit === toUnit) return value;
  
  // 전압 단위 변환
  if (fromUnit === 'v') {
    if (toUnit === 'V') return value;
    if (toUnit === 'mV') return value * 1000;
    if (toUnit === 'kV') return value / 1000;
  }
  
  // 전류 단위 변환
  if (fromUnit === 'a') {
    if (toUnit === 'A') return value;
    if (toUnit === 'mA') return value * 1000;
    if (toUnit === 'μA') return value * 1000000;
  }
  
  // 전력 단위 변환
  if (fromUnit === 'w') {
    if (toUnit === 'W') return value;
    if (toUnit === 'mW') return value * 1000;
    if (toUnit === 'kW') return value / 1000;
  }
  
  // 주파수 단위 변환
  if (fromUnit === 'hz') {
    if (toUnit === 'Hz') return value;
    if (toUnit === 'kHz') return value / 1000;
    if (toUnit === 'MHz') return value / 1000000;
  }
  
  // 온도 단위 변환
  if (fromUnit === 'c' || fromUnit === '℃') {
    if (toUnit === '℃') return value;
    if (toUnit === '℉') return (value * 9/5) + 32;
  }
  
  // 길이 단위 변환
  if (fromUnit === 'mm') {
    if (toUnit === 'mm') return value;
    if (toUnit === 'cm') return value / 10;
    if (toUnit === 'inch') return value / 25.4;
  }
  
  return value;
}

// 아이콘 컴포넌트
export const ColumnIcons = {
  voltage: <Zap className="h-4 w-4 text-amber-400" />,
  current: <Zap className="h-4 w-4 text-blue-400" />,
  temperature: <Thermometer className="h-4 w-4 text-red-400" />,
  dimension: <Box className="h-4 w-4 text-gray-400" />,
  power: <Power className="h-4 w-4 text-green-400" />,
  frequency: <RefreshCw className="h-4 w-4 text-purple-400" />,
  package: <Component className="h-4 w-4 text-orange-400" />,
  interface: <CircuitBoard className="h-4 w-4 text-teal-400" />,
};

// useColumns 훅 - 컬럼 가시성 및 순서 관리
export function useColumns(defaultColumns: Column[], filterOptions: any = {}) {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  
  // 유닛 선택 상태 관리
  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>({});
  
  // 초기 컬럼 설정
  useMemo(() => {
    const initialVisibility: Record<string, boolean> = {};
    const initialOrder: string[] = [];
    const initialWidths: Record<string, number> = {};
    
    defaultColumns.forEach((column) => {
      const id = column.id;
      initialVisibility[id] = column.isVisible !== false;
      initialOrder.push(id);
      initialWidths[id] = column.width || 150;
    });
    
    setColumnVisibility(initialVisibility);
    setColumnOrder(initialOrder);
    setColumnWidths(initialWidths);
  }, [defaultColumns]);
  
  // 컬럼 토글
  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };
  
  // 모든 컬럼 토글
  const toggleAllColumns = (value: boolean) => {
    const newVisibility: Record<string, boolean> = {};
    defaultColumns.forEach((column) => {
      newVisibility[column.id] = value;
    });
    setColumnVisibility(newVisibility);
  };
  
  // 컬럼 순서 변경
  const reorderColumn = (fromIndex: number, toIndex: number) => {
    const newOrder = [...columnOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setColumnOrder(newOrder);
  };
  
  // 컬럼 너비 변경
  const resizeColumn = (columnId: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: width,
    }));
  };
  
  // 단위 변경
  const changeUnit = (columnId: string, unit: string) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [columnId]: unit,
    }));
  };
  
  // 정렬된 컬럼
  const orderedColumns = useMemo(() => {
    if (columnOrder.length === 0) return defaultColumns;
    
    // 사용 가능한 필터 옵션에 따라 컬럼 필터링
    let filteredColumns = defaultColumns;
    
    // 가시성과 순서에 따라 컬럼 정렬
    return defaultColumns
      .filter((column) => columnVisibility[column.id] !== false)
      .sort((a, b) => {
        const aIndex = columnOrder.indexOf(a.id);
        const bIndex = columnOrder.indexOf(b.id);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      })
      .map((column) => ({
        ...column,
        width: columnWidths[column.id] || column.width || 150,
        selectedUnit: selectedUnits[column.id],
      }));
  }, [defaultColumns, columnVisibility, columnOrder, columnWidths, selectedUnits]);
  
  return {
    columns: orderedColumns,
    columnVisibility,
    columnOrder,
    columnWidths,
    selectedUnits,
    toggleColumnVisibility,
    toggleAllColumns,
    reorderColumn,
    resizeColumn,
    changeUnit,
  };
}

// 기본 제품 컬럼 정의
export const defaultProductColumns: Column[] = [
  {
    id: "product_image",
    header: "이미지",
    accessorKey: "image_url",
    enableSorting: false,
    width: 80,
    minWidth: 80,
    render: (value, row) => (
      <div className="flex items-center justify-center h-10 w-10">
        {value ? (
          <Image
            src={value}
            alt={row.name || "제품 이미지"}
            width={40}
            height={40}
            className="rounded-md object-contain"
          />
        ) : (
          <div className="h-10 w-10 rounded-md bg-gray-800 flex items-center justify-center">
            <Component className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    ),
  },
  {
    id: "name",
    header: "제품명",
    accessorKey: "name",
    enableSorting: true,
    filterFn: "contains",
    minWidth: 200,
    width: 240,
    render: (value, row) => (
      <div className="flex flex-col">
        <Link 
          href={`/products/detail/${row.id}`}
          className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
        >
          {value}
        </Link>
        <span className="text-xs text-gray-400">{row.part_number}</span>
      </div>
    ),
  },
  {
    id: "manufacturer",
    header: "제조사",
    accessorKey: "manufacturer_name",
    enableSorting: true,
    filterFn: "contains",
    width: 150,
  },
  {
    id: "category",
    header: "카테고리",
    accessorKey: "category",
    enableSorting: true,
    filterFn: "contains",
    width: 150,
  },
  {
    id: "stock",
    header: "재고",
    accessorKey: "in_stock",
    enableSorting: true,
    width: 100,
    render: (value) => (
      <div className="flex items-center">
        {value ? (
          <Badge variant="outline" className="border-green-500 text-green-400 flex items-center gap-1 px-2">
            <CheckCircle className="h-3 w-3" />
            <span>있음</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="border-gray-500 text-gray-400 flex items-center gap-1 px-2">
            <XCircle className="h-3 w-3" />
            <span>없음</span>
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "액션",
    accessorKey: "",
    width: 70,
    render: (_, row) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
            <DropdownMenuItem className="hover:bg-gray-700">
              <Link href={`/products/detail/${row.id}`}>상세보기</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700">
              데이터시트
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const value = row.getValue("url");
      return <div className="max-w-[200px] truncate">{`${value}`}</div>;
    },
  },
  {
    accessorKey: "regions",
    header: "Regions",
    cell: ({ row }) => {
      const value = row.getValue("regions");
      if (Array.isArray(value)) {
        return <div className="text-muted-foreground">{value.join(", ")}</div>;
      }
      return <div className="text-muted-foreground">{`${value}`}</div>;
    },
    filterFn: (row, id, value) => {
      const array = row.getValue(id) as string[];
      if (typeof value === "string") return array.includes(value);
      // up to the user to define either `.some` or `.every`
      if (Array.isArray(value)) return value.some((i) => array.includes(i));
      return false;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const value = row.getValue("tags") as string | string[];
      if (Array.isArray(value)) {
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((v) => (
              <Badge key={v} className={tagsColor[v].badge}>
                {v}
              </Badge>
            ))}
          </div>
        );
      }
      return <Badge className={tagsColor[value].badge}>{value}</Badge>;
    },
    filterFn: (row, id, value) => {
      const array = row.getValue(id) as string[];
      if (typeof value === "string") return array.includes(value);
      // up to the user to define either `.some` or `.every`
      if (Array.isArray(value)) return value.some((i) => array.includes(i));
      return false;
    },
  },
  {
    accessorKey: "p95",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="P95" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("p95");
      if (typeof value === "undefined") {
        return <Minus className="h-4 w-4 text-muted-foreground/50" />;
      }
      return (
        <div>
          <span className="font-mono">{`${value}`}</span> ms
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as number;
      if (typeof value === "number") return value === Number(rowValue);
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        if (value.length === 1) {
          return value[0] === rowValue;
        } else {
          const sorted = value.sort((a, b) => a - b);
          return sorted[0] <= rowValue && rowValue <= sorted[1];
        }
      }
      return false;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const value = row.getValue("active");
      if (value) return <Check className="h-4 w-4" />;
      return <Minus className="h-4 w-4 text-muted-foreground/50" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (typeof value === "string") return value === String(rowValue);
      if (typeof value === "boolean") return value === rowValue;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    },
  },
  {
    accessorKey: "public",
    header: "Public",
    cell: ({ row }) => {
      const value = row.getValue("public");
      if (value) return <Check className="h-4 w-4" />;
      return <Minus className="h-4 w-4 text-muted-foreground/50" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (typeof value === "string") return value === String(rowValue);
      if (typeof value === "boolean") return value === rowValue;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("date");
      return (
        <div className="text-xs text-muted-foreground" suppressHydrationWarning>
          {format(new Date(`${value}`), "LLL dd, y HH:mm")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (value instanceof Date && rowValue instanceof Date) {
        return isSameDay(value, rowValue);
      }
      if (Array.isArray(value)) {
        if (isArrayOfDates(value) && rowValue instanceof Date) {
          const sorted = value.sort((a, b) => a.getTime() - b.getTime());
          // TODO: check length
          return (
            sorted[0]?.getTime() <= rowValue.getTime() &&
            rowValue.getTime() <= sorted[1]?.getTime()
          );
        }
      }
      return false;
    },
  },
];
