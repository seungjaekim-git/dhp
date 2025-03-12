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
}

interface BookmarkState {
  items: BookmarkedProduct[];
  addBookmark: (product: BookmarkedProduct) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  clearBookmarks: () => void;
  getBookmarkCount: () => number;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addBookmark: (product) => set((state) => {
        if (state.items.some(item => item.id === product.id)) {
          return state; // 이미 북마크된 상품은 추가하지 않음
        }
        return { items: [...state.items, { ...product, addedAt: new Date().toISOString() }] };
      }),
      
      removeBookmark: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      isBookmarked: (id) => get().items.some(item => item.id === id),
      
      clearBookmarks: () => set({ items: [] }),
      
      getBookmarkCount: () => get().items.length
    }),
    {
      name: 'bookmarks-storage',
    }
  )
); 