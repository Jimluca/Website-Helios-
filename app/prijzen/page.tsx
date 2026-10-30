import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import { SIGNUP_URL } from "@/lib/app-links";
import { getPricing } from "@/lib/pricing";
import "./prijzen.css";

// Prijzen: de prijscalculator met de pakketten en toevoegingen die Helios nu aanbiedt (uit Helios zelf). Lukt het
// ophalen niet, dan staat er "neem contact op".

export const metadata: Metadata = {
  title: "Prijzen – Helios",
  description: "Stel je Helios-pakket samen: kies een basispakket, voeg toevoegingen toe en zie direct wat het kost. Vraag een offerte aan of bestel direct.",
};

export default async function PricingPage() {
  const data = await getPricing();

  return (
    <main className="prc">
      {data && data.packages.length > 0 ? (
        <Pricing data={data} />
      ) : (
        <>
          <header className="prc-head">
            <h1 className="prc-title">
              Kies het pakket dat <span>bij jullie past</span>
            </h1>
          </header>
          <p className="prc-empty">
            De pakketten staan hier binnenkort. Wil je nu al aan de slag?{" "}
            <a href="mailto:info@helioscarreer.nl">Neem contact op</a>.
          </p>
        </>
      )}

      <p className="prc-personal">
        Ben je cliënt of leerling en wil je zelf testen doen? <a href={SIGNUP_URL}>Maak een gratis account</a>.
      </p>
    </main>
  );
}
