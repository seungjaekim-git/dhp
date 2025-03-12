import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 북마크 아이템 타입 정의
export interface BookmarkItem {
  id: number;
  name: string;
  category: string;
  subtitle?: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
}

// 장바구니 아이템 타입 정의 (이미 있다면 생략 가능)
export interface QuoteCartItem {
  id: number;
  name: string;
  quantity: number;
  subtitle?: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
}

// 북마크 스토어 정의
export const useBookmarkStore = create(
  persist<{
    bookmarks: BookmarkItem[];
    bookmarkCount: number;
    addBookmark: (item: BookmarkItem) => void;
    removeBookmark: (id: number) => void;
    toggleBookmark: (item: BookmarkItem) => boolean;
    isBookmarked: (id: number) => boolean;
    clearBookmarks: () => void;
  }>(
    (set, get) => ({
      bookmarks: [],
      bookmarkCount: 0,
      
      addBookmark: (item) => {
        const { bookmarks } = get();
        const isExisting = bookmarks.some(bookmark => bookmark.id === item.id);
        
        if (!isExisting) {
          set(state => ({
            bookmarks: [...state.bookmarks, {
              ...item,
              addedAt: item.addedAt || new Date().toISOString()
            }],
            bookmarkCount: state.bookmarkCount + 1
          }));
        }
      },
      
      removeBookmark: (id) => {
        set(state => ({
          bookmarks: state.bookmarks.filter(item => item.id !== id),
          bookmarkCount: state.bookmarkCount - 1
        }));
      },
      
      toggleBookmark: (item) => {
        const { isBookmarked, addBookmark, removeBookmark } = get();
        
        if (isBookmarked(item.id)) {
          removeBookmark(item.id);
          return false;
        } else {
          addBookmark(item);
          return true;
        }
      },
      
      isBookmarked: (id) => {
        const { bookmarks } = get();
        return bookmarks.some(bookmark => bookmark.id === id);
      },
      
      clearBookmarks: () => {
        set({ bookmarks: [], bookmarkCount: 0 });
      },
    }),
    {
      name: 'bookmark-storage',
      getStorage: () => localStorage,
    }
  )
);

// 장바구니 스토어 (이미 구현된 경우 생략 가능) 
export const useQuoteCartStore = create(
  persist<{
    cartItems: QuoteCartItem[];
    cartItemCount: number;
    totalQuantity: number;
    addToCart: (item: QuoteCartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
  }>(
    (set, get) => ({
      cartItems: [],
      cartItemCount: 0,
      totalQuantity: 0,
      
      addToCart: (item) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          set(state => ({
            cartItems: state.cartItems.map(cartItem => 
              cartItem.id === item.id 
                ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
                : cartItem
            ),
            totalQuantity: state.totalQuantity + (item.quantity || 1)
          }));
        } else {
          set(state => ({
            cartItems: [...state.cartItems, {
              ...item, 
              quantity: item.quantity || 1,
              addedAt: item.addedAt || new Date().toISOString()
            }],
            cartItemCount: state.cartItemCount + 1,
            totalQuantity: state.totalQuantity + (item.quantity || 1)
          }));
        }
      },
      
      removeFromCart: (id) => {
        const { cartItems } = get();
        const itemToRemove = cartItems.find(item => item.id === id);
        
        if (itemToRemove) {
          set(state => ({
            cartItems: state.cartItems.filter(item => item.id !== id),
            cartItemCount: state.cartItemCount - 1,
            totalQuantity: state.totalQuantity - itemToRemove.quantity
          }));
        }
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) return;
        
        const { cartItems } = get();
        const oldItem = cartItems.find(item => item.id === id);
        
        if (oldItem) {
          const quantityDiff = quantity - oldItem.quantity;
          
          set(state => ({
            cartItems: state.cartItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            ),
            totalQuantity: state.totalQuantity + quantityDiff
          }));
        }
      },
      
      clearCart: () => {
        set({ cartItems: [], cartItemCount: 0, totalQuantity: 0 });
      }
    }),
    {
      name: 'quote-cart-storage',
      getStorage: () => localStorage,
    }
  )
);

// 편의를 위한 훅 익스포트
export const useQuoteCart = useQuoteCartStore;
export const useBookmarks = useBookmarkStore; 