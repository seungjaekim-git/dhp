import { PartnersConfig } from "./types";

export const partnersConfig: PartnersConfig = {
  title: "파트너사",
  link: "/partners",
  seo: {
    title: "파트너사 | 대한플러스전자",
    description: "대한플러스전자와 함께하는 글로벌 파트너사 소개",
    keywords: ["파트너사", "협력사", "제조사"]
  },
  items: [
    {
      title: "Macroblock",
      description: "Taiwan, LED Driver IC",
      icon: "/logos/macroblock-logo.png",
      categories: ["LED 드라이버 IC", "전원관리 IC", "자동차 인증 부품"],
      country: "대만",
      type: "대기업",
      subtitle: "드라이버 IC 부문 세계 1위 기업",
      details: ["LED Driver IC 전문 제조사", "디스플레이/조명/자동차 전장용"],
      link: "/partners/macroblock",
      seo: {
        title: "Macroblock | 대한플러스전자 파트너",
        description: "LED Driver IC 전문 제조사 Macroblock 소개",
        keywords: ["Macroblock", "LED Driver", "대만"]
      },
      partnerStory: {
        image: "/banners/macroblock_banner.jpg",
        text: "LED 디스플레이 구동을 위한 고성능 드라이버 IC 전문 기업",
        learnMoreLink: "/partners/macroblock"
      }
    },
    // 다른 파트너사 정보도 비슷한 방식으로 정의...
  ]
}; 