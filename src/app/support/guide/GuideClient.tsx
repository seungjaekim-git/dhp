"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// LED Driver IC 제품 데이터
const ledDriverProducts = [
  {
    id: "1",
    name: "DH-2000 시리즈",
    type: "벅 컨버터",
    inputVoltage: "12-24V", 
    outputCurrent: "350-1000mA",
    features: [
      "고효율 DC-DC 컨버터",
      "과열 보호",
      "과전류 보호",
      "디밍 제어 지원"
    ],
    applications: [
      "실내조명",
      "상업용 조명", 
      "디스플레이 백라이트"
    ],
    price: "중",
    reliability: "상",
    performance: "중"
  },
  {
    id: "2",
    name: "DH-3000 시리즈",
    type: "부스트 컨버터",
    inputVoltage: "3.3-12V",
    outputCurrent: "500-1500mA",
    features: [
      "고전압 출력 지원",
      "PWM 디밍",
      "저노이즈 설계",
      "소형 패키지"
    ],
    applications: [
      "자동차 조명",
      "산업용 조명",
      "고출력 LED"
    ],
    price: "상",
    reliability: "상",
    performance: "상"
  },
  {
    id: "3",
    name: "DH-1000 시리즈",
    type: "벅 컨버터",
    inputVoltage: "9-16V",
    outputCurrent: "200-700mA",
    features: [
      "저비용 설계",
      "기본적인 보호회로",
      "간단한 디밍"
    ],
    applications: [
      "가정용 조명",
      "장식용 조명",
      "비상등"
    ],
    price: "하",
    reliability: "중",
    performance: "중"
  }
];

// 제품 카드 컴포넌트
const ProductCard = ({ product }: { product: any }) => (
  <Card className="w-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="text-sm text-muted-foreground">{product.type}</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <p className="font-medium">입력 전압: {product.inputVoltage}</p>
          <p className="font-medium">출력 전류: {product.outputCurrent}</p>
        </div>
        
        <div>
          <p className="font-medium mb-2">주요 특징:</p>
          <ul className="list-disc list-inside text-sm">
            {product.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium mb-2">응용 분야:</p>
          <ul className="list-disc list-inside text-sm">
            {product.applications.map((app: string, index: number) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">가격</p>
            <p className="font-medium">{product.price}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">안정성</p>
            <p className="font-medium">{product.reliability}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">성능</p>
            <p className="font-medium">{product.performance}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function GuideClient() {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 필터링
  const filteredProducts = ledDriverProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">LED Driver IC 제품 선택 가이드</h1>
        <p className="text-muted-foreground">
          고객의 요구사항에 맞는 최적의 LED Driver IC를 선택하실 수 있도록 도와드립니다.
        </p>
      </div>

      <Tabs defaultValue="usage" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usage">용도별 선택</TabsTrigger>
          <TabsTrigger value="product">제품별 선택</TabsTrigger>
          <TabsTrigger value="value">가치기준 선택</TabsTrigger>
        </TabsList>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>용도별 제품 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="font-bold">실내/상업용 조명</span>
                  <span className="text-sm text-muted-foreground">안정적인 성능과 디밍 제어가 필요한 경우</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="font-bold">산업/자동차 조명</span>
                  <span className="text-sm text-muted-foreground">고신뢰성과 고성능이 요구되는 경우</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="font-bold">가정/장식용 조명</span>
                  <span className="text-sm text-muted-foreground">경제적이고 기본적인 기능이 필요한 경우</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product">
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="제품명 또는 타입으로 검색..."
                className="pl-10"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="value">
          <Card>
            <CardHeader>
              <CardTitle>가치 기준 제품 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-bold">가격 중시</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ledDriverProducts
                        .filter(p => p.price === "하")
                        .map(product => (
                          <Button key={product.id} variant="outline" className="w-full justify-start">
                            {product.name}
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3 className="font-bold">안정성 중시</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ledDriverProducts
                        .filter(p => p.reliability === "상")
                        .map(product => (
                          <Button key={product.id} variant="outline" className="w-full justify-start">
                            {product.name}
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3 className="font-bold">성능 중시</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ledDriverProducts
                        .filter(p => p.performance === "상")
                        .map(product => (
                          <Button key={product.id} variant="outline" className="w-full justify-start">
                            {product.name}
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
