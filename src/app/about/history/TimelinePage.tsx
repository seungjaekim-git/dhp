"use client";

import { useState } from "react";
import TimelineSimple from "./TimelineSimple";
import TimelineDetailed from "./TimelineDetailed";
import { ListFilter, SortDesc, Download } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface TimelineLayoutProps {
  timelineData: any[];
}

export default function TimelinePage({ timelineData }: TimelineLayoutProps) {
  const [isDetailed, setIsDetailed] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const sortedTimelineData = isDesc
    ? [...timelineData].reverse()
    : timelineData;

  return (
    <div className="container mx-auto space-y-8 px-4">
      {/* 상단 제어 버튼 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {/* 보기 옵션 */}
          <div className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    <ListFilter className="w-4 h-4 mr-2" />
                    {isDetailed ? "자세히 보기" : "간략히 보기"}
                  </button>
                </TooltipTrigger>
                <TooltipContent>연혁 보기 옵션</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isViewDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                <button
                  onClick={() => {
                    setIsDetailed(false);
                    setIsViewDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  간략히 보기
                </button>
                <button
                  onClick={() => {
                    setIsDetailed(true);
                    setIsViewDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  자세히 보기
                </button>
              </div>
            )}
          </div>

          {/* 정렬 옵션 */}
          <div className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    <SortDesc className="w-4 h-4 mr-2" />
                    {isDesc ? "최신순" : "과거순"}
                  </button>
                </TooltipTrigger>
                <TooltipContent>정렬 옵션</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                <button
                  onClick={() => {
                    setIsDesc(true);
                    setIsSortDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  최신순
                </button>
                <button
                  onClick={() => {
                    setIsDesc(false);
                    setIsSortDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  과거순
                </button>
              </div>
            )}
          </div>

          {/* 다운로드 버튼 */}
          <Link
            href="/files/Selection_Guide.pdf"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            엑셀 다운로드
          </Link>
        </div>
      </div>

      {/* 연혁 콘텐츠 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {isDetailed ? (
          <TimelineDetailed timelineData={sortedTimelineData} />
        ) : (
          <TimelineSimple timelineData={sortedTimelineData} />
        )}
      </div>
    </div>
  );
}
