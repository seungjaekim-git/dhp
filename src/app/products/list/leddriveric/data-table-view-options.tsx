"use client";

import { Check, GripVertical, Settings2 } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/custom/sortable";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  enableOrdering?: boolean;
}

export function DataTableViewOptions<TData>({
  table,
  enableOrdering = false,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [drag, setDrag] = useState(false);
  const [search, setSearch] = useState("");
  const [columnOrder, setColumnOrder] = useState<string[]>(table.getState().columnOrder);

  const columns = useMemo(() => {
    const allColumns = table.getAllColumns();
  
    // 부모 컬럼 필터링 및 정렬
    const parentColumns = allColumns
      .filter((column) =>
        ["basic", "electrical", "package", "technical", "certifications"].includes(
          column.id
        )
      )
      .sort((a, b) => {
        return columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id);
      });
  
    // 부모 컬럼의 자식 컬럼 포함한 그룹 생성
    const columnGroups = parentColumns.map((parentColumn) => {
      // 자식 컬럼을 정렬하여 가져옴
      const children = parentColumn.columns.sort(
        (a: any, b: any) => columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id)
      );
      return {
        parent: parentColumn,
        children,
      };
    });
  
    console.log("현재 컬럼 그룹 구조:", columnGroups);
    return columnGroups;
  }, [
    table,
    columnOrder,
    table.getState().columnVisibility, // 가시성 상태를 추적
  ]);

  useEffect(() => {
    table.setColumnOrder(columnOrder);
  }, [columnOrder, table]);

  const handleParentColumnVisibility = (column: any) => {
    const childrenColumns = column.columns as any[];

    const isVisible = !column.getIsVisible();
    childrenColumns.forEach((child) => {
      child.toggleVisibility(isVisible);
    });
    column.toggleVisibility(isVisible);
    console.log(`부모 컬럼 ${column.id} 가시성 변경:`, isVisible);
    console.log("자식 컬럼 가시성 상태:", childrenColumns.map(c => ({id: c.id, visible: c.getIsVisible()})));
  };

  const handleChildColumnVisibility = (column: any) => {
    const isVisible = !column.getIsVisible();
    column.toggleVisibility(isVisible);
    console.log(`자식 컬럼 ${column.id} 가시성 변경:`, isVisible);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-9"
        >
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-auto p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search options..."
          />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <Sortable
              value={columns.map(({ parent }) => ({ id: parent.id }))}
              onValueChange={(items) => {
                const newParentOrder = items.map((c) => c.id);
                
                // 부모 컬럼의 자식 컬럼들을 모두 가져옴
                const childrenByParent = new Map();
                columns.forEach(({ parent, children }) => {
                  childrenByParent.set(parent.id, children.map(c => c.id));
                });
                
                // 새로운 순서 생성
                const updatedOrder = [];
                
                // 부모 컬럼과 해당 자식 컬럼들을 순서대로 추가
                newParentOrder.forEach(parentId => {
                  updatedOrder.push(parentId);
                  const childrenIds = childrenByParent.get(parentId) || [];
                  updatedOrder.push(...childrenIds);
                });
                
                // 나머지 컬럼들 추가 (부모나 자식이 아닌 컬럼들)
                const allParentAndChildIds = new Set([
                  ...newParentOrder,
                  ...Array.from(childrenByParent.values()).flat()
                ]);
                const remainingIds = columnOrder.filter(id => !allParentAndChildIds.has(id));
                updatedOrder.push(...remainingIds);
                
                setColumnOrder(updatedOrder);
                
                console.log("컬럼 순서 변경:", {
                  이전순서: columnOrder,
                  새순서: updatedOrder,
                  변경된부모컬럼: newParentOrder
                });
              }}
              overlay={<div className="w-full h-8 rounded-md bg-muted/60" />}
              onDragStart={() => setDrag(true)}
              onDragEnd={() => setDrag(false)}
              onDragCancel={() => setDrag(false)}
            >
              {columns.map(({ parent, children }) => (
                <SortableItem key={parent.id} value={parent.id} asChild>
                  <div>
                    <CommandGroup heading={parent.id}>
                      <CommandItem
                        onSelect={() => handleParentColumnVisibility(parent)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            parent.getIsVisible()
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <Check className={cn("h-4 w-4")} />
                        </div>
                        <span>{parent.id}</span>
                        {enableOrdering && !search ? (
                          <SortableDragHandle
                            variant="ghost"
                            size="icon"
                            className="size-5 ml-auto text-muted-foreground hover:text-foreground focus:bg-muted focus:text-foreground"
                          >
                            <GripVertical className="size-4" aria-hidden="true" />
                          </SortableDragHandle>
                        ) : null}
                      </CommandItem>
                      <Sortable
                        value={children.map((c) => ({ id: c.id }))}
                        onValueChange={(items) => {
                          const newChildOrder = items.map((c) => c.id);
                          
                          // 현재 부모의 자식 컬럼들만 필터링
                          const currentChildrenIds = children.map(c => c.id);
                          
                          // 부모 컬럼 다음에 자식 컬럼들이 오도록 순서 조정
                          const parentIndex = columnOrder.indexOf(parent.id);
                          const updatedOrder = [
                            ...columnOrder.slice(0, parentIndex + 1),
                            ...newChildOrder,
                            ...columnOrder.filter(id => !currentChildrenIds.includes(id) && id !== parent.id)
                          ];
                          
                          setColumnOrder(updatedOrder);

                          console.log("자식 컬럼 순서 변경:", {
                            부모컬럼: parent.id,
                            이전자식순서: currentChildrenIds,
                            새자식순서: newChildOrder,
                            전체순서: updatedOrder
                          });
                        }}
                        overlay={<div className="w-full h-8 rounded-md bg-muted/60" />}
                        onDragStart={() => setDrag(true)}
                        onDragEnd={() => setDrag(false)}
                        onDragCancel={() => setDrag(false)}
                      >
                        {children.map((column) => (
                          <SortableItem key={column.id} value={column.id} asChild>
                            <CommandItem
                              onSelect={() => handleChildColumnVisibility(column)}
                              className={"ml-4 capitalize"}
                              disabled={drag}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  column.getIsVisible()
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <Check className={cn("h-4 w-4")} />
                              </div>
                              <span>{column.id}</span>
                              {enableOrdering && !search ? (
                                <SortableDragHandle
                                  variant="ghost"
                                  size="icon"
                                  className="size-5 ml-auto text-muted-foreground hover:text-foreground focus:bg-muted focus:text-foreground"
                                >
                                  <GripVertical className="size-4" aria-hidden="true" />
                                </SortableDragHandle>
                              ) : null}
                            </CommandItem>
                          </SortableItem>
                        ))}
                      </Sortable>
                    </CommandGroup>
                    <CommandSeparator />
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
