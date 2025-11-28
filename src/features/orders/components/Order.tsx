"use client"
import type { CategoryWithProducts } from "@/features/categories/types";
import { useGetAllProductByCategoryAndSubCategory } from "@/features/products/api/api";
import { useOrder } from "@/hooks/useFormOrder";
import { useState } from "react";
import { BannerOrder } from "./BannerOrder";
import { HeaderOrder, OrderInformation } from "./HeaderOrder";
import { PlaceHolderInput } from "./PlaceholderInput";
import { MethodSection } from "./MethodSection";
import { PhoneNumberInput } from "./phoneNumberInput";
import { Cart } from "./cart";
import { DialogValidateTransactions } from "./DialogTransactions";
import { ProductsOrder } from "@/features/products/components/ProductOrder";
import type { SubCategory } from "@/features/products/types";
import { scrollToSection } from "./Helpers";
import { useAuthQuery } from "@/features/auth/useAuthQuery";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
interface OrderLayoutProps {
  params: string;
  categoryData: CategoryWithProducts;
}
export default function OrderLayout({
  params,
  categoryData,
}: OrderLayoutProps) {
  const {
    transactionResult,
    showDialog,
    formData,
    setFormData,
    closeDialog,
    selectedMethod,
    selectedProduct,
    isSubmitting,
    getOrderSummary,
    confirmOrder,
  } = useOrder();
  const [showSaldoConfirmation, setShowSaldoConfirmation] = useState(false);

  const [selectSubcategory, setSelectSubCategory] = useState<string>("all");
  const { data: userData } = useAuthQuery();

  const { data: productsData, isLoading: loadingProducts } =
    useGetAllProductByCategoryAndSubCategory({
      category: params as string,
      subcategory: selectSubcategory,
    });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ [field]: value });
  };
  const handleSubmit = async () => {

    if (isSubmitting) {
      return;
    }

    // Jika metode pembayaran adalah SALDO, tampilkan dialog konfirmasi dulu
    if (getOrderSummary()?.paymentMethod.code === "SALDO") {
      setShowSaldoConfirmation(true);
      return;
    }

    // Untuk metode pembayaran lain, langsung submit
    confirmOrder();
  };

  const handleCloseSaldoDialog = () => {
    setShowSaldoConfirmation(false);
  };
  return (
    <>
      <AuthenticationLayout>
        <div className="relative min-h-screen">
          {/* Banner Section */}
          <section className="w-full">
            <BannerOrder image={categoryData?.categoryBanner} />
          </section>

          {/* Content area */}
          <section className="container mx-auto p-4 mt-5">
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <HeaderOrder
                brand={params as string}
                name={categoryData?.categoryName || ""}
                subName={categoryData?.categoryName || ""}
                thumbnail={categoryData?.categoryThumbnail || ""}
              />
              <OrderInformation inf={categoryData?.information as string} />
              <PlaceHolderInput
                setSelects={(value: string) => setSelectSubCategory(value)}
                brand={params as string}
                codeCheckNickname={categoryData.code_check_nickname as string}
                isCheckNickName={categoryData?.isCheckNickname as boolean}
              />
              {productsData && (
                <ProductsOrder
                  user={userData?.data}
                  products={productsData?.data}
                  selects={selectSubcategory}
                  onSelects={(value: string) => setSelectSubCategory(value)}
                  subCategory={categoryData?.SubCategory as SubCategory[]}
                  isLoading={loadingProducts}
                  onSelect={() => scrollToSection("methods-section")}
                />
              )}

              <MethodSection userData={userData?.data} />
              <PhoneNumberInput
                email={formData.email || ""}
                phoneNumber={formData.phoneNumber || ""}
                setEmail={(value) => handleInputChange("email", value)}
                setPhoneNumber={(value) =>
                  handleInputChange("phoneNumber", value)
                }
              />
              <div className="sticky bottom-0 bg-background border-t pt-4 -mx-4 px-4">
                <Cart
                  confirmOrder={confirmOrder}
                  isSubmitting={isSubmitting}
                  selectedMethod={selectedMethod}
                  selectedProduct={selectedProduct}
                />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8">
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-4 space-y-4">
                  <HeaderOrder
                    brand={params as string}
                    name={categoryData?.categoryName || ""}
                    subName={categoryData?.categoryName || ""}
                    thumbnail={categoryData?.categoryThumbnail || ""}
                  />

                  <OrderInformation inf={categoryData?.information as string} />
                  <Cart
                    confirmOrder={handleSubmit}
                    isSubmitting={isSubmitting}
                    selectedMethod={selectedMethod}
                    selectedProduct={selectedProduct}
                  />
                </div>
              </div>

              <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                <PlaceHolderInput
                  codeCheckNickname={categoryData.code_check_nickname as string}
                  setSelects={(value: string) => setSelectSubCategory(value)}
                  brand={params as string}
                  isCheckNickName={categoryData?.isCheckNickname as boolean}
                />

                {productsData && (
                  <ProductsOrder
                    user={userData?.data}
                    products={productsData?.data}
                    subCategory={categoryData?.SubCategory as SubCategory[]}
                    selects={selectSubcategory}
                    onSelects={(value: string) => setSelectSubCategory(value)}
                    isLoading={loadingProducts}
                    onSelect={() => scrollToSection("methods-section")}
                  />
                )}

                <MethodSection userData={userData?.data} />
                <PhoneNumberInput
                  email={formData.email || ""}
                  phoneNumber={formData.phoneNumber || ""}
                  setEmail={(value) => handleInputChange("email", value)}
                  setPhoneNumber={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                />
              </div>
            </div>
          </section>
        </div>

      </AuthenticationLayout>

      {/* Dialog untuk metode pembayaran SALDO (konfirmasi sebelum submit) */}
      {showSaldoConfirmation && (
        <DialogValidateTransactions
          isOpen={showSaldoConfirmation}
          onClose={handleCloseSaldoDialog}
          isSaldoConfirmation={true}
        />
      )}

      {/* Dialog untuk hasil transaksi (setelah submit API) */}
      {transactionResult && showDialog && getOrderSummary()?.paymentMethod.code !== "SALDO" && (
        <DialogValidateTransactions
          isOpen={showDialog}
          onClose={closeDialog}
          transactionData={{
            ...transactionResult,
          }}
        />
      )}
    </>
  );
}
