"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { useCompareItems } from "../hooks/useCompareItems";
import { useToast } from "@/hooks/use-toast";

export default function CompareButton() {
  const { items, openCompareDialog } = useCompareItems();
  const { toast } = useToast();

  // 비교 다이얼로그 열기
  const handleOpenCompare = () => {
    if (items.length === 0) {
      toast({
        title: "비교할 제품이 없습니다",
        description: "제품 목록에서 비교할 제품을 추가해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    openCompareDialog();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={items.length > 0 
        ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" 
        : ""
      }
      onClick={handleOpenCompare}
    >
      <Scale className="w-3.5 h-3.5 mr-1" />
      비교하기 {items.length > 0 && `(${items.length})`}
    </Button>
  );
} 