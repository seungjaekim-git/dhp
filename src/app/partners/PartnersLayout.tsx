'use client'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Building2, Component } from "lucide-react";
import AnimatedHeroSection from "../about/components/AnimatedHeroSection";
import AnimatedContentSection from "../about/components/AnimatedContentSection";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicIcon from "../about/components/DynamicIcon";
import { getAllManufacturers } from "@/lib/supabase-client";

interface Manufacturer {
  id: number;
  name: string;
  website_url?: string;
  country_id?: number;
  logo?: string;
  established?: number;
  product_category?: string;
  // Add other fields as needed
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface PartnersLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
  partners?: Manufacturer[];
}

export default function PartnersLayout({
  children,
  title,
  icon = <Building2 className="w-6 h-6 text-blue-400" />,
  breadcrumb,
  description,
  badges = [],
  partners = [],
}: PartnersLayoutProps) {
  const pathname = usePathname() || "/partners";
  const [sidebarPartners, setSidebarPartners] = useState<Manufacturer[]>(partners);

  // Fetch partners for sidebar if not provided via props
  useEffect(() => {
    const fetchPartners = async () => {
      if (partners.length === 0) {
        try {
          const data = await getAllManufacturers();
          setSidebarPartners(data);
        } catch (error) {
          console.error("Error loading partners for sidebar:", error);
        }
      }
    };

    fetchPartners();
  }, [partners]);

  // Get country name from country ID
  const getCountryName = (countryId?: number): string => {
    if (!countryId) return "기타 국가";
    
    const countryMap: Record<number, string> = {
      1: '한국',
      2: '미국',
      3: '중국',
      4: '일본',
      5: '독일',
      6: '프랑스',
      7: '영국',
      8: '이탈리아',
      9: '캐나다',
      10: '호주',
      11: '인도',
      12: '대만',
      13: '스위스',
      14: '네덜란드',
      15: '싱가포르',
      16: '스웨덴',
      17: '덴마크',
      18: '핀란드',
      19: '노르웨이',
      20: '벨기에'
    };
    
    return countryMap[countryId] || '기타 국가';
  };

  // Create slug from partner name
  const createSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  // Handle the partner path and active state calculation
  const getPartnerPath = (partner: Manufacturer): string => {
    return `/partners/${createSlug(partner.name)}`;
  };

  const isPartnerActive = (pathname: string, partnerPath: string): boolean => {
    return pathname === partnerPath;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Full width, bold typography */}
      <AnimatedHeroSection
        title={title}
        icon={icon}
        breadcrumb={breadcrumb}
        description={description}
        badges={badges}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 py-12 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky sidebar */}
          <div className="w-full lg:w-64 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8 w-full">
              <div className="bg-gray-900 border border-gray-800 rounded-xl">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">
                    파트너사
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {sidebarPartners.length > 0 ? `${sidebarPartners.length}개의 글로벌 파트너사` : '글로벌 파트너사를 만나보세요'}
                  </p>
                </div>

                <ScrollArea className="h-auto max-h-[calc(100vh-150px)]">
                  <nav className="p-3">
                    <Link
                      href="/partners"
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                        "hover:bg-blue-500/10",
                        pathname === "/partners"
                          ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                          : "text-gray-400 border-l-2 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        pathname === "/partners" ? "bg-blue-500/20" : "bg-gray-800"
                      )}>
                        <Building2 className={cn(
                          "w-5 h-5",
                          pathname === "/partners" ? "text-blue-400" : "text-gray-500"
                        )} />
                      </div>
                      
                      <div>
                        <div className={cn(
                          "font-medium",
                          pathname === "/partners" ? "text-white" : "text-gray-300"
                        )}>
                          전체 파트너사
                        </div>
                        <div className="text-xs text-gray-500">
                          모든 파트너사 목록
                        </div>
                      </div>
                    </Link>

                    {/* Partner items */}
                    {sidebarPartners.map((partner) => {
                      const partnerPath = getPartnerPath(partner);
                      const isActive = isPartnerActive(pathname, partnerPath);
                      
                      return (
                        <Link
                          key={partner.id}
                          href={partnerPath}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                            "hover:bg-blue-500/10",
                            isActive
                              ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                              : "text-gray-400 border-l-2 border-transparent"
                          )}
                        >
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden",
                            isActive ? "bg-blue-500/20" : "bg-gray-800"
                          )}>
                            {partner.logo ? (
                              <Image 
                                src={partner.logo} 
                                alt={partner.name} 
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                              />
                            ) : (
                              <Building2 className={cn(
                                "w-5 h-5",
                                isActive ? "text-blue-400" : "text-gray-500"
                              )} />
                            )}
                          </div>
                          
                          <div>
                            <div className={cn(
                              "font-medium",
                              isActive ? "text-white" : "text-gray-300"
                            )}>
                              {partner.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getCountryName(partner.country_id)}
                              {partner.product_category && (
                                <> | {typeof partner.product_category === 'string' 
                                    ? partner.product_category.split(',')[0].trim() 
                                    : '기타 제품'}</>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </ScrollArea>
                
                {/* Decorative gradient bar at bottom */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 order-1 lg:order-2">
            <AnimatedContentSection>
              {children}
            </AnimatedContentSection>
          </div>
        </div>
      </div>
    </div>
  );
}
