"use client";

import { WithChildren } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGetWebSettings } from "@/features/settings/api";
import { Navbar } from "../header/Navbar";
import { usePathname } from "next/navigation";
import { Footer } from "../header/Footer";

interface AuthenticationLayoutProps extends WithChildren {
  className?: string;
}

export function AuthenticationLayout({
  children,
  className,
}: AuthenticationLayoutProps) {
  const { data } = useGetWebSettings();
  const pathname = usePathname()
  const websettinggsData = data?.data;
  return (
    <>
      {websettinggsData && (
        <>
          <Navbar pathname={pathname} data={websettinggsData} />
          <main
            className={cn(
              "relative  flex flex-col mt-24 space-y-10 w-full items-center",
              className
            )}
          >
            {children}
          </main>
          <Footer data={websettinggsData} />
        </>
      )}
    </>
  );
}