"use client";

import Image from "next/image"
import Link from "next/link";
import { BriefcaseIcon, SettingsIcon, LightbulbIcon, MountainSnow, FlowerIcon, ArrowRightIcon, Search, StarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  { title: "전원관리 IC", icon: MountainSnow },
  { title: "커넥터&케이블", icon: FlowerIcon },
  { title: "센서", icon: StarIcon },
  { title: "자동차 인증 부품", icon: BriefcaseIcon }
];

// 정렬 옵션
const SORT_OPTIONS = [
  { value: "default", label: "기본 정렬" },
  { value: "name", label: "이름 순" },
  { value: "rating", label: "평점 순" },
  { value: "founded", label: "설립일 순" }
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
  <div className="text-gray-600">
    <StarIcon className={`w-3.5 h-3.5 ${filled ? 'fill-yellow-400 text-yellow-400' : ''}`} />
  </div>
);

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  logo, title, categories, country, type, subtitle, description, href, rating 
}) => (
  <Link href={href}>
    <div className="group relative h-full bg-white/5 backdrop-blur-sm rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-700 hover:bg-blue-900/10 hover:-translate-y-1 cursor-pointer overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden flex items-center justify-center group-hover:border-blue-800 transition-colors">
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
              <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">{title}</h3>
            </div>
            <div className="flex gap-1.5 mt-1 items-center">
              <Badge className="bg-blue-900/40 text-blue-300 border-0 px-1.5 py-0 text-[10px] rounded-md">
                {country}
              </Badge>
              <Badge className="bg-blue-900/40 text-blue-300 border-0 px-1.5 py-0 text-[10px] rounded-md">
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
          <div className="h-[1px] bg-gray-800 group-hover:bg-blue-800/50 transition-colors" />
          <div>
            <p className="text-sm font-medium text-gray-300 group-hover:text-blue-300 transition-colors">{subtitle}</p>
          </div>
          <ul className="space-y-1.5">
            {description.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 group-hover:w-1.5 group-hover:h-1.5 transition-all" />
                {item}
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex flex-wrap gap-1.5">
            {categories.map((category, index) => (
              <Badge key={index} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0 text-[9px]">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// 파트너 섹션 컴포넌트
export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [sortOrder, setSortOrder] = useState<string>("default");
  
  // 필터링된 파트너 목록
  const filteredPartners = useMemo(() => {
    let result = [...PARTNER_DATA];
    
    // 카테고리 필터링
    if (activeCategory !== "전체") {
      result = result.filter(partner => 
        partner.categories.includes(activeCategory)
      );
    }
    
    // 정렬 적용
    switch (sortOrder) {
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "founded":
        result.sort((a, b) => a.founded - b.founded);
        break;
      default:
        // 기본 정렬은 원래 순서 유지
        break;
    }
    
    return result;
  }, [activeCategory, sortOrder]);

  return (
    <section id="partners" className="py-16 sm:py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0 px-4 py-1.5 text-sm mb-6">
            PARTNERS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
            글로벌 파트너사
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            대한플러스전자(주)는 글로벌 선도 기업들과의 파트너십을 통해 
            최고 품질의 전자부품을 제공하고 있습니다.
          </p>
        </motion.div>
        
        {/* 카테고리 필터 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center flex-wrap gap-2">
            {PARTNER_TABS.map((tab, index) => {
              const isActive = activeCategory === tab.title;
              const Icon = tab.icon;
              
              return (
                <motion.button
                  key={tab.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                  onClick={() => setActiveCategory(tab.title)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-blue-900/20 text-gray-300 hover:bg-blue-800/50 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.title}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        {/* 정렬 옵션 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end mb-6"
        >
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm bg-gray-900 text-gray-300 border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* 파트너 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className="h-full"
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
          ))}
        </div>
        
        {filteredPartners.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 mb-4 bg-blue-900/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-800/50">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">파트너사를 찾을 수 없습니다</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              선택하신 카테고리에 해당하는 파트너사가 없습니다. 다른 카테고리를 선택해주세요.
            </p>
            <button
              onClick={() => setActiveCategory("전체")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              모든 파트너사 보기
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
