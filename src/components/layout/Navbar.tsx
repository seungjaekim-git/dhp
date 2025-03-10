"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  User,
  FileText,
  Trash2
} from "lucide-react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { QuoteCartItem } from "@/types/quoteCart"; // 별도의 타입 파일로 이동
import { useQuoteCart } from "@/hooks/useQuoteCart"; // 별도의 훅으로 이동

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { cartItems, cartItemCount, removeFromCart } = useQuoteCart();

  // 네비게이션 링크 활성화 확인 함수
  const isLinkActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 및 브랜드 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">DHP</span>
              <span className="ml-1 text-gray-700">전자부품</span>
            </Link>
          </div>

          {/* 데스크탑 메뉴 - 중앙 */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/products" passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isLinkActive("/products") 
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      제품 검색
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/manufacturers" passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isLinkActive("/manufacturers") 
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      제조사
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/blog" passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isLinkActive("/blog") 
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      기술 블로그
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* 데스크탑 메뉴 - 우측 */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">검색</span>
              </Link>
            </Button>
            
            {/* 견적 장바구니 드롭다운 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    cartItemCount > 0 ? "text-blue-600" : "text-gray-700",
                    isLinkActive("/quote-cart") ? "bg-blue-50" : "hover:bg-gray-100"
                  )}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>견적 장바구니</span>
                  {cartItemCount > 0 && (
                    <Badge 
                      className="ml-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded-full"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 p-3"
                sideOffset={8}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">견적 장바구니</h3>
                  <Badge 
                    variant="outline" 
                    className="font-mono bg-blue-50 border-blue-200 text-blue-700"
                  >
                    {cartItemCount}개 항목
                  </Badge>
                </div>
                
                {cartItemCount === 0 ? (
                  <div className="py-6 text-center text-gray-500">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>장바구니가 비어있습니다</p>
                    <p className="text-xs mt-1">제품 페이지에서 견적을 추가해보세요</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[300px] overflow-y-auto mb-3 space-y-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
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
                          
                          {/* 삭제 버튼 */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-red-100 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <DropdownMenuSeparator />
                    
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        총 <span className="font-semibold">{cartItemCount}</span>개 제품
                      </p>
                      <Button asChild className="rounded-full px-4">
                        <Link href="/quote-cart">
                          견적함 보기 
                          <FileText className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 프로필 드롭다운 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="사용자" />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center w-full">
                    프로필
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center w-full">
                    설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-700">
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-1">
            <Link 
              href="/products"
              className={cn(
                "block px-4 py-2 text-base font-medium rounded-md transition-colors",
                isLinkActive("/products") 
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              제품 검색
            </Link>
            
            <Link 
              href="/manufacturers"
              className={cn(
                "block px-4 py-2 text-base font-medium rounded-md transition-colors",
                isLinkActive("/manufacturers") 
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              제조사
            </Link>
            
            <Link 
              href="/blog"
              className={cn(
                "block px-4 py-2 text-base font-medium rounded-md transition-colors",
                isLinkActive("/blog") 
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              기술 블로그
            </Link>
            
            <Link 
              href="/quote-cart"
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-base font-medium rounded-md transition-colors",
                isLinkActive("/quote-cart") 
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>견적 장바구니</span>
              {cartItemCount > 0 && (
                <Badge 
                  className="ml-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 