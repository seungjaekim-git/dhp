import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchStore {
  isOpen: boolean;
  searchQuery: string;
  products: any[];
  setIsOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setProducts: (products: any[]) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      isOpen: false,
      searchQuery: '',
      products: [],
      setIsOpen: (open) => set({ isOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
