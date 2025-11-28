import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
export interface OptionItem {
  value: string;
  label: string;
}

export interface FormFieldsData {
  id: number;
  subCategoryID: number;
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  fieldOrder: number;
  options: OptionItem[];
}

export function useGetFormFields(brand: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-fields"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FormFieldsData[]>>(
        `/form-fields/brand/${brand}`
      );
      return req.data;
    },
    staleTime: 24 * 60 * 1000,
    gcTime: 24 * 60 * 1000,
  });
  return {
    data,
    isLoading,
    error,
  };
}
