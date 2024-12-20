import { Building2, Link } from "lucide-react";
import AboutLayout from "./AboutLayout";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const features = [
    {
      Icon: () => <span className="text-4xl">👋</span>,
      name: "CEO 인사말",
      description: "대한플러스전자의 비전과 가치를 소개합니다",
      href: "/about/introduction",
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4",
      cta: "자세히 보기"
    },
    {
      Icon: () => <span className="text-4xl">📅</span>,
      name: "회사연혁",
      description: "1990년부터 이어온 혁신의 발자취",
      href: "/about/history",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
      cta: "자세히 보기"
    },
    {
      Icon: () => <span className="text-4xl">💡</span>,
      name: "사업소개", 
      description: "LED 드라이버 IC 및 전자부품 유통 사업",
      href: "/about/business",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
      cta: "자세히 보기"
    },
    {
      Icon: () => <span className="text-4xl">🗺️</span>,
      name: "찾아오시는 길",
      description: "서울 본사 및 지사 위치 안내",
      href: "/about/location",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      cta: "자세히 보기"
    },
    {
      Icon: () => <span className="text-4xl">🤝</span>,
      name: "파트너사 둘러보기",
      description: "함께 성장하는 글로벌 파트너십",
      href: "/about/partners",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
      cta: "자세히 보기"
    }
  ];

  return (
    <AboutLayout
      title="회사소개"
      icon={<Building2 className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
        { label: "현재 페이지" },
      ]}
      description="대한플러스전자(주)의 회사 소개 페이지입니다."
      badges={[
        {
          text: "LED 드라이버 IC",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700", 
          hoverColor: "hover:bg-blue-200"
        },
        {
          text: "전자부품 유통",
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          hoverColor: "hover:bg-sky-200"
        }
      ]}
    >
      <div className="space-y-24">
        {/* CTA 섹션 */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-white md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold">30년 이상의 신뢰와 혁신</h2>
              <p className="text-blue-100 text-lg">
                대한플러스전자(주)는 LED 드라이버 IC 및 전자부품 유통 전문기업으로서,
                고객의 성공을 위한 최적의 파트너가 되어드리겠습니다.
              </p>
            </div>
            <Button variant="ghost" className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 group">
              회사소개서 다운로드
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        {/* 성장과정 섹션 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-50 p-6 rounded-2xl w-1/2">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-white rounded-xl p-4">
              <div className="w-full h-full flex items-end justify-between gap-4">
                {[40, 65, 75, 85, 100].map((height, i) => (
                  <div key={i} className="w-full">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000"
                      style={{height: `${height}%`}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">30년간의 성장과 혁신</h3>
            <div className="space-y-4">
              <p className="text-gray-600">1993년 설립 이후, 대한플러스전자(주)는 지속적인 혁신과 고객 중심 경영으로 성장해왔습니다.</p>
              <ul className="space-y-3">
                {['기술 혁신 선도', '고객 만족 극대화', '글로벌 파트너십 구축'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"/>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 고객 신뢰 섹션 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">99.9% 고객 만족도</h3>
            <div className="space-y-4">
              <p className="text-gray-600">철저한 품질 관리와 신속한 고객 응대로 높은 신뢰도를 유지하고 있습니다.</p>
              <ul className="space-y-3">
                {['24시간 고객 지원', '품질 보증 시스템', '실시간 재고 관리'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"/>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-8 border-blue-500 rounded-full animate-spin-slow opacity-20" />
              <div className="absolute inset-4 border-8 border-blue-400 rounded-full animate-spin-slow opacity-40" />
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
            </div>
          </div>
        </div>

        {/* 글로벌 네트워크 섹션 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-50 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 opacity-20 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">글로벌 유통망</h3>
            <div className="space-y-4">
              <p className="text-gray-600">전 세계 20개국 이상의 파트너사와 협력하여 안정적인 공급망을 구축하고 있습니다.</p>
              <ul className="space-y-3">
                {['글로벌 물류 네트워크', '실시간 재고 확인', '신속한 납기 대응'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"/>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 벤토 그리드 네비게이션 */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-gray-900">
              주요 서비스
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              <p className="text-lg text-gray-600">
                대한플러스전자의 핵심 서비스를 소개합니다
              </p>
            </div>
          </div>

          <BentoGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features?.map((feature, index) => (
              <Link 
                href={feature?.href ?? '#'}
                key={index}
                className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-blue-300/5 rounded-xl" />
                <BentoCard
                  Icon={feature?.Icon}
                  name={feature?.name}
                  description={feature?.description ?? ''}
                  className={`${feature?.className ?? ''} group-hover:scale-[1.02] transition-all duration-300`}
                  href={feature?.href ?? '#'}
                  cta={feature?.cta ?? ''}
                />
                <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-gradient-to-t from-sky-400 to-blue-300 text-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-semibold">{feature?.cta}</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </BentoGrid>
        </div>

        {/* 고객사 로고 클라우드 */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-gray-900">신뢰할 수 있는 파트너사</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/2] rounded-lg bg-gray-100 p-4 flex items-center justify-center group hover:bg-gray-50 transition-colors">
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">Logo {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AboutLayout>
  );
}
