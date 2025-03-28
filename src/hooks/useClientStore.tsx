"use client";

import { useEffect, useState } from "react";
import { useQuoteCartStore } from "@/store/quoteCartStore";
import { useBookmarkStore } from "@/store/bookmarkStore";

// 견적 장바구니 훅
export function useQuoteCart() {
  const [mounted, setMounted] = useState(false);
  const { items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getTotalQuantity, isInQuote } = useQuoteCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    cartItems: mounted ? items : [],
    cartItemCount: mounted ? getItemCount() : 0,
    totalQuantity: mounted ? getTotalQuantity() : 0,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity,
    clearCart,
    isInQuote: (id: number) => mounted && isInQuote(id)
  };
}

// 북마크 훅
export function useBookmarks() {
  const [mounted, setMounted] = useState(false);
  const { items, addBookmark, removeBookmark, isBookmarked, clearBookmarks, getBookmarkCount } = useBookmarkStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    bookmarkedItems: mounted ? items : [],
    bookmarkCount: mounted ? getBookmarkCount() : 0,
    isBookmarked: (id: number) => mounted && isBookmarked(id),
    addBookmark,
    removeBookmark,
    toggleBookmark: (product: any) => {
      if (mounted) {
        if (isBookmarked(product.id)) {
          removeBookmark(product.id);
          return false;
        } else {
          addBookmark(product);
          return true;
        }
      }
      return false;
    },
    clearBookmarks
  };
} 