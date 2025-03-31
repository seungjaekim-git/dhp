import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  imageUrl?: string;
  packageType?: string;
  category?: string;
}

interface SearchState {
  isOpen: boolean;
  searchQuery: string;
  products: Product[];
  lastSearchTime: string | null;
  searchError: string | null;
  setIsOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setProducts: (products: Product[]) => void;
  setSearchError: (error: string | null) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isOpen: false,
      searchQuery: '',
      products: [],
      lastSearchTime: null,
      searchError: null,

      setIsOpen: (open) => set({ isOpen: open }),

      setSearchQuery: (query) => {
        if (typeof query !== 'string') {
          console.error('Invalid search query');
          return;
        }
        set({ 
          searchQuery: query,
          searchError: null
        });
      },

      setProducts: (products) => {
        if (!Array.isArray(products)) {
          console.error('Invalid products data');
          return;
        }
        set({ 
          products,
          lastSearchTime: new Date().toISOString(),
          searchError: null
        });
      },

      setSearchError: (error) => {
        if (error !== null && typeof error !== 'string') {
          console.error('Invalid error message');
          return;
        }
        set({ searchError: error });
      },

      clearSearch: () => set({
        searchQuery: '',
        products: [],
        lastSearchTime: null,
        searchError: null
      }),
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        lastSearchTime: state.lastSearchTime
      }),
    }
  )
);
