"use client";

import React from "react";
import { ProductSchema } from "../leddrivericListPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Scale, ExternalLink, Heart, ChevronLeft, ChevronRight, ZapIcon, 
         BoxIcon, Activity as CurrentIcon, ThermometerIcon, CheckCircle2, BookmarkIcon, ShoppingCart } from "lucide-react";
import { useBookmarks, useQuoteCart } from "@/hooks/useClientStore";
import { useCompareItems } from "../hooks/useCompareItems";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductListProps {
  products: ProductSchema[];
  itemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
}

export default function ProductList({
  products,
  itemsPerPage = 10,
  onItemsPerPageChange
}: ProductListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { toast } = useToast();
  const bookmarkStore = useBookmarks();
  const quoteCartStore = useQuoteCart();
  const compareStore = useCompareItems();
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  const itemsPerPageOptions = [5, 10, 15, 20, 25];

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 북마크 토글 처리
  const handleToggleBookmark = (product: ProductSchema) => {
    if (!bookmarkStore) return;
    
    const isBookmarked = bookmarkStore.isBookmarked?.(product.id) || false;
    
    if (isBookmarked) {
      bookmarkStore.removeBookmark(product.id);
      
      toast({
        title: "북마크 제거됨",
        description: `${product.part_number || product.name} 제품이 북마크에서 제거되었습니다.`,
      });
    } else {
      const bookmarkItem = {
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        manufacturerName: product.manufacturer.name,
        manufacturerId: product.manufacturer.id,
        part_number: product.part_number || "",
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
        addedAt: new Date().toISOString()
      };
      
      bookmarkStore.addBookmark(bookmarkItem);
      
      toast({
        title: "북마크 추가됨",
        description: `${product.part_number || product.name} 제품이 북마크에 추가되었습니다.`,
      });
    }
  };

  // 견적서에 추가 처리
  const handleAddToQuoteCart = (product: ProductSchema) => {
    if (!quoteCartStore || !quoteCartStore.items) return;
    
    const isInQuoteCart = quoteCartStore.items.some((item) => item.id === product.id);
    
    if (!isInQuoteCart) {
      const cartItem = {
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        manufacturerName: product.manufacturer.name,
        manufacturerId: product.manufacturer.id,
        part_number: product.part_number || "",
        quantity: 1,
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
        addedAt: new Date().toISOString()
      };
      
      quoteCartStore.addItem(cartItem);
      toast({
        title: "견적함에 추가되었습니다",
        description: `${product.name}이(가) 견적함에 추가되었습니다.`,
        variant: "default",
      });
    } else {
      toast({
        title: "이미 견적함에 있는 제품입니다",
        description: `${product.name}은(는) 이미 견적함에 있습니다.`,
        variant: "default",
      });
    }
  };

  // 비교 항목에 추가 처리
  const handleToggleCompare = (product: ProductSchema) => {
    if (!compareStore) return;
    
    const isInCompare = compareStore.items && Array.isArray(compareStore.items) && 
      compareStore.items.some((item: any) => item.id === product.id) || false;
    
    if (isInCompare) {
      if (typeof compareStore.removeItem === 'function') {
        compareStore.removeItem(product.id);
      }
      
      toast({
        title: "비교 항목에서 제거됨",
        description: `${product.part_number || product.name} 제품이 비교 항목에서 제거되었습니다.`,
      });
    } else {
      if (compareStore.items && compareStore.items.length >= 4) {
        toast({
          title: "비교 항목 제한",
          description: "최대 4개의 제품만 비교할 수 있습니다.",
          variant: "destructive",
        });
        return;
      }
      
      const compareItem = {
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer.name,
        part_number: product.part_number || "",
        thumbnail: product.images && product.images.length > 0 ? product.images[0]?.url : "/placeholder.png",
        category: "LED 드라이버 IC",
      };
      
      if (typeof compareStore.addItem === 'function') {
        compareStore.addItem(compareItem);
      }
      
      toast({
        title: "비교 항목에 추가됨",
        description: `${product.part_number || product.name} 제품이 비교 항목에 추가되었습니다.`,
      });
    }
  };

  // 제품의 인증 표시
  const renderCertifications = (product: ProductSchema) => {
    if (!product.certifications || product.certifications.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {product.certifications.slice(0, 2).map((cert, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="text-[10px] h-5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {cert.certification.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{cert.certification.name} 인증</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {product.certifications.length > 2 && (
          <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700">
            +{product.certifications.length - 2}
          </Badge>
        )}
      </div>
    );
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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

      {/* 제품 리스트 */}
      <div className="space-y-3">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => {
            const isBookmarked = bookmarkStore && bookmarkStore.isBookmarked && bookmarkStore.isBookmarked(product.id) || false;
            const isInQuoteCart = quoteCartStore && quoteCartStore.items && Array.isArray(quoteCartStore.items) && 
                                 quoteCartStore.items.some((item) => item.id === product.id) || false;
            const isInCompare = compareStore && compareStore.items && Array.isArray(compareStore.items) && 
                               compareStore.items.some((item: any) => item.id === product.id) || false;
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* 제품 이미지 */}
                    <div className="w-full sm:w-48 h-40 relative bg-slate-50 border-b sm:border-b-0 sm:border-r">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          이미지 없음
                        </div>
                      )}
                    </div>
                    
                    {/* 제품 정보 */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {product.manufacturer.name}
                          </Badge>
                          {product.specifications?.channels && (
                            <Badge variant="outline" className="mb-2 bg-purple-50 text-purple-700 hover:bg-purple-100">
                              {product.specifications.channels} 채널
                            </Badge>
                          )}
                          {renderCertifications(product)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-8 px-2 text-xs",
                              bookmarkStore && bookmarkStore.items.some(b => b.id === product.id)
                                ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700"
                                : "hover:bg-yellow-50 hover:text-yellow-600"
                            )}
                            onClick={() => handleToggleBookmark(product)}
                          >
                            {bookmarkStore && bookmarkStore.items.some(b => b.id === product.id) ? (
                              <BookmarkIcon className="h-3.5 w-3.5 mr-1 fill-yellow-500 text-yellow-500" />
                            ) : (
                              <BookmarkIcon className="h-3.5 w-3.5 mr-1" />
                            )}
                            즐겨찾기
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-8 px-2 text-xs",
                              quoteCartStore && quoteCartStore.items.some(item => item.id === product.id)
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                : "hover:bg-blue-50 hover:text-blue-600"
                            )}
                            onClick={() => handleAddToQuoteCart(product)}
                          >
                            {quoteCartStore && quoteCartStore.items.some(item => item.id === product.id) ? (
                              <ShoppingCart className="h-3.5 w-3.5 mr-1 fill-blue-500 text-blue-500" />
                            ) : (
                              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                            )}
                            견적함
                          </Button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-1">
                        <Link href={`/products/detail/leddriveric/${product.id}`} className="hover:underline">
                          {product.part_number || product.name}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description || product.subtitle || "LED 드라이버 IC"}
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs mb-4">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground flex items-center">
                            <ZapIcon className="w-3 h-3 mr-1 text-amber-500" />
                            입력 전압
                          </span>
                          <span className="font-medium">
                            {product.specifications?.input_voltage 
                              ? `${product.specifications.input_voltage.min || '?'}~${product.specifications.input_voltage.max || '?'}${product.specifications.input_voltage.unit || 'V'}` 
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground flex items-center">
                            <CurrentIcon className="w-3 h-3 mr-1 text-emerald-500" />
                            출력 전류
                          </span>
                          <span className="font-medium">
                            {product.specifications?.output_current 
                              ? `${product.specifications.output_current.min || '?'}~${product.specifications.output_current.max || '?'}${product.specifications.output_current.unit || 'mA'}` 
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground flex items-center">
                            <BoxIcon className="w-3 h-3 mr-1 text-blue-500" />
                            패키지
                          </span>
                          <span className="font-medium">
                            {product.specifications?.package_type || "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground flex items-center">
                            <ThermometerIcon className="w-3 h-3 mr-1 text-red-500" />
                            동작 온도
                          </span>
                          <span className="font-medium">
                            {product.specifications?.operating_temperature 
                              ? `${product.specifications.operating_temperature.min || '?'}~${product.specifications.operating_temperature.max || '?'}${product.specifications.operating_temperature.unit || '°C'}`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            토폴로지
                          </span>
                          <span className="font-medium line-clamp-1">
                            {product.specifications?.topology 
                              ? product.specifications.topology[0] || "N/A" 
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            디밍 방식
                          </span>
                          <span className="font-medium">
                            {product.specifications?.dimming_method 
                              ? product.specifications.dimming_method.join(", ") 
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Button 
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-8 px-2 text-xs",
                            compareStore && compareStore.items.some(c => c.id === product.id)
                              ? "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                              : "hover:bg-green-50 hover:text-green-600"
                          )}
                          onClick={() => handleToggleCompare(product)}
                        >
                          {compareStore && compareStore.items.some(c => c.id === product.id) ? (
                            <Scale className="h-3.5 w-3.5 mr-1 fill-green-500 text-green-500" />
                          ) : (
                            <Scale className="h-3.5 w-3.5 mr-1" />
                          )}
                          비교
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          asChild
                        >
                          <Link href={`/products/detail/leddriveric/${product.id}`}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            상세 보기
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
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