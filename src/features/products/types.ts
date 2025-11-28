export interface ProductsOrderWithType {
  type: string;
  products: ProductOrder[];
}
export interface ProductOrder {
  productId: number;
  productName: string;
  productCode: string;
  productImage: string | null;
  productPrice: number;
  productHargaPromo: number;
}

export type PriceType = "hybrid" | "percentage" | "fixed";
export interface ProductReseller {
  id: number;
  created_at: string;
  updated_at: string;
  branchID: number;
  productID: number;
  hargaJual: number;
  hargaModal: number;
  categoryName: string;
  categoryThumbnail: string;
  categoryBanner: string;
  categoryInformation: string;
  brand: string;
  typeHarga: PriceType;
  marginValue: number;
  isActive: boolean;
  productName: string;
  isCheckNickname: boolean;
  hargaPromo: number;
}

export interface SubCategory {
  category_brand: string;
  code: string;
  isActive: boolean;
  name: string;
  region: string;
}

export interface ProductResellerWithDate {
  id: number;
  branch_id: number;
  margin_value_amount: number;
  margin_value_percentage: number;
  calculation_type_reseller: PriceType;
  product_name: string;
  product_category: string;
  product_type: string;
  product_price: number;
  product_code: string;
  isActive: boolean;
  is_flash_sale: boolean;
  price_flash_sale: number;
  start_at: string;
  end_at: string;
}

export interface UpdateProductReseller {
  id: number;
  margin_value_amount: number;
  margin_value_percentage: number;
  calculation_type_reseller: PriceType;
  isActive: boolean;
  is_flash_sale: boolean;
  price_flash_sale: number;
  start_at: string;
  end_at: string;
}


export interface ProductFlashSaleData {
  producStartAt
: string
productCode
: string
productEndAt
: string
productHargaPromo
: number
productId
: number
productImage
: string
productName
: string
productPrice
: number
productTimeRemaining
: string
productType
: string
}