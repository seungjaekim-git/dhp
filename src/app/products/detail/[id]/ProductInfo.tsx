"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Building, Globe, Mail, Phone, Fax, MapPin, Calendar, 
  Briefcase, FileText, Cpu, Zap, Package, Thermometer, 
  Settings, Radio, Clock, ChevronRight, ExternalLink, FileSymlink
} from "lucide-react";

interface ProductInfoProps {
  product: {
    name: string;
    part_number: string;
    description: string;
    specifications: ProductSpecifications;
    manufacturers: Manufacturer;
    documents?: Document[];
  };
}

interface ProductSpecifications {
  channels: number | string;
  topology?: string[];
  thermal_pad?: boolean;
  package_case?: string;
  package_type?: string;
  input_voltage?: {
    max?: number;
    min?: number;
    typ?: number;
    unit?: string;
  };
  mounting_type?: string;
  dimming_method?: string[];
  output_current?: {
    max?: number;
    min?: number;
    typ?: number;
    unit?: string;
  };
  output_voltage?: {
    max?: number;
    min?: number;
    typ?: number;
    unit?: string;
  };
  supply_package?: string;
  internal_switch?: boolean;
  current_accuracy?: {
    between_ics?: number;
    between_channels?: number;
  };
  switching_frequency?: {
    max?: number;
    min?: number;
    typ?: number;
    unit?: string;
  };
  operating_temperature?: {
    max?: number;
    min?: number;
    unit?: string;
  };
  communication_interface?: {
    type?: string;
    speed?: number;
    description?: string;
    proprietary?: boolean;
  };
  [key: string]: any;
}

interface Manufacturer {
      name: string;
      website: string;
      established: string;
      headquarters: string;
      business_type: string;
      company_overview: string;
      logo?: string;
      manufacturer_emails: { email: string }[];
      manufacturer_phones: { phone: string }[];
      manufacturer_faxes: { fax: string }[];
      manufacturer_branches: { branch_info: string }[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: string;
  created_at: string;
}

const SpecItem = ({ icon, label, value, unit = "", empty = "N/A" }) => {
  if (!value && value !== 0) return null;
  
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-medium">
          {value}
          {unit && ` ${unit}`}
        </p>
      </div>
    </div>
  );
};

const ValueRangeItem = ({ icon, label, min, max, typ, unit = "", empty = "N/A" }) => {
  const hasValue = (val) => val !== undefined && val !== null;
  
  let displayValue = empty;
  if (hasValue(typ)) {
    displayValue = `${typ} ${unit}`;
  } else if (hasValue(min) && hasValue(max)) {
    displayValue = `${min} ~ ${max} ${unit}`;
  } else if (hasValue(min)) {
    displayValue = `최소 ${min} ${unit}`;
  } else if (hasValue(max)) {
    displayValue = `최대 ${max} ${unit}`;
  }
  
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-medium">{displayValue}</p>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, label, values }) => {
  if (!values || values.length === 0) return null;

  return (
    <div className="flex space-x-3 p-3">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="space-y-1 mt-1">
          {values.map((item, index) => {
            const value = Object.values(item)[0];
            return (
              <p key={index} className="text-sm">{value}</p>
            );
          })}
                  </div>
                  </div>
                </div>
  );
};

const SpecificationsTab = ({ specs }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <span>기본 정보</span>
          </h3>
          <div className="space-y-3">
            <SpecItem 
              icon={<Cpu className="w-5 h-5" />} 
              label="채널" 
              value={specs.channels} 
            />
            <SpecItem 
              icon={<Package className="w-5 h-5" />} 
              label="패키지 타입" 
              value={specs.package_type} 
            />
            <SpecItem 
              icon={<Package className="w-5 h-5" />} 
              label="패키지 케이스" 
              value={specs.package_case} 
            />
            <SpecItem 
              icon={<Thermometer className="w-5 h-5" />} 
              label="써멀 패드" 
              value={specs.thermal_pad ? "포함" : "미포함"} 
            />
            <SpecItem 
              icon={<Settings className="w-5 h-5" />} 
              label="토폴로지" 
              value={specs.topology ? specs.topology.join(", ") : ""} 
            />
            <SpecItem 
              icon={<Package className="w-5 h-5" />} 
              label="실장 유형" 
              value={specs.mounting_type} 
            />
            <SpecItem 
              icon={<Settings className="w-5 h-5" />} 
              label="내부 스위치" 
              value={specs.internal_switch ? "포함" : "미포함"} 
            />
          </div>
            </Card>

        <Card className="p-5 overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>전기적 특성</span>
          </h3>
          <div className="space-y-3">
            <ValueRangeItem 
              icon={<Zap className="w-5 h-5" />} 
              label="입력 전압" 
              min={specs.input_voltage?.min}
              max={specs.input_voltage?.max}
              typ={specs.input_voltage?.typ}
              unit={specs.input_voltage?.unit || "V"} 
            />
            <ValueRangeItem 
              icon={<Zap className="w-5 h-5" />} 
              label="출력 전압" 
              min={specs.output_voltage?.min}
              max={specs.output_voltage?.max}
              typ={specs.output_voltage?.typ}
              unit={specs.output_voltage?.unit || "V"} 
            />
            <ValueRangeItem 
              icon={<Zap className="w-5 h-5" />} 
              label="출력 전류" 
              min={specs.output_current?.min}
              max={specs.output_current?.max}
              typ={specs.output_current?.typ}
              unit={specs.output_current?.unit || "mA"} 
            />
            {specs.current_accuracy && (
              <>
                <SpecItem 
                  icon={<Settings className="w-5 h-5" />} 
                  label="IC 간 전류 정확도" 
                  value={specs.current_accuracy.between_ics} 
                  unit="%" 
                />
                <SpecItem 
                  icon={<Settings className="w-5 h-5" />} 
                  label="채널 간 전류 정확도" 
                  value={specs.current_accuracy.between_channels} 
                  unit="%" 
                />
              </>
            )}
          </div>
        </Card>
                  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Radio className="w-5 h-5 text-blue-600" />
            <span>주파수 특성</span>
          </h3>
          <div className="space-y-3">
            <ValueRangeItem 
              icon={<Radio className="w-5 h-5" />} 
              label="스위칭 주파수" 
              min={specs.switching_frequency?.min}
              max={specs.switching_frequency?.max}
              typ={specs.switching_frequency?.typ}
              unit={specs.switching_frequency?.unit || "kHz"} 
            />
            {specs.data_clock_frequency && (
              <SpecItem 
                icon={<Clock className="w-5 h-5" />} 
                label="데이터 클럭 주파수" 
                value={specs.data_clock_frequency.max} 
                unit={specs.data_clock_frequency.unit || "MHz"} 
              />
            )}
            {specs.gray_scale_clock_frequency && (
              <SpecItem 
                icon={<Clock className="w-5 h-5" />} 
                label="그레이스케일 클럭 주파수" 
                value={specs.gray_scale_clock_frequency.max} 
                unit={specs.gray_scale_clock_frequency.unit || "MHz"} 
              />
            )}
            {specs.pwm && (
              <SpecItem 
                icon={<Settings className="w-5 h-5" />} 
                label="PWM 해상도" 
                value={specs.pwm.resolution} 
              />
            )}
                  </div>
        </Card>

        <Card className="p-5 overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-blue-600" />
            <span>환경 특성</span>
          </h3>
          <div className="space-y-3">
            <ValueRangeItem 
              icon={<Thermometer className="w-5 h-5" />} 
              label="동작 온도" 
              min={specs.operating_temperature?.min}
              max={specs.operating_temperature?.max}
              unit={specs.operating_temperature?.unit || "°C"} 
            />
            <SpecItem 
              icon={<Package className="w-5 h-5" />} 
              label="공급 패키지" 
              value={specs.supply_package} 
            />
            {specs.dimming_method && specs.dimming_method.length > 0 && (
              <SpecItem 
                icon={<Settings className="w-5 h-5" />} 
                label="조광 방식" 
                value={specs.dimming_method.join(", ")} 
              />
            )}
            {specs.communication_interface && (
              <SpecItem 
                icon={<Cpu className="w-5 h-5" />} 
                label="통신 인터페이스" 
                value={specs.communication_interface.type} 
              />
            )}
                </div>
            </Card>
          </div>
    </div>
  );
};

const ManufacturerTab = ({ manufacturer }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-gradient-to-r from-blue-50 to-white p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="w-24 h-24 border-2 border-white shadow-sm">
            <AvatarImage src={manufacturer.logo} alt={manufacturer.name} />
            <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-800">
              {manufacturer.name.charAt(0)}
            </AvatarFallback>
                </Avatar>
                
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{manufacturer.name}</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {manufacturer.business_type}
              </Badge>
              <Badge variant="secondary" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
                설립: {manufacturer.established}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">회사 소개</h3>
          <p className="text-gray-700">{manufacturer.company_overview}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">연락처 정보</h3>
            <div className="space-y-2 bg-gray-50 rounded-lg p-4">
              <ContactItem 
                icon={<Globe className="w-4 h-4" />}
                label="웹사이트"
                values={[{ website: manufacturer.website }]}
              />
              <ContactItem 
                icon={<Mail className="w-4 h-4" />}
                label="이메일"
                values={manufacturer.manufacturer_emails}
              />
              <ContactItem 
                icon={<Phone className="w-4 h-4" />}
                label="전화번호"
                values={manufacturer.manufacturer_phones}
              />
              <ContactItem 
                icon={<Fax className="w-4 h-4" />}
                label="팩스"
                values={manufacturer.manufacturer_faxes}
              />
            </div>
          </div>
          
                  <div>
            <h3 className="text-lg font-semibold mb-3">위치 정보</h3>
            <div className="space-y-2 bg-gray-50 rounded-lg p-4">
              <div className="flex space-x-3 p-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-500">본사</p>
                  <p className="text-sm">{manufacturer.headquarters}</p>
                </div>
                  </div>

              {manufacturer.manufacturer_branches.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">지사</p>
                  <div className="space-y-2">
                    {manufacturer.manufacturer_branches.map((branch, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded bg-white">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{branch.branch_info}</span>
                      </div>
                    ))}
                  </div>
                    </div>
              )}
                    </div>
                  </div>
                </div>
              </div>
      
      <div className="bg-gray-50 p-4 flex justify-end">
        <Button variant="outline" className="flex items-center gap-1" asChild>
          <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
            웹사이트 방문 <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>
    </Card>
  );
};

const DocumentsTab = ({ documents = [] }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">문서 목록</h3>
        
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 text-gray-300 mb-2" />
            <p>문서가 준비중입니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Badge variant="secondary" className="text-xs mr-2">
                        {doc.type}
                      </Badge>
                      {doc.size && <span className="mr-2">{doc.size}</span>}
                      <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    다운로드 <FileSymlink className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
          </Card>
  );
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [activeTab, setActiveTab] = useState("specs");
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Badge variant="outline" className="mr-2">Part Number: {product.part_number}</Badge>
          <span>제조사: {product.manufacturers.name}</span>
        </div>
        <p className="text-gray-700">{product.description}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-12">
          <TabsTrigger 
            value="specs" 
            className={`${activeTab === "specs" ? "bg-blue-50 text-blue-700" : ""} text-sm font-medium transition-colors`}
          >
            제품 사양
          </TabsTrigger>
          <TabsTrigger 
            value="manufacturer" 
            className={`${activeTab === "manufacturer" ? "bg-blue-50 text-blue-700" : ""} text-sm font-medium transition-colors`}
          >
            제조사 정보
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className={`${activeTab === "documents" ? "bg-blue-50 text-blue-700" : ""} text-sm font-medium transition-colors`}
          >
            문서
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="mt-0">
          <SpecificationsTab specs={product.specifications} />
        </TabsContent>

        <TabsContent value="manufacturer" className="mt-0">
          <ManufacturerTab manufacturer={product.manufacturers} />
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <DocumentsTab documents={product.documents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
