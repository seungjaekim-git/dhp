'use client';

import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, CartItem } from './types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuoteSummaryProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | undefined) => void;
  updateNote: (productId: number | undefined, note: string) => void;
  calculateTotal: () => number;
  sendQuoteByEmail: () => void;
  sendQuoteByKakao: () => void;
  selectedProducts: number[];
  navigateToQuoteOptions: () => void;
}

export default function QuoteSummary({
  cart,
  addToCart,
  removeFromCart,
  updateNote,
  calculateTotal,
  sendQuoteByEmail,
  sendQuoteByKakao,
  selectedProducts,
  navigateToQuoteOptions
}: QuoteSummaryProps) {
  // Filter cart to only include selected products
  const selectedCart = cart.filter(item => selectedProducts.includes(item.id || -1));

  // Group selected items by category (using the child category)
  const groupedItems = selectedCart.reduce((acc, item) => {
    const categoryParts = item.category?.split(' > ') || ['기타'];
    const childCategory = categoryParts.length > 1 ? categoryParts[1] : categoryParts[0];
    
    if (!acc[childCategory]) {
      acc[childCategory] = [];
    }
    acc[childCategory].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <Card className="border-2 border-blue-300 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200 py-4">
        <CardTitle className="text-xl font-extrabold text-blue-800 flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          견적 요약
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 bg-white">
        {selectedCart.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="font-medium">견적서에 추가된 제품이 없습니다.</p>
            <p className="text-sm mt-2">제품 목록에서 원하는 제품을 추가해주세요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Accordion type="multiple" className="w-full">
              {Object.entries(groupedItems).map(([category, items]) => (
                <AccordionItem key={category} value={category} className="border border-blue-100 rounded-lg mb-2 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 bg-blue-50 hover:bg-blue-100 transition-colors">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-blue-700">{category}</span>
                      <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                        {items.length}개
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 bg-white">
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item.id} className="border-b border-gray-100 pb-2 last:border-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{item.name}</p>
                              {item.manufacturer && (
                                <p className="text-xs text-gray-500">
                                  {item.manufacturer.name}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-blue-600">
                                {item.quantity}개
                              </p>
                              {item.packageQuantity && item.packageQuantity > 1 && (
                                <p className="text-xs text-gray-500">
                                  패키지: {item.packageQuantity}개 단위
                                </p>
                              )}
                            </div>
                          </div>
                          {item.note && (
                            <div className="mt-1 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              메모: {item.note}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">총 제품 수:</span>
                <span className="font-bold text-blue-700">{selectedCart.length}개</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-bold text-gray-700">총 카테고리:</span>
                <span className="font-bold text-blue-700">{Object.keys(groupedItems).length}개</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 flex flex-col space-y-3 border-t-2 border-blue-200">
        <Button 
          onClick={navigateToQuoteOptions}
          disabled={selectedCart.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          견적 받기
        </Button>
      </CardFooter>
    </Card>
  );
}
