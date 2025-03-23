'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { AboutSidebar } from "./AboutSidebar";
import AnimatedHeroSection from "./components/AnimatedHeroSection";
import AnimatedContentSection from "./components/AnimatedContentSection";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface AboutLayoutProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
}

export default function AboutLayout({
  children,
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
}: AboutLayoutProps) {
  const pathname = usePathname() || "/about";

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
            <AboutSidebar />
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
