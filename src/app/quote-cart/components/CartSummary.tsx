"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuoteCart } from "@/hooks/useClientStore";

export const CartSummary = () => {
  const { cartItemCount, totalQuantity } = useQuoteCart();

  // 총 가치 계산 (예시, 실제로는 가격 데이터가 필요)
  const totalValue = "견적 문의";

  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center text-blue-700">
          <ShoppingCart className="mr-2 h-5 w-5" />
          장바구니 요약
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-600">총 제품 종류</span>
          <Badge variant="outline" className="font-mono">{cartItemCount}개</Badge>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-600">총 수량</span>
          <Badge variant="outline" className="font-mono">{totalQuantity}개</Badge>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-medium text-gray-600">예상 총액</span>
          <Badge variant="outline" className="font-mono">{totalValue}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}; 