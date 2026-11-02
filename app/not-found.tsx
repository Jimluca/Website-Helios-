import type { Metadata } from "next";
import { Accent, Eyebrow, PrimaryButton, SecondaryButton } from "@/components/site/PageBits";
import { CONTACT_URL } from "@/lib/app-links";

export const metadata: Metadata = {
  title: "Pagina niet gevonden – Helios",
  robots: { index: false },
};

// Eigen 404-pagina in de stijl van de site.
export default function NotFound() {
  return (
    <main className="pg">
      <section className="pg-hero pg-404">
        <div className="pg-wrap">
          <Eyebrow center>Fout 404</Eyebrow>
          <h1 className="pg-h1 is-center">
            Deze pagina <Accent>bestaat niet.</Accent>
          </h1>
          <p className="pg-lead is-center">De pagina is verplaatst of het adres klopt niet. Ga terug naar de homepagina of neem contact met ons op.</p>
          <div className="pg-actions is-center">
            <PrimaryButton href="/">Naar de homepagina</PrimaryButton>
            <SecondaryButton href={CONTACT_URL}>Neem contact op</SecondaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
