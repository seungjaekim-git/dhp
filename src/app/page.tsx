import React from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Home() {

  const heroParallaxBanner = [
  //  제품 카테고리
    {
      title: "LED Driver IC",
      link: "/products/led-driver-ic",
      thumbnail:
        "/images/led-driver-ic-category-banner.webp",
    },
    {
      title: "다이오드",
      link: "/products/diodes",
      thumbnail:
        "/images/diodes-category-banner.webp",
    },
    {
      title: "수동 소자",
      link: "/products/passive-components",
      thumbnail: "/images/passive-components-category-banner.webp",
    },
   
    {
      title: "전원관리 IC",
      link: "/products/power-management-ic",
      thumbnail:
        "/images/power-management-ic-category-banner.webp",
    },
    {
      title: "자동차 전자부품",
      link: "/products/automotive-electronic-components",
      thumbnail:
        "/images/automotive-category-banner.webp",
    },
    {
      title: "센서",
      link: "/products/sensors",
      thumbnail:
        "/images/sensor-category-banner.webp",
    },
   
    {
      title: "커넥터&케이블",
      link: "/products/connectors-cables",
      thumbnail:
        "/images/connectors-cables-category-banner.webp",
    },

    // 파트너사
    {
      title: "Macroblock",
      link: "/partners/macroblock",
      thumbnail:
        "/images/thumbnail-macroblock.webp",
    },
    {
      title: "Zowie",
      link: "/partners/zowie",
      thumbnail:
        "/images/thumbnail-zowie.webp",
    },
    {
      title: "Morethanall",
      link: "/partners/morethanall",
      thumbnail:
        "/images/thumbnail-morethanall.webp",
    },
    {
      title: "LLT",
      link: "/partners/llt",
      thumbnail:
        "/images/thumbnail-llt.webp",
    },
   
    {
      title: "Kube Electronics AG",
      link: "/partners/kube",
      thumbnail:
        "/images/thumbnail-kube.webp",
    },
    {
      title: "XLSEMI",
      link: "/partners/xlsemi",
      thumbnail:
        "/images/thumbnail-xlsemi.webp",
    },
    {
      title: "GTM",
      link: "/partners/gtm",
      thumbnail:
        "/images/thumbnail-gtm.webp",
    },
    {
      title: "Powtech",
      link: "/partners/powtech",
      thumbnail:
        "/images/thumbnail-powtech.webp",
    },
  ];

  const applications = [
    {
      title: "차량용 LED 드라이버 IC 및 주변 소자",
      link: "/applications/automotive",
      thumbnail: "/images/LED-automotive-display.jpg", 
      description: "최신 자동차 실내 조명을 위한 프리미엄급 LED Driver IC 솔루션으로, 고급스러운 실내 분위기 연출이 가능합니다.",
      highlight: "※ 글로벌 자동차 부품 신뢰성 인증 AEC-Q100 획득",
      feature: "스마트 디밍",
      badges: ["차량용", "고신뢰성"]
    },
    {
      title: "범용성이 뛰어나 무난한 LED 드라이버 IC",
      link: "/applications/display-backlight",
      thumbnail: "/images/LED-multi-purpose-display.jpg",
      description: "다양한 디스플레이 제품에 최적화된 LED Driver IC로, 뛰어난 호환성과 안정적인 성능을 제공합니다.",
      highlight: "※ 업계 최고 수준 16비트 고해상도 디밍으로 완벽한 화질 구현",
      feature: "고해상도",
      badges: ["범용성", "고효율"]
    },
    {
      title: "실내 조명용 LED 드라이버 IC",
      link: "/applications/interior-lighting",
      thumbnail: "/images/LED-indoor-display.jpg",
      description: "사무실, 상업 공간에 최적화된 프리미엄 LED 솔루션으로, 쾌적한 업무 환경 조성에 기여합니다.",
      highlight: "※ 스마트 전류 보정 기술로 장시간 균일한 밝기 유지",
      feature: "밝기 제어",
      badges: ["실내용", "장수명"]
    },
    {
      title: "실외 및 산업용 LED 드라이버 IC",
      link: "/applications/outdoor-lighting",
      thumbnail: "/images/LED-outdoor-display.jpg",
      description: "극한 환경에서도 안정적인 성능을 발휘하는 산업용 LED 솔루션으로, 뛰어난 내구성을 자랑합니다.",
      highlight: "※ IP67 방수/방진 등급으로 혹독한 환경에서도 완벽 작동",
      feature: "고내구성",
      badges: ["산업용", "방수방진"]
    },
    {
      title: "가격이 착한 LED 드라이버 IC",
      link: "/applications/cost-effective",
      thumbnail: "/images/LED-cost-effective-display.jpg",
      description: "합리적인 가격으로 기본에 충실한 LED 드라이버 IC로, 비용 효율적인 조명 솔루션을 제공합니다.",
      highlight: "※ 최적화된 설계로 가성비와 성능 모두 만족",
      feature: "경제성",
      badges: ["가성비", "실용성"]
    },
    {
      title: "LED 드라이버IC 주변 소자 추천",
      link: "/applications/components",
      thumbnail: "/images/LED-component.jpg",
      description: "LED 드라이버 IC의 성능을 극대화하는 엄선된 주변 부품으로, 완벽한 시스템 구성이 가능합니다.",
      highlight: "※ 전문가가 검증한 호환성 보장 부품 추천",
      feature: "토탈솔루션",
      badges: ["호환성", "검증완료"]
    }
  ];

  const LazyHeroParallax = React.lazy(() => import('./mainPage/hero-parrallax'));
  const LazyFeature = React.lazy(() => import('./mainPage/featureSection'));
  const LazyApplicationsSection = React.lazy(() => import('./mainPage/applicationSection'));
  const LazyPartnersSection = React.lazy(() => import('./mainPage/PartnersSection')); 
  const LazyContactSection = React.lazy(() => import('./mainPage/contactSection'));

  return (
    <div className="flex flex-col">
      <section id="hero" className="w-full bg-gray-50 py-4 lg:py-8">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyHeroParallax products={heroParallaxBanner}/>
        </React.Suspense>
      </section>

      <section id="features" className="w-full bg-gray-100 py-16 lg:py-24">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyFeature />
        </React.Suspense>
      </section>

      <section id="applications" className="w-full bg-gray-50 py-16 lg:py-24">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyApplicationsSection applications={applications} />
        </React.Suspense>
      </section>

      <section id="partners" className="w-full bg-gray-100 py-16 lg:py-24">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyPartnersSection />
        </React.Suspense>
      </section>

      <section id="contact" className="w-full bg-gray-50 py-16 lg:py-24">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyContactSection />
        </React.Suspense>
      </section>
    </div>
  );
}
