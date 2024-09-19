"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandOverview from '@/app/partners/BrandOverview';
import BrandProducts from '@/app/partners/BrandProducts';
import BrandIntroduction from '@/app/partners/BrandIntroduction';
import BrandNews from '@/app/partners/BrandNews';

const PartnersPage = () => {
  return (
    <div className="relative">
      <Tabs defaultValue="overview" className="w-full">
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="container mx-auto">
            <TabsList className="w-full flex justify-between bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="flex-1 py-2 px-4 rounded-md transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">개요</TabsTrigger>
              <TabsTrigger value="products" className="flex-1 py-2 px-4 rounded-md transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">상품</TabsTrigger>
              <TabsTrigger value="introduction" className="flex-1 py-2 px-4 rounded-md transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">소개</TabsTrigger>
              <TabsTrigger value="news" className="flex-1 py-2 px-4 rounded-md transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm">뉴스</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 브랜드 소개 카드 */}
            <div className="w-full md:w-1/4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">아크롱스튜디오</h2>
                <div className="flex items-center mb-4">
                  <span className="text-blue-500 font-bold">4.8</span>
                  <span className="text-gray-500 ml-2">· 리뷰 18</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">상담신청</button>
                <ul className="mt-4 space-y-2">
                  <li>여자친구와 같이</li>
                  <li>사진과 장소가 동일한지 확인</li>
                  <li>친절한 상담</li>
                </ul>
              </div>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="w-full md:w-3/4">
              <TabsContent value="overview">
                <BrandOverview />
              </TabsContent>
              <TabsContent value="products">
                <BrandProducts />
              </TabsContent>
              <TabsContent value="introduction">
                <BrandIntroduction />
              </TabsContent>
              <TabsContent value="news">
                <BrandNews />
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default PartnersPage;