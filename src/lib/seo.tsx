import type { Metadata } from "next";
import type { Content, Locale } from "./types";
import { href, typePath } from "./i18n";
export const origin = () =>
  process.env.NEXT_PUBLIC_SITE_URL || "https://kenyadanismanlik.com";
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  noindex = false,
): Metadata {
  const url = origin() + href(locale, path);
  return {
    title,
    description,
    metadataBase: new URL(origin()),
    verification: { google: process.env.GSC_VERIFICATION || undefined },
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": origin() + href("tr", path),
        en: origin() + href("en", path),
        "x-default": origin() + href("tr", path),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "Kenya Danışmanlık",
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "Kenya Danışmanlık — Türkiye & Kenya",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    robots: {
      index: !noindex && process.env.INDEXING_ENABLED === "true",
      follow: !noindex,
    },
  };
}
export function StructuredData({
  locale,
  path,
  content,
}: {
  locale: Locale;
  path: string;
  content?: Content;
}) {
  const base = origin();
  const url = base + href(locale, path);
  const data: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Kenya Danışmanlık",
      url: base,
      logo: base + "/icon.svg",
    },
    {
      "@type": "WebSite",
      "@id": base + "/#website",
      name: "Kenya Danışmanlık",
      url: base,
      inLanguage: ["tr", "en"],
      publisher: { "@id": base + "/#organization" },
    },
  ];
  if (path) {
    const parts = path.split("/");
    const list = [
      {
        name: locale === "tr" ? "Ana Sayfa" : "Home",
        item: base + href(locale),
      },
    ];
    if (parts.length > 1)
      list.push({
        name:
          content?.type === "service"
            ? locale === "tr"
              ? "Hizmetler"
              : "Services"
            : content?.type === "sector"
              ? locale === "tr"
                ? "Sektörler"
                : "Sectors"
              : locale === "tr"
                ? "İçerik merkezi"
                : "Content centre",
        item: base + href(locale, parts[0]),
      });
    list.push({ name: content?.title || path.replaceAll("-", " "), item: url });
    data.push({
      "@type": "BreadcrumbList",
      itemListElement: list.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...l,
      })),
    });
  }
  if (content) {
    if (content.type === "service")
      data.push({
        "@type": "Service",
        name: content.title,
        description: content.description,
        url,
        provider: { "@id": base + "/#organization" },
        areaServed: { "@type": "Country", name: "Kenya" },
      });
    else if (content.type === "guide" || content.type === "blog")
      data.push({
        "@type": "Article",
        headline: content.title,
        description: content.description,
        datePublished: content.createdAt,
        dateModified: content.updatedAt,
        inLanguage: locale,
        author: { "@type": "Organization", name: content.author },
        publisher: { "@id": base + "/#organization" },
        mainEntityOfPage: url,
        ...(content.image ? { image: base + content.image } : {}),
      });
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": data,
        }).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
