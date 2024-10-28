"use client"
import React from 'react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Button } from '@/components/ui/button';
import { Building2, ChevronRightIcon, Download, Globe, MonitorPlay, Network, Users } from 'lucide-react';
import Image from 'next/image';
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

          <p className="mt-5">
                <a
                  className="inline-flex text-lg items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                  href="#"
                >
                 대표이사 인사말
                  <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
                </a>
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
                  title: "Technical Innovation",
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
      {/* 간단한 회사소개 섹션 */}
      <section>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className='flex-1'></div>
          <div className="flex-none  p-4">
            <div className="sticky top-0 w-full text-2xl font-bold">
              대한플러스전자 (주)
            </div>
          </div>

          <div className="flex-[2_1_30%] px-4">
            <div className="flex flex-col gap-2">
              <div className="flex-1  p-4">
                [회사명]은 1997년에 설립되어 25년이 넘는 시간 동안 반도체 유통업에 종사하며, 신뢰할 수 있는 글로벌 반도체 유통 파트너로 자리매김했습니다. 특히 LED 드라이버 IC를 포함한 다양한 반도체 부품을 Turn key 방식으로 제공하며, 고객에게 최적의 솔루션을 제안하고 있습니다.

              </div>
              <div className="flex-1 p-4">
                끊임없이 변화하는 기술 시장에 대응하기 위해 [회사명]은 LED 클러스터 R&D와 기술 개발 사업을 활발히 진행하고 있으며, 지속적인 연구와 협력을 통해 반도체 유통업계의 혁신을 이끌어가고 있습니다.

              </div>
              <div className="flex-1 gap-2 my-8">

                <Button className="relative h-12 px-8 rounded-3xl bg-[#3d3a4e] overflow-hidden cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-3xl before:bg-gradient-to-r before:from-[rgba(150,93,233,1)] before:to-[rgba(99,88,238,1)] before:scale-x-0 before:origin-left hover:before:scale-x-100 active:scale-110 before:transition-all before:duration-475">
                  <span className="relative z-10 text-white font-semibold">회사소개서</span>
                  <span className="relative z-10 ml-2">
                    <Download className="w-5 fill-white" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className='flex-1'></div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">법적인 서비스</h3>
              <p className="text-sm text-gray-600 text-center">
                분쟁조정 서비스를 및<br />
                중소 중견기업 상담을 지원
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">세계화 지원</h3>
              <p className="text-sm text-gray-600 text-center">
                새로운 중소기업의 지원 및<br />
                글로벌화 지원
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <MonitorPlay className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">디지털 서비스</h3>
              <p className="text-sm text-gray-600 text-center">
                디지털화된 서비스 상담 및<br />
                이해관계자 지원
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Network className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">글로벌 네트워크</h3>
              <p className="text-sm text-gray-600 text-center">
                글로벌 수준의 파트너십과<br />
                수출 컨설팅 지원
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">고객 지원</h3>
              <p className="text-sm text-gray-600 text-center">
                신속한 수출상담 제공 및<br />
                수출자 지원가능 제공
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 간단 비전 및 회사 연혁 */}

      {/* 파트너사 */}

      {/* 찾아오시는 길 */}

    </main>
  );
}
