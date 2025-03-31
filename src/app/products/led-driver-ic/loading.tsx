import React from 'react'
import { Microchip } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import ProductsLayout from '@/app/products/ProductsLayout'

export default function Loading() {
  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="데이터를 불러오는 중입니다..."
      badges={[
        {
          text: "로딩중...",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
      ]}
    >
      <div className="space-y-6">
        {/* 검색 및 필터 헤더 스켈레톤 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 flex-1 bg-gray-800" />
          <Skeleton className="h-12 w-24 bg-gray-800" />
          <Skeleton className="h-12 w-24 bg-gray-800" />
        </div>
        
        {/* 제품 리스트 스켈레톤 */}
        <div className="rounded-lg border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 p-4">
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-6 bg-gray-800" />
              <Skeleton className="h-6 bg-gray-800" />
              <Skeleton className="h-6 w-24 ml-auto bg-gray-800" />
            </div>
          </div>
          
          <div className="divide-y divide-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24 bg-gray-800" />
                    <Skeleton className="h-6 w-40 bg-gray-800" />
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  </div>
                  <div className="flex justify-end">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 페이지네이션 스켈레톤 */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 bg-gray-800" />
            <Skeleton className="h-10 w-10 bg-gray-800" />
            <Skeleton className="h-10 w-10 bg-gray-800" />
            <Skeleton className="h-10 w-10 bg-gray-800" />
            <Skeleton className="h-10 w-10 bg-gray-800" />
          </div>
        </div>
      </div>
    </ProductsLayout>
  )
} 