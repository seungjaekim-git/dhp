"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// 애니메이션 변수
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// 애플리케이션 데이터 정의
const applicationData = [
    {
        title: "LED 디스플레이",
        description: "디지털 사이니지, 비디오 월, 스포츠 경기장 디스플레이를 위한 LED 드라이버 솔루션",
        icon: "/icons/led-display.png",
        link: "/applications/led-display",
        benefits: ["고효율", "선명한 화질", "긴 수명"],
    },
    {
        title: "LED 조명",
        description: "실내 및 실외 조명, 스마트 조명 시스템을 위한 고효율 LED 드라이버 IC",
        icon: "/icons/led-lighting.png",
        link: "/applications/led-lighting",
        benefits: ["에너지 절약", "밝기 제어", "스마트 기능"],
    },
    {
        title: "자동차 전장",
        description: "자동차 디스플레이, 인포테인먼트 시스템, 내외부 조명을 위한 자동차급 반도체 솔루션",
        icon: "/icons/automotive.png",
        link: "/applications/automotive",
        benefits: ["AEC-Q100 인증", "내구성", "내열성"],
    },
    {
        title: "산업용 제어",
        description: "공장 자동화, 로봇 시스템, 산업용 장비를 위한 모터 제어 및 센서 인터페이스 솔루션",
        icon: "/icons/industrial.png",
        link: "/applications/industrial-control",
        benefits: ["안정성", "정밀 제어", "내환경성"],
    },
    {
        title: "의료 기기",
        description: "의료 영상 시스템, 환자 모니터링 장비, 진단 장비를 위한 고신뢰성 반도체 솔루션",
        icon: "/icons/medical.png",
        link: "/applications/medical-devices",
        benefits: ["초고정밀", "저전력", "안전성"],
    },
    {
        title: "스마트 홈",
        description: "홈 자동화, IoT 기기, 스마트 가전을 위한 저전력 반도체 및 센서 솔루션",
        icon: "/icons/smart-home.png",
        link: "/applications/smart-home",
        benefits: ["연결성", "사용 편의성", "IoT 호환"],
    },
];

// 애플리케이션 섹션 컴포넌트
export default function ApplicationSection() {
    return (
        <section id="applications" className="py-10 sm:py-14 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div 
                    className="text-center mb-8 sm:mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3">
                        산업별 솔루션
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3">
                        다양한 산업 분야를 위한 최적의 솔루션
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-2 mx-auto max-w-2xl">
                        대한플러스전자(주)는 각 산업 분야의 특수한 요구사항에 맞는 최적화된 반도체 솔루션을 제공합니다
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {applicationData.map((app, index) => (
                        <motion.div key={index} variants={item}>
                            <ApplicationCard application={app} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    className="flex justify-center mt-8 sm:mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button 
                        asChild 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <Link href="/applications">
                            <span>모든 산업 분야별 솔루션 보기</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

// 애플리케이션 카드 컴포넌트
function ApplicationCard({ application }: { application: any }) {
    return (
        <Link 
            href={application.link}
            className="group block bg-white border-2 border-gray-100 hover:border-blue-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-5"
        >
            <div className="flex space-x-4">
                <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-blue-50 rounded-lg p-2.5 flex items-center justify-center border border-blue-100 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-300">
                        <Image 
                            src={application.icon} 
                            alt={application.title}
                            width={50}
                            height={50}
                            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>
                
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-1.5">
                        {application.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {application.description}
                    </p>
                    
                    <div className="space-y-1">
                        {application.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex items-center text-xs">
                                <CircleCheck className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0" />
                                <span className="text-gray-700">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <span className="text-sm font-medium text-blue-600 flex items-center group-hover:text-blue-700 transition-colors">
                    자세히 보기
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </div>
        </Link>
    )
}