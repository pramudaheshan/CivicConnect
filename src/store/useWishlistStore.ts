import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create(
  persist<WishlistState>(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (!items.some(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (productId: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== productId) });
      },
      isInWishlist: (productId: string) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);