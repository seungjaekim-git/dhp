import ProductsLayout from "../ProductsLayout";
import { Building2 } from "lucide-react";
import { ManufacturerCard } from "../components/ManufacturerCard";

// 샘플 데이터 - 실제로는 supabase-client.ts에서 가져옴
const manufacturers = [
  {
    id: 1,
    name: "Texas Instruments",
    description: "세계적인 반도체 제조업체로서 아날로그 IC, 임베디드 프로세서, 전력 관리 제품을 설계 및 제조합니다.",
    country_id: "미국",
    logo: "/images/manufacturers/texas-instruments.webp",
    product_category: ["아날로그 IC", "전력 관리", "마이크로컨트롤러"]
  },
  {
    id: 2,
    name: "Analog Devices",
    description: "고성능 아날로그, 디지털 신호 처리 집적 회로를 제조하는 선도적인 회사입니다.",
    country_id: "미국",
    logo: "/images/manufacturers/analog-devices.webp",
    product_category: ["데이터 변환기", "센서", "신호 처리"]
  },
  {
    id: 3,
    name: "Infineon Technologies",
    description: "자동차, 산업용 전력 제어, 보안 응용 프로그램 등을 위한 반도체 및 시스템 솔루션을 제공합니다.",
    country_id: "독일",
    logo: "/images/manufacturers/infineon.webp",
    product_category: ["전력 반도체", "센서", "마이크로컨트롤러"]
  },
  {
    id: 4,
    name: "STMicroelectronics",
    description: "다양한 전자 응용 분야의 반도체 솔루션을 개발하고 제조하는 세계적인 독립 반도체 회사입니다.",
    country_id: "스위스",
    logo: "/images/manufacturers/stmicroelectronics.webp",
    product_category: ["마이크로컨트롤러", "센서", "아날로그 IC"]
  },
  {
    id: 5,
    name: "Microchip Technology",
    description: "마이크로컨트롤러, 혼합 신호, 아날로그 및 Flash-IP 솔루션을 제공하는 선도적인 업체입니다.",
    country_id: "미국",
    logo: "/images/manufacturers/microchip.webp",
    product_category: ["마이크로컨트롤러", "메모리", "인터페이스"]
  },
  {
    id: 6,
    name: "ON Semiconductor",
    description: "에너지 효율적인 혁신을 통해 자동차, 통신, 컴퓨팅, 의료, 항공우주 산업에 서비스를 제공합니다.",
    country_id: "미국",
    logo: "/images/manufacturers/onsemi.webp",
    product_category: ["전력 관리", "센서", "아날로그 IC"]
  },
  {
    id: 7,
    name: "Rohm Semiconductor",
    description: "전력 및 아날로그 IC, 디스크리트 디바이스, 패시브 구성 요소를 전문으로 하는 일본 전자 부품 제조업체입니다.",
    country_id: "일본",
    logo: "/images/manufacturers/rohm.webp",
    product_category: ["전력 반도체", "LED 드라이버", "다이오드"]
  },
  {
    id: 8,
    name: "Vishay",
    description: "거의 모든 유형의 전자 디바이스 및 장비에 사용되는 반도체 및 패시브 전자 구성 요소의 제조업체입니다.",
    country_id: "미국",
    logo: "/images/manufacturers/vishay.webp",
    product_category: ["레지스터", "캐패시터", "다이오드"]
  },
];

export default function ManufacturersPage() {
  // 국가별 그룹화
  const countryGroups = manufacturers.reduce((groups, manufacturer) => {
    const country = manufacturer.country_id;
    if (!groups[country]) {
      groups[country] = [];
    }
    groups[country].push(manufacturer);
    return groups;
  }, {} as Record<string, typeof manufacturers>);

  return (
    <ProductsLayout
      title="제조사별 제품"
      icon={<Building2 className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "제조사별 제품" }
      ]}
      description="다양한 글로벌 제조사와 협력하여 공급하는 제품들을 살펴보세요."
      badges={[
        { 
          text: "글로벌 파트너", 
          bgColor: "bg-blue-500/20", 
          textColor: "text-blue-300", 
          hoverColor: "hover:bg-blue-500/30" 
        },
        { 
          text: "제조사 협력", 
          bgColor: "bg-teal-500/20", 
          textColor: "text-teal-300", 
          hoverColor: "hover:bg-teal-500/30" 
        }
      ]}
    >
      <div className="space-y-12">
        {Object.entries(countryGroups).map(([country, manufacturersList]) => (
          <div key={country} className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{country}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {manufacturersList.map((manufacturer, index) => (
                <ManufacturerCard 
                  key={manufacturer.id} 
                  manufacturer={manufacturer} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProductsLayout>
  );
} 