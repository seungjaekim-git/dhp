// app/products/[id]/page.tsx (서버 컴포넌트)
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/supabase-client";
import { Download, FileText, ShoppingCart, ChevronRight, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductParametersCard } from "../../components/ProductParametersCard";
import { AlertCircle } from "lucide-react";

// 메타데이터를 동적으로 생성
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const productId = params.id;
  const allProducts = await getAllProducts();
  const product = allProducts.find(p => p.id.toString() === productId);
  
  if (!product) {
    return {
      title: "제품을 찾을 수 없음",
      description: "요청하신 제품을 찾을 수 없습니다.",
    };
  }
  
  return {
    title: `${product.name} | ${product.manufacturer_name} | DHP`,
    description: product.description || `${product.manufacturer_name}의 ${product.name} 제품 상세 정보 및 기술 사양`,
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const allProducts = await getAllProducts();
  return allProducts.map(product => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const allProducts = await getAllProducts();
  const product = allProducts.find(p => p.id.toString() === productId);
  
  if (!product) {
    notFound();
  }

  // 관련 제품 - 같은 카테고리의 다른 제품
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
    
  // 제품 파라미터 그룹화
  const paramGroups = product.parameters ? Object.entries(product.parameters)
    .reduce((groups: Record<string, Record<string, any>>, [key, value]) => {
      const [groupName, paramName] = key.includes(':') 
        ? key.split(':', 2) 
        : ['기본 사양', key];
      
      if (!groups[groupName]) {
        groups[groupName] = {};
      }
      
      groups[groupName][paramName] = value;
      return groups;
    }, {}) : {};

  return (
    <div className="space-y-6">
      {/* 제품 헤더 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 제품 이미지 */}
        <div className="lg:col-span-1">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>이미지가 없습니다</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                {product.category}
              </Badge>
            </div>
            
            {product.stock_status && (
              <Badge className={
                product.stock_status === "재고 있음" 
                  ? "bg-green-500/10 text-green-300 border-green-500/20" 
                  : "bg-amber-500/10 text-amber-300 border-amber-500/20"
              }>
                {product.stock_status}
              </Badge>
            )}
          </div>
        </div>
        
        {/* 제품 정보 */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <Link href="/products/list" className="hover:text-blue-400">제품</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href={`/products/list?category=${product.category}`} className="hover:text-blue-400">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-500 truncate">{product.name}</span>
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center mt-1">
              <Link 
                href={`/products/manufacturers/${product.manufacturer_id}`}
                className="text-blue-400 hover:underline"
              >
                {product.manufacturer_name}
              </Link>
              <div className="text-gray-500 flex items-center ml-2">
                <span className="font-mono text-sm">{product.partNumber}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            {product.description || "제품 설명이 제공되지 않았습니다."}
          </p>
          
          {/* 응용 분야 */}
          {product.applications && product.applications.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">응용 분야</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app: string, index: number) => (
                  <Link key={index} href={`/products/list?application=${app}`}>
                    <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700">
                      {app}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50 mt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-gray-300">기술 지원 이용 가능</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-gray-300">샘플 요청 가능</span>
                </div>
                {product.datasheet_url && (
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">데이터시트 제공</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  견적 요청
                </Button>
                
                {product.datasheet_url && (
                  <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    데이터시트
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 제품 상세 정보 탭 */}
      <Tabs defaultValue="specs" className="mt-10">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="specs" className="data-[state=active]:bg-gray-800">
            기술 사양
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-gray-800">
            자료
          </TabsTrigger>
          <TabsTrigger value="related" className="data-[state=active]:bg-gray-800">
            관련 제품
          </TabsTrigger>
        </TabsList>
        
        {/* 기술 사양 탭 내용 */}
        <TabsContent value="specs" className="mt-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>제품 사양</CardTitle>
              <CardDescription>
                {product.name}의 상세 기술 사양 및 파라미터
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>로딩 중...</div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(paramGroups).length > 0 ? (
                    Object.entries(paramGroups).map(([groupName, params]) => (
                      <ProductParametersCard 
                        key={groupName} 
                        title={groupName} 
                        parameters={params} 
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center p-8 border border-dashed border-gray-800 rounded-lg">
                      <div className="text-center">
                        <AlertCircle className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">이 제품에 대한 기술 사양이 제공되지 않았습니다.</p>
                        <p className="text-sm text-gray-500 mt-1">자세한 정보는 제조사 웹사이트를 참조하거나 영업팀에 문의하세요.</p>
                      </div>
                    </div>
                  )}
                </div>
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 자료 탭 내용 */}
        <TabsContent value="resources" className="mt-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>제품 자료</CardTitle>
              <CardDescription>
                데이터시트, 매뉴얼 및 추가 자료
              </CardDescription>
            </CardHeader>
            <CardContent>
              {product.datasheet_url ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-blue-400 mr-3" />
                      <div>
                        <p className="font-medium">{product.name} 데이터시트</p>
                        <p className="text-sm text-gray-400">PDF 문서</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="border-gray-800 text-gray-300 hover:bg-gray-800">
                      <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        다운로드
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center">
                      <Globe className="h-6 w-6 text-green-400 mr-3" />
                      <div>
                        <p className="font-medium">{product.manufacturer_name} 제품 페이지</p>
                        <p className="text-sm text-gray-400">제조사 웹사이트</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="border-gray-800 text-gray-300 hover:bg-gray-800">
                      <a href={`https://www.example.com/products/${product.partNumber}`} target="_blank" rel="noopener noreferrer">
                        <ChevronRight className="h-4 w-4" />
                        방문
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 border border-dashed border-gray-800 rounded-lg">
                  <div className="text-center">
                    <AlertCircle className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">이 제품에 대한 자료가 아직 제공되지 않았습니다.</p>
                    <p className="text-sm text-gray-500 mt-1">자세한 정보는 제조사 웹사이트를 참조하거나 영업팀에 문의하세요.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 관련 제품 탭 내용 */}
        <TabsContent value="related" className="mt-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>관련 제품</CardTitle>
              <CardDescription>
                {product.category} 카테고리의 유사 제품
              </CardDescription>
            </CardHeader>
            <CardContent>
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <Link key={relatedProduct.id} href={`/products/detail/${relatedProduct.id}`}>
                      <div className="border border-gray-800 rounded-lg p-4 hover:bg-gray-800/50 transition-colors group">
                        <div className="relative aspect-square rounded overflow-hidden bg-gray-800 mb-3">
                          {relatedProduct.image ? (
                            <Image
                              src={relatedProduct.image}
                              alt={relatedProduct.name}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-gray-600" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-gray-200 group-hover:text-blue-400 truncate">
                          {relatedProduct.name}
                        </h3>
                        
                        <p className="text-sm text-gray-400 mt-1">
                          {relatedProduct.manufacturer_name}
                        </p>
                        
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
                            {relatedProduct.category}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 border border-dashed border-gray-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-400">관련 제품이 없습니다.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
