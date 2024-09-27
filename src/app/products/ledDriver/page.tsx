'use client'

import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

const LEDDriverPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const ledDrivers = [
    { 
      id: 1, 
      name: 'LD-100', 
      outputCurrent: '350mA', 
      inputVoltage: '12-24V', 
      dimming: 'PWM', 
      efficiency: '90%', 
      topology: 'Buck', 
      channels: 1,
      outputCurrentPerChannel: '350mA',
      sustainingOutputVoltage: '40V',
      scanDesign: 'N/A',
      packages: 'SOIC-8, QFN-16',
      majorApplications: 'LED 조명, 자동차 조명',
      switchOnResistance: '0.2Ω',
      description: '고효율 단일 채널 Buck LED 드라이버'
    },
    { 
      id: 2, 
      name: 'LD-200', 
      outputCurrent: '700mA', 
      inputVoltage: '24-48V', 
      dimming: 'Analog', 
      efficiency: '92%', 
      topology: 'Boost', 
      channels: 2,
      outputCurrentPerChannel: '350mA',
      sustainingOutputVoltage: '60V',
      scanDesign: '지원',
      packages: 'TSSOP-20, QFN-24',
      majorApplications: 'LCD 백라이트, 디스플레이 조명',
      switchOnResistance: '0.15Ω',
      description: '고성능 듀얼 채널 Boost LED 드라이버'
    },
    { 
      id: 3, 
      name: 'LD-300', 
      outputCurrent: '1A', 
      inputVoltage: '36-72V', 
      dimming: 'PWM/Analog', 
      efficiency: '95%', 
      topology: 'Buck-Boost', 
      channels: 3,
      outputCurrentPerChannel: '333mA',
      sustainingOutputVoltage: '80V',
      scanDesign: '고급 지원',
      packages: 'QFN-32, TQFP-48',
      majorApplications: '실내 조명, 스트리트 라이팅',
      switchOnResistance: '0.1Ω',
      description: '고효율 다채널 Buck-Boost LED 드라이버'
    },
  ];

  const columns: ColumnDef<typeof ledDrivers[0]>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="모두 선택"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="행 선택"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "모델명",
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "outputCurrent",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              출력 전류
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("outputCurrent")}</div>,
      },
      {
        accessorKey: "inputVoltage",
        header: "입력 전압",
        cell: ({ row }) => <div>{row.getValue("inputVoltage")}</div>,
      },
      {
        accessorKey: "dimming",
        header: "디밍 방식",
        cell: ({ row }) => <div>{row.getValue("dimming")}</div>,
      },
      {
        accessorKey: "efficiency",
        header: "효율",
        cell: ({ row }) => <div>{row.getValue("efficiency")}</div>,
      },
      {
        accessorKey: "topology",
        header: "토폴로지",
        cell: ({ row }) => <div>{row.getValue("topology")}</div>,
      },
      {
        accessorKey: "channels",
        header: "채널 수",
        cell: ({ row }) => <div>{row.getValue("channels")}</div>,
      },
      {
        accessorKey: "outputCurrentPerChannel",
        header: "채널당 출력 전류",
        cell: ({ row }) => <div>{row.getValue("outputCurrentPerChannel")}</div>,
      },
      {
        accessorKey: "sustainingOutputVoltage",
        header: "지속 출력 전압",
        cell: ({ row }) => <div>{row.getValue("sustainingOutputVoltage")}</div>,
      },
      {
        accessorKey: "scanDesign",
        header: "스캔 설계",
        cell: ({ row }) => <div>{row.getValue("scanDesign")}</div>,
      },
      {
        accessorKey: "packages",
        header: "패키지",
        cell: ({ row }) => <div>{row.getValue("packages")}</div>,
      },
      {
        accessorKey: "majorApplications",
        header: "주요 응용 분야",
        cell: ({ row }) => <div>{row.getValue("majorApplications")}</div>,
      },
      {
        accessorKey: "switchOnResistance",
        header: "스위치 온 저항",
        cell: ({ row }) => <div>{row.getValue("switchOnResistance")}</div>,
      },
      {
        accessorKey: "description",
        header: "설명",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const driver = row.original
  
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">메뉴 열기</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>작업</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(driver.id.toString())}
                >
                  ID 복사
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>상세 보기</DropdownMenuItem>
                <DropdownMenuItem>편집</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: ledDrivers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">LED 드라이버 IC</h1>
      
      <div className="w-full">
        <DataTableToolbar table={table} />
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      결과 없음.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default LEDDriverPage;
