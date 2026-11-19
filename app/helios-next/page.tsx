import type { Metadata } from "next";
import NextVisual, { EducationArt } from "@/components/next/NextArt";
import Icon from "@/components/site/Icon";
import { Accent, CheckList, CtaBand, Eyebrow, IconBadge, SecondaryButton, TestButton } from "@/components/site/PageBits";
import { StudiekeuzetestEmbed } from "@/components/StudiekeuzetestButton";

const TITLE = "Helios Next: de gratis studiekeuzetest – Helios";
const DESCRIPTION =
  "Welke opleiding past bij jou? Doe gratis de studiekeuzetest van Helios, zonder account. Je ziet meteen welke opleidingen passen, van mbo tot universiteit, in Nederland en België.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

// Helios Next: de gratis studiekeuze, vanuit de studiekiezer (leerling of student). De test op deze pagina is de echte
// Studiekeuzetest van Helios (StudiekeuzetestEmbed, de sleutel van de organisatie Helios); wat hier staat, klopt met de
// instellingen van die test (55 uitspraken, uitslag direct en zonder account, alle niveaus in Nederland en België,
// filters, favorieten, later verder). Zelfde bouwstenen als Helios Coach en Connect (PageBits, "cn-" in app/pages.css).

const HERO_CHECKS = [
  ["Gratis en", "zonder account"],
  ["Mbo, hbo en wo,", "in NL en België"],
  ["Ook op", "je telefoon"],
];

const STEPS = [
  {
    icon: "clipboard",
    title: "Beantwoord 55 uitspraken",
    text: "Over wat je leuk vindt en waar je goed in bent. Onder elke uitspraak staat een korte uitleg. Er zijn geen goede of foute antwoorden.",
  },
  {
    icon: "target",
    title: "Zie wat bij je past",
    text: "Je uitslag laat meteen zien welke opleidingen bij je passen, met een matchpercentage en uitleg waarom.",
  },
  {
    icon: "search",
    title: "Ontdek de opleiding",
    text: "Bekijk scholen, plaatsen, startmomenten en toelating, en de beroepen waar je later mee aan de slag kunt.",
  },
];

const RESULT_POINTS = [
  "Een matchpercentage, en uitleg waarom een opleiding bij je past",
  "Kies welk niveau je wilt zien: mbo, hbo of wo",
  "Filter op afstand vanaf je woonplaats, leervorm en taal",
  "Per opleiding: scholen, plaatsen, startmomenten en toelating",
  "De beroepen die bij een opleiding horen, met salaris",
  "Bewaar je favorieten met een hartje",
];

const WHY = [
  { icon: "star", title: "Gratis", text: "Je betaalt niets en je hoeft geen account te maken of je naam in te vullen." },
  { icon: "cap", title: "Alle opleidingen", text: "Van mbo 1 tot een master aan de universiteit, in Nederland en België." },
  { icon: "user-cycle", title: "Later verder", text: "Stop je halverwege? Je antwoorden blijven in je browser bewaard, dus je gaat later verder waar je was." },
  { icon: "info", title: "Begrijpelijk", text: "Onder elke uitspraak staat een korte uitleg, zodat je weet wat er bedoeld wordt." },
  { icon: "laptop", title: "Op elk scherm", text: "Op je telefoon, tablet of laptop. De test past zich aan." },
  { icon: "heart", title: "Eerlijk", text: "Er zijn geen goede of foute antwoorden. Kies wat echt bij je past, niet wat je zou willen." },
];

const OTHERS = [
  {
    icon: "users",
    title: "Voor ouders",
    text: "Doe de test samen met je kind, of bespreek de uitslag thuis. De uitleg bij elke opleiding helpt om erover te praten.",
  },
  {
    icon: "school",
    title: "Voor scholen en decanen",
    text: "Met Helios Coach zet je de Studiekeuzetest, de Studieswiper en RIASEC voor studie klaar voor je leerlingen, en bespreek je de uitslag samen.",
    href: "/helios-coach",
    link: "Bekijk Helios Coach",
  },
  {
    icon: "link",
    title: "Voor mbo, hbo en wo",
    text: "Zet de studiekeuzetest op jullie eigen website, met jullie opleidingen en in jullie huisstijl.",
    href: "/helios-connect",
    link: "Bekijk Helios Connect",
  },
];

const FAQ = [
  {
    q: "Is de studiekeuzetest echt gratis?",
    a: "Ja. Je doet de test hier op de website. Je hoeft geen account te maken en geen naam of e-mailadres in te vullen.",
  },
  {
    q: "Kan ik later verdergaan?",
    a: "Ja. Je antwoorden worden in je browser bewaard. Open je de test later op hetzelfde apparaat, dan ga je verder waar je was.",
  },
  {
    q: "Welke opleidingen zie ik in mijn uitslag?",
    a: "Opleidingen van mbo tot universiteit, in Nederland en België. Je kiest zelf welk niveau je wilt zien en hoe ver je wilt reizen.",
  },
  {
    q: "Wat gebeurt er met mijn antwoorden?",
    a: "We gebruiken ze om je uitslag te berekenen. Omdat je geen naam of e-mailadres invult, zijn ze niet aan jou als persoon gekoppeld.",
  },
  {
    q: "Kan ik ook andere testen doen?",
    a: "Ja, via je school of je loopbaanbegeleider. Die kan je uitnodigen voor meer testen in Helios, zoals de Studieswiper of de Beroepentest.",
  },
];

export default function HeliosNextPage() {
  return (
    <main className="pg">
      {/* Hero: de vraag van de studiekiezer, rechts de uitslag */}
      <section className="pg-hero cn-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Helios Next · Gratis studiekeuze</Eyebrow>
            <h1 className="pg-h1">
              Welke opleiding
              <br /> <Accent>past bij jou?</Accent>
            </h1>
            <p className="pg-lead">
              Doe gratis de studiekeuzetest van Helios. Je beantwoordt 55 korte uitspraken over wat je leuk vindt en waar je goed in bent. Daarna zie je
              meteen welke opleidingen bij je passen, van mbo tot universiteit, in Nederland en België.
            </p>
            <div className="pg-actions">
              <TestButton>Doe de gratis test</TestButton>
              <SecondaryButton href="#zo-werkt-het">Zo werkt het</SecondaryButton>
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
          <NextVisual />
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="pg-section" id="zo-werkt-het">
        <div className="pg-wrap">
          <Eyebrow center>Zo werkt het</Eyebrow>
          <h2 className="pg-h2 is-center">
            In drie stappen <Accent>naar je uitslag.</Accent>
          </h2>
          <p className="pg-lead is-center">Je begint meteen. Geen account, geen inlog.</p>
          <ol className="cn-steps">
            {STEPS.map((st, i) => (
              <li key={st.title} className="cn-step glass-card">
                <span className="cn-step-icon">
                  <IconBadge name={st.icon} size="lg" />
                  <span className="phase-num">{i + 1}</span>
                </span>
                <h3 className="phase-title">{st.title}</h3>
                <p className="pg-card-text">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Je uitslag */}
      <section className="pg-section" id="uitslag">
        <div className="pg-wrap pg-split cn-split">
          <div>
            <Eyebrow>Je uitslag</Eyebrow>
            <h2 className="pg-h2">
              Opleidingen die echt <Accent>bij je passen.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Je ziet niet zomaar een lijst, maar opleidingen die passen bij wat jij leuk vindt en goed kunt. Zo weet je beter waar je op een open dag naartoe
              wilt.
            </p>
            <CheckList items={RESULT_POINTS} />
            <div className="pg-actions">
              <TestButton>Doe de gratis test</TestButton>
            </div>
          </div>
          <EducationArt />
        </div>
      </section>

      {/* Waarom Helios Next */}
      <section className="pg-section" id="waarom">
        <div className="pg-wrap">
          <Eyebrow center>Waarom Helios Next</Eyebrow>
          <h2 className="pg-h2 is-center">
            Kiezen met <Accent>meer zekerheid.</Accent>
          </h2>
          <p className="pg-lead is-center">Een studie kiezen is een grote stap. De studiekeuzetest helpt je op weg, zonder gedoe.</p>
          <div className="cn-cards-3">
            {WHY.map((m) => (
              <article key={m.title} className="cn-insight glass-card">
                <IconBadge name={m.icon} size="lg" />
                <h3 className="pg-card-title">{m.title}</h3>
                <p className="pg-card-text">{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ook voor ouders, scholen en opleiders */}
      <section className="pg-section" id="ook-voor">
        <div className="pg-wrap">
          <Eyebrow center>Samen kiezen</Eyebrow>
          <h2 className="pg-h2 is-center">
            Ook voor ouders, <Accent>scholen en opleiders.</Accent>
          </h2>
          <div className="cn-cards-3">
            {OTHERS.map((m) => (
              <article key={m.title} className="cn-insight glass-card">
                <IconBadge name={m.icon} size="lg" />
                <h3 className="pg-card-title">{m.title}</h3>
                <p className="pg-card-text">{m.text}</p>
                {m.href && (
                  <a className="pg-more" href={m.href}>
                    {m.link} <Icon name="arrow" size={17} stroke={2.4} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Veelgestelde vragen */}
      <section className="pg-section" id="vragen">
        <div className="pg-wrap">
          <Eyebrow center>Veelgestelde vragen</Eyebrow>
          <h2 className="pg-h2 is-center">
            Goed om te <Accent>weten.</Accent>
          </h2>
          <div className="cn-faq">
            {FAQ.map((f) => (
              <details key={f.q} className="cn-faq-item glass-card">
                <summary>
                  {f.q}
                  <Icon name="chevron-down" size={20} stroke={2.2} className="cn-faq-chevron" />
                </summary>
                <p className="pg-card-text">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Klaar om te ontdekken wat bij je past?"
        title={
          <>
            Doe de gratis
            <br /> <Accent>studiekeuzetest.</Accent>
          </>
        }
        text={
          <>
            Beantwoord 55 korte uitspraken en zie meteen welke opleidingen bij je passen.
            <br /> Gratis, zonder account en ook op je telefoon.
          </>
        }
        primary={{ label: "Doe de gratis test", href: "#", test: true }}
        secondary={{ label: "Zo werkt het", href: "#zo-werkt-het" }}
        features={[
          { icon: "star", label: "Gratis" },
          { icon: "user", label: "Zonder account" },
          { icon: "laptop", label: "Op elk scherm" },
        ]}
      />

      <StudiekeuzetestEmbed />
    </main>
  );
}
