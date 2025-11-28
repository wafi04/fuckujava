import { useEffect, useState } from "react";
import type {
  CreateProductFlashSaleRequest,
  UpdateProductFlashSaleRequest,
} from "../types";
import {
  useCreateProductFlashSaleNew,
  useUpdateProductFlashSale,
} from "../api/api";
import { useGetResellerPricing } from "@/features/products/api/api";
import { useDebounce } from "@/hooks/useDebounce";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormatCurrency } from "@/utils/format";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/features/upload/ImageUpload";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { calculateFee } from "@/utils/calculateFee";
import type { PriceType } from "@/features/products/types";

interface DialogFlashSaleProductsProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: Partial<CreateProductFlashSaleRequest> & { id?: number };
}

export function FormProductFlashSale({
  onClose,
  open,
  defaultValues,
}: DialogFlashSaleProductsProps) {
  const isUpdate = Boolean(defaultValues?.id);
  const [search, setSearch] = useState("");

  const { mutate: createProduct, isPending: creating } =
    useCreateProductFlashSaleNew();
  const { mutate: updateProduct, isPending: updating } =
    useUpdateProductFlashSale();

  const { data: productsData, isLoading: loadingProducts } =
    useGetResellerPricing({
      limit: "10",
      page: "1",
      search: useDebounce(search, 500),
    });
  const products = productsData?.data.data || [];

  const form = useForm<CreateProductFlashSaleRequest>({
    defaultValues: {
      product_id: defaultValues?.product_id ?? 0,
      flash_sale_id: defaultValues?.flash_sale_id ?? 0,
      original_price: defaultValues?.original_price ?? 0,
      flash_sale_price: defaultValues?.flash_sale_price ?? 0,
      stock_reserved: defaultValues?.stock_reserved ?? 1,
      stock_sold: defaultValues?.stock_sold ?? 0,
      thumbnail: defaultValues?.thumbnail ?? "",
    },
  });

  const {
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const currentThumbnail = watch("thumbnail");
  const selectedProductId = watch("product_id");

  // Auto-fill original_price ketika product dipilih
  useEffect(() => {
    if (selectedProductId && selectedProductId > 0) {
      const selectedProduct = products.find(
        (p: any) => p.id === selectedProductId
      );
      if (selectedProduct) {
        setValue("original_price", selectedProduct.product_price, {
          shouldValidate: true,
        });
      }
    }
  }, [selectedProductId, products, setValue, currentThumbnail]);

  const onSubmit = (values: CreateProductFlashSaleRequest) => {
    // Validasi product_id
    if (!values.product_id || values.product_id === 0) {
      alert("Pilih produk terlebih dahulu!");
      return;
    }

    // Validasi thumbnail
    if (!values.thumbnail || values.thumbnail === "") {
      alert("Thumbnail wajib diisi!");
      return;
    }

    if (isUpdate && defaultValues?.id) {
      const updateData: UpdateProductFlashSaleRequest & { id: number } = {
        id: defaultValues.id,
        ...values,
      };
      updateProduct(updateData, { onSuccess: onClose });
    } else {
      createProduct(values, { onSuccess: onClose });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isUpdate
              ? "Update Flash Sale Product"
              : "Create Flash Sale Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Search Product */}
          <div>
            <Label htmlFor="product_id">Product</Label>
            <Controller
              name="product_id"
              control={control}
              rules={{ required: "Produk wajib dipilih" }}
              render={({ field }) => {
                const selectedProduct = products.find(
                  (p) => p.id === field.value
                );

                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={isUpdate}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {selectedProduct ? (
                          <span className="truncate">
                            {selectedProduct.product_code} -{" "}
                            {FormatCurrency(selectedProduct.product_price)}
                          </span>
                        ) : (
                          "Pilih produk..."
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari produk..."
                          value={search}
                          onValueChange={setSearch}
                        />
                        <CommandEmpty>
                          {loadingProducts
                            ? "Loading..."
                            : "Produk tidak ditemukan"}
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-y-auto custom-scrollbar">
                          {products.map((product) => {
                            const sellingPrice =
                              product.product_price +
                              calculateFee(
                                product.product_price,
                                {
                                  fixed: product.margin_value_amount,
                                  percentage: product.margin_value_percentage,
                                },
                                product.calculation_type_reseller as PriceType
                              );

                            return (
                              <CommandItem
                                key={product.id}
                                value={product.product_code}
                                onSelect={() => {
                                  field.onChange(product.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === product.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {product.product_name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Modal:
                                    {FormatCurrency(product.product_price)} •
                                    Jual:
                                    {FormatCurrency(sellingPrice)}
                                  </span>
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.product_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.product_id.message}
              </p>
            )}
          </div>

          {/* Original Price (Read-only) */}
          <div>
            <Label htmlFor="original_price">Original Price</Label>
            <Input
              type="number"
              {...form.register("original_price", {
                valueAsNumber: true,
              })}
              readOnly
            />
          </div>

          {/* Flash Sale Price */}
          <div>
            <Label htmlFor="flash_sale_price">Flash Sale Price</Label>
            <Input
              type="number"
              {...form.register("flash_sale_price", {
                valueAsNumber: true,
                required: "Harga flash sale wajib diisi",
                validate: (value) => value > 0 || "Harga harus lebih dari 0",
              })}
            />
            {errors.flash_sale_price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.flash_sale_price.message}
              </p>
            )}
          </div>

          {/* Stock Reserved */}
          <div>
            <Label htmlFor="stock_reserved">Stock Pemakaian</Label>
            <Input
              type="number"
              {...form.register("stock_reserved", {
                valueAsNumber: true,
                required: "Stok wajib diisi",
                validate: (value) => value > 0 || "Stok harus lebih dari 0",
              })}
            />
            {errors.stock_reserved && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock_reserved.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <ImageUpload
              onUrlChange={(url) =>
                setValue("thumbnail", url, { shouldValidate: true })
              }
              currentUrl={currentThumbnail}
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={creating || updating}
            className="w-full"
          >
            {isUpdate ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
