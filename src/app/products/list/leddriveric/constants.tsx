"use client";

import type { LEDDriverICColumnSchema } from "./schema";
import { supabase } from "@/lib/supabase-client";
import { ENUMS } from "@/constants/enum";

export const getData = async () => {
  // Enum 데이터를 가져옵니다
  const enums = await ENUMS;

  // LED Driver IC division의 제품들을 가져옵니다
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      part_number,
      description,
      manufacturer:manufacturers(id, name),
      division:divisions(id, name),
      images(id, title, url, description),
      documents:product_documents(
        document:documents(
          id,
          title,
          url,
          type
        )
      )
    `)
    .eq('division_id', 1);

  if (productsError) {
    console.error('제품 데이터 가져오기 오류:', productsError);
    return [];
  }

  // 가져온 제품들의 ID를 이용해 LED Driver IC 상세 정보를 가져옵니다
  const productIds = products.map(product => product.id);
  const { data: ledDriverICs, error: ledDriverICsError } = await supabase
    .from('led_driver_ic')
    .select(`
      id,
      product_id,
      category_id,
      subtitle,
      number_of_outputs,
      topologies,
      dimming_methods,
      input_voltage_range,
      typical_input_voltage,
      operating_frequency_range,
      typical_operating_frequency,
      output_current_range,
      typical_output_current,
      output_voltage_range,
      typical_output_voltage,
      operating_temperature,
      category_specific_attributes,
      category:categories(id, name),
      certifications:led_driver_ic_certifications(
        certification:certifications(id, name)
      ),
      features:led_driver_ic_features(
        feature:features(id, name)
      ),
      applications:led_driver_ic_applications(
        application:applications(id, name)
      ),
      options:led_driver_ic_options(
        id,
        option_name,
        package_detail,
        mounting_style,
        storage_type,
        notes,
        moq_start,
        moq_step,
        lead_time_range,
        prices,
        package_types:led_driver_ic_option_package_types(
          package_type:package_types(id, name)
        )
      )
    `)
    .in('product_id', productIds);

  if (ledDriverICsError) {
    console.error('LED Driver IC 데이터 가져오기 오류:', ledDriverICsError);
    return [];
  }

  // 제품 데이터와 LED Driver IC 데이터를 병합하고 스키마에 맞게 변환합니다
  const mergedData = products.map(product => {
    const ledDriverIC = ledDriverICs.find(ic => ic.product_id === product.id);
    
    if (ledDriverIC) {
      // 배열 데이터 정규화
      ledDriverIC.topologies = Array.isArray(ledDriverIC.topologies) ? ledDriverIC.topologies : [ledDriverIC.topologies];
      ledDriverIC.dimming_methods = Array.isArray(ledDriverIC.dimming_methods) ? ledDriverIC.dimming_methods : [ledDriverIC.dimming_methods];
      
      // 옵션 데이터 정규화
      ledDriverIC.options = ledDriverIC.options.map(option => ({
        id: option.id,
        notes: option.notes,
        prices: option.prices || {},
        moq_step: option.moq_step,
        moq_start: option.moq_start,
        product_id: ledDriverIC.id,
        option_name: option.option_name,
        storage_type: option.storage_type,
        mounting_style: option.mounting_style,
        package_detail: option.package_detail,
        lead_time_range: option.lead_time_range,
        package_types: option.package_types.map(pt => ({
          package_type: {
            name: pt.package_type.name
          }
        }))
      }));

      // 인증, 특징, 응용분야 데이터 정규화
      ledDriverIC.certifications = ledDriverIC.certifications.map(cert => ({
        certification: {
          name: cert.certification.name
        }
      }));

      ledDriverIC.features = ledDriverIC.features.map(feat => feat.feature.name);

      ledDriverIC.applications = ledDriverIC.applications.map(app => ({
        application: {
          name: app.application.name
        }
      }));
    }

    return {
        ...product,
        ...ledDriverIC
    } as unknown as LEDDriverICColumnSchema;
  });

  return mergedData;
};

export const getFilterFields = async () => {
  // 필터 필드들이 비동기로 가져와지지만,
  // DataTable 컴포넌트에서는 동기적으로 filterFields를 받고 있습니다.
  // 이로 인해 초기 렌더링 시 필터 필드가 비어있을 수 있습니다.
  const data = await getData();

  return [
    {
      label: "부제목",
      value: "subtitle",
      type: "input",
      options: data.map(({ subtitle }) => ({ label: subtitle, value: subtitle })),
    },
    {
      label: "출력 수",
      value: "number_of_outputs", 
      type: "slider",
      min: 1,
      max: 8,
      options: data.map(({ number_of_outputs }) => ({ label: `${number_of_outputs}`, value: number_of_outputs })),
      defaultOpen: true,
    },
    {
      label: "입력 전압 범위",
      value: "input_voltage_range",
      type: "range",
      min: 0,
      max: 1000,
      options: data.map(({ input_voltage_range }) => ({ label: `${input_voltage_range}`, value: input_voltage_range })),
    },
    {
      label: "출력 전류 범위",
      value: "output_current_range",
      type: "range", 
      min: 0,
      max: 5000,
      options: data.map(({ output_current_range }) => ({ label: `${output_current_range}`, value: output_current_range })),
    },
    {
      label: "동작 온도",
      value: "operating_temperature",
      type: "range",
      min: -55,
      max: 150,
      options: data.map(({ operating_temperature }) => ({ label: `${operating_temperature}`, value: operating_temperature })),
    },
    {
      label: "실장 방식",
      value: "mounting_style",
      type: "checkbox",
      options: data.flatMap(({ options }) => 
        options.map(({ mounting_style }) => ({ label: mounting_style, value: mounting_style }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "저장 타입",
      value: "storage_type", 
      type: "checkbox",
      options: data.flatMap(({ options }) => 
        options.map(({ storage_type }) => ({ label: storage_type, value: storage_type }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "패키지 타입",
      value: "package_type",
      type: "checkbox",
      options: data.flatMap(({ options }) => 
        options.flatMap(({ package_types }) => 
          package_types.map(({ package_type }) => ({ 
            label: package_type.name, 
            value: package_type.name 
          }))
        )
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "토폴로지",
      value: "topologies",
      type: "checkbox",
      defaultOpen: true,
      options: data.flatMap(({ topologies }) => 
        topologies.map(topology => ({ label: topology, value: topology }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "디밍 방식",
      value: "dimming_methods",
      type: "checkbox",
      defaultOpen: true,
      options: data.flatMap(({ dimming_methods }) => 
        dimming_methods.map(method => ({ label: method, value: method }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "인증",
      value: "certifications",
      type: "checkbox",
      options: data.flatMap(({ certifications }) => 
        certifications.map(cert => ({ 
          label: cert.certification.name,
          value: cert.certification.name 
        }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
    {
      label: "응용분야",
      value: "applications",
      type: "checkbox",
      defaultOpen: true,
      options: data.flatMap(({ applications }) => 
        applications.map(app => ({
          label: app.application.name,
          value: app.application.name
        }))
      ).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i),
    },
  ];
};

export const data: LEDDriverICColumnSchema[] = [];
