"use client";

import { useState } from "react";
import { z } from "zod";
import { 
  LEDDriverICSchema,
  DiodeSchema, 
  CableSchema,
  ConnectorSchema,
  SensorSchema,
  PMICSchema,
  TVSDiodeSchema,
  RectifierDiodeSchema,
  MOSFETSchema
} from "./page";
import { PrismaClient  } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const prisma = new PrismaClient();
// 제품 스키마 정의
const ProductSchema = z.object({
  name: z.string(),
  partNumber: z.string(),
  description: z.string(),
  datasheetUrl: z.string().url().optional(),
  manufacturerId: z.string(),
  countryId: z.string(),
  storageTypeId: z.string(),
  type: z.enum([
    "LED Driver IC",
    "Diode",
    "Cable",
    "Connector", 
    "Sensor",
    "PMIC",
    "TVS Diode",
    "Rectifier Diode",
    "MOSFET"
  ]),
  specifications: z.union([
    LEDDriverICSchema,
    DiodeSchema,
    CableSchema,
    ConnectorSchema,
    SensorSchema,
    PMICSchema,
    TVSDiodeSchema,
    RectifierDiodeSchema,
    MOSFETSchema
  ])
});

// 제품 타입 정의
const productTypes = {
  "LED Driver IC": LEDDriverICSchema,
  "Diode": DiodeSchema,
  "Cable": CableSchema,
  "Connector": ConnectorSchema,
  "Sensor": SensorSchema,
  "PMIC": PMICSchema,
  "TVS Diode": TVSDiodeSchema,
  "Rectifier Diode": RectifierDiodeSchema,
  "MOSFET": MOSFETSchema
} as const;

export default function CreateProduct() {
  const [selectedType, setSelectedType] = useState<keyof typeof productTypes | "">("");
  const [specifications, setSpecifications] = useState<any>({});
  const [productData, setProductData] = useState({
    name: "",
    partNumber: "",
    description: "",
    datasheetUrl: "",
    manufacturerId: "",
    countryId: "",
    storageTypeId: ""
  });

  // 제품 타입 선택 핸들러
  const handleTypeSelect = (type: keyof typeof productTypes | "") => {
    setSelectedType(type);
    setSpecifications({});
  };

  // 스펙 업데이트 핸들러
  const handleSpecChange = (path: string[], value: any) => {
    setSpecifications(prev => {
      const newSpecs = {...prev};
      let current = newSpecs;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
        
      current[path[path.length - 1]] = value;
      return newSpecs;
    });
  };

  // 기본 제품 정보 업데이트 핸들러
  const handleProductDataChange = (field: keyof typeof productData, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 제품 생성 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!selectedType) {
        throw new Error("제품 타입을 선택해주세요");
      }

      // 선택된 타입의 스키마로 유효성 검사
      const schema = productTypes[selectedType];
      const validatedSpecs = validateAndTransformData(specifications, schema);

      const productPayload = {
        ...productData,
        type: selectedType,
        specifications: validatedSpecs
      };

      // ProductSchema로 전체 데이터 유효성 검사
      const validatedProduct = ProductSchema.parse(productPayload);

      const result = await createProduct(validatedProduct);
      console.log("제품이 성공적으로 생성되었습니다:", result);
      
    } catch (error) {
      console.error("제품 생성 오류:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 제품 생성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label>제품 타입</Label>
                <Select 
                  value={selectedType}
                  onValueChange={(value) => handleTypeSelect(value as keyof typeof productTypes | "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="타입 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(productTypes).map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>제품명</Label>
                  <Input
                    type="text"
                    value={productData.name}
                    onChange={(e) => handleProductDataChange("name", e.target.value)}
                    placeholder="제품명을 입력하세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label>부품 번호</Label>
                  <Input
                    type="text"
                    value={productData.partNumber}
                    onChange={(e) => handleProductDataChange("partNumber", e.target.value)}
                    placeholder="부품 번호를 입력하세요"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>설명</Label>
                  <Textarea
                    value={productData.description}
                    onChange={(e) => handleProductDataChange("description", e.target.value)}
                    placeholder="제품에 대한 설명을 입력하세요"
                    rows={4}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>데이터시트 URL</Label>
                  <Input
                    type="url"
                    value={productData.datasheetUrl}
                    onChange={(e) => handleProductDataChange("datasheetUrl", e.target.value)}
                    placeholder="데이터시트 URL을 입력하세요"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedType && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">제품 사양</h2>
              <div className="space-y-6">
                {selectedType === "LED Driver IC" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>입력 전압 범위 (최소)</Label>
                        <Input
                          type="number" 
                          onChange={(e) => handleSpecChange(["input_voltage_range", "min"], Number(e.target.value))}
                          placeholder="V"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>입력 전압 범위 (최대)</Label>
                        <Input
                          type="number"
                          onChange={(e) => handleSpecChange(["input_voltage_range", "max"], Number(e.target.value))}
                          placeholder="V"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>출력 전류 범위 (최소)</Label>
                        <Input
                          type="number"
                          onChange={(e) => handleSpecChange(["output_current_range", "min"], Number(e.target.value))}
                          placeholder="mA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>출력 전류 범위 (최대)</Label>
                        <Input
                          type="number"
                          onChange={(e) => handleSpecChange(["output_current_range", "max"], Number(e.target.value))}
                          placeholder="mA"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>효율</Label>
                      <Input
                        type="number"
                        onChange={(e) => handleSpecChange(["efficiency", "value"], Number(e.target.value))}
                        placeholder="%"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>디밍 방식</Label>
                      <Input
                        type="text"
                        onChange={(e) => handleSpecChange(["dimming_methods"], e.target.value.split(','))}
                        placeholder="PWM, Analog (쉼표로 구분)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>보호 기능</Label>
                      <Input
                        type="text"
                        onChange={(e) => handleSpecChange(["protection_features"], e.target.value.split(','))}
                        placeholder="OVP, OCP (쉼표로 구분)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>동작 주파수</Label>
                      <Input
                        type="number"
                        onChange={(e) => handleSpecChange(["operating_frequency", "typical"], Number(e.target.value))}
                        placeholder="kHz"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>채널 수</Label>
                      <Input
                        type="number"
                        onChange={(e) => handleSpecChange(["channels"], Number(e.target.value))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="programmable"
                        onCheckedChange={(checked) => handleSpecChange(["programmable"], checked)}
                      />
                      <Label htmlFor="programmable">프로그래밍 가능</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>패키지 타입</Label>
                      <Input
                        type="text"
                        onChange={(e) => handleSpecChange(["package_type"], e.target.value)}
                        placeholder="예: SMD"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>동작 온도 범위 (최소)</Label>
                        <Input
                          type="number"
                          onChange={(e) => handleSpecChange(["operating_temperature_range", "min"], Number(e.target.value))}
                          placeholder="°C"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>동작 온도 범위 (최대)</Label>
                        <Input
                          type="number"
                          onChange={(e) => handleSpecChange(["operating_temperature_range", "max"], Number(e.target.value))}
                          placeholder="°C"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          type="submit"
          className="w-full"
        >
          제품 생성
        </Button>
      </form>
    </div>
  );
}

// 스키마 유효성 검사 및 데이터 변환 함수
const validateAndTransformData = (data: any, schema: z.ZodSchema) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`유효성 검사 실패: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
};

// 제품 생성을 위한 컴포넌트
const renderSpecificationFields = (schema: z.ZodSchema, path: string[] = [], handleChange: (path: string[], value: any) => void) => {
  const shape = (schema as any)._def.shape();

  return Object.entries(shape).map(([key, field]: [string, any]) => {
    const currentPath = [...path, key];
    
    if (field instanceof z.ZodObject) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-medium mb-2">{key}</h3>
          <div className="pl-4">
            {renderSpecificationFields(field, currentPath, handleChange)}
          </div>
        </div>
      );
    }

    if (field instanceof z.ZodNumber || field instanceof z.ZodString || field instanceof z.ZodBoolean) {
      return (
        <div key={key} className="mb-4">
          <label className="block mb-2">{key}</label>
          {field instanceof z.ZodBoolean ? (
            <input
              type="checkbox"
              onChange={(e) => handleChange(currentPath, e.target.checked)}
              className="form-checkbox h-5 w-5"
            />
          ) : (
            <input
              type={field instanceof z.ZodNumber ? "number" : "text"}
              onChange={(e) => handleChange(currentPath, field instanceof z.ZodNumber ? Number(e.target.value) : e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      );
    }

    if (field instanceof z.ZodArray) {
      return (
        <div key={key} className="mb-4">
          <label className="block mb-2">{key}</label>
          <input
            type="text"
            placeholder="쉼표로 구분된 값들 입력"
            onChange={(e) => handleChange(currentPath, e.target.value.split(',').map(v => v.trim()))}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    }

    return null;
  });
};

// Prisma를 이용한 제품 생성 함수
const createProduct = async (productData: z.infer<typeof ProductSchema>) => {

  const result = ProductSchema.safeParse(productData);
  if (!result.success) {
    throw new Error('Invalid data');
}
  return await prisma.product.create({
    data: result.data
  });
};
