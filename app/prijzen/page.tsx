import type { Metadata } from "next";
import PriceGuide from "@/components/PriceGuide";
import Pricing from "@/components/Pricing";
import { SIGNUP_URL } from "@/lib/app-links";
import { getPricing } from "@/lib/pricing";
import "./prijzen.css";

// Prijzen: eerst een paar vragen die naar de passende prijslijst wijzen en de prijslijsten zelf (lib/price-lists.ts),
// daarna zelf samenstellen in de prijscalculator met de pakketten en toevoegingen uit Helios. Lukt het ophalen uit
// Helios niet, dan staat daar "neem contact op".

export const metadata: Metadata = {
  title: "Prijzen – Helios",
  description: "De prijzen van Helios: beantwoord een paar vragen en zie welke prijslijst bij je past, bekijk alle prijslijsten of stel zelf een pakket samen.",
};

export default async function PricingPage() {
  const data = await getPricing();

  return (
    <main className="prc">
      <PriceGuide />

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
