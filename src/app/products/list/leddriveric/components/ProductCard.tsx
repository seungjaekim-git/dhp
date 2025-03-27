"use client";

import React from "react";
import Image from "next/image";
import { ProductSchema } from "../leddrivericListPage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Scale, ExternalLink, Heart, CheckCircle2, ZapIcon, BoxIcon, Activity as CurrentIcon, ThermometerIcon, ClockIcon } from "lucide-react";
import { useBookmarks, useQuoteCart } from "@/hooks/useClientStore";
import { useCompareItems } from "../hooks/useCompareItems";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: ProductSchema;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const bookmarkStore = useBookmarks();
  const quoteCartStore = useQuoteCart();
  const compareStore = useCompareItems();

  // 북마크 확인
  const isBookmarked = bookmarkStore?.isBookmarked?.(product.id) || false;
  
  // 견적카트 확인
  const cartItems = quoteCartStore ? (quoteCartStore as any).cartItems : [];
  const isInQuoteCart = Array.isArray(cartItems) ? cartItems.some((item: any) => item.id === product.id) : false;
  
  // 비교 항목 확인
  const isInCompare = compareStore?.items?.some((item: any) => item.id === product.id) || false;

  // 북마크 토글 처리
  const handleToggleBookmark = () => {
    if (!bookmarkStore) return;
    
    if (isBookmarked) {
      bookmarkStore.removeBookmark(product.id);
      
      toast({
        title: "북마크 제거됨",
        description: `${product.part_number || product.name} 제품이 북마크에서 제거되었습니다.`,
      });
    } else {
      const bookmarkItem = {
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        manufacturerName: product.manufacturer.name,
        manufacturerId: product.manufacturer.id,
        part_number: product.part_number || "",
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
        addedAt: new Date().toISOString()
      };
      
      bookmarkStore.addBookmark(bookmarkItem);
      
      toast({
        title: "북마크 추가됨",
        description: `${product.part_number || product.name} 제품이 북마크에 추가되었습니다.`,
      });
    }
  };

  // 견적서에 추가 처리
  const handleAddToQuoteCart = () => {
    if (!quoteCartStore) return;
    
    if (!isInQuoteCart) {
      const cartItem = {
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        manufacturerName: product.manufacturer.name,
        manufacturerId: product.manufacturer.id,
        part_number: product.part_number || "",
        quantity: 1,
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
        addedAt: new Date().toISOString()
      };
      
      // useQuoteCart 훅의 API에 맞게 호출
      if (typeof (quoteCartStore as any).addToCart === 'function') {
        (quoteCartStore as any).addToCart(cartItem);
      } else if (typeof (quoteCartStore as any).addItem === 'function') {
        (quoteCartStore as any).addItem(cartItem);
      }
      
      toast({
        title: "견적서에 추가됨",
        description: `${product.part_number || product.name} 제품이 견적서에 추가되었습니다.`,
      });
    } else {
      toast({
        title: "이미 견적서에 있음",
        description: `${product.part_number || product.name} 제품은 이미 견적서에 있습니다.`,
        variant: "destructive",
      });
    }
  };

  // 비교 항목에 추가 처리
  const handleToggleCompare = () => {
    if (!compareStore) return;
    
    if (isInCompare) {
      if (typeof compareStore.removeItem === 'function') {
        compareStore.removeItem(product.id);
      }
      
      toast({
        title: "비교 항목에서 제거됨",
        description: `${product.part_number || product.name} 제품이 비교 항목에서 제거되었습니다.`,
      });
    } else {
      if (compareStore.items && compareStore.items.length >= 4) {
        toast({
          title: "비교 항목 제한",
          description: "최대 4개의 제품만 비교할 수 있습니다.",
          variant: "destructive",
        });
        return;
      }
      
      const compareItem = {
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer.name,
        part_number: product.part_number || "",
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
      };
      
      if (typeof compareStore.addItem === 'function') {
        compareStore.addItem(compareItem);
      }
      
      toast({
        title: "비교 항목에 추가됨",
        description: (
          <div className="flex flex-col space-y-2">
            <p>{product.part_number || product.name} 제품이 비교 항목에 추가되었습니다.</p>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 text-xs"
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('open-compare-dialog'));
                }}
              >
                비교하기 열기
              </Button>
            </div>
          </div>
        ),
        duration: 5000,
      });
    }
  };

  // 제품의 인증 표시
  const renderCertifications = () => {
    if (!product.certifications || product.certifications.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {product.certifications.slice(0, 3).map((cert, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="text-[10px] h-5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {cert.certification.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{cert.certification.name} 인증</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {product.certifications.length > 3 && (
          <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700">
            +{product.certifications.length - 3}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md group">
      <CardHeader className="p-3 pb-2 relative">
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleBookmark}
            className={cn(
              "h-7 w-7 rounded-full bg-white/90 shadow-sm",
              isBookmarked ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("h-4 w-4", isBookmarked && "fill-current")} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToQuoteCart}
            className={cn(
              "h-7 w-7 rounded-full bg-white/90 shadow-sm",
              isInQuoteCart ? "text-green-500 hover:text-green-600" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className={cn("h-4 w-4", isInQuoteCart && "fill-slate-200 stroke-green-500")} />
          </Button>
        </div>
      
        <div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] px-2 py-0 h-5 mb-1">
            {product.manufacturer.name}
          </Badge>
          <CardTitle className="text-base font-semibold line-clamp-2 leading-tight">
            {product.part_number || product.name}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-xs mt-1">
          {product.subtitle || "LED 드라이버 IC"}
        </CardDescription>
        {renderCertifications()}
      </CardHeader>
      <CardContent className="p-3 pt-1 flex-grow">
        <div className="aspect-video relative mb-3 bg-slate-50 rounded-md overflow-hidden">
          <Link href={`/products/detail/leddriveric/${product.id}`}>
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-contain p-2 transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                이미지 없음
              </div>
            )}
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-3">
          {/* 입력 전압 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <ZapIcon className="w-3 h-3 mr-1 text-amber-500" />
              입력 전압
            </div>
            <div className="font-medium">
              {product.specifications?.input_voltage ? 
                `${product.specifications.input_voltage.min || '?'}-${product.specifications.input_voltage.max || '?'} ${product.specifications.input_voltage.unit || 'V'}` : 
                '정보 없음'}
            </div>
          </div>
          
          {/* 출력 전류 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <CurrentIcon className="w-3 h-3 mr-1 text-emerald-500" />
              출력 전류
            </div>
            <div className="font-medium">
              {product.specifications?.output_current ? 
                `${product.specifications.output_current.min || '?'}-${product.specifications.output_current.max || '?'} ${product.specifications.output_current.unit || 'mA'}` : 
                '정보 없음'}
            </div>
          </div>
          
          {/* 패키지 타입 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <BoxIcon className="w-3 h-3 mr-1 text-blue-500" />
              패키지
            </div>
            <div className="font-medium truncate">
              {product.specifications?.package_type || '정보 없음'}
            </div>
          </div>
          
          {/* 채널 수 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <div className="w-3 h-3 mr-1 flex items-center justify-center text-purple-500 font-bold text-[8px]">CH</div>
              채널 수
            </div>
            <div className="font-medium">
              {product.specifications?.channels || '정보 없음'}
            </div>
          </div>
          
          {/* 스위칭 주파수 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <ClockIcon className="w-3 h-3 mr-1 text-indigo-500" />
              스위칭 주파수
            </div>
            <div className="font-medium">
              {product.specifications?.switching_frequency ? 
                `${product.specifications.switching_frequency.typ || product.specifications.switching_frequency.max || '?'} ${product.specifications.switching_frequency.unit || 'kHz'}` : 
                '정보 없음'}
            </div>
          </div>
          
          {/* 동작 온도 */}
          <div className="p-1.5 bg-slate-50 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <ThermometerIcon className="w-3 h-3 mr-1 text-red-500" />
              동작 온도
            </div>
            <div className="font-medium">
              {product.specifications?.operating_temperature ? 
                `${product.specifications.operating_temperature.min || '?'}~${product.specifications.operating_temperature.max || '?'}${product.specifications.operating_temperature.unit || '°C'}` : 
                '정보 없음'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleToggleCompare}
          className={cn(
            "h-8 flex-1 text-[11px]",
            isInCompare && "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
          )}
        >
          <Scale className="w-3 h-3 mr-1" />
          {isInCompare ? "비교중" : "비교하기"}
        </Button>
        <Link href={`/products/detail/leddriveric/${product.id}`} className="flex-1">
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 w-full text-[11px]"
          >
            상세보기
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 