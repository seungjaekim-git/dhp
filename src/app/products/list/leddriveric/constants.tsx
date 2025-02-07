"use client";

import { supabase } from "@/lib/supabase-client";
import { ENUMS } from "@/constants/enum";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";

export const getData = async () => {
  // Enum 데이터를 가져옵니다
  const enums = await ENUMS;

  // LED Driver IC 제품들을 가져옵니다
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      part_number,
      description,
      subtitle,
      specifications,
      storage_type_id,
      storage_types(
        id,
        name,
        description,
        category
      ),
      manufacturer:manufacturers(id, name),
      images(id, title, url, description),
      product_categories(
        categories(
          id,
          name,
          description,
          parent_id
        )
      ),
      product_documents:product_documents(
        documents(
          id,
          title,
          url,
          type_id,
          document_types(
            id,
            name,
            category
          )
        )
      ),
      product_applications(
        applications(
          id,
          name,
          description
        )
      ),
      product_features(
        features(
          id,
          name,
          description
        )
      ),
      product_certifications(
        certifications(
          id,
          name,
          description,
          certification_type
        )
      )
    `);

  if (productsError) {
    console.error('제품 데이터 가져오기 오류:', productsError);
    return [];
  }

  // 제품 데이터를 스키마에 맞게 변환합니다
  const mergedData = products.map(product => {
    const specs = LEDDriverICInfoSchema.parse(product.specifications);
    
    // specifications JSON 데이터 정규화
    const ledDriverIC = {
      ...product,
      ...specs,
      
      // 배열 데이터 정규화
      categories: product.product_categories.map(cat => ({
        category: cat.categories
      })),

      certifications: product.product_certifications.map(cert => ({
        certification: cert.certifications
      })),

      features: product.product_features.map(feat => feat.features),

      applications: product.product_applications.map(app => ({
        application: app.applications
      })),

      documents: product.product_documents.map(doc => ({
        document: {
          ...doc.documents,
          type: doc.documents.document_types
        }
      }))
    };
    console.log(ledDriverIC);
    return ledDriverIC as unknown as LEDDriverICColumnSchema;
  });

  return mergedData;
};

export const getFilterFields = async () => {
  const data = await getData();

  // 카테고리 데이터 가져오기
  const { data: categories } = await supabase
    .from('categories')
    .select('*');

  return [
    {
      label: "카테고리",
      value: "categories",
      type: "select",
      options: categories?.map(cat => ({
        label: cat.name,
        value: cat.id.toString()
      })) || [],
    },
    {
      label: "제품명",
      value: "name",
      type: "text",
      options: data.map(({ name }) => ({ label: name, value: name })),
    },
    {
      label: "출력 수",
      value: "channels",
      type: "select", 
      options: ['1', '2', '3', '4+'],
      defaultOpen: true,
    },
    {
      label: "입력 전압 범위",
      value: "input_voltage",
      type: "range",
      min: 3.3,
      max: 60,
      unit: "V",
      defaultValue: [3.3, 60],
    },
    {
      label: "출력 전압 범위", 
      value: "output_voltage",
      type: "range",
      min: 1,
      max: 60,
      unit: "V", 
      defaultValue: [1, 60],
    },
    {
      label: "출력 전류 범위",
      value: "output_current",
      type: "range",
      min: 20,
      max: 1500,
      unit: "mA",
      defaultValue: [20, 1500],
    },
    {
      label: "전류 정확도",
      value: "current_accuracy",
      type: "range",
      min: 0,
      max: 10,
      unit: "%",
      defaultValue: [0, 10],
    },
    {
      label: "스위칭 주파수",
      value: "switching_frequency",
      type: "range",
      min: 0,
      max: 2000,
      unit: "kHz",
      defaultValue: [0, 2000],
    },
    {
      label: "동작 온도",
      value: "operating_temperature",
      type: "range",
      min: -55,
      max: 150,
      unit: "C",
      defaultValue: [-55, 150],
    },
    {
      label: "실장 방식",
      value: "mounting_type",
      type: "select",
      options: ['SMD', 'Through Hole'],
    },
    {
      label: "보관 유형",
      value: "storage_type_id",
      type: "select",
      options: ['Tape & Reel', 'Tube', 'Tray'],
    },
    {
      label: "패키지 타입",
      value: "package_type",
      type: "select",
      options: ['SOP', 'SOIC', 'QFN', 'DIP'],
    },
    {
      label: "써멀패드",
      value: "thermal_pad",
      type: "select",
      options: ['Yes', 'No'],
    },
    {
      label: "패키지 상세",
      value: "package_detail",
      type: "text",
    },
    {
      label: "토폴로지",
      value: "topology",
      type: "select",
      options: ['Buck', 'Boost', 'Buck-Boost', 'Charge Pump', 'Linear Regulator', 'SEPIC'],
      defaultOpen: true,
    },
    {
      label: "디밍 방식",
      value: "dimming_method",
      type: "select",
      options: ['PWM', 'Analog'],
      defaultOpen: true,
    },
    {
      label: "인증",
      value: "certifications",
      type: "select",
      options: ['UL', 'CE', 'KC', 'CCC'],
    },
    {
      label: "응용분야",
      value: "applications",
      type: "select",
      options: ['Lighting', 'Automotive', 'Industrial', 'Consumer'],
      defaultOpen: true,
    },
  ];
};

export const data: LEDDriverICColumnSchema[] = [];
