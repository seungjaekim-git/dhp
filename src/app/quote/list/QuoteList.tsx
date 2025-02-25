'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trash2, Info } from 'lucide-react';
import Markdown from 'react-markdown';
import { Product } from './types';

interface QuoteListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function QuoteList({ products, addToCart }: QuoteListProps) {
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
    // 여기서 상태 업데이트나 다른 로직을 추가할 수 있습니다
  };

  // 카테고리별로 제품 그룹화
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || '기타';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="border border-blue-100 rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryProducts.map(product => (
              <Card key={product.id} className="overflow-hidden border border-gray-200 hover:border-blue-300 transition-all">
                <CardHeader className="bg-gray-50 p-4">
                  <CardTitle className="text-lg font-medium text-blue-700">{product.name}</CardTitle>
                  {product.subtitle && <p className="text-sm text-gray-600">{product.subtitle}</p>}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={product.images && product.images.length > 0 
                          ? product.images[0].url 
                          : '/placeholder-image.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      {product.manufacturer && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">제조사:</span> {product.manufacturer.name}
                        </p>
                      )}
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">카테고리:</span> {product.category || '기타'}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-3 flex justify-between">
                  <div className="flex space-x-2">
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
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-300"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      삭제
                    </Button>
                  </div>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                        <Info className="h-4 w-4 mr-1" />
                        상세정보
                      </Button>
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
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
