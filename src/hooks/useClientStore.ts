import React from 'react';
import { useBookmarkStore, type BookmarkedProduct } from "@/store/bookmarkStore";
import { useQuoteCartStore, type QuoteCartItem } from "@/store/quoteCartStore";

/**
 * 북마크 상태와 기능에 편리하게 접근할 수 있는 훅
 */
export const useBookmarks = () => {
  const items = useBookmarkStore(state => state.items);
  const getBookmarkCount = useBookmarkStore(state => state.getBookmarkCount);
  const addBookmark = useBookmarkStore(state => state.addBookmark);
  const removeBookmark = useBookmarkStore(state => state.removeBookmark);
  const isBookmarked = useBookmarkStore(state => state.isBookmarked);
  const clearBookmarks = useBookmarkStore(state => state.clearBookmarks);
  
  return {
    bookmarks: items,
    bookmarkCount: getBookmarkCount(),
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearBookmarks
  };
};

/**
 * 장바구니 상태와 기능에 편리하게 접근할 수 있는 훅
 */
export const useQuoteCart = () => {
  const items = useQuoteCartStore(state => state.items);
  const getItemCount = useQuoteCartStore(state => state.getItemCount);
  const getTotalQuantity = useQuoteCartStore(state => state.getTotalQuantity);
  const addItem = useQuoteCartStore(state => state.addItem);
  const removeItem = useQuoteCartStore(state => state.removeItem);
  const updateQuantity = useQuoteCartStore(state => state.updateQuantity);
  const clearCart = useQuoteCartStore(state => state.clearCart);
  
  return {
    cartItems: items,
    cartItemCount: getItemCount(),
    totalQuantity: getTotalQuantity(),
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity,
    clearCart
  };
}; 