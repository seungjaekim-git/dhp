import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Cpu, ShoppingCart, Bookmark, Building2, ExternalLink, Share2, FileText, Zap, Maximize2, Sliders, Clock, Download, File, Layers, PanelRight, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for client components
const PDFViewer = dynamic(() => import('./components/PDFViewer'), { ssr: false });
const MarkdownRenderer = dynamic(() => import('./components/MarkdownRenderer'), { ssr: false });
const BookmarkButton = dynamic(() => import('./components/BookmarkButton'), { ssr: false });
const QuoteButton = dynamic(() => import('./components/QuoteButton'), { ssr: false });

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

import { supabase } from '@/lib/supabase-client';
import { getAllProducts, getManufacturerById } from '@/lib/supabase-client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';

// Import types
import { Product, Manufacturer, Document, DocumentType } from '@/types';

// Import local components
import ProductSpecifications from './components/ProductSpecifications';

// Metadata 생성
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const products = await getAllProducts();
  const product = products.find(p => p.id === Number(params.id));

  if (!product) {
    return {
      title: '제품을 찾을 수 없습니다',
      description: '요청하신 제품을 찾을 수 없습니다.'
    };
  }

  return {
    title: `${product.name} | 대한플러스전자`,
    description: product.description || `${product.name} - 대한플러스전자(주)에서 제공하는 LED Driver IC`,
    openGraph: {
      images: product.image ? [product.image] : [],
    },
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map(product => ({
    id: String(product.id),
  }));
}

async function getProductDocuments(productId: number): Promise<Document[]> {
  const { data, error } = await supabase
    .from('product_documents')
    .select(`
      document_id,
      documents (
        id,
        title,
        url,
        type_id,
        document_types (
          id,
          name,
          category
        )
      )
    `)
    .eq('product_id', productId);
  
  if (error) {
    console.error('Error fetching product documents:', error);
    return [];
  }
  
  if (!data || data.length === 0) {
    return [];
  }
  
  return data.map(item => ({
    id: item.documents?.id || 0,
    title: item.documents?.title || '',
    url: item.documents?.url || '',
    type_id: item.documents?.type_id || 0,
    type: item.documents?.document_types?.name || 'Unknown'
  })) as Document[];
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const products = await getAllProducts();
  const product = products.find(p => p.id === Number(params.id)) as Product;

  if (!product) {
    notFound();
  }
  
  // Fetch manufacturer details to get logo
  let manufacturer: Manufacturer | null = null;
  if (product.manufacturer_id) {
    const manufacturerData = await getManufacturerById(product.manufacturer_id);
    if (manufacturerData) {
      manufacturer = manufacturerData;
    }
  }
  
  // Fetch product documents
  const documents = await getProductDocuments(product.id);
  
  // Add documents to product
  product.documents = documents;

  // LED Driver IC 사양 매핑 (영어 이름 -> 한국어 이름, 설명)
  const specificationMappings = {
    channels: {
      ko: "LED 채널 수",
      description: "LED 드라이버가 제어할 수 있는 독립 채널의 수입니다.",
      category: "기본 사양"
    },
    input_voltage: {
      ko: "입력 전압",
      description: "드라이버가 작동하는 입력 전압 범위입니다.",
      category: "전기적 특성"
    },
    output_voltage: {
      ko: "출력 전압",
      description: "드라이버가 출력할 수 있는 전압 범위입니다.",
      category: "전기적 특성"
    },
    output_current: {
      ko: "출력 전류",
      description: "드라이버가 제공할 수 있는 전류 범위입니다.",
      category: "전기적 특성"
    },
    current_accuracy: {
      ko: "전류 정확도",
      description: "드라이버의 전류 조절 정확도를 나타냅니다.",
      category: "전기적 특성"
    },
    operating_temperature: {
      ko: "동작 온도",
      description: "드라이버가 안정적으로 작동하는 온도 범위입니다.",
      category: "물리적 특성"
    },
    package_type: {
      ko: "패키지 타입",
      description: "IC의 물리적 패키지 형태입니다.",
      category: "물리적 특성"
    },
    thermal_pad: {
      ko: "써멀 패드",
      description: "열 방출을 위한 패드가 있는지 여부입니다.",
      category: "물리적 특성"
    },
    topology: {
      ko: "토폴로지",
      description: "드라이버의 전기적 구성 방식입니다.",
      category: "기본 사양"
    },
    dimming_method: {
      ko: "조광 방식",
      description: "LED 밝기를 조절하는 방식입니다.",
      category: "기본 사양"
    },
    switching_frequency: {
      ko: "스위칭 주파수",
      description: "드라이버의 스위칭 주파수 범위입니다.",
      category: "전기적 특성"
    },
    gray_scale_clock_frequency: {
      ko: "그레이스케일 클럭 주파수",
      description: "색상 그레이스케일을 제어하는 클럭 주파수입니다.",
      category: "통신 및 인터페이스"
    },
    data_clock_frequency: {
      ko: "데이터 클럭 주파수",
      description: "데이터 전송에 사용되는 클럭 주파수입니다.",
      category: "통신 및 인터페이스"
    },
    supply_package: {
      ko: "공급 패키지",
      description: "IC가 제공되는 패키지 유형입니다.",
      category: "물리적 특성"
    },
    package_case: {
      ko: "패키지/케이스",
      description: "IC의 케이스 타입입니다.",
      category: "물리적 특성"
    },
    mounting_type: {
      ko: "실장 유형",
      description: "IC를 PCB에 장착하는 방식입니다.",
      category: "물리적 특성"
    },
    internal_switch: {
      ko: "내부 스위치",
      description: "내부 스위칭 소자가 있는지 여부입니다.",
      category: "기본 사양"
    },
    transmission_interface: {
      ko: "전송 인터페이스",
      description: "데이터 전송을 위한 인터페이스입니다.",
      category: "통신 및 인터페이스"
    },
    led_matrix: {
      ko: "LED 매트릭스",
      description: "지원하는 LED 매트릭스 구성입니다.",
      category: "기본 사양"
    },
    communication_interface: {
      ko: "통신 인터페이스",
      description: "컨트롤러와의 통신을 위한 인터페이스입니다.",
      category: "통신 및 인터페이스"
    },
    pwm: {
      ko: "PWM 특성",
      description: "펄스 폭 변조 특성입니다.",
      category: "전기적 특성"
    },
    scan_design: {
      ko: "스캔 설계",
      description: "스캔 방식 설계 특성입니다.",
      category: "기본 사양"
    }
  };

  // 주요 스펙 필터링 (채널, 입력전압, 출력, 디밍 방식)
  const keySpecs = [
    'channels', 
    'input_voltage', 
    'output_current', 
    'output_voltage', 
    'dimming_method'
  ];

  // Get data sheet URL and other document types
  const dataSheetDoc = product.documents?.find(doc => 
    doc.title.toLowerCase().includes('datasheet') || 
    doc.type?.toLowerCase().includes('datasheet')
  );
  
  const dataSheetUrl = dataSheetDoc?.url || "#";
  const manufacturerWebsite = manufacturer?.website_url || 
    (product.manufacturer_name 
      ? `https://${product.manufacturer_name.toLowerCase().replace(/\s+/g, '')}.com` 
      : "#");
      
  // Group documents by type
  const documentsByType: Record<string, any[]> = {};
  product.documents?.forEach(doc => {
    const docType = doc.type || 'Other';
    if (!documentsByType[docType]) {
      documentsByType[docType] = [];
    }
    documentsByType[docType].push(doc);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* 히어로 섹션 - enhanced with background image */}
      <div className="relative bg-gradient-to-br from-blue-950 via-gray-950 to-gray-900 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Background image for the hero section */}
          <div className="absolute inset-0 bg-[url('/images/background_img.webp')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-gray-950/80 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10 bg-repeat z-5"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 px-4 md:px-8">
          {/* 브레드크럼 - updated with styling */}
          <div 
            className="flex items-center gap-2 text-base text-gray-300 mb-8"
          >
            <Link href="/" className="hover:text-blue-400 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4 text-blue-400/50" />
            <Link href="/products" className="hover:text-blue-400 transition-colors">제품</Link>
            <ChevronRight className="w-4 h-4 text-blue-400/50" />
            <Link href="/products/led-driver-ic" className="hover:text-blue-400 transition-colors">LED 드라이버 IC</Link>
            <ChevronRight className="w-4 h-4 text-blue-400/50" />
            <span className="font-medium text-blue-300">{product.name}</span>
          </div>

          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-3 mb-4">
              {/* Display manufacturer logo if available */}
              {manufacturer?.logo ? (
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                  <Image 
                    src={manufacturer.logo} 
                    alt={manufacturer.name || "Manufacturer logo"} 
                    width={40} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-blue-500/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-500/20">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-blue-500"></div>
                  <span className="text-blue-400 text-sm font-medium">LED DRIVER IC</span>
                </div>
                <h1 className="text-4xl font-bold text-white leading-tight">{product.name}</h1>
              </div>
            </div>
            
            {/* Add subtitle if available */}
            {product.subtitle && (
              <p className="text-xl text-gray-300 mb-4">{product.subtitle}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {product.part_number && (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border-none px-3 py-1">
                  Part No: {product.part_number}
                </Badge>
              )}
              {product.manufacturer_name && (
                <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-none px-3 py-1">
                  제조사: {product.manufacturer_name}
                </Badge>
              )}
              {product.parameters?.channels && (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 border-none px-3 py-1">
                  채널: {typeof product.parameters.channels === 'object' 
                    ? JSON.stringify(product.parameters.channels).replace(/[{}"]/g, '') 
                    : product.parameters.channels}
                </Badge>
              )}
              {product.parameters?.dimming_method && (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-300 border-none px-3 py-1">
                  디밍: {Array.isArray(product.parameters.dimming_method) 
                    ? product.parameters.dimming_method.join('/') 
                    : product.parameters.dimming_method}
                </Badge>
              )}
              {product.parameters?.topology && (
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border-none px-3 py-1">
                  토폴로지: {Array.isArray(product.parameters.topology) 
                    ? product.parameters.topology[0] 
                    : product.parameters.topology}
                </Badge>
              )}
            </div>
            
            {product.applications && product.applications.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">응용 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app: any, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-800"
                    >
                      {app.name || "Unknown Application"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4 md:px-8">
        {/* Main content - Action buttons and Tabs */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="w-full md:w-3/4 space-y-8">
            {/* 상세 정보 탭 - Updating the documents tab and enhancing markdown rendering */}
            <Tabs defaultValue="specifications" className="mb-8">
              <TabsList className="bg-gray-800/50 border-b border-gray-700 w-full justify-start rounded-none mb-8">
                <TabsTrigger 
                  value="specifications" 
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
                >
                  상세 사양
                </TabsTrigger>
                <TabsTrigger 
                  value="description"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
                >
                  제품 설명
                </TabsTrigger>
                <TabsTrigger 
                  value="documents"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 rounded-t-lg"
                >
                  관련 문서
                </TabsTrigger>
              </TabsList>
              
              {/* 상세 사양 탭 - No changes */}
              <TabsContent value="specifications">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                  <ProductSpecifications 
                    specifications={product.parameters}
                    mappings={specificationMappings}
                  />
                </div>
              </TabsContent>
              
              {/* 제품 설명 탭 - Enhanced markdown rendering */}
              <TabsContent value="description">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                  {product.description ? (
                    <div className="prose prose-invert prose-blue prose-lg max-w-none">
                      <MarkdownRenderer content={product.description} />
                    </div>
                  ) : (
                    <p className="text-gray-400">제품 설명이 제공되지 않았습니다.</p>
                  )}
                </div>
              </TabsContent>
              
              {/* 관련 문서 탭 - PDF preview */}
              <TabsContent value="documents">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">문서 목록</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.documents && product.documents.length > 0 ? (
                      product.documents.map((doc: any) => (
                        <Card key={doc.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg">
                                <FileText className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{doc.title}</h4>
                                <Button variant="link" className="p-0 h-auto text-blue-400" asChild>
                                  <Link href={doc.url} target="_blank">
                                    다운로드
                                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-400 col-span-2">이 제품에 대한 문서가 제공되지 않았습니다.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full md:w-1/4">
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-6 space-y-4">
                {product.image && (
                  <div className="flex justify-center mb-6">
                    <div className="w-40 h-40 flex items-center justify-center">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={140} 
                        height={140} 
                        className="object-contain max-h-32"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <BookmarkButton product={product} />
                  <QuoteButton product={product} />
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    제품 공유하기
                  </Button>
                </div>
                
                {manufacturer?.website_url && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 bg-transparent border-gray-700 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                    asChild
                  >
                    <Link href={manufacturer.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      제조사 웹사이트
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Related Products Section - No changes */}
        <div className="mt-16">
          <div className="flex flex-col items-start space-y-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-px w-12 bg-blue-500"></div>
              <span className="text-blue-400 text-sm font-medium">RELATED PRODUCTS</span>
            </div>
            <h2 className="text-2xl font-bold text-white">관련 제품</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => 
                p.id !== product.id && 
                p.manufacturer_id === product.manufacturer_id
              )
              .slice(0, 4)
              .map(relatedProduct => (
                <Link href={`/products/detail/${relatedProduct.id}`} key={relatedProduct.id}>
                  <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700 overflow-hidden h-full hover:border-blue-700 transition-colors">
                    <div className="p-4 flex items-center justify-center bg-gradient-to-b from-gray-800/50 to-gray-900/50 h-48">
                      {relatedProduct.image ? (
                        <Image 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name} 
                          width={140} 
                          height={140} 
                          className="object-contain max-h-[120px] hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Cpu className="w-16 h-16 text-gray-700" />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-1 truncate">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{relatedProduct.part_number || "Part Number 정보 없음"}</p>
                    </CardContent>
                  </Card>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
