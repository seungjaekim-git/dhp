import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductProps } from "../../types/product";

interface BottomBarProps {
  product: ProductProps;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export const BottomBar = ({ 
  product, 
  isBookmarked, 
  onBookmarkToggle 
}: BottomBarProps) => {
  // 제조사 로고 및 국가 정보 안전하게 접근
  const manufacturerLogo = product.manufacturers?.logo || 
                          product.manufacturers?.manufacturer_images?.[0]?.image_url;
  const countryName = product.manufacturers?.countries?.name || 
                      product.manufacturers?.headquarters?.split(',')?.[0]?.trim();
                      
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
            >
              견적 요청
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl hover:bg-rose-50 transition-colors duration-200"
              onClick={onBookmarkToggle}
            >
              <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'hover:fill-rose-200'}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 