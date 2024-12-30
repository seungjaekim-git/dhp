"use client";

import Image from "next/image"
import Link from "next/link";
import { BriefcaseIcon, SettingsIcon, HeartIcon, LightbulbIcon, MountainSnow, FlowerIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { useMemo, useState } from "react";

// 파트너사 데이터
const PARTNER_DATA = [
    {
        id: "macroblock",
        title: "Macroblock",
        categories: ["LED 드라이버 IC", "전원관리 IC","자동차 인증 부품"],
        logo: "/icons/macroblock-logo.png",
        country: "대만",
        type: "대기업",
        subtitle: "드라이버 IC 부문 세계 1위 기업",
        description: ["LED Driver IC 전문 제조사", "디스플레이/조명/자동차 전장용", "AEC-Q100 인증 보유", "1999년 설립"],
        href: "/partners/macroblock"
    },
    {
        id: "zowie",
        title: "Zowie",
        categories: ["다이오드", "자동차 인증 부품"],
        logo: "/icons/zowie-logo.png",
        country: "대만",
        type: "중소기업",
        subtitle: "고성능 정류 다이오드 전문 기업",
        description: ["다이오드 전문 제조", "TVS/쇼트키/정류기", "다양한 특허 및 인증 보유", "40년+ 기술력"],
        href: "/partners/zowie"
    },
    {
        id: "llt",
        title: "LLT",
        categories: ["커넥터&케이블"],
        logo: "/icons/llt-logo.png",
        country: "중국",
        type: "대기업",
        subtitle: "가격, 성능, 신뢰성 보장하는 기업",
        description: ["커넥터/케이블 어셈블리", "산업용 커넥터 전문", "ISO 9001 인증", "맞춤형 솔루션"],
        href: "/partners/llt"
    },
    {
        id: "morethanall",
        title: "Morethanall",
        categories: ["커넥터&케이블"],
        logo: "/icons/morethanall-logo.png",
        country: "대만",
        type: "중소기업",
        subtitle: "보드-보드/FPC 커넥터",
        description: ["보드-보드/FPC 커넥터", "자체 R&D 센터 보유", "맞춤형 설계 가능", "25년+ 경험"],
        href: "/partners/morethanall"
    },
    {
        id: "kube",
        title: "Kube Electronics",
        categories: ["센서"],
        logo: "/icons/kube-logo.png",
        country: "스위스",
        type: "가족기업",
        subtitle: "센서 전문 기업",
        description: ["센서 전문 기업", "전문 제조사", "고신뢰성 제품", "생산"],
        href: "/partners/kube"
    },
    {
        id: "xlsemi",
        title: "XLSEMI",
        categories: ["전원관리 IC", "LED 드라이버 IC"],
        logo: "/icons/xlsemi-logo.png",
        country: "중국",
        type: "중소기업",
        subtitle: "급성장중인 전원관리 IC 전문 기업",
        description: ["다양한 제품 스펙트럼", "설립 10년 이상", "급속 성장중", "전문 제조사"],
        href: "/partners/xlsemi"
    },
    {
        id: "powtech",
        title: "Powtech",
        categories: ["전원관리 IC", "LED 드라이버 IC", "자동차 인증 부품"],
        logo: "/icons/powtech-logo.png",
        country: "한국",
        type: "대기업",
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업",
        description: ["자동차 전장 전문", "글로벌 인증 보유", "품질 관리 시스템", "기술 지원"],
        href: "/partners/powtech"
    },
    {
        id: "gtm",
        title: "GTM",
        categories: ["전원관리 IC" ],
        logo: "/logos/gtm-logo.png",
        country: "한국",
        type: "대기업",
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업",
        description: ["전원관리 IC 및 전장용 부품 전문 기업", "글로벌 인증 보유", "LDO 및 MOSFET 전문 제조사"],
        href: "/partners/gtm"
    }
];

interface PartnerCardProps {
    logo: string;
    title: string;
    categories: string[];
    country: string;
    type: string;
    subtitle: string;
    description: string[];
    href: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ logo, title, categories, country, type, subtitle, description, href }) => (
    <Link href={href}>
        <div className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-blue-300/5 rounded-xl" />
            <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLinkIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <Image 
                        src={logo} 
                        alt={`${title} 로고`} 
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                    <div>
                        <h3 className="font-bold text-xl tracking-tight">{title}</h3>
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-gray-50 rounded-full ">{country}</span>
                            <span className="text-xs px-2 py-1 bg-gray-50 rounded-full ">{type}</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-[1px] bg-gray-100" />
                    <div className="flex flex-wrap gap-2">
                        <p className="text-sm font-semibold text-gray-600">{subtitle}</p>
                    </div>
                    <ul className="space-y-1">
                        {description.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-gradient-to-t from-sky-400 to-blue-300 text-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-semibold">자세히 알아보기</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
            </div>
        </div>
    </Link>
);

// 파트너 섹션 컴포넌트
export default function PartnersSection() {
    const tabs = [
        { title: "전체", icon: BriefcaseIcon },
        { title: "LED 드라이버 IC", icon: LightbulbIcon },
        { title: "다이오드", icon: SettingsIcon },
        { title: "전원관리 IC", icon: HeartIcon },
        { title: "커넥터&케이블", icon: FlowerIcon },
        { title: "수동 소자", icon: MountainSnow },
        { title: "센서", icon: FlowerIcon },
        { title: "자동차 인증 부품", icon: MountainSnow }
    ];

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const filteredPartners = useMemo(() => {
        if (selectedTab === 0) return PARTNER_DATA;
        
        const selectedCategory = tabs[selectedTab].title;
        return PARTNER_DATA.filter(partner => partner.categories.includes(selectedCategory));
    }, [selectedTab]);

    return (
        <div className="container py-12 lg:py-12 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* 왼쪽 컬럼 - 고정 위치 */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <Link href="/partners" className="block [perspective:800px]">
                        <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50/80 to-white rounded-3xl border border-gray-100/80 transition-all duration-300 ease-in-out hover:[transform:rotate3d(0.5,1,0,8deg)]">
                            <div className="space-y-8">
                                <div className="space-y-4 hover:-translate-y-1 transition-transform duration-200">
                                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                                        파트너사
                                    </h1>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                                    <p className="text-lg font-medium text-gray-700">
                                        &quot;글로벌 파트너십으로 함께 신뢰를 만들어 가고 있습니다.&quot;
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-gray-600 hover:-translate-y-1 transition-transform duration-200">
                                        <strong className="text-gray-900 font-semibold">대한플러스전자(주)</strong>는 전 세계 최고의 반도체 부품 제조사들과의 파트너십을 통해 고객에게 최고의 품질과 신뢰성을 제공하고 있습니다.
                                    </p>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            글로벌 제조사와의 직접 파트너십
                                        </li>
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            엄격한 품질 관리 시스템
                                        </li>
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            신속한 기술 지원 서비스
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="group flex justify-center items-center w-full mt-12 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1 transition-all duration-200">
                                파트너사 더 알아보기
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.title}
                                onClick={() => setSelectedTab(index)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg
                                    transition-all duration-300 text-sm font-medium
                                    ${selectedTab === index 
                                        ? 'bg-black text-white shadow-lg scale-105' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                `}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPartners.map(partner => (
                            <PartnerCard
                                key={partner.id}
                                logo={partner.logo}
                                title={partner.title}
                                categories={partner.categories}
                                country={partner.country}
                                type={partner.type}
                                subtitle={partner.subtitle}
                                description={partner.description}
                                href={partner.href}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
