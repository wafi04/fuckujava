import { Metadata } from "next";
import { api } from "@/lib/api";
import { API_RESPONSE } from "@/lib/types";
import { notFound } from "next/navigation";
import { CategoryWithProducts } from "@/features/categories/types";
import OrderLayout from "@/features/orders/components/Order";

async function GetDataCategory(code: string) {
  try {
    const req = await api.get<API_RESPONSE<CategoryWithProducts>>(
      `/categories/code?subName=${code}`
    );
    return req.data.data;
  } catch (error) {
    return null;
  }
}

// Generate metadata untuk SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await GetDataCategory(params.slug);

  if (!data) {
    return {
      title: "Category Not Found",
    };
  }

  // Generate deskripsi dari SubCategory
  const subCategoryNames =
    data.SubCategory?.map((sub) => sub.name).join(", ") || "";
  const description = `Order ${data.categoryName} - ${subCategoryNames}. Fast and reliable service.`;

  return {
    title: `${data.categoryName} - Order Now`,
    description: description,
    keywords: [
      data.categoryName,
      data.categorySubName,
      ...(data.SubCategory?.map((sub) => sub.name) || []),
      "order",
      "game",
      "top up",
    ],
    openGraph: {
      title: `${data.categoryName} - Order Now`,
      description: description,
      images: [
        {
          url: data.categoryBanner || data.categoryThumbnail,
          width: 1200,
          height: 630,
          alt: data.categoryName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.categoryName} - Order Now`,
      description: description,
      images: [data.categoryBanner || data.categoryThumbnail],
    },
    alternates: {
      canonical: `/order/${params.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch data di server component
  const data = await GetDataCategory(params.slug);

  // Handle jika data tidak ditemukan
  if (!data) {
    notFound();
  }
  return (
    <>
      {/* Schema.org structured data untuk SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.categoryName,
            description: `Order ${data.categoryName}`,
            image: data.categoryThumbnail,
            offers: {
              "@type": "AggregateOffer",
              availability: "https://schema.org/InStock",
              priceCurrency: "IDR",
            },
          }),
        }}
      />

  
      <OrderLayout params={params.slug} categoryData={data} />
    </>
  );
}
