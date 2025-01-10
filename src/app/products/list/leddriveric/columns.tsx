"use client";

import type { ColumnDef, Header } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { LEDDriverICColumnSchema } from "./schema";
import { isArrayOfDates, isArrayOfNumbers } from "@/lib/is-array";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ColumnResizer = ({
  header,
}: {
  header: Header<LEDDriverICColumnSchema, unknown>;
}) => {
  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={`resizer ${
        header.column.getIsResizing() ? "isResizing" : ""
      } absolute right-0 top-0 h-full w-0.5 cursor-col-resize bg-gray-300 opacity-50 hover:opacity-100`}
      style={{
        userSelect: "none",
        touchAction: "none",
      }}
    />
  );
};

const columnHelper = createColumnHelper<LEDDriverICColumnSchema>()

export const useColumns = () => {

  const columns = [
    // 기본 정보 그룹
    columnHelper.group({
      id: "basic",
      header: ({ column, header }) => (
        <div className="relative flex items-center gap-2 bg-blue-50 p-2 rounded-t">
          기본 정보
          <ColumnResizer header={header} />
        </div>
      ),
      enableHiding: true,
      columns: [
        {
          id: "name",
          accessorFn: (row) => row.name + " " + row.subtitle,
          header: ({ column, header }) => (
            <div className="relative flex items-center gap-2 bg-blue-50/50">
              제품명
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 400,
          maxSize: 500,
          minSize: 200,
          enableHiding: true,
          meta: { sticky: "left" }, // 왼쪽 고정
          cell: ({ row }) => {
            return <div className="flex flex-col bg-blue-50/20">
              <div className="max-w-fit line-clamp-2">{row.original.name} </div>
              <span className="text-muted-foreground">{row.original.subtitle}</span>
            </div>;
          },
        },
        {
          accessorKey: "category",
          header: ({ column, header }) => (
            <div className="relative bg-blue-50/50">
              카테고리
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const value = row.getValue("category") as { name: string };
            return <div className="max-w-fit line-clamp-2 bg-blue-50/20">{value.name}</div>;
          },
          filterFn: (row, id, value) => {
            const rowValue = (row.getValue(id) as { name: string }).name;
            if (typeof value === "string") return rowValue === value;
            if (Array.isArray(value)) return value.includes(rowValue);
            return false;
          },
          enableHiding: true,
        }
      ]
    }),

    // 전기적 특성 그룹 
    columnHelper.group({
      id: "electrical",
      header: ({ column, header }) => (
        <div className="relative flex items-center gap-2 bg-green-50 p-2 rounded-t">
          전기적 특성
          <ColumnResizer header={header} />
        </div>
      ),
      enableHiding: true,
      columns: [
        {
          accessorKey: "number_of_outputs",
          header: ({ column, header }) => (
            <div className="relative bg-green-50/50">
              <DataTableColumnHeader column={column} title="출력 수" />
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const value = row.getValue("number_of_outputs") as number;
            return <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20">{value}</div>;
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
          enableHiding: true,
        },
        {
          accessorKey: "input_voltage_range",
          header: ({ column, header }) => (
            <div className="relative bg-green-50/50">
              <DataTableColumnHeader column={column} title="입력 전압" />
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const range = row.getValue("input_voltage_range") as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            return <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20">{min}V ~ {max}V</div>;
          },
          filterFn: (row, id, value) => {
            const range = row.getValue(id) as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            if (Array.isArray(value) && isArrayOfNumbers(value)) {
              const [filterMin, filterMax] = value;
              return min >= filterMin && max <= filterMax;
            }
            return false;
          },
          enableHiding: true,
        },
        {
          accessorKey: "output_current_range",
          header: ({ column, header }) => (
            <div className="relative bg-green-50/50">
              <DataTableColumnHeader column={column} title="출력 전류" />
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const range = row.getValue("output_current_range") as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            return <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20">{min}mA ~ {max}mA</div>;
          },
          filterFn: (row, id, value) => {
            const range = row.getValue(id) as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            if (Array.isArray(value) && isArrayOfNumbers(value)) {
              const [filterMin, filterMax] = value;
              return min >= filterMin && max <= filterMax;
            }
            return false;
          },
          enableHiding: true,
        },
        {
          accessorKey: "operating_temperature",
          header: ({ column, header }) => (
            <div className="relative bg-green-50/50">
              <DataTableColumnHeader column={column} title="동작 온도" />
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const range = row.getValue("operating_temperature") as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            return <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20">{min}°C ~ {max}°C</div>;
          },
          filterFn: (row, id, value) => {
            const range = row.getValue(id) as string;
            const [min, max] = JSON.parse(range || "[0,0]");
            if (Array.isArray(value) && isArrayOfNumbers(value)) {
              const [filterMin, filterMax] = value;
              return min >= filterMin && max <= filterMax;
            }
            return false;
          },
          enableHiding: true,
        }
      ]
    }),

    // 패키지 정보 그룹
    columnHelper.group({
      id: "package",
      header: ({ column, header }) => (
        <div className="relative flex items-center gap-2 bg-purple-50 p-2 rounded-t">
          패키지 정보
          <ColumnResizer header={header} />
        </div>
      ),
      enableHiding: true,
      columns: [
        {
          accessorKey: "mounting_style",
          header: ({ column, header }) => (
            <div className="relative bg-purple-50/50">
              실장 방식
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          accessorFn: (row) => row.options[0]?.mounting_style,
          cell: ({ row }) => {
            const mountingStyle = row.getValue("mounting_style") as string;
            return <div className="max-w-fit line-clamp-2 bg-purple-50/20">{mountingStyle}</div>;
          },
          filterFn: (row, id, value) => {
            const rowValue = row.getValue(id) as string;
            if (typeof value === "string") return rowValue === value;
            if (Array.isArray(value)) return value.includes(rowValue);
            return false;
          },
          enableHiding: true,
        },
        {
          accessorKey: "storage_type",
          header: ({ column, header }) => (
            <div className="relative bg-purple-50/50">
              보관 유형
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          accessorFn: (row) => row.options[0]?.storage_type,
          cell: ({ row }) => {
            const storageType = row.getValue("storage_type") as string;
            return <div className="max-w-fit line-clamp-2 bg-purple-50/20">{storageType}</div>;
          },
          filterFn: (row, id, value) => {
            const rowValue = row.getValue(id) as string;
            if (typeof value === "string") return rowValue === value;
            if (Array.isArray(value)) return value.includes(rowValue);
            return false;
          },
          enableHiding: true,
        },
        {
          accessorKey: "package_type",
          header: ({ column, header }) => (
            <div className="relative bg-purple-50/50">
              패키지 타입
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          accessorFn: (row) => row.options[0]?.package_types?.[0]?.package_type?.name,
          cell: ({ row }) => {
            const packageType = row.getValue("package_type") as string;
            return <div className="max-w-fit line-clamp-2 bg-purple-50/20">{packageType}</div>;
          },
          filterFn: (row, id, value) => {
            const rowValue = row.getValue(id) as string;
            if (typeof value === "string") return rowValue === value;
            if (Array.isArray(value)) return value.includes(rowValue);
            return false;
          },
          enableHiding: true,
        },
        {
          accessorKey: "options",
          header: ({ column, header }) => (
            <div className="relative bg-purple-50/50">
              패키지 상세
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const options = row.getValue("options") as any[];
            const packageDetail = options[0]?.package_detail;
            return <div className="max-w-fit line-clamp-2 bg-purple-50/20">{packageDetail}</div>;
          },
          filterFn: (row, id, value) => {
            const options = row.getValue(id) as any[];
            const packageDetail = options[0]?.package_detail;
            return packageDetail?.toLowerCase().includes((value as string).toLowerCase());
          },
          enableHiding: true,
        }
      ]
    }),

    // 기술 정보 그룹
    columnHelper.group({
      id: "technical",
      header: ({ column, header }) => (
        <div className="relative flex items-center gap-2 bg-amber-50 p-2 rounded-t">
          기술 정보
          <ColumnResizer header={header} />
        </div>
      ),
      enableHiding: true,
      size: 300,
      minSize: 200,
      maxSize: 400,


      columns: [
        {
          accessorKey: "topologies",
          header: ({ column, header }) => (
            <div className="relative bg-amber-50/50">
              토폴로지
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const topologies = row.getValue("topologies") as string[];
            return <div className="text-muted-foreground max-w-fit line-clamp-2 bg-amber-50/20">{topologies?.join(", ")}</div>;
          },
          filterFn: (row, id, value) => {
            if (!Array.isArray(value) || value.length === 0) return true;
            const rowValue = row.getValue(id) as string[];
            return value.some(v => rowValue.includes(v));
          },
          enableHiding: true,
        },
        {
          accessorKey: "dimming_methods",
          header: ({ column, header }) => (
            <div className="relative bg-amber-50/50">
              디밍 방식
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const dimmingMethods = row.getValue("dimming_methods") as string[];
            return <div className="text-muted-foreground max-w-fit line-clamp-2 bg-amber-50/20">{dimmingMethods?.join(", ")}</div>;
          },
          filterFn: (row, id, value) => {
            if (!Array.isArray(value) || value.length === 0) return true;
            const rowValue = row.getValue(id) as string[];
            return value.some(v => rowValue.includes(v));
          },
          enableHiding: true,
        }
      ]
    }),

    // 인증 및 응용분야 그룹
    columnHelper.group({
      id: "certifications",
      header: ({ column, header }) => (
        <div className="relative flex items-center gap-2 bg-pink-50 p-2 rounded-t">
          인증 및 응용분야
          <ColumnResizer header={header} />
        </div>
      ),
      enableHiding: true,
      columns: [
        {
          accessorKey: "certifications",
          header: ({ column, header }) => (
            <div className="relative bg-pink-50/50">
              인증
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const certifications = row.getValue("certifications") as any[];
            const certNames = certifications?.map(c => c.certification.name);
            return <div className="text-muted-foreground max-w-fit line-clamp-2 bg-pink-50/20">{certNames?.join(", ")}</div>;
          },
          filterFn: (row, id, value) => {
            if (!Array.isArray(value) || value.length === 0) return true;
            const certifications = row.getValue(id) as any[];
            const certNames = certifications.map(cert => cert.certification.name);
            return value.some(v => certNames.includes(v));
          },
          enableHiding: true,
        },
        {
          accessorKey: "applications",
          header: ({ column, header }) => (
            <div className="relative bg-pink-50/50">
              응용분야
              <ColumnResizer header={header} />
            </div>
          ),
          enableResizing: true,
          size: 300,
          minSize: 200,
          maxSize: 400,
          cell: ({ row }) => {
            const applications = row.getValue("applications") as any[];
            const appNames = applications?.map(a => a.application.name);
            return <div className="text-muted-foreground max-w-fit line-clamp-2 bg-pink-50/20">{appNames?.join(", ")}</div>;
          },
          filterFn: (row, id, value) => {
            if (!Array.isArray(value) || value.length === 0) return true;
            const applications = row.getValue(id) as any[];
            const appNames = applications.map(app => app.application.name);
            return value.some(v => appNames.includes(v));
          },
          enableHiding: true,
        },
      ]
    })
  ];

  return columns;
};
