'use client'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Database, Cpu, Microchip, Server, Component, PlusCircle } from "lucide-react";
import AnimatedHeroSection from "../about/components/AnimatedHeroSection";
import AnimatedContentSection from "../about/components/AnimatedContentSection";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase-client";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  description?: string;
  path: string;
}

interface SupabaseLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
}

export default function SupabaseLayout({
  children,
  title,
  icon = <Database className="w-6 h-6 text-blue-400" />,
  breadcrumb,
  description,
  badges = [],
}: SupabaseLayoutProps) {
  const pathname = usePathname() || "/supabase";
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "LED Driver IC",
      icon: <Microchip className="w-5 h-5" />,
      description: "LED 드라이버 IC 제품 관리",
      path: "/supabase/leddriverIC"
    },
    {
      id: 2,
      name: "Diode",
      icon: <Component className="w-5 h-5" />,
      description: "다이오드 제품 관리",
      path: "/supabase/diode"
    },
    {
      id: 3,
      name: "Transistor",
      icon: <Server className="w-5 h-5" />,
      description: "트랜지스터 제품 관리",
      path: "/supabase/transistor"
    },
    {
      id: 4,
      name: "IC",
      icon: <Cpu className="w-5 h-5" />,
      description: "집적회로 제품 관리",
      path: "/supabase/ic"
    }
  ]);

  // 카테고리 경로 생성
  const getCategoryPath = (category: Category): string => {
    return category.path;
  };

  // 활성 카테고리 확인
  const isCategoryActive = (pathname: string, categoryPath: string): boolean => {
    return pathname.startsWith(categoryPath);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Full width, bold typography */}
      <AnimatedHeroSection
        title={title}
        icon={icon}
        breadcrumb={breadcrumb}
        description={description}
        badges={badges}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 py-12 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky sidebar */}
          <div className="w-full lg:w-64 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8 w-full">
              <div className="bg-gray-900 border border-gray-800 rounded-xl">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">
                    제품 카테고리
                  </h2>
                  <p className="text-gray-400 text-sm">
                    관리할 제품 카테고리를 선택하세요
                  </p>
                </div>

                <ScrollArea className="h-auto max-h-[calc(100vh-150px)]">
                  <nav className="p-3">
                    <Link
                      href="/supabase"
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                        "hover:bg-blue-500/10",
                        pathname === "/supabase"
                          ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                          : "text-gray-400 border-l-2 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        pathname === "/supabase" ? "bg-blue-500/20" : "bg-gray-800"
                      )}>
                        <Database className={cn(
                          "w-5 h-5",
                          pathname === "/supabase" ? "text-blue-400" : "text-gray-500"
                        )} />
                      </div>
                      
                      <div>
                        <div className={cn(
                          "font-medium",
                          pathname === "/supabase" ? "text-white" : "text-gray-300"
                        )}>
                          전체 제품 관리
                        </div>
                        <div className="text-xs text-gray-500">
                          모든 카테고리 제품 관리
                        </div>
                      </div>
                    </Link>

                    {/* Category items */}
                    {categories.map((category) => {
                      const categoryPath = getCategoryPath(category);
                      const isActive = isCategoryActive(pathname, categoryPath);
                      
                      return (
                        <Link
                          key={category.id}
                          href={categoryPath}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                            "hover:bg-blue-500/10",
                            isActive
                              ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                              : "text-gray-400 border-l-2 border-transparent"
                          )}
                        >
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center",
                            isActive ? "bg-blue-500/20" : "bg-gray-800"
                          )}>
                            {React.cloneElement(category.icon as React.ReactElement, {
                              className: cn(
                                "w-5 h-5",
                                isActive ? "text-blue-400" : "text-gray-500"
                              )
                            })}
                          </div>
                          
                          <div>
                            <div className={cn(
                              "font-medium",
                              isActive ? "text-white" : "text-gray-300"
                            )}>
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                    {/* 새 카테고리 추가 버튼 */}
                    <div className="p-3">
                      <Link
                        href="/supabase/category/create"
                        className="flex items-center gap-2 rounded-lg p-2 text-blue-400 hover:bg-blue-500/10 transition-all"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span className="text-sm">새 카테고리 추가</span>
                      </Link>
                    </div>
                  </nav>
                </ScrollArea>
                
                {/* Decorative gradient bar at bottom */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full order-1 lg:order-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 