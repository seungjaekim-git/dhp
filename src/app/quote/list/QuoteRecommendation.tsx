'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Info, Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Markdown from 'react-markdown';

interface Product {
  id: number;
  name: string;
  subtitle?: string;
  manufacturer?: string;
  image?: string;
  category: string;
  specification?: string;
  description?: string;
}

interface QuoteRecommendationProps {
  similarProducts: Product[];
  addToCart: (product: Product) => void;
}

export default function QuoteRecommendation({ similarProducts, addToCart }: QuoteRecommendationProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteProducts');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="mt-12 border border-blue-100 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-blue-800 border-b pb-2">추천 제품</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {similarProducts.map(product => (
          <Card key={product.id} className="border border-gray-200 hover:border-blue-300 transition-all">
            <CardHeader className="p-3 bg-gray-50">
              <CardTitle className="text-md font-medium text-blue-700 line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-3">
              <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden mb-2">
                <Image
                  src={product.image || '/placeholder-image.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="text-xs text-gray-700 space-y-1 mt-2">
                {product.manufacturer && (
                  <p><span className="font-medium">제조사:</span> {product.manufacturer.name}</p>
                )}
                <p><span className="font-medium">카테고리:</span> {product.category || '기타'}</p>
              </div>
            </CardContent>
            
            <CardFooter className="p-3 bg-gray-50 flex justify-between border-t border-gray-100">
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={favorites.includes(product.id) 
                    ? "text-yellow-500 border-yellow-500 h-8 px-2" 
                    : "text-gray-500 border-gray-300 h-8 px-2"}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Star className="h-3 w-3" />
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 h-8 px-2">
                      <Info className="h-3 w-3" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[90%] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-blue-700">{product.name}</SheetTitle>
                      <SheetDescription>
                        {product.subtitle && <p className="text-gray-600 mb-2">{product.subtitle}</p>}
                        {product.manufacturer && <p className="text-sm text-gray-700">제조사: {product.manufacturer}</p>}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      {product.specification && (
                        <div className="border-t pt-4">
                          <h3 className="font-medium text-blue-700 mb-2">제품 사양</h3>
                          <div className="bg-gray-50 p-3 rounded-md text-sm">
                            <pre className="whitespace-pre-wrap">{product.specification}</pre>
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
              </div>
              
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white h-8"
                onClick={() => addToCart(product)}
              >
                <Plus className="h-3 w-3 mr-1" />
                추가
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
