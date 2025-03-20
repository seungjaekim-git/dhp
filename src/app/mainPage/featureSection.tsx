"use client";
import {
    ArrowRightIcon,
    BuildingIcon,
    HandshakeIcon, 
    CircuitBoardIcon,
    TargetIcon,
    ExternalLinkIcon,
    CheckIcon,
    InfoIcon,
    StarIcon,
    GlobeIcon,
    ScaleIcon,
    TrendingUpIcon,
    ZapIcon,
    ShieldCheckIcon,
    HeartIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// 추가 정보
const FEATURE_INFO = {
    "고객 여러분들과 함께 성장하고 싶습니다.": "25년 이상의 업계 경험을 바탕으로 고객사와의 동반성장을 추구합니다.",
    "성장 동반 협력 체계": "국내외 50개 이상의 제조사와 파트너십을 통한 안정적인 공급망 구축",
    "광범위한 제품 라인업": "10,000개 이상의 다양한 제품 라인업으로 원스톱 솔루션 제공",
    "최적의 상품 제안": "고객 맞춤형 기술 컨설팅으로 최적의 부품 선정 지원"
};

const features = [
    {
        icon: <BuildingIcon className="w-8 h-8" />,
        title: "고객 여러분들과 함께 성장하고 싶습니다.",
        description: "대한플러스전자(주)는 고객사와의 신뢰를 바탕으로 함께 성장하는 동반자가 되고자 합니다. 여러분의 성공을 위해 최선을 다하겠습니다.",
        link: "/about/greeting",
        linkText: "CEO 인사말 바로가기",
        badge: "회사소개"
    },
    {
        icon: <HandshakeIcon className="w-8 h-8" />,
        title: "성장 동반 협력 체계",
        description: "대한플러스전자(주)는 기업과 고객에게 성장기회가 될 수 있게 최적의 전자제품 솔루션을 제공하고 공유하는 비즈니스 협약을 구축하여 고객과 함께 성장해왔습니다.",
        link: "/partners", 
        linkText: "파트너사 바로가기",
        badge: "파트너십"
    },
    {
        icon: <CircuitBoardIcon className="w-8 h-8" />,
        title: "광범위한 제품 라인업",
        description: "LED Driver IC, Diode, Sensor부터 Connector & Cable, 자동차 부품까지 다양한 전자 부품을 공급합니다. 국내외 유수 제조사와의 협력을 통해 안정적인 공급망을 구축했습니다.",
        link: "/products",
        linkText: "제품 카테고리 바로가기",
        badge: "제품정보"
    },
    {
        icon: <TargetIcon className="w-8 h-8" />,
        title: "최적의 상품 제안",
        description: "고객의 니즈를 정확히 파악하여 최적화된 제품을 제안합니다. 전문 컨설팅을 통해 비용 효율적이고 신뢰할 수 있는 솔루션을 제공합니다.",
        link: "/support",
        linkText: "고객 지원 바로가기",
        badge: "컨설팅"
    }
];

// 통계 데이터
const STATS = [
    { value: "20+", label: "업력", icon: TrendingUpIcon, tooltip: "20년 이상의 반도체 유통 및 기술 지원 경험" },
    { value: "500+", label: "제품 라인업", icon: ZapIcon, tooltip: "500개 이상의 다양한 반도체 부품 라인업 보유" },
    { value: "98%", label: "고객 만족도", icon: HeartIcon, tooltip: "98%의 높은 고객 만족도와 재구매율" },
    { value: "30+", label: "글로벌 파트너", icon: GlobeIcon, tooltip: "30개 이상의 글로벌 제조사와의 파트너십" }
];

export default function FeatureSection() {
    return (
        <div className="container mx-auto px-4 py-16 lg:py-24 bg-[#fafafa]">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                    대한플러스전자(주) 특장점
                </h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    20년 이상의 경험과 전문성을 바탕으로 고객에게 최적의 전자부품 솔루션을 제공합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                {/* 왼쪽 컬럼 - 고정 위치 */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
                    <Link href="/about" className="block group">
                        <div className="space-y-8 p-10 bg-white rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:border-blue-200 hover:shadow-lg group-hover:translate-y-[-4px]">
                            <div className="space-y-8">
                                <div className="space-y-5 transition-transform duration-200">
                                    <div className="relative">
                                        <div className="relative w-20 h-20 overflow-hidden">
                                            <Image 
                                                src="/logos/dhp-logo.png" 
                                                alt="대한플러스전자(주)" 
                                                width={80} 
                                                height={80} 
                                                className="object-contain"
                                            />
                                        </div>
                                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 px-3 py-1 text-sm">
                                            <StarIcon className="w-4 h-4 mr-1" /> 대표기업
                                        </Badge>
                                    </div>
                                    <h1 className="text-4xl font-bold text-black tracking-tight">
                                        대한플러스전자(주)
                                    </h1>
                                    <div className="h-1 w-20 bg-blue-600 rounded-full" />
                                    <p className="text-xl font-medium text-gray-700">
                                        &quot;고객의 성공이 곧 우리의 성공입니다&quot;
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        <strong className="text-black font-semibold">대한플러스전자(주)</strong>는 고객의 신뢰와 만족을 위해 항상 노력하는 <strong className="text-black font-semibold border-b-2 border-blue-500 pb-0.5">LED 드라이버 IC 전문 유통기업</strong>입니다.
                                    </p>
                                    <ul className="space-y-4 text-base text-gray-600">
                                        <li className="flex items-center gap-3 group/item">
                                            <span className="p-2 rounded-full bg-blue-50 text-blue-600">
                                                <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                            </span>
                                            <span className="group-hover/item:text-black transition-colors">품질과 신뢰성 보장</span>
                                        </li>
                                        <li className="flex items-center gap-3 group/item">
                                            <span className="p-2 rounded-full bg-blue-50 text-blue-600">
                                                <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                            </span>
                                            <span className="group-hover/item:text-black transition-colors">맞춤형 솔루션 제공</span>
                                        </li>
                                        <li className="flex items-center gap-3 group/item">
                                            <span className="p-2 rounded-full bg-blue-50 text-blue-600">
                                                <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                            </span>
                                            <span className="group-hover/item:text-black transition-colors">경쟁력 있는 가격</span>
                                        </li>
                                        <li className="flex items-center gap-3 group/item">
                                            <span className="p-2 rounded-full bg-blue-50 text-blue-600">
                                                <CheckIcon className="w-5 h-5 flex-shrink-0" />
                                            </span>
                                            <span className="group-hover/item:text-black transition-colors">납기 준수 및 안정적인 재고운영</span>
                                        </li>
                                    </ul>

                                    {/* 통계 섹션 */}
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        {STATS.map((stat, i) => (
                                            <TooltipProvider key={i}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-help shadow-sm">
                                                            <div className="rounded-full bg-blue-50 p-3 mb-3 text-blue-600 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                                                                <stat.icon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-3xl font-bold text-black group-hover:text-blue-600 transition-colors">
                                                                {stat.value}
                                                            </p>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {stat.label}
                                                            </p>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
                                                        <p className="text-sm text-gray-600">{stat.tooltip}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="group flex justify-center items-center w-full mt-10 px-6 py-4 bg-black text-white rounded-xl text-base font-medium hover:bg-gray-900 transition-all duration-200">
                                대한플러스전자(주)에 대해 알아보기
                                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 오른쪽 컬럼 - 카드 레이아웃 */}
                <div className="lg:col-span-7 grid grid-cols-1 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Link 
                                href={feature.link}
                                className="block h-full"
                            >
                                <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:-translate-y-1">
                                    {/* 호버 시 상단 효과 */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ExternalLinkIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    
                                    {/* 배지 */}
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="outline" className="bg-black text-white border-0 shadow-sm text-sm font-normal px-3 py-1 rounded-full">
                                            {feature.badge}
                                        </Badge>
                                    </div>
                                    
                                    <div className="p-8 h-full flex flex-col pt-16">
                                        <div className="flex items-start gap-4">
                                            <span className="flex-shrink-0 inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                                {feature.icon}
                                            </span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="mt-2 cursor-help">
                                                            <InfoIcon className="w-5 h-5 text-blue-500" />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 max-w-xs">
                                                        <div className="space-y-2 text-sm text-left">
                                                            <p className="text-gray-600">{FEATURE_INFO[feature.title]}</p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold text-black mb-4 mt-6 group-hover:text-blue-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base text-gray-600 leading-relaxed mb-8">
                                            {feature.description}
                                        </p>
                                        <div className="mt-auto inline-flex items-center gap-2 text-gray-800 font-medium text-base group-hover:text-blue-600 transition-colors">
                                            {feature.linkText}
                                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
