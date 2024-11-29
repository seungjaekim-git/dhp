'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Search, Plus, Minus, Zap, Cable, Eye, Battery, ArrowRight, Cpu, Building2, Users, Globe, Check } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';
import categoryData from './productCategory';

// 네비게이션 컴포넌트
export const Navigation = () => (
  <nav className="flex items-center space-x-3 mb-8">
    <Home className="h-4 w-4 text-primary" />
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    <span className="text-base font-medium">카테고리</span>
  </nav>
);

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

// 정렬 필터 컴포넌트
export const SortFilter = ({ open, setOpen, selectedFilters, setSelectedFilters }: { open: boolean, setOpen: (value: boolean) => void, selectedFilters: { sortBy: string }, setSelectedFilters: (value: { sortBy: string }) => void }) => (
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full sm:w-[200px] h-9 justify-between"
      >
        {selectedFilters.sortBy === 'popularity' && "인기순"}
        {selectedFilters.sortBy === 'recent' && "최신순"}
        {selectedFilters.sortBy === 'price-low' && "가격 낮은순"}
        {selectedFilters.sortBy === 'price-high' && "가격 높은순"}
        <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="정렬 기준 검색..." />
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        <CommandGroup>
          {[
            { value: 'popularity', label: '인기순' },
            { value: 'recent', label: '최신순' },
            { value: 'price-low', label: '가격 낮은순' },
            { value: 'price-high', label: '가격 높은순' }
          ].map(option => (
            <CommandItem
              key={option.value}
              onSelect={() => {
                setSelectedFilters({...selectedFilters, sortBy: option.value});
                setOpen(false);
              }}
            >
              <Check
                className={`mr-2 h-4 w-4 ${selectedFilters.sortBy === option.value ? "opacity-100" : "opacity-0"}`}
              />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
);

// 제조사 카드 컴포넌트
export const ManufacturerCard = ({ manufacturer }: { manufacturer: string }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        href={`/manufacturers/${manufacturer.toLowerCase()}`}
        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg border border-muted hover:border-primary text-xs sm:text-sm hover:text-primary transition-all"
      >
        <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
        <span>{manufacturer}</span>
      </Link>
    </HoverCardTrigger>
    <HoverCardContent className="w-[280px] sm:w-80">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-semibold">{manufacturer}</h4>
        </div>
        {/* 제조사 상세 정보 */}
      </div>
    </HoverCardContent>
  </HoverCard>
);

// 서브카테고리 아이템 컴포넌트
export const SubcategoryItem = ({ category, subcat }: { category: any, subcat: any }) => (
  <div className="space-y-2 sm:space-y-3">
    <Button
      variant="ghost"
      className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary group"
      onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}`}
    >
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
      <span>{subcat.name}</span>
    </Button>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 pl-4 sm:pl-6">
      {subcat.items.map((item, itemIndex) => (
        <Button
          key={itemIndex}
          variant="outline"
          className="w-full h-auto py-2 sm:py-2.5 px-2 sm:px-3 text-xs font-medium text-center whitespace-normal hover:bg-secondary/80 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200"
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
      <Navigation />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-gradient-to-br from-card to-secondary/10 p-6 shadow-lg backdrop-blur-sm sticky top-20"
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
                  className="flex items-center justify-between w-full text-left"
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
                    className="flex items-center justify-between w-full text-left"
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
                                className="flex items-center justify-between w-full text-left text-sm text-muted-foreground hover:text-primary"
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
                                          className="block text-xs text-muted-foreground hover:text-primary"
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
              {selectedCategory 
                ? categoryData.find(c => c.id === selectedCategory)?.name
                : '전체 카테고리'}
            </h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full sm:w-[200px] h-9 justify-between"
                >
                  {selectedFilters.sortBy === 'popularity' && "인기순"}
                  {selectedFilters.sortBy === 'recent' && "최신순"}
                  {selectedFilters.sortBy === 'price-low' && "가격 낮은순"}
                  {selectedFilters.sortBy === 'price-high' && "가격 높은순"}
                  <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="정렬 기준 검색..." />
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedFilters({...selectedFilters, sortBy: 'popularity'});
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedFilters.sortBy === 'popularity' ? "opacity-100" : "opacity-0"}`}
                      />
                      인기순
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setSelectedFilters({...selectedFilters, sortBy: 'recent'});
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedFilters.sortBy === 'recent' ? "opacity-100" : "opacity-0"}`}
                      />
                      최신순
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setSelectedFilters({...selectedFilters, sortBy: 'price-low'});
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedFilters.sortBy === 'price-low' ? "opacity-100" : "opacity-0"}`}
                      />
                      가격 낮은순
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setSelectedFilters({...selectedFilters, sortBy: 'price-high'});
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedFilters.sortBy === 'price-high' ? "opacity-100" : "opacity-0"}`}
                      />
                      가격 높은순
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <AnimatePresence>
            <div className="grid gap-4 sm:gap-6">
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
                    className="p-4 sm:p-6 rounded-xl border bg-card hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-2 hover:border hover:border-primary"
                          onClick={() => window.location.href = `/products/list/${category.id}`}
                        >
                          <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          <h3 className="text-sm sm:text-base font-bold tracking-tight">{category.name}</h3>
                          <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">{category.count}</Badge>
                        </Button>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <div className="flex items-center w-full sm:w-auto">
                            <div className="h-[1px] flex-grow bg-border w-8 sm:w-12 mr-2" />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">제조사 모음</span>
                            <div className="h-[1px] flex-grow bg-border w-8 sm:w-12 ml-2" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.manufacturers?.map((manufacturer, idx) => (
                              <HoverCard key={idx}>
                                <HoverCardTrigger asChild>
                                  <Link
                                    href={`/manufacturers/${manufacturer.toLowerCase()}`}
                                    className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg border border-muted hover:border-primary text-xs sm:text-sm hover:text-primary transition-all"
                                  >
                                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                                    <span>{manufacturer}</span>
                                  </Link>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-[280px] sm:w-80">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                      <Building2 className="h-5 w-5 text-primary" />
                                      <h4 className="text-sm font-semibold">{manufacturer}</h4>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center text-xs sm:text-sm">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>직원수: 2,500명+</span>
                                      </div>
                                      <div className="flex items-center text-xs sm:text-sm">
                                        <Globe className="h-4 w-4 mr-2" />
                                        <span>본사: 대한민국</span>
                                      </div>
                                      <div className="text-xs sm:text-sm">
                                        <h5 className="font-medium mb-1">주요 생산품</h5>
                                        <p className="text-muted-foreground">반도체, 전자부품, 센서류</p>
                                      </div>
                                      <div className="text-xs sm:text-sm">
                                        <h5 className="font-medium mb-1">주요 연혁</h5>
                                        <ul className="text-muted-foreground space-y-1">
                                          <li>2020: 글로벌 혁신상 수상</li>
                                          <li>2018: ISO 9001 인증</li>
                                        </ul>
                                      </div>
                                      <div className="flex space-x-2 pt-2">
                                        <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" asChild>
                                          <Link href="/company-website" target="_blank">
                                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                            웹사이트
                                          </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" asChild>
                                          <Link href="/partners">
                                            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                            파트너사
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Separator className="bg-muted/60" />
                      <div className="space-y-4 sm:space-y-6">
                        {category.subcategories.map((subcat, index) => (
                          <div key={index} className="space-y-2 sm:space-y-3">
                            <Button
                              variant="ghost"
                              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary group"
                              onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}`}
                            >
                              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                              <span>{subcat.name}</span>
                            </Button>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 pl-4 sm:pl-6">
                              {subcat.items.map((item, itemIndex) => (
                                <Button
                                  key={itemIndex}
                                  variant="outline"
                                  className="w-full h-auto py-2 sm:py-2.5 px-2 sm:px-3 text-xs font-medium text-center whitespace-normal hover:bg-secondary/80 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200"
                                  onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}/${item}`}
                                >
                                  {item}
                                </Button>
                              ))}
                            </div>
                          </div>
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