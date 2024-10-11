"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import sampleData from './sample.json'; // 샘플 데이터 임포트
import { DataTable, buildColumns, selectColumn } from '@/components/data-table/data-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface FilterOption {
  id: string;
  label: string;
  type: 'checkbox' | 'select' | 'input';
  options?: string[];
}

interface ProductsPageProps {
  products: Product[];
  filterOptions: FilterOption[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ filterOptions }) => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const products = sampleData; // 샘플 데이터를 사용

  const mainFilters = (filterOptions || []).slice(0, 6);
  const additionalFilters = (filterOptions || []).slice(6);

  const columns = React.useMemo(() => [
    selectColumn<Product>(),
    ...buildColumns<Product>('id', 'name', 'price', 'description', 'image')
  ], []);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">상품 목록</h1>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {mainFilters.map((filter) => (
              <FilterItem key={filter.id} filter={filter} />
            ))}
          </div>
          {showMoreFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {additionalFilters.map((filter) => (
                <FilterItem key={filter.id} filter={filter} />
              ))}
            </div>
          )}
          <Button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="mt-4"
          >
            {showMoreFilters ? '접기' : '더보기'}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'default' : 'outline'}
            className="mr-2"
          >
            리스트형
          </Button>
          <Button
            onClick={() => setViewMode('card')}
            variant={viewMode === 'card' ? 'default' : 'outline'}
          >
            카드형
          </Button>
        </div>
        <Select>
          <option value="newest">최신순</option>
          <option value="price-asc">가격 낮은순</option>
          <option value="price-desc">가격 높은순</option>
        </Select>
      </div>

      <DataTable table={table} />

    </div>
  );
};

const FilterItem: React.FC<{ filter: FilterOption }> = ({ filter }) => {
  switch (filter.type) {
    case 'checkbox':
      return (
        <div>
          <label className="flex items-center">
            <Checkbox id={filter.id} />
            <span className="ml-2">{filter.label}</span>
          </label>
        </div>
      );
    case 'select':
      return (
        <div>
          <label htmlFor={filter.id} className="block mb-1">{filter.label}</label>
          <Select>
            {filter.options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>
      );
    case 'input':
      return (
        <div>
          <label htmlFor={filter.id} className="block mb-1">{filter.label}</label>
          <Input id={filter.id} type="text" />
        </div>
      );
    default:
      return null;
  }
};

export default ProductsPage;
