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

interface ProductProps {
  id: number;
  name: string;
  part_number: string;
  manufacturer_id: number;
  division_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  led_driver_ic: {
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
    led_driver_ic_applications: string[];
    typical_operating_frequency: string | null;
    category_specific_attributes: any;
    led_driver_ic_certifications: string[];
  }[];
  images: { url: string }[];
  documents: {
    id: number;
    url: string;
    type: string;
    title: string;
    created_at: string;
    updated_at: string;
  }[];
}

export default function ProductDetailPage({
  product,
}: {
  product: ProductProps;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
    alert(isBookmarked ? "북마크 해제됨!" : "북마크 추가됨!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-4">
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
                  title="공유하기"
                />
                <Star
                  className={`w-6 h-6 cursor-pointer ${
                    isBookmarked ? "text-yellow-400" : "text-gray-500"
                  } hover:text-yellow-500`}
                  onClick={handleBookmarkToggle}
                  title="북마크"
                />
              </div>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Tabs Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <Tabs defaultValue="specs" className="w-full">
              {/* Instagram-style Tabs */}
              <TabsList className="flex justify-center space-x-6 border-b border-gray-200">
                <TabsTrigger
                  value="specs"
                  className="pb-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-black transition"
                >
                  기술사양
                </TabsTrigger>
                <TabsTrigger
                  value="docs"
                  className="pb-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-black transition"
                >
                  문서
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="pb-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-black transition"
                >
                  리뷰/Q&A
                </TabsTrigger>
                <TabsTrigger
                  value="blogs"
                  className="pb-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-black transition"
                >
                  관련 블로그
                </TabsTrigger>
              </TabsList>

              {/* Specifications Tab */}
              <TabsContent value="specs">
                <div className="space-y-6 mt-4">
                  {product.led_driver_ic.map((ic, icIndex) => (
                    <div key={icIndex} className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        LED Driver IC #{icIndex + 1}
                      </h3>
                      {Object.entries(ic).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                        >
                          <span className="text-gray-600 font-medium capitalize">
                            {key.replace(/_/g, " ")}
                          </span>
                          <span className="text-gray-800 text-sm">
                            {Array.isArray(value)
                              ? value.join(", ")
                              : value !== null
                              ? value.toString()
                              : "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="docs">
                <div className="mt-4 space-y-4">
                  <h3 className="text-lg font-semibold">제품 관련 문서</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {product.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <span>{doc.title}</span>
                        <Button variant="outline">
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            다운로드
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Placeholder for Reviews */}
              <TabsContent value="reviews">
                <div className="mt-4 space-y-6">
                  <h3 className="text-lg font-semibold">리뷰</h3>
                  <p>아직 리뷰가 없습니다.</p>
                </div>
              </TabsContent>

              {/* Placeholder for Blogs */}
              <TabsContent value="blogs">
                <div className="mt-4 space-y-6">
                  <h3 className="text-lg font-semibold">관련 블로그 포스트</h3>
                  <p>블로그 내용이 없습니다.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Section: Sticky Product Info Card */}
        <div className="w-[400px] rounded-2xl border border-gray-200 bg-white shadow-sm">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
