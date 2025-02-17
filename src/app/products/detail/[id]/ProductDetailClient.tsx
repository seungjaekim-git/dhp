"use client";

import React, { useState } from "react";
import { Star, Share, Download, MessageSquare, CircuitBoard, Book, Briefcase, Package, Building2, Globe, Calendar, Mail, Phone, Link2 } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger, 
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";
import { z } from "zod";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProductMainSpecs from "./ProductMainSpecs";
import ProductTechnicalInfo from "./ProductTechnicalInfo";
import ProductDocument from "./ProductDocument";
import ProductPost from "./ProductPost";

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
  const [previewFeature, setPreviewFeature] = useState<{x: number, y: number, feature: any} | null>(null);

  console.log(product)
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

          {/* Product Features & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {/* Features */}
            <div className="bg-white rounded-lg p-3 md:p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="bg-blue-100 p-1.5 md:p-2 rounded-lg mr-2">
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </span>
                주요 특징
              </h3>
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.product_features.slice(0, isFeaturesExpanded ? undefined : 6).map((item, index) => (
                    <div 
                      key={index}
                      className="group relative bg-gray-50 rounded-lg p-2 transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
                      onMouseEnter={(e) => handleFeatureMouseEnter(e, item.features)}
                      onMouseLeave={() => setPreviewFeature(null)}
                    >
                      <span className="text-sm md:text-base text-gray-700 group-hover:text-blue-600">
                        {item.features.name}
                      </span>
                    </div>
                  ))}
                </div>
                {previewFeature && (
                  <div 
                    className="fixed bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-20 w-64"
                    style={{
                      top: `${previewFeature.y}px`,
                      left: `${previewFeature.x}px`
                    }}
                  >
                    <h4 className="font-semibold text-gray-900">{previewFeature.feature.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{previewFeature.feature.description}</p>
                  </div>
                )}
                {product.product_features.length > 6 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                      className="text-sm"
                    >
                      {isFeaturesExpanded ? '접기' : `더보기 (${product.product_features.length - 6}개)`}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-lg p-3 md:p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="bg-green-100 p-1.5 md:p-2 rounded-lg mr-2">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </span>
                응용 분야
              </h3>
              <div className="space-y-3">
                {product.product_applications.slice(0, isApplicationsExpanded ? undefined : 4).map((item, index) => (
                  <div 
                    key={index}
                    className="group relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-1/3 aspect-square">
                        {item.applications.image ? (
                          <img 
                            src={item.applications.image} 
                            alt={item.applications.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-green-100">
                            <Briefcase className="w-8 h-8 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3">
                        <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                          {item.applications.name}
                        </h4>
                        {item.applications.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:line-clamp-none">
                            {item.applications.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {product.product_applications.length > 4 && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setIsApplicationsExpanded(!isApplicationsExpanded)}
                      className="text-sm"
                    >
                      {isApplicationsExpanded ? '접기' : `더보기 (${product.product_applications.length - 4}개)`}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

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
                      code: ({className, children}) => {
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
                      p: ({children}) => (
                        <p className="mb-4 transition-colors duration-200 hover:text-gray-800">{children}</p>
                      ),
                      table: ({children}) => (
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

          {/* Tabs Section */}
          <Tabs defaultValue="mainSpecs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mainSpecs">주요사양</TabsTrigger>
              <TabsTrigger value="technical">기술정보</TabsTrigger>
              <TabsTrigger value="documents">문서</TabsTrigger>
              <TabsTrigger value="posts">관련 글 모음</TabsTrigger>
            </TabsList>

            <TabsContent value="mainSpecs">
                <ProductMainSpecs product={product} />
            </TabsContent>

            <TabsContent value="technical">
              <ProductTechnicalInfo product={product} />
            </TabsContent>

            <TabsContent value="documents">
              <ProductDocument product={product} />
            </TabsContent>

            <TabsContent value="posts">
              <ProductPost product={product} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Section */}
        <div className="sticky top-16 h-fit">
          <div className="w-[400px] rounded-2xl border border-gray-200 bg-white shadow-lg">
            <ProductCard partner={product.manufacturer} product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
