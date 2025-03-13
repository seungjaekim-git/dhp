"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { debounce } from "lodash";
import { navigationConfig } from "@/config/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSearchStore } from "@/store/SearchStore"; // Import search store
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useQuoteCart, useBookmarks } from "@/hooks/useClientStore";
import { MobileNavigation } from "./components/MobileNavigation";
import { DesktopNavigation } from "./components/DesktopNavigation";

// 재사용 가능한 컴포넌트 (성능 최적화를 위한 React.memo 사용)
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
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [selectedPartner, setSelectedPartner] = React.useState(navigationConfig.partners.items[0]);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const pathname = usePathname();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 검색 스토어 사용
  const { setIsOpen, isOpen } = useSearchStore();

  // 장바구니 상태 가져오기
  const { cartItems, cartItemCount, removeFromCart } = useQuoteCart();
  
  // 북마크 상태 가져오기
  const { bookmarks, bookmarkCount, removeBookmark } = useBookmarks();
  
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

  // 네비게이션 링크 활성화 확인 함수
  const isLinkActive = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  const renderSubMenu = React.useMemo(() => {
    const { company, products, partners, support } = navigationConfig;

    switch (selectedMenu) {
      case company.title:
        return (
          <div className="flex flex-col space-y-2 rounded-lg ">
            {company.items.map((item: {title: string, link: string}) => (
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
            {products.categories.map((category: {
              title: string, 
              link: string, 
              content?: Array<{
                title: string, 
                link: string, 
                children?: Array<{
                  title: string, 
                  link: string
                }>
              }>
            }) => (
              <div key={category.title} className="border-b border-gray-100 last:border-b-0">
                <SheetClose asChild>
                  <Link href={category.link} className="block py-3 px-4 text-[15px] font-medium text-gray-900 hover:bg-gray-50">
                    {category.title}
                  </Link>
                </SheetClose>
                <div className="bg-gray-50">
                  {category.content?.map((subcategory: {
                    title: string, 
                    link: string, 
                    children?: Array<{
                      title: string, 
                      link: string
                    }>
                  }) => (
                    <div key={subcategory.title}>
                      <SheetClose asChild>
                        <Link href={subcategory.link} className="block py-2.5 px-6 text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600">
                          {subcategory.title}
                        </Link>
                      </SheetClose>
                      <div>
                        {subcategory.children?.map((item: {title: string, link: string}) => (
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
            {partners.items.map((item: {
              title: string,
              description: string,
              icon: string
            }) => (
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
              {support.inquiry.items.map((item: {title: string, link: string}) => (
                <SheetClose key={item.title} asChild>
                  <Link href={item.link} className="block py-2 hover:bg-neutral-100">
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2">{support.contact.title}</h3>
              {support.contact.items.map((item: {title: string, link: string}) => (
                <Link key={item.title} href={item.link} className="block py-2 hover:bg-neutral-100">
                  {item.title}
                </Link>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">{support.resources.title}</h3>
              {support.resources.items.map((item: {title: string, link: string}) => (
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

  // 제품 삭제 함수
  const handleRemoveFromCart = useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeFromCart(itemId);
    
    toast({
      title: "제품이 장바구니에서 삭제되었습니다",
      description: "견적 요청 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeFromCart, toast]);

  // 북마크 삭제 함수
  const handleRemoveFromBookmarks = useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeBookmark(itemId);
    
    toast({
      title: "북마크에서 삭제되었습니다",
      description: "북마크 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeBookmark, toast]);

  return (
    <div className={`w-full bg-white border-b transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} sticky top-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logos/dhp-logo.png" alt="대한플러스전자(주)" width={40} height={40} loading="lazy" />
          <span className="font-bold md:hidden lg:block">대한플러스전자(주)</span>
        </Link>

        <div className="hidden sm:block">
          <DesktopNavigation />
        </div>
        

        {/* 우측 검색 및 모바일 메뉴 */}
        <div className="flex items-center space-x-3">
          {/* 검색 버튼 */}
          <Button 
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-neutral-100 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Search className="h-5 w-5 text-neutral-600" />
          </Button>

          {/* 모바일 햄버거 메뉴 */}
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-screen md:hidden p-0">
              <SheetHeader className="border-b bg-white flex flex-row items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Image src="/logos/dhp-logo.png" alt="대한플러스전자" width={40} height={40}/>
                  <SheetTitle className="text-lg font-bold">대한플러스전자</SheetTitle>
                </div>
                <SheetClose asChild className="flex justify-center items-center">
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              
              {/* 모바일 내비게이션 메뉴 */}
              <MobileNavigation />
            </SheetContent>
          </Sheet>
          
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navigation);
