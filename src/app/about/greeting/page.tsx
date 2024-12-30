import { Target, Heart, Leaf, CheckCircle, Clock } from "lucide-react";
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
          hoverColor: "hover:bg-blue-200",
        },
        {
          text: "신뢰",
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          hoverColor: "hover:bg-sky-200",
        },
      ]}
    >
      <div className="space-y-24 px-8 lg:px-16">
        {/* CEO 인사말 섹션 */}
        <section className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/ceo.jpg"
                alt="CEO 프로필"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-900 mb-2">대표이사 김영구</p>
              <p className="text-sm text-gray-500">대한플러스전자(주)</p>
            </div>
          </div>
          <div className="md:w-2/3 space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              변화에 앞서고, 신뢰를 더하다 – 고객과 함께 성장하는 대한플러스전자(주)
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
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
            </div>
          </div>
        </section>

        {/* 핵심 가치 섹션 */}
        <section className="relative py-16 bg-gradient-to-r from-blue-50 via-white to-gray-100 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            우리의 핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold text-gray-800">고객 중심</h3>
              </div>
              <p className="text-gray-600">고객 만족을 최우선으로 하며 맞춤형 솔루션을 제공합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">사회적 책임</h3>
              </div>
              <p className="text-gray-600">환경을 생각하며 지속 가능한 미래를 만들어갑니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">품질 경영</h3>
              </div>
              <p className="text-gray-600">엄격한 품질 관리로 최고의 제품을 제공합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-800">정확한 납기</h3>
              </div>
              <p className="text-gray-600">철저한 공급망 관리로 정시 납기를 보장합니다.</p>
            </div>
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}
