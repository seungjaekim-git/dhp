'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Search, Plus, Minus, ArrowRight, Cpu, Building2, Users, Globe, Check } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';
import categoryData from './productCategory';

// 검색 입력 컴포넌트
export const SearchInput = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (value: string) => void }) => (
  <div className="relative">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="카테고리 검색"
      className="pl-10 h-10 text-sm rounded-lg bg-background/60 backdrop-blur-sm border-secondary/20 focus:border-primary/50"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

// 제조사 카드 컴포넌트
export const ManufacturerCard = ({ manufacturer }: { manufacturer: string }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        href={`/manufacturers/${manufacturer.toLowerCase()}`}
        className="inline-flex items-center px-3 py-2 rounded-lg border border-blue-100 hover:border-blue-200 text-sm hover:text-primary transition-all hover:shadow-lg hover:-translate-y-0.5"
      >
        <Building2 className="h-4 w-4 mr-2" />
        <span>{manufacturer}</span>
      </Link>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-semibold">{manufacturer}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>2,500명+</span>
            </div>
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>대한민국</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">설립연도</span>
              <p>1990년</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">매출액</span>
              <p>2조 5천억</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h5 className="font-medium text-sm">주요 제품군</h5>
          <div className="flex flex-wrap gap-1">
            {["반도체", "센서", "전자부품"].map((item, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="w-full group" asChild>
            <Link href={`/manufacturers/${manufacturer.toLowerCase()}`}>
              자세히 보기
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full group" asChild>
            <Link href={`/products/manufacturer/${manufacturer.toLowerCase()}`}>
              제품 보기
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

// 서브카테고리 아이템 컴포넌트
export const SubcategoryItem = ({ category, subcat }: { category: any, subcat: any }) => (
  <div className="space-y-3">
    <Button
      variant="ghost"
      className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground hover:text-primary group"
      onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}`}
    >
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      <span>{subcat.name}</span>
    </Button>
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pl-6">
      {subcat.items.map((item, itemIndex) => (
        <Button
          key={itemIndex}
          variant="outline"
          className="w-full h-auto py-2.5 px-3 text-sm font-medium text-center whitespace-normal bg-gradient-to-br from-white to-gray-50/50 border-blue-100 hover:border-blue-200 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}/${item}`}
        >
          {item}
        </Button>
      ))}
    </div>
  </div>
);

// 메인 페이지 컴포넌트
export const ProductCategoryPage = () => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState({
      priceRange: [0, 1000000],
      brand: [],
      sortBy: 'popularity'
    });
    const [open, setOpen] = useState(false);

  // 필터링 로직
  const filteredCategories = categoryData.map(category => {
    const filteredSubcategories = category.subcategories.filter(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(sub => ({
      ...sub,
      items: sub.items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }));

    if (filteredSubcategories.length > 0 || category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return {
        ...category,
        subcategories: filteredSubcategories
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-gradient-to-br from-white to-gray-50/50 border-blue-100 p-6 shadow-lg backdrop-blur-sm sticky top-20"
          >
            <div className="mb-6">
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {/* 카테고리 목록 */}
            <ScrollArea className="h-[calc(100vh-15rem)]">
              {/* 전체 카테고리 */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setExpandedCategories([]);
                  }}
                  className="flex items-center justify-between w-full text-left hover:text-primary transition-colors"
                >
                  <span className="font-medium">전체 카테고리</span>
                </button>
              </div>

              {filteredCategories.map((category) => (
                <div key={category.id} className="mb-4">
                  <button
                    onClick={() => {
                      setExpandedCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      );
                      setSelectedCategory(category.id);
                    }}
                    className="flex items-center justify-between w-full text-left hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{category.name}</span>
                    {expandedCategories.includes(category.id) ? (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategories.includes(category.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-4 space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                              <button
                                onClick={() => {
                                  setExpandedSubcategories(prev =>
                                    prev.includes(subcategory.id)
                                      ? prev.filter(id => id !== subcategory.id)
                                      : [...prev, subcategory.id]
                                  );
                                }}
                                className="flex items-center justify-between w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <span>{subcategory.name}</span>
                                {expandedSubcategories.includes(subcategory.id) ? (
                                  <Minus className="h-3 w-3" />
                                ) : (
                                  <Plus className="h-3 w-3" />
                                )}
                              </button>
                              
                              <AnimatePresence>
                                {expandedSubcategories.includes(subcategory.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-1 ml-4 space-y-1">
                                      {subcategory.items.map((item, index) => (
                                        <Link
                                          key={index}
                                          href="#"
                                          className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </ScrollArea>
          </motion.div>
        </div>

       {/* 메인 컨텐츠 영역 */}
       <div className="lg:col-span-3 w-full">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedCategory 
                ? categoryData.find(c => c.id === selectedCategory)?.name
                : '전체 카테고리'}
            </h2>
          </div>

          <AnimatePresence>
            <div className="grid gap-6">
              {(selectedCategory 
                ? filteredCategories.filter(c => c?.id === selectedCategory)
                : filteredCategories
              ).map((category) => {
                if (!category) return null;
                return (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-xl border bg-gradient-to-br from-white to-gray-50/50 border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-2 group"
                          onClick={() => window.location.href = `/products/list/${category.id}`}
                        >
                          <Cpu className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold tracking-tight">{category.name}</h3>
                          <Badge variant="secondary" className="ml-2 px-2 py-0.5">{category.count}</Badge>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <div className="flex items-center w-full sm:w-auto">
                            <div className="h-[1px] flex-grow bg-blue-100 w-12 mr-2" />
                            <span className="text-sm text-muted-foreground whitespace-nowrap">제조사 모음</span>
                            <div className="h-[1px] flex-grow bg-blue-100 w-12 ml-2" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.manufacturers?.map((manufacturer, idx) => (
                              <ManufacturerCard key={idx} manufacturer={manufacturer} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Separator className="bg-blue-100" />
                      <div className="space-y-6">
                        {category.subcategories.map((subcat, index) => (
                          <SubcategoryItem key={index} category={category} subcat={subcat} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}