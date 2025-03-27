"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareItem {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
}

interface CompareItemsStore {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
  hasItem: (id: number) => boolean;
  isCompareDialogOpen: boolean;
  openCompareDialog: () => void;
  closeCompareDialog: () => void;
}

export const useCompareItems = create<CompareItemsStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        // 이미 존재하는 아이템이면 추가하지 않음
        if (items.some((existingItem) => existingItem.id === item.id)) {
          return;
        }
        // 최대 4개까지만 저장
        if (items.length >= 4) {
          return;
        }
        set({ items: [...items, item] });
      },
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },
      clearItems: () => set({ items: [] }),
      hasItem: (id) => get().items.some((item) => item.id === id),
      isCompareDialogOpen: false,
      openCompareDialog: () => set({ isCompareDialogOpen: true }),
      closeCompareDialog: () => set({ isCompareDialogOpen: false }),
    }),
    {
      name: 'compare-items-storage',
    }
  )
);

// 비교 다이얼로그 열기 이벤트 리스너
if (typeof window !== 'undefined') {
  document.addEventListener('open-compare-dialog', () => {
    useCompareItems.getState().openCompareDialog();
  });
} 