import { Building2, Boxes, TrendingUp, ClipboardCheck, BarChart3, PackageCheck } from "lucide-react";
import AboutLayout from "../AboutLayout";
import Image from "next/image";

export default function BusinessPage() {
  const businessAreas = [
    {
      title: "선제적 재고 확보 및 품질 확보",
      icon: Boxes,
      items: [
        "국내외 대리점 및 OEM 생산 업체를 통한 정품 부품 구매",
        "고객사와 협의하여 1 LOT 분량의 실 재고 보유",
        "25년간의 구매 노하우를 통한 최신 제품 선별"
      ]
    },
    {
      title: "물류 창고 운영 및 안정적 관리",
      icon: PackageCheck,
      items: [
        "국내외 대리점 및 OEM 생산 업체를 통한 정품 부품 구매",
        "1 LOT 실 재고를 보유한 신속한 대응",
        "ERAI를 통해 검증된 업체에서 구매 실천"
      ]
    },
    {
      title: "신속한 납기 및 품질 관리",
      icon: TrendingUp,
      items: [
        "구로 중앙유통단지 내 신속한 견적 제공과 품질 보장",
        "다양한 VENDOR 활용으로 최단 기일 내 납품 실현",
        "전자부품 시장 동향 파악 및 최신 정보 제공"
      ]
    }
  ];

  return (
    <AboutLayout
      title="사업 개요"
      icon={<Building2 className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
        { label: "사업 개요", href: "/about/business" },
      ]}
      description="대한플러스전자(주)의 사업 영역과 운영 방식을 소개합니다."
      badges={[
        {
          text: "LED 드라이버 IC 전문",
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
      <div className="space-y-12">
        {/* 사업 영역 섹션 */}
        {businessAreas.map((area, index) => (
          <section key={index} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="flex items-center gap-3">
                  <area.icon className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-4" />
              </div>
              
              <div className="md:w-3/4">
                <ul className="space-y-4">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* 자재 관리 섹션 */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">자재 관리</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">효율적인 관리</h4>
                <ul className="space-y-2">
                  {[
                    "재고 손실 최소화",
                    "합리적 매입을 통한 손익 개선 효과 창출",
                    "공간 활용 최대화 및 매입 비용의 적정화 추진",
                    "악성 재고 방지"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">재고 분석</h4>
                <ul className="space-y-2">
                  {[
                    "일일 재고 분석으로 과잉 재고 방지",
                    "연간 재고 실사(2회) 및 불용 자재 검출과 조기 판매 추진",
                    "경영박사 시스템을 활용한 재고 관리 프로그램 운영 및 개선"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">창고 관리</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">체계적 관리</h4>
                <ul className="space-y-2">
                  {[
                    "창고 관리 규정화 및 선입선출 관리(DATE CODE 관리)",
                    "부품별 저장 관리(ABC 관리 기법 및 협력사별 관리 도입)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">품질 강화</h4>
                <ul className="space-y-2">
                  {[
                    "온·습도 관리 기준 준수",
                    "제품 진공포장으로 품질 보장"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}
