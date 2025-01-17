"use client";

import React, { useState } from "react";
import { Star, Share } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Settings, FileText, MessageSquare, File, Zap, Package, Cpu, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LedDriverIC {
  id: number;
  subtitle: string;
  product_id: number;
  topologies: string[];
  category_id: number;
  dimming_methods: string[];
  number_of_outputs: number;
  input_voltage_range: string;
  output_current_range: string | null;
  output_voltage_range: string | null;
  led_driver_ic_options: string[];
  operating_temperature: string;
  typical_input_voltage: string | null;
  led_driver_ic_features: string[];
  typical_output_current: string | null;
  typical_output_voltage: string | null;
  operating_frequency_range: string | null;
  led_driver_ic_applications: {
    id: number;
    name: string;
  }[];
  typical_operating_frequency: string | null;
  category_specific_attributes: any;
  led_driver_ic_certifications: {
    id: number;
    name: string;
  }[];
}

interface Document {
  id: number;
  url: string;
  type: string;
  title: string;
  subtitle?: string;
  certification_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

interface ProductProps {
  id: number;
  name: string;
  part_number: string;
  manufacturer_id: number;
  division_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  led_driver_ic: LedDriverIC[];
  images: { url: string }[];
  documents: Document[];
  manufacturer: any;
}

export default function ProductDetailPage({
  product,
}: {
  product: ProductProps;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
    alert(isBookmarked ? "북마크 해제됨!" : "북마크 추가됨!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  };

  const renderDocumentSection = (type: string, title: string, icon: React.ReactNode, bgColor: string) => {
    const filteredDocs = product.documents.filter(doc => doc.type === type);
    
    if (filteredDocs.length === 0) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          {icon}
          {title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border-2 rounded-lg hover:shadow-lg transition space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold text-lg">{doc.title}</h5>
                  {doc.subtitle && <p className="text-sm text-gray-600">{doc.subtitle}</p>}
                </div>
                <Badge variant="outline" className={bgColor}>{title}</Badge>
              </div>
              {doc.certification_date && (
                <div className="text-sm text-gray-500">
                  <p>인증일: {doc.certification_date}</p>
                  {doc.expiry_date && <p>만료일: {doc.expiry_date}</p>}
                </div>
              )}
              <Button variant="outline" className="w-full mt-2">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  다운로드
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-4 relative">
        {/* Left Section: Image and Options */}
        <div className="col-span-2 space-y-6">
          {/* Product Image */}
          <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[0]?.url || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <Share
                  className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={handleShare}
                />
                <Star
                  className={`w-6 h-6 cursor-pointer ${
                    isBookmarked ? "text-yellow-400" : "text-gray-500"
                  } hover:text-yellow-500`}
                  onClick={handleBookmarkToggle}
                />
              </div>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Tabs Section */}
          <div className="sticky top-16 z-10 bg-white shadow-md">
            <Tabs defaultValue="specs">
              <TabsList className="w-full h-auto grid grid-cols-4 justify-stretch border-gray-200">
                <TabsTrigger value="specs" className="flex items-center gap-4 py-4">
                  <Settings size={24} className="hidden md:block" />
                  기술사양
                </TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center gap-4 py-4">
                  <FileText size={24} className="hidden md:block" />
                  문서
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-4 py-4">
                  <MessageSquare size={24} className="hidden md:block" />
                  리뷰/Q&A
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex items-center gap-4 py-4">
                  <File size={24} className="hidden md:block" />
                  관련 블로그
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs">
                <div className="space-y-8 p-6">
                  {product.led_driver_ic.map((ic, index) => (
                    <div key={index} className="space-y-8">
                      {/* 주요 사양 섹션 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Zap className="w-6 h-6 text-blue-600" />
                          <h4 className="text-lg font-semibold text-gray-700">주요 사양</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button 
                            variant="outline"
                            className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-50 border-2"
                            onClick={() => setSelectedSpec('input_voltage_range')}
                          >
                            <div className="text-sm font-medium text-blue-600">입력 전압</div>
                            <div className="font-mono text-2xl font-bold">
                              {JSON.parse(ic.input_voltage_range || "[0,0]").join("~")}V
                            </div>
                            <div className="text-xs text-gray-500">V<sub>in</sub></div>
                          </Button>

                          <Button 
                            variant="outline"
                            className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-50 border-2"
                            onClick={() => setSelectedSpec('output_current_range')}
                          >
                            <div className="text-sm font-medium text-blue-600">출력 전류</div>
                            <div className="font-mono text-2xl font-bold">
                              {ic.output_current_range ? 
                                `${JSON.parse(ic.output_current_range).join("~")}mA` : 
                                "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">I<sub>out</sub></div>
                          </Button>

                          <Button 
                            variant="outline"
                            className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-blue-50 border-2"
                            onClick={() => setSelectedSpec('operating_temperature')}
                          >
                            <div className="text-sm font-medium text-blue-600">동작 온도</div>
                            <div className="font-mono text-2xl font-bold">
                              {JSON.parse(ic.operating_temperature || "[0,0]").join("~")}°C
                            </div>
                            <div className="text-xs text-gray-500">T<sub>op</sub></div>
                          </Button>
                        </div>
                      </div>

                      {/* 패키지 정보 섹션 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-6 h-6 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-700">패키지 정보</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {ic.led_driver_ic_options.map((option, index) => (
                            <div key={index} className="p-4 border-2 rounded-lg bg-purple-50/20">
                              <h5 className="text-sm font-medium text-purple-600 mb-2">
                                {typeof option === 'string' ? option : '옵션 정보'}
                              </h5>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 기술 정보 섹션 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-6 h-6 text-amber-600" />
                          <h4 className="text-lg font-semibold text-gray-700">기술 정보</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border-2 rounded-lg">
                            <h5 className="text-sm font-medium text-amber-600 mb-2">토폴로지</h5>
                            <div className="flex flex-wrap gap-2">
                              {ic.topologies?.map((topology, index) => (
                                <Badge key={index} variant="outline" className="px-3 py-1 bg-amber-50">
                                  {topology}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 border-2 rounded-lg">
                            <h5 className="text-sm font-medium text-amber-600 mb-2">디밍 방식</h5>
                            <div className="flex flex-wrap gap-2">
                              {ic.dimming_methods?.map((method, index) => (
                                <Badge key={index} variant="outline" className="px-3 py-1 bg-amber-50">
                                  {method}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 인증 및 응용 섹션 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-pink-600" />
                          <h4 className="text-lg font-semibold text-gray-700">인증 및 응용</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border-2 rounded-lg">
                            <h5 className="text-sm font-medium text-pink-600 mb-2">인증</h5>
                            <div className="flex flex-wrap gap-2">
                              {ic.led_driver_ic_certifications?.map((cert, index) => (
                                <Badge key={index} variant="outline" className="px-3 py-1 bg-pink-50">
                                  {cert.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 border-2 rounded-lg">
                            <h5 className="text-sm font-medium text-pink-600 mb-2">응용분야</h5>
                            <div className="flex flex-wrap gap-2">
                              {ic.led_driver_ic_applications?.map((app, index) => (
                                <Badge key={index} variant="outline" className="px-3 py-1 bg-pink-50">
                                  {app.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="docs">
                <div className="mt-6 space-y-8">
                  <h3 className="text-2xl font-bold text-gray-800 border-b pb-4">제품 관련 문서</h3>
                  
                  {renderDocumentSection(
                    'certification',
                    '인증서',
                    <Award className="w-5 h-5 text-green-600" />,
                    'bg-green-50'
                  )}
                  
                  {renderDocumentSection(
                    'datasheet',
                    '데이터시트',
                    <FileText className="w-5 h-5 text-blue-600" />,
                    'bg-blue-50'
                  )}
                  
                  {renderDocumentSection(
                    'technical',
                    '기술 문서',
                    <Cpu className="w-5 h-5 text-amber-600" />,
                    'bg-amber-50'
                  )}
                  
                  {renderDocumentSection(
                    'support',
                    '기술 지원',
                    <MessageSquare className="w-5 h-5 text-purple-600" />,
                    'bg-purple-50'
                  )}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="mt-6 space-y-6">
                  <h3 className="text-xl md:text-2xl font-semibold">리뷰</h3>
                  <p className="text-lg md:text-xl">아직 리뷰가 없습니다.</p>
                </div>
              </TabsContent>

              {/* Blogs Tab */}
              <TabsContent value="blogs">
                <div className="mt-6 space-y-6">
                  <h3 className="text-xl md:text-2xl font-semibold">관련 블로그 포스트</h3>
                  <p className="text-lg md:text-xl">블로그 내용이 없습니다.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Section: Sticky Product Info Card */}
        <div className="sticky top-16 h-fit">
          <div className="w-[400px] rounded-2xl border border-gray-200 bg-white shadow-lg">
            <ProductCard partner={product.manufacturer} product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
