"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  Copy, 
  Info, 
  Send, 
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useQuoteCart } from "@/hooks/useClientStore";

const QuoteRequestForm = () => {
  const [noteValue, setNoteValue] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  const [requesting, setRequesting] = useState(false);
  const [requestMethod, setRequestMethod] = useState("email");
  const { toast } = useToast();
  
  // Zustand 스토어 사용
  const { 
    cartItems, 
    cartItemCount, 
    totalQuantity, 
    removeFromCart, 
    clearCart, 
    updateQuantity 
  } = useQuoteCart();

  // 견적 요청 제출
  const submitQuoteRequest = (method: string) => {
    if (cartItemCount === 0) {
      toast({
        title: "견적 요청 실패",
        description: "장바구니에 제품이 없습니다. 제품을 추가한 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 필수 입력 필드 확인
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast({
        title: "입력 정보 확인",
        description: "이름, 이메일, 연락처는 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }

    setRequesting(true);
    
    // 요청 방법에 따른 메시지 설정
    const methodText = method === 'kakao' ? '카카오 채널을 통해' : '이메일로';
    
    // 백엔드 API 호출 대신 타이머 사용
    setTimeout(() => {
      setRequesting(false);
      
      toast({
        title: "견적 요청이 성공적으로 제출되었습니다",
        description: `담당자가 ${methodText} 빠른 시일 내에 연락드리겠습니다.`,
        variant: "success",
      });
      
      // 성공 후 장바구니 비우기
      clearCart();
    }, 1500);
  };

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "복사되었습니다",
      description: "클립보드에 복사되었습니다.",
      variant: "default",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">견적 장바구니</h1>
        </div>
      </div>

      {cartItemCount === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
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
            {/* 장바구니 상품 요약 */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  장바구니 요약
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">총 제품 종류</span>
                  <Badge variant="outline" className="font-mono">{cartItemCount}개</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">총 수량</span>
                  <Badge variant="outline" className="font-mono">{totalQuantity}개</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-600">제조사 수</span>
                  <Badge variant="outline" className="font-mono">{Object.keys(groupedByManufacturer).length}개</Badge>
                </div>
              </CardContent>
            </Card>
            
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
                              
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-blue-500"
                                  asChild
                                >
                                  <Link href={`/products/detail/${item.id}`}>
                                    <ExternalLink className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-red-500"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
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
                <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50">
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    견적 요청 정보
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="name">이름 / 담당자명 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="홍길동" 
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">이메일 <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@company.com" 
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">연락처 <span className="text-red-500">*</span></Label>
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
                  
                  <Separator />
                  
                  <div>
                    <Label className="mb-3 block">견적 요청 방법</Label>
                    <RadioGroup 
                      value={requestMethod} 
                      onValueChange={setRequestMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                        <RadioGroupItem value="email" id="email" />
                        <Label 
                          htmlFor="email" 
                          className="flex items-center gap-2 cursor-pointer font-normal flex-1"
                        >
                          <Mail className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="font-medium">이메일로 요청</p>
                            <p className="text-xs text-gray-500">영업일 기준 24시간 내 답변</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                        <RadioGroupItem value="kakao" id="kakao" />
                        <Label 
                          htmlFor="kakao" 
                          className="flex items-center gap-2 cursor-pointer font-normal flex-1"
                        >
                          <MessageSquare className="h-4 w-4 text-yellow-500" />
                          <div>
                            <p className="font-medium">카카오 채널로 요청</p>
                            <p className="text-xs text-gray-500">실시간 상담 가능 (09:00-18:00)</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {requestMethod === 'kakao' && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                      <h4 className="text-sm font-medium flex items-center gap-2 mb-2 text-yellow-700">
                        <MessageSquare className="h-4 w-4" />
                        카카오 채널 정보
                      </h4>
                      <p className="text-xs text-yellow-700 mb-2">
                        아래 카카오 채널로 문의하시면 빠른 상담이 가능합니다.
                      </p>
                      <div className="flex items-center justify-between bg-white rounded p-2 mb-2">
                        <span className="text-sm font-mono">@대한플러스전자</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('@대한플러스전자')}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <Button 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={() => window.open('https://pf.kakao.com/')}
                      >
                        카카오 채널 열기
                      </Button>
                    </div>
                  )}
                  
                  {requestMethod === 'email' && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="text-sm font-medium flex items-center gap-2 mb-2 text-blue-700">
                        <Mail className="h-4 w-4" />
                        이메일 견적 요청
                      </h4>
                      <p className="text-xs text-blue-700 mb-3">
                        입력하신 이메일로 견적서가 발송됩니다. 업무일 기준 24시간 이내에 답변드립니다.
                      </p>
                      <div className="flex items-center justify-between bg-white rounded p-2 mb-2">
                        <span className="text-sm font-mono">sales@dhes.co.kr</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard('sales@dhes.co.kr')}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-3 text-sm flex items-start">
                    <Info className="h-4 w-4 text-gray-600 mt-0.5 mr-2 shrink-0" />
                    <p className="text-gray-700">
                      견적 요청 시 담당자가 빠른 시일 내에 이메일 또는 연락처로 견적서와 함께 연락드립니다.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className="w-full py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700"
                      onClick={() => submitQuoteRequest(requestMethod)}
                      disabled={requesting}
                    >
                      {requesting ? (
                        <>
                          <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                          처리 중...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          견적 요청하기
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* 문의 카드 */}
              <Card className="mt-4">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">전화 문의</h3>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600 text-sm">02-6679-5025</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => copyToClipboard('02-6679-5025')}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      복사
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">평일 09:00 ~ 18:00 (점심: 12:00 ~ 13:00)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteRequestForm; 