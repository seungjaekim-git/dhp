"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Check, Minus } from "lucide-react";
import type { LEDDriverICColumnSchema } from "./schema";
import { isArrayOfDates, isArrayOfNumbers } from "@/lib/is-array";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format, isSameDay } from "date-fns";

export const columns: ColumnDef<LEDDriverICColumnSchema>[] = [
    {
        accessorKey: "name",
        header: "제품명",
        enableHiding: false,
        cell: ({ row }) => {
          const value = row.getValue("name") as string;
          return <div className="max-w-fit line-clamp-1">{value}</div>;
        }
      },
{
    accessorKey: "subtitle",
    header: "제품 설명",
    enableHiding: false,
    cell: ({ row }) => {
      const value = row.getValue("subtitle") as string;
      return <div className="max-w-fit line-clamp-2">{value}</div>;
    }
  },
  {
    accessorKey: "category",
    header: "카테고리",
    cell: ({ row }) => {
      const value = row.getValue("category") as { name: string };
      return <div className="max-w-fit line-clamp-2">{value.name}</div>;
    }
  },
  {
    accessorKey: "number_of_outputs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="출력 수" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("number_of_outputs") as number;
      return <div className="font-mono max-w-fit line-clamp-2">{value}</div>;
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
    accessorKey: "input_voltage_range",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="입력 전압" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("input_voltage_range") as string;
      const [min, max] = JSON.parse(range);
      return <div className="font-mono max-w-fit line-clamp-2">{min}V ~ {max}V</div>;
    }
  },
  {
    accessorKey: "output_current_range",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="출력 전류" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("output_current_range") as string;
      const [min, max] = JSON.parse(range);
      return <div className="font-mono max-w-fit line-clamp-2">{min}mA ~ {max}mA</div>;
    }
  },
  {
    accessorKey: "operating_temperature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="동작 온도" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("operating_temperature") as string;
      const [min, max] = JSON.parse(range);
      return <div className="font-mono max-w-fit line-clamp-2">{min}°C ~ {max}°C</div>;
    }
  },
  {
    accessorKey: "mounting_style",
    header: "실장 방식",
    accessorFn: (row) => row.options[0]?.mounting_style,
    cell: ({ row }) => {
      const mountingStyle = row.getValue("mounting_style") as string;
      return <div className="max-w-fit line-clamp-2">{mountingStyle}</div>;
    }
  },
  {
    accessorKey: "storage_type",
    header: "보관 유형",
    accessorFn: (row) => row.options[0]?.storage_type,
    cell: ({ row }) => {
      const storageType = row.getValue("storage_type") as string;
      return <div className="max-w-fit line-clamp-2">{storageType}</div>;
    }
  },
  {
    accessorKey: "package_type",
    header: "패키지 타입",
    accessorFn: (row) => row.options[0]?.package_types?.[0]?.package_type?.name,
    cell: ({ row }) => {
      const packageType = row.getValue("package_type") as string;
      return <div className="max-w-fit line-clamp-2">{packageType}</div>;
    }
  },
  {
    accessorKey: "options",
    header: "패키지 상세",
    cell: ({ row }) => {
      const options = row.getValue("options") as any[];
      const packageDetail = options[0]?.package_detail;
      return <div className="max-w-fit line-clamp-2">{packageDetail}</div>;
    }
  },
  {
    accessorKey: "topologies",
    header: "토폴로지",
    cell: ({ row }) => {
      const topologies = row.getValue("topologies") as string[];
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{topologies?.join(", ")}</div>;
    }
  },
  {
    accessorKey: "dimming_methods",
    header: "디밍 방식",
    cell: ({ row }) => {
      const dimmingMethods = row.getValue("dimming_methods") as string[];
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{dimmingMethods?.join(", ")}</div>;
    }
  },
  {
    accessorKey: "certifications",
    header: "인증",
    cell: ({ row }) => {
      const certifications = row.getValue("certifications") as any[];
      const certNames = certifications?.map(c => c.certification.name);
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{certNames?.join(", ")}</div>;
    }
  },
  {
    accessorKey: "applications",
    header: "응용분야",
    cell: ({ row }) => {
      const applications = row.getValue("applications") as any[];
      const appNames = applications?.map(a => a.application.name);
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{appNames?.join(", ")}</div>;
    }
  }
];
