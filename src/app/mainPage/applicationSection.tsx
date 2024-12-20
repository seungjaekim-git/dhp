"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ApplicationsSection 컴포넌트
export default function ApplicationsSection({ applications }) {
    return (
        <div className="container py-12 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* 왼쪽 컬럼 */}
                <div className="order-2 lg:order-1 lg:col-span-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        {applications.map((application) => (
                            <Link key={application.title} href={application.link}>
                                <div className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
                                    {/* 배경 호버 효과 */}
                                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-blue-50 rounded-xl" />

                                    <div className="relative space-y-4">
                                        {/* 이미지와 뱃지 */}
                                        <div className="flex justify-between items-start">
                                            <Image
                                                src={application.thumbnail}
                                                alt={application.title}
                                                width={160}
                                                height={120}
                                                className="rounded-lg shadow-md group-hover:shadow-lg"
                                            />
                                            <div className="flex flex-col gap-2">
                                                {application.badges?.map((badge, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 적용 분야 타이틀 및 설명 */}
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">{application.title}</h3>
                                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                                {application.description}
                                            </p>
                                            <div className="mt-2 text-blue-600 font-medium text-sm">
                                                {application.highlight}
                                            </div>
                                        </div>

                                        {/* 주요 특징 및 CTA */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                {application.feature}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-blue-600">
                                                자세히 보기
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 오른쪽 컬럼 - 고정 위치 */}
                <div className="order-1 lg:order-2 lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <Link href="/applications" className="block [perspective:800px]">
                        <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50/80 to-white rounded-3xl border border-gray-100/80 transition-all duration-300 ease-in-out hover:[transform:rotate3d(-0.5,-1,0,8deg)]">
                            <div className="space-y-8">
                                <div className="space-y-4 hover:-translate-y-1 transition-transform duration-200">
                                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                                        상황별 맞춤 제품
                                    </h1>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                                    <p className="text-base font-medium text-gray-700">
                                        &quot;귀사의 요구에 딱 맞춘 맞춤형 제품 라인업&quot;
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-gray-600 hover:-translate-y-1 transition-transform duration-200">
                                        <strong className="text-gray-900 font-semibold">대한플러스전자(주)</strong>는
                                        LED Driver IC 분야의 전문성을 바탕으로 다양한 산업 분야에 최적화된 솔루션을 제공합니다.
                                    </p>
                                </div>
                            </div>
                            <div className="group flex justify-center items-center w-full mt-12 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1 transition-all duration-200">
                                전체 제품 카테고리 보기
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}