"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Trash2, 
  Package, 
  ArrowLeft, 
  Plus, 
  Minus,
  Send,
  FileText,
  Factory,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// QuoteCartItem 인터페이스 정의
interface QuoteCartItem {
  id: number;
  name: string;
  quantity: number;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
}

export default function QuoteCartClient() {
  const [cartItems, setCartItems] = useState<QuoteCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [noteValue, setNoteValue] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  const { toast } = useToast();

  // 장바구니 불러오기
  useEffect(() => {
    // SSG에서는 초기 렌더링 시 window 객체가 없으므로 클라이언트 사이드에서만 실행
    const loadCartItems = () => {
      try {
        const storedCart = localStorage.getItem('quoteCart');
        if (storedCart) {
          const parsedCart: QuoteCartItem[] = JSON.parse(storedCart);
          // 날짜 내림차순으로 정렬
          parsedCart.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
          setCartItems(parsedCart);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to load cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();

    // localStorage 변경 이벤트 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'quoteCart') {
        loadCartItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 장바구니에서 상품 제거
  const removeFromCart = (itemId: number) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem('quoteCart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      toast({
        title: "상품이 제거되었습니다",
        description: "견적 장바구니에서 제품이 제거되었습니다.",
        variant: "default",
      });

      // 다른 탭에 있는 navbar 등에 알림
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'quoteCart',
        newValue: JSON.stringify(updatedCart)
      }));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // 장바구니 비우기
  const clearCart = () => {
    try {
      localStorage.removeItem('quoteCart');
      setCartItems([]);

      toast({
        title: "장바구니가 비워졌습니다",
        description: "모든 제품이 견적 장바구니에서 제거되었습니다.",
        variant: "default",
      });

      // 다른 탭에 있는 navbar 등에 알림
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'quoteCart',
        newValue: JSON.stringify([])
      }));
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // 수량 업데이트
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const updatedCart = cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity, addedAt: new Date().toISOString() } 
          : item
      );
      
      localStorage.setItem('quoteCart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      // 다른 탭에 있는 navbar 등에 알림
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'quoteCart',
        newValue: JSON.stringify(updatedCart)
      }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // 견적 요청 제출
  const submitQuoteRequest = () => {
    if (cartItems.length === 0) {
      toast({
        title: "견적 요청 실패",
        description: "장바구니에 제품이 없습니다. 제품을 추가한 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 여기에 실제 견적 요청 API 호출 로직 구현
    // 예시: 서버에 견적 요청 정보 전송
    
    toast({
      title: "견적 요청이 성공적으로 제출되었습니다",
      description: "담당자가 검토 후 빠른 시일 내에 연락드리겠습니다.",
      variant: "success",
    });

    // 요청 성공 후 장바구니 비우기
    clearCart();
  };

  // 총 수량 계산
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 제조사별로 상품 그룹화
  const groupedByManufacturer = cartItems.reduce((acc, item) => {
    const key = item.manufacturerId;
    if (!acc[key]) {
      acc[key] = {
        manufacturerName: item.manufacturerName,
        items: []
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {} as Record<number, { manufacturerName: string; items: QuoteCartItem[] }>);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link 
            href="/products" 
            className="inline-flex items-center text-sm text-blue-600 hover:underline mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            제품 검색으로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">견적 장바구니</h1>
        </div>
        
        {cartItems.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                전체 비우기
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>장바구니 비우기</AlertDialogTitle>
                <AlertDialogDescription>
                  모든 제품이 장바구니에서 제거됩니다. 계속하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={clearCart} className="bg-red-500 hover:bg-red-600 text-white">
                  비우기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">장바구니가 비어 있습니다</h2>
          <p className="text-gray-500 mb-6">
            견적을 요청할 제품을 장바구니에 추가해주세요.
          </p>
          <Button asChild>
            <Link href="/products">
              <Package className="mr-2 h-5 w-5" />
              제품 검색하기
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 제조사별 그룹 */}
            {Object.values(groupedByManufacturer).map((group, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50 py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Factory className="h-5 w-5 mr-2 text-blue-600" />
                      {group.manufacturerName}
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {group.items.length}개 제품
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="py-4">
                  <ul className="divide-y divide-gray-200">
                    {group.items.map((item) => (
                      <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          {/* 제품 이미지 */}
                          <div className="shrink-0">
                            {item.imageUrl ? (
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {item.name.substring(0, 2)}
                              </div>
                            )}
                          </div>
                          
                          {/* 제품 정보 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900">
                                  <Link href={`/products/detail/${item.id}`} className="hover:text-blue-600 hover:underline">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {item.subtitle}
                                </p>
                                
                                {item.packageType && (
                                  <Badge variant="outline" className="mt-2 font-mono">
                                    {item.packageType}
                                  </Badge>
                                )}
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* 수량 조절 */}
                            <div className="mt-4 flex items-center">
                              <span className="text-sm text-gray-500 mr-3">수량:</span>
                              <div className="flex items-center border border-gray-200 rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-lg"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= 1) {
                                      updateQuantity(item.id, val);
                                    }
                                  }}
                                  className="h-8 w-16 text-center border-x border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-lg"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="ml-auto text-sm font-medium">
                                요청일: {new Date(item.addedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 견적 요청 양식 */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    견적 요청 정보
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">이름 / 담당자명</Label>
                    <Input 
                      id="name" 
                      placeholder="홍길동" 
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@company.com" 
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">연락처</Label>
                    <Input 
                      id="phone" 
                      placeholder="010-1234-5678" 
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">회사명</Label>
                    <Input 
                      id="company" 
                      placeholder="주식회사 예시" 
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">추가 요청사항</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="예: 납기일, 특이사항, 기타 요구사항 등을 입력해주세요." 
                      rows={3}
                      value={noteValue}
                      onChange={(e) => setNoteValue(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 text-sm flex items-start">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2 shrink-0" />
                    <p className="text-blue-700">
                      견적 요청 후 담당자가 1-2영업일 내에 이메일 또는 연락처로 견적서를 보내드립니다.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={submitQuoteRequest} className="w-full">
                      견적 요청하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 