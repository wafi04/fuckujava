import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateTransactions,
  TransactionResponse,
  TransactionResponseCheck,
  TransactionsAllData,
  TransactionUserResponse,
} from "./types";
import type { API_RESPONSE, ApiPagination, FilterRequest } from "@/types/api";

interface FilterTransactions extends FilterRequest {
  start_date: string;
  end_date: string;
}

export function useGetAllTransactions(filters: FilterTransactions) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.start_date) params.append("start_date", filters.start_date);
      if (filters?.end_date) params.append("end_date", filters.end_date);

      const data = await api.get<ApiPagination<TransactionsAllData[]>>(
        `/trxreseller?${params.toString()}`
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

export function useCreateTransactions() {
  return useMutation({
    mutationKey: ["transactions"],
    mutationFn: async (data: CreateTransactions) => {
     

      const req = await api.post<API_RESPONSE<TransactionResponse>>(
        "/trxreseller",
        data
      );
      return req.data;
    },
  });
}

export function useGetTransactions({ filters }: { filters?: FilterRequest }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);

      const req = await api.get<ApiPagination<TransactionResponseCheck[]>>(
        "/trxreseller?" + params.toString()
      );
      return req.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useGettransactionsResellerUser({
  filters,
}: {
  filters?: FilterRequest;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order-users", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("offset", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);

      const req = await api.get<ApiPagination<TransactionUserResponse[]>>(
        "/trxreseller/user?" + params.toString()
      );
      return req.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    data,
    isLoading,
    error,
  };
}
