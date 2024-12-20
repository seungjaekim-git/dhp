"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  description,
  badges = [
    {
      text: "LED 드라이버 IC",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      hoverColor: "hover:bg-blue-200"
    },
    {
      text: "전자부품 유통",
      bgColor: "bg-sky-100", 
      textColor: "text-sky-700",
      hoverColor: "hover:bg-sky-200"
    }
  ]
}: AboutLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 이벤트 핸들링
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 기존 Navbar의 높이를 고려하여 Header 위치 조정 */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      </div>

      {/* 헤더 섹션 */}
      <div
        className={`sticky top-[64px] z-40 bg-gradient-to-r ${
          isScrolled
            ? "from-white to-gray-50 shadow-md"
            : "from-sky-50 to-blue-50"
        } transition-all duration-300 ease-in-out rounded-2xl p-8 ${
          isScrolled ? "py-2" : "py-4"
        } border ${
          isScrolled ? "border-gray-200" : "border-sky-100"
        } `}
      >
        {/* 브레드크럼 */}
        <div
          className={`flex items-center gap-2 text-sm ${
            isScrolled ? "hidden" : "text-gray-600"
          } mb-4`}
        >
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={`${item.color || 'text-gray-600'} ${item.hoverColor || 'hover:text-blue-600'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-medium ${isScrolled ? "text-blue-600" : ""} ${item.color || ''}`}>
                  {item.label}
                </span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* 아이콘 */}
          <div
            className={`${
              isScrolled
                ? "w-8 h-8 bg-gray-100 text-gray-600 "
                : "w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-400 text-white"
            } rounded-xl flex items-center justify-center transition-all duration-300`}
          >
            {icon}
          </div>

          <div className="flex items-center gap-4 flex-grow">
            {/* 타이틀 */}
            <h1
              className={`transition-all duration-300 ${
                isScrolled ? "text-lg font-medium" : "text-2xl font-bold"
              } text-gray-900`}
            >
              {title}
            </h1>

            {/* 뱃지 */}
            <div className={`flex gap-2 ${isScrolled ? "" : "mt-1"}`}>
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${badge.bgColor} ${badge.textColor} ${badge.hoverColor}`}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 페이지 설명 */}
        <p className={`mt-4 text-gray-600 text-sm leading-relaxed ${isScrolled ? "hidden" : ""}`}>
          {description}
        </p>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex gap-8 mt-12">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
