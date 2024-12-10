"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { items, resourceItems } from "./NavigationData";

// Reusable components
export const CategoryLink = ({ href, title, description }: { href: string, title: string, description: string }) => (
    <Link href={href} className="p-2 rounded-md hover:bg-gray-100">
        <h3 className="dark:text-white text-neutral-950 text-xs sm:text-sm md:text-base">{title}</h3>
        <p className="text-neutral-500 text-xs sm:text-sm">{description}</p>
    </Link>
);

export const ResourceLink = ({ item, onMouseEnter }: { item: any, onMouseEnter: () => void }) => (
    <Link href="#" className="group block" onMouseEnter={onMouseEnter}>
        <div className="flex items-center">
            <Image src="/icons/gtm_icon.svg" alt="icon" width="50" height="50" className="mr-3" />
            <div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-500 text-xs sm:text-sm md:text-base">{item.title}</div>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">{item.description}</p>
            </div>
        </div>
    </Link>
);

export const SupportLink = ({ title, description }: { title: string, description: string }) => (
    <span className="block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit">
        <h3 className="dark:text-white text-neutral-950 flex items-center gap-1 text-xs sm:text-sm md:text-base">
            {title}
            <svg viewBox="0 0 12 12" width="10px" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-100 dark:fill-neutral-500 fill-neutral-900">
                <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
            </svg>
        </h3>
        <p className="text-neutral-500 text-xs sm:text-sm">{description}</p>
    </span>
);

export const CompanyIntroContent = () => (
    <div className="grid grid-cols-2 gap-4 p-4 justify-center items-center mx-auto overflow-y-auto max-h-[80vh]">
        <NavigationMenuLink asChild>
            <a className="flex select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                <div className="mb-2 mt-4 text-sm sm:text-base md:text-lg font-medium">(주)대한플러스전자</div>
                <p className="text-xs sm:text-sm leading-tight text-muted-foreground">
                    Since 1997 <br />
                    With 1000+ Partners <br />
                    Over 10000+ Products <br />
                    Distribution & Development
                </p>
            </a>
        </NavigationMenuLink>
        <div className="flex flex-col gap-2 m-4">
            <CategoryLink href="#" title="인사말" description="CEO Greetings" />
            <CategoryLink href="#" title="회사 연혁" description="Company History" />
            <CategoryLink href="#" title="사업 소개" description="Business Introduction" />
        </div>
    </div>
);

export const ProductContent = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    return (
        <div className="flex overflow-y-auto mx-auto">
            <div className="w-1/5 lg:w-1/4 rounded-lg bg-gradient-to-b from-gray-200 to-gray-100 shadow-md">
                {items.map((item) => (
                    <div
                        key={item.title}
                        onMouseEnter={() => setSelectedCategory(item.title)}
                        className={`p-4 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-yellow-500 text-xs sm:text-sm md:text-base font-semibold text-gray-800 hover:text-white transition-all duration-300 ${
                            selectedCategory === item.title ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white" : ""
                        }`}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className="w-4/5 lg:w-4/5 bg-white p-4 shadow-lg rounded-lg">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {items
                        .filter((item) => item.title === selectedCategory)
                        .flatMap((item) =>
                            item.content.map((contentItem) => (
                                <div key={contentItem.title} className="space-y-4">
                                    <Link href={contentItem.link}>
                                        <h2 className="text-xs sm:text-sm font-bold hover:text-pink-500 transition-colors duration-300">{contentItem.title}</h2>
                                    </Link>
                                    <div className="space-y-2">
                                        {contentItem.children.map((child) => (
                                            <Link key={child.title} href={child.link} className="flex items-center space-x-2 rounded-md p-2 hover:bg-pink-100 transition-colors duration-300">
                                                <span className="h-6 w-6 sm:w-1 flex-shrink-0 text-pink-400"></span>
                                                <span className="text-xs text-gray-700">{child.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </div>
    );
};

export const PartnerContent = () => (
    <div className="grid grid-cols-3 gap-6 overflow-y-auto max-h-[80vh]">
        <div className="col-span-2 grid grid-cols-2 gap-6">
            {resourceItems.map((item) => (
                <ResourceLink key={item.title} item={item} onMouseEnter={() => {}} />
            ))}
        </div>
        <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4">파트너사 개요</h3>
            <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">파트너사와 함께 성장하는 대한플러스전자입니다.</p>
                <Link href="#" className="text-xs sm:text-sm text-blue-500 hover:underline">
                    Learn more →
                </Link>
            </div>
        </div>
    </div>
);

export const SupportContent = () => (
    <div className="flex items-center justify-center overflow-y-auto">
        {[
            {
                title: '문의', items: [
                    { title: 'FAQ', description: 'Frequently Asked Questions' },
                    { title: '제품 지원 문의', description: 'Product Inquiry' },
                ]
            },
            {
                title: '연락처', items: [
                    { title: '전화 및 이메일 정보', description: 'Call & E-Mail' },
                    { title: '오시는길', description: 'Guide for Directions' },
                ]
            },
            {
                title: '자료실', items: [
                    { title: '데이터 시트', description: 'Datasheet' },
                    { title: '제품 선택 가이드', description: 'Product Selection Guide' },
                ]
            },
        ].map((section, index) => (
            <div key={index} className="p-4 border-r dark:border-neutral-800">
                <div className="text-xs sm:text-sm dark:text-neutral-500 text-neutral-400 px-3">{section.title}</div>
                {section.items.map((item, itemIndex) => (
                    <SupportLink key={itemIndex} title={item.title} description={item.description} />
                ))}
            </div>
        ))}
    </div>
);