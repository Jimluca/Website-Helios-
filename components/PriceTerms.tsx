import { euros, priceTotal, type Package, type Pricing } from "@/lib/pricing-shared";
import { contactUrl } from "@/lib/app-links";

// Onder de calculator op de pagina Prijzen: wat altijd inbegrepen is, de afspraken van de prijslijst, de oude namen
// van de testen voor wie van Icares overstapt, en de staffel van de studiekeuzetest op de website van de school. De
// bedragen komen uit Helios (de pakketten en toevoegingen); de afspraken zijn de tekst van de prijslijst 2026.

/** De oude namen van de testen (Icares) en hoe ze in Helios heten. */
const RENAMED: [string, string][] = [
  ["CUBE8", "RIASEC"],
  ["Loopbaanwaarden", "Loopbaankompas"],
  ["TaCo's", "Competentiescan"],
  ["OASE-Z", "Persoonlijkheidstest (Big Five)"],
  ["Beroepsaspecten", "Werkvaardigheden (kort)"],
  ["CAPAZ-Werk en CAPAZ-Studie", "Werkhouding (werk) en Werkhouding (leren)"],
  ["Functionele Beperkingen Lijst + Filter", "Functionele mogelijkheden"],
  ["Skills Match", "Skills"],
];

/** De grootste kolom (aantal cliënten per jaar) van een doelgroep. */
const maxClients = (data: Pricing, audience: string) =>
  Math.max(0, ...data.packages.filter((item) => item.audience === audience).map((item) => item.clients ?? 0));

/** "1e opleiding", "opleiding 2 t/m 10", "opleiding 151 en verder": de treden van een staffel. */
function tierRows(item: Package) {
  const price = item.prices.find((p) => p.period === "year") ?? item.prices[0];
  let from = 1;
  return (price?.tiers ?? []).map((tier) => {
    const label = tier.up_to === from ? (from === 1 ? "1e opleiding" : `Opleiding ${from}`) : tier.up_to === null ? `Opleiding ${from} en verder` : `Opleiding ${from} t/m ${tier.up_to}`;
    const row = { label, amount: tier.amount, first: from === 1 };
    from = (tier.up_to ?? from) + 1;
    return row;
  });
}

export default function PriceTerms({ data }: { data: Pricing }) {
  const careerMax = maxClients(data, "career");
  const educationMax = maxClients(data, "education");
  const embed = data.addons.filter((addon) => addon.embed && addon.prices.some((price) => price.tiers?.length));
  const regular = embed.find((addon) => !/hbo|wo\b/i.test(addon.name)) ?? embed[0];
  const higher = embed.find((addon) => addon !== regular);
  const rows = regular ? tierRows(regular) : [];
  const higherPrice = higher?.prices.find((p) => p.period === "year")?.tiers?.[1]?.amount;
  const regularYear = regular?.prices.find((p) => p.period === "year");
  const regularPrice = regularYear?.tiers?.[1]?.amount;
  const exempt = data.vatExempt?.includes("education");

  return (
    <section className="prt" aria-labelledby="prt-title">
      <h2 className="prt-title" id="prt-title">
        Goed om te weten
      </h2>

      <div className="prt-grid">
        <article className="prt-card">
          <h3>Altijd inbegrepen</h3>
          <ul>
            <li>Rapportage en Beroepenfilter bij elk pakket.</li>
            <li>Extra taalset: beroepen in een andere taal.</li>
            <li>Onderwijs: alle studiekeuzetests gratis (Studiekeuzetest, Studieswiper en RIASEC voor studie).</li>
            <li>Helios biedt geen training aan.</li>
          </ul>
        </article>

        <article className="prt-card">
          <h3>Hoe werken de kolommen?</h3>
          <ul>
            <li>Je kiest het aantal cliënten, leerlingen of studenten per jaar. De kolom &ldquo;t/m 50&rdquo; geldt ook voor precies 50.</li>
            <li>Een cliënt is één persoon die in het abonnementsjaar minimaal één test maakt. Meer testen bij dezelfde persoon tellen als één.</li>
            <li>Kom je in de loop van het jaar boven je aantal? Dan stap je over naar de volgende kolom en betaal je het verschil voor de rest van het jaar.</li>
            <li>Een extra professional brengt geen cliënten mee: alle professionals gebruiken samen de cliënten van je kolom.</li>
            {(careerMax > 0 || educationMax > 0) && (
              <li>
                Meer dan {careerMax > 0 ? `${careerMax.toLocaleString("nl-NL")} cliënten` : ""}
                {careerMax > 0 && educationMax > 0 ? " of " : ""}
                {educationMax > 0 ? `${educationMax.toLocaleString("nl-NL")} leerlingen of studenten` : ""} per jaar?{" "}
                <a href={contactUrl("offerte", "Helios op maat")}>Neem contact op</a>.
              </li>
            )}
          </ul>
        </article>

        <article className="prt-card">
          <h3>Afspraken</h3>
          <ul>
            <li>Jaarabonnement per organisatie of school, dat elk jaar automatisch wordt verlengd tenzij je opzegt.</li>
            <li>Opzeggen kan tot {data.noticeMonths} maanden voor het einde van het abonnementsjaar.</li>
            <li>Prijzen kunnen eens per jaar, per 1 januari, worden aangepast, met maximaal 5%. Je hoort dit minimaal 4 maanden van tevoren.</li>
            <li>
              Loopbaan &amp; Re-integratie: prijzen excl. {data.taxPercent}% btw. Onderwijs: {exempt ? "btw-vrij (CRKBO-registratie)" : `excl. ${data.taxPercent}% btw`}.
            </li>
            <li>
              Betalen met iDEAL, SEPA-incasso of creditcard{data.invoice.enabled ? `, of op factuur binnen ${data.invoice.days} dagen` : ""}.
            </li>
          </ul>
        </article>

        <article className="prt-card">
          <h3>Overstappen van Icares?</h3>
          <p>Het zijn dezelfde testen met een nieuwe naam:</p>
          <ul className="prt-names">
            {RENAMED.map(([old, now]) => (
              <li key={old}>
                <span>{old}</span>
                <span aria-hidden="true">→</span>
                <strong>{now}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {rows.length > 0 && regular && (
        <article className="prt-card prt-embed" aria-labelledby="prt-embed-title">
          <h3 id="prt-embed-title">Studiekeuzetest op de eigen website van de school</h3>
          <p>
            Aankomende leerlingen of studenten doen de studiekeuzetest op jullie eigen website en zien welke van jullie opleidingen passen. Los af te
            nemen, ook zonder pakket. Bezoekers van de websitetest tellen niet mee als leerling of student van je pakket.
          </p>
          <table className="prt-table">
            <thead>
              <tr>
                <th scope="col">Gekoppelde opleidingen</th>
                <th scope="col">Prijs per jaar</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.first ? `${euros(row.amount)} (startprijs)` : `+ ${euros(row.amount)} per opleiding`}</td>
                </tr>
              ))}
              {higherPrice !== undefined && regularPrice !== undefined && higherPrice > regularPrice && (
                <tr>
                  <th scope="row">Hbo of wo</th>
                  <td>+ {euros(higherPrice - regularPrice)} per jaar zodra je 2 of meer opleidingen koppelt</td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="prt-note">
            Voorbeeld: 40 mbo-opleidingen kosten {euros(regularYear ? priceTotal(regularYear, 40) : 0)} per jaar{exempt ? ", btw-vrij" : ""}. Meer dan 300 opleidingen?{" "}
            <a href={contactUrl("offerte", "Studiekeuzetest op de website")}>Neem contact op</a>.
          </p>
        </article>
      )}
    </section>
  );
}

