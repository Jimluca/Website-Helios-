import type { Metadata } from "next";
import ImplCurve from "@/components/scholen/ImplCurve";
import SamenHero from "@/components/scholen/SamenHero";
import Icon from "@/components/site/Icon";
import { Accent, CheckList, CtaBand, Eyebrow, IconBadge, PrimaryButton, SecondaryButton } from "@/components/site/PageBits";
import { CONTACT_URL, DEMO_URL, moreInfoUrl } from "@/lib/app-links";

const TITLE = "Voor scholen – Helios";
const DESCRIPTION =
  "Helios combineert betrouwbare testen, inspirerende content en praktische begeleiding voor studiekeuze, beroepskeuze en loopbaanbegeleiding, speciaal ontwikkeld voor het onderwijs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const HERO_CHECKS = [
  ["Voor vmbo,", "havo en vwo"],
  ["Direct inzetbaar", "in de les"],
  ["Betrokkenheid van", "mentor en ouders"],
];

const PRODUCTS = [
  { icon: "compass", title: "Helios Coach", sub: ["Inzicht in talenten,", "interesses en drijfveren."], items: ["Talenten- en interessetesten", "Loopbaanwaarden", "Persoonlijk advies"] },
  { icon: "cap", title: "Helios Next", sub: ["Oriëntatie op opleidingen", "en vervolgonderwijs."], items: ["Opleidingen swiper", "Zoek per school", "Filter op sector"] },
  { icon: "chart", title: "Helios Horizon", sub: ["Verken beroepen", "en arbeidsmarkt."], items: ["Beroepen explorer", "Sectoren en trends", "Koppeling met vaardigheden"] },
  { icon: "group", title: "Helios Connect", sub: ["Samenwerken tussen", "leerling, mentor en ouders."], items: ["Voortgang en rapportages", "Gespreksondersteuning", "Betrokkenheid ouders"] },
];

const TESTS = [
  { icon: "clipboard", label: ["Beroepentest"] },
  { icon: "cap", label: ["Studiekeuzetest"] },
  { icon: "heart", label: ["Loopbaanwaarden"] },
  { icon: "chart-l", label: ["Talenten &", "competenties"] },
  { icon: "file", label: ["Beroepsaspecten"] },
  { icon: "heart-hand", label: ["OASE-Z"] },
  { icon: "target", label: ["Enneagram"] },
  { icon: "star", label: ["Skillstest"] },
  { icon: "grid", label: ["Cube8"] },
];

const SUPPORT = [
  { icon: "school", title: "Klaar voor de praktijk", text: ["Direct inzetbaar in de les", "en LOB-trajecten."] },
  { icon: "group", title: "Ondersteuning voor docenten", text: ["Handleidingen, lesmateriaal", "en inspiratie."] },
  { icon: "users", title: "Inzicht voor ouders", text: ["Betrokkenheid en begrip", "voor de keuzes van hun kind."] },
];

const PHASES = [
  { icon: "compass", title: "Onderbouw", text: ["Zelfinzicht en", "brede oriëntatie"] },
  { icon: "search", title: "Middenbouw", text: ["Verkennen van", "opleidingen en sectoren"] },
  { icon: "chart-l", title: "Bovenbouw", text: ["Verdiepen en", "concrete keuzes maken"] },
  { icon: "group", title: "Maatschappij", text: ["Voorbereiden op", "vervolgonderwijs of werk"] },
  { icon: "rocket", title: "Toekomst", text: ["Een sterke start", "in hun loopbaan"] },
];

function Lines({ lines }: { lines: string[] }) {
  return lines.map((l, i) => (
    <span key={l}>
      {i > 0 && <br />}
      {l}
    </span>
  ));
}

export default function VoorScholenPage() {
  return (
    <main className="pg">
      {/* Hero: tekst links, de animatie rechts */}
      <section className="pg-hero scholen-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Voor scholen</Eyebrow>
            <h1 className="pg-h1">
              Samen werken aan
              <br /> <Accent>de toekomst van elke leerling.</Accent>
            </h1>
            <p className="pg-lead">
              Helios helpt scholen met betrouwbare testen, inspirerende content en praktische begeleiding bij studiekeuze, beroepskeuze en
              loopbaanoriëntatie. Van onderbouw tot bovenbouw.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
              <SecondaryButton href="#aanpak">Bekijk de aanpak</SecondaryButton>
            </div>
            <ul className="pro-hero-checks">
              {HERO_CHECKS.map((c) => (
                <li key={c[0]}>
                  <span className="pg-check" aria-hidden="true">
                    <Icon name="check" size={15} stroke={3} />
                  </span>
                  <span>
                    {c[0]}
                    <br />
                    {c[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <SamenHero />
        </div>
      </section>

      {/* Een complete aanpak voor LOB */}
      <section className="pg-section" id="aanpak">
        <div className="pg-wrap">
          <Eyebrow center>Een complete aanpak voor LOB</Eyebrow>
          <h2 className="pg-h2 is-center">
            Alles voor studiekeuze, beroepskeuze
            <br /> en loopbaanbegeleiding.
          </h2>
          <p className="pg-lead is-center">
            Helios combineert betrouwbare testen, inspirerende content en praktische begeleiding in één gebruiksvriendelijk platform. Speciaal ontwikkeld voor
            het onderwijs.
          </p>
          <div className="lob-grid">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="lob-card glass-card">
                <IconBadge name={p.icon} size="lg" square />
                <h3 className="lob-title">{p.title}</h3>
                <p className="lob-sub">
                  <Lines lines={p.sub} />
                </p>
                <ul className="lob-list">
                  {p.items.map((it) => (
                    <li key={it}>
                      <span className="lob-check" aria-hidden="true">
                        <Icon name="check" size={13} stroke={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testen */}
      <section className="pg-section" id="testen">
        <div className="pg-wrap pg-split tests">
          <div>
            <Eyebrow>Betrouwbare testen en inzichten</Eyebrow>
            <h2 className="pg-h2">
              Van talent naar
              <br /> toekomstmogelijkheden.
            </h2>
            <p className="pg-text is-lg">
              Helios biedt een brede set aan wetenschappelijk onderbouwde testen en instrumenten die leerlingen helpen om zichzelf beter te leren kennen en
              passende keuzes te maken.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={moreInfoUrl("Testen voor scholen")}>Meer over de testen</PrimaryButton>
            </div>
          </div>
          <div className="test-grid">
            {TESTS.map((t) => (
              <div key={t.icon + t.label[0]} className="test-tile glass-card">
                <IconBadge name={t.icon} size="lg" />
                <span className="test-label">
                  <Lines lines={t.label} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementeren */}
      <section className="pg-section">
        <div className="pg-wrap pg-split implement">
          <div className="impl-art">
            <ImplCurve />
            {SUPPORT.map((s, i) => (
              <div key={s.title} className={`impl-row is-${i + 1}`}>
                <div className="impl-card glass-card">
                  <IconBadge name={s.icon} size="lg" square />
                  <div>
                    <h3 className="pg-card-title">{s.title}</h3>
                    <p className="pg-card-text">
                      <Lines lines={s.text} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Eyebrow>Praktisch, flexibel en schaalbaar</Eyebrow>
            <h2 className="pg-h2">
              Eenvoudig te implementeren
              <br /> op jouw school.
            </h2>
            <p className="pg-text is-lg">
              Helios is ontwikkeld voor de praktijk. Of je nu werkt met vmbo, havo of vwo: het platform sluit aan bij jullie onderwijsvisie en is eenvoudig te
              implementeren.
            </p>
            <CheckList
              items={["Geschikt voor alle onderwijsniveaus", "In te richten per leerjaar", "Koppeling met bestaande systemen mogelijk", "Ondersteuning bij implementatie en training"]}
            />
            <div className="pg-actions">
              <PrimaryButton href={DEMO_URL}>Plan een demo</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stap voor stap */}
      <section className="pg-section">
        <div className="pg-wrap">
          <Eyebrow center>Voor elke fase in de loopbaanoriëntatie</Eyebrow>
          <h2 className="pg-h2 is-center">
            Begeleidt leerlingen <Accent>stap voor stap.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Van eerste oriëntatie in onderbouw tot een concrete studiekeuze in bovenbouw.
            <br /> Helios biedt passende tools en begeleiding voor elke fase.
          </p>
          <div className="phases">
            <svg className="phases-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
              <path d="M40 22 C 160 10, 220 50, 300 56 S 520 66, 700 52 S 880 12, 960 22" />
            </svg>
            <ol className="phases-list">
              {PHASES.map((p, i) => (
                <li key={p.title} className="phase">
                  <IconBadge name={p.icon} size="lg" />
                  <span className="phase-stem" aria-hidden="true" />
                  <span className="phase-num">{i + 1}</span>
                  <h3 className="phase-title">{p.title}</h3>
                  <p className="pg-card-text">
                    <Lines lines={p.text} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Klaar om meer richting te geven?"
        title={
          <>
            Ontdek wat Helios kan betekenen
            <br /> voor <Accent>jouw school.</Accent>
          </>
        }
        text={
          <>
            Plan een vrijblijvende demo en ontdek hoe Helios jullie kan ondersteunen
            <br /> bij studiekeuze, beroepskeuze en loopbaanbegeleiding.
          </>
        }
        primary={{ label: "Plan een vrijblijvende demo", href: DEMO_URL }}
        secondary={{ label: "Neem contact op", href: CONTACT_URL }}
      />
    </main>
  );
}
