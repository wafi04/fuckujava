import { api } from "@/lib/api";
import type { API_RESPONSE } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

interface InvoiceData {
  created_at: string;
  fee: number;
  payment_code: string;
  discount: number;
  payment_payload: string | null;
  payment_type: string;
  price: number;
  product_name: string;
  sn: string | null;
  reference_id: string;
  status: string;
  total: number;
  tujuan: string;
}

export function useGetInvoice(refid: string) {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ["invoice", refid],
      queryFn: async () => {
        const req = await api.get<API_RESPONSE<InvoiceData>>(
          "/trxreseller/" + refid
        );
        return req.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      enabled: !!refid,
    },
  );
  return { data, isLoading, error };
}
