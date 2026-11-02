import type { Metadata } from "next";
import { ClientDashboard, ClientsApp, MatchPanels } from "@/components/professionals/Mockups";
import Icon from "@/components/site/Icon";
import { Accent, CheckList, CtaBand, Eyebrow, IconBadge, PrimaryButton, SecondaryButton } from "@/components/site/PageBits";
import { CONTACT_URL, DEMO_URL, moreInfoUrl } from "@/lib/app-links";

const TITLE = "Voor loopbaanprofessionals – Helios";
const DESCRIPTION =
  "Helios helpt loopbaanprofessionals met betrouwbare tests, actuele arbeidsmarktinformatie en praktische tools om cliënten te begeleiden naar passende loopbaankansen.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const HERO_CHECKS = [
  ["Betrouwbare tests", "en inzichten"],
  ["Actuele", "arbeidsmarktdata"],
  ["Direct toepasbaar", "in de praktijk"],
];

const TOOLS = [
  { icon: "clipboard", title: "Beroepentest", text: "Ontdek talenten, interesses en drijfveren.", link: "Meer over de beroepentest" },
  { icon: "heart", title: "Loopbaanwaarden", text: "Inzicht in wat iemand belangrijk vindt in het werk.", link: "Meer over loopbaanwaarden" },
  { icon: "chart-l", title: "Werkhouding", text: "Inzicht in competenties en werkstijlen.", link: "Meer over werkhouding" },
  { icon: "target", title: "Sectoren en beroepen", text: "Verken sectoren, functies en doorgroeimogelijkheden.", link: "Bekijk sectoren en beroepen" },
  { icon: "briefcase", title: "Vacature koppelingen", text: "Actuele vacatures op basis van het profiel.", link: "Meer over vacatures" },
  { icon: "chart", title: "Arbeidsmarktperspectief", text: "Inzicht in kansen en ontwikkelingen per beroep en regio.", link: "Bekijk arbeidsmarktdata" },
  { icon: "euro", title: "Salaris indicaties", text: "Betrouwbare salarisranges per functie en sector.", link: "Bekijk salaris indicaties" },
  { icon: "cap", title: "Cursussen en opleidingen", text: "Vind passende cursussen, trainingen en opleidingen.", link: "Bekijk opleidingen" },
];

const AUDIENCES = [
  { icon: "user", title: "Loopbaancoaches", text: "Begeleid individuen naar passend werk met betrouwbare testen, inzichten en concrete vervolgstappen." },
  { icon: "user-cycle", title: "Re-integratieprofessionals", text: "Ondersteun cliënten bij re-integratie met realistische kansen, actuele vacatures en passende opleidingen." },
  { icon: "briefcase", title: "HR-professionals", text: "Zet Helios in voor talentontwikkeling, interne mobiliteit en duurzame inzetbaarheid." },
  { icon: "cap", title: "Decanen (MBO/HBO)", text: "Gebruik de instrumenten voor loopbaanadvies en oriëntatie op de arbeidsmarkt." },
  { icon: "presentation", title: "Adviseurs en trainers", text: "Integreer Helios in workshops, trainingen en trajecten voor loopbaanontwikkeling." },
  { icon: "landmark", title: "Gemeenten en UWV", text: "Ondersteun inwoners en werkzoekenden met inzicht, begeleiding en concrete mogelijkheden op de arbeidsmarkt." },
];

export default function VoorProfessionalsPage() {
  return (
    <main className="pg">
      {/* Hero */}
      <section className="pg-hero pro-hero">
        <div className="pg-wrap pg-hero-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Voor loopbaanprofessionals</Eyebrow>
            <h1 className="pg-h1">
              Inzicht in talent,
              <br /> <Accent>richting in de loopbaan.</Accent>
            </h1>
            <p className="pg-lead">
              Helios helpt loopbaanprofessionals met betrouwbare tests, actuele arbeidsmarktinformatie en praktische tools om cliënten te begeleiden naar
              passende loopbaankansen.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
              <SecondaryButton href="#platform">Ontdek het platform</SecondaryButton>
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
          <ClientDashboard />
        </div>
      </section>

      {/* Instrumentarium */}
      <section className="pg-section" id="platform">
        <div className="pg-wrap">
          <Eyebrow center>Een compleet instrumentarium</Eyebrow>
          <h2 className="pg-h2 is-center">
            Alles wat je nodig hebt als <Accent>loopbaanprofessional.</Accent>
          </h2>
          <p className="pg-lead is-center">
            Van betrouwbare tests en actuele arbeidsmarktdata tot concrete vacatures en passende opleidingen. Helios combineert alle essentiële tools in één
            gebruiksvriendelijk platform.
          </p>
          <div className="tool-grid">
            {TOOLS.map((t) => (
              <a key={t.title} className="tool-card glass-card" href={moreInfoUrl(t.title)}>
                <IconBadge name={t.icon} size="lg" />
                <span>
                  <span className="pg-card-title">{t.title}</span>
                  <span className="pg-card-text">{t.text}</span>
                  <span className="pg-more">
                    {t.link} <Icon name="arrow" size={17} stroke={2.4} />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Van inzicht naar mogelijkheden */}
      <section className="pg-section">
        <div className="pg-wrap pg-split pro-split">
          <div>
            <Eyebrow>Van inzicht naar concrete mogelijkheden</Eyebrow>
            <h2 className="pg-h2">
              Van inzicht naar
              <br /> <Accent>concrete mogelijkheden.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Helios koppelt testresultaten aan passende beroepen, actuele vacatures, arbeidsmarktperspectief, salarisindicaties en relevante opleidingen. Zo
              vertaal je inzicht direct naar realistische en haalbare vervolgstappen.
            </p>
            <CheckList
              items={[
                "Passende beroepen op basis van talenten en competenties",
                "Actuele vacatures uit de arbeidsmarkt",
                "Inzicht in kansen en ontwikkelingen per sector en regio",
                "Salarisranges en doorgroeimogelijkheden",
                "Passende cursussen en opleidingen",
              ]}
            />
            <div className="pg-actions">
              <PrimaryButton href="#platform">Ontdek de mogelijkheden</PrimaryButton>
            </div>
          </div>
          <MatchPanels />
        </div>
      </section>

      {/* Voor wie */}
      <section className="pg-section">
        <div className="pg-wrap pg-split audience">
          <div>
            <Eyebrow>Voor wie is Helios?</Eyebrow>
            <h2 className="pg-h2">
              Geschikt voor
              <br /> <Accent>verschillende doelgroepen.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Helios is ontwikkeld voor loopbaanprofessionals die cliënten begeleiden bij werk, ontwikkeling en duurzame loopbaankeuzes in uiteenlopende
              contexten.
            </p>
            <div className="pg-actions">
              <PrimaryButton href={DEMO_URL}>Plan een vrijblijvende demo</PrimaryButton>
            </div>
          </div>
          <div className="audience-grid">
            {AUDIENCES.map((a) => (
              <a key={a.title} className="audience-card glass-card" href={DEMO_URL}>
                <span className="audience-top">
                  <IconBadge name={a.icon} size="lg" />
                  <span className="pg-arrow-btn">
                    <Icon name="arrow" size={20} stroke={2.2} />
                  </span>
                </span>
                <span className="pg-card-title">{a.title}</span>
                <span className="pg-card-text">{a.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cliënten en trajecten */}
      <section className="pg-section">
        <div className="pg-wrap pg-split pro-split is-wide">
          <div>
            <Eyebrow>Grip op cliënten en trajecten</Eyebrow>
            <h2 className="pg-h2">
              Eenvoudig je cliënten begeleiden en trajecten <Accent>organiseren.</Accent>
            </h2>
            <p className="pg-text is-lg">
              Beheer je cliënten, plan gesprekken, volg de voortgang en genereer heldere rapportages. Alles wat je nodig hebt om professioneel en efficiënt te
              werken, in één platform.
            </p>
            <CheckList
              items={["Overzichtelijk cliëntbeheer", "Voortgang en resultaten in één oogopslag", "Notities, afspraken en documenten", "Professionele rapportages voor de cliënt"]}
            />
            <div className="pg-actions">
              <PrimaryButton href={DEMO_URL}>Bekijk het platform</PrimaryButton>
            </div>
          </div>
          <ClientsApp />
        </div>
      </section>

      <CtaBand
        eyebrow="Klaar voor de volgende stap?"
        title={
          <>
            Ontdek wat Helios kan betekenen
            <br /> <Accent>in jouw praktijk.</Accent>
          </>
        }
        text={
          <>
            Plan een vrijblijvende demo en ervaar hoe Helios je helpt om cliënten
            <br /> te begeleiden naar concrete loopbaankansen.
          </>
        }
        primary={{ label: "Plan een vrijblijvende demo", href: DEMO_URL }}
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
