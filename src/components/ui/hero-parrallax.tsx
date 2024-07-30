"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
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

const words = ["전자부품","LED 드라이버 IC", "다이오드", "전원관리 IC", "커넥터·케이블", "센서"];

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
},) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
 
  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };
 
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0,1000]),
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
 
  return (
    <div
      ref={ref}
      className="h-[200%] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
 
export const Header = () => {
  return (
    <div className="max-w-7xl overflow-hidden relative mx-auto md:py-10 px-4 w-full left-0 top-0">
      {/* Hero */}
        <div className="container">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              당신이 원하던 <br /> <FlipWords words={words} />
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
            <strong>대한플러스전자(주)</strong>에서 고성능/고품질의 전자부품을 만나보세요 !
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              {/* Form */}
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
              {/* End Form */}
              {/* SVG Element */}
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
              {/* SVG Element */}
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
            </div>
            <div className="sm:mt-10 flex flex-wrap gap-2 justify-center">
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white" >
                <BriefcaseIcon className="flex-shrink-0 w-3  h-auto mr-2" />
                LED 드라이버 IC
              </Button>
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
                <SettingsIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                다이오드
              </Button>
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
                <HeartIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                전원관리 IC
              </Button>
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
                <LightbulbIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                커넥터
              </Button>
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
                <FlowerIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                센서
              </Button>
              <Button variant={"outline"} className="z-10 hover:bg-black hover:text-white">
                <MountainSnow className="flex-shrink-0 w-3 h-auto mr-2" />
                자동차 인증 부품
              </Button>
            </div>
          </div>
        </div>
      {/* End Hero */}
    </div>
  );
};
 
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-60 w-[22rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
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
};