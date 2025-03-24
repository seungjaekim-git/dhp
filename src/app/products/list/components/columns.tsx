import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Product } from "../page";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// 테이블 컬럼 설정 함수
export function generateProductColumns(): ColumnDef<Product>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="모든 행 선택"
          className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="행 선택"
          className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="text-xs text-gray-500">#{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="-ml-4 hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            제품명
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-gray-800 overflow-hidden flex items-center justify-center">
              {product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={40} 
                  height={40} 
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs">No Image</div>
              )}
            </div>
            <div className="flex flex-col">
              <Link href={`/products/detail/${product.id}`} className="font-medium text-white hover:text-blue-400 transition-colors">
                {product.name}
              </Link>
              <div className="text-xs text-gray-400 font-mono">{product.partNumber}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "manufacturer_name",
      header: "제조사",
      cell: ({ row }) => <div className="text-sm text-gray-300">{row.getValue("manufacturer_name")}</div>,
    },
    {
      accessorKey: "category",
      header: "카테고리",
      cell: ({ row }) => (
        <Badge className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "applications",
      header: "응용 분야",
      cell: ({ row }) => {
        const applications = row.original.applications;
        if (!applications || applications.length === 0) return null;
        
        return (
          <div className="flex flex-wrap gap-1">
            {applications.slice(0, 2).map((app, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className={cn(
                  "text-xs border-gray-700",
                  i === 0 ? "bg-gray-800 text-blue-300" : "bg-gray-800 text-gray-400"
                )}
              >
                {app}
              </Badge>
            ))}
            {applications.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-800 text-gray-400 border-gray-700">
                +{applications.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "stock_status",
      header: "재고 상태",
      cell: ({ row }) => {
        const status = row.original.stock_status || "재고 있음";
        return (
          <Badge 
            className={cn(
              "bg-opacity-20 font-medium",
              status === "재고 있음" ? "bg-green-500 text-green-300" : 
              status === "재고 부족" ? "bg-amber-500 text-amber-300" : 
              "bg-red-500 text-red-300"
            )}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "작업",
      cell: ({ row }) => {
        const product = row.original;
        
        return (
          <div className="flex items-center justify-end gap-2">
            {product.datasheet_url && (
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <FileText className="h-4 w-4 text-gray-400" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Link href={`/products/detail/${product.id}`}>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
} 