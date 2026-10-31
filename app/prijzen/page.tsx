import type { Metadata } from "next";
import PriceGuide from "@/components/PriceGuide";
import Pricing from "@/components/Pricing";
import { SIGNUP_URL } from "@/lib/app-links";
import { getPricing } from "@/lib/pricing";
import "./prijzen.css";

// Prijzen: eerst vier vragen die naar de passende pakketten uit Helios wijzen (PriceGuide), daarna zelf samenstellen in
// de prijscalculator. Alle pakketten en prijzen komen uit Helios; lukt het ophalen niet, dan staat er "neem contact op".

export const metadata: Metadata = {
  title: "Prijzen – Helios",
  description: "De prijzen van Helios: beantwoord vier vragen en zie welke pakketten bij je passen, of stel zelf een pakket samen.",
};

export default async function PricingPage() {
  const data = await getPricing();

  return (
    <main className="prc">
      <PriceGuide data={data} />

      <section className="prc-build" id="zelf-samenstellen" aria-label="Zelf een pakket samenstellen">
        {data && data.packages.length > 0 ? (
          <Pricing data={data} />
        ) : (
          <p className="prc-empty">
            Zelf een pakket samenstellen kan hier binnenkort. Wil je nu al een pakket op maat? <a href="mailto:info@helioscarreer.nl">Neem contact op</a>.
          </p>
        )}
      </section>

      <p className="prc-personal">
        Ben je cliënt of leerling en wil je zelf testen doen? <a href={SIGNUP_URL}>Maak een gratis account</a>.
      </p>
    </main>
  );
}
