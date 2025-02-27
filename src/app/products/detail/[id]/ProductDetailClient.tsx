"use client";

import React, { useState } from "react";
import { Star, Share, Download, MessageSquare, CircuitBoard, Book, Briefcase, Package, Building2, Globe, Calendar, Mail, Phone, Link2, BookOpen, FileText, Cpu, Gauge, Layers, Puzzle } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { LEDDriverICInfoSchema } from "@/app/supabase/schemas/LEDDriverIC";
import { z } from "zod";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProductMainSpecs from "./ProductMainSpecs";
import ProductTechnicalInfo from "./ProductTechnicalInfo";
import ProductDocument from "./ProductDocument";
import ProductPost from "./ProductPost";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface Document {
  id: number;
  title: string;
  url: string;
  type_id: number;
  created_at: string;
  updated_at: string;
}

interface ProductProps {
  id: BigInt;
  name: string;
  manufacturer_id: BigInt;
  part_number: string;
  specifications: {
    led_driver_ic?: z.infer<typeof LEDDriverICInfoSchema>[];
  };
  tables: any;
  description: string;
  storage_type_id: BigInt;
  created_at: string;
  updated_at: string;
  subtitle: string;
  images: { url: string }[];
  manufacturers: {
    id: BigInt;
    name: string;
    description?: string;
    annual_revenue?: string;
    sales_markets?: string[];
    logo?: string;
    building?: string;
    linkedin_link?: string;
    facebook_link?: string;
    role?: string;
  };
  product_documents: {
    documents: Document;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
  country: string;
}

export default function ProductDetailPage({
  product,
}: {
  product: ProductProps;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const [isApplicationsExpanded, setIsApplicationsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [previewFeature, setPreviewFeature] = useState<{ x: number, y: number, feature: any } | null>(null);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
    alert(isBookmarked ? "북마크 해제됨!" : "북마크 추가됨!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  };

  const handleFeatureMouseEnter = (e: React.MouseEvent, feature: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewFeature({
      x: rect.right + 10,
      y: rect.top,
      feature
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-6 md:py-8 lg:py-10 px-4">
        {/* Left Section */}
        <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
          <div className="flex justify-between">
            {/* 왼쪽 섹션 - 카테고리, 제품명, 부제목 */}
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
              
              <h3 className="text-2xl font-bold tracking-tight hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h3>

              <div className="text-sm text-slate-600">
                {product.subtitle}
              </div>
            </div>

            {/* 오른쪽 섹션 - 좋아요/공유 버튼 */}
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

          <Separator className="my-6" />
          {/* Image Gallery */}
          <div className="space-y-3 md:space-y-4">
            <div className="w-full h-[300px] md:h-[350px] lg:h-[400px] bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]?.url || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden transform transition-all duration-200 hover:scale-105
                    ${selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-16 sm:h-20 md:h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturer Info (Mobile) */}
          <div className="md:hidden bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              {product.manufacturers.logo && (
                <img
                  src={product.manufacturers.logo}
                  alt={product.manufacturers.name}
                  className="w-16 h-16 object-contain rounded-lg border border-gray-100"
                />
              )}
              <div>
                <h3 className="font-bold text-lg">{product.manufacturers.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Globe className="w-4 h-4" />
                  <span>{product.manufacturers.country || "정보 없음"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">파트너십 시작일</p>
                  <p className="text-sm font-medium">2023.01.15</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">연간 매출</p>
                  <p className="text-sm font-medium">{product.manufacturers.annual_revenue || "정보 없음"}</p>
                </div>
              </div>
            </div>

            {product.manufacturers.sales_markets && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.manufacturers.sales_markets.map((market, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{market}</Badge>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(product.manufacturers.website, '_blank')}>
                <Link2 className="w-4 h-4 mr-1" />
                웹사이트
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(`/manufacturers/${product.manufacturers.id}`, '_blank')}>
                <Building2 className="w-4 h-4 mr-1" />
                회사정보
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Product Features & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border-2 border-slate-100 hover:border-blue-100 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 p-2.5 rounded-xl mr-2">
                  <Package className="w-5 h-5 text-blue-600" />
                </span>
                주요 특징
              </h3>
              <div className="relative max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  {product.product_features.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-slate-50 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50 hover:shadow-md border border-slate-200 hover:border-blue-200"
                      onMouseEnter={(e) => handleFeatureMouseEnter(e, item.features)}
                      onMouseLeave={() => setPreviewFeature(null)}
                    >
                      <span className="text-base text-gray-700 group-hover:text-blue-600 font-medium">
                        {item.features.name}
                      </span>
                    </div>
                  ))}
                </div>
                {previewFeature && (
                  <div
                    className="fixed bg-white border-2 border-blue-100 rounded-xl shadow-xl p-4 z-20 w-64"
                    style={{
                      top: `${previewFeature.y}px`,
                      left: `${previewFeature.x}px`
                    }}
                  >
                    <h4 className="font-semibold text-gray-900">{previewFeature.feature.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{previewFeature.feature.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border-2 border-slate-100 hover:border-green-100 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-100 p-2.5 rounded-xl mr-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </span>
                응용 분야
              </h3>
              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  {product.product_applications.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-slate-200 hover:border-green-200"
                    >
                      <div className="aspect-square w-full">
                        {item.applications.image ? (
                          <img
                            src={item.applications.image}
                            alt={item.applications.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-green-50">
                            <Briefcase className="w-10 h-10 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">
                          {item.applications.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-6" />


          {/* Product Description */}
          <Card className="w-full transition-shadow hover:shadow-lg">
            <CardContent>
              <div className="relative">
                <div className={`prose prose-sm md:prose-base lg:prose-lg max-w-none transition-all duration-300
                  [&>h1]:text-2xl [&>h1]:font-extrabold [&>h1]:mt-6 [&>h1]:mb-4 [&>h1]:text-gray-900 hover:[&>h1]:text-black
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:border-b [&>h2]:border-gray-200 hover:[&>h2]:border-gray-300 [&>h2]:pb-2 [&>h2]:mt-6 [&>h2]:mb-4 [&>h2]:text-gray-800 hover:[&>h2]:text-gray-900
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-4 [&>h3]:text-gray-800 hover:[&>h3]:text-gray-900
                  [&>p]:text-gray-700 hover:[&>p]:text-gray-800 [&>p]:leading-relaxed [&>p]:mb-4
                  [&>a]:text-blue-600 [&>a]:no-underline hover:[&>a]:underline hover:[&>a]:text-blue-700 active:[&>a]:text-blue-800
                  [&>strong]:font-bold [&>strong]:text-gray-900
                  [&>code]:text-pink-600 [&>code]:bg-gray-50 hover:[&>code]:bg-gray-100 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md
                  [&>pre]:bg-gray-900 [&>pre]:rounded-lg [&>pre]:p-4 hover:[&>pre]:bg-gray-800
                  [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 hover:[&>ul>li]:text-gray-800
                  [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 hover:[&>ol>li]:text-gray-800
                  [&>li]:my-2 [&>li]:text-gray-700
                  [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 hover:[&>blockquote]:border-gray-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 hover:[&>blockquote]:text-gray-700
                  [&>hr]:my-8 [&>hr]:border-gray-200 hover:[&>hr]:border-gray-300
                  [&>table]:border-collapse [&>table]:w-full hover:[&>table]:shadow-sm
                  [&>th]:bg-gray-100 hover:[&>th]:bg-gray-200 [&>th]:p-2 [&>th]:border [&>th]:border-gray-200
                  [&>td]:p-2 [&>td]:border [&>td]:border-gray-200 hover:[&>td]:bg-gray-50`}
                  style={{
                    maxHeight: isDescriptionExpanded ? '100%' : '400px',
                    overflow: 'hidden'
                  }}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({ className, children }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md my-4 transition-all duration-200 hover:shadow-lg"
                            customStyle={{
                              margin: '1.5em 0',
                              padding: '1.25em',
                              backgroundColor: '#1a1b26',
                              fontSize: '0.9em',
                              lineHeight: '1.6'
                            }}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="px-1.5 py-0.5 rounded-md bg-gray-50 text-sm font-mono transition-colors duration-200 hover:bg-gray-100">
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => (
                        <p className="mb-4 transition-colors duration-200 hover:text-gray-800">{children}</p>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6 rounded-lg border transition-all duration-200 hover:shadow-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            {children}
                          </table>
                        </div>
                      )
                    }}
                  >
                    {product.description}
                  </Markdown>
                  {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 z-10 transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 hover:border-gray-400"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? '접기' : '더보기'}
                </Button>
              </div>
            </CardContent>
          </Card>

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
                value="technical"
                className="group flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-slate-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md hover:bg-slate-100"
              >
                <Cpu className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                기술정보
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
              <ProductMainSpecs product={product} />
            </TabsContent>

            <TabsContent
              value="technical"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <ProductTechnicalInfo product={product} />
            </TabsContent>

            <TabsContent
              value="documents"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <ProductDocument product={product} />
            </TabsContent>

            <TabsContent
              value="posts"
              className="mt-6 animate-in slide-in-from-right-4 duration-300"
            >
              <ProductPost product={product} />
            </TabsContent>
          </Tabs>
        </div>
        {/* Right Section */}
        <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] max-w-[400px] overflow-y-auto">
          {/* Product Card */}
          <ProductCard partner={product.manufacturers} product={product} />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="container mx-auto space-y-12 py-6">
        {/* 주변 소자 섹션 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Puzzle className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl font-bold">주변 소자</h2>
          </div>
          <p className="text-slate-600">이 제품과 함께 사용되는 주요 주변 소자들입니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
          </div>
        </section>

        {/* 비슷한 스펙의 제품 섹션 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">비슷한 스펙의 제품</h2>
          </div>
          <p className="text-slate-600">유사한 성능과 특성을 가진 대체 가능한 제품들입니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
          </div>
        </section>

        {/* 추천 제품 섹션 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">추천 제품</h2>
          </div>
          <p className="text-slate-600">더 나은 성능이나 가격 경쟁력을 가진 추천 제품들입니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
            <ProductCard partner={product.manufacturers} product={product} />
          </div>
        </section>
      </div>
      
    </div>
  );
}
