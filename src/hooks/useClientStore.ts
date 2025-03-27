"use client";

import { useBookmarkStore, BookmarkedProduct } from "@/store/bookmarkStore";
import { useQuoteCartStore, QuoteCartItem } from "@/store/quoteCartStore";

/**
 * 북마크 상태와 기능에 관한 인터페이스
 */
export interface BookmarksHook {
  items: BookmarkedProduct[];
  addBookmark: (product: BookmarkedProduct) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  clearBookmarks: () => void;
  getBookmarkCount: () => number;
}

/**
 * 장바구니 상태와 기능에 관한 인터페이스
 */
export interface QuoteCartHook {
  items: QuoteCartItem[];
  addItem: (item: QuoteCartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalQuantity: () => number;
}

/**
 * 북마크 상태와 기능에 편리하게 접근할 수 있는 훅
 */
export const useBookmarks = (): BookmarksHook => {
  const store = useBookmarkStore();
  
  return {
    items: store.items,
    addBookmark: store.addBookmark,
    removeBookmark: store.removeBookmark,
    isBookmarked: store.isBookmarked,
    clearBookmarks: store.clearBookmarks,
    getBookmarkCount: store.getBookmarkCount
  };
};

/**
 * 장바구니 상태와 기능에 편리하게 접근할 수 있는 훅
 */
export const useQuoteCart = (): QuoteCartHook => {
  const store = useQuoteCartStore();
  
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getItemCount: store.getItemCount,
    getTotalQuantity: store.getTotalQuantity
  };
}; 