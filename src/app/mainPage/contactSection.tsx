"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from "react";
import Image from "next/image";
import { 
  ArrowRightIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeIcon, 
  ClockIcon, 
  NewspaperIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  LinkIcon,
  ExternalLinkIcon,
  BuildingIcon,
  TagIcon,
  InfoIcon
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 연락처 정보
const CONTACT_METHODS = [
  {
    icon: PhoneIcon,
    title: "전화",
    value: "02-123-4567",
    description: "평일 09:00 - 18:00",
    action: "tel:02-123-4567",
    tooltip: "영업 및 기술 문의를 위한 대표 전화번호입니다."
  },
  {
    icon: MailIcon,
    title: "이메일",
    value: "info@daehanplus.com",
    description: "24시간 문의 가능",
    action: "mailto:info@daehanplus.com",
    tooltip: "견적 및 일반 문의를 위한 이메일 주소입니다."
  },
  {
    icon: GlobeIcon,
    title: "웹사이트",
    value: "www.daehanplus.com",
    description: "제품 정보 및 자료",
    action: "https://www.daehanplus.com",
    tooltip: "회사 홈페이지에서 다양한 제품 정보와 자료를 확인하실 수 있습니다."
  },
  {
    icon: MapPinIcon,
    title: "주소",
    value: "서울시 강남구 테헤란로 123",
    description: "우편번호: 06123",
    action: "https://maps.google.com/?q=서울시+강남구+테헤란로+123",
    tooltip: "본사 위치는 강남역 3번 출구에서 도보 5분 거리에 있습니다."
  }
];

// 회사 뉴스 데이터
const COMPANY_NEWS = [
  {
    id: "news-1",
    title: "대한플러스전자, LED 드라이버 IC 신제품 출시",
    date: "2023-05-15",
    summary: "대한플러스전자가 에너지 효율이 30% 향상된 새로운 LED 드라이버 IC 제품군을 출시했습니다.",
    category: "제품 소식",
    image: "/images/news-1.jpg",
    url: "/news/led-driver-ic-release"
  },
  {
    id: "news-2",
    title: "자동차 전장 솔루션 전시회 참가 안내",
    date: "2023-06-10",
    summary: "오는 7월 15일부터 3일간 코엑스에서 열리는 자동차 전장 솔루션 전시회에 참가합니다.",
    category: "전시회",
    image: "/images/news-2.jpg",
    url: "/news/automotive-expo"
  },
  {
    id: "news-3",
    title: "2023년 2분기 실적 발표",
    date: "2023-07-20",
    summary: "대한플러스전자의 2023년 2분기 실적이 전년 동기 대비 15% 성장했습니다.",
    category: "경영 소식",
    image: "/images/news-3.jpg",
    url: "/news/q2-performance"
  }
];

// 연락처 카드 컴포넌트
const ContactCard = ({ icon: Icon, title, value, description, action, tooltip }) => (
  <Link href={action} target={action.startsWith('http') ? '_blank' : undefined}>
    <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md relative overflow-hidden">
      {/* 호버 시 상단 효과 */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-blue-600 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-1 flex-grow">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="w-3.5 h-3.5 ml-1.5 text-blue-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                  <p className="text-xs text-gray-600">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-base font-semibold text-black">
            {value}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            {description}
          </p>
        </div>
        <div className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  </Link>
);

// 뉴스 카드 컴포넌트
const NewsCard = ({ title, date, summary, category, image, url }) => (
  <Link href={url}>
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-blue-200 hover:shadow-md flex flex-col h-full">
      {/* 이미지 섹션 */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-black/80 hover:bg-black/90 text-white text-xs backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="flex-grow flex flex-col p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
        
        <h3 className="font-semibold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {summary}
        </p>
        
        <div className="mt-auto pt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
            자세히 보기
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// 연락처 폼 버튼 컴포넌트
const ContactFormButton = () => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">문의하기</h3>
        <p className="text-sm text-gray-600">
          제품 문의, 견적 요청, 기술 지원 등 궁금한 사항이 있으시면 문의 양식을 작성해 주세요.
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">24시간 이내 답변</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">전문 엔지니어의 기술 상담</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">맞춤형 견적 제공</span>
        </div>
      </div>
      
      <Link href="/contact" className="block">
        <div className="group w-full px-4 py-3 flex items-center justify-center gap-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors">
          <MailIcon className="w-4 h-4" />
          문의 양식 작성하기
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  </div>
);

// 회사 정보 카드 컴포넌트
const CompanyInfoCard = () => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">회사 정보</h3>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">Since 2000</Badge>
        </div>
        <p className="text-sm text-gray-600">
          대한플러스전자는 20년 이상의 경험을 바탕으로 반도체 부품 유통 및 기술 지원 서비스를 제공합니다.
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <BuildingIcon className="w-4 h-4 text-blue-600" />
          <span>사업자등록번호: 123-45-67890</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <TagIcon className="w-4 h-4 text-blue-600" />
          <span>업종: 전자부품 도매 및 수입</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <ClockIcon className="w-4 h-4 text-blue-600" />
          <span>영업시간: 평일 09:00 - 18:00</span>
        </div>
      </div>
      
      <Link href="/about" className="block">
        <div className="group w-full px-4 py-3 flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm font-medium hover:border-blue-300 hover:text-blue-700 transition-all">
          <GlobeIcon className="w-4 h-4" />
          회사 소개 자세히 보기
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  </div>
);

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState("contact");
  
  return (
    <div className="container py-16 lg:py-24 mx-auto">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          연락처 및 소식
        </h2>
        <div className="h-0.5 w-16 bg-blue-600 rounded-full" />
        <p className="max-w-3xl text-base md:text-lg text-gray-600">
          궁금한 점이 있으시거나 제품에 관한 문의가 필요하신가요?
          <br className="hidden md:block" />
          언제든지 연락 주시면 빠르게 답변 드리겠습니다.
        </p>
        
        <Tabs 
          defaultValue="contact"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-md mt-4"
        >
          <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="contact" 
              className={cn(
                "rounded-md text-sm font-medium transition-all py-2",
                activeTab === "contact" ? "text-white shadow-sm" : "text-gray-700 hover:text-blue-600"
              )}
            >
              <PhoneIcon className="w-4 h-4 mr-2" />
              연락처
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className={cn(
                "rounded-md text-sm font-medium transition-all py-2",
                activeTab === "news" ? "text-white shadow-sm" : "text-gray-700 hover:text-blue-600"
              )}
            >
              <NewspaperIcon className="w-4 h-4 mr-2" />
              소식
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-0">
              언제든지 연락주세요
            </Badge>
          </TabsContent>
          
          <TabsContent value="news">
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0">
              최신 소식을 확인하세요
            </Badge>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "contact" ? (
        <motion.div 
          key="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {/* 연락처 카드 그리드 */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTACT_METHODS.map((method, index) => (
              <ContactCard
                key={index}
                icon={method.icon}
                title={method.title}
                value={method.value}
                description={method.description}
                action={method.action}
                tooltip={method.tooltip}
              />
            ))}
          </div>
          
          {/* 오른쪽 사이드 컬럼 */}
          <div className="lg:col-span-4 space-y-6">
            <ContactFormButton />
            <CompanyInfoCard />
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="news"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* 뉴스 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_NEWS.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                date={news.date}
                summary={news.summary}
                category={news.category}
                image={news.image}
                url={news.url}
              />
            ))}
          </div>
          
          {/* 모든 뉴스 보기 버튼 */}
          <div className="flex justify-center">
            <Link href="/news" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-full border border-gray-300 transition-colors text-sm font-medium">
              모든 소식 보기
              <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}