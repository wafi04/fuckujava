import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type {
  CreateProductFlashSaleRequest,
  FlashSale,
  FlashSaleData,
  FlashSaleId,
  PacketFeatures,
  ProductFlashSale,
  UpdateProductFlashSaleRequest,
  UpsertFlashSale,
} from "../types";

export function useGetFeaturesPaket() {
  return useQuery(
    {
      queryKey: ["packet-features"],
      queryFn: async () => {
        const req = await api.get<API_RESPONSE<PacketFeatures[]>>(
          "/branch/features"
        );
        return req.data;
      },
      staleTime: 10 * 60000,
      gcTime: 15 * 60000,
    },
  );
}

export function useCreateFlashSale() {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationFn: async (data: UpsertFlashSale) => {
        const response = await api.post<API_RESPONSE<null>>(
          "/flash-sales",
          data
        );
        return response.data;
      },
      onSuccess: (data) => {
        toast.success(data.message || "Flash sale berhasil dibuat!");
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({
          queryKey: ["flash-sales-active"],
        });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal membuat flash sale";
        toast.error(errorMessage);
      },
    },
    queryClient
  );
}

export function UseGetFlashSalesById(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flash-sales", id],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FlashSaleId>>(
        `/flash-sales/${id}`
      );
      return req.data;
    },
    staleTime: 5 * 60000,
    gcTime: 5 * 60000,
  });
  return {
    data: data?.data,
    flashSale: data?.data,
    isLoading,
    error,
  };
}


export function UseGetAllFlashSalesNow() {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["flash-sales-now"],
      queryFn: async () => {
        const req = await api.get<API_RESPONSE<FlashSaleData[]>>(
          "/flash-sales"
        );
        return req.data;
      },
      staleTime: 5 * 60000,
      gcTime: 5 * 60000,
    },
  );
  return {
    data: data?.data,
    flashSale: data?.data,
    isLoading,
    error,
  };
}

export function UseGetAllFlashSales() {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["flash-sales"],
      queryFn: async () => {
        const req = await api.get<API_RESPONSE<FlashSaleData[]>>(
          "/flash-sales/fs/all"
        );
        return req.data;
      },
      staleTime: 5 * 60000,
      gcTime: 5 * 60000,
    },
  );
  return {
    data: data?.data,
    flashSale: data?.data,
    isLoading,
    error,
  };
}

export function useGetProductFlashSaleById(id: string | number) {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["flash-sale-products", id],
      queryFn: async () => {
        const req = await api.get<API_RESPONSE<ProductFlashSale>>(
          `/flash-sale-products/${id}`
        );
        return req.data;
      },
      enabled: !!id,
      staleTime: 2 * 60000,
      gcTime: 5 * 60000,
    },
  );
  return {
    data: data?.data,
    product: data?.data,
    isLoading,
    error,
  };
}

export function useUpdateflashsale() {
  const queryClient  = useQueryClient()
  return useMutation(
    {
      mutationFn: async ({ data }: { data: FlashSale }) => {
        const response = await api.put<API_RESPONSE<null>>(
          `/flash-sales/${data.id}`,
          data
        );
        return response.data;
      },
      onSuccess: (data) => {
        toast.success(data.message || "Flash sale berhasil diupdate!");
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales-active"] });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal mengupdate flash sale";
        toast.error(errorMessage);
        console.error("Update flash sale error:", error);
      },
    },
  );
}

export function useDeleteflashsale() {
    const queryClient  = useQueryClient()

  return useMutation(
    {
      mutationFn: async (id: number) => {
        const response = await api.delete<API_RESPONSE<null>>(
          `/flash-sales/${id}`
        );
        return response.data;
      },
      onSuccess: (data) => {
        toast.success(data.message || "Flash sale berhasil dihapus!");
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({
          queryKey: ["flash-sales-active"],
        });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal menghapus flash sale";
        toast.error(errorMessage);
        console.error("Delete flash sale error:", error);
      },
    },
  );
}

export function useDeleteProductFlashSale() {
    const queryClient  = useQueryClient()

  return useMutation(
    {
      mutationFn: async (id: number) => {
        const response = await api.delete<API_RESPONSE<any>>(
          `/flash-sale-products/${id}`
        );
        return response.data;
      },
      onSuccess: (data) => {
        toast.success(data.message || "Produk flash sale berhasil dihapus!");
        queryClient.invalidateQueries({ queryKey: ["flash-sale-products"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales-active"] });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal menghapus produk flash sale";
        toast.error(errorMessage);
        console.error("Delete flash sale product error:", error);
      },
    },
  );
}

export function useCreateProductFlashSaleNew() {
    const queryClient  = useQueryClient()

  return useMutation(
    {
      mutationFn: async (data: CreateProductFlashSaleRequest) => {
        const response = await api.post<API_RESPONSE<ProductFlashSale>>(
          "/flash-sale-products",
          data
        );
        return response.data;
      },
      onSuccess: (data) => {
        toast.success(data.message || "Produk flash sale berhasil dibuat!");
        queryClient.invalidateQueries({ queryKey: ["flash-sale-products"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales-active"] });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal membuat produk flash sale";
        toast.error(errorMessage);
      },
    },
  );
}

export function useUpdateProductFlashSale() {
    const queryClient  = useQueryClient()

  return useMutation(
    {
      mutationFn: async ({
        id,
        ...data
      }: UpdateProductFlashSaleRequest & { id: number }) => {
        const response = await api.put<API_RESPONSE<ProductFlashSale>>(
          `/flash-sale-products/${id}`,
          data
        );
        return response.data;
      },
      onSuccess: (data, variables) => {
        toast.success(data.message || "Produk flash sale berhasil diupdate!");
        queryClient.invalidateQueries({ queryKey: ["flash-sale-products"] });
        queryClient.invalidateQueries({
          queryKey: ["flash-sale-products", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["flash-sales"] });
        queryClient.invalidateQueries({ queryKey: ["flash-sales-active"] });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Gagal mengupdate produk flash sale";
        toast.error(errorMessage);
      },
    },
  );
}
