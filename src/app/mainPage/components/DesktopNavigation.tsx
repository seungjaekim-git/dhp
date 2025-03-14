"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "lodash";
import { 
  ArrowLeft, ShoppingCart, Heart, FileText, Trash2, ExternalLink, 
  MessageCircle, Check, ChevronRight, Phone, Mail, 
  MessageSquare, Cpu, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion"; // AnimatePresence 제거
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

// 기본 카테고리 데이터 (navigationConfig.products.categories가 로드되지 않는 경우를 대비)
const DEFAULT_CATEGORIES = [
  {
    title: "LED 드라이버 IC",
    link: "/products/list/leddriveric",
    seo: { description: "고성능 LED 드라이버 IC" },
    content: []
  },
  {
    title: "다이오드",
    link: "/products/list/diode",
    seo: { description: "정류 다이오드, 쇼트키 등" },
    content: []
  },
  {
    title: "센서",
    link: "/products/list/sensor",
    seo: { description: "온도, 압력, 포토 센서 등" },
    content: []
  },
  {
    title: "커넥터&케이블",
    link: "/products/list/connector",
    seo: { description: "산업용 커넥터 및 케이블" },
    content: []
  },
  {
    title: "PMIC",
    link: "/products/list/power-ic",
    seo: { description: "전원관리 IC" },
    content: []
  },
  {
    title: "수동소자",
    link: "/products/list/passive",
    seo: { description: "저항, 커패시터, 인덕터" },
    content: []
  }
];

// 안전하게 navigationConfig 임포트
let navigationConfig;
try {
  navigationConfig = require("@/config/navigation").navigationConfig;
  
  // navigationConfig.products.categories가 없으면 기본값 사용
  if (!navigationConfig?.products?.categories || 
      !Array.isArray(navigationConfig.products.categories) || 
      navigationConfig.products.categories.length === 0) {
    navigationConfig = {
      ...navigationConfig,
      products: {
        ...navigationConfig?.products,
        categories: DEFAULT_CATEGORIES,
        title: "제품"
      }
    };
  }
} catch (error) {
  // navigationConfig를 불러오지 못 경우 기본값 설정
  navigationConfig = {
    company: { title: "회사소개", link: "/about", items: [] },
    products: { title: "제품", categories: DEFAULT_CATEGORIES },
    partners: { title: "파트너사", items: [] },
    support: { 
      title: "고객지원", 
      inquiry: { title: "문의", items: [] },
      contact: { title: "연락처", items: [] },
      resources: { title: "자료", items: [] }
    }
  };
}

// SupportLink 컴포넌트
const SupportLink = React.memo(({ title, description, href = "#" }: { title: string, description: string, href?: string }) => (
  <Link href={href} className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200">
    <div className="flex items-center">
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base flex items-center gap-1">
          {title}
          <svg viewBox="0 0 12 12" width="10px" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform group-hover:rotate-3 dark:fill-neutral-500 fill-neutral-900">
            <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
          </svg>
        </div>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{description}</p>
        )}
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && 
         prevProps.description === nextProps.description &&
         prevProps.href === nextProps.href;
});
SupportLink.displayName = "SupportLink";

// 카테고리 링크 컴포넌트
interface CategoryLinkProps {
  href: string;
  title: string;
  description: string;
}

const CategoryLink = React.memo(({ href, title, description }: CategoryLinkProps) => (
  <Link 
    href={href} 
    className="group block p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:bg-neutral-200"
  >
    <div className="flex items-center">
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base">{title}</div>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{description}</p>
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return prevProps.href === nextProps.href && 
         prevProps.title === nextProps.title && 
         prevProps.description === nextProps.description;
});
CategoryLink.displayName = "CategoryLink";

// 인터페이스 정의
interface PartnerItem {
  title: string;
  description: string;
  icon?: string;
  partnerStory?: {
    text: string;
    learnMoreLink: string;
    image?: string;
  };
}

interface InquiryItem {
  title: string;
  link: string;
}

export const DesktopNavigation = () => {
  const [selectedPartner, setSelectedPartner] = React.useState<PartnerItem | null>(
    navigationConfig.partners.items?.[0] || null
  );
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [expandedSupportSection, setExpandedSupportSection] = React.useState<string | null>("inquiry");
  
  const debouncedSetSelectedMenu = React.useCallback(
    debounce((value: string) => setSelectedMenu(value), 100),
    []
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger onMouseEnter={() => debouncedSetSelectedMenu(navigationConfig.company.title)} className="text-gray-700 hover:text-blue-600">
            {navigationConfig.company.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 justify-center gap-4 p-6 w-full min-w-[400px]">
              <li className="row-span-4 col-span-1">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-between rounded-lg bg-[url('/images/background_img.webp')] bg-cover bg-center p-8 no-underline outline-none hover:shadow-xl transition-all duration-300 active:scale-95 active:shadow-inner"
                    href={navigationConfig.company.link}
                  >
                    <div className="flex flex-col h-full justify-between bg-white/50 p-2 rounded-md mt-8">
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        대한플러스전자(주)
                      </h3>
                      <div className="flex flex-col text-gray-900">
                        <p className="text-xs leading-relaxed">최고의 서비스</p>
                        <p className="text-xs leading-relaxed">정확한 솔루션</p>
                        <p className="text-xs leading-relaxed">품질로 승부하는 반도체 유통 전문기업</p>
                      </div>
                      <span className="text-sm text-gray-600 items-center gap-1 flex">
                        <ArrowLeft className="w-4 h-4" />
                        회사 소개
                      </span>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              {(navigationConfig.company.items || []).map((item: any) => (
                <CategoryLink key={item.title} href={item.link} title={item.title} description={item.description || ""} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger onMouseEnter={() => debouncedSetSelectedMenu(navigationConfig.products.title)} className="text-gray-700 hover:text-blue-600">
            {navigationConfig.products.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="w-full p-6 min-w-[800px]">
              <div className="grid grid-cols-12 gap-6">
                {/* 좌측 제품 카테고리 */}
                <div className="col-span-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <h3 className="text-base font-semibold text-blue-800 mb-3">제품 카테고리</h3>
                    <div className="space-y-1.5">
                      {(navigationConfig.products.categories || []).slice(0, 6).map((category: any, index: number) => (
                        <Link 
                          key={category.title} 
                          href={category.link}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/70 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-100 transition-colors">
                            <Cpu className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-blue-900">{category.title}</h4>
                            <p className="text-xs text-blue-600/70 line-clamp-1">{category.description || ""}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-blue-100">
                      <Link href="/products" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                        <span>모든 제품 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* 우측 추천 제품 */}
                <div className="col-span-8 pl-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">인기 제품</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(navigationConfig.products.featured || []).slice(0, 3).map((product: any, index: number) => (
                      <Link 
                        key={`featured-${index}`} 
                        href={product.link || '/products'}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-blue-200 transition-all hover:shadow-md"
                      >
                        <div className="aspect-video bg-gray-100 relative">
                          {product.image && (
                            <Image 
                              src={product.image} 
                              alt={product.title} 
                              fill 
                              className="object-cover" 
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors">{product.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-blue-900">맞춤 제품 추천</h3>
                        <p className="text-xs text-blue-600 mt-0.5">귀사에 적합한 제품을 찾아드립니다</p>
                      </div>
                      <Link href="/products/recommendation">
                        <Button size="sm" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                          추천 받기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.partners.title}</NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="w-full p-4 min-w-[800px]">
              <div className="grid grid-cols-12 gap-6">
                {/* 좌측 파트너사 목록 */}
                <div className="col-span-4 border-r pr-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">주요 파트너사</h3>
                  <div className="space-y-2">
                    {(navigationConfig.partners.items || []).slice(0, 5).map((partner: PartnerItem, index: number) => (
                      <div 
                        key={partner.title || `partner-${index}`}
                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setSelectedPartner(partner)}
                      >
                        {partner.icon && (
                          <div className="w-10 h-10 rounded-md border border-gray-100 p-1 bg-white flex-shrink-0 flex items-center justify-center">
                            <Image 
                              src={partner.icon} 
                              alt={partner.title} 
                              width={32} 
                              height={32} 
                              className="object-contain" 
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{partner.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{partner.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link href="/partners" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <span>모든 파트너사 보기</span>
                      <ArrowLeft className="w-3 h-3 rotate-180" />
                    </Link>
                  </div>
                </div>
                
                {/* 우측 선택된 파트너사 상세 정보 */}
                <div className="col-span-8">
                  {selectedPartner && (
                    <motion.div
                      key={selectedPartner.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          {selectedPartner.icon && (
                            <div className="w-16 h-16 rounded-lg border border-gray-100 p-2 bg-white flex-shrink-0 flex items-center justify-center">
                              <Image 
                                src={selectedPartner.icon} 
                                alt={selectedPartner.title} 
                                width={48} 
                                height={48} 
                                className="object-contain" 
                              />
                            </div>
                          )}
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedPartner.title}</h2>
                            <p className="text-sm text-gray-600">{selectedPartner.description}</p>
                          </div>
                        </div>
                        
                        {selectedPartner.partnerStory && (
                          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                            <div className="relative z-10">
                              <h3 className="text-sm font-medium text-gray-900 mb-2">파트너 스토리</h3>
                              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{selectedPartner.partnerStory.text}</p>
                              
                              <Link 
                                href={selectedPartner.partnerStory.learnMoreLink} 
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200"
                              >
                                자세히 보기
                                <ExternalLink className="ml-1 w-3 h-3" />
                              </Link>
                            </div>
                            
                            {selectedPartner.partnerStory.image && (
                              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                                <Image 
                                  src={selectedPartner.partnerStory.image} 
                                  alt="" 
                                  width={128} 
                                  height={128} 
                                  className="object-contain" 
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <h4 className="text-xs font-medium text-blue-800 mb-1">주요 제품</h4>
                            <p className="text-xs text-blue-600">반도체, LED 드라이버 IC</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <h4 className="text-xs font-medium text-green-800 mb-1">협력 분야</h4>
                            <p className="text-xs text-green-600">글로벌 공급망, 판매 대행</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                            <h4 className="text-xs font-medium text-purple-800 mb-1">국가</h4>
                            <p className="text-xs text-purple-600">대한민국, 중국, 싱가폴</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.support.title}</NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="p-4 min-w-[700px]">
              <div className="grid grid-cols-12 gap-6">
                {/* 좌측 지원 카테고리 */}
                <div className="col-span-4">
                  <div className="space-y-4">
                    {/* 문의 섹션 */}
                    <motion.div 
                      className="p-4 rounded-xl cursor-pointer relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      style={{ 
                        backgroundColor: expandedSupportSection === "inquiry" ? "#f0f9ff" : "#f8fafc",
                        borderColor: expandedSupportSection === "inquiry" ? "#bae6fd" : "#e2e8f0",
                        borderWidth: 1 
                      }}
                      onClick={() => setExpandedSupportSection("inquiry")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          expandedSupportSection === "inquiry" ? "bg-blue-100 text-blue-600" : "bg-neutral-100 text-neutral-500"
                        }`}>
                          <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium ${
                            expandedSupportSection === "inquiry" ? "text-blue-800" : "text-neutral-700"
                          }`}>
                            {navigationConfig.support.inquiry.title || "문의하기"}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">빠른 답변과 견적 문의</p>
                        </div>
                      </div>
                      {expandedSupportSection === "inquiry" && (
                        <motion.div 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Check className="h-5 w-5 text-blue-500" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* 연락처 섹션 */}
                    <motion.div 
                      className="p-4 rounded-xl cursor-pointer relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      style={{ 
                        backgroundColor: expandedSupportSection === "contact" ? "#fef2f2" : "#f8fafc",
                        borderColor: expandedSupportSection === "contact" ? "#fecaca" : "#e2e8f0",
                        borderWidth: 1 
                      }}
                      onClick={() => setExpandedSupportSection("contact")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          expandedSupportSection === "contact" ? "bg-red-100 text-red-600" : "bg-neutral-100 text-neutral-500"
                        }`}>
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium ${
                            expandedSupportSection === "contact" ? "text-red-800" : "text-neutral-700"
                          }`}>
                            {navigationConfig.support.contact.title || "연락처"}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">대한플러스전자 연락처 정보</p>
                        </div>
                      </div>
                      {expandedSupportSection === "contact" && (
                        <motion.div 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Check className="h-5 w-5 text-red-500" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* 자료실 섹션 */}
                    <motion.div 
                      className="p-4 rounded-xl cursor-pointer relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      style={{ 
                        backgroundColor: expandedSupportSection === "resources" ? "#f0fdf4" : "#f8fafc",
                        borderColor: expandedSupportSection === "resources" ? "#bbf7d0" : "#e2e8f0",
                        borderWidth: 1 
                      }}
                      onClick={() => setExpandedSupportSection("resources")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          expandedSupportSection === "resources" ? "bg-green-100 text-green-600" : "bg-neutral-100 text-neutral-500"
                        }`}>
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium ${
                            expandedSupportSection === "resources" ? "text-green-800" : "text-neutral-700"
                          }`}>
                            {navigationConfig.support.resources.title || "자료실"}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">데이터시트 및 기술 문서</p>
                        </div>
                      </div>
                      {expandedSupportSection === "resources" && (
                        <motion.div 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Check className="h-5 w-5 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
                
                {/* 우측 선택된 지원 항목 상세 */}
                <div className="col-span-8 border-l border-neutral-100 pl-6">
                  {expandedSupportSection === "inquiry" && (
                    <motion.div
                      key="inquiry-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-lg font-semibold text-blue-900 mb-1">빠른 문의하기</h2>
                          <p className="text-sm text-neutral-500">제품 견적 및 기술 문의를 신속하게 처리해 드립니다</p>
                        </div>
                        <Link 
                          href="/support/inquiry" 
                          className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <span>모든 문의 옵션</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {(navigationConfig.support.inquiry.items || []).slice(0, 4).map((item: InquiryItem) => (
                          <Link 
                            key={item.title} 
                            href={item.link}
                            className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-blue-800">{item.title}</h3>
                              <p className="text-xs text-blue-600/70">바로 문의하기</p>
                            </div>
                          </Link>
                        ))}
                        
                        {/* 기본 문의 옵션 */}
                        {(!navigationConfig.support.inquiry.items || navigationConfig.support.inquiry.items.length === 0) && (
                          <>
                            <Link 
                              href="/support/inquiry/quote"
                              className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
                            >
                              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-blue-800">견적 문의</h3>
                                <p className="text-xs text-blue-600/70">가격 및 구매 문의</p>
                              </div>
                            </Link>
                            
                            <Link 
                              href="/support/inquiry/technical"
                              className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
                            >
                              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-blue-800">기술 문의</h3>
                                <p className="text-xs text-blue-600/70">기술 지원 및 상담</p>
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-blue-100">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-white flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">빠른 견적 문의</h3>
                            <p className="text-xs text-blue-100">24시간 이내 회신해 드립니다</p>
                          </div>
                          <Link href="/support/quick-inquiry">
                            <Button size="sm" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                              지금 문의하기
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {expandedSupportSection === "contact" && (
                    <motion.div
                      key="contact-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-lg font-semibold text-red-900 mb-1">연락처 안내</h2>
                          <p className="text-sm text-neutral-500">대한플러스전자 연락처 및 위치 정보</p>
                        </div>
                        <Link 
                          href="/support/contact" 
                          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1"
                        >
                          <span>상세 연락처</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-red-100 bg-red-50/50">
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Phone className="h-4 w-4 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-red-800">고객센터</h3>
                            <p className="text-sm font-semibold text-red-600">02-1234-5678</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-red-100 bg-red-50/50">
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Mail className="h-4 w-4 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-red-800">이메일</h3>
                            <p className="text-sm font-semibold text-red-600">support@dhplus.co.kr</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}; 