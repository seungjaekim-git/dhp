"use client";

import React from "react";
import { ProductSchema } from "../leddrivericListPage";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Scale, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: ProductSchema[];
  itemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
  isBookmarked: (id: number) => boolean;
  isInQuote: (id: number) => boolean;
  isInCompare: (id: number) => boolean;
  onToggleBookmark: (product: ProductSchema) => void;
  onToggleQuote: (product: ProductSchema) => void;
  onToggleCompare: (product: ProductSchema) => void;
}

export default function ProductGrid({ 
  products, 
  itemsPerPage = 12,
  onItemsPerPageChange,
  isBookmarked,
  isInQuote,
  isInCompare,
  onToggleBookmark,
  onToggleQuote,
  onToggleCompare
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
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <Link
                  href={`/products/detail/${product.id}`}
                  className="block p-4"
                >
                  <div className="aspect-square relative flex items-center justify-center overflow-hidden rounded-md bg-muted">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      {product.manufacturer?.name}
                    </div>
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {product.part_number}
                    </div>
                    
                    {/* 주요 사양 뱃지 */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.specifications?.input_voltage && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {product.specifications.input_voltage.min} - {product.specifications.input_voltage.max}V
                        </Badge>
                      )}
                      {product.specifications?.output_current && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          ~{product.specifications.output_current.max}mA
                        </Badge>
                      )}
                      {product.specifications?.channels && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {product.specifications.channels}채널
                        </Badge>
                      )}
                      {product.specifications?.package_type && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {product.specifications.package_type}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
                
                <div className="border-t p-2 flex justify-between">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-md",
                        isBookmarked(product.id) && "text-yellow-500 hover:text-yellow-600"
                      )}
                      onClick={() => onToggleBookmark(product)}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">즐겨찾기</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-md",
                        isInQuote(product.id) && "text-green-500 hover:text-green-600"
                      )}
                      onClick={() => onToggleQuote(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">견적함 담기</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-md",
                        isInCompare(product.id) && "text-blue-500 hover:text-blue-600"
                      )}
                      onClick={() => onToggleCompare(product)}
                    >
                      <Scale className="h-4 w-4" />
                      <span className="sr-only">비교하기</span>
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    asChild
                  >
                    <Link href={`/products/detail/${product.id}`}>
                      상세보기
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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