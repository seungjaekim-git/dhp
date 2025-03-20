'use client';

import * as React from "react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Package,
  ShoppingCart,
  Component,
  File,
  FileSearch,
  Search,
  Briefcase,
  GraduationCap,
  FileText,
  Server,
  Factory,
  Building,
  Circuit,
  Chip,
  Cpu,
  Microscope,
  ShieldAlert,
  BookOpen,
  Warehouse,
  BookOpenCheck,
  MessageSquare,
  HeartHandshake,
  Sparkles,
  ScanSearch,
} from "lucide-react";
import { useStore } from "zustand";
import { useSearchStore } from "@/store/SearchStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { searchData } from "@/data/searchData";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function SearchModal() {
  const { isOpen, setIsOpen } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  // 빠른 액세스 아이템들
  const quickAccess = [
    {
      url: "/products",
      label: "제품 라인업",
      icon: <Component className="mr-1.5 h-3.5 w-3.5 text-blue-500" />,
      description: "LED 드라이버 IC, 다이오드, 전원관리 IC 및 기타 전자부품",
    },
    {
      url: "/partners",
      label: "파트너 기업",
      icon: <HeartHandshake className="mr-1.5 h-3.5 w-3.5 text-rose-500" />,
      description: "주요 파트너십 기업 소개 및 협력 사례",
    },
    {
      url: "/quote",
      label: "견적 문의",
      icon: <FileText className="mr-1.5 h-3.5 w-3.5 text-amber-500" />,
      description: "견적 요청, 대량 구매 문의, 기술 지원 요청",
    },
    {
      url: "/support",
      label: "기술 지원",
      icon: <Microscope className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />,
      description: "제품 자료, 기술 문서, FAQs, 트러블슈팅 가이드",
    },
  ];

  // 추천 검색어
  const recommendations = [
    "LED 드라이버 IC",
    "SiC 다이오드",
    "시스템 반도체",
    "파워 MOSFET",
    "전원 관리 IC",
    "자동차용 반도체",
  ];

  // 검색 단축키 및 필터 표시
  const isSearching = searchQuery.length > 0;

  // 모달 외부 클릭 핸들러
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // 검색 결과 필터링
  const filteredResults = React.useMemo(() => {
    if (!searchQuery) return [];

    return searchData.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesQuery;
    }).slice(0, 8); // 최대 8개 결과로 제한
  }, [searchQuery]);

  // 결과 선택 핸들러
  const handleSelect = (url: string) => {
    setIsOpen(false);
    setSearchQuery("");
    router.push(url);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  // 검색 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  // 키보드 단축키 처리
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="p-0 max-w-3xl w-[95%] sm:w-[90%] max-h-[85vh] rounded-xl border shadow-2xl" 
        onClick={handleOutsideClick}
      >
        <div className="flex flex-col h-full">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              className="w-full px-8 py-2.5 text-sm bg-transparent border-0 border-b focus:outline-none focus:ring-0"
              placeholder="제품, 서비스, 자료 검색..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              autoFocus
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">ESC</span>
            </kbd>
          </form>

          <div className="overflow-y-auto max-h-[calc(85vh-3rem)] custom-scrollbar">
            {/* 빠른 액세스 섹션 */}
            {!isSearching && (
              <div className="p-3">
                <div className="mb-1.5 px-2 text-xs text-muted-foreground font-medium">
                  빠른 액세스
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {quickAccess.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="justify-start h-auto py-2 px-2 text-left"
                      onClick={() => handleSelect(item.url)}
                    >
                      {item.icon}
                      <div>
                        <div className="font-medium text-xs sm:text-sm">{item.label}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 추천 검색어 */}
            {!isSearching && (
              <div className="px-3 pb-3">
                <div className="mb-1.5 px-2 text-xs text-muted-foreground font-medium">
                  추천 검색어
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recommendations.map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80 text-[11px]"
                      onClick={() => handleSearchChange(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 검색 결과 */}
            {isSearching && (
              <div className="p-3">
                {filteredResults.length > 0 ? (
                  <>
                    <div className="mb-1.5 px-2 text-xs text-muted-foreground font-medium">
                      검색 결과
                    </div>
                    <div className="space-y-1">
                      {filteredResults.map((result) => (
                        <Button
                          key={result.id}
                          variant="ghost"
                          className="w-full justify-start h-auto py-2 text-left"
                          onClick={() => handleSelect(result.url)}
                        >
                          <div className="mr-2.5 flex h-6 w-6 items-center justify-center rounded-md border">
                            <ScanSearch className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <div className="font-medium text-xs sm:text-sm truncate max-w-[400px]">
                              {result.title}
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                              {result.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="text-sm text-muted-foreground">
                      '{searchQuery}'에 대한 검색 결과가 없습니다
                    </div>
                    <Button
                      className="mt-3 text-xs h-8"
                      onClick={() => handleSelect(`/search?q=${encodeURIComponent(searchQuery)}`)}
                    >
                      자세히 찾아보기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
