"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PARTNER_DATA } from "./PartnerData";
import Link from "next/link";

type FilterCategories = {
  "주요 제품 카테고리": Array<"LED 드라이버 IC" | "전원관리 IC" | "다이오드" | "수동소자" | "케이블&커넥터" | "센서" | "자동차 인증 부품">;
  "국가": string[];
  "인증": string[];
}

export const PartnerList = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterCategories>({
    "주요 제품 카테고리": [],
    "국가": [],
    "인증": []
  });

  const [openCategory, setOpenCategory] = useState<string>("");

  const filterOptions = {
    "주요 제품 카테고리": ["LED 드라이버 IC", "전원관리 IC", "다이오드", "수동소자", "케이블&커넥터", "센서", "자동차 인증 부품"],
    "국가": Array.from(new Set(PARTNER_DATA.map(partner => partner.country))),
    "인증": ["ISO 9001", "ISO 14001", "IATF 16949", "UL", "CE", "RoHS"]
  };

  const handleFilterSelect = (category: keyof FilterCategories, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const filteredPartners = PARTNER_DATA.filter(partner => {
    return (
      (selectedFilters["주요 제품 카테고리"].length === 0 || 
       partner.main_product_categories.some(cat => selectedFilters["주요 제품 카테고리"].includes(cat))) &&
      (selectedFilters["국가"].length === 0 || 
       selectedFilters["국가"].includes(partner.country))
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(filterOptions).map(([category, options]) => (
            <Popover
              key={category}
              open={openCategory === category}
              onOpenChange={() => setOpenCategory(openCategory === category ? "" : category)}
            >
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  className="w-full justify-between bg-white border-blue-100 hover:bg-blue-50"
                >
                  {category}
                  {selectedFilters[category as keyof FilterCategories].length > 0 && (
                    <Badge className="ml-2 bg-blue-100 text-blue-600">
                      {selectedFilters[category as keyof FilterCategories].length}
                    </Badge>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-blue-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder={`${category} 검색...`} className="h-9" />
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {options.map((option: string) => (
                      <CommandItem
                        key={option}
                        onSelect={() => handleFilterSelect(category as keyof FilterCategories, option)}
                        className="flex items-center gap-2"
                      >
                        <div className={cn(
                          "w-4 h-4 border rounded-sm flex items-center justify-center",
                          selectedFilters[category as keyof FilterCategories].includes(option) 
                            ? "bg-blue-600 border-blue-600" 
                            : "border-gray-300"
                        )}>
                          {selectedFilters[category as keyof FilterCategories].includes(option) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {Object.entries(selectedFilters).map(([category, values]) =>
            values.map((value) => (
              <Badge
                key={`${category}-${value}`}
                className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleFilterSelect(category as keyof FilterCategories, value)}
              >
                {value}
                <span className="ml-2 text-blue-400 hover:text-blue-600">×</span>
              </Badge>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <Link href={`/partners/${partner.name.toLowerCase()}`} key={partner.name}>
            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={partner.images.logo} 
                  alt={`${partner.name} logo`}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{partner.country}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {partner.company_overview}
              </p>

              <div className="space-y-2">
                {partner.key_milestones.slice(-3).reverse().map((milestone, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="text-blue-600 font-medium">{milestone.year}</span>
                    <span className="text-gray-600">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
