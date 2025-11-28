import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { FlashSale, UpsertFlashSale } from "../types";
import { localToUtcDatetime, utcToLocalDatetime } from "../helpers";
import { useCreateFlashSale, useUpdateflashsale } from "../api/api";
import { useEffect } from "react";

export interface FormFlashSaleProps {
  flashSale?: FlashSale;
}

export function FormFlashSale({ flashSale }: FormFlashSaleProps) {
  const { mutate, isPending } = useCreateFlashSale();
  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateflashsale();

  const form = useForm<UpsertFlashSale>({
    defaultValues: {
      description: flashSale?.description ?? "",
      end_at: "",
      is_active: flashSale?.is_active ?? true,
      start_at: "",
      title: flashSale?.title ?? "",
    },
  });

  // Update form values when flashSale prop changes
  useEffect(() => {
    if (flashSale) {
      form.reset({
        description: flashSale.description,
        is_active: flashSale.is_active,
        title: flashSale.title,
      });
    }
  }, [flashSale, form]);

  const onSubmit = (data: UpsertFlashSale) => {
    console.log("Submit data:", data); // Debug log

    if (flashSale) {
      updateMutate({
        data: {
          ...data,
          id: flashSale.id,
          created_at: "",
          updated_at: "",
        },
      });
    } else {
      mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Flash Sale</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: Flash Sale Akhir Tahun"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan deskripsi flash sale..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal & Waktu Mulai</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={field.value ? utcToLocalDatetime(field.value) : ""}
                    onChange={(e) => {
                      const utcValue = localToUtcDatetime(e.target.value);
                      field.onChange(utcValue);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  Zona waktu: WIB (UTC+7)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal & Waktu Selesai</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={field.value ? utcToLocalDatetime(field.value) : ""}
                    onChange={(e) => {
                      const utcValue = localToUtcDatetime(e.target.value);
                      field.onChange(utcValue);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  Zona waktu: WIB (UTC+7)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </FormControl>
              <FormLabel className="mt-0">Aktifkan Flash Sale</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isPending || updatePending}
          >
            {isPending || updatePending ? "Menyimpan..." : "Simpan Flash Sale"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
