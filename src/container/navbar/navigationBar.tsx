"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select";

import { CompanyIntroContent, ProductContent, PartnerContent, SupportContent } from './NavigationContents';
import { resourceItems } from './NavigationContents';

const FirstLayer = () => (
  <div className="w-full h-[64px] bg-white border-b">
    <div className="container py-2 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/svgs/vercel.svg" alt="Logo" width={40} height={40} />
        <span className="font-bold text-xl">YourCompany</span>
      </Link>
      <div className="flex items-center space-x-4 flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            <SelectItem value="en" className="w-[140px]">English</SelectItem>
            <SelectItem value="ko" className="w-[140px]">한국어</SelectItem>
          </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);
const SecondLayer = ({ isVisible }: { isVisible: boolean }) => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);  
  const [activeStory, setActiveStory] = React.useState(() => {
    const macroblockItem = resourceItems.find(item => item.title === "Macroblock");
    return macroblockItem ? macroblockItem.partnerStory : null;
  });

  return (
    <div className={`flex w-full items-center justify-center bg-white top-[64px] border-b transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0 z-50' : 'opacity-0 -translate-y-full'}`}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>회사소개</NavigationMenuTrigger>

              <NavigationMenuContent className="w-screen">
                <CompanyIntroContent/>
                
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent className="w-screen">
                
                  <ProductContent activeCategory={activeCategory || ''} setActiveCategory={setActiveCategory} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>파트너사</NavigationMenuTrigger>
              <NavigationMenuContent>                  
                <PartnerContent activeStory={activeStory} setActiveStory={setActiveStory} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/quote" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  견적요청
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>고객 지원</NavigationMenuTrigger>
              <NavigationMenuContent>
                  <SupportContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    </div>
  );
};

export default function TwoLayerNavigation() {
  const [showSecondLayer, setShowSecondLayer] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [hasScrolledDown, setHasScrolledDown] = React.useState(false);
  const [isNavigationFocused, setIsNavigationFocused] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isNavigationFocused) return;
      
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (hasScrolledDown) {
          setShowSecondLayer(true);
        }
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowSecondLayer(false);
        setHasScrolledDown(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasScrolledDown, isNavigationFocused]);

  return (
    <div 
      onMouseEnter={() => setIsNavigationFocused(true)}
      onMouseLeave={() => setIsNavigationFocused(false)}
      className="sticky top-0 z-50 flex-col min-w-screen mx-auto items-center justify-center"
    >
      <FirstLayer />
      <SecondLayer isVisible={showSecondLayer} />
    </div>
  );
}