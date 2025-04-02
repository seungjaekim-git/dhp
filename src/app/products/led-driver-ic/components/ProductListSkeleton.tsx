'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Bookmark, ChevronRight, ExternalLink, Info, ShoppingCart } from "lucide-react";

export default function ProductListSkeleton() {
  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 스켈레톤 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="h-12 w-28 rounded-md" />
          <Skeleton className="h-12 w-12 rounded-md" />
        </div>
      </div>

      {/* 필터 표시 스켈레톤 */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      {/* 탭 스켈레톤 */}
      <div className="w-full">
        <Skeleton className="h-12 w-full rounded-2xl mb-4" />
      </div>

      {/* 제품 목록 스켈레톤 */}
      <div className="grid gap-6">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className="bg-white border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row p-0 overflow-hidden animate-pulse">
              {/* 제품명 섹션 스켈레톤 */}
              <div className="w-full lg:w-1/3 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-6 w-60 mb-1" />
                <Skeleton className="h-5 w-32 mb-3" />
                <Skeleton className="h-3 w-full max-w-md" />
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              {/* 사양 정보 섹션 스켈레톤 */}
              <div className="w-full lg:w-2/3 p-4">
                <Skeleton className="h-10 w-full mb-4 rounded-xl" />
                
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-30" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
} 