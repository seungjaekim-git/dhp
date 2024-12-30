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

export default function TimelinePage({ timelineData }: TimelineLayoutProps) {
  const [isDetailed, setIsDetailed] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 0;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const sortedTimelineData = isDesc 
    ? [...timelineData].reverse()
    : timelineData;

  return (
    <div className="container mx-auto flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-2 justify-center">
                <div className="relative">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <ListFilter className="w-4 h-4 mr-2" />
                          {isDetailed ? "자세히 보기" : "간략히 보기"}
                        </button>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  {isViewDropdownOpen && (
                    <div className="absolute right-0 w-40 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setIsDetailed(false);
                          setIsViewDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-center hover:bg-gray-50"
                      >
                        간략히 보기
                      </button>
                      <button
                        onClick={() => {
                          setIsDetailed(true);
                          setIsViewDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-center hover:bg-gray-50"
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
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <SortDesc className="w-4 h-4 mr-2" />
                          {isDesc ? "최신순" : "과거순"}
                        </button>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 w-40 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setIsDesc(true);
                          setIsSortDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-center hover:bg-gray-50"
                      >
                        최신순
                      </button>
                      <button
                        onClick={() => {
                          setIsDesc(false);
                          setIsSortDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-center hover:bg-gray-50"
                      >
                        과거순
                      </button>
                    </div>
                  )}
                </div>

                <Link
                  href="/files/Selection_Guide.pdf"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  엑셀 다운로드
                </Link>
              </div>
            </div>

            <div className=" p-8">
              <div className={isDetailed ? "hidden" : "block"}>
                <TimelineSimple timelineData={sortedTimelineData} />
              </div>
              <div className={isDetailed ? "block" : "hidden"}>
                <TimelineDetailed timelineData={sortedTimelineData} />
              </div>
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
