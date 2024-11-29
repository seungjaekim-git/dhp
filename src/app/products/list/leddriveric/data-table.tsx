"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  RowSelectionState,
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
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table";
import { DataTableFilterControls } from "@/components/data-table/data-table-filter-controls";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableFilterCommand } from "@/components/data-table/data-table-filter-command";
import { columnFilterSchema } from "../schema";
import type { DataTableFilterField } from "@/components/data-table/types";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "./search-params";
import { SheetDetailsContent } from "./sheet-details-content";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { LEDDriverICColumnSchema } from "./schema";
import { getFilterFields } from "./constants";

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultColumnFilters?: ColumnFiltersState;
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTable<TData extends LEDDriverICColumnSchema, TValue>({
  columns,
  data,
  defaultColumnFilters = [],
  filterFields: propFilterFields,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(defaultColumnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useLocalStorage<VisibilityState>("leddriveric-table-visibility", {});
  const [controlsOpen, setControlsOpen] = useLocalStorage("leddriveric-table-controls", true);
  const [_, setSearch] = useQueryStates(searchParamsParser);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [columnSizing, setColumnSizing] = React.useState({});

  const debouncedSetColumnSizing = React.useMemo(
    () => debounce((newSizing: Record<string, number>) => {
      setColumnSizing(newSizing);
    }, 50),
    []
  );

  const table = useReactTable({
    data,
    columns: columns.map((col) => ({
      ...col,
      enableResizing: true,
    })),
    state: { columnFilters, sorting, columnVisibility, pagination, rowSelection, columnSizing },
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
  });

  React.useEffect(() => {
    const columnFiltersWithNullable = propFilterFields?.map((field) => {
      const filterValue = columnFilters.find(
        (filter) => filter.id === field.value
      );
      if (!filterValue) return { id: field.value, value: null };
      return { id: field.value, value: filterValue.value };
    }) || [];

    const search = columnFiltersWithNullable.reduce((prev, curr) => {
      prev[curr.id as string] = curr.value;
      return prev;
    }, {} as Record<string, unknown>);

    setSearch(search);
  }, [columnFilters, propFilterFields, setSearch]);

  const selectedRow = React.useMemo(() => {
    const selectedRowKey = Object.keys(rowSelection)?.[0];
    return table
      .getCoreRowModel()
      .flatRows.find((row) => row.id === selectedRowKey);
  }, [rowSelection, table]);

  return (
    <div className="flex w-full h-full flex-col gap-3 md:flex-row">
      <div
        className={cn(
          "w-full p-1 md:min-w-52 md:max-w-52 md:self-start",
          !controlsOpen && "hidden"
        )}
      >
        <div className="-m-1 h-full p-1">
          <DataTableFilterControls
            table={table}
            columns={columns}
            filterFields={propFilterFields}
          />
        </div>
      </div>
      <div className="flex max-w-full flex-1 flex-col gap-4 overflow-hidden p-1">
        <DataTableFilterCommand
          table={table}
          schema={columnFilterSchema}
          filterFields={propFilterFields}
        />
        <DataTableToolbar
          table={table}
          controlsOpen={controlsOpen}
          setControlsOpen={setControlsOpen}
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      className="whitespace-nowrap relative select-none"
                      style={{
                        width: header.getSize(),
                        position: 'relative'
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startWidth = header.getSize();
                            let animationFrame: number;

                            const onMouseMove = (e: MouseEvent) => {
                              const delta = e.clientX - startX;
                              const newSize = Math.max(startWidth + delta, 50);

                              if (!animationFrame) {
                                animationFrame = requestAnimationFrame(() => {
                                  debouncedSetColumnSizing({
                                    ...columnSizing,
                                    [header.id]: newSize,
                                  });
                                  animationFrame = 0;
                                });
                              }
                            };

                            const onMouseUp = () => {
                              if (animationFrame) {
                                cancelAnimationFrame(animationFrame);
                              }
                              window.removeEventListener("mousemove", onMouseMove);
                              window.removeEventListener("mouseup", onMouseUp);
                            };

                            window.addEventListener("mousemove", onMouseMove);
                            window.addEventListener("mouseup", onMouseUp);
                          }}
                          className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-gray-300"
                          style={{
                            transform: header.column.getIsResizing() 
                              ? `translateX(${header.column.getSize()}px)`
                              : undefined,
                          }}
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
                      <TableCell 
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.getSize()
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
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
    </div>
  );
}