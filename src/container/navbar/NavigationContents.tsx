"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";


const items = [
    {
      title: "LED Driver IC",
      content: {
        "LED Driver IC": [
          { title: "Tailwind CSS", icon: "tailwind" },
          { title: "Bootstrap", icon: "bootstrap" },
          { title: "Angular", icon: "angular" },
          { title: "React", icon: "react" },
          { title: "Vuejs", icon: "vue" },
          { title: "React Native", icon: "react-native" },
          { title: "Svelte", icon: "svelte" },
        ],
      },
    },
    {
      title: "전원관리 IC",
      content: {
        "DC DC ": [
          { title: "Tailwind CSS", icon: "tailwind" },
          { title: "Bootstrap", icon: "bootstrap" },
          { title: "Angular", icon: "angular" },
          { title: "React", icon: "react" },
          { title: "Vuejs", icon: "vue" },
          { title: "React Native", icon: "react-native" },
          { title: "Svelte", icon: "svelte" },
        ],
      },
    },
    {
      title: "다이오드",
      content: {
        "제너 다이오드": [
          { title: "Tailwind CSS", icon: "tailwind" },
        ],
        "정류 다이오드": [
          { title: "Tailwind CSS", icon: "tailwind" },
          { title: "Bootstrap", icon: "bootstrap" },
          { title: "Angular", icon: "angular" },
          { title: "React", icon: "react" },
          { title: "Vuejs", icon: "vue" },
        ],
        "쇼트키 다이오드": [
          { title: "Tailwind CSS", icon: "tailwind" },
          { title: "Bootstrap", icon: "bootstrap" },
          { title: "Angular", icon: "angular" },
          { title: "React", icon: "react" },
  
        ],
  
      },
  
    },
    {
      title: "센서",
      content: {
        "센서": [
          { title: "Tailwind CSS", icon: "tailwind" },
          { title: "Bootstrap", icon: "bootstrap" },
          { title: "Angular", icon: "angular" },
          { title: "React", icon: "react" },
          { title: "Vuejs", icon: "vue" },
          { title: "React Native", icon: "react-native" },
          { title: "Svelte", icon: "svelte" },
        ],
      },
    },
    // ... other menu items
  ];
  
  
  export const resourceItems = [
    {
      title: "Macroblock",
      description: "Taiwan, LED Driver IC ",
      icon: "next",
      partnerStory: {
        image: "/banners/macroblock_banner.jpg",
        text: "Preline Docs have been a game-changer for our team's productivity.",
        learnMoreLink: "/stories/docs-impact"
      }
    },
    {
      title: "Zowie",
      description: "Diodie, Taiwan",
      icon: "Puzzle",
      partnerStory: {
        image: "/banners/zowie_banner.jpg",
        text: "Preline's integrations have streamlined our workflow significantly.",
        learnMoreLink: "/stories/integration-success"
      }
    },
    {
      title: "XLSEMI",
      description: "China, LED Driver IC",
      icon: "Code",
      partnerStory: {
        image: "/banners/xlsemi_banner.jpg",
        text: "Our custom solution built on Preline's API has transformed our business.",
        learnMoreLink: "/stories/api-innovation"
      }
    },
    {
      title: "LLT",
      description: "China, Cable",
      icon: "HelpCircle",
      partnerStory: {
        image: "/banners/llt_banner.jpg",
        text: "Preline's Help Center guided us through a seamless implementation.",
        learnMoreLink: "/stories/help-center-experience"
      }
    },
    {
      title: "Kube Electronics AG",
      description: "Swisis, Sensor",
      icon: "Code2",
      partnerStory: {
        image: "/banners/kube_banner.jpg",
        text: "The Developer Hub empowered us to create powerful custom features.",
        learnMoreLink: "/stories/developer-success"
      }
    },
    {
      title: "Morethanall",
      description: "China, Cable",
      icon: "Users",
      partnerStory: {
        image: "/banners/morethanall_banner.png",
        text: "The Preline community has been an invaluable resource for our team.",
        learnMoreLink: "/stories/community-impact"
      }
    },
    {
      title: "Powtech",
      description: "China, LED Driver IC",
      icon: "Users",
      partnerStory: {
        image: "/banners/powtech_banner.jpg",
        text: "The Preline community has been an invaluable resource for our team.",
        learnMoreLink: "/stories/community-impact"
      }
    },
    {
      title: "GTM",
      description: "Taiwan, MOSFET",
      icon: "Users",
      partnerStory: {
        image: "/banners/gtm_banner.jpg",
        text: "The Preline community has been an invaluable resource for our team.",
        learnMoreLink: "/stories/community-impact"
      }
    },
  ];


// Reusable components
export const CategoryLink = ({ href, title, description }: { href: string, title: string, description: string }) => (
    <Link href={href} className="p-2 rounded-md hover:bg-gray-100">
        <h3 className="dark:text-white text-neutral-950">{title}</h3>
        <p className="text-neutral-500 text-sm">{description}</p>
    </Link>
);

export const ResourceLink = ({ item, onMouseEnter }: { item: any, onMouseEnter: () => void }) => (
    <Link href="#" className="group block" onMouseEnter={onMouseEnter}>
        <div className="flex items-center">
            <Image src="/icons/gtm_icon.svg" alt="icon" width="50" height="50" className="mr-3" />
            <div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-500">{item.title}</div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
        </div>
    </Link>
);

export const SupportLink = ({ title, description }: { title: string, description: string }) => (
    <span className="block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit">
        <h3 className="dark:text-white text-neutral-950 flex items-center gap-1">
            {title}
            <svg viewBox="0 0 12 12" width="10px" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-100 dark:fill-neutral-500 fill-neutral-900">
                <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
            </svg>
        </h3>
        <p className="text-neutral-500 text-sm">{description}</p>
    </span>
);

export const CompanyIntroContent = () => (
    <div className="flex gap-4 p-4 w-full h-full justify-center">
        <NavigationMenuLink asChild>
            <a className="flex w-[250px] select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                <div className="mb-2 mt-4 text-lg font-medium">(주)대한플러스전자</div>
                <p className="text-sm leading-tight text-muted-foreground">
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

export const ProductContent = ({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (category: string) => void }) => (
    <div className="flex">
        <div className="w-1/4 bg-gray-100">
            {items.map((item) => (
                <div key={item.title} className="p-4 cursor-pointer hover:bg-gray-200" onMouseEnter={() => setActiveCategory(item.title)}>
                    {item.title}
                </div>
            ))}
        </div>
        <div className="w-3/4 bg-white p-4">
            {activeCategory && (
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(items.find(item => item.title === activeCategory)?.content || []).map(([category, subItems]) => (
                        <div key={category} className="space-y-4">
                            <h2 className="text-lg font-bold">{category}</h2>
                            <div className="space-y-2">
                                {subItems.map((subItem: any) => (
                                    <Link key={subItem.title} href={`#${subItem.title.toLowerCase().replace(' ', '-')}`} className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100">
                                        <span className="h-6 w-6 flex-shrink-0 text-gray-400"></span>
                                        <span className="text-sm">{subItem.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export const PartnerContent = ({ activeStory, setActiveStory }: { activeStory: any, setActiveStory: (story: any) => void }) => (
    <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-6">
            {resourceItems.map((item) => (
                <ResourceLink key={item.title} item={item} onMouseEnter={() => setActiveStory(item.partnerStory)} />
            ))}
        </div>
        <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">파트너사 개요</h3>
            <div className="bg-gray-100 rounded-lg p-4">
                <img src={activeStory.image} alt="Customer" className="w-full h-32 object-cover rounded-lg mb-4" />
                <p className="text-sm text-gray-600 mb-2">{activeStory.text}</p>
                <Link href={activeStory.learnMoreLink} className="text-sm text-blue-500 hover:underline">
                    Learn more →
                </Link>
            </div>
        </div>
    </div>
);

export const SupportContent = () => (
    <div className="flex justify-center">
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
                <div className="text-sm dark:text-neutral-500 text-neutral-400 px-3">{section.title}</div>
                {section.items.map((item, itemIndex) => (
                    <SupportLink key={itemIndex} title={item.title} description={item.description} />
                ))}
            </div>
        ))}
    </div>
);