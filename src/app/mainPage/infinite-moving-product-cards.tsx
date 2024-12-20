import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <motion.div
  whileHover={{ y: -20 }}
  className="group/product h-[150px] sm:h-30 md:h-40 lg:h-60 w-[150px] sm:w-[175px] md:w-[250px] lg:w-[350px] max-w-full relative flex-shrink-0"
>
  <Link href={product.link} className="block group-hover/product:shadow-2xl">
    <Image
      src={product.thumbnail}
      height={800}
      width={800}
      className="object-cover object-center absolute h-full w-full inset-0 transform group-hover:scale-90 transition-transform duration-300 ease-in-out"
      alt={product.title}
      style={{
        transformOrigin: "center center", // 축소 기준점을 이미지의 중앙으로 설정
      }}
    />
  </Link>
  <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300 ease-in-out"></div>
  <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xs sm:text-sm md:text-base transition-opacity duration-300 ease-in-out">
    {product.title}
  </h2>
</motion.div>
);

export const InfiniteMovingProductCards = ({
  products,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  products: Product[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2 sm:gap-4 py-2 sm:py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {products.map((product, idx) => (
          <li key={`${product.title}-${idx}`}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};