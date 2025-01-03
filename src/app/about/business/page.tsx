import { Building2, PackageCheck, Handshake, Cpu } from "lucide-react";
import AboutLayout from "../AboutLayout";
import { BusinessAccordion } from "./BusinessAccordion";
import { ApplicationsTabs } from "./ApplicationsTabs";
import Image from "next/image";

export default function BusinessPage() {
  const businessAreas = [
    {
      title: "글로벌 제조사 파트너십",
      icon: <Handshake className="w-5 h-5 text-blue-500" />,
      image: "/images/partnership.jpg",
      badge: "글로벌 네트워크",
      description: "세계적인 LED 드라이버 IC 제조사들과의 견고한 파트너십을 통해 안정적인 공급망을 구축하고 있습니다.",
      items: [
        "Macroblock, XLSEMI 등 글로벌 제조사와의 독점 대리점 계약",
        "정품 인증 및 품질 보증 시스템 구축",
        "선제적 재고 확보를 통한 안정적 공급망 운영",
        "기술 교류 및 신제품 개발 협력",
        "글로벌 마케팅 지원",
      ],
    },
    {
      title: "물류 및 품질 관리",
      icon: <PackageCheck className="w-5 h-5 text-blue-500" />,
      image: "/images/logistics.jpg",
      badge: "품질 보증",
      description: "최첨단 물류 시스템과 엄격한 품질 관리 프로세스를 통해 고객사에 최상의 제품을 제공합니다.",
      items: [
        "온습도 관리 기준에 따른 체계적 보관",
        "제품 진공포장 및 DATE CODE 관리",
        "ABC 관리 기법을 통한 효율적 재고 운영",
        "실시간 재고 모니터링 시스템",
        "품질 검사 인증서 발급",
      ],
    },
    {
      title: "기술 지원 및 개발",
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      image: "/images/tech-support.jpg",
      badge: "기술 혁신",
      description: "전문 엔지니어팀의 기술 지원으로 고객사의 제품 개발과 성능 최적화를 지원합니다.",
      items: [
        "LED 드라이버 IC 기술 지원",
        "어플리케이션 최적화 컨설팅",
        "신제품 개발 및 적용 지원",
        "맞춤형 솔루션 설계",
        "기술 교육 프로그램 운영",
      ],
    },
  ];

  const applications = [
    {
      title: "가전제품",
      description: "L사의 프리미엄 가전제품에 적용되는 고효율 LED 드라이버 IC 솔루션",
      images: [
        {
          name: "에어컨",
          src: "/images/application/aircon.jpg",
          description: "스마트 에어컨의 디스플레이 및 조명 제어 시스템",
        },
        {
          name: "냉장고",
          src: "/images/application/fridge.jpg",
          description: "프리미엄 냉장고의 LED 디스플레이 및 내부 조명",
        },
      ],
    },
    {
      title: "디스플레이",
      description: "대형 디스플레이 및 전광판용 고성능 LED 드라이버 솔루션",
      images: [
        {
          name: "전광판",
          src: "/images/application/signage.jpg",
          description: "대형 옥외 전광판 디스플레이 시스템",
        },
        {
          name: "상업용 디스플레이",
          src: "/images/application/commercial.jpg",
          description: "실내 상업용 대형 LED 디스플레이",
        },
      ],
    },
    {
      title: "자동차 조명",
      description: "자동차 조명 시스템을 위한 고신뢰성 LED 드라이버 솔루션",
      images: [
        {
          name: "헤드라이트",
          src: "/images/application/headlight.jpg",
          description: "자동차 LED 헤드라이트 시스템",
        },
        {
          name: "실내조명",
          src: "/images/application/interior.jpg",
          description: "자동차 실내 무드등 및 대시보드 조명",
        },
      ],
    },
  ];

  return (
    <AboutLayout
      title="사업 개요"
      icon={<Building2 className="w-5 h-5" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "회사소개", href: "/about" },
        { label: "사업 개요", href: "/about/business" },
      ]}
      description="대한플러스전자(주)의 사업 영역과 운영 방식을 소개합니다."
      badges={[
        {
          text: "LED 드라이버 IC 전문",
          bgColor: "bg-blue-500",
          textColor: "text-white",
          hoverColor: "hover:bg-blue-600",
        },
        {
          text: "전자부품 유통",
          bgColor: "bg-green-500",
          textColor: "text-white",
          hoverColor: "hover:bg-green-600",
        },
      ]}
    >
      <div className="space-y-12 max-w-7xl mx-auto px-4">
        {/* 비즈니스 소개 섹션 */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-lg">
          {/* 배경 이미지 */}
          <div className="absolute inset-0">
            <Image
              src="/images/business-hero.webp"
              alt="DHP Business Illustration"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
              priority
            />
          </div>
          {/* 텍스트 콘텐츠 */}
          <div className="relative z-10 text-center text-white space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              LED Driver IC 전문 유통기업
            </h1>
            <p className="text-lg md:text-xl">
              대한플러스전자(주)의 사업 영역과 성과를 확인하세요.
            </p>
          </div>
        </section>

        {/* 사업 영역 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border rounded-xl p-4">
          <div className="space-y-4 col-span-1">
            <h2 className="text-3xl font-semibold">사업 영역</h2>
            <div className="h-1 w-16 bg-blue-500 rounded-full" />
            <p className="text-sm text-gray-500 leading-relaxed">
              대한플러스전자는 고객사의 니즈에 맞는 최적의 솔루션을 제공합니다.
            </p>
          </div>
          <div className="col-span-2">
            <BusinessAccordion businessAreas={businessAreas} />
          </div>
        </section>

        {/* 어플리케이션 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border rounded-xl p-4">
          <div className="space-y-4 col-span-1">
            <h2 className="text-3xl font-semibold">적용 사례</h2>
            <div className="h-1 w-16 bg-blue-500 rounded-full" />

            <p className="text-sm text-gray-500 leading-relaxed">
              우리의 기술이 적용된 다양한 제품들을 만나보세요.
            </p>
          </div>
          <div className="col-span-2">
            <ApplicationsTabs applications={applications} />
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}
