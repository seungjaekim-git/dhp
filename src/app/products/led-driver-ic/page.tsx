import { getLEDDriverICs } from '@/lib/supabase-client';
import { ProductList } from './components/ProductList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cpu, ChevronRight, Zap, Lightbulb, CircuitBoard, Microchip } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function LEDDriverICPage() {
  const { products, filterOptions } = await getLEDDriverICs();

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            제품을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.
          </div>
        </div>
      </div>
    );
  }

  // Get unique manufacturers for the tabs
  const manufacturers = [...new Set(products
    .filter(p => p.manufacturers?.name)
    .map(p => p.manufacturers!.name)
  )].slice(0, 5); // Limit to top 5 manufacturers

  // Get unique applications from specifications.applications if it exists
  const applications = [...new Set(products
    .flatMap(p => {
      if (Array.isArray(p.specifications.applications)) {
        return p.specifications.applications.map((app: any) => 
          typeof app === 'object' && app.name ? app.name : app
        );
      }
      return [];
    })
  )].filter(Boolean).slice(0, 8); // Limit to top 8 applications, remove empty values

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Hero Section - Enhanced with background image and effects */}
      <div className="relative bg-gradient-to-br from-blue-950 via-gray-950 to-gray-900 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Background image for the hero section */}
          <div className="absolute inset-0 bg-[url('/images/background_img.webp')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-gray-950/80 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10 bg-repeat z-5"></div>
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-8">
            <Link href="/" className="hover:text-blue-400 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4 text-blue-400/50" />
            <Link href="/products" className="hover:text-blue-400 transition-colors">제품</Link>
            <ChevronRight className="w-4 h-4 text-blue-400/50" />
            <span className="font-medium text-blue-300">LED 드라이버 IC</span>
          </div>
          
          {/* Title and badges */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-500/20">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-px w-8 bg-blue-500"></div>
                    <span className="text-blue-400 text-sm font-medium">반도체 제품</span>
                  </div>
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    LED 드라이버 IC
                  </h1>
                </div>
              </div>
              
              <p className="max-w-2xl text-gray-300 md:text-lg mb-4">
                다양한 LED 드라이버 IC 제품을 검색하고, 상세 사양을 비교해보세요. 모든 제품은 데이터시트와 함께 제공됩니다.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-blue-500/10 text-blue-300 border-none px-3 py-1">고성능</Badge>
                <Badge className="bg-indigo-500/10 text-indigo-300 border-none px-3 py-1">고효율</Badge>
                <Badge className="bg-purple-500/10 text-purple-300 border-none px-3 py-1">다양한 토폴로지</Badge>
                <Badge className="bg-emerald-500/10 text-emerald-300 border-none px-3 py-1">정밀 제어</Badge>
              </div>
            </div>
            
            {/* Key Stat Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 w-full md:w-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-white mb-1">{products.length}+</div>
                <div className="text-xs text-gray-400">제품</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-white mb-1">{manufacturers.length}+</div>
                <div className="text-xs text-gray-400">제조사</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-white mb-1">{filterOptions.topologies?.length || 0}+</div>
                <div className="text-xs text-gray-400">토폴로지</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-white mb-1">{applications.length}+</div>
                <div className="text-xs text-gray-400">응용 분야</div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="bg-gray-800/50 border-b border-gray-700 w-full justify-start rounded-none mb-6">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
              >
                개요
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
              >
                응용 분야
              </TabsTrigger>
              <TabsTrigger 
                value="manufacturers" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
              >
                제조사
              </TabsTrigger>
              <TabsTrigger 
                value="topology" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
              >
                토폴로지
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">LED 드라이버 IC란?</h3>
                  <p className="text-gray-300 mb-4">
                    LED 드라이버 IC는 LED를 구동하기 위한 특수 설계된 집적 회로입니다. 이 IC들은 LED에 일정한 전류를 공급하고, 밝기를 조절하며, 다양한 애플리케이션에서 LED의 안정적인 작동을 보장합니다.
                  </p>
                  
                  <Accordion type="single" collapsible className="border-b border-gray-800">
                    <AccordionItem value="features" className="border-t border-gray-800 py-2">
                      <AccordionTrigger className="text-gray-300 hover:no-underline hover:text-white">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <span>주요 특징</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 pl-6">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>다양한 토폴로지 지원 (Buck, Boost, Buck-Boost 등)</li>
                          <li>정밀한 전류 제어 및 조절 기능</li>
                          <li>효율적인 전력 관리</li>
                          <li>온도 보호 및 과전류 보호 기능</li>
                          <li>다양한 디밍 방식 지원 (PWM, 아날로그)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="benefits" className="border-t border-gray-800 py-2">
                      <AccordionTrigger className="text-gray-300 hover:no-underline hover:text-white">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-400" />
                          <span>이점</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 pl-6">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>LED 수명 연장 및 안정적인 밝기 유지</li>
                          <li>에너지 효율 향상</li>
                          <li>다양한 LED 구성 지원</li>
                          <li>소형화된 설계로 공간 절약</li>
                          <li>비용 효율적인 LED 조명 솔루션</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="specifications" className="border-t border-gray-800 py-2">
                      <AccordionTrigger className="text-gray-300 hover:no-underline hover:text-white">
                        <div className="flex items-center gap-2">
                          <CircuitBoard className="w-4 h-4 text-blue-400" />
                          <span>주요 사양</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 pl-6">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>입력 전압 범위: 다양한 전압 지원 (3.3V ~ 60V)</li>
                          <li>출력 전류: 정밀한 전류 제어 (수 mA ~ 수 A)</li>
                          <li>효율: 최대 95% 이상의 변환 효율</li>
                          <li>토폴로지: Buck, Boost, Buck-Boost, 플라이백 등</li>
                          <li>PWM 디밍 해상도: 8-bit에서 16-bit까지</li>
                          <li>스위칭 주파수: 일반적으로 100kHz ~ 2MHz</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">제품 선택 가이드</h3>
                  <p className="text-gray-300 mb-4">
                    LED 드라이버 IC를 선택할 때는 응용 분야, 전압 및 전류 요구사항, 효율성, 디밍 방식 등을 고려해야 합니다. 아래 필터 섹션을 통해 특정 요구사항에 맞는 제품을 찾아보세요.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 text-sm font-medium mb-1">주요 고려사항</div>
                      <ul className="text-sm text-gray-400 space-y-1 list-inside list-disc">
                        <li>입력 전압 범위</li>
                        <li>출력 전류 요구사항</li>
                        <li>토폴로지 선택</li>
                        <li>디밍 방식</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 text-sm font-medium mb-1">일반적인 응용 분야</div>
                      <ul className="text-sm text-gray-400 space-y-1 list-inside list-disc">
                        <li>디스플레이 백라이트</li>
                        <li>자동차 조명</li>
                        <li>일반 조명</li>
                        <li>신호등 및 표시기</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-950/30 backdrop-blur-sm border border-blue-900/30 rounded-lg p-4">
                    <div className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                      <Microchip className="w-4 h-4" />
                      <span>기술 컨설팅 필요하신가요?</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      저희 전문가가 귀하의 프로젝트에 가장 적합한 LED 드라이버 IC를 선택하는 데 도움을 드립니다.
                    </p>
                    <Link href="/contact" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      지금 문의하기 →
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {applications.map((app, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-sm border border-gray-800 hover:border-blue-800/30 rounded-lg p-4 transition-all">
                    <div className="text-blue-300 text-lg font-medium mb-2">{app}</div>
                    <p className="text-sm text-gray-400">
                      {app}을 위한 LED 드라이버 IC 제품을 확인하세요.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="manufacturers" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {manufacturers.map((mfr, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-sm border border-gray-800 hover:border-blue-800/30 rounded-lg p-4 transition-all flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl font-medium text-blue-400">{mfr.charAt(0)}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium mb-1">{mfr}</div>
                      <p className="text-xs text-gray-400">
                        {mfr} 제품 보기
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="topology" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filterOptions.topologies?.map((topology, index) => (
                  <div key={index} className="bg-gray-800/20 backdrop-blur-sm border border-gray-800 hover:border-blue-800/30 rounded-lg p-4 transition-all">
                    <div className="text-blue-300 text-lg font-medium mb-2">{topology}</div>
                    <p className="text-sm text-gray-400">
                      {topology} 토폴로지 LED 드라이버 IC 제품을 확인하세요.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product List Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-start space-y-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium">제품 카탈로그</span>
          </div>
          <h2 className="text-2xl font-bold text-white">모든 제품 둘러보기</h2>
          <p className="text-gray-400 max-w-2xl">
            필터와 검색 기능을 활용하여 주요 제조사의 다양한 LED 드라이버 IC 제품을 확인하세요.
          </p>
        </div>

        <ProductList products={products} filterOptions={filterOptions} />
      </div>
    </div>
  );
} 