import { MetadataService } from "@/lib/metadata";

export async function DynamicFavicon() {
  const settings = await MetadataService.fetchWebSettings();

  const faviconUrl =
    settings?.favicon_url ||
    "https://res.cloudinary.com/dikf91ikq/image/upload/v1758165242/logo_ji9nzn.png";

  return (
    <>
      <link rel="icon" href={faviconUrl} sizes="any" />
      <link rel="icon" href={faviconUrl} type="image/svg+xml" />
      <link rel="apple-touch-icon" href={faviconUrl} />
      <link rel="shortcut icon" href={faviconUrl} />
    </>
  );
}