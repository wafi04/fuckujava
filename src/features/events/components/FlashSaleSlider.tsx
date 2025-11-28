import { useGetFlashSaleActive } from "@/features/products/api/api";
import { Zap } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import Marquee from "react-fast-marquee";
import { Card, CardContent } from "@/components/ui/card";
import { FormatCurrency } from "@/utils/format";

export function FlashSaleSlider() {
  const { data } = useGetFlashSaleActive();

  const products = data?.data ?? [];

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full my-8">
      <div className="w-full bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl  overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:px-6 bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-500 fill-yellow-500 size-6 sm:size-7" />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Flash Sale
            </span>
          </h2>
          <CountdownTimer endTime={data?.data[0].productEndAt as string} />
        </div>

        {/* Products Marquee */}
        <div className="py-4">
          <Marquee
            pauseOnHover={true}
            speed={40}
            gradient={true}
            gradientColor="transparent"
            gradientWidth={100}
          >
            {products.map((item) => {
              const discountPercent = Math.round(
                ((item.productPrice - item.productHargaPromo) /
                  item.productPrice) *
                  100
              );
              const url = item.productType.replaceAll(" ", "-").toLowerCase();

              return (
                <a
                  href={`/order/${url}`}
                  key={item.productCode}
                  className="mx-3 block"
                >
                  <Card className="w-[280px] sm:w-[320px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-red-400">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Image Section */}
                        <div className="relative shrink-0">
                          <div className="size-20 sm:size-24 rounded-xl overflow-hidden bg-muted">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg border-2 border-white">
                            -{discountPercent}%
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <p className="font-semibold text-sm sm:text-base line-clamp-2 leading-snug mb-2">
                            {item.productName}
                          </p>

                          <div className="space-y-1.5">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-lg sm:text-xl font-bold text-red-500">
                                {FormatCurrency(item.productHargaPromo)}
                              </span>
                              <span className="line-through text-xs sm:text-sm text-muted-foreground">
                                {FormatCurrency(item.productPrice)}
                              </span>
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              Hemat{" "}
                              {FormatCurrency(
                                item.productPrice - item.productHargaPromo
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
