import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteCartItem {
  id: number;
  name: string;
  quantity: number;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  addedAt: string;
  imageUrl?: string;
  packageType?: string;
}

interface QuoteCartState {
  items: QuoteCartItem[];
  addItem: (item: QuoteCartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalQuantity: () => number;
  isInQuote: (id: number) => boolean;
}

// 유틸리티 함수들
const findItemIndex = (items: QuoteCartItem[], id: number): number => 
  items.findIndex(item => item.id === id);

const updateItemQuantity = (items: QuoteCartItem[], id: number, quantity: number): QuoteCartItem[] =>
  items.map(item => 
    item.id === id 
      ? { ...item, quantity, addedAt: new Date().toISOString() } 
      : item
  );

export const useQuoteCartStore = create<QuoteCartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        if (!newItem || newItem.quantity <= 0) {
          console.error('Invalid item or quantity');
          return;
        }

        set((state) => {
          const existingItemIndex = findItemIndex(state.items, newItem.id);
          
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
              addedAt: new Date().toISOString()
            };
            return { items: updatedItems };
          }
          
          return { 
            items: [...state.items, { ...newItem, addedAt: new Date().toISOString() }] 
          };
        });
      },
      
      removeItem: (id) => {
        if (!id) {
          console.error('Invalid item id');
          return;
        }
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (!id || quantity < 0) {
          console.error('Invalid id or quantity');
          return;
        }
        set((state) => ({
          items: updateItemQuantity(state.items, id, quantity)
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getItemCount: () => get().items.length,
      
      getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      isInQuote: (id) => {
        if (!id) return false;
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'quote-cart-storage',
      partialize: (state) => ({ items: state.items }), // 필요한 상태만 저장
    }
  )
); 