"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "lodash";
import { ArrowLeft, ShoppingCart, Heart, FileText, Trash2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteCart, useBookmarks } from "@/hooks/useClientStore";
import { BookmarkedProduct } from "@/store/bookmarkStore";
import { QuoteCartItem } from "@/store/quoteCartStore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

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

// CategoryLink 컴포넌트
const CategoryLink = React.memo(({ href, title, description }: { href: string, title: string, description: string }) => (
  <Link 
    href={href} 
    className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200"
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

// ResourceLink 컴포넌트
const ResourceLink = React.memo(({ item }: { item: {
  title: string,
  description: string,
  icon: string,
  partnerStory: {
    image: string,
    text: string,
    learnMoreLink: string
  }
} }) => (
  <Link 
    href={item.partnerStory.learnMoreLink} 
    className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200" 
  >
    <div className="flex items-center">
      <Image 
        src={item.icon} 
        alt="icon" 
        width={50} 
        height={50} 
        className="mr-3 transition-transform duration-300 group-hover:rotate-3" 
        loading="lazy" 
      />
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base">{item.title}</div>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{item.description}</p>
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});
ResourceLink.displayName = "ResourceLink";

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

export const DesktopNavigation = () => {
  const [selectedPartner, setSelectedPartner] = React.useState(navigationConfig.partners.items?.[0] || null);
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  
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
              {(navigationConfig.company.items || []).map((item) => (
                <CategoryLink key={item.title} href={item.link} title={item.title} description={item.description || ""} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.products.title}</NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="w-full p-4 min-w-[600px]">
              <Tabs defaultValue="category" className="w-full">
                <TabsList className="w-full flex p-1 bg-transparent">
                  <TabsTrigger value="category" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">카테고리별</TabsTrigger>
                  <TabsTrigger value="application" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">적용분야별</TabsTrigger>
                  <TabsTrigger value="manufacturer" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">제조사별</TabsTrigger>
                  <TabsTrigger value="new" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">신제품</TabsTrigger>
                </TabsList>

                <TabsContent value="category">
                  <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                    {(navigationConfig.products.categories || DEFAULT_CATEGORIES).map((category) => (
                      <div key={category.title} className="flex flex-col">
                        <Link
                          href={category.link}
                          className="group flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 active:scale-95 text-center h-40"
                        >
                          {category.icon && React.createElement(category.icon, {
                            className: "w-10 h-10 text-blue-600 group-hover:text-blue-700 mb-3"
                          })}
                          {!category.icon && (
                            <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                              <span className="text-2xl font-bold text-blue-600">{category.title.charAt(0)}</span>
                            </div>
                          )}
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                            {category.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {category.seo?.description || "고품질 제품"}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="application">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-3 text-center text-gray-500">
                      <p>적용분야별 제품 카테고리 준비 중입니다</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manufacturer">
                  <div className="grid grid-cols-4 gap-4 p-4">
                    <div className="col-span-4 text-center text-gray-500">
                      <p>제조사별 제품 카테고리 준비 중입니다</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="new">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-3 text-center text-gray-500">
                      <p>신제품 정보 준비 중입니다</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.partners.title}</NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="grid grid-cols-3 gap-6 p-4 min-w-[600px]">
              <div className="col-span-3 text-center text-gray-500">
                <p>파트너사 정보 준비 중입니다</p>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.support.title}</NavigationMenuTrigger>
          <NavigationMenuContent asChild>
            <div className="flex items-center justify-center p-4 min-w-[600px]">
              <div className="p-4 border-r border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500 px-3 mb-2">{navigationConfig.support.inquiry.title || "문의"}</div>
                {(navigationConfig.support.inquiry.items || []).map((item) => (
                  <SupportLink key={item.title} title={item.title} description="" href={item.link} />
                ))}
                {!navigationConfig.support.inquiry.items?.length && (
                  <SupportLink title="견적 문의" description="" href="/quote" />
                )}
              </div>
              <div className="p-4 border-r border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500 px-3 mb-2">{navigationConfig.support.contact.title || "연락처"}</div>
                {(navigationConfig.support.contact.items || []).map((item) => (
                  <SupportLink key={item.title} title={item.title} description="" href={item.link} />
                ))}
                {!navigationConfig.support.contact.items?.length && (
                  <SupportLink title="연락처 안내" description="" href="/contact" />
                )}
              </div>
              <div className="p-4">
                <div className="text-xs sm:text-sm text-gray-500 px-3 mb-2">{navigationConfig.support.resources.title || "자료"}</div>
                {(navigationConfig.support.resources.items || []).map((item) => (
                  <SupportLink key={item.title} title={item.title} description="" href={item.link} />
                ))}
                {!navigationConfig.support.resources.items?.length && (
                  <SupportLink title="문서 자료실" description="" href="/resources" />
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}; 