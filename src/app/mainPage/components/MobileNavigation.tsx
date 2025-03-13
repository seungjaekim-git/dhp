"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectGroup, 
  SelectLabel, 
  SelectItem 
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  Heart, 
  ExternalLink, 
  Trash2, 
  ChevronRight, 
  PlusCircle,
  Menu,
  X
} from "lucide-react";
import { useQuoteCartStore } from "@/store/quoteCartStore";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { BookmarkedProduct } from "@/store/bookmarkStore";
import { QuoteCartItem } from "@/store/quoteCartStore";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { navigationConfig } from "@/config/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileNavigation = () => {
  const { toast } = useToast();
  
  // 장바구니 상태
  const { items: cartItems, addItem: addToCart, removeItem: removeFromCart } = useQuoteCartStore();
  const cartItemCount = cartItems.length;
  
  // 북마크 상태
  const { 
    items: bookmarks, 
    addBookmark,
    removeBookmark 
  } = useBookmarkStore();
  const bookmarkCount = bookmarks.length;
  
  const [isOpen, setIsOpen] = React.useState(false);
  
  // 제품 삭제 함수
  const handleRemoveFromCart = React.useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeFromCart(itemId);
    
    toast({
      title: "제품이 장바구니에서 삭제되었습니다",
      description: "견적 요청 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeFromCart, toast]);

  // 북마크 삭제 함수
  const handleRemoveFromBookmarks = React.useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeBookmark(itemId);
    
    toast({
      title: "북마크에서 삭제되었습니다",
      description: "북마크 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeBookmark, toast]);
  
  // 북마크 상품을 견적 장바구니에 추가
  const handleAddToQuoteCart = React.useCallback((e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    e.preventDefault();
    
    const cartItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      subtitle: item.subtitle,
      manufacturerName: item.manufacturerName,
      manufacturerId: item.manufacturerId,
      addedAt: new Date().toISOString(),
      imageUrl: item.imageUrl || "",
      packageType: item.packageType || "",
      category: item.category || "기타"
    };
    
    addToCart(cartItem);
    
    toast({
      title: "견적 장바구니에 추가되었습니다",
      description: "견적 요청 목록에 제품이 추가되었습니다.",
      variant: "default",
    });
  }, [addToCart, toast]);

  const renderQuoteCartContent = React.useCallback(() => {
    if (!cartItemCount || cartItemCount === 0) {
      return (
        <div className="py-8 px-4 text-center text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-base font-medium mb-1">견적 장바구니가 비어있습니다</h3>
          <p className="text-xs mb-4">제품 페이지에서 견적 요청할 제품을 추가해 보세요</p>
          <SheetClose asChild>
            <Link href="/products/list/leddriveric">
              <Button variant="outline" className="rounded-full text-sm px-4">
                제품 둘러보기
              </Button>
            </Link>
          </SheetClose>
        </div>
      );
    }
    
    return (
      <>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto mb-3 space-y-2 px-4">
          {cartItems.map((item: QuoteCartItem) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* 제품 정보 */}
              <div className="flex items-center space-x-3">
                {item.imageUrl ? (
                  <div className="w-10 h-10 rounded overflow-hidden border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                    {item.name.charAt(0)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.manufacturerName} · {item.quantity}개
                  </p>
                  {item.packageType && (
                    <Badge 
                      variant="outline" 
                      className="text-[10px] px-1 py-0 mt-1 h-4"
                    >
                      {item.packageType}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* 버튼 영역 */}
              <div className="flex gap-1">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-blue-100 hover:text-blue-600"
                    asChild
                  >
                    <Link href={`/products/detail/${item.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-red-100 hover:text-red-600"
                  onClick={(e) => handleRemoveFromCart(e, item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-3 flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-500">
            총 <span className="font-semibold">{cartItemCount}</span>개 제품
          </p>
          <SheetClose asChild>
            <Button asChild className="rounded-full px-4">
              <Link href="/quote-cart">
                견적함 보기 
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </SheetClose>
        </div>
      </>
    );
  }, [cartItemCount, cartItems, handleRemoveFromCart]);

  // 북마크 관련 상태
  const renderBookmarksContent = React.useCallback(() => {
    // 북마크가 비어있을 때의 UI
    if (!bookmarks || bookmarks.length === 0) {
      return (
        <div className="py-8 px-4 text-center text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-base font-medium mb-1">북마크가 비어있습니다</h3>
          <p className="text-xs mb-4">관심있는 제품을 북마크하여 쉽게 관리하세요</p>
          <SheetClose asChild>
            <Link href="/products/list/leddriveric">
              <Button variant="outline" className="rounded-full text-sm px-4">
                제품 둘러보기
              </Button>
            </Link>
          </SheetClose>
        </div>
      );
    }
    
    // 북마크 목록 표시
    return (
      <div className="flex flex-col h-full">
        {/* 북마크 리스트 */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-16">
          <div className="space-y-3">
            {bookmarks.map((item: BookmarkedProduct) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex p-3">
                  {/* 제품 이미지/아이콘 */}
                  <div className="flex-shrink-0 mr-3">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name}
                        width={48} 
                        height={48}
                        className="rounded-md object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-700 font-semibold">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* 제품 정보 */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-gray-500 truncate">
                        {item.manufacturerName || '제조사 정보 없음'}
                      </p>
                      {item.packageType && (
                        <Badge variant="outline" className="text-[10px] px-1.5 h-4 border-gray-200">
                          {item.packageType}
                        </Badge>
                      )}
                    </div>
                    
                    {/* 액션 버튼 영역 */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-gray-500">
                        {new Date(item.addedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-1">
                        <SheetClose asChild>
                          <Link href={`/products/detail/${item.id}`} aria-label="제품 상세보기">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 rounded-full hover:bg-blue-50 hover:text-blue-600"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </SheetClose>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 rounded-full hover:bg-green-50 hover:text-green-600"
                          onClick={(e) => handleAddToQuoteCart(e, item)}
                          aria-label="견적 장바구니에 추가"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 rounded-full hover:bg-red-50 hover:text-red-600"
                          onClick={(e) => handleRemoveFromBookmarks(e, item.id)}
                          aria-label="북마크에서 삭제"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* 동작 버튼 영역 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              총 <span className="font-semibold">{bookmarkCount}</span>개 북마크
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  bookmarks.forEach(item => {
                      handleAddToQuoteCart({ stopPropagation: () => {}, preventDefault: () => {} } as any, item);
                  });
                }}
              >
                전체 견적추가
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [bookmarks, bookmarkCount, handleAddToQuoteCart, handleRemoveFromBookmarks]);

  // 총 아이템 수 계산
  const totalItems = cartItemCount + bookmarkCount;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {/* 회사 소개 메뉴 */}
          <AccordionItem value="company">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              {navigationConfig.company.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 space-y-2">
                {navigationConfig.company.items.map((item) => (
                  <SheetClose key={item.title} asChild>
                    <Link 
                      href={item.link} 
                      className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-lg"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 제품 카테고리 메뉴 */}
          <AccordionItem value="products">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              {navigationConfig.products.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4">
                <Accordion type="multiple" className="w-full">
                  {navigationConfig.products.categories.map((category) => (
                    <AccordionItem key={category.title} value={category.title}>
                      <AccordionTrigger className="py-2 px-2 text-sm font-medium">
                        {category.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 space-y-1">
                          <SheetClose asChild>
                            <Link 
                              href={category.link} 
                              className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md text-blue-600"
                            >
                              전체 {category.title} 보기
                            </Link>
                          </SheetClose>
                          {category.content && Array.isArray(category.content) && category.content.map((subcategory) => (
                            <div key={subcategory.title}>
                              <Accordion type="multiple" className="w-full">
                                <AccordionItem value={subcategory.title}>
                                  <AccordionTrigger className="py-2 px-2 text-xs font-medium pl-4">
                                    {subcategory.title}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="pl-4 space-y-1">
                                      <SheetClose asChild>
                                        <Link 
                                          href={subcategory.link} 
                                          className="block py-1.5 px-3 text-xs hover:bg-gray-100 rounded-md text-blue-600"
                                        >
                                          전체 {subcategory.title} 보기
                                        </Link>
                                      </SheetClose>
                                      {subcategory.children && Array.isArray(subcategory.children) && subcategory.children.map((item) => (
                                        <SheetClose key={item.title} asChild>
                                          <Link 
                                            href={item.link} 
                                            className="block py-1.5 px-3 text-xs hover:bg-gray-100 rounded-md"
                                          >
                                            {item.title}
                                          </Link>
                                        </SheetClose>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 파트너사 메뉴 */}
          <AccordionItem value="partners">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              {navigationConfig.partners.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6 space-y-3">
                {navigationConfig.partners.items && navigationConfig.partners.items.length > 0 ? (
                  navigationConfig.partners.items.map((item) => (
                    <SheetClose key={item.title} asChild>
                      <Link 
                        href={item.partnerStory?.learnMoreLink || "#"}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
                      >
                          <Image 
                            src={item.icon} 
                            alt={item.title} 
                          width={32} 
                          height={32} 
                            className="rounded-md" 
                          />
                        <div>
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </SheetClose>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 p-4">파트너사 정보가 없습니다.</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 고객 지원 메뉴 */}
          <AccordionItem value="support">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              {navigationConfig.support.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-6">
                <div className="mb-3">
                  <h3 className="text-sm font-medium px-4 py-2 text-gray-500">{navigationConfig.support.inquiry.title}</h3>
                  <div className="space-y-1">
                    {navigationConfig.support.inquiry.items && navigationConfig.support.inquiry.items.length > 0 ? (
                      navigationConfig.support.inquiry.items.map((item) => (
                        <SheetClose key={item.title} asChild>
                          <Link href={item.link} className="block py-1.5 px-4 text-sm hover:bg-gray-100 rounded-lg">
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 pl-4">문의 관련 메뉴가 없습니다.</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="text-sm font-medium px-4 py-2 text-gray-500">{navigationConfig.support.contact.title}</h3>
                  <div className="space-y-1">
                    {navigationConfig.support.contact.items && navigationConfig.support.contact.items.length > 0 ? (
                      navigationConfig.support.contact.items.map((item) => (
                        <SheetClose key={item.title} asChild>
                          <Link href={item.link} className="block py-1.5 px-4 text-sm hover:bg-gray-100 rounded-lg">
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 pl-4">연락처 관련 메뉴가 없습니다.</div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium px-4 py-2 text-gray-500">{navigationConfig.support.resources.title}</h3>
                  <div className="space-y-1">
                    {navigationConfig.support.resources.items && navigationConfig.support.resources.items.length > 0 ? (
                      navigationConfig.support.resources.items.map((item) => (
                        <SheetClose key={item.title} asChild>
                          <Link href={item.link} className="block py-1.5 px-4 text-sm hover:bg-gray-100 rounded-lg">
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 pl-4">자료 관련 메뉴가 없습니다.</div>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 견적 장바구니 메뉴 */}
          <AccordionItem value="quote-cart">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              <div className="flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>견적 장바구니</span>
                {cartItemCount > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white">{cartItemCount}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {renderQuoteCartContent()}
            </AccordionContent>
          </AccordionItem>

          {/* 북마크 메뉴 */}
          <AccordionItem value="bookmarks">
            <AccordionTrigger className="px-4 py-3 text-base font-medium">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>북마크</span>
                {bookmarkCount > 0 && (
                  <Badge className="ml-2 bg-rose-500 text-white">{bookmarkCount}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {renderBookmarksContent()}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>


        
        {/* 모바일 메뉴 트리거 */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">메뉴</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* 메뉴 내용 */}
              <div className="flex-1 overflow-auto p-4">
                {/* 기존 네비게이션 메뉴 */}
                
                {/* 견적 및 북마크 링크 */}
                <div className="mt-6 space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                      제품 관리
                    </h3>
                    
                    <Link 
                      href="/quote-cart" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-3 text-blue-600" />
                        <span>견적 장바구니</span>
                      </div>
                      {cartItemCount > 0 && (
                        <Badge className="bg-blue-500">{cartItemCount}</Badge>
                      )}
                    </Link>
                    
                    <Link 
                      href="/bookmarks" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 mr-3 text-rose-600" />
                        <span>북마크</span>
                      </div>
                      {bookmarkCount > 0 && (
                        <Badge className="bg-rose-500">{bookmarkCount}</Badge>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
  );
}; 
