'use client';

import { ShoppingCart, PlusCircle, MinusCircle, Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from './types';

interface QuoteSummaryProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateNote: (productId: number, note: string) => void;
  calculateTotal: () => number;
  sendQuoteByEmail: () => void;
  sendQuoteByKakao: () => void;
}

export default function QuoteSummary({
  cart,
  addToCart,
  removeFromCart,
  updateNote,
  calculateTotal,
  sendQuoteByEmail,
  sendQuoteByKakao
}: QuoteSummaryProps) {
  const [email, setEmail] = useState('');

  // 카테고리별로 제품 그룹화
  const groupedItems = cart.reduce((acc, item) => {
    const category = item.category || '기타';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Card className="border border-blue-200 shadow-sm">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-xl text-blue-800">견적 요약</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>견적서에 추가된 제품이 없습니다.</p>
            <p className="text-sm mt-2">제품 목록에서 원하는 제품을 추가해주세요.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-blue-700 mb-2">{category}</h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item.id} className="text-sm">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.manufacturer && (
                            <span className="text-gray-500 ml-1">
                              ({item.manufacturer.name})
                            </span>
                          )}
                        </div>
                        {item.quantity && <span className="text-gray-600">수량: {item.quantity}</span>}
                      </div>
                      {item.note && (
                        <div className="mt-1 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                          메모: {item.note}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex flex-col space-y-3 border-t border-gray-200">
        <Button 
          onClick={sendQuoteByEmail}
          disabled={cart.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Mail className="mr-2 h-4 w-4" />
          이메일로 견적서 받기
        </Button>
        
        <Button 
          onClick={sendQuoteByKakao}
          disabled={cart.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Send className="mr-2 h-4 w-4" />
          카카오톡으로 견적서 받기
        </Button>
      </CardFooter>
    </Card>
  );
}
