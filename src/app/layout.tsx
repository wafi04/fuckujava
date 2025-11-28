
import { MetadataService } from "@/lib/metadata";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/hooks/ReactQueryProvider";
import { DynamicFavicon } from "@/components/ui/DynamicFavicon";

// Generate metadata dari service
export async function generateMetadata(): Promise<Metadata> {
  return await MetadataService.generateBaseMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <DynamicFavicon />
      <body className="bg-primary-background text-foreground">
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
