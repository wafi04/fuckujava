import Image from "next/image";

export function BannerOrder({ image }: { image?: string }) {
  return (
    <div className="relative">
      <Image
        alt="Mobile Legends"
        src={image as string}
        width={1000}
        height={300}
                fetchPriority="high"
        className="min-h-52 w-full bg-muted object-cover object-center lg:object-contain"
      />
    </div>
  );
}
