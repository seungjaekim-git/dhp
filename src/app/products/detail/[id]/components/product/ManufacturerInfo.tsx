import React from "react";
import { Globe, Building2, Calendar, Link2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Manufacturer } from "../../types/product";

interface ManufacturerInfoProps {
  manufacturer: Manufacturer;
}

export const ManufacturerInfo = ({ manufacturer }: ManufacturerInfoProps) => {
  // 국가 정보 안전하게 접근
  const countryName = manufacturer.countries?.name || 
                      manufacturer.headquarters?.split(',')?.[0]?.trim() || 
                      "정보 없음";
                      
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          {manufacturer.logo ? (
            <Avatar className="w-14 h-14 border-2 border-gray-100">
              <AvatarImage 
                src={manufacturer.logo} 
                alt={manufacturer.name} 
                className="object-contain p-1.5" 
              />
              <AvatarFallback className="text-lg font-bold bg-blue-100 text-blue-800">
                {manufacturer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-14 h-14 bg-blue-100 border-2 border-gray-100">
              <Building2 className="w-8 h-8 text-blue-600" />
            </Avatar>
          )}
          <div>
            <CardTitle className="text-xl">{manufacturer.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Globe className="w-4 h-4" />
              <span>{manufacturer.headquarters || countryName}</span>
              {manufacturer.business_type && (
                <Badge variant="outline" className="text-xs ml-1">
                  {manufacturer.business_type}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {manufacturer.company_overview && (
          <p className="text-sm text-gray-600">{manufacturer.company_overview}</p>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Calendar className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">설립일</p>
              <p className="text-sm font-medium">{manufacturer.established || "정보 없음"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Building2 className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">연간 매출</p>
              <p className="text-sm font-medium">{manufacturer.annual_revenue || "정보 없음"}</p>
            </div>
          </div>
        </div>

        {manufacturer.sales_markets && manufacturer.sales_markets.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {manufacturer.sales_markets.map((market, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                {market}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors" 
            onClick={() => window.open(manufacturer.website_url || manufacturer.linkedin_link, '_blank')}
          >
            <Link2 className="w-4 h-4 mr-1" />
            웹사이트
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors" 
            onClick={() => window.open(`/manufacturers/${manufacturer.id}`, '_blank')}
          >
            <Building2 className="w-4 h-4 mr-1" />
            회사정보
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 