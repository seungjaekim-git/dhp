"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Building,
  Globe,
  Mail,
  Phone,
  Fax,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  Cpu,
  Zap,
  Package,
  Thermometer,
  Settings,
  Radio,
  Clock
} from "lucide-react";

interface ProductInfoProps {
  product: {
    name: string;
    part_number: string;
    description: string;
    specifications: any;
    manufacturers: {
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
    };
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const specs = product.specifications;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specs">제품 사양</TabsTrigger>
          <TabsTrigger value="manufacturer">제조사 정보</TabsTrigger>
          <TabsTrigger value="documents">문서</TabsTrigger>
        </TabsList>

        <TabsContent value="specs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 기본 정보 */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Package className="w-5 h-5" />
                <h3 className="text-lg font-semibold">기본 정보</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">채널</p>
                    <p className="font-medium">{specs.channels || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">패키지 타입</p>
                    <p className="font-medium">{specs.package_type || "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 전기적 특성 */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Zap className="w-5 h-5" />
                <h3 className="text-lg font-semibold">전기적 특성</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">입력 전압</p>
                    <p className="font-medium">
                      {specs.input_voltage?.typ || "N/A"} {specs.input_voltage?.unit || "V"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">출력 전류</p>
                    <p className="font-medium">
                      {specs.output_current?.typ || "N/A"} {specs.output_current?.unit || "mA"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manufacturer">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={product.manufacturers.logo} />
                  <AvatarFallback>{product.manufacturers.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{product.manufacturers.name}</h2>
                    <p className="text-gray-500">{product.manufacturers.company_overview}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a href={product.manufacturers.website} className="text-blue-600 hover:underline">
                        웹사이트
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{product.manufacturers.established}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">문서 목록</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">문서가 준비중입니다.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
