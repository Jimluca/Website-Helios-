import type { Metadata } from "next";
import Pricing from "@/components/Pricing";

// Prijzen: de pakketten met staffels per aantal cliënten of leerlingen, een eigen pakket, Alleen Skills en wat je
// erbij koopt. Kies je een pakket, dan opent rechts "Jouw pakket" met het totaal. De prijzen staan in lib/pricing.ts.

const TITLE = "Prijzen – Helios";
const DESCRIPTION =
  "Bekijk de pakketten en prijzen van Helios voor loopbaan, re-integratie en onderwijs. Kies je aantal cliënten of leerlingen en zie meteen wat het kost.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

export default function PricingPage() {
  return <Pricing />;
}
