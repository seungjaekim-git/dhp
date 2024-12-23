"use client";

import { useState, useEffect, useCallback } from "react";
import TimelineSimple from "./TimelineSimple";
import TimelineDetailed from "./TimelineDetailed";
import { ListFilter, SortDesc, Download, CalendarDays } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface TimelineLayoutProps {
  timelineData: any[];
}

export default function HistoryLayout({ timelineData }: TimelineLayoutProps) {
  const [isDetailed, setIsDetailed] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 상태 변경 함수 (메모이제이션으로 중복 실행 방지)
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 0;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled); // 상태가 변경될 때만 업데이트
    }
  }, [isScrolled]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // 클린업
    };
  }, [handleScroll]);

  const sortedTimelineData = isDesc 
    ? [...timelineData].reverse()
    : timelineData;

  const title = "회사연혁";
  const icon = <CalendarDays className="w-6 h-6" />;
  const description = "대한플러스전자(주)의 발자취를 소개합니다.";
  const badges = [
    {
      text: "연혁",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      hoverColor: "hover:bg-blue-100"
    },
    {
      text: "회사소개",
      bgColor: "bg-sky-100",
      textColor: "text-sky-600", 
      hoverColor: "hover:bg-sky-100"
    }
  ];
  const breadcrumb = [
    { label: "홈", href: "/" },
    { label: "회사소개", href: "/about" },
    { label: "회사연혁", href: "/about/history" },
  ];

  const headerButtons = (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 gap-2 ">
        <div className="relative">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                  className="inline-flex items-center justify-between px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                >
                  <div className="flex items-center">
                    <ListFilter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">{isDetailed ? "자세히 보기" : "간략히 보기"}</span>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{isDetailed ? "자세히 보기" : "간략히 보기"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isViewDropdownOpen && (
            <div className="absolute right-0 w-32 md:w-40 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  setIsDetailed(false);
                  setIsViewDropdownOpen(false);
                }}
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-center hover:bg-gray-50"
              >
                간략히 보기
              </button>
              <button
                onClick={() => {
                  setIsDetailed(true);
                  setIsViewDropdownOpen(false);
                }}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-center hover:bg-gray-50"
              >
                자세히 보기
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="inline-flex items-center justify-between px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                >
                  <div className="flex items-center">
                    <SortDesc className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">{isDesc ? "최신순" : "과거순"}</span>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{isDesc ? "최신순" : "과거순"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isSortDropdownOpen && (
            <div className="absolute right-0 w-32 md:w-40 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  setIsDesc(true);
                  setIsSortDropdownOpen(false);
                }}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-center hover:bg-gray-50"
              >
                최신순
              </button>
              <button
                onClick={() => {
                  setIsDesc(false);
                  setIsSortDropdownOpen(false);
                }}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-center hover:bg-gray-50"
              >
                과거순
              </button>
            </div>
          )}
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/files/Selection_Guide.pdf"
                className="inline-flex items-center justify-center px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">엑셀 다운로드</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">엑셀 다운로드</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className={`sticky top-[64px] z-40 transition-all duration-300 ease-in-out rounded-2xl grid grid-cols-5 gap-4 min-h-80px ${
          isScrolled
            ? "bg-white shadow-md border border-gray-200 p-4 m-2"
            : "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4"
        }`}
      >
        <div className={`flex flex-col ${isScrolled ? "col-span-5" : "col-span-4"}`}>
          <div className={`flex items-center gap-2 text-sm text-gray-600 mb-4 ${isScrolled ? "hidden" : ""}`}>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <ChevronRight className="w-4 h-4" />}
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

              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1
                    className={`transition-all duration-300 ${
                      isScrolled ? "text-sm md:text-base font-medium" : "text-lg md:text-xl font-bold"
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

                {isScrolled && (
                  <div className="flex items-center gap-3">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setIsDetailed(!isDetailed)}
                            className="inline-flex items-center px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 bg-gray-100 border border-gray-300 rounded-lg"
                          >
                            <ListFilter className="w-3 h-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">{isDetailed ? "자세히 보기" : "간략히 보기"}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setIsDesc(!isDesc)}
                            className="inline-flex items-center px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 bg-gray-100 border border-gray-300 rounded-lg"
                          >
                            <SortDesc className="w-3 h-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">{isDesc ? "최신순" : "과거순"}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="inline-flex items-center px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 bg-gray-100 border border-gray-300 rounded-lg"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">엑셀 다운로드</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <p className={`mt-4 text-gray-600 text-sm leading-relaxed ${isScrolled ? "hidden" : ""}`}>
            {description}
          </p>
        </div>

        <div className={`col-span-1 ${isScrolled ? "hidden" : "block"}`}>
          {headerButtons}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className={isDetailed ? "hidden md:block" : "block"}>
              <TimelineSimple timelineData={sortedTimelineData} />
            </div>
            <div className={isDetailed ? "block" : "hidden md:hidden"}>
              <TimelineDetailed timelineData={sortedTimelineData} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          {/* 추가적인 컨텐츠를 위한 공간 */}
        </div>
      </div>
    </div>
  );
}
