import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { API_RESPONSE, ApiPagination, FilterRequest } from "@/types/api";
import {
  FindCategoryReseller,
  UpsertCategoryReseller,
  type Category,
  type CategoryWithProducts,
} from "./types";
import toast from "react-hot-toast";

export function useGetAllCategory(filters?: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.brand) params.append("brand", filters.brand);
      const data = await api.get<ApiPagination<Category[]>>(
        `/categories?${params.toString()}`
      );
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,
  });

  return {
    data: data,
    isLoading,
    error,
  };
}

export function useGetCategoryType() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", "types"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<string[]>>(`/categories/types`);
      return data.data;
    },
    staleTime: 24 * 60000,
    gcTime: 24 * 60000,
  });
  return {
    data,
    isLoading,
    error,
  };
}
export function useGetAllCategoryActive() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category[]>>(`/category/all`);
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });
  return {
    data,
    isLoading,
    error,
  };
}

export function useGetCategoryWithProducts(code: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subcategory-code", code],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<CategoryWithProducts>>(
        `/category/code?subName=${code}`
      );
      return data.data;
    },
    staleTime: 60000,
    gcTime: 60000,

    enabled: !!code,
  });

  return {
    data: data,
    isLoading,
    error,
  };
}

export function useGetCategoryByType(
  type: string,
  limit: string,
  page: string
) {
  const filter = {
    type,
    limit,
    page,
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", filter],
    queryFn: async () => {
      const data = await api.get(
        `/categories/groub?type=${type}&limit=${limit}&page=${page}`
      );
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });
  return {
    data,
    isLoading,
    error,
  };
}

export function useFindCategoryReseller({
  filters,
}: {
  filters: FilterRequest;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories-reseller", filters],
    queryFn: async () => {
      const url = new URLSearchParams();
      if (filters.limit) {
        url.append("limit", filters.limit);
      }
      if (filters.page) {
        url.append("page", filters.page);
      }
      if (filters.search) {
        url.append("search", filters.search);
      }
      if (filters.types) {
        url.append("types", filters.types);
      }
      const req = await api.get<ApiPagination<FindCategoryReseller[]>>(
        `/categories/reseller?${url.toString()}`
      );
      return req.data;
    },
    gcTime: 5 * 69 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useUpdateCategoryReseller() {
  return useMutation({
    mutationKey: ["categories-reseller"],
    mutationFn: async (data: UpsertCategoryReseller) => {
      const req = await api.post("/categories/reseller", data);
      return req.data;
    },
  });
}
