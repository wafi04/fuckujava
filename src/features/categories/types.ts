import type { SubCategory } from "../products/types";

export interface Category {
  id: number;
  name: string;
  sub_name: string;
  brand: string;
  thumbnail: string;
  bannerUrl: string;
  information: string;
  instruction: string;
  isActive: boolean;
  isCheckNickname: boolean;
  created_at: string;
  updated_at: string;
}
export type CategoryItem = {
  name: string;
  sub_name: string;
  brand: string;
  thumbnail: string;
};
export type CategoryGroup = {
  category_type: string;
  data: CategoryItem[];
};
export type CategoryApiResponse = {
  data: CategoryGroup[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface ProductOrder {
  productName: string;
  productCode: string;
  productPrice: number;
}
export interface FilterState {
  category: string;
  setCategory: (category: string) => void;
  resetCategory: () => void;
}

export interface CategoryWithProducts {
  categoryId: number;
  categoryName: string;
  isCheckNickname: boolean;
  categorySubName: string;
  categoryThumbnail: string;
  categoryBanner: string;
  information: string;
  code_check_nickname: string | null
  SubCategory: SubCategory[]

}

export interface FindCategoryReseller {
  branch_id: number
  category_id: number
  brand: string
  thumbnail?: string
  category_thumbnail?: string
  category_banner?: string
  banner? : string
  name?: string
  description?: string
}

export interface UpsertCategoryReseller {
  category_id  : number
  thumbnail : string
  banner : string
  name : string
  description : string
}