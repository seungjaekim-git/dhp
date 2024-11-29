'use client';

import { columns } from "./columns";
import { data, filterFields } from "./constants";
import { DataTable } from "./data-table";
import { searchParamsCache } from "./search-params";
import { Skeleton } from "./skeleton";
import categoryData from "../productCategory";
import * as React from "react";

export const ProductListPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const search = searchParamsCache.parse(Object.fromEntries(searchParams));
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory'); 
  const item = searchParams.get('item');

  // 카테고리 기반 데이터 필터링
  const filteredData = React.useMemo(() => {
    let filtered = [...data];

    if (category) {
      const categoryInfo = categoryData.find(c => c.id === category);
      if (categoryInfo) {
        filtered = filtered.filter(item => item.category === category);

        if (subcategory) {
          const subCat = categoryInfo.subcategories.find(s => s.name === subcategory);
          if (subCat) {
            filtered = filtered.filter(item => item.subcategory === subcategory);

            if (item) {
              filtered = filtered.filter(d => d.type === item);
            }
          }
        }
      }
    }

    return filtered;
  }, [category, subcategory, item]);

  // 카테고리별 필터 필드 설정
  const categoryFilterFields = React.useMemo(() => {
    if (category) {
      const categoryInfo = categoryData.find(c => c.id === category);
      if (categoryInfo) {
        return {
          ...filterFields,
          manufacturers: categoryInfo.manufacturers
        };
      }
    }
    return filterFields;
  }, [category]);

  return (
    <React.Suspense fallback={<Skeleton />}>
      <DataTable
        columns={columns}
        data={filteredData}
        filterFields={categoryFilterFields}
        defaultColumnFilters={Object.entries(search)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </React.Suspense>
  );
};
