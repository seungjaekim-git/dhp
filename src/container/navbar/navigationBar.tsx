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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CompanyIntroContent, ProductContent, PartnerContent, SupportContent } from './NavigationContents';
import { resourceItems } from './NavigationContents';

const FirstLayer = () => (
  <div className="sticky h-[64px] top-0 z-50 bg-white border-b">
    <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="font-bold text-xl">YourCompany</span>
      </Link>
      <div className="flex items-center space-x-4 flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline">Login</Button>
        <NavigationMenu>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
             Language
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>English</NavigationMenuLink>
              <NavigationMenuLink>한국어</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  </div>
);
const SecondLayer = ({ isVisible }) => {
  const [activeCategory, setActiveCategory] = React.useState(null);
  const [activeStory, setActiveStory] = React.useState(() => {
    const macroblockItem = resourceItems.find(item => item.title === "Macroblock");
    return macroblockItem ? macroblockItem.partnerStory : null;
  });

  return (
    <div className={`sticky bg-white top-[64px] border-b transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0 z-50' : 'opacity-0 -translate-y-full'}`}>
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>회사소개</NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="w-screen">
                  <CompanyIntroContent />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-screen">
                  <ProductContent activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>파트너사</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-screen">
                  <PartnerContent activeStory={activeStory} setActiveStory={setActiveStory} />
                </div>
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
                <div className="w-screen">
                  <SupportContent />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default function TwoLayerNavigation() {
  const [showSecondLayer, setShowSecondLayer] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [hasScrolledDown, setHasScrolledDown] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
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
  }, [lastScrollY, hasScrolledDown]);

  return (
    <>
      <FirstLayer />
      <SecondLayer isVisible={showSecondLayer} />
    </>
  );
}