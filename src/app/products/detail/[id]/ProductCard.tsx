import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Globe,
  ExternalLink,
  DollarSign,
  Package,
  ShoppingCart,
  Heart,
  Share
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = React.useState("1-499");
  const [package_type, setPackageType] = React.useState("SOIC-16");

  return (
    <Card className="w-full rounded-[24px] border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 active:border-blue-400 transition-all duration-300">
      <CardHeader className="p-6">
        
        <div className="flex items-center justify-between group border border-r-4 border-slate-200 p-2 rounded-2xl cursor-pointer">
          <div className="flex items-center gap-4">
            {product.manufacturers.logo && (
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-slate-300 group-active:border-blue-400 transition-all duration-200">
                <Image 
                  src={product.manufacturers.logo}
                  alt={`${product.manufacturers.name} 로고`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={56}
                  height={56}
                />
              </div>
            )}
            <div>
              <h4 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200">{product.manufacturers.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200 line-clamp-1">
                  {product.country} · {product.manufacturers.business_type}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">패키지 타입</span>
            </div>
            <Select value={package_type} onValueChange={setPackageType}>
              <SelectTrigger className="w-[140px] text-sm rounded-xl hover:border-slate-400 transition-colors duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOIC-16">SOIC-16</SelectItem>
                <SelectItem value="TSSOP-16">TSSOP-16</SelectItem>
                <SelectItem value="QFN-16">QFN-16</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">주문 수량</span>
            </div>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-[140px] text-sm rounded-xl hover:border-slate-400 transition-colors duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-499">1-499개</SelectItem>
                <SelectItem value="500-999">500-999개</SelectItem>
                <SelectItem value="1000+">1000개 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-slate-700">최종 단가</span>
              <div className="flex items-center gap-1">
                <DollarSign className="h-5 w-5" />
                <span className="text-xl font-bold">2.45</span>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="price-details" className="border-t border-slate-200">
                <AccordionTrigger className="text-sm text-slate-600 hover:text-slate-800">
                  가격 상세 정보
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">단가 (개당)</span>
                    <span className="font-medium">$2.50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">수량 할인</span>
                    <span className="font-medium text-emerald-600">-10%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">패키지 추가비용</span>
                    <span className="font-medium text-rose-600">+$0.20</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4">
        <div className="flex w-full gap-4">
          <Button 
            className="flex-1 h-12 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 transition-all duration-300"
          >
            견적 요청
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
