"use client";

import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import { LoaderCircle, X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  controlsOpen: boolean;
  setControlsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  enableColumnOrdering?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  controlsOpen,
  setControlsOpen,
  isLoading,
  enableColumnOrdering,
}: DataTableToolbarProps<TData>) {
  const filters = table.getState().columnFilters;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} row(s) filtered
          {/* TODO: add "(total X rows)" */}
        </p>
        {isLoading ? (
          <LoaderCircle className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {filters.length ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        ) : null}
        <DataTableViewOptions
          table={table}
          enableOrdering={enableColumnOrdering}
        />
      </div>
    </div>
  );
}
