'use client';

import { columns } from "./columns";
import { getData, getFilterFields } from "./constants";
import { DataTable } from "./data-table";
import { searchParamsCache } from "../search-params";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import type { LEDDriverICColumnSchema } from "./schema";

export default function LEDDriverICListPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const search = searchParamsCache.parse(Object.fromEntries(searchParams));

  const [data, setData] = React.useState<LEDDriverICColumnSchema[]>([]);
  const [filterFields, setFilterFields] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      const fields = await getFilterFields();
      setData(result);
      setFilterFields(fields);
    };
    fetchData();
  }, []);

  // 필터 필드 옵션 생성 함수
  const createFilterOptions = React.useCallback((item: LEDDriverICColumnSchema, field: string) => {
    const filterMap = {
      topologies: () => item.topologies?.map(topology => ({ 
        label: topology, 
        value: topology 
      })),
      dimming_methods: () => item.dimming_methods?.map(method => ({ 
        label: method, 
        value: method 
      })),
      certifications: () => item.certifications?.map(cert => ({
        label: cert.certification.name,
        value: cert.certification.name
      })),
      applications: () => item.applications?.map(app => ({
        label: app.application.name,
        value: app.application.name
      }))
    };

    return filterMap[field as keyof typeof filterMap]?.() || [];
  }, []);

  // 필터 필드 설정
  const categoryFilterFields = React.useMemo(() => {
    return filterFields.map(field => {
      const options = data
        .flatMap(item => createFilterOptions(item, field.value))
        .filter((v, i, a) => a.findIndex(t => t.value === v.value) === i);

      return {
        ...field,
        options
      };
    });
  }, [data, filterFields, createFilterOptions]);

  // 필터 조건 검사 함수
  const checkFilterCondition = React.useCallback((item: LEDDriverICColumnSchema, key: string, value: any) => {
    if (!value) return true;

    const filterConditions = {
      topologies: () => item.topologies?.some(t => t === value),
      dimming_methods: () => item.dimming_methods?.some(m => m === value),
      certifications: () => item.certifications?.some(c => c.certification.name === value),
      applications: () => item.applications?.some(a => a.application.name === value)
    };

    return filterConditions[key as keyof typeof filterConditions]?.() ?? true;
  }, []);

  // 필터링된 데이터
  const filteredData = React.useMemo(() => {
    return data.filter(item => 
      Object.entries(search).every(([key, value]) => 
        checkFilterCondition(item, key, value)
      )
    );
  }, [data, search, checkFilterCondition]);

  // 검색 파라미터 변환
  const searchFilters = React.useMemo(() => {
    return Object.entries(search)
      .map(([key, value]) => ({
        id: key,
        value,
      }))
      .filter(({ value }) => value != null);
  }, [search]);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">LED Driver IC</h1>
      <React.Suspense fallback={<Skeleton />}>
        <DataTable
          columns={columns}
          data={filteredData}
          filterFields={categoryFilterFields}
          defaultColumnFilters={searchFilters}
        />
      </React.Suspense>
    </div>
  );
}
