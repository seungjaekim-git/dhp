'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Building2, UserRound, History, Briefcase, MapPin, Building } from "lucide-react";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface AboutLayoutProps {
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

export default function AboutLayout({
  children,
  title,
  icon,
  breadcrumb,
  badges = [],
}: AboutLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "/about";

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 0;
      
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [isScrolled]);

  const navigationItems = [
    { label: "회사 소개", href: "/about", icon: <Building className="w-4 h-4" /> },
    { label: "CEO 인사말", href: "/about/greeting", icon: <UserRound className="w-4 h-4" /> },
    { label: "회사 연혁", href: "/about/history", icon: <History className="w-4 h-4" /> },
    { label: "사업 소개", href: "/about/business", icon: <Briefcase className="w-4 h-4" /> },
    { label: "찾아오시는 길", href: "/about/location", icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-6 py-4">
      {/* Header */}
      <div
        className={`sticky top-[4px] z-40 transition-all duration-300 ease-in-out rounded-xl ${
          isScrolled
            ? "bg-white shadow-sm border border-gray-2"
            : "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4"
        }`}
      >
        <div className={`flex flex-col ${
              isScrolled ? "m-2" : "space-y-3"
            }`}>
          <div
            className={`flex items-center gap-1 text-sm text-gray-600 ${
              isScrolled ? "hidden" : ""
            }`}
          >
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
            <div
              className={`transition-all duration-300 ${
                isScrolled
                  ? "w-6 h-6 bg-gray-100 text-gray-600"
                  : "w-8 h-8 bg-gradient-to-br from-blue-500 to-sky-400 text-white"
              } rounded-lg flex items-center justify-center`}
            >
            {icon}
          </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "text-sm font-medium"
                      : "text-base font-bold"
                  } text-gray-900`}
                >
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
          <div className={`${isScrolled ? "hidden" : ""}`}>
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
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
