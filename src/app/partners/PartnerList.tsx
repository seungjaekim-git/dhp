"use client";

import React, { useState } from "react";
import { ArrowRightIcon, Check, ChevronsUpDown, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PARTNER_DATA } from "./PartnerData";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


type FilterCategories = {
  "주요 제품 카테고리": Array<"LED 드라이버 IC" | "전원관리 IC" | "다이오드" | "수동소자" | "케이블&커넥터" | "센서" | "자동차 인증 부품">;
  "국가": string[];
  "인증": string[];
}

type NewsItem = {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
}

type ProductSeries = {
  manufacturer: string;
  series: string;
  description: string;
  features: string[];
  image?: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Macroblock 신제품 출시 안내",
    content: "새로운 LED 드라이버 IC MBI5353 출시",
    date: "2024-03-15",
    tags: ["신제품", "LED 드라이버", "기술블로그"],
    image: "/news/mbi5353.jpg"
  },
  // ... 더 많은 뉴스 아이템
];

const mockProductSeries: ProductSeries[] = [
  {
    manufacturer: "Macroblock",
    series: "MBI5353",
    description: "고성능 LED 드라이버 IC",
    features: ["16비트 그레이스케일", "고효율"],
    image: "/products/mbi5353.jpg"
  },
  // ... 더 많은 제품 시리즈
];

export const PartnerList = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterCategories>({
    "주요 제품 카테고리": [],
    "국가": [],
    "인증": []
  });

  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [openCategory, setOpenCategory] = useState<string>("");

  const filterOptions = {
    "주요 제품 카테고리": ["LED 드라이버 IC", "전원관리 IC", "다이오드", "수동소자", "케이블&커넥터", "센서", "자동차 인증 부품"],
    "국가": Array.from(new Set(PARTNER_DATA.map(partner => partner.country))),
    "인증": ["ISO 9001", "ISO 14001", "IATF 16949", "UL", "CE", "RoHS"]
  };

  const handleFilterSelect = (category: keyof FilterCategories, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const filteredPartners = PARTNER_DATA.filter(partner => {
    return (
      (selectedFilters["주요 제품 카테고리"].length === 0 ||
        partner.main_product_categories.some(cat => selectedFilters["주요 제품 카테고리"].includes(cat))) &&
      (selectedFilters["국가"].length === 0 ||
        selectedFilters["국가"].includes(partner.country))
    );
  });

  const filteredProductSeries = selectedManufacturer === "all"
    ? mockProductSeries
    : mockProductSeries.filter(p => p.manufacturer === selectedManufacturer);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* 파트너 리스트 섹션 */}
      <section>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">파트너사</h2>
              <div className="h-1 w-16 bg-blue-500 rounded-full" />
            </div>
            <div className="flex gap-2">
              {Object.entries(filterOptions).map(([category, options]) => (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition">
                      {category}
                      <ChevronsUpDown className="inline w-4 h-4 ml-2 text-blue-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px] p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-48 overflow-y-auto">
                      {options.map((option: string) => (
                        <div
                          key={option}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleFilterSelect(category as keyof FilterCategories, option)}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 border rounded-sm flex items-center justify-center",
                              selectedFilters[category as keyof FilterCategories].includes(option)
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-300"
                            )}
                          >
                            {selectedFilters[category as keyof FilterCategories].includes(option) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
          </div>
          
          {/* 선택된 필터 표시 */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.values(selectedFilters).some(filters => filters.length > 0) && (
              <button
                onClick={() => {
                  const emptyFilters = Object.keys(selectedFilters).reduce((acc, key) => {
                    acc[key as keyof FilterCategories] = [];
                    return acc;
                  }, {} as FilterCategories);
                  setSelectedFilters(emptyFilters);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>필터 초기화</span>
              </button>
            )}

            {Object.entries(selectedFilters).map(([category, options]) => 
              options.map((option) => (
                <div 
                  key={`${category}-${option}`}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  <span>{option}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-blue-800" 
                    onClick={() => handleFilterSelect(category as keyof FilterCategories, option)}
                  />
                </div>
              ))
            )}
            
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Link href={`/partners/${partner.name.toLowerCase()}`} key={partner.name}>
              <div className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg cursor-pointer overflow-hidden">
                {/* 헤더: 로고와 이름 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex justify-center items-center bg-white p-2 rounded-lg shadow-md">
                    <Image
                      src={partner.images.logo}
                      alt={`${partner.name} logo`}
                      className="w-12 h-12 object-contain"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-2">
                    <h3 className="font-bold text-xl tracking-tight group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-50 rounded-full">{partner.country}</span>
                      <span className="text-xs px-2 py-1 bg-gray-50 rounded-full">{partner.business_type}</span>
                    </div>
                  </div>
                </div>

                {/* 주요 카테고리 및 설명 */}
                <div className="space-y-4">
                  <div className="h-[1px] bg-gray-100" />
                  <div className="flex flex-wrap gap-2">
                    {partner.main_product_categories.map((category, idx) => (
                      <Badge key={idx} className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {partner.company_overview}
                  </p>
                  <div className="h-[1px] bg-gray-100" />
                </div>

                {/* 주요 연혁 */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">주요 연혁</p>
                  {partner.key_milestones.slice(-2).reverse().map((milestone, idx) => (
                    <div key={idx} className="flex gap-2 text-sm">
                      <span className="text-blue-600 font-medium">{milestone.year}</span>
                      <span className="text-gray-600">{milestone.event}</span>
                    </div>
                  ))}
                </div>

                {/* 하단 배너 */}
                <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-gradient-to-t from-sky-400 to-blue-300 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-semibold">자세히 알아보기</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 뉴스 섹션 */}
      <section>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">최신 뉴스</h2>
          <div className="h-1 w-16 bg-blue-500 rounded-full" />
        </div>
        <Carousel className="w-full">
          <div className="flex gap-6 p-4">
            {mockNews.map((news) => (
              <div key={news.id} className="min-w-[300px] bg-white rounded-2xl p-6 shadow-sm">
                {news.image && (
                  <img src={news.image} alt={news.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                )}
                <h3 className="font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{news.content}</p>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-4">{news.date}</p>
              </div>
            ))}
          </div>
        </Carousel>
      </section>

      {/* 제품 시리즈 섹션 */}
      <section>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">제품 시리즈</h2>
          <div className="h-1 w-16 bg-blue-500 rounded-full" />  
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedManufacturer === "all" ? "default" : "outline"}
            onClick={() => setSelectedManufacturer("all")}
          >
            전체
          </Button>
          {Array.from(new Set(mockProductSeries.map(p => p.manufacturer))).map((manufacturer) => (
            <Button
              key={manufacturer}
              variant={selectedManufacturer === manufacturer ? "default" : "outline"}
              onClick={() => setSelectedManufacturer(manufacturer)}
            >
              {manufacturer}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProductSeries.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
              {product.image && (
                <Image src={product.image} alt={product.series} width={40} height={40} className="w-full object-cover rounded-lg mb-4" />
              )}
              <h3 className="font-semibold mb-2">{product.series}</h3>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
