'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicIcon from "./DynamicIcon";
import { ChevronDown, ChevronRight, Filter, Package, Building2, Layers, Search, Zap } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const navigationItems = [
  { 
    label: "제품 소개", 
    href: "/products", 
    iconName: "Package",
    description: "제품 카테고리 및 소개"
  },
  { 
    label: "LED 드라이버 IC", 
    href: "/products/led-driver", 
    iconName: "Cpu",
    description: "LED 제어 솔루션" 
  },
  { 
    label: "기술 지원", 
    href: "/products/support", 
    iconName: "Wrench",
    description: "기술 문서 및 지원" 
  },
  { 
    label: "데이터시트", 
    href: "/products/datasheet", 
    iconName: "FileText",
    description: "제품 사양 자료" 
  },
];

const productCategories = [
  { id: "led-driver", name: "LED 드라이버", count: 24 },
  { id: "power-management", name: "전력 관리 IC", count: 18 },
  { id: "sensors", name: "센서 IC", count: 12 },
  { id: "converters", name: "컨버터", count: 16 },
  { id: "controllers", name: "컨트롤러", count: 9 },
];

const manufacturers = [
  { id: "samsung", name: "삼성전자", count: 28 },
  { id: "texas-instruments", name: "텍사스 인스트루먼트", count: 42 },
  { id: "analog-devices", name: "아날로그 디바이스", count: 37 },
  { id: "infineon", name: "인피니언", count: 19 },
  { id: "vishay", name: "비쉐이", count: 23 },
  { id: "rohm", name: "로옴 세미컨덕터", count: 16 },
];

const applications = [
  { id: "automotive", name: "자동차", count: 32 },
  { id: "industrial", name: "산업용", count: 46 },
  { id: "consumer", name: "소비자 가전", count: 38 },
  { id: "medical", name: "의료기기", count: 14 },
  { id: "communications", name: "통신장비", count: 29 },
  { id: "aerospace", name: "항공우주", count: 8 },
];

export function ProductsSidebarClient() {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [manufacturerOpen, setManufacturerOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterItems = (items: any[], query: string) => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="lg:sticky lg:top-8 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            제품 필터
          </h2>
          <p className="text-gray-400 text-sm">
            원하는 제품을 쉽게 찾아보세요
          </p>
        </div>

        <div className="p-3">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="제품 검색..."
              className="pl-9 bg-gray-800 border-gray-700 text-white" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-auto max-h-[calc(100vh-200px)]">
          <div className="p-3">
            {/* 제품 카테고리 필터 */}
            <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen} className="mb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2.5 text-left rounded-lg bg-gray-800 hover:bg-gray-750">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>제품 카테고리</span>
                </div>
                {categoryOpen ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 ml-2 space-y-1.5">
                  {filterItems(productCategories, searchQuery).map((category) => (
                    <label 
                      key={category.id}
                      className="flex items-center gap-2.5 p-2 hover:bg-gray-800 rounded-md cursor-pointer group"
                    >
                      <Checkbox 
                        id={`category-${category.id}`} 
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="text-gray-300 group-hover:text-white text-sm">
                          {category.name}
                        </span>
                        <Badge variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-400">
                          {category.count}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* 제조사 필터 */}
            <Collapsible open={manufacturerOpen} onOpenChange={setManufacturerOpen} className="mb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2.5 text-left rounded-lg bg-gray-800 hover:bg-gray-750">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>제조사</span>
                </div>
                {manufacturerOpen ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 ml-2 space-y-1.5">
                  {filterItems(manufacturers, searchQuery).map((manufacturer) => (
                    <label 
                      key={manufacturer.id}
                      className="flex items-center gap-2.5 p-2 hover:bg-gray-800 rounded-md cursor-pointer group"
                    >
                      <Checkbox 
                        id={`manufacturer-${manufacturer.id}`} 
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="text-gray-300 group-hover:text-white text-sm">
                          {manufacturer.name}
                        </span>
                        <Badge variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-400">
                          {manufacturer.count}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* 응용 분야 필터 */}
            <Collapsible open={applicationOpen} onOpenChange={setApplicationOpen} className="mb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2.5 text-left rounded-lg bg-gray-800 hover:bg-gray-750">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>응용 분야</span>
                </div>
                {applicationOpen ? 
                  <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                }
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 ml-2 space-y-1.5">
                  {filterItems(applications, searchQuery).map((application) => (
                    <label 
                      key={application.id}
                      className="flex items-center gap-2.5 p-2 hover:bg-gray-800 rounded-md cursor-pointer group"
                    >
                      <Checkbox 
                        id={`application-${application.id}`} 
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="text-gray-300 group-hover:text-white text-sm">
                          {application.name}
                        </span>
                        <Badge variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-400">
                          {application.count}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* 기술 파라미터 필터 */}
            <div className="mt-6 border-t border-gray-800 pt-4">
              <h3 className="flex items-center gap-2 text-white font-medium mb-3 px-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>주요 메뉴</span>
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-lg transition-all",
                        "hover:bg-blue-500/10",
                        isActive
                          ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                          : "text-gray-400 border-l-2 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center",
                        isActive ? "bg-blue-500/20" : "bg-gray-800"
                      )}>
                        <DynamicIcon 
                          name={item.iconName} 
                          className={cn(
                            "w-4 h-4",
                            isActive ? "text-blue-400" : "text-gray-500"
                          )} 
                        />
                      </div>
                      
                      <div>
                        <div className={cn(
                          "font-medium text-sm",
                          isActive ? "text-white" : "text-gray-300"
                        )}>
                          {item.label}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </ScrollArea>
        
        {/* Decorative gradient bar at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
      </motion.div>
    </div>
  );
} 