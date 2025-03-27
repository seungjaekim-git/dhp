'use client'
import React from "react";
import Link from "next/link";
import { ChevronRight, Cpu, Power, Cable, Battery, Plug, Box } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LEDDriverICFilters, CompactLEDDriverICFilters } from "./filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X, Filter as FilterIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./components/SearchBar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface ListLayoutProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
  filterState: Record<string, any>;
  appliedFilterState: Record<string, any>;
  filterOptions: any;
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  activeFilters: string[];
  searchQuery: string;
  onSearch: (query: string) => void;
  totalProducts: number;
}

export default function ListLayout({
  children,
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
  filterState,
  appliedFilterState,
  filterOptions,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  activeFilters,
  searchQuery,
  onSearch,
  totalProducts
}: ListLayoutProps) {
  const pathname = usePathname() || "/products/list/leddriveric";
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  
  const navigationItems = [
    { label: "LED 드라이버 IC", href: "/products/list/leddriveric", icon: <Cpu className="w-4 h-4" /> },
    { label: "다이오드", href: "/products/list/diode", icon: <Battery className="w-4 h-4" /> },
    { label: "전원관리 IC", href: "/products/list/power", icon: <Power className="w-4 h-4" /> },
    { label: "센서", href: "/products/list/sensor", icon: <Plug className="w-4 h-4" /> },
    { label: "케이블&커넥터", href: "/products/list/cable", icon: <Cable className="w-4 h-4" /> },
    { label: "수동소자", href: "/products/list/passive", icon: <Box className="w-4 h-4" /> },
  ];

  // 필터 적용 핸들러
  const handleApplyFilters = () => {
    onApplyFilters();
    setFilterDialogOpen(false);
    setSheetOpen(false);
  };
  
  // 필터 초기화 핸들러
  const handleClearFilters = () => {
    onClearFilters();
    setFilterDialogOpen(false);
  };
  
  // 필터 제거 핸들러
  const removeFilter = (key: string) => {
    onFilterChange(key, undefined);
    onApplyFilters();
  };
  
  // 적용된 필터가 있는지 확인
  const hasFilters = activeFilters?.length > 0;
  
  // 필터 태그 레이블 가져오기
  const getFilterLabel = (key: string, value: any) => {
    switch (key) {
      case 'manufacturers':
        return `제조사: ${value}`;
      case 'packageTypes':
        return `패키지: ${value}`;
      case 'topologies':
        return `토폴로지: ${value}`;
      case 'channels':
        return `채널 수: ${value}`;
      case 'inputVoltage':
        return `입력 전압: ${value[0]}~${value[1]}V`;
      case 'outputCurrent':
        return `출력 전류: ${value[0]}~${value[1]}mA`;
      case 'dimmingMethods':
        return `디밍 방식: ${value}`;
      case 'certifications':
        return `인증: ${value}`;
      case 'applications':
        return `응용 분야: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* 필터 섹션 - 상단에 배치 */}
      <div className="w-full mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">LED 드라이버 IC</h2>
          <div className="flex items-center gap-2">
            <Link href="/products" className="text-sm text-muted-foreground flex items-center hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              제품 카테고리
            </Link>
            <span className="text-sm text-muted-foreground">{totalProducts}개 제품</span>
          </div>
        </div>
        
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={onSearch}
            placeholder="LED 드라이버 IC 검색..."
            className="w-full"
          />
        </div>
        
        <CompactLEDDriverICFilters
          filterState={filterState}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          appliedFilters={activeFilters}
        />
      </div>
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1">
        {/* 모바일 헤더 - 모바일에서는 숨김 (필터는 상단에서 공통으로 처리) */}
        <div className="md:hidden space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">LED 드라이버 IC</h2>
            <Link href="/products" className="text-sm text-muted-foreground flex items-center hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              돌아가기
            </Link>
          </div>
          
          {/* 활성화된 필터 표시 (모바일) - 필요 없어서 제거 */}
        </div>
        
        {/* 컨텐츠 */}
        {children}
      </div>
    </div>
  );
}
