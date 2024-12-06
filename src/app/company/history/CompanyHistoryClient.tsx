'use client';

import { useState } from "react";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TimelineDetailed from "./TimelineDetailed";
import TimelineSimple from "./TimelineSimple";
import DropdownFilters from "./DropdownFilters";
import * as XLSX from "xlsx";

export default function CompanyHistoryClient({ timelineData }: { timelineData: any[] }) {
    const [viewMode, setViewMode] = useState<string>("detailed");
    const [sortMode, setSortMode] = useState<string>("descending");

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            timelineData.map((item) => ({
                연도: item.title,
                내용: item.content.description,
            }))
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "회사연혁");
        XLSX.writeFile(wb, "대한플러스전자_회사연혁.xlsx");
    };

    const sortedTimelineData = [...timelineData].sort((a, b) => {
        const aYear = parseInt(a.title.split(".")[0]);
        const bYear = parseInt(b.title.split(".")[0]);
        return sortMode === "descending" ? bYear - aYear : aYear - bYear;
    });

    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            {/* Breadcrumb */}
            <nav
                className="flex px-5 py-4 my-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Breadcrumb"
            >
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a
                            href="#"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 1 1 1 1v4a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <a
                                href="#"
                                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                            >
                                회사소개
                            </a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                회사연혁
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* 회사 소개 */}
            <div className="flex w-full flex-col h-auto md:mx-4 md:flex-row items-center mb-8 gap-4 md:divide-x-2">
                <div className="flex grow flex-row items-center divide-x-2">
                    <div className="flex grow-0 items-center justify-center">
                        <History className="w-16 h-auto md:m-8 m-4" />
                    </div>
                    <div className="flex grow flex-col px-4">
                        <h1 className="text-3xl font-bold text-gray-900">회사연혁</h1>
                        <p className="text-lg text-gray-900 my-4">
                            대한플러스전자㈜는 28년간 전자부품 유통 분야에서 고객과 함께 성장해왔습니다.
                        </p>
                        <br />
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="w-fit whitespace-nowrap">
                                #창사 28년
                            </Badge>
                            <Badge variant="outline" className="w-fit whitespace-nowrap">
                                #전자부품 유통
                            </Badge>
                            <Badge variant="outline" className="w-fit whitespace-nowrap">
                                #LED Driver IC 전문
                            </Badge>
                            <Badge variant="outline" className="w-fit whitespace-nowrap">
                                #Macroblock
                            </Badge>
                            <Badge variant="outline" className="w-fit whitespace-nowrap">
                                #LED 모듈 개발
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <DropdownFilters
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortMode={sortMode}
                setSortMode={setSortMode}
            />

            {viewMode === "detailed" ? (
                <TimelineDetailed timelineData={sortedTimelineData} />
            ) : (
                <TimelineSimple timelineData={sortedTimelineData} />
            )}

            <button onClick={handleExportExcel} className="mt-4 btn btn-outline">
                엑셀 다운로드
            </button>
        </main>
    );
}
