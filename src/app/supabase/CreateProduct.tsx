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
    part_number: "",
    description: "",
    datasheet_url: "",
    manufacturer_id: "",
    country_id: "",
    storage_type_id: ""
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
      const productPayload = {
        ...productData,
        type: selectedType,
        specifications: specifications
      };

      // TODO: API 엔드포인트로 데이터 전송
      console.log("제출된 제품 데이터:", productPayload);
      
    } catch (error) {
      console.error("제품 생성 오류:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 제품 생성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제품 타입 선택 */}
        <div>
          <label className="block mb-2">제품 타입</label>
          <select 
            value={selectedType}
            onChange={(e) => handleTypeSelect(e.target.value as keyof typeof productTypes | "")}
            className="w-full p-2 border rounded"
          >
            <option value="">타입 선택</option>
            {Object.keys(productTypes).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* 기본 제품 정보 입력 필드 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">제품명</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => handleProductDataChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">부품 번호</label>
            <input
              type="text"
              value={productData.part_number}
              onChange={(e) => handleProductDataChange("part_number", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* 추가 기본 정보 필드들... */}
        </div>

        {/* 선택된 제품 타입에 따른 스펙 입력 폼 */}
        {selectedType && (
          <div className="specifications-form">
            <h2 className="text-xl font-semibold mb-4">제품 사양</h2>
            {/* TODO: 선택된 스키마에 따른 동적 폼 생성 */}
          </div>
        )}

        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          제품 생성
        </button>
      </form>
    </div>
  );
}
