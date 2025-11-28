import { useRef, useState } from "react";
import { UseGetFlashSalesById } from "../api/api";
import { useOrderFlashSale } from "../hooks";
import { BannerOrder } from "@/features/orders/components/BannerOrder";
import { HeaderOrder } from "@/features/orders/components/HeaderOrder";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FormatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashSalePage {
  slug : string
}
export default function FlashSalePage({slug} : FlashSalePage) {
  const { data, isLoading, error } = UseGetFlashSalesById(slug as string);
  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    setProductFlashSale,
    productFlashSale,
    email,
    phoneNumber,
    setPhoneNumber,
    setEmail,
  } = useOrderFlashSale();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Memuat flash sale...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-destructive text-6xl">⚠️</div>
        <p className="text-destructive font-medium">Gagal memuat flash sale</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-muted-foreground text-6xl">🔍</div>
        <p className="text-muted-foreground">Flash sale tidak ditemukan</p>
      </div>
    );

  const serelizeBrand =
    productFlashSale?.product.brandName?.replaceAll(" ", "-").toLowerCase() ?? "";
  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth || 0;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % data.products.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentSlide === 0 ? data.products.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  // Auto select first product if none selected
  if (!productFlashSale && data.products.length > 0) {
    setProductFlashSale(data.products[0]);
  }

  const calculateDiscount = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const calculateProgress = (sold: number, reserved: number) => {
    const total = sold + reserved;
    return total > 0 ? (sold / total) * 100 : 0;
  };

  return (
      <main className="relative bg-linear-to-b from-background to-muted/30 min-h-screen">

        <div className="relative">
          <BannerOrder
            image={
              "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flash-sale-banner-design-template-9349bfc8031a263ff98d40c75a97378a_screen.jpg?ts=1714269671"
            }
          />
          <div className="absolute inset-0 bg-linar-to-r from-red-600/20 to-orange-500/20" />
        </div>

        <section
          aria-labelledby="main-title"
          className="bg-title-product flex min-h-32 w-full items-center border-b bg-transparent lg:min-h-40 bg-order-header-background"
        >
          <div className="container">
            {data && (
              <HeaderOrder
              brand={""}
                thumbnail={data.products[0]?.thumbnail || "/default-image.jpg"}
                name={data.flash_sale.title || "Produk Tidak Ditemukan"}
                subName={data.flash_sale.description || ""}
              />
            )}
          </div>
        </section>

        {/* Enhanced Products Slider Section */}
        <section className="container py-10">
          <div className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              {/* Navigation Controls */}
              {data.products.length > 1 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {currentSlide + 1} / {data.products.length}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSlide}
                      className="h-10 w-10 p-0 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSlide}
                      className="h-10 w-10 p-0 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Products Slider */}
            <div className="relative">
              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {data.products.map((product, index) => {
                  const isSelected = productFlashSale?.id === product.id;
                  const discount = calculateDiscount(
                    product.original_price,
                    product.flash_sale_price
                  );
                  const progress = calculateProgress(
                    product.stock_sold,
                    product.stock_reserved
                  );

                  return (
                    <Card
                      key={product.id}
                      className={cn(
                        "shrink-0 w-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                        isSelected &&
                          "ring-2 ring-primary shadow-lg scale-[1.02]"
                      )}
                      style={{ scrollSnapAlign: "start" }}
                      onClick={() => {
                        setProductFlashSale(product);
                        setCurrentSlide(index);
                      }}
                    >
                      <CardContent className="p-0 relative overflow-hidden">
                        {/* Discount Badge */}

                        {isSelected && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="p-5 space-y-4">
                          <h3 className="font-semibold  text-md leading-tight line-clamp-2 text-foreground">
                            {product.product.name}
                          </h3>

                          {/* Pricing */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-red-600 font-bold text-xl">
                                {FormatCurrency(product.flash_sale_price)}
                              </span>
                              <span className="text-muted-foreground line-through text-sm">
                                {FormatCurrency(product.original_price)}
                              </span>
                              <Badge
                                variant={"destructive"}
                                className=" text-sm"
                              >
                                -{discount}%
                              </Badge>
                            </div>
                          </div>

                          {/* Stock Progress */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                Stok terjual
                              </span>
                              <span className="font-medium">
                                {product.stock_sold}/
                                {product.stock_sold + product.stock_reserved}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-linear-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Input Form Section */}
        {/* {productFlashSale && (
          <section className="container pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <SummaryProduct />
              <div className="lg:col-span-3 space-y-6">
                <PlaceholderInputFlashSale
                  brandName={serelizeBrand}
                  isCheckNickName={productFlashSale.product.isCheckNickName}
                />
                <MethodSectionFlashSale count={2} />
                <PhoneNumberInput
                  count={3}
                  email={email}
                  phoneNumber={phoneNumber}
                  setEmail={setEmail}
                  setPhoneNumber={setPhoneNumber}
                />
              </div>
            </div>
          </section>
        )} */}
      </main>
  );
}
