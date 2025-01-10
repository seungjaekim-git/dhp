// Updated DataTable component with 'Filter' functionality
"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ColumnSizingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "./search-params";
import { SheetDetailsContent } from "./sheet-details-content";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import type { LEDDriverICColumnSchema } from "./schema";
import { useColumns } from "./columns";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge, Filter, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export interface DataTableProps<TData extends LEDDriverICColumnSchema, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultColumnFilters?: ColumnFiltersState;
  filterFields?: any[];
}

export function DataTable<TData extends LEDDriverICColumnSchema, TValue>({
  columns,
  data,
  defaultColumnFilters = [],
  filterFields = [],
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(defaultColumnFilters);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useLocalStorage<VisibilityState>(
    "leddriveric-table-visibility",
    {}
  );
  const [controlsOpen, setControlsOpen] = useLocalStorage("leddriveric-table-controls", true);
  const [_, setSearch] = useQueryStates(searchParamsParser);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const table = useReactTable({
    data,
    columns: useColumns(),
    state: {
      columnFilters,
      sorting,
      columnVisibility,
      pagination,
      rowSelection,
      columnSizing,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    const columnFiltersWithNullable = filterFields.map((field) => {
      const filterValue = columnFilters.find((filter) => filter.id === field.value);
      return { id: field.value, value: filterValue?.value ?? null };
    });

    const search = columnFiltersWithNullable.reduce((acc, curr) => {
      acc[curr.id as string] = curr.value;
      return acc;
    }, {} as Record<string, unknown>);

    setSearch(search);
  }, [columnFilters, filterFields, setSearch]);

  const selectedRow = useMemo(() => {
    const selectedRowKey = Object.keys(rowSelection)?.[0];
    return table.getCoreRowModel().flatRows.find((row) => row.id === selectedRowKey);
  }, [rowSelection, table]);

  return (
      <div className="space-y-4">
        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
              <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                          <Filter size={16} />
                          Filters
                          {Object.values(columnFilters).some(Boolean) && (
                              <Badge variant="secondary" className="ml-2">
                                  {Object.values(columnFilters).filter(Boolean).length}
                              </Badge>
                          )}
                      </Button>
                  </SheetTrigger>
                  <SheetContent>
                      <SheetHeader>
                          <SheetTitle>필터</SheetTitle>
                          <SheetDescription>
                              원하는 조건으로 필터링하세요
                          </SheetDescription>
                      </SheetHeader>
                      {/* Add your filter controls here */}
                  </SheetContent>
              </Sheet>
              <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Add New
              </button>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="table rounded-md border relative overflow-auto max-h-[400px]">
          {/* Table with Sticky Header */}
          <table style={{ width: table.getTotalSize() }}>
          <thead className="sticky top-0 bg-gray-50 shadow-md z-50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={cn(
                "px-4 py-2 font-medium text-gray-600 border-b",
                header.column.columnDef.meta?.sticky === "left" && "sticky left-0 bg-gray-50 z-10 shadow-sm",
                header.column.columnDef.meta?.sticky === "right" && "sticky right-0 bg-gray-50 z-10 shadow-sm"
              )}
              style={{ width: header.getSize()}}
              colSpan={header.colSpan}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>

    <tbody className="divide-y divide-gray-200">
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => {
              row.toggleSelected();
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              }));
              setSheetOpen(true);
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cn(
                  "px-4 py-2 text-gray-700",
                  cell.column.columnDef.meta?.sticky === "left" && "sticky left-0 bg-white z-10 shadow-sm",
                  cell.column.columnDef.meta?.sticky === "right" && "sticky right-0 bg-white z-10 shadow-sm"
                )}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.columnDef.minSize,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="h-24 text-center text-gray-500">
            결과가 없습니다.
          </td>
        </tr>
      )}
    </tbody>
          </table>
        </div>
    
        <DataTablePagination table={table} />
    
        {/* Detail Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent>
            {selectedRow && (
              <SheetDetailsContent
                data={selectedRow.original}
                className="mt-4"
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
    )
  }
