"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCategoryType } from "../useGetAllCategory";

export default function CategoriesChoices({
  setType,
  type,
}: {
  setType: (value: string) => void;
  type: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Ganti dengan API call Anda
  const { data, isLoading } = useGetCategoryType();

 
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [data]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="w-full mx-auto p-4">
        <div className="border rounded-lg p-6 mb-6">
          <div className="mb-6">
            <div className="h-6 bg-muted rounded w-40 mb-3 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-64 animate-pulse"></div>
          </div>
          <div className="flex gap-3 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-muted rounded-full animate-pulse shrink-0"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full my-10 mx-auto px-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Pilih Kategori
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Temukan produk sesuai kategori yang kamu butuhkan
        </p>
      </div>

      {/* Category List with Scroll */}
      <div className="relative group justify-center flex">
        {/* Left Button */}
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        {/* Right Button */}
        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data?.data
            .filter((category) => category !== "Populer")
          .map((category) => (
            <button
              key={category}
              className={`${
                category === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground"
              } flex items-center justify-center px-6 py-2 rounded-full border transition-all text-sm font-medium shadow-sm shrink-0 hover:shadow-md`}
              onClick={() => setType(category)}
            >
              <span className="whitespace-nowrap">{category}</span>
            </button>
          ))}
        </div>

        {/* linear Overlays (optional untuk visual cue) */}
        {showLeftButton && (
          <div className="absolute left-0 top-0 bottom-2 w-12 bg-linear-to-r from-background to-transparent pointer-events-none" />
        )}
        {showRightButton && (
          <div className="absolute right-0 top-0 bottom-2 w-12 bg-linear-to-l from-background to-transparent pointer-events-none" />
        )}
      </div>

      {/* CSS untuk hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
