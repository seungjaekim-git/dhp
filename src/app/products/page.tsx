import ProductsLayout from "./ProductsLayout";
import { Package, Building, Zap, Cpu, Bolt, Car, Factory, Smartphone, Lightbulb, CircuitBoard, Cable, Plug, Thermometer } from "lucide-react";
import { getAllManufacturers } from "@/lib/supabase-client";
import Image from "next/image";
import Link from "next/link";
import { ManufacturerCard } from "./components/ManufacturerCard";
import { ProductCategoryCard } from "./components/ProductCategoryCard";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const manufacturers = await getAllManufacturers();

  const productCategories = [
    { 
      title: "LED 드라이버 IC", 
      description: "고효율 LED 컨트롤러 및 드라이버 솔루션으로, 다양한 LED 조명 애플리케이션에 최적화된 성능을 제공합니다. 정밀한 전류 제어와 높은 효율성을 통해 에너지 소비를 최소화합니다.", 
      icon: <Lightbulb className="w-6 h-6" />, 
      color: "from-blue-500 to-cyan-400",
      href: "/products/list?category=led-drivers",
      subcategories: [
        { name: "일반 조명용 LED 드라이버" },
        { name: "디스플레이 백라이트 드라이버" },
        { name: "자동차 LED 드라이버" },
        { name: "무선 조광 LED 드라이버" },
        { name: "RGB LED 드라이버" }
      ]
    },
    { 
      title: "다이오드", 
      description: "정류, 보호 및 신호 처리용 다이오드 제품으로, 회로 보호와 신호 처리에 필수적인 반도체 소자입니다. 다양한 패키지와 특성을 갖춘 제품으로 다양한 애플리케이션에 대응합니다.", 
      icon: <CircuitBoard className="w-6 h-6" />, 
      color: "from-amber-500 to-orange-400",
      href: "/products/list?category=diodes",
      subcategories: [
        { name: "정류 다이오드" },
        { name: "제너 다이오드" },
        { name: "쇼트키 다이오드" },
        { name: "TVS 다이오드" },
        { name: "LED 다이오드" }
      ]
    },
    { 
      title: "케이블", 
      description: "다양한 용도에 맞는 고품질 케이블 제품으로, 신호 전송과 전력 공급에 최적화된 성능을 제공합니다. 산업용, 자동차, 통신 등 다양한 환경에서 안정적인 연결을 보장합니다.", 
      icon: <Cable className="w-6 h-6" />, 
      color: "from-green-500 to-emerald-400",
      disabled: true,
      comingSoon: true,
      subcategories: [
        { name: "산업용 케이블" },
        { name: "자동차 케이블" },
        { name: "통신 케이블" },
        { name: "전원 케이블" }
      ]
    },
    { 
      title: "커넥터", 
      description: "신뢰성 높은 전기적 연결을 위한 커넥터로, 다양한 환경에서 안정적인 신호 및 전력 전송을 보장합니다. 산업용, 자동차, 소비자 가전 등 다양한 분야에 최적화된 제품을 제공합니다.", 
      icon: <Plug className="w-6 h-6" />, 
      color: "from-purple-500 to-indigo-400",
      disabled: true,
      comingSoon: true,
      subcategories: [
        { name: "보드 간 커넥터" },
        { name: "I/O 커넥터" },
        { name: "전원 커넥터" },
        { name: "RF 커넥터" }
      ]
    },
    { 
      title: "센서", 
      description: "온도, 습도, 압력 등 다양한 센서 제품으로, 환경 모니터링 및 제어 시스템에 필수적인 요소입니다. 고정밀 측정과 빠른 응답 시간을 통해 정확한 데이터 수집을 지원합니다.", 
      icon: <Thermometer className="w-6 h-6" />, 
      color: "from-red-500 to-pink-400",
      disabled: true,
      comingSoon: true,
      subcategories: [
        { name: "온도 센서" },
        { name: "습도 센서" },
        { name: "압력 센서" },
        { name: "모션 센서" },
        { name: "가스 센서" }
      ]
    }
  ];

  const applicationAreas = [
    {
      id: "automotive",
      name: "자동차",
      description: "자동차 산업을 위한 전력 관리 및 제어 시스템 솔루션",
      icon: <Car className="w-6 h-6" />,
      color: "bg-blue-500/15",
      textColor: "text-blue-400",
      productCount: 142
    },
    {
      id: "industrial",
      name: "산업용",
      description: "산업 자동화, 모터 제어 및 공장 자동화를 위한 솔루션",
      icon: <Factory className="w-6 h-6" />,
      color: "bg-amber-500/15",
      textColor: "text-amber-400",
      productCount: 186
    },
    {
      id: "consumer",
      name: "소비자 가전",
      description: "소비자 전자 제품을 위한 전력 효율적인 솔루션",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-green-500/15",
      textColor: "text-green-400",
      productCount: 124
    }
  ];

  return (
    <ProductsLayout
      title="제품 소개"
      icon={<Package className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품 소개" }
      ]}
      description="대한플러스전자에서 제공하는 LED 드라이버 IC, 다이오드 등 다양한 전자부품 제품을 살펴보세요."
      badges={[
        {
          text: "LED 드라이버 IC",
          bgColor: "bg-blue-500/20", 
          textColor: "text-blue-300", 
          hoverColor: "hover:bg-blue-500/30" 
        },
        { 
          text: "다이오드", 
          bgColor: "bg-amber-500/20", 
          textColor: "text-amber-300", 
          hoverColor: "hover:bg-amber-500/30" 
        },
        { 
          text: "준비중", 
          bgColor: "bg-gray-500/20", 
          textColor: "text-gray-300", 
          hoverColor: "hover:bg-gray-500/30" 
        }
      ]}
    >
      <div className="space-y-16">
        {/* 제품 카테고리 섹션 */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl -z-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">제품 카테고리</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              LED 드라이버 IC와 다이오드 제품을 살펴보고 귀사에 적합한 솔루션을 찾아보세요. 
              케이블, 커넥터, 센서 제품은 현재 준비 중이며, 곧 서비스가 시작될 예정입니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {productCategories.map((category, index) => (
                <ProductCategoryCard 
                  key={index}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* 응용 분야 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">응용 분야</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <p className="text-gray-400 mb-8">산업별 최적화된 솔루션으로 귀사의 제품 개발을 가속화하세요.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applicationAreas.map((area) => (
              <Link 
                href={`/products/applications/${area.id}`} 
                key={area.id}
                className="group"
              >
                <div className={`p-6 rounded-xl border border-gray-700 ${area.color} transition-all duration-300 h-full hover:border-gray-500`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${area.textColor} bg-gray-800/80`}>
                      {area.icon}
                    </div>
                    <div className="rounded-full px-2.5 py-1 text-xs font-medium bg-gray-700/70 text-gray-300">
                      {area.productCount}개 제품
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {area.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {area.description}
                  </p>
                  
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                    자세히 보기 →
                  </Button>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800 mt-4">
              <Link href="/products/applications">
                모든 응용 분야 보기
              </Link>
            </Button>
          </div>
        </div>
        
        {/* 파트너 제조사 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">파트너 제조사</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <p className="text-gray-400 mb-8">대한플러스전자는 세계 각국의 우수한 제조사와 협력하여 고품질 제품을 제공합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {manufacturers.slice(0, 6).map((manufacturer, index) => (
              <ManufacturerCard 
                key={manufacturer.id} 
                manufacturer={manufacturer} 
                index={index} 
              />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800 mt-4">
              <Link href="/products/manufacturers">
                모든 제조사 보기
              </Link>
            </Button>
          </div>
        </div>
        
        {/* 기술 지원 배너 */}
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">전문적인 기술 지원</h3>
              <p className="text-gray-300 mb-6">
                제품 선택부터 구현까지, 당사의 전문 엔지니어가 귀사의 프로젝트를 지원합니다. 
                맞춤형 기술 상담 및 샘플 요청을 통해 최적의 솔루션을 찾아보세요.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/support/contact">
                    기술 상담 요청
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-600 hover:bg-gray-800">
                  <Link href="/support/samples">
                    샘플 요청
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Zap className="w-16 h-16 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductsLayout>
  );
}
