import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookmarkedProduct {
  id: number;
  name: string;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
  category?: string;
}

interface BookmarkState {
  items: BookmarkedProduct[];
  addBookmark: (product: BookmarkedProduct) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  clearBookmarks: () => void;
  getBookmarkCount: () => number;
}

// 유틸리티 함수들
const findBookmarkIndex = (items: BookmarkedProduct[], id: number): number =>
  items.findIndex(item => item.id === id);

const validateProduct = (product: BookmarkedProduct): boolean => {
  return !!(product && product.id && product.name && product.manufacturerId);
};

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addBookmark: (product) => {
        if (!validateProduct(product)) {
          console.error('Invalid product data');
          return;
        }

        set((state) => {
          if (findBookmarkIndex(state.items, product.id) > -1) {
            return state; // 이미 북마크된 상품은 추가하지 않음
          }
          return { 
            items: [...state.items, { ...product, addedAt: new Date().toISOString() }] 
          };
        });
      },
      
      removeBookmark: (id) => {
        if (!id) {
          console.error('Invalid bookmark id');
          return;
        }
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      isBookmarked: (id) => {
        if (!id) return false;
        return get().items.some(item => item.id === id);
      },
      
      clearBookmarks: () => set({ items: [] }),
      
      getBookmarkCount: () => get().items.length
    }),
    {
      name: 'bookmarks-storage',
      partialize: (state) => ({ items: state.items }), // 필요한 상태만 저장
    }
  )
); 