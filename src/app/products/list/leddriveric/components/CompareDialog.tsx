"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Scale, ChevronRight, ArrowUpDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CompareItem {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
}

interface CompareDialogProps {
  items: CompareItem[];
  onClear: () => void;
  onRemoveItem?: (id: number) => void;
}

export default function CompareDialog({ items, onClear, onRemoveItem }: CompareDialogProps) {
  const [open, setOpen] = useState(false);
  
  // 비교 다이얼로그를 열기 위한 이벤트 리스너
  useEffect(() => {
    const openCompareHandler = () => setOpen(true);
    document.addEventListener('open-compare-dialog', openCompareHandler);
    
    return () => {
      document.removeEventListener('open-compare-dialog', openCompareHandler);
    };
  }, []);
  
  // 비교할 항목이 없으면 렌더링하지 않음
  if (!items || items.length === 0) return null;
  
  // 비교 항목을 개별적으로 제거
  const handleRemoveItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // props로 전달된 콜백이 있으면 사용
    if (onRemoveItem) {
      onRemoveItem(id);
      return;
    }
    
    // 아니면 이벤트를 발생시켜 상위 컴포넌트에서 처리
    const removeEvent = new CustomEvent('remove-compare-item', { 
      detail: { id }
    });
    document.dispatchEvent(removeEvent);
  };
  
  return (
    <>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-lg border-blue-200 hover:bg-blue-50"
        onClick={() => setOpen(true)}
      >
        <Scale className="h-4 w-4 text-blue-500" />
        <span className="font-medium">
          {items.length}개 제품 비교하기
        </span>
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-500" />
              LED 드라이버 IC 제품 비교
            </DialogTitle>
            <DialogDescription>
              선택한 {items.length}개 제품의 특성을 비교합니다. 최대 4개까지 비교 가능합니다.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh]">
            <div className="grid grid-cols-1 gap-6 p-1">
              {/* 제품 헤더 */}
              <div className="grid grid-cols-5 gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  비교 항목
                </div>
                {items.map(item => (
                  <div key={item.id} className="relative">
                    <div className="rounded-lg border p-4 h-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-200 hover:bg-slate-300"
                        onClick={(e) => handleRemoveItem(item.id, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      
                      <div className="mb-3 flex justify-center">
                        <div className="relative h-20 w-20 overflow-hidden">
                          <Image
                            src={item.thumbnail || "/placeholder.webp"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {item.manufacturer}
                        </div>
                        <div className="font-medium text-sm mb-1">
                          {item.part_number || item.name}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs h-7 w-full"
                          asChild
                        >
                          <Link href={`/products/detail/leddriveric/${item.id}`}>
                            상세 정보
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 비교 행 - 카테고리 */}
              <div className="grid grid-cols-5 gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-sm font-medium flex items-center">
                  <div>카테고리</div>
                </div>
                {items.map(item => (
                  <div key={`${item.id}-category`} className="p-2 rounded-lg border text-sm">
                    {item.category || "LED 드라이버 IC"}
                  </div>
                ))}
              </div>
              
              {/* 더 많은 비교 행을 추가할 수 있음 */}
              {/* 비교 행 - 제조사 */}
              <div className="grid grid-cols-5 gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-sm font-medium flex items-center">
                  <div>제조사</div>
                </div>
                {items.map(item => (
                  <div key={`${item.id}-manufacturer`} className="p-2 rounded-lg border text-sm">
                    {item.manufacturer}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={onClear}>
              <X className="h-4 w-4 mr-2" />
              비교 목록 비우기
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
