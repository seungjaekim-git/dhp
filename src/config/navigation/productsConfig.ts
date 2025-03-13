import { ProductsConfig } from "./types";
import { Package, Cpu, Zap } from "lucide-react";

export const productsConfig: ProductsConfig = {
  title: "제품",
  link: "/products",
  seo: {
    title: "제품 | 대한플러스전자",
    description: "대한플러스전자가 제공하는 제품 라인업",
    keywords: ["제품", "전자부품", "LED Driver"]
  },
  categories: [
    {
      title: "전체제품",
      link: "/products",
      icon: Package,
      seo: {
        title: "전체제품 | 대한플러스전자",
        description: "대한플러스전자의 모든 제품을 한눈에 살펴보실 수 있습니다.",
        keywords: ["전체제품", "제품목록", "전자부품", "반도체"]
      },
    },
    {
      title: "LED Driver IC",
      link: "/products/led-driver",
      icon: Cpu,
      seo: {
        title: "LED Driver IC | 대한플러스전자",
        description: "고효율 LED Driver IC 제품군을 소개합니다. DC-DC, AC-DC, 매트릭스 드라이버 등 다양한 제품이 있습니다.",
        keywords: ["LED Driver", "DC-DC", "AC-DC", "매트릭스드라이버"]
      },
      content: [
        {
          title: "DC-DC LED 드라이버",
          link: "/products/led-driver/dc-dc",
          seo: {
            title: "DC-DC LED 드라이버 | 대한플러스전자",
            description: "고효율 DC-DC LED 드라이버 제품군을 소개합니다.",
            keywords: ["DC-DC", "LED드라이버", "전력변환", "벅컨버터"]
          },
          children: [
            {
              title: "벅 컨버터 타입",
              link: "/products/led-driver/dc-dc/buck",
              seo: {
                title: "벅 컨버터 LED 드라이버 | 대한플러스전자",
                description: "효율적인 전압 강하를 위한 벅 컨버터 타입 LED 드라이버입니다.",
                keywords: ["벅컨버터", "전압강하", "LED드라이버"]
              }
            },
            {
              title: "부스트 컨버터 타입",
              link: "/products/led-driver/dc-dc/boost",
              seo: {
                title: "부스트 컨버터 LED 드라이버 | 대한플러스전자", 
                description: "전압 상승을 위한 부스트 컨버터 타입 LED 드라이버입니다.",
                keywords: ["부스트컨버터", "전압상승", "LED드라이버"]
              }
            }
          ]
        },
        // 추가 내용은 생략
      ]
    },
    // 다른 카테고리들도 비슷한 방식으로 정의...
  ]
}; 