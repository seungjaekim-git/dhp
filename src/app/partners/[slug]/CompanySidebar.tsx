import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Building2, Linkedin, Globe, CalendarClock, Users2, Factory, BadgeInfo, Tag, Layers, Mail } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ManufacturerData {
  id: number;
  name: string;
  website_url?: string;
  established?: number;
  headquarters?: string;
  business_type?: string;
  company_overview?: string;
  business_overview?: string;
  logo?: string;
  building_image?: string;
  linkedin_url?: string;
  branches?: string[] | string;
  employees?: number;
  product_category?: string;
  emails?: string[];
}

export const CompanySidebar = ({ companyData }: { companyData: ManufacturerData }) => {
  // Parse product_category if it exists
  let productCategories: string[] = [];
  if (companyData.product_category) {
    try {
      // Try parsing as JSON if it's a JSON string
      const parsed = JSON.parse(companyData.product_category);
      if (Array.isArray(parsed)) {
        productCategories = parsed;
      } else if (typeof parsed === 'object') {
        // If it's an object with categories property
        productCategories = parsed.categories || [];
      }
    } catch (e) {
      // If not JSON, split by commas
      productCategories = companyData.product_category.split(',').map(cat => cat.trim());
    }
  }

  return (
    <div className="space-y-4">
      {/* Website Button */}
      {companyData.website_url && (
        <a href={companyData.website_url} target="_blank" rel="noopener noreferrer">
          <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all">
            <Globe className="w-4 h-4" /> 웹사이트 방문하기
          </Button>
        </a>
      )}
      
      {/* LinkedIn Button */}
      {companyData.linkedin_url && (
        <a href={companyData.linkedin_url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full gap-2 border-blue-500/30 text-blue-400 bg-transparent hover:bg-blue-500/10">
            <Linkedin className="w-4 h-4" /> LinkedIn 프로필
          </Button>
        </a>
      )}

      {/* Email Information */}
      {companyData.emails && companyData.emails.length > 0 && (
        <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> 
              이메일 연락처
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {companyData.emails.map((email, index) => (
                <a 
                  key={index} 
                  href={`mailto:${email}`} 
                  className="flex items-start gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                  <span>{email}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Company Image */}
      {companyData.building_image && (
        <Card className="bg-gray-900/70 border-gray-800 overflow-hidden transition-all duration-300">
          <div className="w-full h-48 relative">
            <Image
              src={companyData.building_image}
              alt={`${companyData.name} building`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          </div>
        </Card>
      )}

      {/* Product Categories Card */}
      {productCategories.length > 0 && (
        <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" /> 
              주요 제품 카테고리
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Headquarters Location */}
      {companyData.headquarters && (
        <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> 
              본사 위치
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <span>{companyData.headquarters}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Branches */}
      {companyData.branches && (
        <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" /> 
              지사
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {Array.isArray(companyData.branches) ? (
                companyData.branches.map((branch, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                    <span>{branch}</span>
                  </div>
                ))
              ) : (
                <span>{companyData.branches}</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Company Quick Info */}
      <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-white flex items-center gap-2">
            <BadgeInfo className="w-4 h-4 text-blue-400" /> 
            기업 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {companyData.established && (
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarClock className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-gray-300">설립년도:</span> {companyData.established}년
              </div>
            )}
            
            {companyData.employees && (
              <div className="flex items-center gap-2 text-gray-400">
                <Users2 className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-gray-300">직원수:</span> {companyData.employees}명
              </div>
            )}
            
            {companyData.business_type && (
              <div className="flex items-center gap-2 text-gray-400">
                <Factory className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-gray-300">사업유형:</span> {companyData.business_type}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
