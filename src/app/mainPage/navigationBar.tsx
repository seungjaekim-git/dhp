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
import { productCategoryItems, partnersItems } from "@/app/mainPage/NavigationData";
import { debounce } from "lodash";
import { navigationConfig } from "@/config/navigation";
import { useCallback } from "react";
import { useSearchStore } from "@/store/SearchStore"; // Import search store

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
    href="#" 
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
  const [selectedCategory, setSelectedCategory] = React.useState<string>(productCategoryItems[0]?.title || '');
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [selectedPartner, setSelectedPartner] = React.useState(partnersItems[0]);
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
          <div className="flex flex-col space-y-2">
            {company.items.map(item => (
              <Link 
                key={item.title}
                href={item.link} 
                className="py-2 hover:bg-neutral-100 font-bold"
              >
                {item.title}
              </Link>
            ))}
          </div>
        );  
      case products.title:
        return (
          <div className="flex flex-col space-y-2">
            {products.categories.map((category) => (
              <div key={category.title} className="mb-4">
                <Link href={category.link} className="block text-md font-bold mb-2 p-2 rounded-md hover:bg-neutral-100 hover:text-neutral-500">
                  {category.title}
                </Link>
                <div className="ml-4">
                  {category.content.map((subcategory) => (
                    <div key={subcategory.title} className="mb-1">
                      <Link href={subcategory.link} className="block rounded-md text-sm text-neutral-600 hover:text-neutral-500 font-bold p-2 hover:bg-neutral-100">
                        {subcategory.title}
                      </Link>
                      <div className="ml-4">
                        {subcategory.children.map((item) => (
                          <Link key={item.title} href={item.link} className="block p-1 text-sm rounded-md hover:bg-neutral-100 font-bold hover:text-neutral-500">
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
      case partners.title:
        return (
          <div className="flex flex-col space-y-4">
            {partners.items.map((item) => (
              <div key={item.title} className="p-2 hover:bg-neutral-100 rounded-lg">
                <div className="flex items-center">
                  <Image src={item.icon} alt={item.title} width={30} height={30} className="mr-2" />
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-neutral-600">{item.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case support.title:
        return (
          <div className="flex flex-col space-y-2">
            <div className="mb-4">
              <h3 className="font-bold mb-2">{support.inquiry.title}</h3>
              {support.inquiry.items.map(item => (
                <Link key={item.title} href={item.link} className="block py-2 hover:bg-neutral-100">
                  {item.title}
                </Link>
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
                <NavigationMenuTrigger onMouseEnter={() => debouncedSetSelectedMenu(navigationConfig.company.title)}>
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
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
                              대한플러스전자(주)
                            </h3>
                            <div className="flex flex-col text-neutral-900">
                              <p className="text-xs leading-relaxed">최고의 서비스</p>
                              <p className="text-xs leading-relaxed">정확한 솔루션</p>
                              <p className="text-xs leading-relaxed">품질로 승부하는 반도체 유통 전문기업</p>
                            </div>
                            <span className="text-sm text-neutral-600 items-center gap-1 flex">
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
                <NavigationMenuTrigger>{navigationConfig.products.title}</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <div className="flex overflow-y-auto mx-auto">
                    <div className="w-1/5 lg:w-1/4 rounded-lg bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-md">
                      {navigationConfig.products.categories.map((category) => (
                        <Link
                          href={category.link}
                          key={category.title}
                          onMouseEnter={() => setSelectedCategory(category.title)}
                          className={`p-4 cursor-pointer hover:bg-gradient-to-r from-neutral-500 to-neutral-500 text-xs sm:text-sm md:text-base font-semibold text-neutral-800 hover:text-white transition-all duration-300 ${selectedCategory === category.title ? "bg-gradient-to-r from-neutral-500 to-neutral-500 text-white" : ""}`}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                    <div className="w-4/5 lg:w-4/5 bg-white p-4 shadow-lg rounded-lg">
                      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {navigationConfig.products.categories
                          .filter((category) => category.title === selectedCategory)
                          .flatMap((category) =>
                            category.content.map((contentItem) => (
                              <div key={contentItem.title} className="space-y-4">
                                <Link href={contentItem.link}>
                                  <h2 className="text-xs sm:text-sm font-bold hover:text-neutral-500 transition-colors duration-300">{contentItem.title}</h2>
                                </Link>
                                <div className="space-y-2">
                                  {contentItem.children.map((child) => (
                                    <Link key={child.title} href={child.link} className="flex items-center space-x-2 rounded-md p-2 hover:bg-neutral-100 transition-colors duration-300">
                                      <span className="h-6 w-6 sm:w-1 flex-shrink-0 text-neutral-400"></span>
                                      <span className="text-xs text-neutral-700">{child.title}</span>
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
                <NavigationMenuTrigger>{navigationConfig.partners.title}</NavigationMenuTrigger>
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
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 mb-4">파트너사 스토리</h3>
                      <div className="bg-neutral-100 rounded-lg overflow-hidden">
                        <Image
                          src={selectedPartner?.partnerStory.image || navigationConfig.partners.items[0].partnerStory.image}
                          alt="Partner Story"
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <p className="text-xs sm:text-sm text-neutral-600 mb-2">
                            {selectedPartner?.partnerStory.text || navigationConfig.partners.items[0].partnerStory.text}
                          </p>
                          <Link 
                            href={selectedPartner?.partnerStory.learnMoreLink || navigationConfig.partners.items[0].partnerStory.learnMoreLink} 
                            className="text-xs sm:text-sm text-neutral-500 hover:underline inline-flex items-center"
                          >
                            자세히 보기
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{navigationConfig.support.title}</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <div className="flex items-center justify-center overflow-y-auto">
                    <div className="p-4 border-r dark:border-neutral-800">
                      <div className="text-xs sm:text-sm dark:text-neutral-500 text-neutral-400 px-3">{navigationConfig.support.inquiry.title}</div>
                      {navigationConfig.support.inquiry.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
                    <div className="p-4 border-r dark:border-neutral-800">
                      <div className="text-xs sm:text-sm dark:text-neutral-500 text-neutral-400 px-3">{navigationConfig.support.contact.title}</div>
                      {navigationConfig.support.contact.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
                    <div className="p-4 border-r dark:border-neutral-800">
                      <div className="text-xs sm:text-sm dark:text-neutral-500 text-neutral-400 px-3">{navigationConfig.support.resources.title}</div>
                      {navigationConfig.support.resources.items.map((item) => (
                        <SupportLink key={item.title} title={item.title} description="" />
                      ))}
                    </div>
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
              <SheetHeader className="container border-b bg-white flex flex-row justify-between m-auto">
                <SheetTitle className="text-lg font-semibold m-4">대한플러스전자</SheetTitle>
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
