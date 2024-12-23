'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { throttle } from "lodash";

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
  badges = [],
}: AboutLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 스크롤 상태 업데이트 함수
    const handleScroll = throttle(() => {
      const scrolled = window.scrollY > 0;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    }, 200);

    // 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 클린업: 이벤트 리스너 제거 및 throttle 해제
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // lodash throttle의 클린업 메서드
    };
  }, [isScrolled]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 클라이언트 전용 헤더 */}
      <div
        className={`sticky top-[64px] z-40 transition-all duration-300 ease-in-out rounded-2xl grid grid-cols-5 gap-4 min-h-80px ${
          isScrolled
            ? "bg-white shadow-md border border-gray-200 p-4 m-2"
            : "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4"
        }`}
      >
        <div className="flex flex-col md:col-span-5 col-span-4">
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

          <p
            className={`mt-4 text-gray-600 text-sm leading-relaxed ${
              isScrolled ? "hidden" : ""
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            {children}
          </div>
        </div>
        <div className="col-span-1">
          {/* 추가적인 컨텐츠를 위한 공간 */}
        </div>
      </div>
    </div>
  );
}
