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
import { Briefcase, Flower, Heart, Lightbulb, MountainSnow, Search, Settings, Zap, Cpu } from "lucide-react";

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

// 더 가벼운 스프링 설정 (애니메이션 성능 최적화)
const createSpringConfig = () => ({ 
  stiffness: 100, // 200에서 100으로 줄임
  damping: 30,  // 30에서 20으로 줄임
  bounce: 0 // 100에서 0으로 줄여 바운스 효과 제거
});

const useScrollAnimation = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = createSpringConfig();

  // 스크롤 애니메이션 최적화 (더 부드러운 동작을 위한 설정)
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 600]), // 600에서 300으로 줄임
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]), // -600에서 -300으로 줄임
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [5, 0]), // 10에서 5로 줄임
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), // 0.2에서 0.5로 시작값 높임
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]), // 15에서 5로 줄임
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 0]), // -600에서 -300으로 줄임
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
    <div className="max-w-7xl overflow-hidden relative mx-auto py-12 md:py-24 px-4 w-full left-0 top-0">
      <div className="container">
        <div className="text-center">
          <motion.h1 
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent"
          >
            당신이 원하던 <br /> 
            <span className="relative">
              <span className="absolute -left-6 -top-6">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              </span>
              <FlipWords 
                words={WORDS} 
                className="text-blue-700 relative" 
              />
              <span className="absolute -right-6 -bottom-1">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              </span>
            </span>
          </motion.h1>
          

            <strong className="text-blue-700">대한플러스전자(주)</strong>에서 고성능/고품질의 전자부품을 만나보세요 !
          
          {/* 검색 폼 */}
          <motion.div
            onClick={handleSearchClick}
            className="mt-8 sm:mt-12 mx-auto max-w-lg z-10 relative flex items-center bg-white dark:bg-gray-800 rounded-full border-2 border-blue-200 dark:border-gray-600 shadow-lg hover:shadow-blue-100/50 transition-all duration-300 cursor-pointer hover:border-blue-300 group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Search className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="pl-12 pr-4 py-4 text-sm font-medium text-gray-700 dark:text-white">
              검색어를 입력하세요 
              <span className="text-blue-500 animate-pulse ml-1">|</span>
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              검색하기
            </div>
          </motion.div>
          
          {/* 카테고리 버튼 */}
          <motion.div 
            className="relative z-20 mt-8 mb-2 border rounded-xl p-5 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-blue-800 mb-3">인기 카테고리</h3>
            <div className="sm:mt-4 flex flex-wrap gap-2 justify-center">
              <CategoryButton icon={<Briefcase />} text="LED 드라이버 IC" color="blue" />
              <CategoryButton icon={<Settings />} text="다이오드" color="indigo" />
              <CategoryButton icon={<Heart />} text="전원관리 IC" color="purple" />
              <CategoryButton icon={<Lightbulb />} text="커넥터&케이블" color="amber" />
              <CategoryButton icon={<MountainSnow />} text="수동 소자" color="emerald" />
              <CategoryButton icon={<Flower />} text="센서" color="rose" />
              <CategoryButton icon={<Cpu />} text="자동차 인증 부품" color="cyan" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});
Header.displayName = "Header";

// 메모이제이션된 카테고리 버튼 컴포넌트
const CategoryButton = React.memo(({ 
  icon, 
  text, 
  color = "blue" 
}: { 
  icon: React.ReactNode; 
  text: string;
  color?: "blue" | "indigo" | "purple" | "amber" | "emerald" | "rose" | "cyan";
}) => {
  // 색상 매핑
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-600 hover:border-blue-700 text-blue-700 hover:text-white",
    indigo: "bg-indigo-50 border-indigo-200 hover:bg-indigo-600 hover:border-indigo-700 text-indigo-700 hover:text-white",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-600 hover:border-purple-700 text-purple-700 hover:text-white",
    amber: "bg-amber-50 border-amber-200 hover:bg-amber-600 hover:border-amber-700 text-amber-700 hover:text-white",
    emerald: "bg-emerald-50 border-emerald-200 hover:bg-emerald-600 hover:border-emerald-700 text-emerald-700 hover:text-white",
    rose: "bg-rose-50 border-rose-200 hover:bg-rose-600 hover:border-rose-700 text-rose-700 hover:text-white",
    cyan: "bg-cyan-50 border-cyan-200 hover:bg-cyan-600 hover:border-cyan-700 text-cyan-700 hover:text-white",
  };

  return (
    <Button 
      variant="outline" 
      className={`z-10 font-medium border-2 shadow-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${colorMap[color]}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "mr-2 w-4 h-4" })}
      {text}
    </Button>
  );
});
CategoryButton.displayName = "CategoryButton";

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
      className="h-[180%] items-center justify-center overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] "
    >
      <Header />
      <motion.div 
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="relative z-5"
      >

        
        <InfiniteMovingProductCards
          products={rows[0]}
          direction="left"
          speed="slow" // normal에서 slow로 변경
        />
        <InfiniteMovingProductCards
          products={rows[1]}
          direction="right"
          speed="slow" // normal에서 slow로 변경
        />
        <InfiniteMovingProductCards
          products={rows[2]}
          direction="left"
          speed="slow" // normal에서 slow로 변경
        />
      </motion.div>

      <div className="justify-center items-center my-12 text-center">
          <div className="text-lg font-medium text-blue-600 bg-blue-50 px-4 py-1 rounded-full shadow-sm border border-blue-100 animate-bounce">
            아래로 스크롤 더 많은 내용을 확인하세요 ▽
          </div>
        </div>
    </div>
  );
};