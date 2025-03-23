"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Factory, Globe, Search, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Manufacturer {
  id: number;
  name: string;
  website_url?: string;
  country_id: number;
  logo?: string;
  established?: number;
  headquarters?: string;
  business_type?: string;
  company_overview?: string;
  business_overview?: string;
  product_category?: string;
  description?: string;
}

interface CountryMap {
  [key: number]: string;
}

export function PartnerList({ partners }: { partners: Manufacturer[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [filteredPartners, setFilteredPartners] = useState<Manufacturer[]>([]);

  // Map country_id to country names (simplified version)
  const countryMap: CountryMap = {
    1: "한국",
    3: "중국",
    12: "대만",
    13: "스위스",
    // Add more as needed
  };

  // Filter partners based on search term and selected country
  useEffect(() => {
    const filtered = partners.filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (partner.business_overview && partner.business_overview.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCountry = selectedCountry === null || partner.country_id === selectedCountry;
      return matchesSearch && matchesCountry;
    });
    setFilteredPartners(filtered);
  }, [searchTerm, selectedCountry, partners]);

  // Get unique countries from partners
  const countries = partners.reduce((acc: {id: number, name: string}[], partner) => {
    if (partner.country_id && !acc.some(c => c.id === partner.country_id)) {
      acc.push({
        id: partner.country_id,
        name: countryMap[partner.country_id] || `국가 ID: ${partner.country_id}`
      });
    }
    return acc;
  }, []);

  const PartnerCard = ({ partner }: { partner: Manufacturer }) => {
    const badgeText = partner.product_category
      ? typeof partner.product_category === 'string'
        ? partner.product_category.split(',')[0].trim()
        : '기타 제품'
      : '제품 정보 없음';

    return (
      <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 group cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center overflow-hidden">
              {partner.logo ? (
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={32} 
                  height={32} 
                  className="object-contain" 
                />
              ) : (
                <Building2 className="w-6 h-6 text-blue-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                {partner.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {countryMap[partner.country_id] || "지역 미상"}
              </div>
            </div>
          </div>
          
          {/* Display partner description */}
          {partner.description && (
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{partner.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {partner.product_category && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                {typeof partner.product_category === 'string' 
                  ? partner.product_category.split(',')[0].trim() 
                  : '제품 정보'}
              </Badge>
            )}
            
            {partner.established && (
              <Badge variant="outline" className="bg-gray-800 text-gray-400 border-gray-700">
                {partner.established}년 설립
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          <Input
            placeholder="파트너사 검색..."
            className="pl-10 h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCountry === null ? "default" : "outline"}
            onClick={() => setSelectedCountry(null)}
            className={
              selectedCountry === null
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-gray-800 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white"
            }
          >
            <Globe className="mr-2 h-4 w-4" />
            전체 국가
          </Button>
          {countries.map((country) => (
            <Button
              key={country.id}
              variant={selectedCountry === country.id ? "default" : "outline"}
              onClick={() => setSelectedCountry(country.id)}
              className={
                selectedCountry === country.id
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-gray-800 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white"
              }
            >
              <MapPin className="mr-2 h-4 w-4" />
              {country.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partner) => (
            <Link 
              key={partner.id}
              href={`/partners/${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="block h-full"
            >
              <PartnerCard partner={partner} />
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-500">
            <Building2 className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-gray-400">검색 결과가 없습니다</h3>
            <p className="text-sm text-gray-500">검색어를 변경하거나 필터를 초기화해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
