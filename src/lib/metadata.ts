import { WebSettings } from "@/features/settings/types";
import { Metadata } from "next";

export class MetadataService {
  private static baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL!
  private static apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  static async fetchWebSettings(): Promise<WebSettings | null> {
    try {
      const response = await fetch(`${this.apiUrl}/websettings`, {
        headers: {
          Origin:     process.env.NEXT_PUBLIC_SITE_URL!,
          branchname: process.env.NEXT_PUBLIC_BRANCH_NAME!,
          branchcode: process.env.NEXT_PUBLIC_BRANCH_CODE!,
        },
        next: {
          revalidate: 3600,
          tags: ["web-settings"],
        },
      });

      const data = await response.json();
      return data?.message === "Web Setting Reteived Successfully"
        ? data.data
        : null;
    } catch (error) {
      return null;
    }
  }

  // Generate base metadata
  static async generateBaseMetadata(): Promise<Metadata> {
    const settings = await this.fetchWebSettings();

    return {
      title: {
        default: settings?.website_name || "My Website",
        template: `%s | ${settings?.website_name || "My Website"}`,
      },
      description: settings?.website_description || "Welcome to our website",
      keywords: settings?.website_keywords?.split(",").map((k) => k.trim()) || [
        "website",
        "business",
      ],
      
      metadataBase: new URL(this.baseUrl),

      openGraph: {
        type: "website",
        locale: "id_ID",
        url: this.baseUrl,
        siteName: settings?.website_name || "My Website",
        title: settings?.website_name || "My Website",
        description: settings?.website_description || "Welcome to our website",
        images: this.generateOGImages(settings),
      },

      twitter: {
        card: "summary_large_image",
        title: settings?.website_name || "My Website",
        description: settings?.website_description || "Welcome to our website",
        images: [settings?.logo_url || "/og-image.jpg"],
        creator: this.extractTwitterHandle(settings?.url_twitter),
      },

      icons: {
        icon: [
          { url: settings?.favicon_url || "/favicon.ico", sizes: "32x32" },
          { url: settings?.favicon_url || "/favicon.ico", sizes: "16x16" },
        ],
        shortcut: settings?.favicon_url || "/favicon.ico",
        apple: [
          {
            url: settings?.favicon_url || "/apple-touch-icon.png",
            sizes: "180x180",
          },
        ],
      },

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      verification: {
        google: process.env.GOOGLE_VERIFICATION,
      },
    };
  }

  // Generate page-specific metadata
  static async generatePageMetadata(
    title: string,
    description?: string,
    image?: string,
    canonical?: string
  ): Promise<Metadata> {
    const settings = await this.fetchWebSettings();
    const baseMetadata = await this.generateBaseMetadata();

    return {
      ...baseMetadata,
      title,
      description:
        description ||
        settings?.website_description ||
        "Welcome to our website",

      openGraph: {
        ...baseMetadata.openGraph,
        title,
        description: description || settings?.website_description,
        url: canonical ? `${this.baseUrl}${canonical}` : this.baseUrl,
        images: image
          ? [{ url: image, width: 1200, height: 630, alt: title }]
          : baseMetadata.openGraph?.images,
      },

      twitter: {
        ...baseMetadata.twitter,
        title,
        description: description || settings?.website_description,
        images: image ? [image] : baseMetadata.twitter?.images,
      },

      alternates: {
        canonical: canonical || "/",
      },
    };
  }

  // Helper methods
  private static generateOGImages(settings: WebSettings | null) {
    const images = [];

    if (settings?.logo_url) {
      images.push({
        url: settings.logo_url,
        width: 1200,
        height: 630,
        alt: settings.website_name || "Logo",
      });
    }

    // Fallback image
    images.push({
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: settings?.website_name || "My Website",
    });

    return images;
  }

  private static extractTwitterHandle(twitterUrl?: string): string | undefined {
    if (!twitterUrl) return undefined;
    const handle = twitterUrl.split("/").pop();
    return handle ? `@${handle}` : undefined;
  }
}

export function useMetadata() {
  const updateDocumentMetadata = (title: string, description?: string) => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription && description)
      ogDescription.setAttribute("content", description);
  };

  return { updateDocumentMetadata };
}
