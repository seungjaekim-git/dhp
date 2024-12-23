import { Building2, Target } from "lucide-react";
import AboutLayout from "../AboutLayout";
import Image from "next/image";

export default function GreetingPage() {
  return (
    <AboutLayout
      title="CEO 인사말"
      icon={<Target className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
        { label: "CEO 인사말", href: "/about/greeting" },
      ]}
      description="대한플러스전자(주)의 비전과 가치를 소개합니다."
      badges={[
        {
          text: "혁신",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          hoverColor: "hover:bg-blue-200"
        },
        {
          text: "신뢰",
          bgColor: "bg-sky-100", 
          textColor: "text-sky-700",
          hoverColor: "hover:bg-sky-200"
        }
      ]}
    >
      <div className="space-y-12">
        {/* CEO 인사말 섹션 */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/ceo.jpg"
                alt="CEO 프로필"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-gray-900">대표이사 홍길동</p>
              <p className="text-sm text-gray-500">대한플러스전자(주)</p>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              "혁신적인 기술로 더 나은 미래를 만들어갑니다"
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                안녕하십니까, 대한플러스전자 대표이사 홍길동입니다.
                저희 대한플러스전자를 방문해 주신 여러분을 진심으로 환영합니다.
              </p>
              <p>
                1993년 창립 이래로, 저희는 LED 드라이버 IC 및 전자부품 분야에서
                끊임없는 혁신과 도전을 통해 글로벌 시장을 선도하는 기업으로 성장해왔습니다.
              </p>
              <p>
                고객의 신뢰를 바탕으로 지속적인 연구개발과 품질 향상에 매진하여
                세계적인 기술 경쟁력을 확보하고 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 비전 섹션 */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">기업 비전</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "기술 혁신",
                description: "지속적인 R&D 투자로 미래 기술 선도",
                color: "from-blue-500 to-sky-400"
              },
              {
                title: "글로벌 리더십",
                description: "세계 시장을 선도하는 전자부품 기업",
                color: "from-indigo-500 to-blue-400"
              },
              {
                title: "지속가능 경영",
                description: "환경과 사회적 가치를 고려한 성장",
                color: "from-sky-500 to-blue-400"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${item.color}`} />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AboutLayout>
  );
}
