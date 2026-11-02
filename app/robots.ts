import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/app-links";

// /robots.txt: alles mag geïndexeerd worden, behalve de lokale testpagina.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studie-api-test" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
