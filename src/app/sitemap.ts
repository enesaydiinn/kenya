import type { MetadataRoute } from "next";
import { allContent } from "@/lib/store";
import { origin } from "@/lib/seo";
import { href, typePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = await allContent();
  const main = [
    "",
    "hakkimizda",
    "hizmetler",
    "sektorler",
    "kenya-rehberi",
    "blog",
    "ihracata-hazirlik",
    "kenya-ticaret-rehberi",
    "kenyadan-turkiyeye-ticaret",
    "sikca-sorulan-sorular",
  ];
  return (["tr", "en"] as Locale[]).flatMap((locale) =>
    [
      ...main.map((p) => ({ path: p, date: undefined })),
      ...all
        .filter((c) => c.locale === locale && c.status === "published")
        .map((c) => ({
          path: `${typePath[c.type]}/${c.slug}`,
          date: c.updatedAt,
        })),
    ].map(({ path, date }) => ({
      url: origin() + href(locale, path),
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: !path ? 1 : 0.7,
      alternates: {
        languages: {
          tr: origin() + href("tr", path),
          en: origin() + href("en", path),
        },
      },
    })),
  );
}
