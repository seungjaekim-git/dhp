"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CompanyIntroContent, ProductContent, PartnerContent, SupportContent } from "./NavigationContents";
import { items, resourceItems } from "./NavigationData";

// 상수로 메뉴 데이터 분리
const MENU_ITEMS = [
  { title: "회사소개", component: <CompanyIntroContent /> },
  { title: "제품", component: <ProductContent /> },
  { title: "파트너사", component: <PartnerContent /> },
  { title: "고객 지원", component: <SupportContent /> },
];

export default function Navigation() {
  const [selectedMenu, setSelectedMenu] = React.useState<string | null>(null);

  // 서브 메뉴 렌더링 함수
  const renderSubMenu = () => {
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
                <h4 className="font-bold mb-2">{category.title}</h4>
                <div className="ml-4">
                  {category.content.map((subcategory) => (
                    <div key={subcategory.title} className="mb-2">
                      <p className="text-sm text-gray-600 font-bold">{subcategory.title}</p>
                      <div className="ml-4">
                        {subcategory.children.map((item) => (
                          <Link key={item.title} href={item.link} className="block py-1 text-sm hover:bg-gray-100 font-bold">
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
      case "파트너사":
        return resourceItems.map((partner) => (
          <Link key={partner.title} href="#" className="block py-2 hover:bg-gray-100 font-bold">
            <div className="font-bold">{partner.title}</div>
            <div className="text-sm text-gray-600 font-bold">{partner.description}</div>
          </Link>
        ));
      case "고객 지원":
        return (
          <div className="flex flex-col space-y-2">
            <Link href="#" className="py-2 hover:bg-gray-100 font-bold">FAQ</Link>
            <Link href="#" className="py-2 hover:bg-gray-100 font-bold">제품 지원 문의</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto flex justify-between h-16">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/svgs/vercel.svg" alt="Logo" width={40} height={40} />
          <span className="font-bold text-xl">YourCompany</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {MENU_ITEMS.map(({ title, component }) => (
                <NavigationMenuItem key={title}>
                  <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                  <NavigationMenuContent>{component}</NavigationMenuContent>
                </NavigationMenuItem>
              ))}
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
              <SelectTrigger className="w-[100px]">
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
              <SheetHeader className="px-4 py-3 border-b bg-white">
                <SheetTitle className="text-lg font-semibold">메뉴</SheetTitle>
              </SheetHeader>
              <div className="flex h-[calc(100%-4rem)]">
                {/* 왼쪽 메인 메뉴 */}
                <div className="w-1/3 border-r bg-white">
                  <div className="flex flex-col">
                    {["회사소개", "제품", "파트너사", "견적요청", "고객 지원"].map((menu) => (
                      <button
                        key={menu}
                        onMouseEnter={() => setSelectedMenu(menu)}
                        onClick={() => setSelectedMenu(menu)}
                        className={`text-left px-4 py-3.5 transition-all ${
                          selectedMenu === menu ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                        }`}
                      >
                        {menu}
                      </button>
                    ))}
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
      </div>
    </div>
  );
}
