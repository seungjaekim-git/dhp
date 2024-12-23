import { Handshake, Building2, CalendarDays, Lightbulb, MapPin } from "lucide-react";
import AboutLayout from "./AboutLayout";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
export default function AboutPage() {
  const features = [
    {
      Icon: Handshake,
      name: "CEO 인사말",
      description: "대한플러스전자의 비전과 가치를 소개합니다",
      href: "/about/introduction", 
      background: <div className="bg-blue-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      enableGroupHover: true,
    },
    {
      Icon: CalendarDays,
      name: "회사연혁", 
      description: "1990년부터 이어온 혁신의 발자취",
      href: "/about/history",
      background: <div className="bg-yellow-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
      enableGroupHover: true,
    },
    {
      Icon: Lightbulb,
      name: "사업소개",
      description: "LED 드라이버 IC 및 전자부품 유통 사업",
      href: "/about/business",
      background: <div className="bg-green-100 h-full w-full" />,
      cta: "자세히 보기", 
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
      enableGroupHover: true,
    },
    {
      Icon: MapPin,
      name: "찾아오시는 길",
      description: "주소 및 주차 안내",
      href: "/about/location",
      background: <div className="bg-blue-100 h-full w-full" />,
      cta: "자세히 보기",
      className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
      enableGroupHover: true,
    },
  ];

  return (
    <AboutLayout
      title="회사소개"
      icon={<Building2 className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* 왼쪽 컬럼 - 고정 위치 */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <Link href="/about" className="block [perspective:800px]">
              <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50/80 to-white rounded-3xl border border-gray-100/80 transition-all duration-300 ease-in-out hover:[transform:rotate3d(0.5,1,0,8deg)]">
                <div className="space-y-8">
                  <div className="space-y-4 hover:-translate-y-1 transition-transform duration-200">
                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                      대한플러스전자(주) 소개
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                    <p className="text-base font-medium text-gray-700">
                      &quot;고객과 함께 성장하는 기업&quot;
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-600 hover:-translate-y-1 transition-transform duration-200">
                      <strong className="text-gray-900 font-semibold">대한플러스전자(주)</strong>는 30년 이상의 경험과 기술력을 바탕으로 LED 드라이버 IC 및 전자부품 유통 분야를 선도하고 있습니다.
                    </p>
                    <ul className="space-y-3 text-xs text-gray-600">
                      <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                        30년 이상의 업계 경험
                      </li>
                      <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                        글로벌 파트너십 구축
                      </li>
                      <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                        기술 혁신 선도
                      </li>
                      <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                        고객 만족 극대화
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="group flex justify-center items-center w-full mt-12 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1 transition-all duration-200">
                  회사소개서 다운로드
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* 오른쪽 컬럼 - 벤토 그리드 */}
          <div className="lg:col-span-8">
            <BentoGrid className="lg:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>

        {/* 성장과정 섹션 */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 p-12 rounded-3xl">
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
        <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 p-12 rounded-3xl">
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
