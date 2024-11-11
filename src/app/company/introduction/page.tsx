'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SquareUser } from 'lucide-react';


export default function Introduction() {
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
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">인사말</span>
                </div>
                </li>
            </ol>
            </nav>


            <div className="flex w-full flex-col h-auto md:mx-4 md:flex-row items-center mb-8 gap-4 md:divide-x-2">
                <div className="flex grow flex-row items-center divide-x-2">
                    <div className="flex grow-0 items-center justify-center">
                        <SquareUser className="w-16 h-auto md:m-8 m-4" />
                    </div>
                    <div className="flex grow flex-col px-4">
                        <h1 className="text-3xl font-bold text-gray-900">CEO 인사말</h1>
                        <p className="text-lg text-gray-900 my-4">대한플러스전자㈜는 28년간 전자부품 유통 분야에서 고객과 함께 성장해왔습니다.</p>
                        <br/>
                        <div className='flex flex-wrap gap-2'>
                            <Badge variant="outline" className='w-fit whitespace-nowrap'>#CEO 인사말</Badge>
                            <Badge variant="outline" className='w-fit whitespace-nowrap'>#믿음</Badge>
                            <Badge variant="outline"className='w-fit whitespace-nowrap'>#신뢰</Badge>
                            <Badge variant="outline"className='w-fit whitespace-nowrap'>#리더쉽</Badge>
                            <Badge variant="outline"className='w-fit whitespace-nowrap'>#고객우선</Badge>
                        </div>
                        
                    </div>
                </div>

                <div className="flex grow my-8 p-4 md:flex-col flex-row items-center md:gap-2 gap-4">
                    

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex flex-grow items-center gap-2 w-full">
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mx-4">
                            <DropdownMenuLabel>정렬 순서 선택</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup >
                                <DropdownMenuRadioItem value="descending">최신순</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="ascending">오래된순</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="outline"
                        onClick={()=>{}}
                        className="flex items-center gap-2 w-full"
                    >
                        <Download className="w-4 h-4" />
                        엑셀 다운로드
                    </Button>
                </div>
            </div>



            <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">대표이사 <strong>김영구</strong></h2>
                        <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                        <p className="text-base">고객의 성공이</p>
                        <p> 우리의 성공이다</p>
                    </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <p className="leading-relaxed text-lg mb-4">안녕하세요. 저희 회사를 방문해 주신 여러분께 진심으로 감사드립니다.

                        저희 회사는 고객 여러분의 필요와 기대에 부응하는 고품질 전자 부품을 제공하기 위해 최선을 다하고 있습니다. 끊임없는 혁신과 도전을 통해 전자 부품 산업의 선두 주자로 자리매김하고 있으며, 항상 고객의 목소리에 귀 기울여 여러분의 성공적인 비즈니스를 지원하고 있습니다.

                        저희는 글로벌 시장에서의 경쟁력을 갖추고, 세계 각지의 고객들에게 최상의 솔루션을 제공하고자 합니다. 국제적인 비전과 현지화된 전략을 통해 고객 여러분과 함께 성장해 나가겠습니다. 또한, 저희 회사는 단순한 전자 부품 공급을 넘어, 사회적 책임을 다하는 기업이 되기 위해 노력하고 있습니다. 지속 가능한 발전과 환경 보호를 위해 최선을 다하며, 더 나은 사회를 만드는 데 기여하고자 합니다.

                        앞으로도 지속적인 발전과 성장을 위해 노력할 것을 약속드리며, 여러분의 변함없는 신뢰와 성원을 부탁드립니다. 많은 관심과 격려를 부탁드립니다. 감사합니다.

                        대표이사 김영구</p>
                    <a className="text-green-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
            

        </main>

    );
}