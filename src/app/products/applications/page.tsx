import ProductsLayout from "../ProductsLayout";
import { Zap, Cpu, Bolt, Car, Factory, Smartphone, Activity, Phone, Rocket } from "lucide-react";
import { ApplicationCard } from "../components/ApplicationCard";

// 응용 분야 목록 
const applications = [
  {
    id: "automotive",
    name: "자동차",
    description: "자동차 산업을 위한 전력 관리, 제어 시스템, LED 드라이버 및 센서 솔루션",
    icon: <Car className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    count: 142,
    featured: true
  },
  {
    id: "industrial",
    name: "산업용",
    description: "산업 자동화, 모터 제어, 전력 관리 및 공장 자동화를 위한 견고한 솔루션",
    icon: <Factory className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    count: 186,
    featured: true
  },
  {
    id: "consumer",
    name: "소비자 가전",
    description: "소비자 전자 제품을 위한 전력 효율적인 솔루션 및 인터페이스 제품",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    count: 124,
    featured: true
  },
  {
    id: "medical",
    name: "의료기기",
    description: "의료 장비 및 진단 장치를 위한 고정밀 및 신뢰성 높은 제품",
    icon: <Activity className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    count: 76,
    featured: true
  },
  {
    id: "communications",
    name: "통신장비",
    description: "네트워크 인프라, 통신 장비 및 무선 시스템을 위한 솔루션",
    icon: <Phone className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    count: 92,
    featured: false
  },
  {
    id: "aerospace",
    name: "항공우주",
    description: "항공우주 및 방위 산업을 위한 고신뢰성 제품",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-cyan-500 to-cyan-600",
    count: 43,
    featured: false
  },
  {
    id: "lighting",
    name: "조명",
    description: "일반 조명 및 특수 조명 어플리케이션을 위한 LED 드라이버 IC",
    icon: <Bolt className="w-6 h-6" />,
    color: "from-yellow-500 to-yellow-600",
    count: 67,
    featured: false
  },
  {
    id: "computing",
    name: "컴퓨팅",
    description: "서버, 클라우드 인프라 및 데이터 저장을 위한 솔루션",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-indigo-500 to-indigo-600",
    count: 89,
    featured: false
  },
];

export default function ApplicationsPage() {
  const featuredApps = applications.filter(app => app.featured);
  const otherApps = applications.filter(app => !app.featured);
  
  return (
    <ProductsLayout
      title="응용 분야별 제품"
      icon={<Zap className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "응용 분야별 제품" }
      ]}
      description="다양한 산업 응용 분야별로 최적화된 제품 솔루션을 찾아보세요."
      badges={[
        { 
          text: "산업 특화 솔루션", 
          bgColor: "bg-blue-500/20", 
          textColor: "text-blue-300", 
          hoverColor: "hover:bg-blue-500/30" 
        },
        { 
          text: "응용 분야", 
          bgColor: "bg-violet-500/20", 
          textColor: "text-violet-300", 
          hoverColor: "hover:bg-violet-500/30" 
        }
      ]}
    >
      <div className="space-y-12">
        {/* 주요 응용 분야 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">주요 응용 분야</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredApps.map(app => (
              <ApplicationCard key={app.id} app={app} isFeatured={true} />
            ))}
          </div>
        </div>
        
        {/* 기타 응용 분야 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">기타 응용 분야</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {otherApps.map(app => (
              <ApplicationCard key={app.id} app={app} isFeatured={false} />
            ))}
          </div>
        </div>
      </div>
    </ProductsLayout>
  );
} 