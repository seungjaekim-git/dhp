"use client";

import { DataTable } from "./components/DataTable";
import { generateProductColumns } from "./components/columns";
import { Product, FilterOption } from "./constants";

interface ProductListPageProps {
  products: Product[];
  categories: FilterOption[];
  manufacturers: FilterOption[];
  applications: FilterOption[];
}

export function ProductListPage({
  products,
  categories,
  manufacturers, 
  applications,
}: ProductListPageProps) {
  // 컬럼 설정
  const columns = generateProductColumns();
  
  return (
    <div>
      <DataTable 
        data={products} 
        columns={columns}
      />
    </div>
  );
}
