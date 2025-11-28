"use client";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { MainBanner } from "@/features/banner/components/banner";
import { CardCategoriesPopular } from "@/features/categories/components/CategoriesPopuler";
import { SectionCategory } from "@/features/categories/components/sectionCategory";


export default function Home() {
  return (
    <AuthenticationLayout className="bg-background relative max-w-7xl flex flex-col space-y-10 w-full items-center  container">
      <MainBanner />
      <CardCategoriesPopular />
      <SectionCategory />
    </AuthenticationLayout>
  );
}
