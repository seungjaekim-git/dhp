'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Cpu, Power, Cable } from "lucide-react";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Battery, Plug, Box } from "lucide-react"; // 대체 아이콘 추가

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
  badges = [],
}: ListLayoutProps) {
  const pathname = usePathname() || "/products/list/leddriveric";

  const navigationItems = [
    { label: "LED 드라이버 IC", href: "/products/list/leddriveric", icon: <Cpu className="w-4 h-4" /> },
    { label: "다이오드", href: "/products/list/diode", icon: <Battery className="w-4 h-4" /> }, // 대체 아이콘 사용
    { label: "전원관리 IC", href: "/products/list/power", icon: <Power className="w-4 h-4" /> },
    { label: "센서", href: "/products/list/sensor", icon: <Plug className="w-4 h-4" /> }, // 대체 아이콘 사용
    { label: "케이블&커넥터", href: "/products/list/cable", icon: <Cable className="w-4 h-4" /> },
    { label: "수동소자", href: "/products/list/passive", icon: <Box className="w-4 h-4" /> }, // 대체 아이콘 사용
  ];

  return (
    <div className="mx-2 py-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4 rounded-xl">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${item.color || "text-gray-600"} ${
                      item.hoverColor || "hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={`font-medium ${item.color || ""}`}>
                    {item.label}
                  </span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-sky-400 text-white rounded-lg flex items-center justify-center">
              {icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-base font-bold text-gray-900">
                  {title}
                </h1>

                <div className="flex gap-1.5">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.bgColor} ${badge.textColor} ${badge.hoverColor}`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="flex gap-2">
              <TooltipProvider delayDuration={100}>
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-full text-xs transition-all
                            ${pathname === item.href 
                              ? "bg-blue-500 text-white font-bold" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
                            }
                          `}
                        >
                          {item.icon}
                          <span className={`${pathname !== item.href ? "hidden" : "inline "} md:inline` }>{item.label}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="md:hidden">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="mt-6">
        <div className="bg-white rounded-xl border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
