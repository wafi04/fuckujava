import { Badge } from "@/components/ui/badge";
import { FormatCurrency } from "@/utils/format";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type {
  ProductOrder,
  ProductsOrderWithType,
  SubCategory,
} from "../types";
import { useOrder } from "@/hooks/useFormOrder";
import { HeaderFieldOrder } from "@/features/orders/components/HeaderFieldOrder";
import { scrollToSection } from "@/features/orders/components/Helpers";
import type { User } from "@/features/auth/types";

interface ProductsOrderProps {
  products: ProductsOrderWithType[];
  user: User | undefined;
  isLoading: boolean;
  selects: string;
  onSelects: (select: string) => void;
  subCategory: SubCategory[];
  onSelect?: () => void;
}

export function ProductsOrder({
  products,
  onSelect,
  selects,
  onSelects,
  subCategory,
  user,
  isLoading,
}: ProductsOrderProps) {
  const { setSelectedProduct, selectedProduct, setSelectedMethod,selectedMethod, formData } =
    useOrder();
  const [selectedType, setSelectedType] = useState<string>(selects);

  useEffect(() => {
    setSelectedType(selects);
    onSelects(selects);
  }, [selects]);

  const filteredSubCategory =
    formData?.region && formData.region !== "all"
      ? subCategory.filter((sub) => sub.region === formData.region)
      : subCategory;

  const filteredProducts =
    formData?.region && formData.region !== "all"
      ? (products
          .map((productGroup) => {
            const matchingSubCategory = subCategory.find(
              (sub) => sub.name === productGroup.type
            );

            if (
              matchingSubCategory &&
              (matchingSubCategory.region === formData.region ||
                matchingSubCategory.region === "all")
            ) {
              return productGroup;
            }
            return null;
          })
          .filter((group) => group !== null) as ProductsOrderWithType[])
      : products;

  const displayedProducts =
    selectedType === "all"
      ? filteredProducts
      : filteredProducts.filter((group) => {
          const matchingSub = subCategory.find(
            (sub) => sub.name === group.type
          );
          return matchingSub?.code === selectedType;
        });

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    onSelects(type);
  };

  const handleSelectProduct = (product: ProductOrder) => {
    const gameId = formData?.gameId?.toString().trim() || "";

    if (!gameId || gameId.length < 4) {
      toast.error("Masukkan Akun Terlebih Dahulu");
      scrollToSection("placholderinput-section");
      return;
    }

    if (onSelect) {
      onSelect();
    }

    const finalPrice =
      product.productHargaPromo && product.productHargaPromo > 0
        ? product.productHargaPromo
        : product.productPrice;

    if ((user?.balance ?? 0) < finalPrice && selectedMethod?.code === "SALDO") {
      setSelectedMethod(null);
    }
    setSelectedProduct({
      id: product.productId,
      productCode: product.productCode,
      name: product.productName,
      price: finalPrice,
    });
  };

  return (
    <div className="space-y-3 bg-card rounded-lg border border-border">
      <HeaderFieldOrder id={2} subName="Pilih Produk" />
      <div className="p-4 flex flex-wrap gap-2 border-b border-border/30">
        {isLoading ? (
          <div className="flex gap-2 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleSelectType("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border/50 hover:bg-muted"
              }`}
            >
              Semua
            </button>

            {filteredSubCategory.map((typeName) => {
              return (
                <button
                  key={typeName.code}
                  type="button"
                  onClick={() => handleSelectType(typeName.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                    selectedType === typeName.code
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border/50 hover:bg-muted"
                  }`}
                >
                  {typeName.name}
                </button>
              );
            })}
          </>
        )}
      </div>

      <div className="space-y-4 p-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((productGroup) => {
            return (
              <div key={productGroup.type} className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  {productGroup.type}
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {productGroup.products.map((product) => {
                    // ✅ Check apakah ada flash sale aktif
                    const hasFlashSale =
                      product.productHargaPromo &&
                      product.productHargaPromo > 1;
                    const finalPrice = hasFlashSale
                      ? product.productHargaPromo
                      : product.productPrice;

                    return (
                      <div
                        key={product.productCode}
                        onClick={() => handleSelectProduct(product)}
                        className={
                          "bg-card relative border flex items-center gap-4 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                        }
                      >
                        {selectedProduct?.id === product.productId && (
                          <Badge className="rounded-full p-0 size-5 absolute top-2 right-4">
                            <Check className="text-success" />
                          </Badge>
                        )}

                        {/* ✅ Flash Sale Badge */}
                        {hasFlashSale ? (
                          <Badge
                            variant="destructive"
                            className="absolute top-2 right-2 text-xs px-2 py-0.5"
                          >
                            PROMO
                          </Badge>
                        ) : null}

                        {product.productImage && (
                          <div>
                            <img
                              className="[&>div:first-child:has(+img)]:hidden"
                              alt={product.productName}
                              src={product.productImage}
                              width={40}
                              height={40}
                            />
                          </div>
                        )}

                        <div className="space-y-2 flex-1">
                          <h3 className="font-medium text-foreground text-xs md:text-sm">
                            {product.productName}
                          </h3>

                          <div className="flex flex-col gap-1">
                            {/* ✅ Tampilkan harga promo jika ada */}
                            {hasFlashSale ? (
                              <>
                                <span className="text-sm font-bold text-red-600">
                                  {FormatCurrency(product.productHargaPromo)}
                                </span>
                                <span className="text-xs text-muted-foreground line-through">
                                  {FormatCurrency(product.productPrice)}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-semibold text-foreground">
                                {FormatCurrency(product.productPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Tidak ada produk ditemukan untuk region ini
          </div>
        )}
      </div>
    </div>
  );
}
