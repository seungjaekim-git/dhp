'use client';

import { z } from "zod";
import { getData } from "./constants";
import { DataTable } from "./data-table";
import { searchParamsCache } from "./search-params";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";
import { useColumns } from "./columns";

type ProductSchema = {
  id: number;
  name: string;
  manufacturer_id: number | null;
  part_number: string | null;
  specifications: z.infer<typeof LEDDriverICInfoSchema>;
  tables: any | null;
  description: string | null;
  storage_type_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  subtitle: string;
  images: {
    id: number;
    title: string | null;
    url: string;
    description: string | null;
  }[];
  applications: {
    application: {
      id: number;
      name: string;
    }
  }[];
  certifications: {
    certification: {
      id: number;
      name: string;
    }
  }[];
  manufacturer: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
};

export default function LEDDriverICListPage() {
  const [search, setSearch] = React.useState({});
  const [data, setData] = React.useState<ProductSchema[]>([]);
  const [filterOptions, setFilterOptions] = React.useState<any>({});

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsedSearch = searchParamsCache.parse(Object.fromEntries(searchParams));
      console.log("Parsed Search:", parsedSearch);
      setSearch(parsedSearch || {});
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result.products);
      setFilterOptions(result.filterOptions);
    };
    fetchData();
  }, []);

  const categoryFilterFields = React.useMemo(() => {
    return [
      {
        id: 'categories',
        label: '카테고리',
        options: filterOptions.categories?.map((cat: string) => ({
          label: cat,
          value: cat
        })) || []
      },
      {
        id: 'certifications',
        label: '인증',
        options: filterOptions.certifications?.map((cert: string) => ({
          label: cert,
          value: cert
        })) || []
      },
      {
        id: 'applications',
        label: '응용분야',
        options: filterOptions.applications?.map((app: string) => ({
          label: app,
          value: app
        })) || []
      }
    ];
  }, [filterOptions]);

  const checkFilterCondition = React.useCallback((item: ProductSchema, key: string, value: any) => {
    if (!value) return true;

    const filterConditions = {
      certifications: () => item.certifications?.some(c => c.certification.name === value),
      applications: () => item.applications?.some(a => a.application.name === value),
      categories: () => item.category?.name === value
    };

    return filterConditions[key as keyof typeof filterConditions]?.() ?? true;
  }, []);

  const filteredData = React.useMemo(() => {
    return data.filter(item => 
      Object.entries(search).every(([key, value]) => 
        checkFilterCondition(item, key, value)
      )
    );
  }, [data, search, checkFilterCondition]);

  const searchFilters = React.useMemo(() => {
    return Object.entries(search)
      .map(([key, value]) => ({
        id: key,
        value,
      }))
      .filter(({ value }) => value != null);
  }, [search]);

  return (
    <React.Suspense fallback={<Skeleton />}>
      <DataTable
        columns={useColumns(filterOptions)}
        data={filteredData}
        filterFields={categoryFilterFields}
        defaultColumnFilters={searchFilters}
      />
    </React.Suspense>
  );
}
