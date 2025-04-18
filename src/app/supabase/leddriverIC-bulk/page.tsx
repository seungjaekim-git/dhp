'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Microchip } from "lucide-react";
import SupabaseLayout from "../SupabaseLayout";
import BulkDataUploader from "../BulkDataUploader";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { LEDDriverICInfoSchema } from '../schemas/LEDDriverIC';

export default function LEDDriverICBulkPage() {
  const { toast } = useToast();
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // LED Driver IC 데이터 업로드 함수
  const uploadLEDDriverIC = async (data: any) => {
    try {
      // 1. Product 테이블에 먼저 저장
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name: data.name,
          part_number: data.part_number,
          manufacturer_id: data.manufacturer_id,
          division_id: data.division_id,
          description: data.description || "",
          images: data.images || [],
          documents: data.documents || [],
          status: data.status || "active",
        })
        .select()
        .single();

      if (productError) throw productError;

      // 2. LED Driver IC 정보 저장
      const ledDriverICData: z.infer<typeof LEDDriverICInfoSchema> = {
        channels: data.channels,
        input_voltage: {
          min: data.input_voltage_min,
          max: data.input_voltage_max,
          typ: data.typical_input_voltage,
          unit: "V"
        },
        output_voltage: {
          min: data.output_voltage_min,
          max: data.output_voltage_max,
          typ: data.typical_output_voltage,
          unit: "V"
        },
        output_current: {
          min: data.output_current_min,
          max: data.output_current_max,
          typ: data.typical_output_current,
          unit: "mA"
        },
        operating_temperature: {
          min: data.operating_temperature_min,
          max: data.operating_temperature_max,
          unit: "°C"
        },
        switching_frequency: {
          min: data.operating_frequency_min,
          max: data.operating_frequency_max,
          typ: data.typical_operating_frequency,
          unit: "kHz"
        },
        topology: data.topologies,
        dimming_method: data.dimming_methods,
        current_accuracy: data.current_accuracy,
        package_type: data.package_type,
        thermal_pad: data.thermal_pad,
        internal_switch: data.internal_switch,
        transmission_interface: data.transmission_interface,
        led_matrix: data.led_matrix,
        communication_interface: data.communication_interface,
        pwm: data.pwm,
        scan_design: data.scan_design
      };

      // 실제 DB에 저장하는 부분 (여기서는 LED Driver IC 스키마에 맞게 변환한 데이터를 저장)
      const { data: ledDriverResult, error: ledDriverICError } = await supabase
        .from('led_driver_ic')
        .insert({
          product_id: productData.id,
          category_id: data.category_id,
          subtitle: data.subtitle || "",
          number_of_outputs: data.number_of_outputs,
          topologies: data.topologies || [],
          dimming_methods: data.dimming_methods || [],
          input_voltage_min: data.input_voltage_min,
          input_voltage_max: data.input_voltage_max,
          typical_input_voltage: data.typical_input_voltage,
          operating_frequency_min: data.operating_frequency_min,
          operating_frequency_max: data.operating_frequency_max,
          typical_operating_frequency: data.typical_operating_frequency,
          output_current_min: data.output_current_min,
          output_current_max: data.output_current_max,
          typical_output_current: data.typical_output_current,
          output_voltage_min: data.output_voltage_min,
          output_voltage_max: data.output_voltage_max,
          typical_output_voltage: data.typical_output_voltage,
          operating_temperature_min: data.operating_temperature_min,
          operating_temperature_max: data.operating_temperature_max,
          category_specific_attributes: data.category_specific_attributes || {},
          led_driver_ic_data: ledDriverICData
        })
        .select()
        .single();

      if (ledDriverICError) throw ledDriverICError;

      // 인증, 특징, 응용분야 관계 저장
      if (data.certifications && data.certifications.length > 0) {
        const certificationRecords = data.certifications.map((cert_id: number) => ({
          product_id: productData.id,
          certification_id: cert_id
        }));
        
        const { error: certError } = await supabase
          .from('product_certifications')
          .insert(certificationRecords);
          
        if (certError) console.error("Certification relation error:", certError);
      }
      
      if (data.features && data.features.length > 0) {
        const featureRecords = data.features.map((feature_id: number) => ({
          product_id: productData.id,
          feature_id: feature_id
        }));
        
        const { error: featureError } = await supabase
          .from('product_features')
          .insert(featureRecords);
          
        if (featureError) console.error("Feature relation error:", featureError);
      }
      
      if (data.applications && data.applications.length > 0) {
        const applicationRecords = data.applications.map((app_id: number) => ({
          product_id: productData.id,
          application_id: app_id
        }));
        
        const { error: appError } = await supabase
          .from('product_applications')
          .insert(applicationRecords);
          
        if (appError) console.error("Application relation error:", appError);
      }

      // 업로드된 데이터와 변환된 LED Driver IC 데이터를 함께 반환
      return { 
        productData, 
        ledDriverResult,
        ledDriverICData 
      };
    } catch (error) {
      console.error("LED Driver IC upload error:", error);
      throw error;
    }
  };

  // 템플릿 필드 (LED Driver IC 스키마에 맞게 설정)
  const templateFields = [
    "name", 
    "part_number", 
    "manufacturer_id", 
    "division_id", 
    "description", 
    "category_id", 
    "number_of_outputs", 
    "channels",
    "topologies", 
    "dimming_methods", 
    "input_voltage_min", 
    "input_voltage_max",
    "typical_input_voltage",
    "output_voltage_min",
    "output_voltage_max",
    "typical_output_voltage",
    "output_current_min",
    "output_current_max",
    "typical_output_current",
    "operating_frequency_min",
    "operating_frequency_max",
    "typical_operating_frequency",
    "operating_temperature_min",
    "operating_temperature_max",
    "package_type",
    "thermal_pad",
    "internal_switch"
  ];

  // 업로드 완료 후 호출되는 함수
  const handleUploadComplete = (data: any[]) => {
    setUploadedData(data);
    setShowResults(true);
    toast({
      title: "데이터 업로드 완료",
      description: `${data.length}개의 LED Driver IC 제품이 성공적으로 업로드되었습니다.`,
    });
  };
  
  // LED Driver IC 데이터 렌더링 함수
  const renderLEDDriverICData = (data: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.ledDriverICData).map(([key, value]: [string, any]) => {
          if (!value || (typeof value === 'object' && Object.keys(value).length === 0)) {
            return null;
          }
          
          return (
            <div key={key} className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h4>
              {typeof value === 'object' ? (
                <div className="space-y-2">
                  {Object.entries(value).map(([subKey, subValue]: [string, any]) => {
                    if (!subValue) return null;
                    return (
                      <div key={subKey} className="flex justify-between">
                        <span className="text-gray-400">
                          {subKey.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                        </span>
                        <span className="text-white">
                          {typeof subValue === 'object' 
                            ? JSON.stringify(subValue) 
                            : subValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="text-white">{value}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <SupabaseLayout
      title="LED Driver IC 대량 등록"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품 데이터 관리", href: "/supabase" },
        { label: "LED Driver IC 대량 등록" },
      ]}
      description="LED Driver IC 제품 정보를 일괄 대량으로 등록합니다."
      badges={[
        {
          text: "LED Driver IC",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
        {
          text: "대량 등록",
          bgColor: "bg-green-500/20",
          textColor: "text-green-400",
          hoverColor: "hover:bg-green-500/30",
        }
      ]}
    >
      <div className="w-full">
        <Tabs defaultValue="upload" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-800 text-gray-300">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                대량 데이터 업로드
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                disabled={!showResults}
              >
                업로드 결과
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upload">
            <BulkDataUploader 
              entityType="LED Driver IC"
              uploadFunction={uploadLEDDriverIC}
              templateFields={templateFields}
              onUploaded={handleUploadComplete}
              productType="leddriverIC"
            />
          </TabsContent>
          
          <TabsContent value="results">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white">업로드 결과</CardTitle>
                <CardDescription className="text-gray-400">
                  업로드된 LED Driver IC 제품 정보를 확인합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedData.length > 0 ? (
                  <div className="space-y-6">
                    {uploadedData.map((item, index) => (
                      <div key={index} className="border border-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-blue-400 mb-2">
                          {item.productData.name} ({item.productData.part_number})
                        </h3>
                        <div className="bg-gray-900 p-4 rounded-lg">
                          <h4 className="text-white font-medium mb-4">제품 상세 정보</h4>
                          {renderLEDDriverICData(item)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">업로드된 데이터가 없습니다.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SupabaseLayout>
  );
} 