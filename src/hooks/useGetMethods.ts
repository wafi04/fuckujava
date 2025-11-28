import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
export type ResponseMethod = {
  type: string;
  methods: MethodResponseByType[];
};

export type MethodResponseByType = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  image: string;
  type: "virtual-account" | "e-wallet" | "qris" | string; // bisa diperluas sesuai enum di DB
  max_amount: number | null;
  min_amount: number | null;
  status: "active" | "inactive" | string;
  fee_amount: number;
  fee_percentage: number;
  calculation_type: "fixed" | "percentage" | "hybrid";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export function useGetMethodByType() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["methods-by-type"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<ResponseMethod[]>>(
        `/method/type/reseller`
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
