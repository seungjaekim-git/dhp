import { Metadata } from "next";
import LEDDriverICListPage from "./leddrivericListPage";
import { LedBulbIcon, Cpu } from "lucide-react";
import AnimatedHeroSection from "@/app/about/components/AnimatedHeroSection";

export const metadata: Metadata = {
  title: "LED 드라이버 IC | 반도체 부품 정보",
  description: "LED 드라이버 IC - 고효율 LED 조명 컨트롤을 위한 다양한 LED 드라이버 IC",
};

export default function LedDriverICPage() {
  const breadcrumbItems = [
    { label: "홈", href: "/" },
    { label: "제품", href: "/products" },
    { label: "LED 드라이버 IC", href: "/products/list/leddriveric" },
  ];

  const badges = [
    { 
      text: "LED 조명", 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-800", 
      hoverColor: "hover:bg-blue-200" 
    },
    { 
      text: "디스플레이", 
      bgColor: "bg-green-100", 
      textColor: "text-green-800", 
      hoverColor: "hover:bg-green-200" 
    },
    { 
      text: "자동차", 
      bgColor: "bg-amber-100", 
      textColor: "text-amber-800", 
      hoverColor: "hover:bg-amber-200" 
    },
    { 
      text: "산업용", 
      bgColor: "bg-purple-100", 
      textColor: "text-purple-800", 
      hoverColor: "hover:bg-purple-200" 
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <AnimatedHeroSection
        title="LED 드라이버 IC"
        icon={<Cpu className="w-6 h-6 text-blue-400" />}
        breadcrumb={breadcrumbItems}
        description="다양한 응용 분야의 LED 조명 제어를 위한 고효율, 고신뢰성 LED 드라이버 IC 제품 목록입니다. 채널 수, 전압, 전류 등 다양한 조건으로 필터링하여 최적의 제품을 찾아보세요."
        badges={badges}
      />
      
      <div className="mx-auto px-4 py-12 max-w-[1400px]">
        <LEDDriverICListPage />
      </div>
    </>
  );
}
