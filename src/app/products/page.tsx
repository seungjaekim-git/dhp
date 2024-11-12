'use client';

import { Component, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Search, Plus, Minus, Zap, Cable, Eye, Battery, ArrowRight, Cpu, Building2, Users, Globe } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';

const categoryData = [
  {
    id: 'led-driver',
    name: 'LED Driver IC',
    count: 324,
    manufacturers: ['Macroblock', 'Powtech', 'XLSEMI'],
    subcategories: [
      {
        name: 'DC-DC LED 드라이버',
        items: [
          '벅 컨버터 타입',
          '부스트 컨버터 타입',
          '벅-부스트 컨버터 타입',
          '정전류 제어형',
          '디밍 제어형'
        ]
      },
      {
        name: 'AC-DC LED 드라이버',
        items: [
          '단상 입력형',
          '삼상 입력형', 
          '역률 보정형',
          '절연형',
          '비절연형'
        ]
      },
      {
        name: 'LED 매트릭스 드라이버',
        items: [
          '정전류 매트릭스',
          'PWM 제어형',
          'RGB LED 컨트롤러',
          '디스플레이용 드라이버',
          '사이니지용 드라이버'
        ]
      }
    ],
  },
    {
      id: 'diode',
      name: '다이오드',
      count: 567,
      manufacturers: ['Zowie'],
      subcategories: [
        {
          name: '정류 다이오드',
          items: [
            '일반용 정류 다이오드',
            '고속 정류 다이오드',
            '브리지 정류기',
            '고전압용 정류기',
            '저전압용 정류기'
          ]
        },
        {
          name: '쇼트키 다이오드',
          items: [
            '저전압용 쇼트키',
            '고전압용 쇼트키',
            '듀얼 쇼트키',
            'SiC 쇼트키',
            '전력용 쇼트키'
          ]
        },
        {
          name: '제너 다이오드',
          items: [
            '저전압 제너',
            '고전압 제너',
            '정밀 제너',
            '가변 제너',
            '양방향 제너'
          ]
        },
        {
          name: 'TVS 다이오드',
          items: [
            '단방향 TVS',
            '양방향 TVS',
            '배열형 TVS',
            'ESD 보호용',
            '서지 보호용'
          ]
        }
      ]
    },
    {
      id: 'cable',
      name: '케이블',
      count: 289,
      manufacturers: ['LLT', 'Morethanall'],
      subcategories: [
        {
          name: '전원 케이블',
          items: [
            'AC 전원 케이블',
            'DC 전원 케이블',
            '고압 전력선',
            '차폐 전원 케이블',
            '태양광 케이블'
          ]
        },
        {
          name: '데이터 케이블',
          items: [
            'USB 케이블',
            'HDMI 케이블',
            'LAN 케이블',
            '동축 케이블',
            '시리얼 케이블'
          ]
        },
        {
          name: '광 케이블',
          items: [
            '싱글모드 광케이블',
            '멀티모드 광케이블',
            '리본형 광케이블',
            '방수형 광케이블',
            '군용 광케이블'
          ]
        },
        {
          name: '산업용 케이블',
          items: [
            '로봇용 케이블',
            '모터 케이블',
            '센서 케이블',
            '제어용 케이블',
            '내열/내한 케이블'
          ]
        }
      ]
    },
    {
      id: 'connector',
      name: '커넥터',
      count: 432,
      manufacturers: ['LLT', 'Morethanall'],
      subcategories: [
        {
          name: '원형 커넥터',
          items: [
            'M8 커넥터',
            'M12 커넥터',
            '군용 원형 커넥터',
            '방수 원형 커넥터',
            '푸시풀 커넥터'
          ]
        },
        {
          name: '보드 대 보드',
          items: [
            'BTB 커넥터',
            'FPC/FFC 커넥터',
            '메자닌 커넥터',
            '고속전송용 커넥터',
            '전원용 커넥터'
          ]
        },
        {
          name: 'RF 커넥터',
          items: [
            'SMA 커넥터',
            'BNC 커넥터',
            'N-Type 커넥터',
            'MCX/MMCX 커넥터',
            '동축 커넥터'
          ]
        },
        {
          name: '전원 커넥터',
          items: [
            'DC 전원 커넥터',
            'AC 전원 커넥터',
            'ATX 전원 커넥터',
            '배터리 커넥터',
            '산업용 전원 커넥터'
          ]
        }
      ]
    },
    {
      id: 'sensor',
      name: '센서',
      count: 678,
      manufacturers: ['Kube Electronics AG'],
      subcategories: [
        {
          name: '온도 센서',
          items: [
            '써미스터',
            'RTD 센서',
            '열전대',
            'IC 타입 온도센서',
            '적외선 온도센서'
          ]
        },
        {
          name: '압력 센서',
          items: [
            '피에조 저항형',
            '정전용량형',
            '광학식 압력센서',
            'MEMS 압력센서',
            '차압 센서'
          ]
        },
        {
          name: '가속도 센서',
          items: [
            '1축 가속도센서',
            '2축 가속도센서',
            '3축 가속도센서',
            'MEMS 가속도센서',
            '진동 센서'
          ]
        },
        {
          name: '근접 센서',
          items: [
            '정전용량형',
            '유도형',
            '광학식',
            '초음파식',
            '자기식'
          ]
        }
      ]
    },
    {
      id: 'passive',
      name: '수동소자',
      count: 892,
      subcategories: [
        {
          name: '저항기',
          items: [
            '칩 저항',
            '금속피막 저항',
            '와이어와운드 저항',
            'SMD 저항',
            '고정밀 저항'
          ]
        },
        {
          name: '커패시터',
          items: [
            '세라믹 커패시터',
            '전해 커패시터',
            '탄탈 커패시터',
            '필름 커패시터',
            'MLCC'
          ]
        },
        {
          name: '인덕터',
          items: [
            '칩 인덕터',
            '파워 인덕터',
            'SMD 인덕터',
            '페라이트 비드',
            'RF 인덕터'
          ]
        },
        {
          name: '변압기',
          items: [
            '전원용 변압기',
            '고주파 변압기',
            '펄스 변압기',
            '절연 변압기',
            'SMD 변압기'
          ]
        }
      ]
    },
    {
      id: 'power-ic',
      name: '전원관리 IC',
      count: 445,
      manufacturers: ['Macroblock', 'Powtech', 'XLSEMI'],
      subcategories: [
        {
          name: 'DC-DC 컨버터',
          items: [
            '벅 컨버터',
            '부스트 컨버터',
            '벅-부스트 컨버터',
            'POL 컨버터',
            '절연형 컨버터'
          ]
        },
        {
          name: '배터리 관리 IC',
          items: [
            '충전 컨트롤러',
            'BMS IC',
            '보호 IC',
            '연료게이지 IC',
            '밸런싱 IC'
          ]
        },
        {
          name: '전압 레귤레이터',
          items: [
            'LDO 레귤레이터',
            'PWM 컨트롤러',
            'PFC 컨트롤러',
            '선형 레귤레이터',
            '고전압 레귤레이터'
          ]
        },
        {
          name: '전원 모니터링 IC',
          items: [
            '전압 감시 IC',
            '전류 모니터 IC',
            '전력 미터링 IC',
            '시퀀서 IC',
            '서지 보호 IC'
          ]
        }
      ]
    }
];

const ProductCategoryPage = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 1000000],
    brand: [],
    sortBy: 'popularity'
  });

  const handleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubcategoryExpand = (subcategoryName: string) => {
    setExpandedSubcategories(prev =>
      prev.includes(subcategoryName)
        ? prev.filter(name => name !== subcategoryName)
        : [...prev, subcategoryName]
    );
  };

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
      <nav className="flex items-center space-x-3 mb-8">
        <Home className="h-4 w-4 text-primary" />
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-base font-medium">카테고리</span>
      </nav>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 사이드바 필터 */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-gradient-to-br from-card to-secondary/10 p-6 shadow-lg backdrop-blur-sm sticky top-20"
          >
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="카테고리 검색"
                  className="pl-10 h-10 text-sm rounded-lg bg-background/60 backdrop-blur-sm border-secondary/20 focus:border-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-3">
                {filteredCategories.map(category => (
                  <motion.div 
                    key={category.id} 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={`w-full justify-between p-3 h-auto rounded-lg`}
                        onClick={() => {
                          setSelectedCategory(selectedCategory === category.id ? null : category.id);
                          handleCategoryExpand(category.id);
                        }}
                      >
                        <span className="flex items-center">
                          <motion.div
                            animate={{ rotate: selectedCategory === category.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {selectedCategory === category.id ? 
                              <ChevronRight className="h-4 w-4 mr-2 rotate-90" /> : 
                              <ChevronRight className="h-4 w-4 mr-2" />
                            }
                          </motion.div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 px-2 py-0.5 text-xs`}>
                          {category.count}
                        </Badge>
                      </Button>
                    </motion.div>
                    
                    <AnimatePresence>
                      {selectedCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-8 space-y-2 overflow-hidden"
                        >
                          {category.subcategories.map((subcat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="rounded-lg overflow-hidden bg-background/40 backdrop-blur-sm"
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-between p-2 text-sm hover:bg-secondary/40"
                                onClick={() => handleSubcategoryExpand(subcat.name)}
                              >
                                {subcat.name}
                              </Button>
                              <AnimatePresence>
                                {expandedSubcategories.includes(subcat.name) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-4 space-y-1 py-2"
                                  >
                                    {subcat.items.map((item, itemIdx) => (
                                      <motion.div
                                        key={itemIdx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: itemIdx * 0.05 }}
                                      >
                                        <Button
                                          variant="link"
                                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                        >
                                          {item}
                                        </Button>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="lg:col-span-3">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight">
              {selectedCategory 
                ? categoryData.find(c => c.id === selectedCategory)?.name
                : '전체 카테고리'}
            </h2>
            <Select defaultValue="popularity">
              <SelectTrigger className="w-[200px] h-9">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">인기순</SelectItem>
                <SelectItem value="recent">최신순</SelectItem>
                <SelectItem value="price-low">가격 낮은순</SelectItem>
                <SelectItem value="price-high">가격 높은순</SelectItem>
              </SelectContent>
            </Select>
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
                    className="p-6 rounded-xl border bg-card hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-2 hover:border hover:border-primary"
                          onClick={() => window.location.href = `/products/list/${category.id}`}
                        >
                          <Cpu className="h-5 w-5 text-primary" />
                          <h3 className="text-base font-bold tracking-tight">{category.name}</h3>
                          <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">{category.count}</Badge>
                        </Button>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center">
                            <div className="h-[1px] flex-grow bg-border w-12 mr-2" />
                            <span className="text-xs text-muted-foreground">제조사 모음</span>
                            <div className="h-[1px] flex-grow bg-border w-12 ml-2" />
                          </div>
                          <div className="flex gap-2">
                            {category.manufacturers?.map((manufacturer, idx) => (
                              <HoverCard key={idx}>
                                <HoverCardTrigger asChild>
                                  <Link
                                    href={`/manufacturers/${manufacturer.toLowerCase()}`}
                                    className="inline-flex items-center px-3 py-1 rounded-lg border border-muted hover:border-primary text-sm hover:text-primary transition-all"
                                  >
                                    <Building2 className="h-4 w-4 mr-1.5" />
                                    <span>{manufacturer}</span>
                                  </Link>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                      <Building2 className="h-5 w-5 text-primary" />
                                      <h4 className="text-sm font-semibold">{manufacturer}</h4>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center text-sm">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>직원수: 2,500명+</span>
                                      </div>
                                      <div className="flex items-center text-sm">
                                        <Globe className="h-4 w-4 mr-2" />
                                        <span>본사: 대한민국</span>
                                      </div>
                                      <div className="text-sm">
                                        <h5 className="font-medium mb-1">주요 생산품</h5>
                                        <p className="text-muted-foreground">반도체, 전자부품, 센서류</p>
                                      </div>
                                      <div className="text-sm">
                                        <h5 className="font-medium mb-1">주요 연혁</h5>
                                        <ul className="text-muted-foreground space-y-1">
                                          <li>2020: 글로벌 혁신상 수상</li>
                                          <li>2018: ISO 9001 인증</li>
                                        </ul>
                                      </div>
                                      <div className="flex space-x-2 pt-2">
                                        <Button variant="outline" size="sm" className="w-full" asChild>
                                          <Link href="/company-website" target="_blank">
                                            <Globe className="h-4 w-4 mr-1" />
                                            웹사이트
                                          </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full" asChild>
                                          <Link href="/partners">
                                            <Users className="h-4 w-4 mr-1" />
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
                      <div className="space-y-6">
                        {category.subcategories.map((subcat, index) => (
                          <div key={index} className="space-y-3">
                            <Button
                              variant="ghost"
                              className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground hover:text-primary group"
                              onClick={() => window.location.href = `/products/list/${category.id}/${subcat.name}`}
                            >
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              <span>{subcat.name}</span>
                            </Button>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pl-6">
                              {subcat.items.map((item, itemIndex) => (
                                <Button
                                  key={itemIndex}
                                  variant="outline"
                                  className="w-full h-auto py-2.5 px-3 text-xs font-medium text-center whitespace-normal hover:bg-secondary/80 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200"
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
};

export default ProductCategoryPage;
