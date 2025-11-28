import { api } from "@/lib/api";
import type { ApiPagination, FilterRequest } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import type { UserData } from "../../types";

export function useGetAllCustomer(filters?: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", filters],
    queryFn: async ({ queryKey }) => {
      const [, filterParams] = queryKey as [string, FilterRequest | undefined];

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
        const response = await api.get<ApiPagination<UserData[]>>(
          `/user/branch?${searchParams.toString()}`
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount) => {
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },);

  return {
    data,
    isLoading,
    error,
  };
}
