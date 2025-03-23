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

  const LazyHeroParallax = React.lazy(() => import('./mainPage/hero-parrallax'));
  const LazyFeature = React.lazy(() => import('./mainPage/featureSection'));
  const LazyPartnersSection = React.lazy(() => import('./mainPage/PartnersSection')); 
  const LazyContactSection = React.lazy(() => import('./mainPage/contactSection'));

  return (
    <div className="flex flex-col">
      <section id="hero" className="w-full bg-gray-50 py-4 lg:py-8">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyHeroParallax products={heroParallaxBanner}/>
        </React.Suspense>
      </section>

      <section id="features" className="w-full bg-gray-100">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyFeature />
        </React.Suspense>
      </section>

      <section id="partners" className="w-full bg-gray-100">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyPartnersSection />
        </React.Suspense>
      </section>

      <section id="contact" className="w-full bg-gray-50">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyContactSection />
        </React.Suspense>
      </section>
    </div>
  );
}
