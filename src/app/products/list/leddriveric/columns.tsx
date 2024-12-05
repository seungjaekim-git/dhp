"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { LEDDriverICColumnSchema } from "./schema";
import { isArrayOfDates, isArrayOfNumbers } from "@/lib/is-array";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

// 에러 분석:
// 1. '_parseSync' 속성을 읽을 수 없다는 것은 일반적으로 zod 스키마 관련 문제를 나타냅니다.
// 2. Filter Control에서 발생하는 이유:
//   - searchParamsParser에서 정의된 필터 타입과 columns에서 정의된 filterFn이 일치하지 않을 수 있음
//   - 특히 range 타입(input_voltage_range, output_current_range 등)에서 
//     JSON.parse를 사용하는 부분이 searchParamsParser의 parseAsArrayOf와 충돌할 수 있음
// 3. 해결 방안:
//   - range 타입의 필터 로직을 searchParamsParser와 일치하도록 수정
//   - JSON.parse 대신 직접 문자열 파싱 사용 고려
//   - schema 타입 정의 확인 필요

export const columns: ColumnDef<LEDDriverICColumnSchema>[] = [
  {
    accessorKey: "name",
    header: "제품명",
    enableHiding: false,
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div className="max-w-fit line-clamp-1">{value}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      return rowValue.toLowerCase().includes((value as string).toLowerCase());
    }
  },
  {
    accessorKey: "subtitle",
    header: "제품 설명",
    enableHiding: false,
    cell: ({ row }) => {
      const value = row.getValue("subtitle") as string;
      return <div className="max-w-fit line-clamp-2">{value}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      return rowValue.toLowerCase().includes((value as string).toLowerCase());
    }
  },
  {
    accessorKey: "category",
    header: "카테고리",
    cell: ({ row }) => {
      const value = row.getValue("category") as { name: string };
      return <div className="max-w-fit line-clamp-2">{value.name}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = (row.getValue(id) as { name: string }).name;
      if (typeof value === "string") return rowValue === value;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
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
    }
  },
  {
    accessorKey: "input_voltage_range",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="입력 전압" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("input_voltage_range") as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      return <div className="font-mono max-w-fit line-clamp-2">{min}V ~ {max}V</div>;
    },
    filterFn: (row, id, value) => {
      const range = row.getValue(id) as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        const [filterMin, filterMax] = value;
        return min >= filterMin && max <= filterMax;
      }
      return false;
    }
  },
  {
    accessorKey: "output_current_range",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="출력 전류" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("output_current_range") as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      return <div className="font-mono max-w-fit line-clamp-2">{min}mA ~ {max}mA</div>;
    },
    filterFn: (row, id, value) => {
      const range = row.getValue(id) as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        const [filterMin, filterMax] = value;
        return min >= filterMin && max <= filterMax;
      }
      return false;
    }
  },
  {
    accessorKey: "operating_temperature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="동작 온도" />
    ),
    cell: ({ row }) => {
      const range = row.getValue("operating_temperature") as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      return <div className="font-mono max-w-fit line-clamp-2">{min}°C ~ {max}°C</div>;
    },
    filterFn: (row, id, value) => {
      const range = row.getValue(id) as string;
      const [min, max] = JSON.parse(range || "[0,0]");
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        const [filterMin, filterMax] = value;
        return min >= filterMin && max <= filterMax;
      }
      return false;
    }
  },
  {
    accessorKey: "mounting_style",
    header: "실장 방식",
    accessorFn: (row) => row.options[0]?.mounting_style,
    cell: ({ row }) => {
      const mountingStyle = row.getValue("mounting_style") as string;
      return <div className="max-w-fit line-clamp-2">{mountingStyle}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return rowValue === value;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    }
  },
  {
    accessorKey: "storage_type",
    header: "보관 유형",
    accessorFn: (row) => row.options[0]?.storage_type,
    cell: ({ row }) => {
      const storageType = row.getValue("storage_type") as string;
      return <div className="max-w-fit line-clamp-2">{storageType}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return rowValue === value;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    }
  },
  {
    accessorKey: "package_type",
    header: "패키지 타입",
    accessorFn: (row) => row.options[0]?.package_types?.[0]?.package_type?.name,
    cell: ({ row }) => {
      const packageType = row.getValue("package_type") as string;
      return <div className="max-w-fit line-clamp-2">{packageType}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return rowValue === value;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    }
  },
  {
    accessorKey: "options",
    header: "패키지 상세",
    cell: ({ row }) => {
      const options = row.getValue("options") as any[];
      const packageDetail = options[0]?.package_detail;
      return <div className="max-w-fit line-clamp-2">{packageDetail}</div>;
    },
    filterFn: (row, id, value) => {
      const options = row.getValue(id) as any[];
      const packageDetail = options[0]?.package_detail;
      return packageDetail?.toLowerCase().includes((value as string).toLowerCase());
    }
  },
  {
    accessorKey: "topologies",
    header: "토폴로지",
    cell: ({ row }) => {
      const topologies = row.getValue("topologies") as string[];
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{topologies?.join(", ")}</div>;
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      const rowValue = row.getValue(id) as string[];
      return value.some(v => rowValue.includes(v));
    }
  },
  {
    accessorKey: "dimming_methods",
    header: "디밍 방식",
    cell: ({ row }) => {
      const dimmingMethods = row.getValue("dimming_methods") as string[];
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{dimmingMethods?.join(", ")}</div>;
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      const rowValue = row.getValue(id) as string[];
      return value.some(v => rowValue.includes(v));
    }
  },
  {
    accessorKey: "certifications",
    header: "인증",
    cell: ({ row }) => {
      const certifications = row.getValue("certifications") as any[];
      const certNames = certifications?.map(c => c.certification.name);
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{certNames?.join(", ")}</div>;
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      const certifications = row.getValue(id) as any[];
      const certNames = certifications.map(cert => cert.certification.name);
      return value.some(v => certNames.includes(v));
    }
  },
  {
    accessorKey: "applications",
    header: "응용분야",
    cell: ({ row }) => {
      const applications = row.getValue("applications") as any[];
      const appNames = applications?.map(a => a.application.name);
      return <div className="text-muted-foreground max-w-fit line-clamp-2">{appNames?.join(", ")}</div>;
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      const applications = row.getValue(id) as any[];
      const appNames = applications.map(app => app.application.name);
      return value.some(v => appNames.includes(v));
    }
  }
];
