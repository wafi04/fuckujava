import { create } from "zustand";
import type { ProductResellerWithDate } from "./types";

interface ProductsState {
  products: ProductResellerWithDate[];
  setProducts: (products: ProductResellerWithDate[]) => void;
  updateProduct: (
    id: string,
    field: keyof ProductResellerWithDate,
    value: string | number | null | boolean
  ) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  updateProduct: (id, field, value) =>
    set((state) => ({
      products: state.products.map((p) =>
        `${p.product_code}` === id ? { ...p, [field]: value } : p
      ),
    })),
}));
