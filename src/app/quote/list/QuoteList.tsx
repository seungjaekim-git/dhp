'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trash2, Info, X, Check, Plus, Minus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Markdown from 'react-markdown';
import { Product } from './types';

interface QuoteListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  selectedProducts: number[];
  onSelectionChange: (productIds: number[]) => void;
}

export default function QuoteList({ 
  products, 
  addToCart, 
  selectedProducts, 
  onSelectionChange 
}: QuoteListProps) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteProducts');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const removeProduct = (productId: number) => {
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('removedProducts');
      const removedProducts = savedProducts ? JSON.parse(savedProducts) : [];
      localStorage.setItem('removedProducts', JSON.stringify([...removedProducts, productId]));
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(products.map(p => p.id));
    }
  };

  const toggleSelect = (productId: number) => {
    onSelectionChange(
      selectedProducts.includes(productId) 
        ? selectedProducts.filter(id => id !== productId)
        : [...selectedProducts, productId]
    );
  };

  // 카테고리 계층 구조 생성
  const categorizeProducts = () => {
    const categoryTree: Record<string, Record<string, Record<string, Product[]>>> = {};
    
    products.forEach(product => {
      const parentCategory = product.category?.split(' > ')[0] || '기타';
      const childCategory = product.category?.split(' > ')[1] || '일반';
      const grandChildCategory = product.category?.split(' > ')[2] || '기본';
      
      if (!categoryTree[parentCategory]) categoryTree[parentCategory] = {};
      if (!categoryTree[parentCategory][childCategory]) categoryTree[parentCategory][childCategory] = {};
      if (!categoryTree[parentCategory][childCategory][grandChildCategory]) categoryTree[parentCategory][childCategory][grandChildCategory] = [];
      
      categoryTree[parentCategory][childCategory][grandChildCategory].push(product);
    });
    
    return categoryTree;
  };

  const categoryTree = categorizeProducts();

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="selectAll" 
              checked={selectedProducts.length === products.length}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="selectAll" className="text-sm">
              모두선택
            </label>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => selectedProducts.forEach(removeProduct)}
          >
            선택삭제
          </Button>
        </div>

        <div className="flex items-center justify-between bg-white shadow-sm rounded-md p-3 mb-4 border border-blue-400">
          <p className="text-sm text-blue-500 font-medium">
            견적 요청 시 상세 가격 확인 가능
          </p>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {Object.entries(categoryTree).map(([parentCategory, childCategories]) => (
          <Card key={parentCategory} className="mb-6">
            <div className="bg-blue-50 text-center py-3 border-b border-blue-200">
              <h2 className="text-lg font-bold text-blue-800">{parentCategory}</h2>
            </div>
            
            {Object.entries(childCategories).map(([childCategory, grandChildCategories]) => (
              <div key={childCategory} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-50 px-4 py-2">
                  <h3 className="text-md font-semibold text-gray-700">{childCategory}</h3>
                </div>
                
                {Object.entries(grandChildCategories).map(([grandChildCategory, categoryProducts]) => (
                  <div key={grandChildCategory} className="px-4 py-2 border-t border-gray-100 first:border-t-0">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{grandChildCategory}</h4>
                    
                    {categoryProducts.map(product => (
                      <div 
                        key={product.id} 
                        className="p-4 mb-3 bg-white rounded-lg transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:border"
                      >
                        <div className="relative pl-10">
                          <Checkbox 
                            className="absolute left-0 top-0"
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleSelect(product.id)}
                          />
                          <div className="flex space-x-3 mb-4">
                            <div className="w-[70px] h-[70px] rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={product.images && product.images.length > 0 
                                  ? product.images[0].url 
                                  : '/placeholder-image.jpg'}
                                alt={product.name}
                                width={70}
                                height={70}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                {product.manufacturer?.name} | {product.category || '기타'}
                              </p>
                              <h3 className="text-base font-bold text-gray-800 mb-1">{product.name}</h3>
                              {product.subtitle && (
                                <p className="text-sm text-gray-600 italic">{product.subtitle}</p>
                              )}
                              <div className="flex items-center mt-2 text-sm">
                                <span className="font-medium text-gray-700 mr-4">단위: {product.unit || '개'}</span>
                                <span className="font-medium text-gray-700">패키지 수량: {product.packageQuantity || 1}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => removeProduct(product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="ghost" size="sm">상세정보</Button>
                              </SheetTrigger>
                              <SheetContent className="w-[90%] sm:w-[540px] overflow-y-auto">
                                <SheetHeader>
                                  <SheetTitle className="text-blue-700">{product.name}</SheetTitle>
                                  <SheetDescription>
                                    {product.subtitle && <p className="text-gray-600 mb-2">{product.subtitle}</p>}
                                    {product.manufacturer && <p className="text-sm text-gray-700">제조사: {product.manufacturer.name}</p>}
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                  {product.specifications && (
                                    <div className="border-t pt-4">
                                      <h3 className="font-medium text-blue-700 mb-2">제품 사양</h3>
                                      <div className="bg-gray-50 p-3 rounded-md text-sm">
                                        <pre className="whitespace-pre-wrap">{JSON.stringify(product.specifications, null, 2)}</pre>
                                      </div>
                                    </div>
                                  )}
                                  {product.description && (
                                    <div className="border-t pt-4">
                                      <h3 className="font-medium text-blue-700 mb-2">제품 설명</h3>
                                      <div className="prose prose-sm max-w-none">
                                        <Markdown>{product.description}</Markdown>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </SheetContent>
                            </Sheet>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={favorites.includes(product.id) 
                                ? "text-yellow-500 border-yellow-500" 
                                : "text-gray-500 border-gray-300"}
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              {favorites.includes(product.id) ? '즐겨찾기 해제' : '즐겨찾기'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
