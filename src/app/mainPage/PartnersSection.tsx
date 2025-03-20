"use client";

import Image from "next/image"
import Link from "next/link";
import { BriefcaseIcon, SettingsIcon, HeartIcon, LightbulbIcon, MountainSnow, FlowerIcon, ArrowRightIcon, ExternalLinkIcon, PlusIcon, CheckIcon, InfoIcon, TrendingUpIcon, StarIcon, AwardIcon, GlobeIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";

// 파트너 정보 추가
const PARTNER_INFO = {
  "Macroblock": "설립: 1999년, 직원: 200+, 주요제품: 디스플레이/조명용 LED 드라이버 IC, 특징: 세계 1위 시장점유율, 신뢰성",
  "Zowie": "설립: 1980년, 직원: 150+, 주요제품: 다이오드, 정류기, TVS, 특징: 자동차 부품 인증",
  "LLT": "설립: 2003년, 직원: 500+, 주요제품: 커넥터/케이블, 특징: 산업용 연결 솔루션",
  "Morethanall": "설립: 1995년, 직원: 120+, 주요제품: 보드-보드/FPC 커넥터, 특징: 맞춤형 설계",
  "Kube Electronics": "설립: 1978년, 직원: 80+, 주요제품: 각종 센서, 특징: 스위스 정밀 기술",
  "XLSEMI": "설립: 2012년, 직원: 100+, 주요제품: 전원관리 IC, 특징: 혁신적 설계",
  "Powtech": "설립: 2000년, 직원: 250+, 주요제품: 전원관리 IC, 자동차 부품, 특징: 한국 기업",
  "GTM": "설립: 2005년, 직원: 180+, 주요제품: 전원관리 IC, 특징: LDO 및 MOSFET 전문"
};

// 파트너사 데이터
const PARTNER_DATA = [
    {
        id: "macroblock",
        title: "Macroblock",
        categories: ["LED 드라이버 IC", "전원관리 IC","자동차 인증 부품"],
        logo: "/icons/macroblock-logo.png",
        country: "대만",
        type: "대기업",
        rating: 5,
        founded: 1999,
        subtitle: "드라이버 IC 부문 세계 1위 기업",
        description: ["LED Driver IC 전문 제조사", "디스플레이/조명/자동차 전장용", "AEC-Q100 인증 보유", "1999년 설립"],
        href: "/partners/macroblock"
    },
    {
        id: "zowie",
        title: "Zowie",
        categories: ["다이오드", "자동차 인증 부품"],
        logo: "/icons/zowie-logo.png",
        country: "대만",
        type: "중소기업",
        rating: 4,
        founded: 1980,
        subtitle: "고성능 정류 다이오드 전문 기업",
        description: ["다이오드 전문 제조", "TVS/쇼트키/정류기", "다양한 특허 및 인증 보유", "40년+ 기술력"],
        href: "/partners/zowie"
    },
    {
        id: "llt",
        title: "LLT",
        categories: ["커넥터&케이블"],
        logo: "/icons/llt-logo.png",
        country: "중국",
        type: "대기업",
        rating: 4,
        founded: 2003,
        subtitle: "가격, 성능, 신뢰성 보장하는 기업",
        description: ["커넥터/케이블 어셈블리", "산업용 커넥터 전문", "ISO 9001 인증", "맞춤형 솔루션"],
        href: "/partners/llt"
    },
    {
        id: "morethanall",
        title: "Morethanall",
        categories: ["커넥터&케이블"],
        logo: "/icons/morethanall-logo.png",
        country: "대만",
        type: "중소기업",
        rating: 4,
        founded: 1995,
        subtitle: "보드-보드/FPC 커넥터",
        description: ["보드-보드/FPC 커넥터", "자체 R&D 센터 보유", "맞춤형 설계 가능", "25년+ 경험"],
        href: "/partners/morethanall"
    },
    {
        id: "kube",
        title: "Kube Electronics",
        categories: ["센서"],
        logo: "/icons/kube-logo.png",
        country: "스위스",
        type: "가족기업",
        rating: 4,
        founded: 1978,
        subtitle: "센서 전문 기업",
        description: ["센서 전문 기업", "전문 제조사", "고신뢰성 제품", "생산"],
        href: "/partners/kube"
    },
    {
        id: "xlsemi",
        title: "XLSEMI",
        categories: ["전원관리 IC", "LED 드라이버 IC"],
        logo: "/icons/xlsemi-logo.png",
        country: "중국",
        type: "중소기업",
        rating: 3,
        founded: 2012,
        subtitle: "급성장중인 전원관리 IC 전문 기업",
        description: ["다양한 제품 스펙트럼", "설립 10년 이상", "급속 성장중", "전문 제조사"],
        href: "/partners/xlsemi"
    },
    {
        id: "powtech",
        title: "Powtech",
        categories: ["전원관리 IC", "LED 드라이버 IC", "자동차 인증 부품"],
        logo: "/icons/powtech-logo.png",
        country: "한국",
        type: "대기업",
        rating: 5,
        founded: 2000,
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업",
        description: ["자동차 전장 전문", "글로벌 인증 보유", "품질 관리 시스템", "기술 지원"],
        href: "/partners/powtech"
    },
    {
        id: "gtm",
        title: "GTM",
        categories: ["전원관리 IC" ],
        logo: "/logos/gtm-logo.png",
        country: "한국",
        type: "대기업",
        rating: 4,
        founded: 2005,
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업",
        description: ["전원관리 IC 및 전장용 부품 전문 기업", "글로벌 인증 보유", "LDO 및 MOSFET 전문 제조사"],
        href: "/partners/gtm"
    }
];

// 파트너 카테고리 탭
const PARTNER_TABS = [
  { title: "전체", icon: BriefcaseIcon },
  { title: "LED 드라이버 IC", icon: LightbulbIcon },
  { title: "다이오드", icon: SettingsIcon },
  { title: "전원관리 IC", icon: HeartIcon },
  { title: "커넥터&케이블", icon: FlowerIcon },
  { title: "수동 소자", icon: MountainSnow },
  { title: "센서", icon: FlowerIcon },
  { title: "자동차 인증 부품", icon: MountainSnow }
];

// 정렬 옵션
const SORT_OPTIONS = [
  { value: "default", label: "기본 정렬" },
  { value: "name", label: "이름 순" },
  { value: "rating", label: "평점 순" },
  { value: "founded", label: "설립일 순" }
];

// 지역 필터 옵션
const REGION_OPTIONS = [
  { value: "all", label: "전체 지역" },
  { value: "대만", label: "대만" },
  { value: "중국", label: "중국" },
  { value: "한국", label: "한국" },
  { value: "스위스", label: "스위스" }
];

interface PartnerCardProps {
  logo: string;
  title: string;
  categories: string[];
  country: string;
  type: string;
  subtitle: string;
  description: string[];
  href: string;
  rating: number;
}

const RatingStar = ({ filled }: { filled: boolean }) => (
  <div className="text-gray-300">
    <StarIcon className={`w-3.5 h-3.5 ${filled ? 'fill-yellow-400 text-yellow-400' : ''}`} />
  </div>
);

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  logo, title, categories, country, type, subtitle, description, href, rating 
}) => (
  <Link href={href}>
    <div className="group relative bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
      </div>
      
      {/* 상단 스타일 배지 */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center group-hover:border-blue-100 transition-colors">
            <Image 
              src={logo} 
              alt={`${title} 로고`} 
              width={56}
              height={56}
              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-black group-hover:text-blue-600 transition-colors">{title}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="w-3.5 h-3.5 text-blue-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 max-w-xs">
                    <div className="space-y-2 text-sm text-left">
                      <p className="text-gray-600 text-xs">{PARTNER_INFO[title]}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-1.5 mt-1 items-center">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 px-1.5 py-0 text-[10px] rounded-md">
                {country}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 px-1.5 py-0 text-[10px] rounded-md">
                {type}
              </Badge>
              <div className="flex ml-1">
                {[...Array(5)].map((_, i) => (
                  <RatingStar key={i} filled={i < rating} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-[1px] bg-gray-100 group-hover:bg-blue-50 transition-colors" />
          <div>
            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{subtitle}</p>
          </div>
          <ul className="space-y-1.5">
            {description.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 group-hover:w-1.5 group-hover:h-1.5 transition-all" />
                {item}
              </li>
            ))}
          </ul>
          
          {/* 카테고리 태그 */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {categories.map((category, idx) => (
              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-600 border-0 px-2 py-0.5 text-[10px] rounded-full">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-9 flex items-center justify-center bg-black text-white text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="font-medium text-xs">자세히 알아보기</span>
        <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

// 파트너 섹션 컴포넌트
export default function PartnersSection() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [sortOption, setSortOption] = useState<string>("default");
    const [regionFilter, setRegionFilter] = useState<string>("all");

    const filteredPartners = useMemo(() => {
        // 카테고리 필터링
        let filtered = [...PARTNER_DATA];
        if (selectedTab !== 0) {
            const selectedCategory = PARTNER_TABS[selectedTab].title;
            filtered = filtered.filter(partner => 
                partner.categories.includes(selectedCategory)
            );
        }
        
        // 지역 필터링
        if (regionFilter !== "all") {
            filtered = filtered.filter(partner => 
                partner.country === regionFilter
            );
        }
        
        // 정렬
        switch (sortOption) {
            case "name":
                return [...filtered].sort((a, b) => 
                    a.title.localeCompare(b.title)
                );
            case "rating":
                return [...filtered].sort((a, b) => 
                    b.rating - a.rating
                );
            case "founded":
                return [...filtered].sort((a, b) => 
                    a.founded - b.founded
                );
            default:
                return filtered;
        }
    }, [selectedTab, sortOption, regionFilter]);

    return (
        <div className="container py-16 lg:py-24 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* 왼쪽 컬럼 - 고정 위치 */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <Link href="/partners" className="block group">
                        <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md group-hover:-translate-y-1">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-3xl font-bold text-black">
                                            파트너사
                                        </h1>
                                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Top 10</Badge>
                                    </div>
                                    <div className="h-0.5 w-16 bg-blue-600 rounded-full" />
                                    <p className="text-base font-medium text-gray-700">
                                        &quot;글로벌 파트너십으로 함께 신뢰를 만들어 가고 있습니다.&quot;
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-base leading-relaxed text-gray-600">
                                        <strong className="text-black font-semibold">대한플러스전자(주)</strong>는 전 세계 최고의 반도체 부품 제조사들과의 파트너십을 통해 고객에게 최고의 품질과 신뢰성을 제공하고 있습니다.
                                    </p>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center gap-2 group/item">
                                            <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                            <span className="group-hover/item:text-black transition-colors">글로벌 제조사와의 직접 파트너십</span>
                                        </li>
                                        <li className="flex items-center gap-2 group/item">
                                            <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                            <span className="group-hover/item:text-black transition-colors">엄격한 품질 관리 시스템</span>
                                        </li>
                                        <li className="flex items-center gap-2 group/item">
                                            <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                            <span className="group-hover/item:text-black transition-colors">신속한 기술 지원 서비스</span>
                                        </li>
                                    </ul>
                                    
                                    {/* 파트너 통계 */}
                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center justify-center gap-1 bg-gray-50 hover:bg-blue-50 transition-colors p-3 rounded-xl cursor-help">
                                                        <GlobeIcon className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-lg font-bold text-black">4+</p>
                                                            <p className="text-xs text-gray-600">국가</p>
                                                        </div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs">
                                                    대만, 중국, 한국, 스위스 등 다국적 파트너십
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center justify-center gap-1 bg-gray-50 hover:bg-blue-50 transition-colors p-3 rounded-xl cursor-help">
                                                        <AwardIcon className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-lg font-bold text-black">8+</p>
                                                            <p className="text-xs text-gray-600">파트너사</p>
                                                        </div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs">
                                                    글로벌 1위 LED 드라이버 IC 제조사 포함
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center justify-center gap-1 bg-gray-50 hover:bg-blue-50 transition-colors p-3 rounded-xl cursor-help">
                                                        <TrendingUpIcon className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-lg font-bold text-black">20+</p>
                                                            <p className="text-xs text-gray-600">경험</p>
                                                        </div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs">
                                                    20년 이상의 파트너십 관리 경험
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center justify-center gap-1 bg-gray-50 hover:bg-blue-50 transition-colors p-3 rounded-xl cursor-help">
                                                        <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-lg font-bold text-black">7+</p>
                                                            <p className="text-xs text-gray-600">카테고리</p>
                                                        </div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs">
                                                    다양한 제품 카테고리 취급
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="group/btn flex justify-center items-center w-full mt-6 px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-all duration-200">
                                파트너사 더 알아보기
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        {/* 카테고리 필터 */}
                        <div className="overflow-x-auto pb-2 scrollbar-hide w-full sm:w-auto">
                            <div className="flex gap-2">
                                {PARTNER_TABS.map((tab, index) => (
                                    <button
                                        key={tab.title}
                                        onClick={() => setSelectedTab(index)}
                                        className={`
                                            flex items-center gap-1.5 px-3 py-2 rounded-lg
                                            transition-all duration-200 text-sm font-medium whitespace-nowrap
                                            ${selectedTab === index 
                                                ? 'bg-black text-white shadow-md scale-105' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                        `}
                                    >
                                        <tab.icon className={`w-4 h-4 ${selectedTab === index ? 'animate-pulse' : ''}`} />
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* 정렬 및 필터 옵션 */}
                        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="text-sm p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-gray-300 transition-colors"
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            
                            <select 
                                value={regionFilter}
                                onChange={(e) => setRegionFilter(e.target.value)}
                                className="text-sm p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-gray-300 transition-colors"
                            >
                                {REGION_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 검색결과 뱃지 */}
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-0 px-2 py-1">
                            검색결과: {filteredPartners.length}
                        </Badge>
                        
                        {regionFilter !== "all" && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 px-2 py-1 flex items-center gap-1">
                                지역: {regionFilter}
                                <button 
                                    onClick={() => setRegionFilter("all")}
                                    className="ml-1 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </Badge>
                        )}
                        
                        {selectedTab !== 0 && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 px-2 py-1 flex items-center gap-1">
                                카테고리: {PARTNER_TABS[selectedTab].title}
                                <button 
                                    onClick={() => setSelectedTab(0)}
                                    className="ml-1 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </Badge>
                        )}
                    </div>

                    {/* 파트너사 카드 목록 */}
                    <motion.div 
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        key={`${selectedTab}-${sortOption}-${regionFilter}`}
                    >
                        {filteredPartners.length > 0 ? (
                            filteredPartners.map((partner, index) => (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <PartnerCard
                                        logo={partner.logo}
                                        title={partner.title}
                                        categories={partner.categories}
                                        country={partner.country}
                                        type={partner.type}
                                        subtitle={partner.subtitle}
                                        description={partner.description}
                                        href={partner.href}
                                        rating={partner.rating}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl">
                                <p className="text-gray-500 text-center mb-4">검색 결과가 없습니다</p>
                                <button
                                    onClick={() => {
                                        setSelectedTab(0);
                                        setRegionFilter("all");
                                        setSortOption("default");
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                                >
                                    필터 초기화
                                </button>
                            </div>
                        )}

                        {filteredPartners.length > 0 && (
                            <Link href="/partners" className="flex items-center justify-center">
                                <div className="flex flex-col items-center justify-center h-full min-h-[220px] border border-dashed border-gray-300 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50/20 transition-colors text-gray-500 hover:text-blue-600 group">
                                    <div className="rounded-full bg-gray-100 p-3 mb-3 group-hover:bg-blue-100 transition-colors">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-medium">더 많은 파트너사 보기</p>
                                </div>
                            </Link>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
