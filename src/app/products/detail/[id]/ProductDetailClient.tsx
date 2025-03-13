"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Star, Share, Heart, FileText, Gauge, Layers, Puzzle, BookOpen
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// 타입 임포트
import { ProductProps } from "./types/product";

// 훅 임포트
import { useProductActions } from "./hooks/useProductActions";
import { useBookmarkStore } from "@/store/bookmarkStore";

// 컴포넌트 임포트
import { ImageGallery } from "./components/product/ImageGallery";
import { ProductDescription } from "./components/product/ProductDescription";
import { BottomBar } from "./components/product/BottomBar";

// 탭 컴포넌트 임포트
import { MainSpecsTab } from "./components/tabs/MainSpecsTab";
import { DocumentsTab } from "./components/tabs/DocumentsTab";
import { PostsTab } from "./components/tabs/PostsTab";

// 기존 컴포넌트 임포트
import ProductCard from "./ProductCard";
import ProductFeaturesApplications from "./ProductFeatureApplications";

// 메인 컴포넌트
export default function ProductDetailPage({
  product,
}: {
  product: ProductProps;
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // 북마크 스토어 사용
  const { isBookmarked } = useBookmarkStore();
  const productIsBookmarked = isBookmarked(Number(product.id));
  
  // useProductActions 훅 사용 - 수정된 버전
  const { handleBookmarkToggle, handleShare } = useProductActions({
    id: Number(product.id),
    name: product.name,
    subtitle: product.subtitle,
    manufacturerName: product.manufacturers.name,
    manufacturerId: Number(product.manufacturers.id),
    imageUrl: product.images?.[0]?.url || "",
    packageType: product.specifications?.led_driver_ic?.package_type || "",
    category: product.categories?.[0]?.name || "기타"
  });

  // 무거운 계산 최적화
  const documents = useMemo(() => 
    product.product_documents.map(item => item.documents), 
    [product.product_documents]
  );

  const sortedFeatures = useMemo(() => 
    [...product.product_features].sort((a, b) => 
      a.features.name.localeCompare(b.features.name)
    ), 
    [product.product_features]
  );

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      // 필요한 스크롤 기반 로직 구현 가능
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 lg:pb-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-6 md:py-8 lg:py-10 px-4">
        {/* 왼쪽/중앙 섹션 */}
        <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
          {/* 헤더 섹션 */}
          <div className="flex justify-between items-start">
            {/* 카테고리, 제품명, 부제목 */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 transition-colors duration-200"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h1>

              <div className="text-sm text-slate-600">
                {product.subtitle}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-medium">품번:</span>
                <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-mono">
                  {product.part_number}
                </code>
                
                {/* 인증 배지 */}
                {product.product_certifications && product.product_certifications.length > 0 && (
                  <div className="flex items-center gap-1 ml-3">
                    {/* 인증 배지 렌더링 로직 */}
                  </div>
                )}
              </div>
            </div>

            {/* 우측 액션 버튼 (좋아요/공유) */}
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl hover:bg-rose-50 active:bg-rose-100 transition-colors duration-200"
                      onClick={handleBookmarkToggle}
                    >
                      <Heart className={`h-4 w-4 ${productIsBookmarked ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{productIsBookmarked ? '관심 제품에서 제거' : '관심 제품에 추가'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm" 
                      className="rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200"
                      onClick={handleShare}
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

          <Separator className="my-6" />
          
          {/* 이미지 갤러리 */}
          <ImageGallery images={product.images} productName={product.name} />


          <Separator className="my-6" />

           {/* Tabs Section */}
           <Tabs defaultValue="mainSpecs" className="w-full mt-6">
            <TabsList className="flex w-full gap-1 rounded-xl bg-slate-50 p-2">
              <TabsTrigger
                value="mainSpecs"
                className="group flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-slate-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md hover:bg-slate-100"
              >
                <Gauge className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                주요사양
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="group flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-slate-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md hover:bg-slate-100"
              >
                <FileText className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                문서
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="group flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-slate-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md hover:bg-slate-100"
              >
                <BookOpen className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                관련 글 모음
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="mainSpecs"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <MainSpecsTab product={product} />
            </TabsContent>

            <TabsContent
              value="documents"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <DocumentsTab product={product} />
            </TabsContent>

            <TabsContent
              value="posts"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <PostsTab product={product} />
            </TabsContent>
          </Tabs>

          {/* 제품 특징 및 응용분야 */}
          <ProductFeaturesApplications 
            productFeatures={product.product_features}
            productApplications={product.product_applications}
          />
          
          <Separator className="my-6" />

          {/* 제품 설명 */}
          <ProductDescription 
            description={product.description} 
            isExpanded={isDescriptionExpanded}
            onToggleExpand={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          />

          <Separator className="my-6" />

      
        </div>
        
        {/* Right Section - 데스크탑 */}
        <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] max-w-[400px] overflow-y-auto">
          {/* Product Card - 데이터 전달 방식 수정 */}
          <ProductCard 
            product={{
              id: Number(product.id),
              name: product.name,
              subtitle: product.subtitle,
              manufacturers: {
                id: Number(product.manufacturers.id),
                name: product.manufacturers.name,
                country_id: Number(product.manufacturers.country_id || 0),
                business_type: product.manufacturers.business_type || "",
                website_url: product.manufacturers.website_url || product.manufacturers.linkedin_link || "",
                manufacturer_images: product.manufacturers.manufacturer_images || [],
                headquarters: product.manufacturers.headquarters,
                countries: product.manufacturers.countries
              }
            }} 
          />
        </div>
        
        {/* 모바일 하단 메뉴바 */}
        <BottomBar 
          product={product}
        />
      </div>

      {/* 여기에 추천 제품 섹션 등이 있음 */}
    </div>
  );
}
