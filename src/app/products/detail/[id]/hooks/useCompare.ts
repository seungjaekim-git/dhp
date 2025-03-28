import { useCallback } from "react";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToast } from "@/hooks/use-toast";

interface CompareItem {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
  specifications?: any;
}

interface CompareStore {
  items: CompareItem[];
  isCompareDialogOpen: boolean;
  addItem: (item: CompareItem) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
  openCompareDialog: () => void;
  closeCompareDialog: () => void;
}

const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      items: [],
      isCompareDialogOpen: false,
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      clearItems: () => set({ items: [] }),
      openCompareDialog: () => set({ isCompareDialogOpen: true }),
      closeCompareDialog: () => set({ isCompareDialogOpen: false })
    }),
    {
      name: 'compare-items'
    }
  )
);

export const useCompare = (product: {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
  specifications?: any;
}) => {
  const { items, addItem, removeItem, openCompareDialog } = useCompareStore();
  const { toast } = useToast();

  const isInCompare = useCallback(() => {
    return items.some(item => item.id === product.id);
  }, [items, product.id]);

  const toggleCompare = useCallback(() => {
    if (isInCompare()) {
      removeItem(product.id);
      toast({
        title: "비교 목록에서 제거되었습니다",
        description: `${product.name} 제품이 비교 목록에서 제거되었습니다.`,
      });
    } else {
      if (items.length >= 4) {
        toast({
          title: "비교 목록이 가득 찼습니다",
          description: "최대 4개의 제품만 비교할 수 있습니다. 다른 제품을 제거하고 다시 시도하세요.",
          variant: "destructive"
        });
        return;
      }
      
      addItem({
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer,
        part_number: product.part_number,
        thumbnail: product.thumbnail,
        category: product.category,
        specifications: product.specifications
      });
      
      toast({
        title: "비교 목록에 추가되었습니다",
        description: `${product.name} 제품이 비교 목록에 추가되었습니다.`,
      });
    }
  }, [product, isInCompare, addItem, removeItem, items.length, toast]);

  return {
    isInCompare: isInCompare(),
    toggleCompare,
    compareCount: items.length,
    openCompareDialog
  };
};

export { useCompareStore }; 