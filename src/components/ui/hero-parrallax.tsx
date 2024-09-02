"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionValue,
  animate,
} from "framer-motion";
import useMeasure from 'react-use-measure'
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BriefcaseIcon,
  FlowerIcon,
  HeartIcon,
  LightbulbIcon,
  MountainSnow,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import { InfiniteMovingProductCards } from "../ui/infinite-moving-product-cards";


// Constants
const WORDS = ["전자부품", "LED 드라이버 IC", "다이오드", "전원관리 IC", "커넥터·케이블", "센서"];

// Types
type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

type ProductCardProps = {
  product: Product;
  translate: MotionValue<number>;
};

// Utility functions
const createSpringConfig = () => ({ stiffness: 200, damping: 30, bounce: 100 });

const useScrollAnimation = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = createSpringConfig();

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 100]),
    springConfig
  );

  return { ref, rotateX, rotateZ, translateY, opacity, translateX, translateXReverse };
};


// Components
const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    key={product.title}
    className="group/product h-60 w-[22rem] relative flex-shrink-0"
  >
    <Link href={product.link} className="block group-hover/product:shadow-2xl">
      <Image
        src={product.thumbnail}
        height="800"
        width="800"
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={product.title}
      />
    </Link>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
    <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
      {product.title}
    </h2>
  </motion.div>
);

const Header: React.FC = () => (
  <div className="max-w-7xl overflow-hidden relative mx-auto md:py-10 px-4 w-full left-0 top-0">
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

const SearchForm: React.FC = () => (
  <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
    <form>
      <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
        <div className="flex-[1_0_0%]">
          <Label htmlFor="article" className="sr-only">
            Search article
          </Label>
          <Input
            name="article"
            className="h-full"
            id="article"
            placeholder="Search article"
          />
        </div>
        <div className="flex-[0_0_auto]">
          <Button size={"icon"}>
            <SearchIcon />
          </Button>
        </div>
      </div>
    </form>
    {/* SVG Elements */}
    <svg className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20 w-16 h-auto text-orange-500" /* ... */ />
    <svg className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32 w-40 h-auto text-cyan-500" /* ... */ />
  </div>
);

const CategoryButtons: React.FC = () => (
  <div className="sm:mt-10 flex flex-wrap gap-2 justify-center">
    <CategoryButton icon={<BriefcaseIcon />} text="LED 드라이버 IC" />
    <CategoryButton icon={<SettingsIcon />} text="다이오드" />
    <CategoryButton icon={<HeartIcon />} text="전원관리 IC" />
    <CategoryButton icon={<LightbulbIcon />} text="커넥터" />
    <CategoryButton icon={<FlowerIcon />} text="센서" />
    <CategoryButton icon={<MountainSnow />} text="자동차 인증 부품" />
  </div>
);

const CategoryButton: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
    {React.cloneElement(icon as React.ReactElement, { className: "flex-shrink-0 w-3 h-auto mr-2" })}
    {text}
  </Button>
);

export const HeroParallax: React.FC<{ products: Product[] }> = ({ products }) => {
  const { ref, rotateX, rotateZ, translateY, opacity, translateX, translateXReverse } = useScrollAnimation();

  const rows = [
    products.slice(0, 5) ,
    products.slice(5, 10),
    products.slice(10, 15),
  ];

  return (
    <div ref={ref} className="h-[200%] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
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