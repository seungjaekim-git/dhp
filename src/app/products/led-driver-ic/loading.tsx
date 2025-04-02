import React from 'react'
import { Microchip } from 'lucide-react'
import ProductsLayout from '@/app/products/ProductsLayout'
import { Skeleton } from '@/components/ui/skeleton'

export default function LEDDriverICLoading() {
  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="다양한 애플리케이션을 위한 고효율, 고성능 LED 드라이버 IC 제품군입니다. 조명 제어, 디스플레이, 자동차 조명 등 다양한 분야에 최적화된 솔루션을 제공합니다."
      badges={[
        {
          text: "조명 제어",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
        {
          text: "디스플레이",
          bgColor: "bg-purple-500/20",
          textColor: "text-purple-400",
          hoverColor: "hover:bg-purple-500/30",
        },
        {
          text: "자동차 조명",
          bgColor: "bg-amber-500/20",
          textColor: "text-amber-400",
          hoverColor: "hover:bg-amber-500/30",
        },
        {
          text: "RGB 컨트롤러",
          bgColor: "bg-emerald-500/20",
          textColor: "text-emerald-400",
          hoverColor: "hover:bg-emerald-500/30",
        },
      ]}
      theme="dark"
    >
      <div className="space-y-6 animate-pulse">
        {/* 검색 및 필터 부분 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 w-full bg-gray-800" />
          <div className="flex gap-2">
            <Skeleton className="h-12 w-24 bg-gray-800" />
            <Skeleton className="h-12 w-24 bg-gray-800" />
          </div>
        </div>

        {/* 필터 뱃지 부분 */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full bg-gray-800" />
          <Skeleton className="h-8 w-32 rounded-full bg-gray-800" />
          <Skeleton className="h-8 w-28 rounded-full bg-gray-800" />
        </div>

        {/* 제품 목록 제목 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-gray-800" />
        </div>

        {/* 탭 영역 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
        </div>

        {/* 제품 카드 영역 */}
        <div className="grid gap-6">
          {Array(5).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-900/70 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* 제품 정보 영역 */}
                <div className="w-full lg:w-2/5 xl:w-1/3 p-4 border-b lg:border-b-0 lg:border-r border-gray-700">
                  <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
                  <Skeleton className="h-6 w-3/4 mb-3 bg-gray-800" />
                  <Skeleton className="h-4 w-1/2 mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-5/6 mb-3 bg-gray-800" />
                  
                  {/* 스펙 하이라이트 */}
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-full bg-gray-800" />
                      <Skeleton className="h-4 w-full bg-gray-800" />
                      <Skeleton className="h-4 w-full bg-gray-800" />
                      <Skeleton className="h-4 w-full bg-gray-800" />
                    </div>
                  </div>
                  
                  {/* 액션 버튼 영역 */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                  </div>
                </div>
                
                {/* 사양 정보 영역 */}
                <div className="w-full lg:w-3/5 xl:w-2/3 p-4">
                  {/* 탭 영역 */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                  </div>
                  
                  {/* 사양 콘텐츠 영역 */}
                  <div className="mt-4 bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                        <Skeleton className="h-4 w-20 bg-gray-700" />
                      </div>
                      <div className="h-px bg-gray-700/50 w-full" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32 bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </div>
                      <div className="h-px bg-gray-700/50 w-full" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-28 bg-gray-700" />
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                      </div>
                      <div className="h-px bg-gray-700/50 w-full" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-20 bg-gray-700" />
                        <Skeleton className="h-4 w-28 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 페이지네이션 영역 */}
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