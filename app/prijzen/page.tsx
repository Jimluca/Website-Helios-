import type { Metadata } from "next";
import PriceConfigurator from "@/components/PriceConfigurator";
import { SIGNUP_URL } from "@/lib/app-links";
import { getPricing } from "@/lib/pricing";
import "./prijzen.css";

// Prijzen: een configurator. Vier vragen stellen een pakket uit Helios samen, daarna kies je eventueel een ander pakket
// en voeg je toe wat je nog nodig hebt (PriceConfigurator). Alle pakketten en prijzen komen uit Helios; lukt het
// ophalen niet, dan staat er "neem contact op".

export const metadata: Metadata = {
  title: "Prijzen – Helios",
  description: "Stel je Helios-pakket samen: beantwoord vier vragen, krijg een pakket met prijs en voeg toe wat je nog nodig hebt.",
};

export default async function PricingPage() {
  const data = await getPricing();

  return (
    <main className="prc">
      {data && data.packages.length > 0 ? (
        <PriceConfigurator data={data} />
      ) : (
        <header className="prc-head">
          <h1 className="prc-title">
            Stel jouw <span>Helios-pakket</span> samen
          </h1>
          <p className="prc-empty">
            De pakketten staan hier binnenkort. Wil je nu al een pakket op maat? <a href="mailto:info@helioscarreer.nl">Neem contact op</a>.
          </p>
        </header>
      )}

      <p className="prc-personal">
        Ben je cliënt of leerling en wil je zelf testen doen? <a href={SIGNUP_URL}>Maak een gratis account</a>.
      </p>
    </main>
  );
}
