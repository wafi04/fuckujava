"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseGetGalleryByBranchId } from "../api";
import Image from "next/image";


export function MainBanner() {
  const { data } = UseGetGalleryByBranchId({
    filters: {
      is_active: true,
      types: "banner",
    },
  });

  const originalBanners = data?.data ?? [];

  // Duplikasi banner minimal 3x untuk smooth infinite loop
  const banners = originalBanners.length > 0
    ? [...originalBanners, ...originalBanners, ...originalBanners]
    : [];

  const [current, setCurrent] = useState(originalBanners.length); // Start di tengah

  // Auto slide setiap 5 detik
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Reset ke posisi tengah saat mencapai ujung (infinite loop)
  useEffect(() => {
    if (originalBanners.length === 0) return;

    const originalLength = originalBanners.length;

    // Jika sudah di akhir duplikasi, reset ke awal (tanpa animasi)
    if (current >= originalLength * 2) {
      setTimeout(() => {
        setCurrent(originalLength);
      }, 500); // Tunggu transisi selesai
    }

    // Jika sudah di awal duplikasi, reset ke tengah (tanpa animasi)
    if (current < originalLength) {
      setTimeout(() => {
        setCurrent(originalLength);
      }, 500);
    }
  }, [current, originalBanners.length]);

  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  if (originalBanners.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto my-8 px-4">
      {/* Carousel Container */}
      <div className="relative">
        {/* Main Carousel Track */}
        <div className="relative h-[280px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {banners.map((banner, index) => {
              // Hitung posisi relatif terhadap current
              let position = index - current;

              // Hanya render slide yang visible (-1, 0, 1)
              if (position < -1 || position > 1) return null;

              const isCurrent = position === 0;
              const isPrev = position === -1;
              const isNext = position === 1;

              return (
                <div
                  key={index}
                  className={`
                    absolute transition-all duration-500 ease-out
                    ${isCurrent
                      ? "z-20 scale-100 opacity-100 translate-x-0"
                      : "z-10 scale-[0.85] opacity-40 blur-[2px]"
                    }
                    ${isPrev ? "-translate-x-[70%] md:-translate-x-[75%]" : ""}
                    ${isNext ? "translate-x-[70%] md:translate-x-[75%]" : ""}
                  `}
                  style={{
                    width: "min(90vw, 900px)",
                    pointerEvents: isCurrent ? "auto" : "none"
                  }}
                >
                  <Image
                    src={banner.url}
                    alt={banner.types}
                    width={500}
                    height={500}
                    className="object-cover w-full h-[280px] md:h-[400px] object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg">
          <button
            onClick={prevSlide}
            className="p-3 hover:bg-orange-600/50 transition-colors rounded-l-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
          </button>

          <div className="w-px h-6 bg-white/30" />

          <button
            onClick={nextSlide}
            className="p-3 hover:bg-orange-600/50 transition-colors rounded-r-full"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {originalBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index + originalBanners.length)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${(current % originalBanners.length) === index
                  ? "bg-orange-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}