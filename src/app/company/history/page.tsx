'use client';

import { useState } from 'react';
import timelineData from '../timelineData.json';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Timeline } from '@/components/ui/timeline';
import { Separator } from "@/components/ui/separator"
import { History } from 'lucide-react';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

export default function CompanyHistory() {
    const [viewMode, setViewMode] = useState<string>("detailed");
    const [sortMode, setSortMode] = useState<string>("descending");

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(timelineData.map(item => ({
            연도: item.title,
            내용: item.content.description
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "회사연혁");
        XLSX.writeFile(wb, "대한플러스전자_회사연혁.xlsx");
    };

    const sortedTimelineData = [...timelineData].sort((a, b) => {
        const aYear = parseInt(a.title.split('.')[0]);
        const bYear = parseInt(b.title.split('.')[0]);
        return sortMode === "descending" ? bYear - aYear : aYear - bYear;
    });

    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            <div className="flex w-full flex-col h-auto md:mx-4 md:flex-row items-center mb-8 gap-4 md:divide-x-2">
                <div className="flex grow flex-row items-center divide-x-2">
                    <div className="flex grow-0 items-center justify-center">
                        <History className="w-16 h-auto md:m-8 m-4" />
                    </div>
                    <div className="flex grow flex-col px-4">
                        <h1 className="text-3xl font-bold text-gray-900">회사연혁</h1>
                        <h2 className="text-lg text-gray-900">대한플러스전자㈜는 28년간 전자부품 유통 분야에서 고객과 함께 성장해왔습니다.</h2>
                        <br/>
                        
                    </div>
                </div>

                <div className="flex grow md:flex-col flex-row items-center md:gap-2 gap-4 px-4">
                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 w-full">
                                <ChevronDown className="w-4 h-4" />
                                {viewMode === "detailed" ? "자세히 보기" : viewMode === "simple" ? "간단히 보기" : "보기 옵션"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mx-4">
                            <DropdownMenuLabel>보기 모드 선택</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                                <DropdownMenuRadioItem value="detailed">자세히 보기</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="simple">간단히 보기</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex flex-grow items-center gap-2 w-full">
                                <ChevronDown className="w-4 h-4" />
                                {sortMode === "descending" ? "최신순" : "오래된순"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mx-4">
                            <DropdownMenuLabel>정렬 순서 선택</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={sortMode} onValueChange={setSortMode}>
                                <DropdownMenuRadioItem value="descending">최신순</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="ascending">오래된순</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="outline"
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 w-full"
                    >
                        <Download className="w-4 h-4" />
                        엑셀 다운로드
                    </Button>
                </div>
            </div>

            {viewMode === "detailed" ? (
                <Timeline
                    data={sortedTimelineData.map(item => ({
                        title: item.title,
                        content: (
                            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.title.includes('LED') && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">LED</span>
                                    )}
                                    {item.content.description.includes('Electronics') && (
                                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Electronics</span>
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                    {item.content.description}
                                </p>
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={`${item.title} 이미지`}
                                        className="mt-4 w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <div className="mt-4 flex flex-col gap-2">
                                    {item.content.description.includes('참석') && (
                                        <a
                                            href="#"
                                            className="inline-flex items-center text-sm text-primary hover:underline"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            관련 뉴스 보기
                                        </a>
                                    )}
                                    {item.content.description.includes('대리점') && (
                                        <div className="mt-2 grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">매출액</p>
                                                <p className="text-sm font-semibold">10억</p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">직원수</p>
                                                <p className="text-sm font-semibold">50명</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }))}
                />
            ) : (
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {sortedTimelineData.map((item, index) => (
                        <li key={index} className="mb-10 ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.title}</time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.content.description.split('\n')[0]}</h3>
                            {item.content.description.split('\n').length > 1 && (
                                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {item.content.description.split('\n').slice(1).join('\n')}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>
            )}
        </main>
    );
}
