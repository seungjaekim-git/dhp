"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import { SortDesc, Download } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface TimelineLayoutProps {
  timelineData: any[];
}

export default function TimelinePage({ timelineData }: TimelineLayoutProps) {
  const [isDesc, setIsDesc] = useState(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const sortedTimelineData = isDesc
    ? [...timelineData].reverse()
    : timelineData;

  return (
    <div className="container mx-auto space-y-8 px-4">
      {/* 상단 제어 버튼 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-950/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 p-6"
      >
        <div className="flex flex-wrap gap-4 justify-between md:justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
            <div>
              <h2 className="text-xl font-semibold text-white">회사 연혁</h2>
              <p className="text-sm text-gray-400">1997년 창립부터 현재까지</p>
            </div>
          </div>

          <div className="flex gap-4">
            {/* 정렬 옵션 */}
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
                    >
                      <SortDesc className="w-4 h-4 mr-2 text-blue-400" />
                      {isDesc ? "최신순" : "과거순"}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>정렬 옵션</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-md z-50">
                  <button
                    onClick={() => {
                      setIsDesc(true);
                      setIsSortDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-800"
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => {
                      setIsDesc(false);
                      setIsSortDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-800"
                  >
                    과거순
                  </button>
                </div>
              )}
            </div>

            {/* 다운로드 버튼 */}
            <Link
              href="/files/Selection_Guide.pdf"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-700 rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4 mr-2" />
              엑셀 다운로드
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 연혁 콘텐츠 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-950/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 p-6"
      >
        <Timeline timelineData={sortedTimelineData} />
      </motion.div>
    </div>
  );
}
