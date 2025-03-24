import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="w-full">
      {/* 툴바 스켈레톤 */}
      <div className="flex items-center py-4 gap-2">
        <Skeleton className="h-9 w-[250px] bg-gray-800" />
        <div className="flex items-center gap-2 ml-auto">
          <Skeleton className="h-9 w-24 bg-gray-800" />
          <Skeleton className="h-9 w-24 bg-gray-800" />
          <Skeleton className="h-9 w-24 bg-gray-800" />
        </div>
      </div>
      
      {/* 테이블 스켈레톤 */}
      <div className="rounded-md overflow-hidden border border-gray-800">
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="flex py-3 px-4">
            <Skeleton className="h-6 w-6 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-12 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-36 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-24 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-24 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-24 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-24 mr-4 bg-gray-800" />
            <Skeleton className="h-6 w-24 bg-gray-800 ml-auto" />
          </div>
        </div>
        
        <div>
          {[...Array(5)].map((_, index) => (
            <div 
              key={index} 
              className="flex items-center py-3 px-4 border-b border-gray-800 last:border-b-0"
            >
              <Skeleton className="h-5 w-5 mr-4 bg-gray-800" />
              <Skeleton className="h-5 w-8 mr-4 bg-gray-800" />
              <div className="flex items-center gap-4 w-36 mr-4">
                <Skeleton className="h-10 w-10 rounded-md bg-gray-800" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                  <Skeleton className="h-3 w-16 bg-gray-800" />
                </div>
              </div>
              <Skeleton className="h-5 w-20 mr-4 bg-gray-800" />
              <Skeleton className="h-5 w-20 mr-4 bg-gray-800" />
              <Skeleton className="h-5 w-20 mr-4 bg-gray-800" />
              <Skeleton className="h-5 w-20 mr-4 bg-gray-800" />
              <div className="flex gap-2 ml-auto">
                <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
                <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 페이징 스켈레톤 */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-5 w-24 bg-gray-800" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20 bg-gray-800" />
          <Skeleton className="h-8 w-24 bg-gray-800" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
} 