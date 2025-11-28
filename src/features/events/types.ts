import type { Product } from "@/hooks/useOrder";
export interface CreateProductFlashSaleRequest {
  product_id: number;
  flash_sale_id: number;
  original_price: number;
  flash_sale_price: number;
  stock_reserved: number;
  thumbnail: string;
  stock_sold?: number;
}
export interface PacketFeatures {
  code: string;
  created_at: string;
  display_order: number;
  id: number;
  is_enabled: boolean;
  link: string;
  name: string;
  packet_code: string;
}

export interface UpdateProductFlashSaleRequest {
  product_id?: number;
  flash_sale_id?: number;
  original_price?: number;
  flash_sale_price?: number;
  stock_reserved?: number;
  stock_sold?: number;
  thumbnail?: string;
}
export interface FlashSale {
  created_at: string;
  description: string;
  end_at: string;
  id: number;
  is_active: boolean;
  start_at: string;
  title: string;
  updated_at: string;
}
export interface UpsertFlashSale {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  is_active: boolean;
}

export interface ProductFlashSale {
  id: number;
  product_id: number;
  flash_sale_id: number;
  original_price: number;
  flash_sale_price: number;
  stock_reserved: number;
  stock_sold: number;
  thumbnail: string;
  created_at: string;
}

export interface FlashSaleProduct {
  id: number;
  flash_sale_id: number;
  product_id: number;
  original_price: number;
  flash_sale_price: number;
  stock_reserved: number;
  stock_sold: number;
  thumbnail: string;
  usage_per_user: number;
  created_at: string;
  product: Product;
}

export interface FlashSaleData {
  id: number;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products: FlashSaleProduct[];
}


export interface FlashSaleId {
  flash_sale: FlashSaleData;
  products: FlashSaleProduct[];
}
