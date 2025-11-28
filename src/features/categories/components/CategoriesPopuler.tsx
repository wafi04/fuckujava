"use client"
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useFindCategoryReseller } from "../useGetAllCategory";



export function CardCategoriesPopular() {
  const { data, isLoading, error } = useFindCategoryReseller({
    filters: {
      limit: "10",
      page: "1",
      types: "Populer"
    }
  })
  const categoryData = data?.data.data ?? [];

  if (isLoading) {
    return (
      <div className="container">
        <div className="mb-5 text-foreground">
          <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
            🔥 POPULER SEKARANG !
          </h3>
          <p className="pl-6 text-xs">
            💫 Silahkan Temukan Game Kamu Di PENCARIAN 🔍
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <li key={i} className="space-y-2">
              <Skeleton className="aspect-[4/5] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-8 text-red-500">
        Gagal memuat data kategori populer 😢
      </div>
    );
  }

  if (categoryData.length === 0) return null;

  return (
    <div className="container mt-10">
      <div className="mb-5 text-foreground">
        <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
          🔥 POPULER SEKARANG !
        </h3>
        <p className="pl-6 text-xs">
          💫 Silahkan Temukan Game Kamu Di PENCARIAN 🔍
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {categoryData.flatMap((item) => (
          <li
            key={item.brand}
            className="relative [--card-padding:theme(spacing.2)] [--card-radius:theme(borderRadius.2xl)] opacity-1 transform-none"
          >
            <Link
              href={`/order/${item.brand
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="flex items-center gap-x-2 rounded-md bg-muted text-foreground duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background md:gap-x-3 bg-title-product bg-popular-background bg-popular-image bg-cover bg-center bg-no-repeat"
            >
              <div className="flex items-center gap-3 p-[--card-padding]">
                <Image
                  src={item.category_thumbnail ?? item.thumbnail as string}
                  alt={item.name as string}
                  width={100}
                  height={100}
                  className="aspect-square h-14 w-14 rounded-md object-cover object-center duration-300 group-hover/recommendation:scale-110 group-hover/recommendation:shadow-2xl md:h-20 md:w-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                <div className="relative flex w-full flex-col">
                  <h4 className="w-[80px] truncate text-xxs font-semibold text-foreground sm:w-[125px] md:w-[150px] md:text-base lg:w-[175px]">
                    {item.name}
                  </h4>
                  {item.name && (
                    <p className="text-xxs text-foreground md:text-sm">
                      {item.name}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>

        ))}
      </ul>
    </div>
  );
}
