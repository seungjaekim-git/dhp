'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

export default function Business() {
    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            {/* Breadcrumb */}
            <nav className="flex px-5 py-4 my-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">회사소개</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">주요사업</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="flex w-full flex-col h-auto md:mx-4 md:flex-row items-center mb-8 gap-4 md:divide-x-2">
                <div className="flex grow flex-row items-center divide-x-2">
                    <div className="flex grow-0 items-center justify-center">
                        <Briefcase className="w-16 h-auto md:m-8 m-4" />
                    </div>
                    <div className="flex grow flex-col px-4">
                        <h1 className="text-3xl font-bold text-gray-900">주요사업</h1>
                        <p className="text-lg text-gray-900 my-4">대한플러스전자㈜의 주요 사업 영역을 소개합니다.</p>
                        <div className='flex flex-wrap gap-2'>
                            <Badge variant="outline" className='w-fit whitespace-nowrap'>#LED Driver IC</Badge>
                            <Badge variant="outline" className='w-fit whitespace-nowrap'>#전자부품 유통</Badge>
                            <Badge variant="outline" className='w-fit whitespace-nowrap'>#LED 모듈 개발</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src="/images/led-driver.jpg" alt="LED Driver IC" className="object-cover w-full h-full opacity-80"/>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">LED Driver IC 사업</h3>
                        <p className="text-gray-600 mb-4">
                            세계적인 LED Driver IC 제조사인 Macroblock사의 국내 공식 대리점으로서,
                            고품질의 LED Driver IC를 국내 시장에 공급하고 있습니다.
                        </p>
                        <Button variant="outline" className="w-full">자세히 보기</Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src="/images/electronic-parts.jpg" alt="전자부품" className="object-cover w-full h-full opacity-80"/>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">전자부품 유통사업</h3>
                        <p className="text-gray-600 mb-4">
                            28년간의 전자부품 유통 노하우를 바탕으로, 국내외 유수 제조사의 
                            고품질 전자부품을 안정적으로 공급하고 있습니다.
                        </p>
                        <Button variant="outline" className="w-full">자세히 보기</Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src="/images/led-module.jpg" alt="LED 모듈" className="object-cover w-full h-full opacity-80"/>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">LED 모듈 개발사업</h3>
                        <p className="text-gray-600 mb-4">
                            고객사의 요구사항에 맞춘 맞춤형 LED 모듈을 개발하고,
                            최적화된 솔루션을 제공하고 있습니다.
                        </p>
                        <Button variant="outline" className="w-full">자세히 보기</Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src="/images/technical-support.jpg" alt="기술지원" className="object-cover w-full h-full opacity-80"/>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">기술지원 서비스</h3>
                        <p className="text-gray-600 mb-4">
                            전문 엔지니어들의 기술지원을 통해 고객사의 제품 개발과
                            생산을 지원하고 있습니다.
                        </p>
                        <Button variant="outline" className="w-full">자세히 보기</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
