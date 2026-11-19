import type { Metadata } from "next";
import { BrandArt, EducationsArt, LeadArt, RadiusArt } from "@/components/connect/ConnectArt";
import ConnectVisual from "@/components/connect/ConnectVisual";
import Icon from "@/components/site/Icon";
import { Accent, CheckList, CtaBand, Eyebrow, IconBadge, PrimaryButton } from "@/components/site/PageBits";
import StudiekeuzetestButton, { StudiekeuzetestEmbed } from "@/components/StudiekeuzetestButton";
import { CONNECT_DEMO_URL, CONTACT_URL } from "@/lib/app-links";

const TITLE = "Helios Connect: de studiekeuzetest op je eigen website – Helios";
const DESCRIPTION =
  "Voor wervings- en marketingteams van mbo, hbo en wo: de studiekeuzetest van Helios op jullie eigen website. Leads met toestemming, inzicht in wat de test oplevert en een koppeling met HubSpot, Salesforce of Dynamics 365.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

// Helios Connect: de Studiekeuzetest van Helios op de website van een mbo, hbo of wo, voor werving en marketing.
// Alles wat hier staat is een echte functie van de module in Helios (Studiekeuzetest API/docs/scholen.md,
// EmbedOptions in Helios). Zelfde bouwstenen als Voor scholen (PageBits, stijlen in app/pages.css, "cn-"). Geen prijs
// op deze pagina (die staat op Prijzen). De opvolgfuncties uit het bouwplan marketing komen erbij als ze gebouwd zijn.

const HERO_CHECKS = [
  ["Live met één", "stukje code"],
  ["HubSpot, Salesforce", "en Dynamics 365"],
  ["AVG geregeld, met", "verwerkersovereenkomst"],
];

const STEPS = [
  {
    icon: "settings",
    title: "Inrichten",
    text: "Kies jullie opleidingen en locaties, de huisstijl, welke gegevens je vraagt en wanneer. Je ziet meteen een voorbeeld van jullie test.",
  },
  {
    icon: "browser",
    title: "Op je site zetten",
    text: "Plak één stukje code in jullie website: op een pagina, achter een knop of als iframe. Het werkt in WordPress, Drupal, Webflow en elk ander systeem.",
  },
  {
    icon: "trend",
    title: "Leads en inzicht",
    text: "Leads komen in Helios en desgewenst rechtstreeks in jullie CRM. Het dashboard laat zien wat de test oplevert, per opleiding en per campagne.",
  },
];

const SIDES = [
  {
    icon: "user",
    who: "Voor de studiekiezer",
    title: "Een test die echt over hen gaat",
    points: [
      "Ontdekt welke van jullie opleidingen passen bij hun interesses",
      "Ziet waarom een opleiding past, en de beroepen die erbij horen",
      "Begint direct, zonder account of inlog, ook op de telefoon",
      "Kiest zelf of en waarover jullie contact opnemen",
    ],
  },
  {
    icon: "trend",
    who: "Voor jullie marketingteam",
    title: "Leads waar je op kunt doorpakken",
    points: [
      "Leads met toestemming, met de opleidingen die het best passen",
      "Rechtstreeks in HubSpot, Salesforce, Dynamics 365 of jullie eigen systeem",
      "Inzicht in welke opleidingen leven, per pagina en per campagne",
      "Alles in te richten naar jullie wervingsstrategie",
    ],
  },
];

const LEAD_CONTENT = [
  "De gegevens die jullie kiezen, per veld uit, optioneel of verplicht",
  "De opleidingen uit de uitslag die het best passen, met het matchpercentage",
  "De pagina en de campagne waar de studiekiezer vandaan kwam",
  "De toestemming: welke tekst, wanneer en of jullie contact mogen opnemen",
];

const INSIGHTS = [
  {
    icon: "chart",
    title: "Van bezoek tot lead",
    text: "Hoe vaak de test in beeld was, en hoeveel studiekiezers beginnen, afronden, gegevens achterlaten en doorklikken naar jullie open dag of proefstuderen.",
  },
  {
    icon: "clipboard",
    title: "Waar ze afhaken",
    text: "Bij welke vraag studiekiezers stoppen, en hoe lang een afgeronde test meestal duurt.",
  },
  {
    icon: "cap",
    title: "Welke opleidingen leven",
    text: "Welke opleidingen vaak passen en welke zelden. En welke gemist worden: opleidingen die vaak goed passen, maar die jullie niet aanbieden.",
  },
  {
    icon: "target",
    title: "Welke campagne werkt",
    text: "Per pagina van jullie site en per campagne, via de UTM-codes in jullie links. Vergeleken met dezelfde periode vorig jaar.",
  },
];

const INTEGRATIONS = [
  { icon: "database", title: "HubSpot", text: "Als contact, met eigen velden voor de best passende opleidingen" },
  { icon: "database", title: "Salesforce", text: "Als lead of als contact, met veldkoppeling" },
  { icon: "database", title: "Dynamics 365", text: "Als lead of als contact, met veldkoppeling" },
  { icon: "send", title: "Webhook", text: "Een ondertekend bericht naar jullie eigen systeem bij elke lead" },
  { icon: "box", title: "Leads-API", text: "Jullie server haalt de leads zelf op" },
  { icon: "chart", title: "Analytics, Tag Manager en Meta", text: "Begin, afronding, klik en lead als meetmoment" },
];

const CONFIG = [
  {
    icon: "cap",
    title: "Jullie opleidingen",
    text: "Helios kent jullie aanbod al. Zet opleidingen of plaatsen uit, voeg een eigen opleiding toe, of geef een opleiding eigen tekst en links.",
    art: <EducationsArt />,
  },
  {
    icon: "palette",
    title: "Jullie huisstijl",
    text: "Logo, kleuren, lettertype, achtergrondfoto en eigen teksten. Met een donkere versie, in het Nederlands of Engels.",
    art: <BrandArt />,
  },
  {
    icon: "pin",
    title: "Wat de uitslag laat zien",
    text: "Jullie kiezen welke en hoeveel opleidingen de uitslag laat zien: alleen die van jullie, die van jullie bovenaan, of alles. Met matchpercentage, afstand en knoppen naar open dag en proefstuderen.",
    art: <RadiusArt />,
  },
];

const MORE = [
  { icon: "grid", title: "Weergave", text: "Eén vraag per scherm, onder elkaar of als slider, in de volgorde die jullie kiezen." },
  { icon: "browser", title: "Plek op de site", text: "Op een pagina, achter jullie eigen knop of als iframe. Alleen op de websites die jullie opgeven." },
  { icon: "user-cycle", title: "Later verder", text: "Studiekiezers gaan verder waar ze waren, als ze willen ook op een ander apparaat." },
  { icon: "settings", title: "Niets ingesteld?", text: "Dan werkt de test meteen, precies zoals in Helios. Alles wat je instelt, geldt alleen voor jullie test." },
];

const PRIVACY = [
  {
    icon: "file",
    title: "Verwerkersovereenkomst",
    text: "Volgens de opbouw van het model uit het Privacyconvenant Onderwijs. Zonder goedgekeurde overeenkomst werkt de test anoniem.",
  },
  {
    icon: "check-square",
    title: "Toestemming",
    text: "Het vakje voor contact staat nooit vooraf aangevinkt. Zonder toestemming gaat een lead niet naar jullie CRM en wordt hij eerder verwijderd.",
  },
  {
    icon: "users",
    title: "Jonger dan 16",
    text: "Jullie kiezen: geen gegevens bewaren (standaard), eerst toestemming van een ouder per e-mail, of hetzelfde als vanaf 16.",
  },
  {
    icon: "calendar",
    title: "Bewaartermijn",
    text: "Leads worden vanzelf verwijderd na de termijn die jullie kiezen. Standaard is dat 24 maanden.",
  },
  {
    icon: "shield",
    title: "Alleen voor jullie",
    text: "Leads staan per instelling gescheiden, op servers in de EU. Wie leads bekijkt of exporteert, wordt bijgehouden.",
  },
  {
    icon: "eye",
    title: "Eerlijke uitslag",
    text: "De vragen en de berekening zijn voor iedereen gelijk. Jullie bepalen alleen welke opleidingen de uitslag laat zien.",
  },
];

const FAQ = [
  {
    q: "Moet onze IT-afdeling iets doen?",
    a: "Nee. Wie jullie website beheert, plakt één stukje code in een blok 'HTML' of 'Eigen code'. Alles wat jullie daarna in Helios instellen, staat meteen live, zonder de code opnieuw te plakken.",
  },
  {
    q: "Werkt het in ons websitesysteem?",
    a: "Ja, in WordPress, Drupal, Webflow en elk systeem waarin je een eigen code kunt plaatsen. Kan dat niet, dan is er een iframe. De opmaak van jullie site en die van de test zitten elkaar niet in de weg.",
  },
  {
    q: "Wanneer kunnen we gegevens verzamelen?",
    a: "Zodra de getekende verwerkersovereenkomst is goedgekeurd. Tot die tijd werkt de test al wel, maar anoniem. Jullie zien dan wel de cijfers in het dashboard.",
  },
  {
    q: "Wat als een studiekiezer geen toestemming geeft?",
    a: "Dan ziet hij of zij gewoon de uitslag. In Helios zien jullie de lead met de markering 'Geen toestemming voor contact'. Die gaat niet naar jullie CRM en wordt eerder verwijderd.",
  },
  {
    q: "Kunnen we een opleiding toevoegen die niet in Helios staat?",
    a: "Ja. Je maakt hem zelf aan en kiest op welke Helios-opleiding hij lijkt. Hij komt dan in de uitslag met jullie naam, tekst, plaatsen en links.",
  },
  {
    q: "Werkt de test op de telefoon en in het Engels?",
    a: "Ja. De test past zich aan elk scherm aan, en jullie kiezen of hij in het Nederlands of het Engels is.",
  },
  {
    q: "Kunnen we de test eerst zelf zien?",
    a: "Ja. Met de knop 'Probeer de test' op deze pagina doe je de test zoals een studiekiezer hem ziet. In een demo laten we ook jullie eigen versie zien, met jullie opleidingen en huisstijl.",
  },
];

export default function HeliosConnectPage() {
  return (
    <main className="pg">
      {/* Hero: wat het is en voor wie, rechts het voorbeeld op de site van een hogeschool */}
      <section className="pg-hero cn-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Helios Connect · Voor mbo, hbo en wo</Eyebrow>
            <h1 className="pg-h1">
              Leads waar je
              <br /> <Accent>echt iets mee kunt.</Accent>
            </h1>
            <p className="pg-lead">
              Zet de studiekeuzetest van Helios op jullie eigen website. Aankomende studenten ontdekken welke van jullie opleidingen bij ze passen. Jullie
              wervings- en marketingteam krijgt leads met toestemming, inzicht in wat de test oplevert, en alles rechtstreeks in jullie CRM.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={CONNECT_DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
              <StudiekeuzetestButton className="pg-btn pg-btn-secondary">Probeer de test</StudiekeuzetestButton>
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
          <ConnectVisual />
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="pg-section" id="zo-werkt-het">
        <div className="pg-wrap">
          <Eyebrow center>Zo werkt het</Eyebrow>
          <h2 className="pg-h2 is-center">
            In drie stappen <Accent>live op jullie site.</Accent>
          </h2>
          <p className="pg-lead is-center">Geen IT-project: jullie richten alles zelf in, en wat je verandert staat meteen live.</p>
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

      {/* Eén test, twee kanten */}
      <section className="pg-section">
        <div className="pg-wrap">
          <Eyebrow center>Eén test, twee kanten</Eyebrow>
          <h2 className="pg-h2 is-center">
            Fijn voor de studiekiezer.
            <br /> <Accent>Waardevol voor jullie.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Een studiekiezer die zich begrepen voelt, laat sneller iets van zich horen. Daarom draait Helios om een goede ervaring voor de studiekiezer,
            en om leads die jullie echt verder helpen.
          </p>
          <div className="cn-sides">
            {SIDES.map((side, i) => (
              <article key={side.who} className="cn-side glass-card">
                <div className="cn-side-head">
                  <IconBadge name={side.icon} size="lg" square />
                  <div>
                    <p className="cn-label">{side.who}</p>
                    <h3 className="cn-side-title">{side.title}</h3>
                  </div>
                </div>
                <CheckList items={side.points} className="cn-side-points" />
                {i === 0 && (
                  <span className="pg-check cn-bridge" title="Helios Connect" aria-hidden="true">
                    <Icon name="link" size={22} stroke={2.2} />
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gegevens en toestemming */}
      <section className="pg-section" id="leads">
        <div className="pg-wrap pg-split cn-split">
          <div>
            <Eyebrow>Gegevens en toestemming</Eyebrow>
            <h2 className="pg-h2">
              Jullie bepalen <Accent>wat je vraagt, en wanneer.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Kies welke gegevens de studiekiezer achterlaat en op welk moment: direct bij de uitslag, erna, na een voorproefje met de top 3, of vóór de
              uitslag. Of laat studiekiezers eerst een account maken, zodat ze hun uitslag later terugvinden. Elke lead bevat:
            </p>
            <CheckList items={LEAD_CONTENT} />
            <div className="pg-actions">
              <PrimaryButton href={CONNECT_DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
            </div>
          </div>
          <LeadArt />
        </div>
      </section>

      {/* Inzicht */}
      <section className="pg-section" id="inzicht">
        <div className="pg-wrap">
          <Eyebrow center>Inzicht</Eyebrow>
          <h2 className="pg-h2 is-center">
            Zie wat de test <Accent>oplevert.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Het dashboard in Helios laat per periode zien wat de test doet, zonder persoonsgegevens. Zo weet je welke opleidingen leven en welke
            campagnes werken.
          </p>
          <div className="cn-insights">
            {INSIGHTS.map((it) => (
              <article key={it.title} className="cn-insight glass-card">
                <IconBadge name={it.icon} size="lg" />
                <h3 className="pg-card-title">{it.title}</h3>
                <p className="pg-card-text">{it.text}</p>
              </article>
            ))}
          </div>
          <ul className="cn-downloads">
            {["Alle cijfers in Excel", "Een PDF-rapport voor de directie", "Elk kwartaal automatisch per mail"].map((d) => (
              <li key={d}>
                <span className="pg-check" aria-hidden="true">
                  <Icon name="check" size={14} stroke={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Koppelingen */}
      <section className="pg-section" id="koppelingen">
        <div className="pg-wrap pg-split cn-split">
          <div>
            <Eyebrow>Koppelingen</Eyebrow>
            <h2 className="pg-h2">
              Rechtstreeks in <Accent>jullie eigen systemen.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Verbind jullie CRM door in te loggen, kies welk veld van Helios in welk veld van jullie CRM komt, en klaar. Alleen leads met toestemming gaan
              naar buiten.
            </p>
            <CheckList
              items={[
                "Bestaat het contact al? Dan werkt Helios het bij in plaats van een dubbel te maken",
                "Lukt een verzending niet, dan probeert Helios het opnieuw en krijg je bericht",
                "Eigen systeem? Via de webhook hoort het ook wanneer een lead wordt verwijderd",
              ]}
            />
            <div className="pg-actions">
              <PrimaryButton href={CONNECT_DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
            </div>
          </div>
          <div className="cn-integrations">
            {INTEGRATIONS.map((it) => (
              <div key={it.title} className="cn-integration glass-card">
                <IconBadge name={it.icon} />
                <span>
                  <span className="pg-card-title">{it.title}</span>
                  <span className="pg-card-text">{it.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alles instelbaar */}
      <section className="pg-section">
        <div className="pg-wrap">
          <Eyebrow center>Alles naar wens</Eyebrow>
          <h2 className="pg-h2 is-center">
            Ingericht naar <Accent>jullie wervingsstrategie.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Alles wat een studiekeuzetest kan, stel je zelf in. Geen instelling werft op dezelfde manier, dus richt je Helios Connect in zoals het bij jullie
            past.
          </p>
          <div className="cn-config">
            {CONFIG.map((c) => (
              <article key={c.title} className="cn-config-card glass-card">
                {c.art}
                <div className="cn-config-head">
                  <IconBadge name={c.icon} square />
                  <h3 className="pg-card-title">{c.title}</h3>
                </div>
                <p className="pg-card-text">{c.text}</p>
              </article>
            ))}
          </div>
          <ul className="cn-more">
            {MORE.map((m) => (
              <li key={m.title}>
                <IconBadge name={m.icon} size="sm" />
                <span>
                  <span className="pg-card-title">{m.title}</span>
                  <span className="pg-card-text">{m.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Privacy */}
      <section className="pg-section" id="privacy">
        <div className="pg-wrap">
          <Eyebrow center>Privacy en AVG</Eyebrow>
          <h2 className="pg-h2 is-center">
            Privacy <Accent>goed geregeld.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Jullie zijn verantwoordelijk voor de gegevens van studiekiezers, Helios verwerkt ze in jullie opdracht. Daar hoort een test bij die het jullie
            makkelijk maakt.
          </p>
          <ul className="cn-more cn-facts">
            {PRIVACY.map((m) => (
              <li key={m.title}>
                <IconBadge name={m.icon} size="sm" />
                <span>
                  <span className="pg-card-title">{m.title}</span>
                  <span className="pg-card-text">{m.text}</span>
                </span>
              </li>
            ))}
          </ul>
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
        eyebrow="Klaar om meer uit jullie website te halen?"
        title={
          <>
            Ontdek wat Helios kan betekenen
            <br /> voor <Accent>jullie werving.</Accent>
          </>
        }
        text={
          <>
            Plan een vrijblijvende demo. We laten jullie eigen versie van de test zien,
            <br /> en hoe de leads in jullie CRM terechtkomen.
          </>
        }
        primary={{ label: "Plan een vrijblijvende demo", href: CONNECT_DEMO_URL }}
        secondary={{ label: "Neem contact op", href: CONTACT_URL }}
        features={[
          { icon: "calendar", label: "Zonder verplichtingen" },
          { icon: "users", label: "Jullie eigen versie" },
          { icon: "laptop", label: "Online of op locatie" },
        ]}
      />

      <StudiekeuzetestEmbed />
    </main>
  );
}
