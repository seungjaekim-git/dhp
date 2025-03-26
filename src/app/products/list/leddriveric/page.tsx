import LEDDriverICListPage from "./leddrivericListPage";
import ListLayout from "./ListLayout";
import { Cpu, FlaskConical, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LED 드라이버 IC | DHP Electronics",
  description: "LED 관련 반도체 제품으로 높은 효율성과 안정적인 성능을 제공하는 다양한 브랜드와 사양의 LED 드라이버 IC 목록입니다.",
  keywords: "LED 드라이버, IC, 반도체, 전자부품, 고효율, 안정성"
};

export default function Page() {
  return (
    <ListLayout
      title="LED 드라이버 IC"
      icon={<Cpu className="w-6 h-6 text-white" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="LED 관련 반도체 제품으로 높은 효율성과 안정적인 성능을 제공하는 다양한 브랜드와 사양의 LED 드라이버 IC 목록입니다. 최신 기술을 적용한 다양한 제품을 만나보세요."
      badges={[
        { 
          text: "신제품", 
          bgColor: "bg-gradient-to-r from-green-100 to-green-200", 
          textColor: "text-green-700", 
          hoverColor: "hover:from-green-200 hover:to-green-300" 
        },
        { 
          text: "인기 제품", 
          bgColor: "bg-gradient-to-r from-amber-100 to-amber-200", 
          textColor: "text-amber-700", 
          hoverColor: "hover:from-amber-200 hover:to-amber-300" 
        },
        { 
          text: "고효율", 
          bgColor: "bg-gradient-to-r from-blue-100 to-blue-200", 
          textColor: "text-blue-700", 
          hoverColor: "hover:from-blue-200 hover:to-blue-300" 
        }
      ]}
    >
      <LEDDriverICListPage />
    </ListLayout>
  );
}
