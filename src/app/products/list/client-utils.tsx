"use client";

import React from "react";
import type { Product, Category, Manufacturer, Application, FilterOption } from "./constants";
import { CircleIcon, LightbulbIcon, ZapIcon, BatteryIcon, CarIcon, HomeIcon, SparklesIcon } from "lucide-react";

// URL SearchParams 생성 유틸리티 (클라이언트 전용)
export function createSearchParamsURL(
  baseURL: string,
  params: Record<string, string | string[]>
): string {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val) urlParams.append(key, val);
      });
    } else if (value) {
      urlParams.set(key, value);
    }
  });
  
  const queryString = urlParams.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
}

// 필터 옵션에 아이콘 추가하는 함수
export function addIconsToCategories(categories: any[]) {
  const categoryIcons: Record<string, JSX.Element> = {
    "LED": <LightbulbIcon className="h-4 w-4 text-amber-400" />,
    "Transistor": <ZapIcon className="h-4 w-4 text-blue-400" />,
    "Battery": <BatteryIcon className="h-4 w-4 text-green-400" />,
    "Automotive": <CarIcon className="h-4 w-4 text-red-400" />,
    "Home Appliance": <HomeIcon className="h-4 w-4 text-purple-400" />,
    "Other": <SparklesIcon className="h-4 w-4 text-gray-400" />
  };
  
  return categories.map(category => ({
    ...category,
    icon: categoryIcons[category.label] || <CircleIcon className="h-4 w-4 text-gray-400" />
  }));
}

// 제품 필터링 함수
export function filterProducts(
  products: Product[],
  categoryFilter: string | string[] = [],
  manufacturerFilter: string | string[] = [],
  applicationFilter: string | string[] = [],
  searchQuery: string = ""
): Product[] {
  // 필터 배열로 변환
  const categories = Array.isArray(categoryFilter) 
    ? categoryFilter 
    : categoryFilter ? [categoryFilter] : [];
    
  const manufacturers = Array.isArray(manufacturerFilter)
    ? manufacturerFilter
    : manufacturerFilter ? [manufacturerFilter] : [];
    
  const applications = Array.isArray(applicationFilter)
    ? applicationFilter
    : applicationFilter ? [applicationFilter] : [];
  
  // 검색어 정규화
  const query = searchQuery?.toLowerCase().trim() || "";
  
  return products.filter(product => {
    // 카테고리 필터
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }
    
    // 제조사 필터
    if (manufacturers.length > 0 && !manufacturers.includes(product.manufacturer_id)) {
      return false;
    }
    
    // 응용 분야 필터
    if (applications.length > 0) {
      // product.applications가 없거나 빈 배열이면 매치되지 않음
      if (!product.applications || product.applications.length === 0) {
        return false;
      }
      
      // 하나라도 일치하는 응용 분야가 있는지 확인
      if (!applications.some(app => product.applications.includes(app))) {
        return false;
      }
    }
    
    // 검색어 필터
    if (query) {
      return (
        product.name.toLowerCase().includes(query) ||
        product.part_number.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
}

// 제품 정렬 함수
export function sortProducts(
  products: Product[],
  sortOrder: string | null
): Product[] {
  if (!sortOrder) return products;
  
  const [field, direction] = sortOrder.split(":");
  const isAsc = direction !== "desc";
  
  return [...products].sort((a: Product, b: Product) => {
    let valueA: any;
    let valueB: any;
    
    // 정렬 필드에 따라 비교값 설정
    if (field === "name") {
      valueA = a.name;
      valueB = b.name;
    } else if (field === "manufacturer") {
      valueA = a.manufacturer_name;
      valueB = b.manufacturer_name;
    } else if (field === "category") {
      valueA = a.category;
      valueB = b.category;
    } else {
      // 기본값으로 이름 사용
      valueA = a.name;
      valueB = b.name;
    }
    
    // null 또는 undefined 체크
    valueA = valueA || "";
    valueB = valueB || "";
    
    // 오름차순/내림차순에 따른 정렬
    if (isAsc) {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
} 