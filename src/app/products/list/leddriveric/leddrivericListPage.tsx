'use client';

import { z } from "zod";
import { getData, getFilterFields } from "./constants";
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

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const parsedSearch = searchParamsCache.parse(Object.fromEntries(searchParams));
      console.log("Parsed Search:", parsedSearch);
      setSearch(parsedSearch || {});
    }
  }, []);

  const [data, setData] = React.useState<ProductSchema[]>([]);
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

  const createFilterOptions = React.useCallback((item: ProductSchema, field: string) => {
    const filterMap = {
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

  const checkFilterCondition = React.useCallback((item: ProductSchema, key: string, value: any) => {
    if (!value) return true;

    const filterConditions = {
      certifications: () => item.certifications?.some(c => c.certification.name === value),
      applications: () => item.applications?.some(a => a.application.name === value)
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
        columns={useColumns()}
        data={filteredData}
        filterFields={categoryFilterFields}
        defaultColumnFilters={searchFilters}
      />
    </React.Suspense>
  );
}
