"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  ExternalLink,
  Package,
  ShoppingCart,
  Heart,
  Share,
  Info,
  Check,
  Loader2
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useQuoteCart } from "@/hooks/useClientStore";
import Link from "next/link";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useQuoteCartStore, QuoteCartItem } from "@/store/quoteCartStore";
import { ToastAction } from "@/components/ui/toast";
import { useProductActions } from "./hooks/useProductActions";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    subtitle: string;
    manufacturers: {
      id: number;
      name: string;
      country_id: number;
      business_type: string;
      website_url: string;
      manufacturer_images: {
        image_url: string;
      }[];
      headquarters?: string;
      countries?: { name: string };
    };
    packaging_info?: {
      type: string;
      quantity: number;
      unit: string;
    }[];
    images?: { url: string }[];
    category?: { name: string };
  };
}

export default function ProductCardClient({ product }: ProductCardProps) {
  const [selectedPackage, setSelectedPackage] = React.useState(product.packaging_info?.[0]?.type || "");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Zustand 스토어 사용
  const { addToCart } = useQuoteCart();
  
  // 제조사 로고 이미지 URL (안전하게 접근)
  const manufacturerLogo = product.manufacturers?.manufacturer_images?.[0]?.image_url;
  
  // 국가 정보 안전하게 접근
  const countryName = product.manufacturers?.countries?.name || 
                      product.manufacturers?.headquarters?.split(',')?.[0]?.trim() || 
                      "Unknown";

  // 북마크 및 장바구니 스토어 사용
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const { addItem } = useQuoteCartStore();
  
  // 북마크 상태 확인
  const isProductBookmarked = isBookmarked(product.id);

  // 견적 장바구니에 추가 함수
  const addToQuoteCart = () => {
    try {
      const cartItem: QuoteCartItem = {
        id: product.id,
        name: product.name,
        quantity: 1,
        subtitle: product.subtitle,
        manufacturerName: product.manufacturers.name,
        manufacturerId: product.manufacturers.id,
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || "",
        packageType: product.packaging_info?.[0]?.type || "",
      };
      
      addItem(cartItem);
      
      toast({
        title: "견적 장바구니에 추가되었습니다",
        description: "견적 요청 목록에 제품이 추가되었습니다.",
        action: (
          <ToastAction altText="견적함으로 이동" asChild>
            <Link href="/quote-cart">견적함 보기</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      toast({
        title: "오류가 발생했습니다",
        description: "장바구니 추가 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  // 북마크 토글 함수
  const handleToggleBookmark = () => {
    if (isProductBookmarked) {
      removeBookmark(product.id);
    } else {
      addBookmark({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        manufacturerName: product.manufacturers.name,
        manufacturerId: product.manufacturers.id,
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || "",
        packageType: product.packaging_info?.[0]?.type || "",
        category: product.category?.name || "기타"
      });
    }
    
    toast({
      title: isProductBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      description: isProductBookmarked 
        ? "관심제품 목록에서 제거되었습니다." 
        : "마이페이지 관심제품 목록에서 확인하실 수 있습니다.",
    });
  };

  return (
    <Card className="w-full rounded-[24px] border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 active:border-blue-400 transition-all duration-300">
      <CardHeader className="p-6">
        
        <div className="flex items-center justify-between group border border-r-4 border-slate-200 p-2 rounded-2xl cursor-pointer">
          <div className="flex items-center gap-4">
            {manufacturerLogo && (
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-slate-300 group-active:border-blue-400 transition-all duration-200">
                <Image 
                  src={manufacturerLogo}
                  alt={`${product.manufacturers?.name || '제조사'} 로고`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={56}
                  height={56}
                />
              </div>
            )}
            <div>
              <h4 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200">{product.manufacturers?.name || '제조사 정보 없음'}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200 line-clamp-1">
                  {countryName} {product.manufacturers?.business_type && `· ${product.manufacturers.business_type}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {product.manufacturers?.website_url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-xl shadow-sm hover:shadow-md hover:bg-slate-100 active:bg-slate-200 hover:border-slate-300 active:border-blue-400 transition-all duration-200"
                      onClick={() => window.open(product.manufacturers.website_url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 group-hover:text-blue-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>제조사 웹사이트 방문</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-xl hover:bg-slate-100 active:bg-slate-200"
                      onClick={handleToggleBookmark}
                    >
                      <Heart className={`h-4 w-4 ${isProductBookmarked ? 'fill-rose-500 text-rose-500' : 'hover:fill-rose-200'}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isProductBookmarked ? '북마크에서 제거' : '북마크에 추가'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-xl hover:bg-slate-100 active:bg-slate-200"
                      onClick={() => {
                        // 공유하기 기능
                        navigator.clipboard.writeText(window.location.href);
                        toast({
                          title: "링크가 복사되었습니다",
                          description: "클립보드에 제품 링크가 복사되었습니다.",
                          variant: "default",
                        });
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>제품 링크 공유</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            {product.subtitle}
          </div>
        </div>

      </CardHeader>

      <CardContent className="px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">패키지 타입</span>
              <span className="text-sm font-medium">
                {product.packaging_info?.[0]?.type || "정보 없음"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-medium text-slate-700">주문 정보</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                재고 있음
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">주문 수량</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="h-8 w-28 text-center border border-slate-200 rounded-xl px-2 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="수량 입력"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Info className="h-3.5 w-3.5" />
              <span>대량 주문은 견적 요청을 통해 문의해주세요</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4">
        <div className="flex w-full gap-4">
          <Button 
            className="flex-1 h-12 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 transition-all duration-300"
            onClick={addToQuoteCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                견적 요청
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-12 w-12 rounded-xl hover:bg-slate-100 active:bg-slate-200 hover:border-slate-400 active:border-blue-400 transition-all duration-200 ${isProductBookmarked ? 'border-rose-300 text-rose-500' : ''}`}
            onClick={handleToggleBookmark}
          >
            <Heart className={`h-5 w-5 ${isProductBookmarked ? 'fill-rose-500' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 