"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableSort } from "@/hooks/useTableSort";
import { calculateFee } from "@/utils/calculateFee";
import { FormatCurrency, formatDate } from "@/utils/format";
import { useEffect } from "react";
import type { PriceType, ProductResellerWithDate } from "../types";
import { useProductsStore } from "../hooks";
import { useUpdateResellerPricing } from "../api/api";
import {
  localToUtcDatetime,
  utcToLocalDatetime,
} from "@/features/events/helpers";
import type { PacketFeatures } from "@/features/events/types";
import { useGetFeaturesPaket } from "@/features/events/api/api";

interface TableProductsProps {
  products: ProductResellerWithDate[];
  setSortBy: (value: string) => void;
  setSortOrder: (value: string) => void;
}

export function TableProducts({
  products,
  setSortBy,
  setSortOrder,
}: TableProductsProps) {
  const { data: feature } = useGetFeaturesPaket();
  // Cari fitur flash_sale
  const customFlashSaleFeature = feature?.data.find(
    (feature: PacketFeatures) => feature.code === "flash_sale"
  );

  const { currentSortBy, currentSortOrder, handleSort } = useTableSort({
    defaultSortBy: "product_code",
    defaultSortOrder: "asc",
    onSortChange: (sortBy, sortOrder) => {
      setSortBy(sortBy);
      setSortOrder(sortOrder);
    },
  });
  const {
    products: editedProducts,
    setProducts,
    updateProduct,
  } = useProductsStore();
  const { mutate, isPending } = useUpdateResellerPricing();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const handleSave = (id: string) => {
    const product = editedProducts.find((p) => `${p.product_code}` === id);
    if (!product) return;

    mutate({
      id: product.id,
      margin_value_amount: product.margin_value_amount,
      margin_value_percentage: product.margin_value_percentage,
      calculation_type_reseller: product.calculation_type_reseller,
      isActive: product.isActive,
      end_at: product.end_at,
      start_at: product.start_at,
      is_flash_sale: product.is_flash_sale,
      price_flash_sale: product.price_flash_sale,
    });
  };

  return (
    <div className="relative w-full overflow-auto">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <SortableTableHead
              column="product_code"
              currentSortBy={currentSortBy}
              currentSortOrder={currentSortOrder}
              onSort={handleSort}
              className="w-24"
            >
              Produk
            </SortableTableHead>
            <TableHead className="text-center">Kategori</TableHead>
            <TableHead className="text-center w-32">Harga Modal</TableHead>
            <TableHead className="text-center w-32">Harga Jual</TableHead>
            <SortableTableHead
              column="margin_value_amount"
              currentSortBy={currentSortBy}
              currentSortOrder={currentSortOrder}
              onSort={handleSort}
              className="w-24"
            >
              Margin Fixed
            </SortableTableHead>
            <SortableTableHead
              column="margin_value_percentage"
              currentSortBy={currentSortBy}
              currentSortOrder={currentSortOrder}
              onSort={handleSort}
              className="w-24"
            >
              Margin %
            </SortableTableHead>
            <SortableTableHead
              column="calculation_type"
              currentSortBy={currentSortBy}
              currentSortOrder={currentSortOrder}
              onSort={handleSort}
              className="w-24"
            >
              Calculation
            </SortableTableHead>
            <TableHead className="text-center">Status</TableHead>
            {customFlashSaleFeature && customFlashSaleFeature.is_enabled && (
              <>
                <TableHead className="text-center">Flash Sale</TableHead>
                <TableHead className="text-center w-32">
                  Harga Flash Sale
                </TableHead>
                <TableHead className="text-center w-48">Start At</TableHead>
                <TableHead className="text-center w-48">End At</TableHead>
              </>
            )}
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedProducts.map((product) => {
            const id = `${product.product_code}`;
            const profitReseller = calculateFee(
              product.product_price,
              {
                fixed: product.margin_value_amount,
                percentage: product.margin_value_percentage,
              },
              product.calculation_type_reseller
            );

            return (
              <TableRow key={id} className="text-center">
                <TableCell className="font-medium text-center">
                  {product.product_name}
                </TableCell>
                <TableCell className="flex flex-col items-center gap-1 text-center">
                  <Badge variant="outline">{product.product_category}</Badge>
                  <Badge variant="default">{product.product_type}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-semibold text-blue-600">
                    {FormatCurrency(product.product_price)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-bold text-primary">
                    {FormatCurrency(product.product_price + profitReseller)}
                  </div>
                </TableCell>
                <TableCell className="p-2 text-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={product.margin_value_amount ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        const numValue = value === "" ? null : Number(value);
                        updateProduct(id, "margin_value_amount", numValue);
                      }
                    }}
                    placeholder="0"
                    className="text-center"
                  />
                </TableCell>
                <TableCell className="p-2 text-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={product.margin_value_percentage ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        const numValue = value === "" ? null : Number(value);
                        updateProduct(id, "margin_value_percentage", numValue);
                      }
                    }}
                    placeholder="0"
                    className="text-center"
                  />
                </TableCell>
                <TableCell className="p-2 text-center">
                  <Select
                    value={product.calculation_type_reseller || "fixed"}
                    onValueChange={(value: PriceType) =>
                      updateProduct(id, "calculation_type_reseller", value)
                    }
                  >
                    <SelectTrigger className="text-center justify-center">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={product.isActive}
                    onCheckedChange={(val) =>
                      updateProduct(id, "isActive", val)
                    }
                  />
                </TableCell>
                {customFlashSaleFeature &&
                  customFlashSaleFeature.is_enabled && (
                    <>
                      <TableCell className="text-center">
                        <Switch
                          checked={product.is_flash_sale}
                          onCheckedChange={(val) =>
                            updateProduct(id, "is_flash_sale", val)
                          }
                        />
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={product.price_flash_sale ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^\d*\.?\d*$/.test(value)) {
                              const numValue =
                                value === "" ? null : Number(value);
                              updateProduct(id, "price_flash_sale", numValue);
                            }
                          }}
                          placeholder="0"
                          className="text-center"
                          disabled={!product.is_flash_sale}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {product.is_flash_sale ? (
                          <Input
                            type="datetime-local"
                            value={
                              product.start_at
                                ? utcToLocalDatetime(product.start_at)
                                : ""
                            }
                            onChange={(e) => {
                              const utcValue = localToUtcDatetime(
                                e.target.value
                              );
                              updateProduct(id, "start_at", utcValue);
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.is_flash_sale ? (
                          <Input
                            type="datetime-local"
                            value={
                              product.end_at
                                ? utcToLocalDatetime(product.end_at)
                                : ""
                            }
                            onChange={(e) => {
                              const utcValue = localToUtcDatetime(
                                e.target.value
                              );
                              updateProduct(id, "end_at", utcValue);
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </>
                  )}
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSave(id)}
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}