"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu, X, Heart, ShoppingCart, FileText, Trash2, PlusCircle, ChevronRight, ExternalLink, ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { debounce } from "lodash";
import { navigationConfig } from "@/config/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchStore } from "@/store/SearchStore";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useBookmarkStore, BookmarkedProduct } from "@/store/bookmarkStore";
import { useQuoteCartStore, QuoteCartItem } from "@/store/quoteCartStore";
import { MobileNavigation } from "./components/MobileNavigation";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 성능 최적화를 위한 메모이제이션 컴포넌트 정의
// 메모이제이션된 북마크 아이템 컴포넌트
const BookmarkItem = React.memo(({ 
  item, 
  handleAddToQuoteCart, 
  handleRemoveFromBookmarks 
}: { 
  item: BookmarkedProduct, 
  handleAddToQuoteCart: (e: React.MouseEvent, item: BookmarkedProduct) => void,
  handleRemoveFromBookmarks: (e: React.MouseEvent, itemId: number) => void
}) => (
  <div className="group relative border-b border-neutral-100 last:border-b-0">
    <Link 
      href={`/products/detail/${item.id}`} 
      className="flex p-3 hover:bg-neutral-50/80 transition-colors"
    >
      {/* 제품 이미지 */}
      <div className="relative flex-shrink-0 mr-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
          {item.imageUrl ? (
            <Image 
              src={item.imageUrl} 
              alt={item.name}
              width={56} 
              height={56}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-neutral-50">
              <span className="text-rose-500 font-medium text-lg">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-sm">
          <Heart className="h-3 w-3 fill-white" />
        </div>
      </div>
      
      {/* 제품 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <h4 className="text-xs text-neutral-500 truncate">{item.manufacturerName}</h4>
          {item.packageType && (
            <Badge 
              variant="outline" 
              className="text-[9px] px-1 py-0 h-4 border-neutral-200 bg-neutral-50 text-neutral-600"
            >
              {item.packageType}
            </Badge>
          )}
        </div>
        <h3 className="font-medium text-sm truncate text-neutral-800 group-hover:text-rose-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-neutral-500 truncate mt-1 line-clamp-1">{item.subtitle}</p>
      </div>
    </Link>
    
    {/* 액션 버튼 오버레이 */}
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
      <div className="flex gap-1 bg-white/90 p-1 rounded-full shadow-sm border border-neutral-200">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600 rounded-full"
          onClick={(e) => handleAddToQuoteCart(e, item)}
          title="견적 장바구니에 추가"
        >
          <PlusCircle className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600 rounded-full"
          onClick={(e) => handleRemoveFromBookmarks(e, item.id)}
          title="북마크에서 삭제"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  </div>
));
BookmarkItem.displayName = "BookmarkItem";

// 메모이제이션된 카트 아이템 컴포넌트
const CartItem = React.memo(({ 
  item, 
  handleRemoveFromCart 
}: { 
  item: QuoteCartItem, 
  handleRemoveFromCart: (e: React.MouseEvent, itemId: number) => void 
}) => (
  <div className="group relative border-b border-neutral-100 last:border-b-0">
    <Link 
      href={`/products/detail/${item.id}`} 
      className="flex p-3 hover:bg-neutral-50/80 transition-colors"
    >
      {/* 제품 이미지 */}
      <div className="relative flex-shrink-0 mr-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
          {item.imageUrl ? (
            <Image 
              src={item.imageUrl} 
              alt={item.name}
              width={56} 
              height={56}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-neutral-50">
              <span className="text-blue-500 font-medium text-lg">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="absolute -right-1 -bottom-1 min-w-5 h-5 px-1 bg-blue-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center shadow-sm">
          {item.quantity}
        </div>
      </div>
      
      {/* 제품 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <h4 className="text-xs text-neutral-500 truncate">{item.manufacturerName}</h4>
          {item.packageType && (
            <Badge 
              variant="outline" 
              className="text-[9px] px-1 py-0 h-4 border-neutral-200 bg-neutral-50 text-neutral-600"
            >
              {item.packageType}
            </Badge>
          )}
        </div>
        <h3 className="font-medium text-sm truncate text-neutral-800 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center mt-1">
          <p className="text-xs text-neutral-500 bg-neutral-50 px-1.5 py-0.5 rounded-sm">
            수량: <span className="font-medium">{item.quantity}개</span>
          </p>
        </div>
      </div>
    </Link>
    
    {/* 액션 버튼 오버레이 */}
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
      <Button 
        variant="ghost" 
        size="icon"
        className="h-7 w-7 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600 rounded-full"
        onClick={(e) => handleRemoveFromCart(e, item.id)}
        title="견적 장바구니에서 삭제"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  </div>
));
CartItem.displayName = "CartItem";

const Navigation = () => {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [selectedPartner, setSelectedPartner] = React.useState(navigationConfig.partners.items[0]);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const pathname = usePathname();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 검색 스토어 사용
  const { setIsOpen, isOpen } = useSearchStore();

  // 장바구니 상태 가져오기
  const { items: cartItems, removeItem, addItem } = useQuoteCartStore();
  const cartItemCount = useMemo(() => cartItems.length, [cartItems]);
  
  // 북마크 상태 가져오기
  const { items: bookmarks, removeBookmark } = useBookmarkStore();
  const bookmarkCount = useMemo(() => bookmarks.length, [bookmarks]);

  // 선택된 탭 상태
  const [currentTab, setCurrentTab] = useState<string>("bookmarks");
  
  // 스크롤 감지 - 디바운스 처리된 스크롤 이벤트 핸들러
  useEffect(() => {
    const controlNavbar = debounce(() => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    }, 100); // 100ms 디바운스로 성능 개선

    window.addEventListener('scroll', controlNavbar);
    return () => {
      controlNavbar.cancel(); // 디바운스 함수 취소
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // 북마크 상품을 견적 장바구니에 추가
  const handleAddToQuoteCart = useCallback((e: React.MouseEvent, item: BookmarkedProduct) => {
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
    
    addItem(cartItem);
    
    toast({
      title: "견적 장바구니에 추가되었습니다",
      description: "견적 요청 목록에 제품이 추가되었습니다.",
      variant: "default",
    });
  }, [addItem, toast]);

  // 제품 삭제 함수
  const handleRemoveFromCart = useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeItem(itemId);
    
    toast({
      title: "제품이 장바구니에서 삭제되었습니다",
      description: "견적 요청 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeItem, toast]);

  // 북마크 삭제 함수
  const handleRemoveFromBookmarks = useCallback((e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    removeBookmark(itemId);
    
    toast({
      title: "북마크에서 삭제되었습니다",
      description: "북마크 목록에서 제품이 제거되었습니다.",
      variant: "default",
    });
  }, [removeBookmark, toast]);

  // 전체 북마크를 장바구니에 추가
  const handleAddAllToCart = useCallback(() => {
    bookmarks.forEach(item => {
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
      addItem(cartItem);
    });
    
    toast({
      title: `${bookmarks.length}개 제품이 견적 장바구니에 추가되었습니다`,
      description: "모든 북마크 제품이 견적 장바구니에 추가되었습니다.",
      variant: "default",
    });
  }, [bookmarks, addItem, toast]);

  // 메모이제이션된 북마크 컨텐츠 렌더링
  const renderBookmarksContent = useMemo(() => {
    if (bookmarks.length === 0) {
      return (
        <div className="py-10 px-4 text-center">
          <div className="w-16 h-16 mx-auto bg-rose-50 rounded-full flex items-center justify-center mb-3">
            <Heart className="h-7 w-7 text-rose-300" />
          </div>
          <h3 className="text-base font-medium text-neutral-800 mb-1">북마크가 비어있습니다</h3>
          <p className="text-xs text-neutral-500 mb-5 max-w-[240px] mx-auto">
            제품 페이지에서 하트 아이콘을 클릭하여 관심 제품을 저장하세요
          </p>
          <Link href="/products/list">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full text-xs border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              제품 둘러보기
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      );
    }
    
    return (
      <>
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
          {bookmarks.slice(0, 10).map((item: BookmarkedProduct) => (
            <BookmarkItem 
              key={item.id} 
              item={item} 
              handleAddToQuoteCart={handleAddToQuoteCart}
              handleRemoveFromBookmarks={handleRemoveFromBookmarks}
            />
          ))}
        </div>
        
        {/* 북마크 푸터 */}
        <div className="p-4 bg-gradient-to-r from-neutral-50 to-rose-50/30 border-t border-neutral-100">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xs font-medium text-neutral-500">
              <span className="font-semibold text-neutral-700">{bookmarkCount}개</span> 북마크
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-3"
              onClick={handleAddAllToCart}
            >
              전체 견적 추가
              <PlusCircle className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <Link href="/bookmarks">
            <Button 
              className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-sm font-medium rounded-xl h-10"
            >
              북마크 관리하기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </>
    );
  }, [bookmarks, bookmarkCount, handleAddToQuoteCart, handleRemoveFromBookmarks, handleAddAllToCart]);

  // 메모이제이션된 장바구니 컨텐츠 렌더링
  const renderCartContent = useMemo(() => {
    if (cartItems.length === 0) {
      return (
        <div className="py-10 px-4 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <ShoppingCart className="h-7 w-7 text-blue-300" />
          </div>
          <h3 className="text-base font-medium text-neutral-800 mb-1">견적 장바구니가 비어있습니다</h3>
          <p className="text-xs text-neutral-500 mb-5 max-w-[240px] mx-auto">
            제품 페이지에서 견적 요청 버튼을 클릭하여 제품을 추가하세요
          </p>
          <Link href="/products/list">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              제품 둘러보기
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      );
    }
    
    return (
      <>
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
          {cartItems.slice(0, 10).map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
        
        {/* 장바구니 푸터 */}
        <div className="p-4 bg-gradient-to-r from-neutral-50 to-blue-50/30 border-t border-neutral-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xs font-medium text-neutral-500">
                <span className="font-semibold text-neutral-700">{cartItemCount}개</span> 제품
              </div>
            </div>
          </div>
          <Link href="/quote-cart">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-medium rounded-xl h-10"
            >
              견적 요청하기
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </>
    );
  }, [cartItems, cartItemCount, handleRemoveFromCart]);

  return (
    <div
      className={cn(
        "w-full border-b bg-white/95 backdrop-blur-sm transition-transform duration-300 sticky top-0 z-50",
        scrolled ? "shadow-sm" : "",
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto flex justify-between items-center h-14 px-4 lg:px-6">
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative overflow-hidden rounded-full h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <Image 
              src="/logos/dhp-logo.png" 
              alt="대한플러스전자(주)" 
              width={24} 
              height={24} 
              className="object-contain" 
              priority
            />
          </div>
          <span className="font-bold md:hidden lg:block text-gray-800 tracking-tight text-xs sm:text-sm">대한플러스전자(주)</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden md:block">
          <DesktopNavigation />
        </div>
        
        {/* 우측 액션 버튼 영역 */}
        <div className="flex items-center space-x-0.5 md:space-x-2">
          {/* 북마크 버튼 - 개별 UI */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-1.5 sm:p-2 hover:bg-rose-50 rounded-full relative group"
              >
                <Heart className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] text-neutral-600 group-hover:text-rose-500 transition-colors" />
                {bookmarkCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[1rem] h-4 sm:min-w-[1.25rem] sm:h-5 flex items-center justify-center text-[8px] sm:text-[10px] font-semibold bg-rose-500 text-white"
                  >
                    {bookmarkCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[300px] sm:w-[340px] p-0 rounded-xl overflow-hidden border border-neutral-100 shadow-lg"
            >
              <div className="bg-gradient-to-r from-rose-50 via-rose-50/70 to-white p-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <h4 className="font-semibold text-sm text-neutral-800">관심 제품</h4>
                    <Badge variant="secondary" className="bg-white text-rose-500 border-rose-100 font-medium">
                      {bookmarkCount}
                    </Badge>
                  </div>
                  <Link 
                    href="/bookmarks" 
                    className="text-xs font-medium text-rose-600 hover:underline flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-white/70 transition-colors"
                  >
                    <span>모두 보기</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              
              {renderBookmarksContent}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* 견적 장바구니 버튼 - 개별 UI */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full relative group"
              >
                <ShoppingCart className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] text-neutral-600 group-hover:text-blue-500 transition-colors" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 px-1 py-0.5 min-w-[1rem] h-4 sm:min-w-[1.25rem] sm:h-5 flex items-center justify-center text-[8px] sm:text-[10px] font-semibold bg-blue-500 text-white"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[300px] sm:w-[340px] p-0 rounded-xl overflow-hidden border border-neutral-100 shadow-lg"
            >
              <div className="bg-gradient-to-r from-blue-50 via-blue-50/70 to-white p-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold text-sm text-neutral-800">견적 장바구니</h4>
                    <Badge variant="secondary" className="bg-white text-blue-500 border-blue-100 font-medium">
                      {cartItemCount}
                    </Badge>
                  </div>
                  <Link 
                    href="/quote-cart" 
                    className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-white/70 transition-colors"
                  >
                    <span>모두 보기</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              
              {renderCartContent}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 검색 버튼 */}
          <Button 
            variant="ghost"
            size="icon"
            className="p-1.5 sm:p-2 hover:bg-amber-50 hover:text-amber-600 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* 모바일 햄버거 메뉴 */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-screen md:hidden p-0">
              <SheetHeader className="border-b bg-white flex flex-row items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Image src="/logos/dhp-logo.png" alt="대한플러스전자" width={40} height={40}/>
                  <SheetTitle className="text-lg font-bold">대한플러스전자</SheetTitle>
                </div>
                <SheetClose asChild className="flex justify-center items-center">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              
              {/* 모바일 내비게이션 메뉴 */}
              <MobileNavigation />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navigation);
