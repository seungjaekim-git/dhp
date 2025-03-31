import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Microchip, ChevronLeft, Download, ArrowUpRight, Bookmark, ShoppingCart, Check, Package, Layers, Gauge, Activity, Cpu, Grid, Copy, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { getAllProducts, getLEDDriverICs } from "@/lib/supabase-client";
import ProductsLayout from "@/app/products/ProductsLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const products = await getAllProducts();
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return {
      title: "제품을 찾을 수 없음 - DH Semiconductor",
      description: "요청하신 LED 드라이버 IC 제품을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${product.name} - LED 드라이버 IC - DH Semiconductor`,
    description: product.description || `${product.name} LED 드라이버 IC 제품 상세 정보`,
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const { products } = await getLEDDriverICs();
  
  return products.map((product) => ({
    id: String(product.id),
  }));
}

// 클라이언트 컴포넌트
function CopyButton({ value }: { value: string }) {
  "use client";
  
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "클립보드에 복사됨",
      description: "값이 클립보드에 복사되었습니다.",
      duration: 3000,
    });
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={copyToClipboard}
      className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
    >
      <Copy className="h-3.5 w-3.5" />
      <span className="sr-only">값 복사</span>
    </Button>
  );
}

// 스펙 아이템 컴포넌트
function SpecItem({ 
  title, 
  value, 
  copyable = false 
}: { 
  title: string; 
  value: string | null | undefined;
  copyable?: boolean;
}) {
  if (!value) return null;
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
      <span className="text-gray-400">{title}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-white">{value}</span>
        {copyable && <CopyButton value={value} />}
      </div>
    </div>
  );
}

// 스펙 그룹 컴포넌트
function SpecGroup({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

// 값이 존재하는지 확인하는 헬퍼 함수
const hasValue = (value: any) => value !== null && value !== undefined;

// 값 포맷팅 헬퍼 함수
const formatValue = (min: any, max: any, typ: any, unit: string = "") => {
  if (hasValue(typ)) return `${typ} ${unit}`.trim();
  if (hasValue(min) && hasValue(max)) return `${min} ~ ${max} ${unit}`.trim();
  if (hasValue(min)) return `최소 ${min} ${unit}`.trim();
  if (hasValue(max)) return `최대 ${max} ${unit}`.trim();
  return null;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const products = await getAllProducts();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const manufacturerName = product.manufacturer_name || "미상 제조사";
  const specs = product.parameters?.specifications || {};

  // 스펙 카드 컴포넌트
  const SpecCard = ({ title, value, icon }: { title: string, value: string | null, icon?: React.ReactNode }) => {
    if (!value) return null;
    
    return (
      <Card className="bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {icon}
            <div className="flex-1">
              <p className="text-gray-400 text-sm">{title}</p>
              <p className="text-white font-medium">{value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC", href: "/products/led-driver-ic" },
        { label: product.name },
      ]}
      description={`${manufacturerName}의 ${product.name} LED 드라이버 IC 제품 상세 정보입니다.`}
      badges={[
        {
          text: "LED 드라이버 IC",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
      ]}
    >
      <div className="space-y-8">
        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link href="/products/led-driver-ic" className="text-gray-400 hover:text-white inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            LED 드라이버 IC 목록으로 돌아가기
          </Link>
        </div>
        
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
                  <Microchip className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>이미지가 없습니다</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-950/40 text-blue-400 border-blue-900">
                LED 드라이버 IC
              </Badge>
              
              {specs.topology && (Array.isArray(specs.topology)
                ? specs.topology.map((t: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-blue-950/40 text-blue-400 border-blue-900">{t}</Badge>
                  ))
                : (
                    <Badge variant="outline" className="bg-blue-950/40 text-blue-400 border-blue-900">{specs.topology}</Badge>
                  )
              )}
            </div>
            
            <div className="mt-4 space-y-3">
              <Button variant="outline" className="w-full gap-2">
                <Bookmark className="h-4 w-4" />
                북마크 추가
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" />
                견적에 추가
              </Button>
              
              {product.datasheet_url && (
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    데이터시트 다운로드
                  </a>
                </Button>
              )}
              
              {product.manufacturer_id && (
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href={`/partners/${product.manufacturer_id}`}>
                    <ArrowUpRight className="h-4 w-4" />
                    제조사 정보
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* 제품 정보 */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-blue-400">{manufacturerName}</p>
              <h1 className="text-2xl font-bold mt-1 mb-2">{product.name}</h1>
              {product.part_number && (
                <div className="flex items-center">
                  <p className="text-gray-400">부품 번호: <span className="font-mono">{product.part_number}</span></p>
                  <CopyButton value={product.part_number} />
                </div>
              )}
              
              {product.description && (
                <div className="mt-4 text-gray-300">
                  <p className="whitespace-pre-line">{product.description}</p>
                </div>
              )}
            </div>
            
            {/* 응용 분야 및 카테고리 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.applications && product.applications.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">응용 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-purple-950/40 text-purple-400 border-purple-900">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {product.category && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">카테고리</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            
            {/* 주요 사양 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.input_voltage && (
                <SpecCard 
                  title="입력 전압" 
                  value={formatValue(
                    specs.input_voltage.min,
                    specs.input_voltage.max,
                    specs.input_voltage.typ,
                    specs.input_voltage.unit || 'V'
                  )}
                  icon={<Gauge className="w-5 h-5 text-blue-400" />}
                />
              )}
              
              {specs.output_voltage && (
                <SpecCard 
                  title="출력 전압" 
                  value={formatValue(
                    specs.output_voltage.min,
                    specs.output_voltage.max,
                    specs.output_voltage.typ,
                    specs.output_voltage.unit || 'V'
                  )}
                  icon={<Gauge className="w-5 h-5 text-green-400" />}
                />
              )}
              
              {specs.output_current && (
                <SpecCard 
                  title="출력 전류" 
                  value={formatValue(
                    specs.output_current.min,
                    specs.output_current.max,
                    specs.output_current.typ,
                    specs.output_current.unit || 'mA'
                  )}
                  icon={<Gauge className="w-5 h-5 text-yellow-400" />}
                />
              )}
              
              {specs.channels && (
                <SpecCard 
                  title="채널 수" 
                  value={String(specs.channels)}
                  icon={<Layers className="w-5 h-5 text-purple-400" />}
                />
              )}
              
              {specs.package_type && (
                <SpecCard 
                  title="패키지 타입" 
                  value={String(specs.package_type)}
                  icon={<Package className="w-5 h-5 text-gray-400" />}
                />
              )}
              
              {specs.dimming_method && (
                <SpecCard 
                  title="디밍 방식" 
                  value={Array.isArray(specs.dimming_method) ? specs.dimming_method.join(', ') : specs.dimming_method}
                  icon={<Activity className="w-5 h-5 text-red-400" />}
                />
              )}
              
              {specs.internal_switch !== undefined && (
                <SpecCard 
                  title="내부 스위치" 
                  value={specs.internal_switch ? "있음" : "없음"}
                  icon={<Cpu className="w-5 h-5 text-teal-400" />}
                />
              )}
              
              {specs.thermal_pad !== undefined && (
                <SpecCard 
                  title="써멀 패드" 
                  value={specs.thermal_pad ? "있음" : "없음"}
                  icon={<Grid className="w-5 h-5 text-amber-400" />}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* 탭 기반 상세 정보 */}
        <Tabs defaultValue="specs" className="mt-8">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="specs">상세 사양</TabsTrigger>
            <TabsTrigger value="applications">응용 분야</TabsTrigger>
            <TabsTrigger value="docs">문서</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 전기적 특성 */}
              {(specs.input_voltage || specs.output_voltage || specs.output_current || specs.switching_frequency || 
                specs.current_accuracy || specs.channels) && (
                <SpecGroup title="전기적 특성" icon={<Gauge className="w-5 h-5 text-blue-400" />}>
                  {specs.input_voltage && (
                    <SpecItem
                      title="입력 전압"
                      value={formatValue(
                        specs.input_voltage.min,
                        specs.input_voltage.max,
                        specs.input_voltage.typ,
                        specs.input_voltage.unit || 'V'
                      )}
                    />
                  )}
                  
                  {specs.output_voltage && (
                    <SpecItem
                      title="출력 전압"
                      value={formatValue(
                        specs.output_voltage.min,
                        specs.output_voltage.max,
                        specs.output_voltage.typ,
                        specs.output_voltage.unit || 'V'
                      )}
                    />
                  )}
                  
                  {specs.output_current && (
                    <SpecItem
                      title="출력 전류"
                      value={formatValue(
                        specs.output_current.min,
                        specs.output_current.max,
                        specs.output_current.typ,
                        specs.output_current.unit || 'mA'
                      )}
                    />
                  )}
                  
                  {specs.channels && (
                    <SpecItem
                      title="채널 수"
                      value={String(specs.channels)}
                    />
                  )}
                  
                  {specs.switching_frequency && (
                    <SpecItem
                      title="스위칭 주파수"
                      value={formatValue(
                        specs.switching_frequency.min,
                        specs.switching_frequency.max,
                        specs.switching_frequency.typ,
                        specs.switching_frequency.unit || 'kHz'
                      )}
                    />
                  )}
                  
                  {specs.current_accuracy?.between_ics !== undefined && (
                    <SpecItem
                      title="전류 정확도 (IC 간)"
                      value={`${specs.current_accuracy.between_ics}%`}
                    />
                  )}
                  
                  {specs.current_accuracy?.between_channels !== undefined && (
                    <SpecItem
                      title="전류 정확도 (채널 간)"
                      value={`${specs.current_accuracy.between_channels}%`}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* 패키지 및 물리적 특성 */}
              {(specs.package_type || specs.mounting_type || specs.operating_temperature || 
                specs.thermal_pad !== undefined || specs.supply_package || specs.package_case) && (
                <SpecGroup title="물리적 특성" icon={<Package className="w-5 h-5 text-gray-400" />}>
                  {specs.package_type && (
                    <SpecItem
                      title="패키지 타입"
                      value={specs.package_type}
                    />
                  )}
                  
                  {specs.mounting_type && (
                    <SpecItem
                      title="실장 유형"
                      value={specs.mounting_type}
                    />
                  )}
                  
                  {specs.package_case && (
                    <SpecItem
                      title="패키지/케이스"
                      value={specs.package_case}
                    />
                  )}
                  
                  {specs.supply_package && (
                    <SpecItem
                      title="공급 장치 패키지"
                      value={specs.supply_package}
                    />
                  )}
                  
                  {specs.operating_temperature && (
                    <SpecItem
                      title="동작 온도"
                      value={formatValue(
                        specs.operating_temperature.min,
                        specs.operating_temperature.max,
                        null,
                        specs.operating_temperature.unit || '°C'
                      )}
                    />
                  )}
                  
                  {specs.thermal_pad !== undefined && (
                    <SpecItem
                      title="써멀 패드"
                      value={specs.thermal_pad ? '있음' : '없음'}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* 디밍 및 제어 */}
              {(specs.dimming_method || specs.communication_interface || 
                specs.gray_scale_clock_frequency || specs.data_clock_frequency) && (
                <SpecGroup title="디밍 및 제어" icon={<Activity className="w-5 h-5 text-red-400" />}>
                  {specs.dimming_method && (
                    <SpecItem
                      title="디밍 방식"
                      value={Array.isArray(specs.dimming_method) ? specs.dimming_method.join(', ') : specs.dimming_method}
                    />
                  )}
                  
                  {specs.communication_interface?.type && (
                    <SpecItem
                      title="통신 인터페이스"
                      value={specs.communication_interface.type}
                    />
                  )}
                  
                  {specs.communication_interface?.speed && (
                    <SpecItem
                      title="통신 속도"
                      value={`${specs.communication_interface.speed} MHz`}
                    />
                  )}
                  
                  {specs.communication_interface?.proprietary !== undefined && (
                    <SpecItem
                      title="독점 프로토콜"
                      value={specs.communication_interface.proprietary ? '예' : '아니오'}
                    />
                  )}
                  
                  {specs.gray_scale_clock_frequency && (
                    <SpecItem
                      title="그레이스케일 클럭"
                      value={formatValue(
                        specs.gray_scale_clock_frequency.min,
                        specs.gray_scale_clock_frequency.max,
                        specs.gray_scale_clock_frequency.typ,
                        specs.gray_scale_clock_frequency.unit || 'MHz'
                      )}
                    />
                  )}
                  
                  {specs.data_clock_frequency && (
                    <SpecItem
                      title="데이터 클럭"
                      value={formatValue(
                        specs.data_clock_frequency.min,
                        specs.data_clock_frequency.max,
                        specs.data_clock_frequency.typ,
                        specs.data_clock_frequency.unit || 'MHz'
                      )}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* LED 매트릭스 */}
              {specs.led_matrix && (
                <SpecGroup title="LED 매트릭스" icon={<Grid className="w-5 h-5 text-purple-400" />}>
                  {specs.led_matrix.max_pixels && (
                    <SpecItem
                      title="최대 픽셀 수"
                      value={String(specs.led_matrix.max_pixels)}
                    />
                  )}
                  
                  {specs.led_matrix.configuration && (
                    <SpecItem
                      title="매트릭스 구성"
                      value={specs.led_matrix.configuration}
                    />
                  )}
                  
                  {specs.led_matrix.description && (
                    <SpecItem
                      title="매트릭스 설명"
                      value={specs.led_matrix.description}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* 전송 인터페이스 */}
              {specs.transmission_interface && (
                <SpecGroup title="전송 인터페이스" icon={<Layers className="w-5 h-5 text-amber-400" />}>
                  {specs.transmission_interface.topology && (
                    <SpecItem
                      title="토폴로지"
                      value={specs.transmission_interface.topology}
                    />
                  )}
                  
                  {specs.transmission_interface.clock_integrity && (
                    <SpecItem
                      title="클럭 무결성"
                      value={specs.transmission_interface.clock_integrity}
                    />
                  )}
                  
                  {specs.transmission_interface.clock_direction && (
                    <SpecItem
                      title="클럭 방향"
                      value={specs.transmission_interface.clock_direction}
                    />
                  )}
                  
                  {specs.transmission_interface.bidirectional !== undefined && (
                    <SpecItem
                      title="양방향 지원"
                      value={specs.transmission_interface.bidirectional ? '지원함' : '지원 안함'}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* PWM 특성 */}
              {specs.pwm && (
                <SpecGroup title="PWM 특성" icon={<Activity className="w-5 h-5 text-teal-400" />}>
                  {specs.pwm.resolution && (
                    <SpecItem
                      title="PWM 해상도"
                      value={Array.isArray(specs.pwm.resolution) ? specs.pwm.resolution.join(', ') : specs.pwm.resolution}
                    />
                  )}
                  
                  {specs.pwm.frequency && (
                    <SpecItem
                      title="PWM 주파수"
                      value={`${specs.pwm.frequency} kHz`}
                    />
                  )}
                  
                  {specs.pwm.description && (
                    <SpecItem
                      title="PWM 설명"
                      value={specs.pwm.description}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* 스캔 설계 특성 */}
              {specs.scan_design && (
                <SpecGroup title="스캔 설계 특성" icon={<Cpu className="w-5 h-5 text-green-400" />}>
                  {specs.scan_design.type && (
                    <SpecItem
                      title="스캔 설계 유형"
                      value={specs.scan_design.type}
                    />
                  )}
                  
                  {specs.scan_design.max_channels && (
                    <SpecItem
                      title="최대 스캔 채널 수"
                      value={String(specs.scan_design.max_channels)}
                    />
                  )}
                  
                  {specs.scan_design.description && (
                    <SpecItem
                      title="스캔 설계 설명"
                      value={specs.scan_design.description}
                    />
                  )}
                </SpecGroup>
              )}
              
              {/* 토폴로지 */}
              {specs.topology && (
                <SpecGroup title="토폴로지 특성" icon={<Microchip className="w-5 h-5 text-blue-400" />}>
                  <SpecItem
                    title="토폴로지"
                    value={Array.isArray(specs.topology) ? specs.topology.join(', ') : specs.topology}
                  />
                  
                  {specs.internal_switch !== undefined && (
                    <SpecItem
                      title="내부 스위치"
                      value={specs.internal_switch ? '있음' : '없음'}
                    />
                  )}
                </SpecGroup>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="mt-6">
            {product.applications && product.applications.length > 0 ? (
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>응용 분야</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4">
                      {product.applications.map((app: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-purple-950/40 flex items-center justify-center border border-purple-900">
                            <Check className="h-5 w-5 text-purple-400" />
                          </div>
                          <span className="text-gray-200">{app}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>적합한 사용 사례</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specs.topology && (
                        <div>
                          <h3 className="text-gray-400 mb-2 text-sm">권장 사용 시나리오</h3>
                          <ul className="space-y-2 pl-5 list-disc text-gray-300">
                            {Array.isArray(specs.topology) ? (
                              specs.topology.includes("Buck") && (
                                <li>높은 입력 전압에서 낮은 출력 전압으로 변환이 필요한 LED 구동</li>
                              )
                            ) : null}
                            
                            {Array.isArray(specs.topology) ? (
                              specs.topology.includes("Boost") && (
                                <li>낮은 입력 전압에서 높은 출력 전압으로 변환이 필요한 LED 구동</li>
                              )
                            ) : null}
                            
                            {specs.channels && Number(specs.channels) > 3 && (
                              <li>다채널 LED 디스플레이 및 조명 제어</li>
                            )}
                            
                            {specs.pwm?.resolution && (
                              <li>고정밀 밝기 제어가 필요한 애플리케이션</li>
                            )}
                            
                            {specs.dimming_method && Array.isArray(specs.dimming_method) && 
                              specs.dimming_method.includes("PWM") && (
                              <li>디지털 방식의 LED 밝기 제어가 필요한 환경</li>
                            )}
                            
                            {specs.dimming_method && Array.isArray(specs.dimming_method) && 
                              specs.dimming_method.includes("Analog") && (
                              <li>아날로그 방식의 부드러운 밝기 전환이 필요한 환경</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 flex items-center justify-center flex-col">
                  <AlertCircle className="h-10 w-10 text-gray-600 mb-3" />
                  <p className="text-gray-400 text-center">이 제품에 대한 응용 분야 정보가 제공되지 않았습니다.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="docs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>문서</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.datasheet_url ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-950/40 flex items-center justify-center border border-blue-900">
                          <Download className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <a 
                            href={product.datasheet_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline block"
                          >
                            제품 데이터시트
                          </a>
                          <p className="text-gray-400 text-sm">PDF | {manufacturerName}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-6 flex-col">
                      <AlertCircle className="h-10 w-10 text-gray-600 mb-3" />
                      <p className="text-gray-400 text-center">이 제품에 대한 문서 정보가 제공되지 않았습니다.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>기술 지원</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-green-950/40 flex items-center justify-center border border-green-900">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="text-gray-300">기술 문의 지원 가능</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-green-950/40 flex items-center justify-center border border-green-900">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="text-gray-300">설계 지원 서비스</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-green-950/40 flex items-center justify-center border border-green-900">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="text-gray-300">샘플 요청 가능</span>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        기술 지원 요청
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProductsLayout>
  );
} 