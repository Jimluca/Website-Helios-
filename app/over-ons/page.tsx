import type { Metadata } from "next";
import AboutArt from "@/components/over-ons/AboutArt";
import { Accent, CtaBand, Eyebrow, IconBadge, PrimaryButton, SecondaryButton } from "@/components/site/PageBits";
import { CONTACT_URL, DEMO_URL } from "@/lib/app-links";

const TITLE = "Over Helios – Helios";
const DESCRIPTION =
  "Helios ontwikkelt slimme loopbaaninstrumenten die mensen helpen hun talenten te ontdekken, realistische keuzes te maken en stappen te zetten richting werk en duurzame inzetbaarheid.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const HERO_POINTS = [
  { icon: "chart", label: ["Wetenschappelijk", "onderbouwd"] },
  { icon: "users", label: ["Voor alle", "doelgroepen"] },
  { icon: "sprout", label: ["Focus op duurzame", "inzetbaarheid"] },
];

const DIFFERENT = [
  { icon: "shield", title: "Betrouwbare tests", text: "Ontwikkeld met experts en wetenschappelijk onderbouwd." },
  { icon: "chart", title: "Actuele arbeidsmarktdata", text: "Inzicht in kansen, sectoren, beroepen en ontwikkelingen." },
  { icon: "zap", title: "Direct toepasbaar", text: "Van inzicht naar concrete vervolgstappen." },
  { icon: "users", title: "Gebruikt door professionals", text: "Inzetbaar in onderwijs, re-integratie, HR en coaching." },
];

const VALUES = [
  { icon: "users", title: "Mensgericht", text: "We zetten de mens centraal en geloven in ieders potentieel." },
  { icon: "chart", title: "Betrouwbaar", text: "We werken met valide metingen en actuele data." },
  { icon: "sprout", title: "Toekomstgericht", text: "We dragen bij aan duurzame inzetbaarheid en levenslang ontwikkelen." },
  { icon: "gem", title: "Praktisch", text: "We maken complexe informatie eenvoudig en toepasbaar." },
];

const JOURNEY = [
  { year: "2022", title: "De eerste ideeën", text: "Vanuit de praktijk ontstond het idee voor een geïntegreerd loopbaanplatform." },
  { year: "2023", title: "Ontwikkeling en validatie", text: "Samen met experts werkten we aan de eerste instrumenten en koppelingen met arbeidsmarktdata." },
  { year: "2024", title: "Lancering Helios", text: "De eerste versie van het platform ging live en werd ingezet door loopbaanprofessionals." },
  { year: "2025", title: "Doorontwikkeling", text: "Nieuwe instrumenten, meer data en verdere optimalisatie op basis van gebruikerservaringen." },
];

export default function OverOnsPage() {
  return (
    <main className="pg">
      {/* Hero */}
      <section className="pg-hero about-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Over Helios</Eyebrow>
            <h1 className="pg-h1">
              Wij geloven in een arbeidsmarkt waarin <Accent>iedereen tot zijn recht komt.</Accent>
            </h1>
            <p className="pg-lead">
              Helios ontwikkelt slimme loopbaaninstrumenten die mensen helpen om hun talenten te ontdekken, realistische keuzes te maken en concrete stappen te
              zetten richting werk, ontwikkeling en duurzame inzetbaarheid.
            </p>
            <div className="pg-actions">
              <PrimaryButton href="#missie">Onze missie en visie</PrimaryButton>
              <SecondaryButton href={CONTACT_URL}>Neem contact op</SecondaryButton>
            </div>
            <ul className="pg-points">
              {HERO_POINTS.map((p) => (
                <li key={p.icon}>
                  <IconBadge name={p.icon} />
                  <span>
                    {p.label[0]}
                    <br />
                    {p.label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <AboutArt />
        </div>
      </section>

      {/* Missie en visie */}
      <section className="pg-section" id="missie">
        <div className="pg-wrap">
          <div className="mv-panel glass-card">
            <div className="mv-col">
              <IconBadge name="target" size="lg" />
              <div>
                <Eyebrow>Onze missie</Eyebrow>
                <h2 className="mv-title">Mensen helpen om hun talenten te ontdekken en duurzame loopbaankeuzes te maken.</h2>
                <p className="pg-text">
                  Met betrouwbare tests, actuele arbeidsmarktinformatie en praktische begeleiding maken we inzichtelijk waar kansen liggen en hoe je daar kunt
                  komen.
                </p>
              </div>
            </div>
            <div className="mv-divider" aria-hidden="true" />
            <div className="mv-col">
              <IconBadge name="eye" size="lg" />
              <div>
                <Eyebrow>Onze visie</Eyebrow>
                <h2 className="mv-title">Een arbeidsmarkt waarin iedereen werk vindt dat echt bij hem past.</h2>
                <p className="pg-text">
                  Wij geloven in een maatschappij waarin talent centraal staat, waarin werkgeluk en ontwikkeling hand in hand gaan en waarin iedereen de kans
                  krijgt om mee te doen.
                </p>
              </div>
            </div>
          </div>

          <div className="pg-split diff">
            <div>
              <Eyebrow>Wat ons anders maakt</Eyebrow>
              <h2 className="pg-h2">
                Praktisch, actueel en
                <br /> <Accent>ontwikkeld met experts.</Accent>
              </h2>
              <p className="pg-text is-lg">
                Helios is ontstaan vanuit de overtuiging dat loopbaanbegeleiding toegankelijk, betrouwbaar en direct toepasbaar moet zijn. Daarom combineren we
                wetenschappelijk onderbouwde testen met actuele arbeidsmarktdata en een gebruiksvriendelijk platform.
              </p>
            </div>
            <div className="diff-grid">
              {DIFFERENT.map((d) => (
                <div key={d.title} className="diff-card glass-card">
                  <IconBadge name={d.icon} size="lg" />
                  <div>
                    <h3 className="pg-card-title">{d.title}</h3>
                    <p className="pg-card-text">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kernwaarden en reis */}
      <section className="pg-section">
        <div className="pg-wrap">
          <Eyebrow>Onze kernwaarden</Eyebrow>
          <h2 className="pg-h2">
            Dit is waar we voor <Accent>staan</Accent>.
          </h2>
          <div className="values">
            {VALUES.map((v) => (
              <div key={v.title} className="value">
                <IconBadge name={v.icon} size="lg" />
                <h3 className="pg-card-title">{v.title}</h3>
                <p className="pg-card-text">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="pg-split journey">
            <div>
              <Eyebrow>Onze reis</Eyebrow>
              <h2 className="pg-h2 journey-title">Van idee naar een compleet platform.</h2>
              <p className="pg-text is-lg">
                Helios is ontstaan uit jarenlange ervaring in loopbaanbegeleiding, onderwijs en de arbeidsmarkt. We zagen de behoefte aan een moderne,
                geïntegreerde aanpak waarin testen, actuele informatie en praktische begeleiding samenkomen. Vanuit die overtuiging bouwen we iedere dag verder
                aan Helios.
              </p>
              <div className="pg-actions">
                <PrimaryButton href="/#hoe-het-werkt">Meer over onze aanpak</PrimaryButton>
              </div>
            </div>
            <ol className="timeline">
              {JOURNEY.map((j) => (
                <li key={j.year} className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <span className="timeline-year">{j.year}</span>
                  <div>
                    <h3 className="timeline-title">{j.title}</h3>
                    <p className="pg-card-text">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        boxed
        eyebrow="Samen naar meer mogelijkheden"
        title={
          <>
            Benieuwd wat Helios
            <br /> voor jouw organisatie kan betekenen?
          </>
        }
        text={
          <>
            Plan een vrijblijvende demo en ontdek hoe jij bijdraagt aan
            <br /> betere loopbaankeuzes en duurzame inzetbaarheid.
          </>
        }
        primary={{ label: "Plan een demo", href: DEMO_URL }}
        secondary={{ label: "Neem contact op", href: CONTACT_URL }}
      />
    </main>
  );
}
