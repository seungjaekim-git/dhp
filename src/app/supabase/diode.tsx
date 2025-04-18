'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Component } from "lucide-react";
import SupabaseLayout from "./SupabaseLayout";
import BulkDataUploader from "./BulkDataUploader";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { DiodeInfoSchema } from './schemas/Diode';
import { useState } from "react";

export default function DiodePage() {
  const { toast } = useToast();
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Diode 데이터 업로드 함수
  const uploadDiode = async (data: any) => {
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

      // 2. Diode 정보 저장
      const diodeData: z.infer<typeof DiodeInfoSchema> = {
        // 전기적 특성
        forward_voltage: {
          min: data.forward_voltage_min,
          max: data.forward_voltage_max,
          typ: data.forward_voltage_typ,
          unit: "V",
          test_condition: data.forward_voltage_test_condition
        },
        forward_current: {
          min: data.forward_current_min,
          max: data.forward_current_max,
          typ: data.forward_current_typ,
          unit: "mA",
          pulse: data.forward_current_pulse
        },
        reverse_voltage: {
          max: data.reverse_voltage_max,
          unit: "V",
          test_condition: data.reverse_voltage_test_condition
        },
        reverse_current: {
          max: data.reverse_current_max,
          typ: data.reverse_current_typ,
          unit: "μA",
          test_condition: data.reverse_current_test_condition
        },
        
        // TVS 다이오드 특성
        tvs_characteristics: data.diode_type === "TVS" ? {
          breakdown_voltage: {
            min: data.breakdown_voltage_min,
            typ: data.breakdown_voltage_typ,
            unit: "V"
          },
          clamping_voltage: {
            max: data.clamping_voltage_max,
            unit: "V",
            test_condition: data.clamping_voltage_test_condition
          },
          peak_pulse_current: {
            max: data.peak_pulse_current_max,
            unit: "A",
            pulse_width: data.peak_pulse_current_pulse_width
          }
        } : undefined,
        
        // 쇼트키 다이오드 특성
        schottky_characteristics: data.diode_type === "Schottky" ? {
          barrier_height: {
            value: data.barrier_height,
            unit: "eV"
          },
          forward_voltage_drop: {
            typ: data.forward_voltage_drop,
            unit: "V",
            temperature: data.forward_voltage_drop_temperature
          }
        } : undefined,
        
        // 제너 다이오드 특성
        zener_characteristics: data.diode_type === "Zener" ? {
          zener_voltage: {
            nominal: data.zener_voltage_nominal,
            tolerance: data.zener_voltage_tolerance,
            unit: "V",
            test_current: data.zener_voltage_test_current
          },
          zener_impedance: {
            max: data.zener_impedance_max,
            unit: "Ω"
          }
        } : undefined,
        
        // 정류기 다이오드 특성
        rectifier_characteristics: data.diode_type === "Rectifier" ? {
          average_rectified_current: {
            max: data.average_rectified_current_max,
            unit: "A"
          },
          surge_current: {
            max: data.surge_current_max,
            unit: "A",
            pulse_width: data.surge_current_pulse_width
          }
        } : undefined,
        
        // 광학적 특성 (LED 다이오드의 경우)
        optical_characteristics: data.diode_type === "LED" ? {
          wavelength: {
            min: data.wavelength_min,
            max: data.wavelength_max,
            peak: data.wavelength_peak,
            unit: "nm"
          },
          luminous_intensity: {
            min: data.luminous_intensity_min,
            typ: data.luminous_intensity_typ,
            max: data.luminous_intensity_max,
            unit: "mcd",
            test_condition: data.luminous_intensity_test_condition
          },
          viewing_angle: {
            value: data.viewing_angle,
            unit: "°"
          }
        } : undefined,
        
        // 열적 특성
        thermal_characteristics: {
          operating_temperature: {
            min: data.operating_temperature_min,
            max: data.operating_temperature_max,
            unit: "°C"
          },
          storage_temperature: {
            min: data.storage_temperature_min,
            max: data.storage_temperature_max,
            unit: "°C"
          },
          thermal_resistance: {
            junction_to_ambient: data.thermal_resistance_junction_to_ambient,
            junction_to_case: data.thermal_resistance_junction_to_case,
            unit: "°C/W"
          }
        },
        
        // 동적 특성
        switching_characteristics: {
          reverse_recovery_time: {
            typ: data.reverse_recovery_time_typ,
            max: data.reverse_recovery_time_max,
            unit: "ns",
            test_condition: data.reverse_recovery_time_test_condition
          },
          forward_recovery_time: {
            typ: data.forward_recovery_time_typ,
            max: data.forward_recovery_time_max,
            unit: "ns"
          },
          junction_capacitance: {
            typ: data.junction_capacitance_typ,
            max: data.junction_capacitance_max,
            unit: "pF",
            test_condition: data.junction_capacitance_test_condition
          }
        },
        
        // 물리적 특성
        physical_characteristics: {
          package_type: data.package_type,
          mounting_type: data.mounting_type,
          weight: {
            value: data.weight_value,
            unit: data.weight_unit || "g"
          },
          dimensions: {
            length: data.length,
            width: data.width,
            height: data.height,
            unit: "mm"
          }
        },
        
        // 기타 특성
        additional_characteristics: {
          polarity: data.polarity,
          configuration: data.configuration,
          application_type: data.application_type ? Array.isArray(data.application_type) ? data.application_type : [data.application_type] : [],
          features: data.feature_list ? Array.isArray(data.feature_list) ? data.feature_list : [data.feature_list] : [],
          diode_type: data.diode_type
        }
      };

      // 실제 DB에 저장하는 부분 (여기서는 Diode 스키마에 맞게 변환한 데이터를 저장)
      const { data: diodeResult, error: diodeError } = await supabase
        .from('diodes')
        .insert({
          product_id: productData.id,
          category_id: data.category_id,
          subtitle: data.subtitle || "",
          forward_voltage: data.forward_voltage_typ,
          reverse_voltage: data.reverse_voltage_max,
          forward_current: data.forward_current_typ,
          reverse_current: data.reverse_current_typ,
          operating_temperature_min: data.operating_temperature_min,
          operating_temperature_max: data.operating_temperature_max,
          package_type: data.package_type,
          mounting_type: data.mounting_type,
          diode_type: data.diode_type,
          category_specific_attributes: data.category_specific_attributes || {},
          diode_data: diodeData
        })
        .select()
        .single();

      if (diodeError) throw diodeError;

      // 인증, 특징, 응용분야 관계 저장 (필요한 경우)
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

      // 업로드된 데이터와 변환된 Diode 데이터를 함께 반환
      return { 
        productData, 
        diodeResult,
        diodeData 
      };
    } catch (error) {
      console.error("Diode upload error:", error);
      throw error;
    }
  };

  // 템플릿 필드 (Diode 스키마에 맞게 설정)
  const templateFields = [
    "name", 
    "part_number", 
    "manufacturer_id", 
    "division_id", 
    "description", 
    "category_id",
    "diode_type",
    "forward_voltage_min",
    "forward_voltage_max",
    "forward_voltage_typ",
    "forward_current_min",
    "forward_current_max",
    "forward_current_typ",
    "reverse_voltage_max",
    "reverse_current_max",
    "reverse_current_typ",
    "operating_temperature_min",
    "operating_temperature_max",
    "storage_temperature_min",
    "storage_temperature_max",
    "package_type",
    "mounting_type",
    "polarity",
    "configuration",
    "application_type",
    "feature_list"
  ];

  // 업로드 완료 후 호출되는 함수
  const handleUploadComplete = (data: any[]) => {
    setUploadedData(data);
    setShowResults(true);
    toast({
      title: "데이터 업로드 완료",
      description: `${data.length}개의 다이오드 제품이 성공적으로 업로드되었습니다.`,
    });
  };

  // 다이오드 데이터 렌더링 함수
  const renderDiodeData = (data: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.diodeData).map(([key, value]: [string, any]) => {
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
      title="다이오드 관리"
      icon={<Component className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품 데이터 관리", href: "/supabase" },
        { label: "다이오드" },
      ]}
      description="다이오드 제품 정보를 대량으로 등록하고 관리합니다."
      badges={[
        {
          text: "다이오드",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
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
              entityType="Diode"
              uploadFunction={uploadDiode}
              templateFields={templateFields}
              onUploaded={handleUploadComplete}
              productType="diode"
            />
          </TabsContent>
          
          <TabsContent value="results">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white">업로드 결과</CardTitle>
                <CardDescription className="text-gray-400">
                  업로드된 다이오드 제품 정보를 확인합니다.
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
                          {renderDiodeData(item)}
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