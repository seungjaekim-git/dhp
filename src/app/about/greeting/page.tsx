import { Target, Heart, Leaf, CheckCircle, Clock, Lightbulb } from "lucide-react";
import AboutLayout from "../AboutLayout";
import { cn } from "@/lib/utils";
import AnimatedCEOProfile from "../components/AnimatedCEOProfile";
import AnimatedCEOMessage from "../components/AnimatedCEOMessage";
import AnimatedSectionTitle from "../components/AnimatedSectionTitle";
import AnimatedValueCard from "../components/AnimatedValueCard";
import DynamicIcon from "../components/DynamicIcon";

export default function GreetingPage() {

  const businessAreas = [
    { name: "LED 드라이버 IC 유통", icon: "Cpu", description: "Macroblock, XLSEMI 등 글로벌 제조사의 고품질 LED 드라이버 IC 공급" },
    { name: "전자부품 유통", icon: "Lightbulb", description: "Zowie, POWTECH 등 다양한 전자 부품 공급 및 기술 지원" },
    { name: "LED 클러스터 R&D", icon: "Lightbulb", description: "RGB 클러스터 연구개발 및 기술 컨설팅 제공" },
    { name: "기술 컨설팅", icon: "Compass", description: "LED 디스플레이 솔루션 설계 및 최적화 컨설팅 서비스" }
  ];

  const coreValues = [
    {
      iconName: "Heart",
      title: "고객 중심",
      description: "고객 만족을 최우선으로 하며 맞춤형 솔루션을 제공합니다.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      delay: 0.1,
    },
    {
      iconName: "Leaf",
      title: "사회적 책임",
      description: "환경을 생각하며 지속 가능한 미래를 만들어갑니다.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      delay: 0.2,
    },
    {
      iconName: "CheckCircle",
      title: "품질 경영",
      description: "엄격한 품질 관리로 최고의 제품을 제공합니다.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      delay: 0.3,
    },
    {
      iconName: "Clock",
      title: "정확한 납기",
      description: "철저한 공급망 관리로 정시 납기를 보장합니다.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      delay: 0.4,
    },

    
  ];

  return (
    <AboutLayout
      title="CEO 인사말"
      icon={<DynamicIcon name="Target" className="w-6 h-6 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
        { label: "CEO 인사말", href: "/about/greeting" },
      ]}
      description="대한플러스전자(주)의 비전과 가치를 소개합니다."
      badges={[
        {
          text: "혁신",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
        {
          text: "신뢰",
          bgColor: "bg-sky-500/20",
          textColor: "text-sky-400",
          hoverColor: "hover:bg-sky-500/30",
        },
      ]}
    >
      <div className="space-y-24">
        {/* CEO 인사말 섹션 */}
        <section className="flex flex-col md:flex-row gap-12 items-start">
          <AnimatedCEOProfile 
            imageSrc="/images/background_img.webp"
            name="대표이사 김영구"
            title="대한플러스전자(주)"
          />
          
          <AnimatedCEOMessage
            title="변화에 앞서고, 신뢰를 더하다 – 고객과 함께 성장하는 대한플러스전자(주)"
          >
            <p className="text-lg">
              안녕하세요. 항상 저희 대한플러스전자㈜에 변함없는 성원과 애정을 보내주시는 고객분들께 진심으로 감사의 말씀을 드립니다.
            </p>
            <p>
              대한플러스전자㈜는 설립이래 현재까지 반도체 유통전문업체로서 국내전자산업의 발전을 위해 많은 노력을 하여왔습니다. 풍부한 노하우와 축적된 기술, 적극적이고 성실한 자세로 여러분의 요구에 최선을 다해 부응할 것입니다.
            </p>
            <p>
              변화의 속도가 어느 산업분야보다도 빠른 전자산업에 종사하는 대한플러스전자 모든 구성원은 항상 현실에 충실하되 미래의 변화에 준비하고 대응하는 일류기업이기 위해 끊임없는 개척정신과 혁신으로 어느 곳에서나 모든 고객분들께 사랑 받고 믿음 주는 기업이 될 것을 약속 드립니다.
            </p>
            <p>
              앞으로 고객과 더불어 더욱 발전해 나가는 기업이 되도록 최선을 다하겠습니다.
            </p>
          </AnimatedCEOMessage>
        </section>

          {/* 회사 비전 및 핵심 가치 */}
          <section className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800 p-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 space-y-5">
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-blue-500"></div>
                <span className="text-blue-400 text-sm font-medium">OUR MISSION</span>
              </div>
              <h2 className="text-2xl font-bold text-white">대한플러스전자의 비전과 핵심가치</h2>
              <p className="text-gray-300 leading-relaxed">
                1997년 설립 이래, 대한플러스전자는 LED 드라이버 IC 및 전자부품 유통 분야에서 <span className="text-blue-400 font-medium">국내 시장을 선도</span>해 왔습니다. 
                Macroblock, XLSEMI 등 글로벌 제조사의 한국 공식 대리점으로서 <span className="text-blue-400 font-medium">안정적인 부품 공급망</span>을 구축하고, 
                신속한 납기와 기술 지원을 통해 고객의 성공을 지원합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                {[
                  { icon: "Globe", title: "신뢰성", text: "안정적 공급망 구축" },
                  { icon: "Shield", title: "품질 보장", text: "엄격한 품질 관리 시스템" },
                  { icon: "BarChart", title: "기술 혁신", text: "지속적인 R&D 투자" },
                  { icon: "Users", title: "고객 중심", text: "신속한 대응과 기술 지원" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="p-2 rounded-md bg-blue-500/10">
                      <DynamicIcon name={item.icon} className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-center">
              <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-900/30 to-gray-900/20 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  주요 사업 영역
                </h3>
                <div className="space-y-4">
                  {businessAreas.map((area, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-gray-800/40 border border-gray-700">
                      <div className="p-2 rounded-md bg-blue-500/10">
                        <DynamicIcon name={area.icon} className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{area.name}</h4>
                        <p className="text-xs text-gray-300">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}
