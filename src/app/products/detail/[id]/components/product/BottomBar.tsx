import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductProps } from "../../types/product";
import { useQuoteCartStore, QuoteCartItem } from "@/store/quoteCartStore"; 
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";

interface BottomBarProps {
  product: ProductProps;
}

export const BottomBar = ({ product }: BottomBarProps) => {
  // 북마크 스토어 사용
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  // 견적 장바구니 스토어 사용
  const { addItem } = useQuoteCartStore();
  const { toast } = useToast();
  
  // 북마크 토글 함수
  const onBookmarkToggle = () => {
    const productIsBookmarked = isBookmarked(Number(product.id));
    
    if (productIsBookmarked) {
      removeBookmark(Number(product.id));
    } else {
      addBookmark({
        id: Number(product.id),
        name: product.name,
        subtitle: product.subtitle,
        manufacturerName: product.manufacturers.name,
        manufacturerId: Number(product.manufacturers.id),
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || "",
        packageType: product.specifications?.led_driver_ic?.package_type || "",
        category: product.categories?.[0]?.name || "기타"
      });
    }
    
    toast({
      title: productIsBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      description: productIsBookmarked 
        ? "관심제품 목록에서 제거되었습니다." 
        : "마이페이지 관심제품 목록에서 확인하실 수 있습니다.",
    });
  };
  
  // 견적 장바구니에 1개 항목 바로 추가
  const addToQuoteCart = () => {
    try {
      const cartItem: QuoteCartItem = {
        id: Number(product.id),
        name: product.name,
        quantity: 1,
        subtitle: product.subtitle,
        manufacturerName: product.manufacturers.name,
        manufacturerId: Number(product.manufacturers.id),
        addedAt: new Date().toISOString(),
        imageUrl: product.images?.[0]?.url || "",
        packageType: product.specifications?.led_driver_ic?.package_type || "",
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
  
  // 제조사 로고 및 국가 정보 안전하게 접근
  const manufacturerLogo = product.manufacturers?.logo || 
                          product.manufacturers?.manufacturer_images?.[0]?.image_url;
  const countryName = product.manufacturers?.countries?.name || 
                      product.manufacturers?.headquarters?.split(',')?.[0]?.trim();
  
  // 북마크 상태 확인
  const productIsBookmarked = isBookmarked(Number(product.id));
                      
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-3 w-1/3">
            <div className="flex items-center gap-2">
              {manufacturerLogo && (
                <img 
                  src={manufacturerLogo} 
                  alt={product.manufacturers.name} 
                  className="h-4 w-4 object-contain"
                />
              )}
              <span className="text-xs text-slate-500">{product.manufacturers.name}</span>
              {countryName && <span className="text-xs text-slate-500 ml-1">({countryName})</span>}
            </div>
            <h4 className="font-semibold text-sm truncate mt-1">{product.name}</h4>
            <p className="text-xs text-slate-600 truncate">{product.subtitle}</p>
          </div>
          <div className="flex w-2/3">
            <Button 
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 px-5 py-2 mx-4 text-base font-medium flex-grow transition-all duration-200"
              size="lg"
              onClick={addToQuoteCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              견적 요청
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl hover:bg-rose-50 transition-colors duration-200"
              onClick={onBookmarkToggle}
            >
              <Heart className={`h-4 w-4 ${productIsBookmarked ? 'fill-rose-500 text-rose-500' : 'hover:fill-rose-200'}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 