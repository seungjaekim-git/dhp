import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Globe2,
  Users2,
  Mail,
  Phone,
  Printer,
  Link2,
  CalendarClock,
  MapPin,
  DollarSign,
  Component,
  Factory,
  FileText,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import PartnersLayout from "../PartnersLayout";

export const metadata = {
  title: "Company Profile - Macroblock",
  description: "Profile of Macroblock Inc.",
};

export default function CompanyProfile() {
  const companyData = {
    name: "Macroblock",
    established: "1999",
    country: "대만",
    headquarters: "대만 신주시 푸딩로 18번지 300047",
    business_type: "제조업",
    main_products: "LED Driver IC",
    employees: "200+",
    company_overview: "A Driver IC Like No Other\nMacroblock은 1999년 6월 대만 신주에서 설립된 회사로, 혼합 신호 드라이버 IC 설계 전문 기업입니다. 특히 전력 관리와 광전자 응용 분야에 중점을 두고 있습니다. 2017년 4월에는 ISO 9001:2015 인증을 획득하여, 최고 품질의 제품을 지속적으로 제공하며 전 세계 고객의 신뢰를 얻고 있습니다.",
    business_overview: "Macroblock은 LED 디스플레이 및 조명 애플리케이션을 위한 고성능 드라이버 IC 설계에 주력하는 세계적인 기업입니다. 20년 이상의 경험을 바탕으로, 대량 전송 및 미니 LED 기술을 활용하여 혁신적인 모듈 솔루션을 제공합니다.",
    email: "info@mblock.com.tw",
    phone: "+886-3-579-0068*7707",
    fax: "+886-3-579-7534",
    website: "https://www.mblock.com.tw/en",
    annual_revenue: "5,707만 미국 달러(USD) (2024 회계기준)",
    branches: "중국 선전 (지사), 대한민국 서울 (지사)",
    logo: "/logos/macroblock-logo.png",
  };

  return (
    <PartnersLayout
      title={companyData.name}
      logo={companyData.logo}
      breadcrumb={[
        { label: "파트너사", href: "/partners" },
        { label: companyData.name }
      ]}
      description={companyData.business_overview}
      badges={[
        {
          text: "LED Driver IC",
          bgColor: "bg-blue-500/10",
          textColor: "text-blue-600",
          hoverColor: "hover:bg-blue-500/20"
        }
      ]}
    >
      <div className="flex flex-col lg:flex-row w-full gap-6">
        <div className="flex-1">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-md transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">주요 제품</CardTitle>
                <Component className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{companyData.main_products}</div>
                <p className="text-xs text-gray-500 mt-1">LED Display & Lighting Solutions</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">연간 매출</CardTitle>
                <DollarSign className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">$57.07M</div>
                <p className="text-xs text-gray-500 mt-1">2024 회계연도 기준</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">사업 분야</CardTitle>
                <Factory className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{companyData.business_type}</div>
                <p className="text-xs text-gray-500 mt-1">LED Driver IC 전문</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>회사 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">회사 개요</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {companyData.company_overview}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">사업 개요</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {companyData.business_overview}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 text-lg">연락처 정보</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {companyData.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {companyData.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Printer className="w-4 h-4" />
                        {companyData.fax}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Link2 className="w-4 h-4" />
                        {companyData.website}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-[300px]">
          <div className="sticky top-6 space-y-4">
            <Button className="w-full gap-2 bg-blue-500 hover:bg-blue-600 transition-colors">
              <Mail className="w-4 h-4" />
              문의하기
            </Button>
            <Button variant="outline" className="w-full gap-2 hover:bg-gray-50">
              <ExternalLink className="w-4 h-4" />
              웹사이트 방문
            </Button>

            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm">본사 위치</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{companyData.headquarters}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm">지사</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{companyData.branches}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PartnersLayout>
  );
}
