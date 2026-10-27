import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import { SIGNUP_URL } from "@/lib/app-links";
import { getPricing } from "@/lib/pricing";
import "./prijzen.css";

// Prijzen: de pakketten die Helios nu aanbiedt (uit Helios zelf), met een knop naar de bestelpagina. Lukt het ophalen
// niet, dan staat er "neem contact op".

export const metadata: Metadata = {
  title: "Prijzen – Helios",
  description: "De pakketten van Helios voor scholen, loopbaanprofessionals en re-integratie. Direct bestellen en meteen aan de slag.",
};

export default async function PricingPage() {
  const data = await getPricing();

  return (
    <main className="prc">
      <header className="prc-head">
        <h1 className="prc-title">
          Kies het pakket dat <span>bij jullie past</span>
        </h1>
        <p className="prc-intro">
          Voor scholen, loopbaanprofessionals en re-integratie. Bestel direct, betaal met iDEAL of op factuur, en ga
          meteen aan de slag.
        </p>
      </header>

      {data && data.packages.length > 0 ? (
        <Pricing data={data} />
      ) : (
        <p className="prc-empty">
          De pakketten staan hier binnenkort. Wil je nu al aan de slag?{" "}
          <a href="mailto:info@helioscarreer.nl">Neem contact op</a>.
        </p>
      )}

      <p className="prc-personal">
        Ben je cliënt of leerling en wil je zelf testen doen? <a href={SIGNUP_URL}>Maak een gratis account</a>.
      </p>
    </main>
  );
}
