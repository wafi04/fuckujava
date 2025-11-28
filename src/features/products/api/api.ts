import { api } from "@/lib/api";
import type { API_RESPONSE, ApiPagination, FilterRequest } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type {
  ProductFlashSaleData,
  ProductResellerWithDate,
  ProductsOrderWithType,
  UpdateProductReseller,
} from "../types";

export function useGetResellerPricing(filters?: FilterRequest) {
  const { data, isLoading, refetch, isFetching } = useQuery(
    {
      queryKey: ["reseller-pricing", filters],
      queryFn: async ({ queryKey }) => {
        const [, filterParams] = queryKey as [
          string,
          FilterRequest | undefined
        ];

        const searchParams = new URLSearchParams();

        if (filterParams?.limit) {
          searchParams.set("limit", filterParams.limit.toString());
        }
        if (filterParams?.search && filterParams.search.trim()) {
          searchParams.set("search", filterParams.search.trim());
        }
        if (filterParams?.page) {
          searchParams.set("page", filterParams.page.toString());
        }
        if (filterParams?.status) {
          searchParams.set("status", filterParams.status);
        }
        if (filterParams?.is_flash_sale) {
          searchParams.set("is_flash_sale", filterParams.is_flash_sale);
        }
        if (filterParams?.brand) {
          searchParams.set("brand", filterParams.brand);
        }
        if (filterParams?.sortBy) {
          searchParams.set("sort_by", filterParams.sortBy);
        }
        if (filterParams?.sortOrder) {
          searchParams.set("sort_order", filterParams.sortOrder);
        }

        try {
          const response = await api.get<
            ApiPagination<ProductResellerWithDate[]>
          >(`/reseller/product?${searchParams.toString()}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount) => {
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}

export function usePriceListReseller(filters?: FilterRequest) {
  const { data, isLoading, refetch, isFetching } = useQuery(
    {
      queryKey: ["price-list-reseller", filters],
      queryFn: async ({ queryKey }) => {
        const [, filterParams] = queryKey as [
          string,
          FilterRequest | undefined
        ];

        const searchParams = new URLSearchParams();

        if (filterParams?.limit) {
          searchParams.set("limit", filterParams.limit.toString());
        }
        if (filterParams?.search && filterParams.search.trim()) {
          searchParams.set("search", filterParams.search.trim());
        }
        if (filterParams?.page) {
          searchParams.set("page", filterParams.page.toString());
        }

        try {
          const response = await api.get<
            ApiPagination<ProductResellerWithDate[]>
          >(`/reseller/product/price-list?${searchParams.toString()}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount) => {
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
export function useUpdateResellerPricing() {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationKey: ["update-reseller-product"],
      mutationFn: async (data: UpdateProductReseller) => {
        const req = await api.patch<API_RESPONSE<null>>(
          `/reseller/product/branch/${data.id}`,
          data
        );
        return req.data;
      },
      onSuccess: () => {
        toast.success("update Successfulyy");
        queryClient.invalidateQueries({
          queryKey: ["reseller-pricing", { limit: "10", page: "1" }],
        });
      },
      onError: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["reseller-pricing", { limit: "10", page: "1" }],
        });
      },
    },
  );
}

export function useGetAllProductByCategoryAndSubCategory(filters: {
  category?: string;
  subcategory?: string;
  limit?: string;
  page?: string;
}) {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["products-order", filters],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters.category) params.append("category", filters.category);
        if (filters.subcategory)
          params.append("subCategory", filters.subcategory);
        if (filters.page) params.append("page", filters.page);
        if (filters.limit) params.append("limit", filters.limit);

        const req = await api.get<API_RESPONSE<ProductsOrderWithType[]>>(
          `/resellers/order?${params.toString()}`
        );
        return req.data;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  );

  return {
    data,
    isLoading,
    error,
  };
}

export function useGetFlashSaleActive(categoryBrand?: string) {
  const { data, isLoading, refetch, isFetching } = useQuery(
    {
      queryKey: ["flash-sale-products", categoryBrand], // ✅ Include categoryBrand di queryKey!
      queryFn: async () => {
        const searchParams = new URLSearchParams();

        if (categoryBrand) {
          searchParams.append("category_brand", categoryBrand);
        }

        const response = await api.get<API_RESPONSE<ProductFlashSaleData[]>>(
          `/reseller/product/flash-sale?${searchParams.toString()}`
        );
        return response.data;
      },
      enabled: true,
      staleTime: 5 * 60 * 1000, 
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
