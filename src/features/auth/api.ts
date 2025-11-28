import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { LoginFormData, RegisterFormData } from "./types";
import type { ErrorResponse } from "@/types/api";


export function useHandleLogout() {
  const queryClient  = useQueryClient()
  return useMutation(
    {
      mutationKey: ["logout"],
      mutationFn: async () => {
        const response = await api.post(`/user/logout`);
        return response.data;
      },
      onSuccess: () => {
        queryClient.clear();

        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Logout Succes");
        setTimeout(() => {
         window.location.href = "/login"
        }, 500);
      },
      onError: (error: Error) => {
        toast.error(error.message || "An error occurred during logout.");
      },
    },
  );
}
export const useRegisterMutation = () => {
  const queryClient  = useQueryClient()

  return useMutation(
    {
      mutationKey: ["register"],
      mutationFn: async (data: RegisterFormData) => {
        const res = await api.post("/auth/register", data);

        return res.data;
      },
      onError: (err: ErrorResponse) => {
        queryClient.cancelQueries({ queryKey: ["user"] });
        toast.error(err.message as string);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setTimeout(() => {
         window.location.href = "/login"
        }, 500);
      },
    },
  );
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationKey: ["login"],
      mutationFn: async (data: LoginFormData) => {
        const res = await api.post("/auth/login", data);
        return res.data;
      },
      onError: () => {
        queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(`Username atau password salah`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Login Success");

        setTimeout(() => {
         window.location.href = "/"
        }, 500);
      },
    },
  );
};

export function useForgotPassword(){
  return useMutation({
      mutationKey : ["forgot-password"],
      mutationFn : async(data : {email : string}) => {
        const req = await api.post("/auth/forgot-password",data)
        return req.data  
      },
      onSuccess : () => {
        toast.success("Email Sudah Terkirim")
      },
      onError : ()  => {
        toast.error("failed to send email")
      }
  })
}