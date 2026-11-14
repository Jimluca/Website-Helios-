import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

const TITLE = "Privacyverklaring – Helios";
const DESCRIPTION = "Hoe Helios omgaat met persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang en welke rechten je hebt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const mail = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "wie-zijn-wij",
    title: "Wie zijn wij",
    body: (
      <>
        <p>
          Helios is een platform met studie- en loopbaantesten voor scholen, loopbaanprofessionals en organisaties. Helios is een handelsnaam van{" "}
          {COMPANY.legalName}, gevestigd aan {COMPANY.address}, {COMPANY.postalCity}, ingeschreven bij de Kamer van Koophandel onder nummer {COMPANY.kvk}{" "}
          (hierna: &ldquo;Helios&rdquo;, &ldquo;wij&rdquo; of &ldquo;ons&rdquo;).
        </p>
        <p>Heb je een vraag over privacy of wil je een van je rechten gebruiken? Mail ons op {mail}.</p>
      </>
    ),
  },
  {
    id: "voor-wie",
    title: "Voor wie deze verklaring geldt",
    body: (
      <>
        <p>Deze verklaring gaat over de persoonsgegevens waarvoor Helios zelf verantwoordelijk is. Dat zijn de gegevens van:</p>
        <ul>
          <li>bezoekers van {COMPANY.site};</li>
          <li>mensen die het contactformulier invullen of een demo aanvragen;</li>
          <li>contactpersonen van scholen en organisaties die klant zijn of willen worden;</li>
          <li>mensen die zelf een account aanmaken op {COMPANY.app}.</li>
        </ul>
        <p>
          <strong>Gebruik je Helios via je school, opleiding, werkgever of loopbaanbegeleider?</strong> Dan bepaalt die organisatie waarvoor jouw gegevens
          worden gebruikt. Zij is dan verantwoordelijk volgens de AVG en Helios verwerkt de gegevens in haar opdracht, op basis van een verwerkersovereenkomst.
          Dat geldt ook voor de Studiekeuzetest op de website van een school. Voor vragen over jouw gegevens kun je dan het beste bij die organisatie terecht.
          Komt je vraag bij ons binnen, dan sturen we die door.
        </p>
      </>
    ),
  },
  {
    id: "gegevens-en-doelen",
    title: "Welke gegevens we gebruiken en waarvoor",
    body: (
      <>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th>Waarvoor</th>
                <th>Welke gegevens</th>
                <th>Grondslag</th>
                <th>Hoe lang</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reageren op het contactformulier, een demo plannen of een offerte maken</td>
                <td>Naam, e-mailadres, school of organisatie, telefoonnummer (als je dat invult) en je bericht</td>
                <td>Gerechtvaardigd belang (je vraag beantwoorden) en stappen vóór een overeenkomst</td>
                <td>Tot 12 maanden na het laatste contact, tenzij er een overeenkomst uit voortkomt</td>
              </tr>
              <tr>
                <td>Een overeenkomst met een school of organisatie uitvoeren en factureren</td>
                <td>Naam en contactgegevens van contactpersonen, factuurgegevens, gekozen pakket en betaalgegevens</td>
                <td>Uitvoering van de overeenkomst en wettelijke plicht</td>
                <td>Zolang de overeenkomst loopt; factuur- en boekhoudgegevens 7 jaar (fiscale bewaarplicht)</td>
              </tr>
              <tr>
                <td>Een eigen account aanbieden: testen maken, uitslagen en advies tonen</td>
                <td>Naam, e-mailadres, wachtwoord (versleuteld), je antwoorden, uitslagen, voorkeuren en favorieten</td>
                <td>Uitvoering van de overeenkomst (het gebruik van je account)</td>
                <td>Zolang je account bestaat; daarna verwijderen we je gegevens</td>
              </tr>
              <tr>
                <td>De testen verbeteren met antwoorden van gebruikers</td>
                <td>Alleen je antwoorden, nooit je naam of e-mailadres; we gebruiken alleen totalen van veel mensen</td>
                <td>Toestemming, die je zelf geeft en altijd kunt intrekken bij Instellingen › Profiel</td>
                <td>Zolang je toestemming geldt</td>
              </tr>
              <tr>
                <td>De website veilig en goed laten werken</td>
                <td>IP-adres, browser, tijdstip en opgevraagde pagina (serverlogboeken)</td>
                <td>Gerechtvaardigd belang (beveiliging en storingen oplossen)</td>
                <td>Kort, alleen zolang nodig voor beveiliging en storingen</td>
              </tr>
              <tr>
                <td>Meten hoe de website wordt gebruikt (Google Analytics)</td>
                <td>Cookie-ID, apparaat- en browsergegevens, bezochte pagina&apos;s, globale locatie</td>
                <td>Toestemming via de cookiemelding</td>
                <td>
                  Zie de <a href="/cookies">cookieverklaring</a>
                </td>
              </tr>
              <tr>
                <td>Advertenties laten zien en meten wat ze opleveren (Google Ads, Meta en LinkedIn)</td>
                <td>Cookie-ID, apparaat- en browsergegevens, bezochte pagina&apos;s en acties zoals een verstuurd formulier</td>
                <td>Toestemming via de cookiemelding</td>
                <td>
                  Zie de <a href="/cookies">cookieverklaring</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We vragen niet meer gegevens dan nodig. Velden die niet verplicht zijn, staan als optioneel aangegeven. We gebruiken je gegevens niet voor andere
          doelen dan hierboven staan en we verkopen ze nooit.
        </p>
      </>
    ),
  },
  {
    id: "testen-en-advies",
    title: "Testen, uitslagen en advies",
    body: (
      <>
        <p>
          Helios berekent uitslagen en adviezen (zoals passende beroepen of opleidingen) automatisch op basis van je antwoorden. Die uitkomsten zijn een
          hulpmiddel om na te denken over je keuze. Er worden geen besluiten mee genomen die rechtsgevolgen voor je hebben of je op een andere manier wezenlijk
          treffen. Gebruik je Helios via een school of begeleider, dan bespreek je de uitslag meestal met een professional.
        </p>
        <p>
          Ben je jonger dan 16 jaar en wil je zelf een account aanmaken? Vraag dan eerst toestemming aan je ouder of verzorger. Gebruik je Helios via je school,
          dan maakt de school daar afspraken over.
        </p>
      </>
    ),
  },
  {
    id: "delen",
    title: "Met wie we gegevens delen",
    body: (
      <>
        <p>We delen gegevens alleen als dat nodig is voor de doelen hierboven, of als de wet ons daartoe verplicht. Dat zijn:</p>
        <ul>
          <li>
            <strong>Dienstverleners die in onze opdracht werken</strong> (verwerkers): hosting van de website en het platform (Hetzner Online, in de EU), het
            versturen van e-mail en betalingen (Stripe). Met hen hebben we afspraken gemaakt over beveiliging en geheimhouding.
          </li>
          <li>
            <strong>Advertentie- en analysediensten</strong>, alleen als je daar via de cookiemelding toestemming voor geeft: Google (Analytics en Ads), Meta
            (Facebook en Instagram) en LinkedIn. Deze partijen gebruiken de gegevens deels ook voor hun eigen doelen; daarvoor gelden hun eigen
            privacyverklaringen.
          </li>
          <li>
            <strong>De organisatie waarmee je via Helios bent verbonden</strong>, zoals je school of loopbaanbegeleider, als die je heeft uitgenodigd. Zij zien
            je uitslagen om je te begeleiden.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "buiten-de-eu",
    title: "Gegevens buiten de Europese Unie",
    body: (
      <p>
        We bewaren de gegevens van het platform binnen de Europese Economische Ruimte (EER). Google, Meta, LinkedIn en Stripe kunnen gegevens ook buiten de EER
        verwerken, bijvoorbeeld in de Verenigde Staten. Dat gebeurt alleen met passende waarborgen, zoals het EU-VS Data Privacy Framework of de
        standaardcontractbepalingen van de Europese Commissie.
      </p>
    ),
  },
  {
    id: "beveiliging",
    title: "Hoe we je gegevens beveiligen",
    body: (
      <p>
        We nemen passende technische en organisatorische maatregelen tegen verlies en onrechtmatig gebruik. Bijvoorbeeld: verbindingen zijn versleuteld (https),
        wachtwoorden worden versleuteld opgeslagen, alleen medewerkers die het nodig hebben kunnen bij gegevens, en er worden regelmatig back-ups gemaakt. Denk
        je dat er iets mis is met de beveiliging? Laat het ons direct weten via {mail}.
      </p>
    ),
  },
  {
    id: "rechten",
    title: "Jouw rechten",
    body: (
      <>
        <p>Je hebt het recht om:</p>
        <ul>
          <li>je gegevens in te zien;</li>
          <li>onjuiste gegevens te laten verbeteren;</li>
          <li>je gegevens te laten verwijderen;</li>
          <li>het gebruik van je gegevens te laten beperken;</li>
          <li>je gegevens in een gangbaar bestand te ontvangen (overdraagbaarheid);</li>
          <li>bezwaar te maken tegen gebruik op basis van gerechtvaardigd belang;</li>
          <li>je toestemming in te trekken. Voor cookies kan dat via de cookie-instellingen onderaan elke pagina.</li>
        </ul>
        <p>
          Stuur je verzoek naar {mail}. We reageren binnen een maand. Om te voorkomen dat we gegevens aan de verkeerde persoon geven, kunnen we je vragen aan te
          tonen wie je bent.
        </p>
        <p>
          Ben je niet tevreden over hoe we met je gegevens omgaan? Laat het ons weten, dan zoeken we samen een oplossing. Je hebt ook altijd het recht om een
          klacht in te dienen bij de{" "}
          <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
            Autoriteit Persoonsgegevens
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "wijzigingen",
    title: "Wijzigingen",
    body: (
      <p>
        We kunnen deze privacyverklaring aanpassen, bijvoorbeeld als onze dienst of de wet verandert. De datum bovenaan laat zien wanneer de laatste wijziging
        was. Bij belangrijke wijzigingen laten we het je weten, bijvoorbeeld via de website of per e-mail als je een account hebt.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacyverklaring"
      intro={<p>Helios gaat zorgvuldig om met persoonsgegevens. Hier lees je welke gegevens we gebruiken, waarom, hoe lang en welke rechten je hebt.</p>}
      sections={SECTIONS}
    />
  );
}
