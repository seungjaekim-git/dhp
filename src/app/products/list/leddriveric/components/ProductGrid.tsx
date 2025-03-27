"use client";

import React from "react";
import { ProductSchema } from "../leddrivericListPage";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductGridProps {
  products: ProductSchema[];
  itemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
}

export default function ProductGrid({ 
  products, 
  itemsPerPage = 12,
  onItemsPerPageChange
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  const itemsPerPageOptions = [12, 24, 36, 48];

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // 최대 5개의 페이지 버튼 표시
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 시작 페이지 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <div className="flex items-center justify-center mt-8 gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(1)}
              className="h-8 w-8"
            >
              1
            </Button>
            {startPage > 2 && (
              <span className="mx-1 text-muted-foreground">...</span>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className="h-8 w-8"
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="mx-1 text-muted-foreground">...</span>
            )}
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              className="h-8 w-8"
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 상단 제어 영역 */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          총 {products.length}개 제품 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, products.length)}개 표시
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">페이지당 표시:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              if (onItemsPerPageChange) {
                onItemsPerPageChange(Number(value));
                setCurrentPage(1); // 페이지 수가 변경되면 첫 페이지로 돌아감
              }
            }}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
            <p className="text-muted-foreground">다른 검색어나 필터 조건을 사용해보세요.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {renderPagination()}
    </div>
  );
} 