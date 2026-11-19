import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { HAS_ANALYTICS, HAS_MARKETING, joinNl, TRACKERS } from "@/lib/consent";

const TITLE = "Cookieverklaring – Helios";
const DESCRIPTION = "Welke cookies en vergelijkbare technieken helioscareer.nl gebruikt, waarvoor, hoe lang, en hoe je je keuze wijzigt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

type Row = { name: string; by: string; purpose: string; duration: string };

function CookieTable({ rows }: { rows: Row[] }) {
  return (
    <div className="lg-table-wrap">
      <table className="lg-table">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Van</th>
            <th>Waarvoor</th>
            <th>Bewaard</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <code>{r.name}</code>
              </td>
              <td>{r.by}</td>
              <td>{r.purpose}</td>
              <td>{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const NECESSARY: Row[] = [
  { name: "helios-consent", by: "Helios", purpose: "Onthoudt je keuze in de cookiemelding", duration: "12 maanden" },
  { name: "helios-theme", by: "Helios", purpose: "Onthoudt tijdens je bezoek of je de site licht of donker wilt zien", duration: "Tot je het tabblad sluit" },
  { name: "helios-prijscalculator", by: "Helios", purpose: "Onthoudt een samenstelling die je in de prijscalculator opslaat", duration: "Tot je het wist" },
];

const ANALYTICS: Row[] = [
  { name: "_ga", by: "Google Analytics", purpose: "Onderscheidt bezoekers, om bezoeken te tellen", duration: "2 jaar" },
  { name: "_ga_*", by: "Google Analytics", purpose: "Houdt een bezoek (sessie) bij", duration: "2 jaar" },
];

// De advertentiediensten; alleen die met een ID (lib/consent.ts) staan op de pagina.
const ADS = [
  {
    on: !!TRACKERS.googleAds,
    service: "Google Ads",
    company: "Google",
    domain: "google.com",
    policy: "https://policies.google.com/privacy",
    row: { name: "_gcl_au, _gcl_aw", by: "Google Ads", purpose: "Meet of een klik op een advertentie tot een aanvraag leidt", duration: "90 dagen" },
  },
  {
    on: !!TRACKERS.meta,
    service: "Meta",
    company: "Meta",
    domain: "facebook.com",
    policy: "https://www.facebook.com/privacy/policy",
    row: {
      name: "_fbp, _fbc",
      by: "Meta (Facebook, Instagram)",
      purpose: "Herkent je browser voor advertenties en meet wat ze opleveren",
      duration: "90 dagen",
    },
  },
  {
    on: !!TRACKERS.linkedin,
    service: "LinkedIn",
    company: "LinkedIn",
    domain: "linkedin.com",
    policy: "https://www.linkedin.com/legal/privacy-policy",
    row: {
      name: "li_fat_id, lms_ads, lms_analytics",
      by: "LinkedIn",
      purpose: "Meet wat advertenties opleveren en maakt doelgroepen voor advertenties",
      duration: "30 dagen tot 1 jaar",
    },
  },
].filter((a) => a.on);

const MARKETING: Row[] = ADS.map((a) => a.row);
const SINGLE = ADS.length === 1;

const CHOICE = HAS_ANALYTICS && HAS_MARKETING ? "analytische en marketingcookies" : HAS_ANALYTICS ? "analytische cookies" : "marketingcookies";
const USES_GOOGLE = HAS_ANALYTICS || !!TRACKERS.googleAds;
const GOOGLE_FOR = joinNl([HAS_ANALYTICS && "metingen", !!TRACKERS.googleAds && "advertenties"].filter((s): s is string => !!s));

// Een sectie die false is (dienst staat uit) valt weg.
const ALL_SECTIONS: (LegalSection | false)[] = [
  {
    id: "wat-zijn-cookies",
    title: "Wat zijn cookies",
    body: (
      <p>
        Cookies zijn kleine bestanden die een website op je apparaat opslaat. Vergelijkbare technieken, zoals opslag in je browser (local storage) en
        meetpixels, werken op dezelfde manier. In deze verklaring noemen we ze allemaal cookies.
      </p>
    ),
  },
  {
    id: "jouw-keuze",
    title: "Jouw keuze",
    body: !(HAS_ANALYTICS || HAS_MARKETING) ? (
      <p>We gebruiken alleen noodzakelijke cookies. Daarvoor is geen toestemming nodig, dus je krijgt geen cookiemelding te zien.</p>
    ) : (
      <>
        <p>
          Bij je eerste bezoek vragen we of je {CHOICE} toestaat. Pas als je daarvoor kiest, worden ze geplaatst. Weigeren is net zo makkelijk als accepteren,
          en de site werkt in beide gevallen.
        </p>
        <p>
          Je kunt je keuze altijd wijzigen of je toestemming intrekken via{" "}
          <a href="#cookie-instellingen" className="lg-consent-link">
            Cookie-instellingen
          </a>
          , ook te vinden onderaan elke pagina. Trek je toestemming in, dan verwijderen we de cookies die de site zelf heeft geplaatst. Na 12 maanden vragen we
          het opnieuw.
        </p>
        {USES_GOOGLE && <p>Google ontvangt je keuze via Google Consent Mode. Zo weet Google of het cookies mag gebruiken voor {GOOGLE_FOR}.</p>}
      </>
    ),
  },
  {
    id: "noodzakelijk",
    title: "Noodzakelijke cookies",
    body: (
      <>
        <p>Deze zijn nodig om de site te laten werken en om je keuzes te onthouden. Hiervoor vragen we geen toestemming. Ze blijven op je eigen apparaat.</p>
        <CookieTable rows={NECESSARY} />
      </>
    ),
  },
  HAS_ANALYTICS && {
    id: "analytisch",
    title: "Analytische cookies",
    body: (
      <>
        <p>
          Met Google Analytics zien we hoeveel mensen de site bezoeken, welke pagina&apos;s ze bekijken en waar ze vandaan komen. Daarmee maken we de site
          beter. Alleen met jouw toestemming.
        </p>
        <CookieTable rows={ANALYTICS} />
      </>
    ),
  },
  HAS_MARKETING && {
    id: "marketing",
    title: "Marketingcookies",
    body: (
      <>
        <p>
          Met cookies van {joinNl(ADS.map((a) => a.service))} meten we wat onze advertenties opleveren, bijvoorbeeld of iemand na een klik een demo aanvraagt.
          Ze kunnen ook worden gebruikt om je op andere websites en in apps advertenties van Helios te laten zien. Alleen met jouw toestemming.
        </p>
        <CookieTable rows={MARKETING} />
        <p>
          {SINGLE ? `${ADS[0].company} kan` : "Deze partijen kunnen"} daarnaast cookies op {SINGLE ? "het eigen domein" : "hun eigen domeinen"} plaatsen (zoals{" "}
          {joinNl(ADS.map((a) => a.domain))}) en de gegevens ook voor {SINGLE ? "eigen" : "hun eigen"} doelen gebruiken. Lees daarvoor{" "}
          {SINGLE ? "de privacyverklaring" : "hun privacyverklaringen"}:{" "}
          {ADS.map((a, i) => (
            <span key={a.company}>
              {i > 0 && (i === ADS.length - 1 ? " en " : ", ")}
              <a href={a.policy} target="_blank" rel="noopener noreferrer">
                {a.company}
              </a>
            </span>
          ))}
          .
        </p>
      </>
    ),
  },
  {
    id: "meer",
    title: "Meer informatie",
    body: (
      <p>
        Hoe we verder met persoonsgegevens omgaan en welke rechten je hebt, lees je in onze <a href="/privacy">privacyverklaring</a>. Vragen? Mail naar{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
];
const SECTIONS = ALL_SECTIONS.filter((s): s is LegalSection => !!s);

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Cookieverklaring"
      intro={<p>Welke cookies {COMPANY.site} gebruikt, waarvoor, hoe lang ze blijven en hoe je je keuze wijzigt.</p>}
      sections={SECTIONS}
    />
  );
}
