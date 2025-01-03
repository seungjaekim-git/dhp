import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ExternalLink, MapPin, Building2 } from "lucide-react";

export const CompanySidebar = ({ companyData }: { companyData: any }) => (
  <div className="lg:w-[300px] sticky top-6 space-y-4">
    <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all">
      <Mail className="w-4 h-4" /> 문의하기
    </Button>
    {companyData.website && (
      <Button variant="outline" className="w-full gap-2 hover:bg-gray-50">
        <ExternalLink className="w-4 h-4" /> 웹사이트 방문
      </Button>
    )}
    <Card className="bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300">
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
      <Card className="bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300">
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
);
