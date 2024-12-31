"use client"

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BriefcaseIcon from "lucide-react/dist/esm/icons/briefcase";
import FlowerIcon from "lucide-react/dist/esm/icons/flower";
import HeartIcon from "lucide-react/dist/esm/icons/heart";
import LightbulbIcon from "lucide-react/dist/esm/icons/lightbulb";
import MountainSnow from "lucide-react/dist/esm/icons/mountain-snow";
import SearchIcon from "lucide-react/dist/esm/icons/search";
import SettingsIcon from "lucide-react/dist/esm/icons/settings";

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

const createSpringConfig = () => ({ stiffness: 200, damping: 30, bounce: 100 });

const useScrollAnimation = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = createSpringConfig();

const translateX = useSpring(
  useTransform(scrollYProgress, [0, 1], [0, 600]),
  springConfig
);
const translateXReverse = useSpring(
  useTransform(scrollYProgress, [0, 1], [0, -600]),
  springConfig
);
const rotateX = useSpring(
  useTransform(scrollYProgress, [0, 0.2], [10, 0]),
  springConfig
);
const opacity = useSpring(
  useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
  springConfig
);
const rotateZ = useSpring(
  useTransform(scrollYProgress, [0, 0.2], [15, 0]),
  springConfig
);
const translateY = useSpring(
  useTransform(scrollYProgress, [0, 0.2], [-600,0]),
  springConfig
);

  return { ref, rotateX, rotateZ, translateY, opacity, translateX, translateXReverse };
};

const Header: React.FC = () => (
  <div className="max-w-7xl overflow-hidden relative mx-auto py-12 md:py-24 px-4 w-full left-0 top-0">
    <div className="container">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          당신이 원하던 <br /> <FlipWords words={WORDS} />
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          <strong>대한플러스전자(주)</strong>에서 고성능/고품질의 전자부품을 만나보세요 !
        </p>
        <SearchForm />
        <CategoryButtons />
      </div>
    </div>
  </div>
);

const SearchForm: React.FC = () => {
  const setIsOpen = useSearchStore((state) => state.setIsOpen);

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="mt-7 sm:mt-12 mx-auto max-w-lg z-10 relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-100 hover:text-white"
    >
      <div className="absolute inset-y-0 left-4 flex items-center">
        <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="pl-12 pr-4 py-3 text-sm text-gray-900 dark:text-white">
        검색어를 입력하세요. 
      </div>
    </div>
  );
};

const CategoryButtons: React.FC = () => (
  <div className="block bg-white z-20 m-4">
    <div className="sm:mt-10 flex flex-wrap p-3 gap-2 justify-center mr-2">
      <CategoryButton icon={<BriefcaseIcon />} text="LED 드라이버 IC" />
      <CategoryButton icon={<SettingsIcon />} text="다이오드" />
      <CategoryButton icon={<HeartIcon />} text="전원관리 IC" />
      <CategoryButton icon={<LightbulbIcon />} text="커넥터&케이블" />
      <CategoryButton icon={<MountainSnow />} text="수동 소자" />
      <CategoryButton icon={<FlowerIcon />} text="센서" />
      <CategoryButton icon={<MountainSnow />} text="자동차 인증 부품" />
    </div>
  </div>
);

const CategoryButton: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
    {React.cloneElement(icon as React.ReactElement, { className: "mr-2" })}
    {text}
  </Button>
);

export default function HeroParallax({ products }: { products: Product[] }) {
  const { ref, rotateX, rotateZ, translateY, opacity } = useScrollAnimation();

  const rows = [
    products.slice(0, 7),
    products.slice(7, 11),
    products.slice(11, 15),
  ];

  return (
    <div ref={ref} className="h-[200%] items-center justify-center overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <InfiniteMovingProductCards
          products={rows[0]}
          direction="left"
          speed="normal"
        />
        <InfiniteMovingProductCards
          products={rows[1]}
          direction="right"
          speed="normal"
        />
        <InfiniteMovingProductCards
          products={rows[2]}
          direction="left"
          speed="normal"
        />
      </motion.div>
    </div>
  );
};