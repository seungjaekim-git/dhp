"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
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
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { debounce } from "lodash";
import { navigationConfig } from "@/config/navigation";
import { useCallback } from "react";
import { useSearchStore } from "@/store/SearchStore"; // Import search store
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Reusable components with React.memo for performance optimization
const CategoryLink = React.memo(({ href, title, description }: { href: string, title: string, description: string }) => (
  <Link 
    href={href} 
    className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200"
  >
    <div className="flex items-center">
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base">{title}</div>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{description}</p>
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return prevProps.href === nextProps.href && 
         prevProps.title === nextProps.title && 
         prevProps.description === nextProps.description;
});
CategoryLink.displayName = "CategoryLink";

const ResourceLink = React.memo(({ item }: { item: {
  title: string,
  description: string,
  icon: string,
  partnerStory: {
    image: string,
    text: string,
    learnMoreLink: string
  }
} }) => (
  <Link 
    href={item.partnerStory.learnMoreLink} 
    className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200" 
  >
    <div className="flex items-center">
      <Image 
        src={item.icon} 
        alt="icon" 
        width={50} 
        height={50} 
        className="mr-3 transition-transform duration-300 group-hover:rotate-3" 
        loading="lazy" 
      />
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base">{item.title}</div>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{item.description}</p>
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});
ResourceLink.displayName = "ResourceLink";

const SupportLink = React.memo(({ title, description }: { title: string, description: string }) => (
  <Link href="#" className="group block p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 active:scale-95 active:bg-neutral-200">
    <div className="flex items-center">
      <div>
        <div className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 text-xs sm:text-sm md:text-base flex items-center gap-1">
          {title}
          <svg viewBox="0 0 12 12" width="10px" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform group-hover:rotate-3 dark:fill-neutral-500 fill-neutral-900">
            <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
          </svg>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">{description}</p>
      </div>
    </div>
  </Link>
), (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && 
         prevProps.description === nextProps.description;
});
SupportLink.displayName = "SupportLink";

const Navigation = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(navigationConfig.products.categories[0]?.title || '');
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [selectedPartner, setSelectedPartner] = React.useState(navigationConfig.partners.items[0]);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  // Use search store instead of local state
  const { setIsOpen, isOpen } = useSearchStore();

  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) { // 스크롤 다운
        setIsVisible(false);
      } else { // 스크롤 업
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const debouncedSetSelectedMenu = useCallback(
    debounce((value: string) => setSelectedMenu(value), 100),
    []
  );

  const renderSubMenu = React.useMemo(() => {
    const { company, products, partners, support } = navigationConfig;

    switch (selectedMenu) {
      case company.title:
        return (
          <div className="flex flex-col space-y-2 rounded-lg ">
            {company.items.map(item => (
              <SheetClose key={item.title} asChild>
                <Link 
                  href={item.link} 
                  className="p-2 hover:bg-neutral-100 font-bold rounded-lg"
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </div>
        );  
      case products.title:
        return (
          <div className="flex flex-col">
            {products.categories.map((category) => (
              <div key={category.title} className="border-b border-gray-100 last:border-b-0">
                <SheetClose asChild>
                  <Link href={category.link} className="block py-3 px-4 text-[15px] font-medium text-gray-900 hover:bg-gray-50">
                    {category.title}
                  </Link>
                </SheetClose>
                <div className="bg-gray-50">
                  {category.content.map((subcategory) => (
                    <div key={subcategory.title}>
                      <SheetClose asChild>
                        <Link href={subcategory.link} className="block py-2.5 px-6 text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600">
                          {subcategory.title}
                        </Link>
                      </SheetClose>
                      <div>
                        {subcategory.children.map((item) => (
                          <SheetClose key={item.title} asChild>
                            <Link href={item.link} className="block py-2 px-8 text-[12px] text-gray-600 hover:bg-gray-100 hover:text-blue-600">
                              {item.title}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case partners.title:
        return (
          <div className="flex flex-col space-y-4">
            {partners.items.map((item) => (
              <SheetClose key={item.title} asChild>
                <div className="p-2 hover:bg-neutral-100 rounded-lg">
                  <div className="flex items-center">
                    <Image src={item.icon} alt={item.title} width={30} height={30} className="mr-2" />
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm text-neutral-600">{item.description}</div>
                    </div>
                  </div>
                </div>
              </SheetClose>
            ))}
          </div>
        );
      case support.title:
        return (
          <div className="flex flex-col space-y-2">
            <div className="mb-4">
              <h3 className="font-bold mb-2">{support.inquiry.title}</h3>
              {support.inquiry.items.map(item => (
                <SheetClose key={item.title} asChild>
                  <Link href={item.link} className="block py-2 hover:bg-neutral-100">
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2">{support.contact.title}</h3>
              {support.contact.items.map(item => (
                <Link key={item.title} href={item.link} className="block py-2 hover:bg-neutral-100">
                  {item.title}
                </Link>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">{support.resources.title}</h3>
              {support.resources.items.map(item => (
                <Link key={item.title} href={item.link} className="block py-2 hover:bg-neutral-100">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [selectedMenu]);

  return (
    <div className={`w-full bg-white border-b transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex justify-between h-16">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logos/dhp-logo.png" alt="대한플러스전자(주)" width={40} height={40} loading="lazy" />
          <span className="font-bold md:hidden lg:block">대한플러스전자(주)</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger onMouseEnter={() => debouncedSetSelectedMenu(navigationConfig.company.title)} className="text-gray-700 hover:text-blue-600">
                  {navigationConfig.company.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 justify-center gap-4 p-6 w-full">
                    <li className="row-span-4 col-span-1">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-between rounded-lg bg-[url('/images/background_img.webp')] bg-cover bg-center p-8 no-underline outline-none hover:shadow-xl transition-all duration-300 active:scale-95 active:shadow-inner"
                          href={navigationConfig.company.link}
                        >
                          <div className="flex flex-col h-full justify-between bg-white/50 p-2 rounded-md mt-8">
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                              대한플러스전자(주)
                            </h3>
                            <div className="flex flex-col text-gray-900">
                              <p className="text-xs leading-relaxed">최고의 서비스</p>
                              <p className="text-xs leading-relaxed">정확한 솔루션</p>
                              <p className="text-xs leading-relaxed">품질로 승부하는 반도체 유통 전문기업</p>
                            </div>
                            <span className="text-sm text-gray-600 items-center gap-1 flex">
                              <ArrowLeft className="w-4 h-4" />
                              회사 소개
                            </span>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {navigationConfig.company.items.map((item) => (
                      <CategoryLink key={item.title} href={item.link} title={item.title} description={item.description} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.products.title}</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <div className="w-full p-4">
                    <Tabs defaultValue="category" className="w-full">
                      <TabsList className="w-full flex p-1 bg-transparent">
                        <TabsTrigger value="category" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">카테고리별</TabsTrigger>
                        <TabsTrigger value="application" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">적용분야별</TabsTrigger>
                        <TabsTrigger value="manufacturer" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">제조사별</TabsTrigger>
                        <TabsTrigger value="new" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-gray-200 data-[state=active]:border-b-0 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-t-md transition-all duration-300">신제품</TabsTrigger>
                      </TabsList>

                      <TabsContent value="category">
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                          {navigationConfig.products.categories.map((category) => (
                            <div key={category.title} className="flex flex-col mx-8">
                              <Link
                                href={category.link}
                                className="group flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 active:scale-95 text-center h-48"
                              >
                                {category.icon && (
                                  <div className="w-20 h-20 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                                    {React.createElement(category.icon, {
                                      className: "w-10 h-10 text-blue-600 group-hover:text-blue-700"
                                    })}
                                  </div>
                                )}
                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                                  {category.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {category.seo.description}
                                </p>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="application">
                        <div className="grid grid-cols-3 gap-4">

                        </div>
                      </TabsContent>

                      <TabsContent value="manufacturer">
                        <div className="grid grid-cols-4 gap-4">

                        </div>
                      </TabsContent>

                      <TabsContent value="new">
                        <div className="grid grid-cols-3 gap-4">

                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.partners.title}</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <div className="grid grid-cols-3 gap-6 p-2 overflow-y-auto">
                    <div className="col-span-2 grid grid-cols-2 gap-6">
                      {navigationConfig.partners.items.map((partner) => (
                        <div
                          key={partner.title}
                          onMouseEnter={() => setSelectedPartner(partner)}
                          className="cursor-pointer"
                        >
                          <ResourceLink item={partner} />
                        </div>
                      ))}
                    </div>
                    <div className="col-span-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4">파트너사 스토리</h3>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={selectedPartner?.partnerStory.image || navigationConfig.partners.items[0].partnerStory.image}
                          alt="Partner Story"
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            {selectedPartner?.partnerStory.text || navigationConfig.partners.items[0].partnerStory.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">{navigationConfig.support.title}</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <div className="flex items-center justify-center overflow-y-auto">
                    <div className="p-4 border-r border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500 px-3">{navigationConfig.support.inquiry.title}</div>
                      {navigationConfig.support.inquiry.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
                    <div className="p-4 border-r border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500 px-3">{navigationConfig.support.contact.title}</div>
                      {navigationConfig.support.contact.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
                    <div className="p-4 border-r border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500 px-3">{navigationConfig.support.resources.title}</div>
                      {navigationConfig.support.resources.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/quote" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-blue-600`}>견적요청</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 검색 및 모바일 메뉴 */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 hover:bg-neutral-100 rounded-full"
            onClick={() => setIsOpen(!isOpen)} // Use zustand store action
          >
            <Search className="h-5 w-5 text-neutral-600" />
          </button>

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

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-screen md:hidden">
              <SheetHeader className="container border-b bg-white flex flex-row items-center space-x-2 justify-between m-auto">
                <Image src="/logos/dhp-logo.png" alt="대한플러스전자" width={40} height={10}/>
                <SheetTitle className="text-lg font-bold m-2">대한플러스전자</SheetTitle>
                <SheetClose asChild className="flex justify-center items-center">
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <div className="flex h-full">
                <div className="flex flex-col justify-between w-1/3 min-w-[150px] border-r bg-white overflow-y-auto">
                  <div className="flex flex-col">
                    {[navigationConfig.company.title, navigationConfig.products.title, navigationConfig.partners.title, navigationConfig.support.title, "견적요청"].map((menu) => (
                      <button
                        key={menu}
                        onMouseEnter={() => setSelectedMenu(menu)}
                        onClick={() => setSelectedMenu(menu)}
                        className={`rounded-md text-left px-4 py-3.5 transition-all ${selectedMenu === menu ? "bg-neutral-100 font-bold" : "hover:bg-neutral-50"}`}
                      
                      >
                        {menu}
                      </button>
                    ))}
                  </div>

                  <div className="flex w-full justify-center mb-10">
                    <Select>
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

                <div className="w-2/3 p-4 bg-white overflow-y-auto">
                  <div className="space-y-2">{renderSubMenu}</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navigation);
