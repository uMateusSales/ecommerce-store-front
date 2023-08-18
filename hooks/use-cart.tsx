import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  removeOneItem: (data: Product) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((i) => i.id === data.id);



        if (existingItems) {
           existingItems.quantity++
           set({ items: [...currentItems] });
          return toast("item ja esta no carrinho");
        }
        
        set({ items: [...get().items, data] });
        toast.success("Item adicionado no carrinho");
      },
removeOneItem: (data: Product) => {
  const currentItems = get().items;
        const existingItems = currentItems.find((i) => i.id === data.id);
        if ( existingItems && existingItems.quantity !== 1 ) {
          existingItems.quantity--
          set({ items: [ ...currentItems] });
        }
       
},
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((i) => i.id !== id)] });
        toast.success("Item retirado do carrinho");
      },
      
      removeAll: () => set({ items: [] }),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
