"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Factory, ExternalLink, Plus, Minus, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuoteCart, useBookmarks } from "@/hooks/useClientStore";
import { useToast } from "@/hooks/use-toast";
import { QuoteCartItem } from "@/store/quoteCartStore";

interface ManufacturerGroupProps {
  manufacturerName: string;
  items: QuoteCartItem[];
}

export const ManufacturerGroup = ({ manufacturerName, items }: ManufacturerGroupProps) => {
  const { removeFromCart, updateQuantity } = useQuoteCart();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();

  // 북마크 전환 함수
  const handleToggleBookmark = (item: any) => {
    const bookmarkItem = {
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      manufacturerName: item.manufacturerName,
      manufacturerId: item.manufacturerId,
      addedAt: new Date().toISOString(),
      imageUrl: item.imageUrl || "",
      packageType: item.packageType || "",
      category: item.category || "기타"
    };
    
    const isNowBookmarked = toggleBookmark(bookmarkItem);
    
    toast({
      title: isNowBookmarked ? "북마크에 추가되었습니다" : "북마크가 해제되었습니다",
      description: isNowBookmarked 
        ? "관심제품 목록에서 확인하실 수 있습니다."
        : "관심제품 목록에서 제거되었습니다.",
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Factory className="h-5 w-5 mr-2 text-blue-600" />
            {manufacturerName}
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            {items.length}개 제품
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-4">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-4">
                {/* 제품 이미지 */}
                <div className="shrink-0">
                  {item.imageUrl ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      {item.name.substring(0, 2)}
                    </div>
                  )}
                </div>
                
                {/* 제품 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        <Link href={`/products/detail/${item.id}`} className="hover:text-blue-600 hover:underline">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                      
                      {item.packageType && (
                        <Badge variant="outline" className="mt-2 font-mono">
                          {item.packageType}
                        </Badge>
                      )}
                    </div>
                    
                    {/* 버튼 영역 */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-blue-500"
                        asChild
                      >
                        <Link href={`/products/detail/${item.id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      {/* 북마크 버튼 */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-rose-500"
                        onClick={() => handleToggleBookmark(item)}
                      >
                        <Heart className={`h-4 w-4 ${isBookmarked(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* 수량 조절 */}
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-500 mr-3">수량:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 1) {
                            updateQuantity(item.id, val);
                          }
                        }}
                        className="h-8 w-16 text-center border-x border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="ml-auto text-sm font-medium">
                      요청일: {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}; 