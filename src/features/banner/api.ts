import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface BannerData {
  id: number;
  branchId: number;
  url: string;
  types: string;
  isActive: boolean;
}

export function UseCreateBanner() {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationKey: ["banners"],
      mutationFn: async (data: { url: string; types: string }) => {
        const req = await api.post<API_RESPONSE<null>>("/banner", data);
        return req.data;
      },
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
      onError: () => {
        queryClient.cancelQueries({ queryKey: ["banners"] });
      },
    },

  );
}
export function UseUpdateBanner() {
  const queryClient = useQueryClient()

  return useMutation(
    {
      mutationKey: ["banners"],
      mutationFn: async (data: {
        id: number;
        isActive: boolean;
        types: string;
      }) => {
        const req = await api.put(`/banner/${data.id}`, data);

        return req.data;
      },
      onSuccess: () => {
        toast.success("update successfully");
        queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
      onError: () => {
        queryClient.cancelQueries({ queryKey: ["banners"] });
      },
    },
  );
}

export function UseGetGalleryByBranchId({
  filters,
}: {
  filters?: {
    types?: string;
    is_active?: boolean;
  };
}) {
  return useQuery(
    {
      queryKey: ["banners", filters],
      queryFn: async () => {
        const queryParams = new URLSearchParams();

        // Tambahkan filter types jika ada
        if (filters?.types) {
          queryParams.append("types", filters.types);
        }

        // Tambahkan filter is_active jika ada
        if (filters?.is_active !== undefined) {
          queryParams.append("status", String(filters.is_active));
        }

        const url = `/banner${queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`;

        const req = await api.get<API_RESPONSE<BannerData[]>>(url);
        return req.data;
      },
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
    },
  );
}

export function UseDeleteBanner() {
  const queryClient = useQueryClient()

  return useMutation(
    {
      mutationKey: ["delete-banner"],
      mutationFn: async (id: number) => {
        const req = await api.delete(`/banner/${id}?id=${id}`);
        return req.data;
      },
      onSuccess: () => {
        toast.success("delete successfully");
        queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
      onError: () => {
        queryClient.cancelQueries({ queryKey: ["banners"] });
      },
    },
  );
}
