import type { Metadata } from "next";
import CoachVisual, { ProfessionArt } from "@/components/coach/CoachArt";
import Icon from "@/components/site/Icon";
import { Accent, CheckList, CtaBand, Eyebrow, IconBadge, PrimaryButton, SecondaryButton } from "@/components/site/PageBits";
import { COACH_DEMO_URL, CONTACT_URL } from "@/lib/app-links";

const TITLE = "Helios Coach: loopbaanbegeleiding voor leerlingen, studenten en volwassenen – Helios";
const DESCRIPTION =
  "Voor decanen, loopbaanbegeleiders en loopbaancoaches: testen voor studie en werk, passende beroepen en opleidingen met arbeidsmarkt en vacatures, en alles om je leerlingen, studenten en cliënten te begeleiden.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

// Helios Coach: het platform voor loopbaanbegeleiding, bekeken door de ogen van de decaan, de loopbaanbegeleider en de
// loopbaancoach. Alles wat hier staat, bestaat echt in Helios (begeleiderskant: cliënten, testen, uitslagen, berichten,
// to-do, 360 graden feedback, team en huisstijl). Geen prijs op deze pagina. Zelfde bouwstenen als Helios Connect
// (PageBits, stijlen in app/pages.css: "cn-" gedeeld, "co-" voor deze pagina).

const HERO_CHECKS = [
  ["Testen voor", "studie en werk"],
  ["Beroepen, opleidingen", "en vacatures"],
  ["In jullie eigen", "huisstijl"],
];

const AUDIENCES = [
  {
    icon: "school",
    who: "Decaan",
    title: "Kiezen voor profiel, opleiding en beroep",
    points: [
      "Studiekeuzetest, Studieswiper en RIASEC voor studie, gratis in elk onderwijspakket",
      "Profielkeuze voor vmbo, havo en vwo bij de Beroepentest",
      "Opleidingen met niveau, school, leervorm, afstand en startmomenten",
    ],
  },
  {
    icon: "compass",
    who: "Loopbaanbegeleider",
    title: "Van interesse naar een passende richting",
    points: [
      "Beroepentest, Loopbaankompas en Competentiescan",
      "Eén advies uit meerdere testen samen",
      "360 graden feedback van ouder, docent, collega of leidinggevende",
    ],
  },
  {
    icon: "briefcase",
    who: "Loopbaancoach",
    title: "Realistische stappen naar werk",
    points: [
      "Functionele mogelijkheden en een filter op belemmeringen",
      "Kans op werk, salaris en actuele vacatures per beroep",
      "Skills: wat je al kunt, en welke beroepen daarbij passen",
    ],
  },
];

const STEPS = [
  {
    icon: "mail",
    title: "Uitnodigen",
    text: "Vul naam en e-mailadres in en kies de testen. Je leerling, student of cliënt krijgt een mail en maakt een account.",
  },
  {
    icon: "clipboard",
    title: "Testen",
    text: "Thuis, in de klas of samen in het gesprek. Met Bekijken als cliënt kijk je mee en doe je een test samen.",
  },
  {
    icon: "chart-l",
    title: "Uitslag en gesprek",
    text: "De uitslag staat meteen klaar: passende beroepen en opleidingen, met uitleg waarom ze passen. Zo begin je elk gesprek goed voorbereid.",
  },
];

const TEST_GROUPS = [
  {
    icon: "cap",
    title: "Studie",
    tests: [
      ["Studiekeuzetest", "Welke opleidingen passen bij je interesses"],
      ["Studieswiper", "Swipe door foto's en ontdek welke sectoren je liggen"],
      ["RIASEC voor studie", "Je interessecode, met foto's, vakken of verhalen"],
      ["Studiehouding", "Hoe je leert en studeert: aanpak, motivatie en zelfvertrouwen"],
    ],
  },
  {
    icon: "briefcase",
    title: "Beroep",
    tests: [
      ["Beroepentest", "Passende beroepen, met sectoren en profielkeuze"],
      ["RIASEC voor werk", "Je interessecode en de beroepen die erbij passen"],
      ["Skills en Skillswiper", "Wat je kunt, en welke beroepen dat vragen"],
    ],
  },
  {
    icon: "user",
    title: "Persoon en werk",
    tests: [
      ["Loopbaankompas", "Wat je belangrijk vindt in je werk"],
      ["Competentiescan", "Je sterke kanten, met 360 graden feedback"],
      ["Persoonlijkheidstest (Big Five)", "Vijf kenmerken van je persoonlijkheid"],
      ["Enneagram", "Je type, met beroepen die erbij passen"],
      ["Werkhouding", "Hoe je werkt: aanpak, motivatie en zelfvertrouwen"],
      ["Werkvaardigheden (kort)", "Een korte scan van je vaardigheden"],
      ["Functionele mogelijkheden", "Wat je kunt in werk, bijvoorbeeld bij re-integratie"],
    ],
  },
];

const RESULT_POINTS = [
  "Matchpercentage, met uitleg waarom een beroep of opleiding past",
  "Filter op niveau, sector en kansberoepen, in Nederland of België",
  "Per beroep: taken, opleidingen, doorgroeien, salaris en kans op werk",
  "Actuele vacatures, en wat werkgevers vragen",
  "Twee of drie beroepen naast elkaar, en één advies uit meerdere testen",
];

const GUIDANCE = [
  {
    icon: "eye",
    title: "Bekijken als cliënt",
    text: "Zie precies wat je leerling of cliënt ziet. Doe een test samen, ook als hij of zij nog geen wachtwoord heeft.",
  },
  {
    icon: "mail",
    title: "Berichten",
    text: "Eén gesprek per cliënt, met alle begeleiders erbij. Een ongelezen bericht komt ook per mail binnen.",
  },
  {
    icon: "check-square",
    title: "To-do",
    text: "Helios zet zelf klaar wat aandacht nodig heeft: een test die stilligt, een uitnodiging die nog open staat, een bericht zonder antwoord.",
  },
  {
    icon: "users",
    title: "360 graden feedback",
    text: "Laat tot vier mensen de Competentiescan over je cliënt invullen, zonder account. De uitslag staat naast die van je cliënt.",
  },
  {
    icon: "bell",
    title: "Meldingen",
    text: "Je ziet het meteen als een test is afgerond of een uitnodiging is geaccepteerd, in Helios en als je wilt per mail.",
  },
  {
    icon: "heart",
    title: "Favorieten",
    text: "Beroepen en opleidingen die je cliënt bewaart, zie je terug. Mooi startpunt voor het volgende gesprek.",
  },
];

const TEAM = [
  { icon: "users", title: "Collega's", text: "Nodig begeleiders uit, koppel meerdere begeleiders aan een cliënt en draag cliënten over." },
  { icon: "grid", title: "Overzicht", text: "Als manager zie je alle cliënten van je organisatie, en filter je per begeleider." },
  { icon: "palette", title: "Eigen huisstijl", text: "Jullie logo en kleuren, ook in de mails aan cliënten en in het 360-formulier." },
  { icon: "settings", title: "Testen naar wens", text: "Eén vraag per scherm, een lijst of een slider. Profielkeuze aan of uit, ook per begeleider." },
];

const PRIVACY = [
  {
    icon: "user-cycle",
    title: "Nooit stil gekoppeld",
    text: "Heeft iemand al een account, dan beslist hij of zij zelf of jullie mogen meekijken.",
  },
  {
    icon: "shield",
    title: "Alleen wie het nodig heeft",
    text: "Een begeleider ziet alleen de eigen cliënten. Met tweestapsverificatie log je extra veilig in.",
  },
  {
    icon: "heart-hand",
    title: "Gevoelige gegevens",
    text: "Belemmeringen bij beroepen worden nooit bewaard. Antwoorden gaan alleen met toestemming naar onderzoek.",
  },
];

const FAQ = [
  {
    q: "Is Helios Coach voor leerlingen of voor volwassenen?",
    a: "Allebei. Decanen gebruiken de studie- en beroepentesten met profielkeuze, loopbaancoaches de testen voor werk, Functionele mogelijkheden en de arbeidsmarktinformatie. De profielkeuze kun je voor volwassenen verbergen.",
  },
  {
    q: "Kan ik een test samen met mijn leerling of cliënt doen?",
    a: "Ja. Met Bekijken als cliënt zie je wat je cliënt ziet en doe je de test samen, bijvoorbeeld tijdens een gesprek. Dat kan zelfs voordat je cliënt een wachtwoord heeft gekozen.",
  },
  {
    q: "Wat als mijn cliënt al een Helios-account heeft?",
    a: "Dan nodig je hem of haar gewoon uit. Je cliënt ziet de uitnodiging in Helios en kiest zelf of jullie mogen meekijken. Pas daarna zie je testen en uitslagen.",
  },
  {
    q: "Welke testen kan ik gebruiken?",
    a: "Dat hangt af van jullie pakket. In elk onderwijspakket zitten de studiekeuzetesten gratis. Mist er een test, dan vraag je hem vanuit Helios aan.",
  },
  {
    q: "Kunnen collega's meekijken bij een cliënt?",
    a: "Ja. Een manager koppelt meerdere begeleiders aan een cliënt. Berichten gaan dan naar iedereen die betrokken is.",
  },
  {
    q: "Kunnen cliënten de testen op hun telefoon maken?",
    a: "Ja. De omgeving van de cliënt werkt op de telefoon, en de swipers zijn juist gemaakt om te swipen.",
  },
];

export default function HeliosCoachPage() {
  return (
    <main className="pg">
      {/* Hero: wat het is en voor wie, rechts een cliënt in Helios */}
      <section className="pg-hero cn-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Helios Coach · Loopbaanbegeleiding</Eyebrow>
            <h1 className="pg-h1">
              Van test naar
              <br /> <Accent>een goed gesprek.</Accent>
            </h1>
            <p className="pg-lead">
              Helios Coach is het platform voor decanen, loopbaanbegeleiders en loopbaancoaches. Je nodigt leerlingen, studenten of cliënten uit, zet de
              testen klaar en ziet de uitslag meteen: passende beroepen en opleidingen, met arbeidsmarkt en vacatures. Zo gaat je gesprek over wat ertoe doet.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={COACH_DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
              <SecondaryButton href="#testen">Bekijk de testen</SecondaryButton>
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
          <CoachVisual />
        </div>
      </section>

      {/* Voor wie */}
      <section className="pg-section" id="voor-wie">
        <div className="pg-wrap">
          <Eyebrow center>Voor wie</Eyebrow>
          <h2 className="pg-h2 is-center">
            Eén platform, <Accent>elke begeleider.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Of je nu leerlingen helpt kiezen, studenten begeleidt of volwassenen naar ander werk helpt: Helios Coach heeft de testen en de informatie die
            je nodig hebt.
          </p>
          <div className="co-audiences">
            {AUDIENCES.map((a) => (
              <article key={a.who} className="cn-side glass-card">
                <div className="cn-side-head">
                  <IconBadge name={a.icon} size="lg" square />
                  <div>
                    <p className="cn-label">{a.who}</p>
                    <h3 className="cn-side-title">{a.title}</h3>
                  </div>
                </div>
                <CheckList items={a.points} className="cn-side-points" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="pg-section" id="zo-werkt-het">
        <div className="pg-wrap">
          <Eyebrow center>Zo werkt het</Eyebrow>
          <h2 className="pg-h2 is-center">
            In drie stappen <Accent>aan de slag.</Accent>
          </h2>
          <p className="pg-lead is-center">Geen ingewikkelde inrichting: je nodigt iemand uit en begint.</p>
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

      {/* Testen */}
      <section className="pg-section" id="testen">
        <div className="pg-wrap">
          <Eyebrow center>Testen</Eyebrow>
          <h2 className="pg-h2 is-center">
            De juiste test <Accent>voor elke vraag.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Voor studiekeuze, beroepskeuze en loopbaan. Alle teksten in begrijpelijke taal, en de swipers en de RIASEC zijn ook met het toetsenbord te
            doen.
          </p>
          <div className="co-tests">
            {TEST_GROUPS.map((g) => (
              <article key={g.title} className="co-test-group glass-card">
                <div className="cn-config-head co-test-head">
                  <IconBadge name={g.icon} square />
                  <h3 className="pg-card-title">{g.title}</h3>
                </div>
                <ul className="co-test-list">
                  {g.tests.map(([name, text]) => (
                    <li key={name}>
                      <span className="co-test-name">{name}</span>
                      <span className="pg-card-text">{text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Uitslag */}
      <section className="pg-section" id="uitslag">
        <div className="pg-wrap pg-split cn-split">
          <div>
            <Eyebrow>Uitslag</Eyebrow>
            <h2 className="pg-h2">
              Van uitslag naar <Accent>beroep en opleiding.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Helios vertaalt de uitslag naar beroepen en opleidingen die passen, met de informatie die je in het gesprek nodig hebt. Je cliënt ziet hetzelfde
              in de eigen omgeving.
            </p>
            <CheckList items={RESULT_POINTS} />
            <div className="pg-actions">
              <PrimaryButton href={COACH_DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
            </div>
          </div>
          <ProfessionArt />
        </div>
      </section>

      {/* Begeleiden */}
      <section className="pg-section" id="begeleiden">
        <div className="pg-wrap">
          <Eyebrow center>Begeleiden</Eyebrow>
          <h2 className="pg-h2 is-center">
            Alles voor de begeleiding, <Accent>op één plek.</Accent>
          </h2>
          <p className="pg-lead is-center">Minder zoeken en nabellen, meer tijd voor het gesprek.</p>
          <div className="cn-cards-3">
            {GUIDANCE.map((it) => (
              <article key={it.title} className="cn-insight glass-card">
                <IconBadge name={it.icon} size="lg" />
                <h3 className="pg-card-title">{it.title}</h3>
                <p className="pg-card-text">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team en organisatie */}
      <section className="pg-section" id="team">
        <div className="pg-wrap">
          <Eyebrow center>Voor je team</Eyebrow>
          <h2 className="pg-h2 is-center">
            Samen begeleiden, <Accent>in jullie stijl.</Accent>
          </h2>
          <p className="pg-lead is-center">Werk samen met collega&apos;s aan dezelfde cliënten, en laat Helios eruitzien als jullie eigen omgeving.</p>
          <div className="cn-insights">
            {TEAM.map((m) => (
              <article key={m.title} className="cn-insight glass-card">
                <IconBadge name={m.icon} size="lg" />
                <h3 className="pg-card-title">{m.title}</h3>
                <p className="pg-card-text">{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="pg-section" id="privacy">
        <div className="pg-wrap">
          <Eyebrow center>Privacy</Eyebrow>
          <h2 className="pg-h2 is-center">
            Zorgvuldig met <Accent>persoonlijke gegevens.</Accent>
          </h2>
          <p className="pg-lead is-center">Leerlingen, studenten en cliënten vertellen in Helios veel over zichzelf. Daar gaan we zorgvuldig mee om.</p>
          <div className="cn-cards-3">
            {PRIVACY.map((m) => (
              <article key={m.title} className="cn-insight glass-card">
                <IconBadge name={m.icon} size="lg" />
                <h3 className="pg-card-title">{m.title}</h3>
                <p className="pg-card-text">{m.text}</p>
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
        eyebrow="Klaar voor betere loopbaangesprekken?"
        title={
          <>
            Ontdek wat Helios Coach kan betekenen
            <br /> voor <Accent>jouw begeleiding.</Accent>
          </>
        }
        text={
          <>
            Plan een vrijblijvende demo. We laten zien hoe je leerlingen, studenten en cliënten uitnodigt,
            <br /> en hoe de uitslag je helpt in het gesprek.
          </>
        }
        primary={{ label: "Plan een vrijblijvende demo", href: COACH_DEMO_URL }}
        secondary={{ label: "Neem contact op", href: CONTACT_URL }}
        features={[
          { icon: "calendar", label: "Zonder verplichtingen" },
          { icon: "users", label: "Persoonlijke rondleiding" },
          { icon: "laptop", label: "Online of op locatie" },
        ]}
      />
    </main>
  );
}
