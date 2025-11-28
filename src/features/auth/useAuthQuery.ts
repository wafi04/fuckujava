import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import type { User } from "./types";

const fetchUser = async () => {
  const response = await api.get<API_RESPONSE<User>>("/user/profile");
  return response.data;
};

export const useAuthQuery = () => {
  const { data, isLoading, error, refetch, isError } = useQuery(
    {
      queryKey: ["user"],
      queryFn: fetchUser,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60000, // 5 menit
      gcTime : 10 * 60000
    },
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    isError,
  };
};
