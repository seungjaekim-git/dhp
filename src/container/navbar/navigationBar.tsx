"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu-original";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { items, resourceItems } from "./NavigationData";
import { debounce } from "lodash";
import { Icons } from "@/components/ui/icons";

// Reusable components
const CategoryLink = React.memo(({ href, title, description }: { href: string, title: string, description: string }) => (
  <Link href={href} className="p-2 rounded-md hover:bg-gray-100">
    <h3 className="dark:text-white text-neutral-950 text-xs sm:text-sm md:text-base">{title}</h3>
    <p className="text-neutral-500 text-xs sm:text-sm">{description}</p>
  </Link>
));
CategoryLink.displayName = "CategoryLink";

const ResourceLink = React.memo(({ item, onMouseEnter }: { item: any, onMouseEnter: () => void }) => (
  <Link href="#" className="group block" onMouseEnter={onMouseEnter}>
    <div className="flex items-center">
      <Image src="/icons/gtm_icon.svg" alt="icon" width={50} height={50} className="mr-3" loading="lazy" />
      <div>
        <div className="font-semibold text-gray-900 group-hover:text-blue-500 text-xs sm:text-sm md:text-base">{item.title}</div>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">{item.description}</p>
      </div>
    </div>
  </Link>
));
ResourceLink.displayName = "ResourceLink";
const SupportLink = React.memo(({ title, description }: { title: string, description: string }) => (
  <span className="block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-transform transform hover:scale-105 w-fit">
    <h3 className="dark:text-white text-neutral-950 flex items-center gap-1 text-xs sm:text-sm md:text-base">
      {title}
      <svg viewBox="0 0 12 12" width="10px" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform hover:scale-110 dark:fill-neutral-500 fill-neutral-900">
        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
      </svg>
    </h3>
    <p className="text-neutral-500 text-xs sm:text-sm">{description}</p>
  </span>
));
SupportLink.displayName = "SupportLink";

const Navigation = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = React.useState<string | null>(null);

  const debouncedSetSelectedMenu = React.useMemo(() => debounce(setSelectedMenu, 100), []);
  const debouncedSetSelectedCategory = React.useMemo(() => debounce(setSelectedCategory, 100), []);

  const renderSubMenu = React.useCallback(() => {
    switch (selectedMenu) {
      case "회사소개":
        return (
          <div className="flex flex-col space-y-2">
            <Link href="#" className="py-2 hover:bg-gray-100 font-bold">인사말</Link>
            <Link href="#" className="py-2 hover:bg-gray-100 font-bold">회사 연혁</Link>
            <Link href="#" className="py-2 hover:bg-gray-100 font-bold">사업 소개</Link>
          </div>
        );
      case "제품":
        return (
          <div className="flex flex-col space-y-2">
            {items.map((category) => (
              <div key={category.title} className="mb-4">
                <Link href={category.link} className="block text-md font-bold mb-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-500">
                  {category.title}
                </Link>
                <div className="ml-4">
                  {category.content.map((subcategory) => (
                    <div key={subcategory.title} className="mb-1">
                      <Link href={subcategory.link} className="block rounded-md text-sm text-gray-600 hover:text-blue-500 font-bold p-2 hover:bg-gray-100">
                        {subcategory.title}
                      </Link>
                      <div className="ml-4">
                        {subcategory.children.map((item) => (
                          <Link key={item.title} href={item.link} className="block p-1 text-sm rounded-md hover:bg-gray-100 font-bold hover:text-blue-500">
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  }, [selectedMenu]);

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto flex justify-between h-16">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/svgs/vercel.svg" alt="Logo" width={40} height={40} loading="lazy" />
          <span className="font-bold text-xl">대한플러스전자(주)</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger onMouseEnter={() => debouncedSetSelectedMenu("회사소개")}>
                  회사소개
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 justify-center gap-3 p-6 w-full">
                    <li className="row-span-4 col-span-1">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/company"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            대한플러스전자(주)
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <CategoryLink href="/company/introduction" title="대표이사인사말" description="CEO-Greeting" />
                    <CategoryLink href="/company/history" title="회사연혁" description="About Out History" />
                    <CategoryLink href="/company/business" title="사업소개" description="About Our Business" />
                    <CategoryLink href="/company/roadMap" title="찾아오시는길" description="Corporate Location
" />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>제품소개</NavigationMenuTrigger>
              <NavigationMenuContent asChild>
                <div className="flex overflow-y-auto mx-auto">
                  <div className="w-1/5 lg:w-1/4 rounded-lg bg-gradient-to-b from-gray-200 to-gray-100 shadow-md">
                    {items.map((item) => (
                      <div
                        key={item.title}
                        onMouseEnter={() => setSelectedCategory(item.title)}
                        className={`p-4 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-yellow-500 text-xs sm:text-sm md:text-base font-semibold text-gray-800 hover:text-white transition-all duration-300 ${selectedCategory === item.title ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white" : ""
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
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>파트너사</NavigationMenuTrigger>
              <NavigationMenuContent asChild>
                <div className="grid grid-cols-3 gap-6 overflow-y-auto max-h-[80vh]">
                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    {resourceItems.map((item) => (
                      <ResourceLink key={item.title} item={item} onMouseEnter={() => { }} />
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

              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>고객 지원</NavigationMenuTrigger>
              <NavigationMenuContent asChild>
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
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/quote" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>견적요청</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 검색 및 모바일 메뉴 */}
      <div className="flex items-center space-x-4">
        {/* 검색 버튼 */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="h-5 w-5 text-gray-600" />
        </button>

        {/* 언어 선택 */}
        <div className="hidden md:block">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* 모바일 메뉴 */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-screen md:hidden">
            <SheetHeader className="container border-b bg-white flex flex-row justify-between m-auto">
              <SheetTitle className="text-lg font-semibold m-4">대한플러스전자</SheetTitle>
              <SheetClose asChild className="flex justify-center items-center">
                <Button variant="ghost" size="icon">
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </SheetHeader>
            <div className="flex h-full">
              {/* 왼쪽 메인 메뉴 */}
              <div className="flex flex-col justify-between w-1/3 min-w-[150px] border-r bg-white overflow-y-auto">
                <div className="flex flex-col">
                  {["회사소개", "제품", "파트너사", "고객 지원", "견적요청"].map((menu) => (
                    <button
                      key={menu}
                      onMouseEnter={() => setSelectedMenu(menu)}
                      onClick={() => setSelectedMenu(menu)}
                      className={` rounded-md text-left px-4 py-3.5 transition-all ${selectedMenu === menu ? "bg-gray-100 font-bold" : "hover:bg-gray-50"
                        }`}
                    >
                      {menu}
                    </button>
                  ))}

                </div>

                {/* 언어 선택 */}
                <div className="flex w-full justify-center mb-10"> {/* 중앙 정렬을 위한 div 추가 */}
                  <Select> {/* Select의 넓이를 지정 */}
                    <SelectTrigger className="flex bg-white border-0 ring-0">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Language</SelectLabel>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ko">한국어</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 오른쪽 서브메뉴 */}
              <div className="w-2/3 p-4 bg-white overflow-y-auto">
                <div className="space-y-2">{renderSubMenu()}</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div >
    </div >
  );
}

export default React.memo(Navigation);
