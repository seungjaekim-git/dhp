'use client';

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductList } from "./ProductList";
import { CompanyInfo } from "./CompanyInfo";
import { PostList } from "./PostList";
import { CertificateList } from "./CertificateList";
import { Package, FileText, Building, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ManufacturerData {
  id: number;
  name: string;
  website_url?: string;
  established?: number;
  country_id?: number;
  headquarters?: string;
  business_type?: string;
  company_overview?: string;
  business_overview?: string;
  key_milestones?: Array<{year: string; event: string; category?: string}>;
  emails?: string[];
  phones?: string[];
  products?: any[];
  product_category?: string;
  posts?: any[];
  certificates?: any[];
  employees?: number;
}

interface ClientContentProps {
  companyData: ManufacturerData;
}

export default function ClientContent({ companyData }: ClientContentProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="overview" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-gray-900 border border-gray-800 rounded-lg p-1 w-full grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger 
            value="overview" 
            className={`rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 data-[state=active]:shadow-sm px-3 py-1.5 text-sm font-medium transition-all border border-transparent`}
          >
            <Building className="w-4 h-4 mr-2" />
            회사 정보
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            className={`rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 data-[state=active]:shadow-sm px-3 py-1.5 text-sm font-medium transition-all border border-transparent`}
          >
            <Package className="w-4 h-4 mr-2" />
            제품 정보
          </TabsTrigger>
          <TabsTrigger 
            value="posts" 
            className={`rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 data-[state=active]:shadow-sm px-3 py-1.5 text-sm font-medium transition-all border border-transparent`}
          >
            <FileText className="w-4 h-4 mr-2" />
            뉴스/게시물
          </TabsTrigger>
          <TabsTrigger 
            value="certificates" 
            className={`rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 data-[state=active]:shadow-sm px-3 py-1.5 text-sm font-medium transition-all border border-transparent`}
          >
            <Award className="w-4 h-4 mr-2" />
            인증 정보
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <CompanyInfo companyData={companyData} />
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <ProductList products={companyData.products || []} />
        </TabsContent>
        
        <TabsContent value="posts" className="mt-6">
          <PostList posts={companyData.posts || []} />
        </TabsContent>
        
        <TabsContent value="certificates" className="mt-6">
          <CertificateList certificates={companyData.certificates || []} />
        </TabsContent>
      </Tabs>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {companyData.established && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
              {companyData.established}년 설립
            </Badge>
          )}
          
          {companyData.country_id && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
              {getCountryName(companyData.country_id)}
            </Badge>
          )}
          
          {companyData.business_type && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
              {companyData.business_type}
            </Badge>
          )}
          
          {companyData.employees && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
              직원수: {companyData.employees}
            </Badge>
          )}

          {companyData.product_category && !Array.isArray(companyData.product_category) && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
              {getFirstCategory(companyData.product_category)}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get country name from ID
function getCountryName(countryId: number): string {
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
}

// Helper function to get first category from product_category string
function getFirstCategory(productCategory: string): string {
  try {
    // Try parsing as JSON
    const parsed = JSON.parse(productCategory);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed[0];
    }
    if (typeof parsed === 'object' && parsed.categories && Array.isArray(parsed.categories) && parsed.categories.length > 0) {
      return parsed.categories[0];
    }
    return '기타 제품';
  } catch (e) {
    // If not JSON, split by commas and take first
    return productCategory.split(',')[0].trim();
  }
}
