"use client"

import React, { useMemo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Briefcase, Flower, Heart, Lightbulb, MountainSnow, Search, Settings, Zap, Cpu, ChevronDown, CheckCircle, Info, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { InfiniteMovingProductCards } from "./infinite-moving-product-cards";
import { useSearchStore } from "@/store/SearchStore";

// Constants
const WORDS = ["전자부품", "LED 드라이버 IC", "다이오드", "전원관리 IC", "커넥터·케이블", "센서"];

// Types
type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

// 카테고리 추가 정보
const CATEGORY_INFO = {
  "LED 드라이버 IC": "디스플레이, 조명, 자동차 전장용 LED 구동에 최적화된 반도체",
  "다이오드": "전류의 방향을 제어하는 기본 반도체 소자, 다양한 전압/전류 사양",
  "전원관리 IC": "전자 장치의 효율적인 전력 관리를 위한 통합 회로",
  "커넥터&케이블": "PCB 연결, 시스템 간 인터페이스를 위한 고품질 연결 솔루션",
  "수동 소자": "저항, 커패시터, 인덕터 등 기본 전자 부품",
  "센서": "온도, 습도, 압력 등 다양한 물리량을 측정하는 장치",
  "자동차 인증 부품": "AEC-Q100/Q101 인증을 획득한 자동차 산업 표준 부품"
};

// 더 가벼운 스프링 설정 (애니메이션 성능 최적화)
const createSpringConfig = () => ({ 
  stiffness: 100,
  damping: 30,
  bounce: 0
});

const useScrollAnimation = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = createSpringConfig();

  // 스크롤 애니메이션 설정
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [5, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [7, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 0]),
    springConfig
  );

  return { ref, rotateX, rotateZ, translateY, opacity, translateX, translateXReverse };
};

// 메모이제이션된 헤더 컴포넌트
const Header = React.memo(() => {
  const setIsOpen = useSearchStore((state) => state.setIsOpen);
  
  const handleSearchClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  
  return (
    <div className="max-w-7xl overflow-hidden relative mx-auto py-12 md:py-20 px-4 sm:px-6 w-full left-0 top-0">
      <div className="container relative z-10">
        <div className="text-center relative">
          {/* 배경 효과 */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          {/* NEW 뱃지 */}
          <div className="absolute -top-2 md:top-0 right-0 md:right-8">
            <Badge variant="outline" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0 px-2.5 py-1 rounded-full animate-pulse">
              NEW
            </Badge>
          </div>
          
          {/* 히어로 제목 */}
          <motion.h1 
            className="scroll-m-20 text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            당신이 필요로 하는 <br className="sm:hidden" /> 
            <span className="relative inline-block">
              <span className="absolute -left-6 -top-6">
                <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
              </span>
              <FlipWords 
                words={WORDS} 
                className="text-blue-600 relative" 
              />
              <span className="absolute -right-6 -bottom-2">
                <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
              </span>
            </span>
          </motion.h1>
          
          {/* 부제목 */}
          <motion.p 
            className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <strong className="text-black font-semibold relative">
              대한플러스전자(주)
              <span className="absolute -top-1 -right-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3.5 h-3.5 text-blue-500 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 max-w-xs">
                      <div className="space-y-2 text-sm text-left">
                        <p className="font-medium text-black">대한플러스전자(주)</p>
                        <p className="text-gray-600 text-xs">1999년 설립된 반도체 및 전자부품 전문 유통기업으로, LED 드라이버 IC 및 전력 관리 IC 분야에서 국내 최고의 파트너십을 보유하고 있습니다.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </strong>에서 고성능·고품질의 전자부품을 
            <span className="hidden sm:inline"> 경험해보세요</span>
            <span className="inline sm:hidden">
              <br />경험해보세요
            </span>
          </motion.p>
          
          {/* 신뢰성 배지 */}
          <motion.div
            className="flex justify-center gap-2 sm:gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-white/80 border border-gray-200 shadow-sm rounded-full py-1.5 px-3 cursor-help transition-all duration-300 hover:bg-blue-50 hover:border-blue-200">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                    <span className="text-xs sm:text-sm text-gray-800">신속한 납기</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-black text-white p-2 rounded-lg text-xs">
                  재고보유로 평균 3-5일 이내 배송
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-black text-white rounded-full py-1.5 px-3 shadow-sm cursor-help transition-all duration-300 hover:bg-gray-800">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                    <span className="text-xs sm:text-sm">품질 보증</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-black text-white p-2 rounded-lg text-xs">
                  100% 정품 보증 및 품질 테스트 완료
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-white/80 border border-gray-200 shadow-sm rounded-full py-1.5 px-3 cursor-help transition-all duration-300 hover:bg-blue-50 hover:border-blue-200">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                    <span className="text-xs sm:text-sm text-gray-800">전문 컨설팅</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-black text-white p-2 rounded-lg text-xs">
                  제품 선정부터 기술 지원까지 전문가 상담
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          
          {/* 검색 폼 */}
          <motion.div
            onClick={handleSearchClick}
            className="mt-8 mx-auto max-w-lg z-10 relative flex items-center bg-white rounded-full border border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="pl-12 pr-3 py-3.5 text-sm sm:text-base font-medium text-gray-600">
              검색어를 입력하세요 
              <span className="text-blue-500 animate-pulse ml-1">|</span>
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              검색하기
            </div>
          </motion.div>
          
          {/* 카테고리 버튼 */}
          <motion.div 
            className="relative z-20 mt-8 mb-4 border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-sm font-bold text-gray-800 mb-3">인기 카테고리</h3>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/led-driver" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Briefcase className="mr-1.5 w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                        LED 드라이버 IC
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["LED 드라이버 IC"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/diode" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Settings className="mr-1.5 w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                        다이오드
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["다이오드"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/power-management" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Heart className="mr-1.5 w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        전원관리 IC
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["전원관리 IC"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/connectors" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Lightbulb className="mr-1.5 w-3.5 h-3.5 group-hover:text-yellow-500 transition-colors" />
                        커넥터&케이블
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["커넥터&케이블"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/passive" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <MountainSnow className="mr-1.5 w-3.5 h-3.5 group-hover:translate-y-[-2px] transition-transform" />
                        수동 소자
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["수동 소자"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/sensors" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Flower className="mr-1.5 w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                        센서
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["센서"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/products/automotive" className="group">
                      <Button variant="outline" size="sm" className="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 rounded-full group-hover:scale-105 transition-all">
                        <Cpu className="mr-1.5 w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                        자동차 인증 부품
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 rounded-lg border border-gray-200 text-xs max-w-[200px]">
                    {CATEGORY_INFO["자동차 인증 부품"]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
          
          {/* 핵심 CTA */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-900 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full group w-full sm:w-auto"
                asChild
              >
                <Link href="/quote" className="flex items-center justify-center">
                  <span>견적 요청하기</span>
                  <ExternalLink className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Badge variant="outline" className="py-2 border-gray-300 text-xs text-gray-600 rounded-full">
                일반 문의: 02-6679-5025
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});
Header.displayName = "Header";

export default function HeroParallax({ products }: { products: Product[] }) {
  const { ref, rotateX, rotateZ, translateY, opacity } = useScrollAnimation();

  // 제품 행 데이터 메모이제이션 (불필요한 재계산 방지)
  const rows = useMemo(() => [
    products.slice(0, 7),
    products.slice(7, 11),
    products.slice(11, 15),
  ], [products]);

  return (
    <div 
      ref={ref} 
      className="h-[180%] sm:h-[200%] items-center justify-center overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-white to-gray-50"
    >
      <Header />
      <motion.div 
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="relative z-5"
      >
        <InfiniteMovingProductCards
          products={rows[0]}
          direction="left"
          speed="slow"
        />
        <InfiniteMovingProductCards
          products={rows[1]}
          direction="right"
          speed="slow"
        />
        <InfiniteMovingProductCards
          products={rows[2]}
          direction="left"
          speed="slow"
        />
      </motion.div>

      <div className="justify-center items-center my-10 sm:my-12 text-center">
        <motion.div 
          className="text-sm sm:text-base font-medium text-gray-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200 flex items-center gap-1.5 mx-auto w-fit group cursor-pointer hover:border-blue-200 hover:bg-blue-50 transition-all"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          아래로 스크롤하여 더 많은 내용을 확인하세요
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.div>
      </div>
    </div>
  );
};