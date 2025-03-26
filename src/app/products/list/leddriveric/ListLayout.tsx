'use client'
import React from "react";
import Link from "next/link";
import { ChevronRight, Cpu, Power, Cable, Battery, Plug, Box } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface ListLayoutProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
}

export default function ListLayout({
  children,
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
}: ListLayoutProps) {
  const pathname = usePathname() || "/products/list/leddriveric";

  const navigationItems = [
    { label: "LED 드라이버 IC", href: "/products/list/leddriveric", icon: <Cpu className="w-4 h-4" /> },
    { label: "다이오드", href: "/products/list/diode", icon: <Battery className="w-4 h-4" /> },
    { label: "전원관리 IC", href: "/products/list/power", icon: <Power className="w-4 h-4" /> },
    { label: "센서", href: "/products/list/sensor", icon: <Plug className="w-4 h-4" /> },
    { label: "케이블&커넥터", href: "/products/list/cable", icon: <Cable className="w-4 h-4" /> },
    { label: "수동소자", href: "/products/list/passive", icon: <Box className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full">
      {/* 히어로 섹션 - About 페이지와 일관된 디자인 */}
      <div className="relative">
        {/* 배경 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/80 z-10" />
          <div className="absolute inset-0 bg-[url('/images/background_img.webp')] bg-cover bg-center opacity-30" />
          
          {/* 추상적 도형 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-blue-500/10 blur-xl" />
            <div className="absolute top-[40%] right-[10%] w-32 h-32 rounded-full bg-blue-500/5 blur-2xl" />
            <div className="absolute bottom-[20%] left-[30%] w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
          </div>
        </div>

        <div className="relative z-20 px-6 pt-32 pb-24 md:pt-40 md:pb-32 max-w-[1400px] mx-auto">
          {/* 상단 브레드크럼 */}
          <div className="flex items-center gap-2 text-base md:text-lg text-gray-300 mb-10">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-blue-300">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-400/50" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 아이콘과 제목 그룹 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-500/20">
                {icon}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                {title}
              </h1>
            </div>

            {/* 설명 텍스트 */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl max-w-4xl font-light text-gray-200 leading-relaxed">
                {description}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-400/20 rounded-full"></div>
              <p className="text-lg max-w-3xl text-gray-400">
                신뢰할 수 있는 고품질 LED 드라이버 IC를 살펴보세요.
              </p>
            </div>

            {/* 배지 - 모던하고 유리같은 스타일 */}
            <div className="flex flex-wrap gap-3 mt-8">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  className={`px-4 py-2 text-sm font-medium ${badge.bgColor} ${badge.textColor} ${badge.hoverColor} backdrop-blur-sm border border-blue-500/20 rounded-full`}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 장식선 */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      {/* 네비게이션 바 */}
      <div className="bg-white border-b shadow-sm py-3 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-2 flex-wrap">
            <TooltipProvider delayDuration={100}>
              {navigationItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full text-xs transition-all",
                        pathname === item.href 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                      )}
                    >
                      {item.icon}
                      <span className={`${pathname !== item.href ? "hidden" : "inline "} md:inline` }>{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="md:hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border shadow-md overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
