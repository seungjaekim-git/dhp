import React from 'react'
import { Microchip } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import ProductsLayout from '@/app/products/ProductsLayout'

export default function ProductDetailLoading() {
  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC", href: "/products/led-driver-ic" },
        { label: "로딩중..." },
      ]}
      description="제품 정보를 불러오는 중입니다..."
      badges={[
        {
          text: "로딩중...",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
      ]}
    >
      <div className="space-y-8">
        {/* 네비게이션 스켈레톤 */}
        <Skeleton className="h-6 w-64 bg-gray-800" />
        
        {/* 제품 헤더 스켈레톤 */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-4 flex-1">
              <Skeleton className="h-5 w-32 bg-gray-800" />
              <Skeleton className="h-9 w-96 max-w-full bg-gray-800" />
              <Skeleton className="h-5 w-48 bg-gray-800" />
              <Skeleton className="h-5 w-64 bg-gray-800" />
              
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-7 w-20 rounded-full bg-gray-800" />
                <Skeleton className="h-7 w-24 rounded-full bg-gray-800" />
                <Skeleton className="h-7 w-16 rounded-full bg-gray-800" />
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-48">
              <Skeleton className="h-10 w-full bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-800" />
            </div>
          </div>
        </div>
        
        {/* 제품 설명 스켈레톤 */}
        <div>
          <Skeleton className="h-8 w-48 mb-4 bg-gray-800" />
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="space-y-3">
              <Skeleton className="h-5 w-full bg-gray-800" />
              <Skeleton className="h-5 w-full bg-gray-800" />
              <Skeleton className="h-5 w-3/4 bg-gray-800" />
            </div>
          </div>
        </div>
        
        {/* 사양 스켈레톤 */}
        <div>
          <Skeleton className="h-8 w-48 mb-4 bg-gray-800" />
          
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-4">
              <Skeleton className="h-7 w-40 mb-4 bg-gray-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="flex">
                    <Skeleton className="h-5 w-32 mr-2 bg-gray-800" />
                    <Skeleton className="h-5 w-32 flex-1 bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProductsLayout>
  )
} 