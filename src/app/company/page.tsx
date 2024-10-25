"use client"
import React from 'react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
export default function CompanyPage() {

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            최고의 기술, 최적의 방법으로
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12">
            기업들의 디지털 혁신을 실현합니다
          </p>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            대한플러스전자는 25년의 IT 경험과 노하우를 바탕으로<br />
            더 나은 디지털 세상을 만들어 나가고 있습니다
          </p>
        
        <div className="w-full py-10">
          <InfiniteMovingCards
            items={[
              {
                quote: "최고의 품질과 서비스로 고객만족을 실현합니다.",
                name: "품질 경영",
                title: "Quality Management",
                backgroundImage: "/images/automotive_category_banner.png"
              },
              {
                quote: "지속적인 혁신과 기술개발로 미래를 선도합니다.",
                name: "기술 혁신",
                title: "Technical Innovation" ,
                backgroundImage: "/images/automotive_category_banner.png"

              },
              {
                quote: "글로벌 시장을 선도하는 전자부품 전문기업입니다.",
                name: "글로벌 리더십",
                title: "Global Leadership",
                backgroundImage: "/images/automotive_category_banner.png"
              },
              {
                quote: "고객과의 신뢰를 바탕으로 함께 성장합니다.",
                name: "고객 중심",
                title: "Customer Focus",
                backgroundImage: "/images/automotive_category_banner.png"
              },
              {
                quote: "환경과 사회적 책임을 다하는 기업이 되겠습니다.",
                name: "사회적 책임",
                title: "Social Responsibility",
                backgroundImage: "/images/automotive_category_banner.png"
              }
            ]}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
        </div>

      </section>
    

    </main>
  );
}
