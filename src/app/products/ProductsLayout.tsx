'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Package, Cpu, Wrench, FileText } from "lucide-react";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface ProductsLayoutProps {
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

export default function ProductsLayout({
  children,
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
}: ProductsLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
    { label: "제품 소개", href: "/products", icon: <Package className="w-4 h-4" /> },
    { label: "LED 드라이버 IC", href: "/products/led-driver", icon: <Cpu className="w-4 h-4" /> },
    { label: "기술 지원", href: "/products/support", icon: <Wrench className="w-4 h-4" /> },
    { label: "데이터시트", href: "/products/datasheet", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className={`sticky top-[4px] z-40 transition-all duration-300 ease-in-out rounded-2xl ${
          isScrolled
            ? "bg-white shadow-md border border-gray-200 p-4 m-2"
            : "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4"
        }`}
      >
        <div className="flex flex-col">
          <div
            className={`flex items-center gap-2 text-sm text-gray-600 mb-4 ${
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
                  <ChevronRight className="w-4 h-4" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "w-6 h-6 bg-gray-100 text-gray-600"
                    : "w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-500 to-sky-400 text-white"
                } rounded-xl flex items-center justify-center`}
              >
                {icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h1
                    className={`transition-all duration-300 ${
                      isScrolled
                        ? "text-sm md:text-base font-medium"
                        : "text-lg md:text-xl font-bold"
                    } text-gray-900`}
                  >
                    {title}
                  </h1>

                  <div className="flex gap-2 ml-2">
                    {badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${badge.bgColor} ${badge.textColor} ${badge.hoverColor}`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-4 ${isScrolled ? "hidden" : ""}`}>
            <div className="flex gap-2">
              <TooltipProvider delayDuration={100}>
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all
                            ${pathname === item.href 
                              ? "bg-blue-500 text-white" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            {children}
          </div>
        </div>
        <div className="col-span-1">
        </div>
      </div>
    </div>
  );
}
