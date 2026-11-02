import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/app-links";

// Openbare pagina's voor zoekmachines (/sitemap.xml).
const PAGES = ["/", "/voor-scholen", "/voor-professionals", "/over-ons", "/prijzen"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}
