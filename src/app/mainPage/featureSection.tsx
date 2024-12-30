"use client";
import {
    ArrowRightIcon,
    BuildingIcon,
    HandshakeIcon, 
    CircuitBoardIcon,
    TargetIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
    {
        icon: <BuildingIcon className="w-8 h-8" />,
        title: "고객 여러분들과 함께 성장하고 싶습니다.",
        description: "대한플러스전자(주)는 고객사와의 신뢰를 바탕으로 함께 성장하는 동반자가 되고자 합니다. 여러분의 성공을 위해 최선을 다하겠습니다.",
        link: "/about/greeting",
        linkText: "CEO 인사말 바로가기",
    },
    {
        icon: <HandshakeIcon className="w-8 h-8" />,
        title: "성장 동반 협력 체계",
        description: "대한플러스전자(주)는 기업과 고객에게 성장기회가 될 수 있게 최적의 전자제품 솔루션을 제공하고 공유하는 비즈니스 협약을 구축하여 고객과 함께 성장해왔습니다.",
        link: "/partners", 
        linkText: "파트너사 바로가기",
    },
    {
        icon: <CircuitBoardIcon className="w-8 h-8" />,
        title: "광범위한 제품 라인업",
        description: "LED Driver IC, Diode, Sensor부터 Connector & Cable, 자동차 부품까지 다양한 전자 부품을 공급합니다. 국내외 유수 제조사와의 협력을 통해 안정적인 공급망을 구축했습니다.",
        link: "/products",
        linkText: "제품 카테고리 바로가기",
    },
    {
        icon: <TargetIcon className="w-8 h-8" />,
        title: "최적의 상품 제안",
        description: "고객의 니즈를 정확히 파악하여 최적화된 제품을 제안합니다. 전문 컨설팅을 통해 비용 효율적이고 신뢰할 수 있는 솔루션을 제공합니다.",
        link: "/support",
        linkText: "고객 지원 바로가기",
    }
];

export default function FeatureSection() {
    return (
        <div className="container mx-auto px-4 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                {/* 왼쪽 컬럼 - 고정 위치 */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <Link href="/about" className="block [perspective:800px]">
                        <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50/80 to-white rounded-3xl border border-gray-100/80 transition-all duration-300 ease-in-out hover:[transform:rotate3d(0.5,1,0,8deg)]">
                            <div className="space-y-8">
                                <div className="space-y-4 hover:-translate-y-1 transition-transform duration-200">
                                    <Image src="/logos/dhp-logo.png" alt="대한플러스전자(주)" width={100} height={100} className="w-full h-full object-cover"  />
                                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                                        대한플러스전자(주)
                                    </h1>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                                    <p className="text-base font-medium text-gray-700">
                                        &quot;고객의 성공이 곧 우리의 성공입니다&quot;
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-gray-600 hover:-translate-y-1 transition-transform duration-200">
                                        <strong className="text-gray-900 font-semibold">대한플러스전자(주)</strong>는 고객의 신뢰와 만족을 위해 항상 노력하는 <strong className="text-gray-900 font-semibold underline underline-offset-4">LED 드라이버 IC 전문 유통기업</strong>입니다.
                                    </p>
                                    <ul className="space-y-3 text-xs text-gray-600">
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            품질과 신뢰성 보장
                                        </li>
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            맞춤형 솔루션 제공
                                        </li>
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            경쟁력 있는 가격
                                        </li>
                                        <li className="flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm" />
                                            납기 준수 및 안정적인 재고운영
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="group flex justify-center items-center w-full mt-12 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1 transition-all duration-200">
                                대한플러스전자(주)를 소개합니다
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 오른쪽 컬럼 - 카드 레이아웃 */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-3xl">
                    {features.map((feature, index) => (
                        <Link 
                            href={feature.link}
                            key={index}
                            className="group relative block bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border-3 border-blue-100 outline outline-2 outline-transparent overflow-visible transition-all duration-300 hover:shadow-xl hover:outline-blue-200 hover:-translate-y-1 hover:z-10"
                        >
                            <div className="p-8 h-full flex flex-col items-center text-center">
                                <span className="flex-shrink-0 inline-flex justify-center items-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                                <div className="mt-auto inline-flex text-balance items-center gap-2 text-blue-600 font-medium border-b-2 border-transparent hover:border-blue-800 transition-all">
                                    {feature.linkText}
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
