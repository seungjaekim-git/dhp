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
  Check
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import React, { useState } from "react";

// 장바구니 아이템 인터페이스 정의
interface QuoteCartItem {
  id: number;
  name: string;
  quantity: number;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
}

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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedPackage, setSelectedPackage] = React.useState(product.packaging_info?.[0]?.type || "");
  const [quantity, setQuantity] = React.useState("1");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  // 제조사 로고 이미지 URL (안전하게 접근)
  const manufacturerLogo = product.manufacturers?.manufacturer_images?.[0]?.image_url;
  
  // 국가 정보 안전하게 접근
  const countryName = product.manufacturers?.countries?.name || 
                      product.manufacturers?.headquarters?.split(',')?.[0]?.trim() || 
                      "Unknown";

  // 장바구니에 제품 추가 함수
  const addToQuoteCart = () => {
    setIsAdding(true);
    
    try {
      // 현재 장바구니 가져오기
      const storedCart = localStorage.getItem('quoteCart');
      const cart: QuoteCartItem[] = storedCart ? JSON.parse(storedCart) : [];
      
      // 수량 파싱 (숫자가 아니면 1로 기본값 설정)
      const parsedQuantity = parseInt(quantity, 10);
      const validQuantity = isNaN(parsedQuantity) || parsedQuantity < 1 ? 1 : parsedQuantity;
      
      // 이미 장바구니에 있는 상품인지 확인
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // 이미 존재하는 아이템이면 수량만 업데이트
        cart[existingItemIndex].quantity += validQuantity;
        cart[existingItemIndex].addedAt = new Date().toISOString();
      } else {
        // 새 아이템 생성
        const newItem: QuoteCartItem = {
          id: product.id,
          name: product.name,
          quantity: validQuantity,
          subtitle: product.subtitle,
          manufacturerName: product.manufacturers.name,
          manufacturerId: product.manufacturers.id,
          addedAt: new Date().toISOString(),
          imageUrl: manufacturerLogo,
          packageType: product.packaging_info?.[0]?.type
        };
        
        cart.push(newItem);
      }
      
      // localStorage에 저장
      localStorage.setItem('quoteCart', JSON.stringify(cart));
      
      // 성공 토스트 메시지 표시
      toast({
        title: "견적 요청 장바구니에 추가되었습니다",
        description: `${product.name} ${validQuantity}개가 견적 요청 목록에 추가되었습니다.`,
        variant: "success",
        action: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => window.location.href = '/quote-cart'}
                >
                  견적함 보기
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>견적 요청 목록으로 이동합니다</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      });
    } catch (error) {
      console.error("Failed to add item to quote cart:", error);
      // 오류 토스트 메시지 표시
      toast({
        title: "견적 요청 실패",
        description: "장바구니에 추가하는 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
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
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>관심 제품에 추가</p>
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
                    onChange={(e) => setQuantity(e.target.value)}
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
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <span className="mr-2">처리 중</span>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              </>
            ) : (
              <>
                견적 추가
                <Check className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 rounded-xl hover:bg-slate-100 active:bg-slate-200 hover:border-slate-400 active:border-blue-400 transition-all duration-200"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
