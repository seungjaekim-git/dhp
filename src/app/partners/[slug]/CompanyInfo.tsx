import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Link2, Factory, Component, Calendar, Building, Award, Globe2, Tag, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  year: string;
  event: string;
  category?: string;
}

interface ManufacturerData {
  id: number;
  name: string;
  website_url?: string;
  established?: number;
  headquarters?: string;
  business_type?: string;
  company_overview?: string;
  business_overview?: string;
  key_milestones?: Milestone[];
  emails?: string[];
  phones?: string[];
  products?: any[];
  product_category?: string;
}

export const CompanyInfo = ({ companyData }: { companyData: ManufacturerData }) => {
  return (
    <div>
      {/* Company Information Card */}
      <Card className="mb-6 bg-gray-900/70 border-gray-800 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            회사 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {companyData.company_overview && (
              <>
                <Section title="회사 개요" content={companyData.company_overview} />
                <Separator className="bg-gray-800" />
              </>
            )}
            
            {companyData.business_overview && (
              <>
                <Section title="사업 개요" content={companyData.business_overview} />
                <Separator className="bg-gray-800" />
              </>
            )}
            
            <ContactInfo 
              emails={companyData.emails} 
              phones={companyData.phones} 
              website={companyData.website_url} 
            />
            
            {/* Key Milestones Timeline */}
            {companyData.key_milestones && companyData.key_milestones.length > 0 && (
              <>
                <Separator className="bg-gray-800" />
                <div>
                  <h3 className="font-semibold mb-4 text-lg text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    주요 연혁
                  </h3>
                  
                  {/* Modern timeline with colored circles for different categories */}
                  <div className="relative space-y-8 pl-6 before:absolute before:inset-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-600 before:via-blue-400 before:to-blue-600 before:left-2 before:opacity-30">
                    {companyData.key_milestones.map((milestone, index) => (
                      <div key={index} className="relative">
                        {/* Colored circle based on category */}
                        <div className={`absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(milestone.category)}`}>
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 hover:border-blue-500/30 hover:bg-gray-900/90 transition-all ml-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-400 font-semibold text-lg">{milestone.year}</span>
                            {milestone.category && (
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                                {milestone.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-300">{milestone.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Function to get color based on milestone category
function getCategoryColor(category?: string): string {
  if (!category) return "bg-blue-500/20 border border-blue-500/50";
  
  const categoryMap: Record<string, string> = {
    "설립": "bg-green-500/20 border border-green-500/50",
    "기업 상장": "bg-purple-500/20 border border-purple-500/50",
    "기술 혁신": "bg-blue-500/20 border border-blue-500/50",
    "시장 평가": "bg-yellow-500/20 border border-yellow-500/50",
    "수상 및 인증": "bg-orange-500/20 border border-orange-500/50",
    "신제품 출시": "bg-cyan-500/20 border border-cyan-500/50",
    "시장 진출": "bg-indigo-500/20 border border-indigo-500/50",
    "사업 확장": "bg-emerald-500/20 border border-emerald-500/50",
    "기업 인수 및 합병": "bg-rose-500/20 border border-rose-500/50"
  };
  
  return categoryMap[category] || "bg-blue-500/20 border border-blue-500/50";
}

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="font-semibold mb-3 text-lg text-white flex items-center gap-2">
      {title === "회사 개요" ? <Building className="w-5 h-5 text-blue-400" /> : <Factory className="w-5 h-5 text-blue-400" />}
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);

const ContactInfo = ({ emails, phones, website }: { emails?: string[]; phones?: string[]; website?: string }) => (
  <div>
    <h3 className="font-semibold mb-3 text-lg text-white flex items-center gap-2">
      <Phone className="w-5 h-5 text-blue-400" />
      연락처 정보
    </h3>
    <div className="space-y-3">
      {emails?.map((email, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
          <Mail className="w-4 h-4 text-blue-400" />
          <a href={`mailto:${email}`} className="hover:underline">{email}</a>
        </div>
      ))}
      {phones?.map((phone, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-400">
          <Phone className="w-4 h-4 text-blue-400" />
          {phone}
        </div>
      ))}
      {website && (
        <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
          <Link2 className="w-4 h-4 text-blue-400" />
          <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {website.replace(/(^\w+:|^)\/\//, '')}
          </a>
        </div>
      )}
    </div>
  </div>
);