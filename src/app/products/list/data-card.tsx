"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  Table as TTable,
  PaginationState,
} from "@tanstack/react-table";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SheetDetailsContent } from "./sheet-details-content";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface DataCardProps<TData extends {
  url: string;
  public: boolean;
  active: boolean;
  regions: ("ams" | "fra" | "gru" | "hkg" | "iad" | "syd")[];
  tags: ("web" | "api" | "enterprise" | "app")[];
  date: Date;
  name: string;
  p95?: number;
}, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export function DataCard<TData extends {
  url: string;
  public: boolean;
  active: boolean;
  regions: ("ams" | "fra" | "gru" | "hkg" | "iad" | "syd")[];
  tags: ("web" | "api" | "enterprise" | "app")[];
  date: Date;
  name: string;
  p95?: number;
}, TValue>({
  data,
  columns,
}: DataCardProps<TData, TValue>) {
  const [selectedItem, setSelectedItem] = React.useState<TData | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState<{[key: string]: boolean}>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleBookmark = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    setBookmarks(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const paginatedData = table.getRowModel().rows.map(row => row.original);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {paginatedData.map((item, index) => (
          <Card 
            key={index}
            className="group relative cursor-pointer hover:shadow-xl transition-all duration-200 border border-border/50 bg-background/50 backdrop-blur-[2px] hover:border-primary/20"
            onClick={() => {
              setSelectedItem(item);
              setSheetOpen(true);
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">{item.name}</CardTitle>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-2 opacity-50 group-hover:opacity-100 transition-opacity"
                onClick={(e) => toggleBookmark(e, item.name)}
              >
                <BookmarkIcon 
                  className={`h-5 w-5 ${bookmarks[item.name] ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant={item.active ? "default" : "secondary"} className="rounded-md px-2 py-1">
                    {item.active ? "활성" : "비활성"}
                  </Badge>
                  <Badge variant={item.public ? "default" : "secondary"} className="rounded-md px-2 py-1">
                    {item.public ? "공개" : "비공개"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-md bg-secondary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.regions.map((region) => (
                    <Badge key={region} variant="outline" className="rounded-md bg-primary/5">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTablePagination table={table} />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          {selectedItem && (
            <SheetDetailsContent
              data={selectedItem}
              filterRows={data.length}
              className="mt-4"
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
