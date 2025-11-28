import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useGetCategoryByType } from "../useGetAllCategory";
import type { CategoryApiResponse, CategoryItem } from "../types";
import Image from "next/image";
import Link from "next/link";

export function CardCategory({ type }: { type: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategories, setAllCategories] = useState<CategoryItem[]>([]);
  const ITEMS_PER_PAGE = 12;

  const { data, isLoading, error } = useGetCategoryByType(
    type,
    ITEMS_PER_PAGE.toString(),
    currentPage.toString()
  ) as {
    data?: CategoryApiResponse;
    isLoading: boolean;
    error?: { message: string };
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
    setAllCategories([]);
  }, [type]);

  // Parse and accumulate categories
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const newCategories = data.data.flatMap((group) =>
        Array.isArray(group.data) ? group.data : []
      );

      // Append new data to existing (for load more)
      setAllCategories((prev) => {
        if (currentPage === 1) {
          return newCategories;
        }
        // Prevent duplicates
        const existingBrands = new Set(prev.map((item) => item.brand));
        const uniqueNew = newCategories.filter(
          (item) => !existingBrands.has(item.brand)
        );
        return [...prev, ...uniqueNew];
      });
    }
  }, [data, currentPage]);

  // Determine if there's more data
  const hasMoreFromAPI = data?.pagination
    ? currentPage < data.pagination.totalPages
    : false;

  const hasMoreFromCount = data?.data
    ? data.data.flatMap((g) => g.data || []).length === ITEMS_PER_PAGE
    : false;

  const hasMore = hasMoreFromAPI || hasMoreFromCount;

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {allCategories.map((item) => {
          const url = item.brand.replaceAll(" ", "-").toLowerCase();
          return (
            <Link
              key={item.brand}
              href={`/order/${url}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image with fixed aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <Image
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={item.thumbnail}
                />

                {/* Gradient overlay - lebih subtle pada hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />

                {/* Animated border accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 border-2 border-orange-500 rounded-xl animate-pulse" />
                </div>

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  <h3 className="font-bold text-sm line-clamp-2 drop-shadow-lg group-hover:text-orange-400 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Subtle "View" indicator on hover */}
                  <p className="text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    Lihat Menu →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center my-5 rounded-xl">
        {hasMore && (
          <Button onClick={handleLoadMore} disabled={isLoading}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}