'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Component } from "lucide-react";
import SupabaseLayout from "../SupabaseLayout";
import BulkDataUploader from "../BulkDataUploader";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { DiodeInfoSchema } from '../schemas/Diode';

export default function DiodeBulkPage() {
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
          subtitle: data.subtitle || "",
          manufacturer_id: data.manufacturer_id ? parseInt(data.manufacturer_id) : null,
          part_number: data.part_number || "",
          specifications: {}, // 다이오드 상세 데이터는 diode_data 필드에 저장됨
          description: data.description || "",
          storage_type_id: data.storage_type_id ? parseInt(data.storage_type_id) : null,
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

      // products의 specifications 필드에 diode 데이터 업데이트
      await supabase
        .from('products')
        .update({ specifications: { diode_data: diodeData } })
        .eq('id', productData.id);

      // 3. 카테고리 관계 저장
      if (data.categories && (Array.isArray(data.categories) ? data.categories.length > 0 : data.categories)) {
        const categoryIds = Array.isArray(data.categories) 
          ? data.categories 
          : [data.categories];
          
        const categoryRecords = categoryIds.map((category_id: string | number) => ({
          product_id: productData.id,
          category_id: typeof category_id === 'string' ? parseInt(category_id) : category_id
        }));
        
        const { error: categoryError } = await supabase
          .from('product_categories')
          .insert(categoryRecords);
          
        if (categoryError) console.error("Category relation error:", categoryError);
      }

      // 4. 응용분야 관계 저장
      if (data.applications && (Array.isArray(data.applications) ? data.applications.length > 0 : data.applications)) {
        const applicationIds = Array.isArray(data.applications) 
          ? data.applications 
          : [data.applications];
          
        const applicationRecords = applicationIds.map((app_id: string | number) => ({
          product_id: productData.id,
          application_id: typeof app_id === 'string' ? parseInt(app_id) : app_id
        }));
        
        const { error: appError } = await supabase
          .from('product_applications')
          .insert(applicationRecords);
          
        if (appError) console.error("Application relation error:", appError);
      }
      
      // 5. 인증 관계 저장
      if (data.certifications && (Array.isArray(data.certifications) ? data.certifications.length > 0 : data.certifications)) {
        const certificationIds = Array.isArray(data.certifications) 
          ? data.certifications 
          : [data.certifications];
          
        const certificationRecords = certificationIds.map((cert_id: string | number) => ({
          product_id: productData.id,
          certification_id: typeof cert_id === 'string' ? parseInt(cert_id) : cert_id
        }));
        
        const { error: certError } = await supabase
          .from('product_certifications')
          .insert(certificationRecords);
          
        if (certError) console.error("Certification relation error:", certError);
      }
      
      // 6. 특징 관계 저장
      if (data.features && (Array.isArray(data.features) ? data.features.length > 0 : data.features)) {
        const featureIds = Array.isArray(data.features) 
          ? data.features 
          : [data.features];
          
        const featureRecords = featureIds.map((feature_id: string | number) => ({
          product_id: productData.id,
          feature_id: typeof feature_id === 'string' ? parseInt(feature_id) : feature_id,
          description: data.feature_descriptions ? data.feature_descriptions[feature_id] : null
        }));
        
        const { error: featureError } = await supabase
          .from('product_features')
          .insert(featureRecords);
          
        if (featureError) console.error("Feature relation error:", featureError);
      }
      
      // 7. 이미지 저장
      if (data.images && data.images.length > 0) {
        const imageRecords = data.images.map((image: any) => ({
          title: image.title || null,
          url: image.url,
          description: image.description || null,
          product_id: productData.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        
        const { error: imageError } = await supabase
          .from('images')
          .insert(imageRecords);
          
        if (imageError) console.error("Image insertion error:", imageError);
      }
      
      // 8. 문서 저장
      if (data.documents && data.documents.length > 0) {
        // documents 테이블에 문서 저장
        const documentRecords = data.documents.map((doc: any) => ({
          title: doc.title || 'Untitled Document',
          url: doc.url,
          type_id: doc.type_id ? (typeof doc.type_id === 'string' ? parseInt(doc.type_id) : doc.type_id) : null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        
        const { data: savedDocs, error: docError } = await supabase
          .from('documents')
          .insert(documentRecords)
          .select();
          
        if (docError) {
          console.error("Document insertion error:", docError);
        } else if (savedDocs) {
          // product_documents 관계 테이블에 저장
          const productDocumentsData = savedDocs.map((doc: any) => ({
            product_id: productData.id,
            document_id: doc.id
          }));

          const { error: prodDocError } = await supabase
            .from('product_documents')
            .insert(productDocumentsData);
            
          if (prodDocError) console.error("Product-Document relation error:", prodDocError);
        }
      }

      // 업로드된 데이터와 변환된 Diode 데이터를 함께 반환
      return { 
        productData, 
        diodeData,
        relationships: {
          categories: data.categories || [],
          applications: data.applications || [],
          certifications: data.certifications || [],
          features: data.features || [],
          images: data.images || [],
          documents: data.documents || []
        }
      };
    } catch (error) {
      console.error("Diode upload error:", error);
      throw error;
    }
  };

  // 템플릿 필드 (schema.prisma와 일치하도록 확장)
  const templateFields = [
    // 제품 기본 정보 (products 테이블)
    "name",
    "subtitle", 
    "part_number", 
    "manufacturer_id", 
    "storage_type_id",
    "description",
    
    // 관계 데이터
    "categories",
    "applications",
    "certifications", 
    "features",
    "feature_descriptions",
    
    // 이미지 및 문서
    "images",
    "documents",
    
    // 다이오드 특성 데이터
    "diode_type",
    "forward_voltage_min",
    "forward_voltage_max",
    "forward_voltage_typ",
    "forward_voltage_test_condition",
    "forward_current_min",
    "forward_current_max",
    "forward_current_typ",
    "forward_current_pulse",
    "reverse_voltage_max",
    "reverse_voltage_test_condition",
    "reverse_current_max",
    "reverse_current_typ",
    "reverse_current_test_condition",
    
    // 열적 특성
    "operating_temperature_min",
    "operating_temperature_max",
    "storage_temperature_min",
    "storage_temperature_max",
    "thermal_resistance_junction_to_ambient",
    "thermal_resistance_junction_to_case",
    
    // 물리적 특성
    "package_type",
    "mounting_type",
    "weight_value",
    "weight_unit",
    "length",
    "width",
    "height",
    
    // 동적 특성
    "reverse_recovery_time_typ",
    "reverse_recovery_time_max",
    "reverse_recovery_time_test_condition",
    "forward_recovery_time_typ",
    "forward_recovery_time_max",
    "junction_capacitance_typ",
    "junction_capacitance_max",
    "junction_capacitance_test_condition",
    
    // 기타 특성
    "polarity",
    "configuration",
    "application_type",
    "feature_list",
    
    // TVS 다이오드 특성
    "breakdown_voltage_min",
    "breakdown_voltage_typ",
    "clamping_voltage_max",
    "clamping_voltage_test_condition",
    "peak_pulse_current_max",
    "peak_pulse_current_pulse_width",
    
    // 쇼트키 다이오드 특성
    "barrier_height",
    "forward_voltage_drop",
    "forward_voltage_drop_temperature",
    
    // 제너 다이오드 특성
    "zener_voltage_nominal",
    "zener_voltage_tolerance",
    "zener_voltage_test_current",
    "zener_impedance_max",
    
    // 정류기 다이오드 특성
    "average_rectified_current_max",
    "surge_current_max",
    "surge_current_pulse_width",
    
    // LED 다이오드 특성
    "wavelength_min",
    "wavelength_max",
    "wavelength_peak",
    "luminous_intensity_min",
    "luminous_intensity_typ",
    "luminous_intensity_max",
    "luminous_intensity_test_condition",
    "viewing_angle"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 다이오드 주요 특성 */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2">제품 기본 정보</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">이름:</span>
              <span className="text-white">{data.productData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">부제목:</span>
              <span className="text-white">{data.productData.subtitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">부품 번호:</span>
              <span className="text-white">{data.productData.part_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">설명:</span>
              <span className="text-white">{data.productData.description}</span>
            </div>
          </div>
        </div>

        {/* 관계 데이터 */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2">관련 데이터</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">카테고리:</span>
              <span className="text-white">{data.relationships?.categories?.length || 0}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">응용분야:</span>
              <span className="text-white">{data.relationships?.applications?.length || 0}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">인증:</span>
              <span className="text-white">{data.relationships?.certifications?.length || 0}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">특징:</span>
              <span className="text-white">{data.relationships?.features?.length || 0}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">이미지:</span>
              <span className="text-white">{data.relationships?.images?.length || 0}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">문서:</span>
              <span className="text-white">{data.relationships?.documents?.length || 0}개</span>
            </div>
          </div>
        </div>

        {/* 다이오드 상세 데이터 */}
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
      title="다이오드 대량 등록"
      icon={<Component className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품 데이터 관리", href: "/supabase" },
        { label: "다이오드 대량 등록" },
      ]}
      description="다이오드 제품 정보를 일괄 대량으로 등록합니다."
      badges={[
        {
          text: "다이오드",
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