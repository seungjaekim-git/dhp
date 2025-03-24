import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getAllProducts, getAllCategories, getAllManufacturers, getAllApplications } from "@/lib/supabase-client";
import { CircleIcon, LayoutGrid, List, Search, SlidersHorizontal, SortAsc, Download, FileText, Filter as FilterIcon, Laptop, Cpu, Gauge, Ruler, Zap, ChevronRight, X, CheckCircle2, XCircle, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton } from "./components/TableSkeleton";
import { DataTable } from "./components/DataTable";
import { FilterDialog } from "../components/FilterDialog";
import { generateProductColumns } from "./components/columns";
import { ProductCard } from "../components/ProductCard";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductListClient } from "./components/ProductListClient";
import { getProducts, getCategories, getManufacturers, getApplications } from "./constants";

export const metadata: Metadata = {
  title: "제품 목록 | DHP",
  description: "DHP 제품 목록 페이지",
};

export const dynamic = 'force-static';
export const revalidate = 3600; // 1시간마다 재검증

// 제품 인터페이스 정의
export interface Product {
  id: string | number;
  name: string;
  part_number: string;
  description?: string;
  image?: string;
  manufacturer_id?: string | number;
  manufacturer_name?: string;
  category?: string;
  applications?: string[];
  parameters?: Record<string, any>;
  datasheet_url?: string;
  stock_status?: string;
  specifications?: Record<string, any>;
}

// 카테고리, 제조사, 응용 분야 인터페이스
interface Category {
  id: number;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface Manufacturer {
  id: number;
  name: string;
  country?: string;
  [key: string]: any;
}

interface Application {
  id: number;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "마이크로컨트롤러": <Cpu className="h-4 w-4 text-blue-400" />,
  "센서": <Gauge className="h-4 w-4 text-green-400" />,
  "통신 모듈": <Laptop className="h-4 w-4 text-purple-400" />,
  "전력 관리": <Zap className="h-4 w-4 text-amber-400" />,
  "메모리": <Ruler className="h-4 w-4 text-red-400" />,
};

// 제품 필터링 도구 - URL SearchParams 생성 유틸리티
const createSearchParamsURL = (
  baseURL: string,
  params: Record<string, string | string[]>
): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(val => {
        if (val) searchParams.append(key, val);
      });
    } else if (value) {
      searchParams.append(key, value);
    }
  });
  
  const query = searchParams.toString();
  return query ? `${baseURL}?${query}` : baseURL;
};

// 정적 페이지 생성을 위한 함수
export function generateStaticParams() {
  return [];
}

// 제품 목록 페이지 (서버 컴포넌트)
export default function ProductsListPage({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  // 서버에서 제품 및 필터 데이터 가져오기
  const products = getProducts();
  const categories = getCategories();
  const manufacturers = getManufacturers();
  const applications = getApplications();
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">제품 목록</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <ProductListClient
          products={products}
          categories={categories}
          manufacturers={manufacturers}
          applications={applications}
          initialSearchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
