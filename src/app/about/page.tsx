import { Handshake, Building2, CalendarDays, Lightbulb, MapPin, Users, Printer, Phone, Mail, Cpu, User, ExternalLink, Globe, BarChart, Shield, Compass, ChevronRight } from "lucide-react";
import AboutLayout from "./AboutLayout";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedFeatureCard from "./components/AnimatedFeatureCard";
import AnimatedLogoImage from "./components/AnimatedLogoImage";
import AnimatedTabContent from "./components/AnimatedTabContent";
import DynamicIcon from "./components/DynamicIcon";

export default function AboutPage() {
  const features = [
    {
      iconName: "Handshake",
      name: "CEO 인사말",
      description: "대한플러스전자의 비전과 가치를 소개합니다",
      href: "/about/greeting",
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
      iconColor: "text-blue-500",
    },
    {
      iconName: "CalendarDays",
      name: "회사연혁",
      description: "Since 1997",
      href: "/about/history", 
      color: "bg-gradient-to-br from-amber-50 to-yellow-100",
      iconColor: "text-amber-500",
    },
    {
      iconName: "MapPin",
      name: "찾아오시는 길",
      description: "주소 및 주차 안내",
      href: "/about/location",
      color: "bg-gradient-to-br from-emerald-50 to-green-100",
      iconColor: "text-emerald-500",
    },
  ];

  const partnerItems = [
    { name: "Macroblock", category: "LED Driver IC", since: "1999년" },
    { name: "XLSEMI", category: "LED Driver IC", since: "2018년" },
    { name: "Zowie", category: "Diode", since: "2006년" },
    { name: "BPS", category: "LED Driver IC", since: "2010년" },
    { name: "LLT", category: "Waterproof Connectors", since: "2014년" }
  ];

  const businessAreas = [
    { name: "LED 드라이버 IC 유통", icon: "Cpu", description: "Macroblock, XLSEMI 등 글로벌 제조사의 고품질 LED 드라이버 IC 공급" },
    { name: "전자부품 유통", icon: "Lightbulb", description: "Zowie, POWTECH 등 다양한 전자 부품 공급 및 기술 지원" },
    { name: "LED 클러스터 R&D", icon: "Lightbulb", description: "RGB 클러스터 연구개발 및 기술 컨설팅 제공" },
    { name: "기술 컨설팅", icon: "Compass", description: "LED 디스플레이 솔루션 설계 및 최적화 컨설팅 서비스" }
  ];

  return (
    <AboutLayout
      title="회사소개"
      icon={<DynamicIcon name="Building2" className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
      ]}
      description="대한플러스전자(주)는 1997년 설립된 LED 드라이버 IC 및 반도체 부품 유통 전문기업으로, Macroblock, XLSEMI 등 글로벌 제조사의 한국 공식 대리점으로서 안정적인 공급망을 구축하고 있습니다."
      badges={[
        {
          text: "LED 드라이버 IC 전문",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30"
        },
        {
          text: "전자부품 유통",
          bgColor: "bg-sky-500/20", 
          textColor: "text-sky-400",
          hoverColor: "hover:bg-sky-500/30"
        }
      ]}
    >
      <div className="space-y-16">

        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium">COMPANY INFO</span>
          </div>
          <h2 className="text-2xl font-bold text-white">회사 정보</h2>
          <p className="text-gray-400 max-w-2xl">대한플러스전자의 기업 정보를 확인해보세요.</p>
        </div>

        {/* 회사 정보 통합 섹션 */}
        <AnimatedTabContent>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <DynamicIcon name="Building2" className="w-5 h-5 text-blue-400" />
                    회사 개요
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* 기본 정보 카드 */}
                    <div className="space-y-4">
                      {[
                        { label: "회사명", iconName: "Building2", value: "대한플러스전자(주)" },
                        { label: "대표이사", iconName: "User", value: "김영구" },
                        { label: "설립일", iconName: "CalendarDays", value: "1997년 11월" },
                        { label: "주력 사업", iconName: "Cpu", value: "LED 드라이버 IC & 반도체 부품 유통" }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="rounded-lg p-2.5 bg-gray-900">
                            <DynamicIcon name={item.iconName} className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-400">{item.label}</p>
                            <p className="text-base text-white">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 연락처 정보 카드 */}
                    <div className="space-y-4">
                      {[
                        { 
                          label: "전화", 
                          iconName: "Phone", 
                          value: ["02-6679-5025", "02-6679-5026"] 
                        },
                        { 
                          label: "이메일", 
                          iconName: "Mail", 
                          value: <a href="mailto:dhes@dhes.co.kr" className="text-blue-400 hover:underline">dhes@dhes.co.kr</a> 
                        },
                        { 
                          label: "주소", 
                          iconName: "MapPin", 
                          value: ["서울특별시 구로구 경인로 53길 15", "중앙유통단지 바동 3217 ~ 3218호"] 
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="rounded-lg p-2.5 bg-gray-900">
                            <DynamicIcon name={item.iconName} className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-400">{item.label}</p>
                            <div className="text-base text-white">
                              {Array.isArray(item.value) ? 
                                item.value.map((v, j) => (
                                  <p key={j}>{v}</p>
                                )) : 
                                item.value
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <DynamicIcon name="Lightbulb" className="w-5 h-5 text-blue-400" />
                    회사 소개
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-medium text-white">대한플러스전자(주)</span>는 1997년 11월 설립된 LED 드라이버 IC 및 반도체 부품 유통 전문기업입니다. 서울특별시 구로구 중앙유통단지에 본사를 두고 있으며, Macroblock, Zowie 등 글로벌 기업들과의 파트너십을 통해 국내 시장을 선도하고 있습니다.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    LED 디스플레이 산업 발전과 함께 성장해온 당사는 2009년 부천지사 설립을 통해 LED RGB Cluster R&D 분야로 사업 영역을 확대하였으며, LED 조명, 광고용 디스플레이, 산업용 전자기기 등 다양한 산업 분야에 핵심 부품을 공급하고 있습니다.
                  </p>
                  
                  <h3 className="text-white font-medium text-lg mt-6">핵심 역량</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "선제적 재고 확보 및 품질 관리",
                      "20년 이상의 LED 드라이버 IC 전문 노하우",
                      "신속한 납기 및 기술 지원",
                      "신뢰성 있는 글로벌 파트너십 구축",
                      "LED 클러스터 및 디스플레이 기술 R&D",
                      "산업용 전자부품 토탈 솔루션 제공"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 오른쪽: 회사 이미지 */}
            <div className="lg:col-span-4">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 overflow-hidden">
                <div className="p-8 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <AnimatedLogoImage
                    src="/logos/dhp-logo.png"
                    alt="대한플러스전자(주)"
                    width={220}
                    height={110}
                  />
                </div>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full bg-transparent border-gray-700 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                    <Link href="/path/to/company-brochure.pdf" className="flex items-center justify-center gap-2">
                      회사소개서 다운로드
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </AnimatedTabContent>

        {/* Divider with blue gradient */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-8"></div>

        {/* 파트너사 섹션 헤딩 */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium">PARTNERS</span>
          </div>
          <h2 className="text-2xl font-bold text-white">글로벌 파트너십</h2>
          <p className="text-gray-400 max-w-2xl">세계적인 LED 및 반도체 제조사들과의 전략적 파트너십을 통해 최신 기술과 고품질 제품을 안정적으로 공급하고 있습니다.</p>
        </div>

        {/* 파트너사 섹션 */}
        <AnimatedTabContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerItems.map((partner, idx) => (
              <Link 
                href="/partners" 
                key={idx}
                className="p-5 bg-gray-900/50 backdrop-blur-sm rounded-lg flex items-center gap-4 hover:bg-gray-800/70 transition-colors border border-gray-800 group"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center border border-gray-700 group-hover:border-blue-500/30 transition-colors">
                  <span className="text-sm text-gray-300">Logo</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{partner.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-300">{partner.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span className="text-sm text-blue-400">Since {partner.since}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/partners" 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
            >
              모든 파트너사 보기
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedTabContent>

                {/* Divider with blue gradient */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-8"></div>


        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium">NAVIGATION</span>
          </div>
          <h2 className="text-2xl font-bold text-white">페이지 바로가기</h2>
          <p className="text-gray-400 max-w-2xl">대한플러스전자의 다양한 정보를 확인하실 수 있습니다.</p>
        </div>
        
        {/* 주요 페이지 링크 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={feature.name}
              name={feature.name}
              description={feature.description}
              href={feature.href}
              color={feature.color}
              iconColor={feature.iconColor}
              iconName={feature.iconName}
              index={index}
            />
          ))}
        </section>

        {/* Divider with blue gradient */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-8"></div>

      </div>
      
    </AboutLayout>
  );
}
