import type { MetadataRoute } from "next";
import { origin } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.INDEXING_ENABLED === "true"
        ? { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }
        : { userAgent: "*", disallow: "/" },
    sitemap: origin() + "/sitemap.xml",
  };
}
