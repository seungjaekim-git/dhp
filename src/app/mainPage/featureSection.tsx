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
import { Button } from "@/components/ui/button";

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
        title: "LED 드라이버 IC 전문 기업",
        description: "대한플러스전자(주)는 1997년 설립된 LED 드라이버 IC 및 반도체 부품 유통 전문기업으로, 고객과의 신뢰를 바탕으로 성장해왔습니다.",
        link: "/about/greeting",
        linkText: "CEO 인사말 바로가기",
        badge: "Since 1997"
    },
    {
        icon: <HandshakeIcon className="w-8 h-8" />,
        title: "글로벌 파트너십",
        description: "Macroblock, Zowie, XLSEMI 등 글로벌 제조사와의 파트너십을 통해 안정적인 공급망을 구축하고 있습니다.",
        link: "/partners", 
        linkText: "파트너사 바로가기",
        badge: "신뢰할 수 있는 공급망"
    },
    {
        icon: <CircuitBoardIcon className="w-8 h-8" />,
        title: "다양한 전자부품 라인업",
        description: "LED Driver IC, 다이오드, 센서, 커넥터 & 케이블, 자동차 부품까지 다양한 전자부품을 공급합니다.",
        link: "/products",
        linkText: "제품 카테고리 바로가기",
        badge: "원스톱 솔루션"
    },
    {
        icon: <TargetIcon className="w-8 h-8" />,
        title: "맞춤형 기술 지원",
        description: "LED 드라이버 IC 전문 노하우와 기술력을 바탕으로 고객 맞춤형 기술 지원 및 컨설팅을 제공합니다.",
        link: "/support",
        linkText: "고객 지원 바로가기",
        badge: "전문가 컨설팅"
    }
];

// 통계 데이터
const STATS = [
    { value: "25+", label: "업력", icon: TrendingUpIcon },
    { value: "10k+", label: "제품 라인업", icon: ZapIcon },
    { value: "98%", label: "고객 만족도", icon: HeartIcon },
    { value: "50+", label: "글로벌 파트너", icon: GlobeIcon }
];

export default function FeatureSection() {
    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-black py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Hero Content */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <Badge className="bg-blue-600/20 text-blue-400 hover:bg-blue-500/30 border-0 px-4 py-1.5 text-sm mb-6">
                            <StarIcon className="w-4 h-4 mr-2" /> LED 드라이버 IC 전문 유통기업
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-100">
                                대한플러스전자
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
                            고객의 신뢰와 만족을 최우선으로 하는 전자부품 전문기업
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    >
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                                className="bg-blue-900/30 backdrop-blur-sm px-4 py-8 rounded-2xl border border-blue-800/50 flex flex-col items-center text-center hover:bg-blue-800/30 transition-colors"
                            >
                                <div className="rounded-full bg-blue-500/20 p-4 mb-4 text-blue-400">
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-blue-300/80">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                                className="h-full"
                            >
                                <div className="group relative flex flex-col h-full bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-800/50 overflow-hidden transition-all duration-300 hover:bg-blue-800/30 hover:-translate-y-1">
                                    {/* 호버 시 상단 효과 */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    
                                    {/* 배지 */}
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-blue-500/20 text-blue-300 border-0 px-2 py-0.5 text-xs">
                                            {feature.badge}
                                        </Badge>
                                    </div>
                                    
                                    <div className="p-6 h-full flex flex-col">
                                        <div className="flex items-start gap-4 mb-4">
                                            <span className="flex-shrink-0 inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-800/50 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                                {feature.icon}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-blue-200/70 leading-relaxed mb-6 flex-grow">
                                            {feature.description}
                                        </p>
                                        <Link href={feature.link} className="mt-auto">
                                            <Button variant="link" className="p-0 text-blue-400 hover:text-blue-300 group-hover:underline">
                                                <span className="flex items-center gap-2">
                                                    {feature.linkText}
                                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="mt-16 text-center"
                    >
                        <Link href="/about">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-lg font-medium px-8 py-6 rounded-xl">
                                <span className="flex items-center gap-2">
                                    자세한 회사 정보 보기
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
                    <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
                </div>
            </div>
        </div>
    );
}
