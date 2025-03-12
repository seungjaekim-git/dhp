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
}

export const useQuoteCartStore = create<QuoteCartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        
        if (existingItemIndex > -1) {
          // 이미 존재하는 아이템이면 수량만 업데이트
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            addedAt: new Date().toISOString()
          };
          return { items: updatedItems };
        } else {
          // 새 아이템 추가
          return { items: [...state.items, { ...newItem, addedAt: new Date().toISOString() }] };
        }
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === id 
            ? { ...item, quantity, addedAt: new Date().toISOString() } 
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getItemCount: () => get().items.length,
      
      getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0)
    }),
    {
      name: 'quote-cart-storage',
    }
  )
); 