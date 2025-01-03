import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Link2, DollarSign, Factory, Component } from "lucide-react";


export const CompanyInfo = ({ companyData }: { companyData: any }) => (
  <div>
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <CardInfo title="주요 제품" icon={<Component className="w-4 h-4 text-blue-500" />} value={companyData.main_products} />
      <CardInfo title="연간 매출" icon={<DollarSign className="w-4 h-4 text-green-500" />} value={companyData.annual_revenue || "비공개"} />
      <CardInfo title="사업 분야" icon={<Factory className="w-4 h-4 text-purple-500" />} value={companyData.business_type || "비공개"} />
    </div>
    <Card className="mb-6 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>회사 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <Section title="회사 개요" content={companyData.company_overview} />
            <Separator />
            <Section title="사업 개요" content={companyData.business_overview} />
            <Separator />
            <ContactInfo emails={companyData.emails} phones={companyData.phones} website={companyData.website} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
);

const CardInfo = ({ title, icon, value }: { title: string; icon: React.ReactNode; value: string }) => (
  <Card className="bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-xl font-semibold">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </CardContent>
  </Card>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="font-semibold mb-3 text-lg">{title}</h3>
    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);

const ContactInfo = ({ emails, phones, website }: { emails?: string[]; phones?: string[]; website?: string }) => (
  <div>
    <h3 className="font-semibold mb-3 text-lg">연락처 정보</h3>
    <div className="space-y-2">
      {emails?.map((email, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          {email}
        </div>
      ))}
      {phones?.map((phone, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          {phone}
        </div>
      ))}
      {website && (
        <div className="flex items-center gap-2 text-gray-600">
          <Link2 className="w-4 h-4" />
          {website}
        </div>
      )}
    </div>
  </div>
);