import { Handshake, Building2, CalendarDays, Lightbulb, MapPin, Users, Printer, Phone, Mail, Cpu, User } from "lucide-react";
import AboutLayout from "./AboutLayout";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LogoCarousel } from "@/components/ui/logo-carousel";

export default function AboutPage() {
  const features = [
    {
      Icon: Handshake,
      name: "CEO 인사말",
      description: "대한플러스전자의 비전과 가치를 소개합니다",
      href: "/about/greeting", 
      background: <div className="bg-blue-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "md:col-span-2 md:row-span-1 md:h-[200px] h-[150px]",
      enableGroupHover: true,
    },
    {
      Icon: CalendarDays,
      name: "회사연혁", 
      description: "Since 1997, ",
      href: "/about/history",
      background: <div className="bg-yellow-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "md:col-span-1 md:row-span-1 md:h-[200px] h-[150px]",
      enableGroupHover: true,
    },
    {
      Icon: Lightbulb,
      name: "사업 개요",
      description: "LED 드라이버 IC 및 전자부품 유통 사업",
      href: "/about/business",
      background: <div className="bg-green-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "md:col-span-1 md:row-span-1 md:h-[200px] h-[150px]",
      enableGroupHover: true,
    },
    {
      Icon: MapPin,
      name: "찾아오시는 길",
      description: "주소 및 주차 안내",
      href: "/about/location",
      background: <div className="bg-blue-100 h-full w-full" />,
      cta: "자세히 보기", 
      className: "md:col-span-2 md:row-span-1 md:h-[200px] h-[150px]",
      enableGroupHover: true,
    },
  ];

  return (
    <AboutLayout
      title="회사소개"
      icon={<Building2 className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
      ]}
      description="대한플러스전자(주)의 회사 소개 페이지입니다."
      badges={[
        {
          text: "LED 드라이버 IC 전문",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          hoverColor: "hover:bg-blue-200"
        },
        {
          text: "전자부품 유통",
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          hoverColor: "hover:bg-sky-200"
        }
      ]}
    >
      <div className="space-y-12">
        {/* 회사 개요 섹션 */}
        <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
          {/* 왼쪽: 회사 정보 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="order-2 lg:order-1 lg:col-span-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">개요</h3>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* 기본 정보 카드 */}
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="space-y-6">
                    {[
                      { label: "회사명", icon: Building2, value: "대한플러스전자(주)" },
                      { label: "대표이사", icon: User, value: "김영구" },
                      { label: "설립일", icon: CalendarDays, value: "1997년 11월" },
                      { label: "주력 사업 분야", icon: Cpu, value: "LED 드라이버 IC & 반도체 부품 유통" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <p className="font-bold text-gray-900">{item.label}</p>
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5 text-blue-600" />
                          <p className="text-gray-700">{item.value}</p>
                        </div>
                        {i < 3 && <div className="h-px bg-gray-100 mt-4" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 연락처 정보 카드 */}
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="space-y-6">
                    {[
                      { 
                        label: "전화", 
                        icon: Phone, 
                        value: ["02-6679-5025", "02-6679-5026"]
                      },
                      { 
                        label: "이메일", 
                        icon: Mail, 
                        value: <a href="mailto:dhes@dhes.co.kr" className="text-blue-600 hover:underline">dhes@dhes.co.kr</a>
                      },
                      { 
                        label: "주소", 
                        icon: MapPin, 
                        value: ["서울특별시 구로구 경인로 53길 15", "중앙유통단지 바동 3217 ~ 3218호"]
                      }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <p className="font-bold text-gray-900">{item.label}</p>
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5 text-blue-600" />
                          <div>
                            {Array.isArray(item.value) ? 
                              item.value.map((v, j) => (
                                <p key={j} className="text-gray-700">{v}</p>
                              )) : 
                              item.value
                            }
                          </div>
                        </div>
                        {i < 2 && <div className="h-px bg-gray-100 mt-4" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 회사 이미지 */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/logos/dhp-logo.png"
                    alt="대한플러스전자(주)"
                    width={200}
                    height={100}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 회사 소개 및 특징 섹션 */}
        <section className="space-y-12">
          {/* 회사 소개 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 space-y-4 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  회사 소개
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                <button className="group flex items-center justify-center mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all">
                회사소개서 다운로드
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              </div>
              
              <div className="md:w-2/3 md:pl-8 space-y-4 ">
                <p className="text-gray-600">
                  <strong className="text-gray-900">대한플러스전자(주)</strong>는 1997년 11월 설립된 LED 드라이버 IC 및 반도체 부품 유통 전문기업입니다. 서울특별시 구로구 중앙유통단지에 본사를 두고 있으며, Macroblock, XLSEMI 등 글로벌 기업들과의 파트너십을 통해 국내 시장을 선도하고 있습니다.
                </p>
                
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "선제적 재고 확보 및 품질 관리",
                    "최적의 물류 창고 운영",
                    "신속한 납기 및 고객 대응",
                    "신뢰성 있는 협력 관계 구축",
                    "LED 클러스터 및 디스플레이 기술 R&D"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 성과 섹션들 */}
        <section className="space-y-12">
          {/* 글로벌 제조사 협력 */}
          <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  글로벌 제조사와의 협력
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  세계적인 LED 및 반도체 제조사들과의 전략적 파트너십을 통해 최신 기술과 고품질 제품을 안정적으로 공급하고 있습니다.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-lg font-semibold">
                  상세 협력 현황
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      대한플러스전자(주)는 25년 이상의 신뢰를 바탕으로 Macroblock, XLSEMI 등 글로벌 제조사들과 독점 유통 계약을 체결하여 국내 시장에 프리미엄 LED 드라이버 IC와 반도체 부품을 공급하고 있습니다.
                    </p>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-2">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-500">Logo</span>
                            </div>
                            <CardTitle>Macroblock</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">대만 최대 LED 드라이버 IC 제조사로서, 연간 1억개 이상의 IC를 생산하며 글로벌 시장 점유율 35%를 차지하고 있습니다. 당사는 한국 독점 공급권을 보유하고 있습니다.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-2">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-500">Logo</span>
                            </div>
                            <CardTitle>XLSEMI</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">고성능 전력 관리 IC 전문 제조사로서, 자동차 및 산업용 장비에 사용되는 고신뢰성 제품을 생산하며 ISO 9001/14001 인증을 보유하고 있습니다.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* LED 기술 개발 */}
          <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  LED 기술 개발
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  지속적인 R&D 투자와 혁신을 통해 LED 디스플레이 및 조명 분야에서 독보적인 기술력을 확보하고 있습니다.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-500">Tech Image</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-lg font-semibold">
                  기술 개발 현황
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-8">
                    <p className="text-gray-600">
                      28년간의 LED 기술 연구개발 경험을 바탕으로, 연간 매출액의 15% 이상을 R&D에 투자하여 혁신적인 디스플레이와 조명 솔루션을 개발하고 있습니다.
                    </p>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle>LED RGB 클러스터 개발</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="w-full h-48 md:h-56 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-500">Product Image</span>
                            </div>
                            <p className="text-sm text-gray-600">특허 등록된 RBS-8E 클러스터 기술을 통해 전력 소비 30% 감소, 휘도 20% 향상을 달성했으며, 현재 글로벌 기업들과 기술 제휴를 확대하고 있습니다.</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle>기술 전시 및 성과</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="w-full h-24 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm text-gray-500">LED EXPO</span>
                              </div>
                              <div className="w-full h-24 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm text-gray-500">OLED EXPO</span>
                              </div>
                            </div>
                            <ul className="space-y-4">
                              <li className="flex flex-col md:flex-row items-start gap-2">
                                <Badge className="mt-1">LED EXPO 2023</Badge>
                                <span className="text-sm text-gray-600">혁신적인 3D LED 디스플레이 시스템으로 기술혁신상 수상</span>
                              </li>
                              <li className="flex flex-col md:flex-row items-start gap-2">
                                <Badge className="mt-1">OLED EXPO 2023</Badge>
                                <span className="text-sm text-gray-600">초고효율 마이크로 LED 기술 발표로 산업통상자원부 장관상 수상</span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* 대기업 협력 */}
          <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  대기업 고객사와의 협력
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  국내 주요 대기업들과의 장기적인 파트너십을 통해 안정적인 공급망을 구축하고 있습니다.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-lg font-semibold">
                  협력 현황 및 성과
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-8">
                    <p className="text-gray-600">
                      삼성전자, LG전자, 현대자동차 등 국내 대표 기업들과 10년 이상의 거래 관계를 유지하며, 연간 99.9% 이상의 납기 준수율과 불량률 0.001% 미만의 품질 신뢰성을 달성하고 있습니다.
                    </p>

                    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Badge variant="secondary">적기 납품</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">실시간 재고 관리 시스템을 통한 99.9% 이상의 납기 준수율 달성 및 24시간 이내 긴급 공급 체계 구축.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Badge variant="secondary">품질 보증</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">ISO 9001 인증 기반의 품질관리 시스템 운영 및 전수 검사를 통한 불량률 0.001% 미만 유지.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Badge variant="secondary">스마트 물류</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">IoT 기반 스마트 창고 시스템 도입으로 실시간 재고 추적 및 최적화된 공급망 관리 실현.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

{/* 파트너사 로고 */}
<section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
  <div className="flex items-center justify-between mb-6">
    <div className="space-y-4">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        파트너사
      </h3>
      <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
    </div>
  </div>
  <div className="relative overflow-hidden">
    <LogoCarousel
      columnCount={3}
logos={[
  {
    name: "Macroblock",
    id: 1,
    img: "/images/logos/macroblock-logo.png"
  },
  {
    name: "XLSEMI",
    id: 2,
    img: "/images/logos/xlsemi-logo.png"
  },
  {
    name: "DHP",
    id: 3,
    img: "/images/logos/dhp-logo.png"
  },
  {
    name: "GTM",
    id: 4,
    img: "/images/logos/GTM-logo.png"
  },
  {
    name: "Kube",
    id: 5,
    img: "/images/logos/kube-logo.png"
  },
  {
    name: "LLT",
    id: 6,
    img: "/images/logos/llt-logo.png"
  },
  {
    name: "MoreThanAll",
    id: 7,
    img: "/images/logos/morethanall-logo.png"
  },
  {
    name: "Powtech",
    id: 8,
    img: "/images/logos/powtech-logo.png"
  },
  {
    name: "Zowie",
    id: 9,
    img: "/images/logos/zowie-logo.png"
  }
]}
    />
  </div>
</section>

          {/* 하위페이지 네비게이션 */}
          <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  회사소개 메뉴
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
            </div>
            <BentoGrid className="flex flex-col md:grid md:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </section>
          </div>
        
    </AboutLayout>
  );
}
