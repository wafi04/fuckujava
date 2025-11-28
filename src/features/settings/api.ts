import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpsertWebSettings, WebSettings } from "./types";
import toast from "react-hot-toast";
import type { API_RESPONSE } from "@/types/api";

export function useCreateWebSettings() {
    const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["web-settings"],
    mutationFn: async (data: UpsertWebSettings) => {
      const req = await api.post<API_RESPONSE<null>>("/websettings", data);
      return req.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["web-settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  },);
}

// GET WEB SETTINGS
export function useGetWebSettings() {
  return useQuery({
    queryKey: ["web-settings"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<WebSettings>>(`/websettings`);
      return req.data;
    },
    staleTime: 24 * 60 * 1000,
    gcTime: 24 * 60 * 1000,
  });
}

export function useUpdateWebSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["web-settings"],
    mutationFn: async ({
      data,
      id,
    }: {
      data: UpsertWebSettings;
      id: number;
    }) => {
      const req = await api.put<API_RESPONSE<null>>(`/websettings/${id}`, data);
      return req.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["web-settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  },);
}
