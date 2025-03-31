'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, ChevronLeft } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-500/20 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">제품을 찾을 수 없습니다</h1>
        <p className="text-gray-400">
          요청하신 LED 드라이버 IC 제품이 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        
        <div className="pt-4">
          <Button asChild>
            <Link href="/products/led-driver-ic" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              LED 드라이버 IC 목록으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 