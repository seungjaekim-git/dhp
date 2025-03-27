"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareItem {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
}

interface CompareStore {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
}

const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      clearItems: () => set({ items: [] })
    }),
    {
      name: 'compare-items'
    }
  )
);

export function useCompareItems() {
  const store = useCompareStore();
  
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    clearItems: store.clearItems
  };
} 