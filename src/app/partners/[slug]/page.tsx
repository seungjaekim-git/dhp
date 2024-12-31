import React from "react";
import {
  Card,
  CardContent, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Printer,
  Link2,
  ExternalLink,
  MapPin,
  Building2,
  DollarSign,
  Component,
  Factory
} from "lucide-react";
import PartnersLayout from "../PartnersLayout";
import { PARTNER_DATA } from "../PartnerData";
import { notFound } from "next/navigation";

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
    return PARTNER_DATA.map((partner) => ({
      slug: partner.name.toLowerCase().replace(/ /g, "-"),
    }));
};

export default function CompanyProfile({ params }: { params: { slug: string } }) {
const companyData = PARTNER_DATA.find(
    (partner) => partner.name.toLowerCase().replace(/ /g, '-') === params.slug
    );
    
    if (!companyData) {
    console.error("Company not found for slug:", params.slug);
    notFound();
    }


  return (
    <PartnersLayout
      title={companyData.name}
      logo={companyData.images.logo}
      breadcrumb={[
        { label: "파트너사", href: "/partners" },
        { label: companyData.name }
      ]}
      description={companyData.business_overview}
      badges={companyData.main_product_categories.map(category => ({
        text: category,
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-600", 
        hoverColor: "hover:bg-blue-500/20"
      }))}
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
                <p className="text-xs text-gray-500 mt-1">Main Products</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">연간 매출</CardTitle>
                <DollarSign className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{companyData.annual_revenue || "비공개"}</div>
                <p className="text-xs text-gray-500 mt-1">Annual Revenue</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">사업 분야</CardTitle>
                <Factory className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{companyData.business_type || "비공개"}</div>
                <p className="text-xs text-gray-500 mt-1">Business Type</p>
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
                      {companyData.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          {companyData.email}
                        </div>
                      )}
                      {companyData.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {companyData.phone}
                        </div>
                      )}
                      {companyData.fax && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Printer className="w-4 h-4" />
                          {companyData.fax}
                        </div>
                      )}
                      {companyData.website && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Link2 className="w-4 h-4" />
                          {companyData.website}
                        </div>
                      )}
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
            {companyData.website && (
              <Button variant="outline" className="w-full gap-2 hover:bg-gray-50">
                <ExternalLink className="w-4 h-4" />
                웹사이트 방문
              </Button>
            )}

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

            {companyData.branches && (
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
            )}
          </div>
        </div>
      </div>
    </PartnersLayout>
  );
}
