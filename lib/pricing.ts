import { cacheLife } from "next/cache";
import { APP_URL } from "@/lib/app-links";
import type { Pricing } from "@/lib/pricing-shared";

// De pakketten en toevoegingen die Helios nu aanbiedt (Admin › Pakketten in Helios). De website haalt ze op en
// ververst ze om de paar minuten: een nieuwe prijs of een nieuw pakket in Helios staat dus vanzelf op de website.

/** Null als Helios niet bereikbaar is; de pagina toont dan "neem contact op". */
export async function getPricing(): Promise<Pricing | null> {
  "use cache";
  cacheLife("minutes");

  const url = `${APP_URL}/api/pakketten`;
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      console.warn(`Prijzen: Helios gaf ${response.status} op ${url}`);
      return null;
    }

    return (await response.json()) as Pricing;
  } catch (error) {
    console.warn(`Prijzen: Helios niet bereikbaar op ${url}`, error);
    return null;
  }
}
