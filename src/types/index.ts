import type { FilterOperator } from '@/config/filter-operators'

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  caption: string
  id: string
  count?: number
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableFilterField<TData> {
  caption: string
  key: keyof TData
  placeholder?: string
  options?: Option[]
}

export interface DataTableFilterOption<TData> {
  id: string
  caption: string
  key: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: FilterOperator
}

// Product related types
export interface Product {
  id: number;
  name: string;
  part_number?: string;
  partNumber?: string;
  description?: string;
  manufacturer_id?: number;
  manufacturer_name?: string;
  manufacturer?: string;
  applications?: any[];
  parameters?: any;
  image?: string;
  storage_type_id?: number;
  subtitle?: string;
  documents?: Document[];
}

export interface Document {
  id: number;
  title: string;
  url: string;
  type?: string;
  type_id?: number;
  document_types?: DocumentType;
}

export interface DocumentType {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  logo?: string;
  website_url?: string;
}

// User-related types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  role?: string;
  company_name?: string;
  phone?: string;
}

// Other types
export interface Application {
  id: number;
  name: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  image?: string;
}

export interface Bookmark {
  id: number;
  user_id: string;
  product_id: number;
  created_at: string;
}

export interface QuoteItem {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
}

export interface ProductDocument {
  product_id: number;
  document_id: number;
  document: Document;
}