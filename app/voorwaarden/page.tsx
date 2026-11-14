import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

const TITLE = "Algemene voorwaarden – Helios";
const DESCRIPTION = "De algemene voorwaarden van Helios voor scholen, organisaties en gebruikers van het platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

// De afspraken over betalen en opzeggen volgen de instellingen in Helios (Admin › Pakketten): prijzen exclusief btw,
// factuur binnen 30 dagen, na opzegging nog minstens 3 maanden tot het einde van een periode.
const SECTIONS: LegalSection[] = [
  {
    id: "definities",
    title: "Definities",
    body: (
      <ul>
        <li>
          <strong>Helios:</strong> {COMPANY.legalName}, handelend onder de naam Helios, ingeschreven bij de Kamer van Koophandel onder nummer {COMPANY.kvk}.
        </li>
        <li>
          <strong>Klant:</strong> de school, onderwijsinstelling, organisatie of professional die met Helios een overeenkomst sluit voor het gebruik van het
          platform.
        </li>
        <li>
          <strong>Gebruiker:</strong> iedereen die het platform gebruikt, zoals medewerkers van de klant, leerlingen, studenten en cliënten, en mensen met een
          eigen account.
        </li>
        <li>
          <strong>Platform:</strong> de online omgeving van Helios op {COMPANY.app}, met de testen, uitslagen, adviezen, rapportages en andere functies.
        </li>
        <li>
          <strong>Pakket:</strong> de combinatie van onderdelen, aantallen en uitbreidingen die de klant afneemt, zoals bij de bestelling of in de offerte
          staat.
        </li>
        <li>
          <strong>Overeenkomst:</strong> de afspraak tussen Helios en de klant over het gebruik van het platform, met deze voorwaarden.
        </li>
      </ul>
    ),
  },
  {
    id: "toepasselijkheid",
    title: "Toepasselijkheid",
    body: (
      <ol>
        <li>Deze voorwaarden gelden voor alle aanbiedingen, offertes en overeenkomsten van Helios en voor elk gebruik van het platform.</li>
        <li>Algemene voorwaarden van de klant gelden niet, tenzij Helios die uitdrukkelijk en schriftelijk heeft aanvaard.</li>
        <li>
          Is een bepaling in deze voorwaarden ongeldig, dan blijven de andere bepalingen gelden. Helios en de klant spreken dan een bepaling af die zo dicht
          mogelijk bij de bedoeling van de oude bepaling ligt.
        </li>
      </ol>
    ),
  },
  {
    id: "aanbod",
    title: "Aanbod en totstandkoming",
    body: (
      <ol>
        <li>Offertes van Helios zijn vrijblijvend en 30 dagen geldig, tenzij in de offerte iets anders staat.</li>
        <li>
          De overeenkomst komt tot stand wanneer de klant een pakket online bestelt en daarbij deze voorwaarden aanvaardt, of wanneer de klant een offerte
          schriftelijk of per e-mail accepteert.
        </li>
        <li>Wie namens een klant bestelt, verklaart dat hij of zij bevoegd is om de klant te vertegenwoordigen.</li>
      </ol>
    ),
  },
  {
    id: "gebruiksrecht",
    title: "De dienst en het gebruiksrecht",
    body: (
      <ol>
        <li>
          Helios geeft de klant voor de duur van de overeenkomst een niet-exclusief en niet-overdraagbaar recht om het platform te gebruiken, binnen de grenzen
          van het pakket (zoals het aantal professionals en cliënten).
        </li>
        <li>
          De klant gebruikt het platform alleen voor de eigen organisatie en voor de begeleiding van de eigen leerlingen, studenten of cliënten. Doorverkopen of
          ter beschikking stellen aan anderen mag alleen met schriftelijke toestemming van Helios.
        </li>
        <li>
          Helios mag het platform verbeteren en aanpassen. Verdwijnt daardoor een wezenlijk onderdeel van het pakket, dan meldt Helios dat vooraf en mag de
          klant de overeenkomst opzeggen per de datum van die wijziging.
        </li>
      </ol>
    ),
  },
  {
    id: "gebruik",
    title: "Accounts en verantwoord gebruik",
    body: (
      <ol>
        <li>Gebruikers houden hun inloggegevens geheim. De klant is verantwoordelijk voor wat er met de accounts van de klant gebeurt.</li>
        <li>
          Het is niet toegestaan het platform te gebruiken in strijd met de wet of deze voorwaarden, de beveiliging te omzeilen, het platform te overbelasten of
          de inhoud (zoals testen, vragen en normtabellen) te kopiëren of na te maken.
        </li>
        <li>Bij misbruik mag Helios een account tijdelijk blokkeren. Helios laat de klant dan zo snel mogelijk weten waarom.</li>
        <li>
          Uitslagen en adviezen van het platform zijn een hulpmiddel voor studie- en loopbaankeuzes. Ze zijn geen garantie voor een bepaalde uitkomst en
          vervangen niet het oordeel van een professional. De klant blijft verantwoordelijk voor de begeleiding en voor beslissingen die worden genomen.
        </li>
      </ol>
    ),
  },
  {
    id: "beschikbaarheid",
    title: "Beschikbaarheid, onderhoud en ondersteuning",
    body: (
      <ol>
        <li>
          Helios doet zijn best om het platform steeds goed bereikbaar te houden, maar kan niet garanderen dat het altijd zonder onderbreking of fouten werkt.
        </li>
        <li>Gepland onderhoud doet Helios zoveel mogelijk buiten de gebruikelijke school- en kantoortijden, en meldt het als het merkbaar is.</li>
        <li>
          Vragen en storingen kan de klant melden via <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Helios reageert binnen redelijke tijd op
          werkdagen.
        </li>
      </ol>
    ),
  },
  {
    id: "prijzen",
    title: "Prijzen en betaling",
    body: (
      <ol>
        <li>Alle prijzen zijn in euro&apos;s en exclusief btw, tenzij anders vermeld.</li>
        <li>
          De klant betaalt per periode vooruit (per maand of per jaar, zoals gekozen), via de online betaling bij de bestelling of op factuur. Een factuur
          betaalt de klant binnen 30 dagen na de factuurdatum.
        </li>
        <li>
          Betaalt de klant niet op tijd, dan stuurt Helios eerst een herinnering. Is er daarna nog steeds niet betaald, dan mag Helios de toegang tot het
          platform opschorten tot er is betaald, en de wettelijke handelsrente en redelijke incassokosten in rekening brengen.
        </li>
        <li>
          Helios mag de prijzen eens per jaar aanpassen. Een prijsverhoging meldt Helios minstens twee maanden vooraf. Is de klant het er niet mee eens, dan mag
          de klant de overeenkomst opzeggen per de datum waarop de nieuwe prijs ingaat.
        </li>
      </ol>
    ),
  },
  {
    id: "duur",
    title: "Duur, verlenging en opzegging",
    body: (
      <ol>
        <li>De overeenkomst loopt voor de gekozen periode (een maand of een jaar) en wordt daarna steeds met dezelfde periode verlengd.</li>
        <li>
          De klant kan de overeenkomst op elk moment opzeggen, in het platform of per e-mail. Na de opzegging loopt het pakket nog minstens drie maanden door en
          stopt het aan het einde van de periode waarin die drie maanden voorbij zijn. Tot dan blijft het platform gewoon beschikbaar.
        </li>
        <li>
          Helios en de klant mogen de overeenkomst direct beëindigen als de ander failliet gaat, surseance van betaling krijgt, of een wezenlijke verplichting
          niet nakomt en dat ook niet herstelt binnen 30 dagen na een schriftelijke aanmaning.
        </li>
        <li>Uitbreidingen van een pakket lopen mee met het pakket waar ze bij horen, tenzij anders afgesproken.</li>
      </ol>
    ),
  },
  {
    id: "einde",
    title: "Na het einde van de overeenkomst",
    body: (
      <ol>
        <li>Na het einde van de overeenkomst stopt de toegang van de klant en de gebruikers van de klant tot het platform.</li>
        <li>
          De klant kan tot het einde de gegevens die het platform daarvoor aanbiedt bekijken en downloaden. Daarna verwijdert Helios de persoonsgegevens volgens
          de verwerkersovereenkomst, behalve wat Helios wettelijk moet bewaren.
        </li>
        <li>Betaalde bedragen worden niet terugbetaald, tenzij deze voorwaarden of de wet anders bepalen.</li>
      </ol>
    ),
  },
  {
    id: "persoonsgegevens",
    title: "Persoonsgegevens",
    body: (
      <ol>
        <li>
          Voor de persoonsgegevens van leerlingen, studenten en cliënten die de klant via het platform laat verwerken, is de klant verantwoordelijke en Helios
          verwerker. De afspraken daarover staan in de verwerkersovereenkomst van Helios, die bij de overeenkomst hoort.
        </li>
        <li>
          Helios gebruikt die persoonsgegevens niet voor eigen doelen. Anonieme, geaggregeerde cijfers waaruit niemand te herleiden is, mag Helios gebruiken om
          de testen en de dienst te verbeteren.
        </li>
        <li>
          Voor de gegevens waarvoor Helios zelf verantwoordelijk is, zoals die van contactpersonen en mensen met een eigen account, geldt de{" "}
          <a href="/privacy">privacyverklaring</a>.
        </li>
      </ol>
    ),
  },
  {
    id: "intellectueel-eigendom",
    title: "Intellectueel eigendom",
    body: (
      <ol>
        <li>
          Alle rechten op het platform, de software, de testen, vragen, normtabellen, rekenregels, teksten en het ontwerp blijven bij Helios of zijn
          licentiegevers.
        </li>
        <li>
          De gegevens die de klant en de gebruikers invoeren, blijven van hen. Helios gebruikt ze alleen om de dienst te leveren, zoals hierboven en in de
          verwerkersovereenkomst staat.
        </li>
        <li>Rapporten en uitslagen die het platform maakt, mag de klant gebruiken voor de begeleiding van de eigen gebruikers.</li>
      </ol>
    ),
  },
  {
    id: "aansprakelijkheid",
    title: "Aansprakelijkheid",
    body: (
      <ol>
        <li>
          Helios is alleen aansprakelijk voor directe schade die het gevolg is van een toerekenbare tekortkoming. De aansprakelijkheid is per jaar beperkt tot
          het bedrag dat de klant in de 12 maanden vóór de schade aan Helios heeft betaald.
        </li>
        <li>
          Helios is niet aansprakelijk voor indirecte schade, zoals gevolgschade, gederfde winst, gemiste besparingen of schade door keuzes die zijn gemaakt op
          basis van uitslagen en adviezen.
        </li>
        <li>Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid van Helios of van zijn leidinggevenden.</li>
        <li>De klant meldt schade zo snel mogelijk en uiterlijk binnen 12 maanden nadat de klant ervan wist of had kunnen weten.</li>
      </ol>
    ),
  },
  {
    id: "overmacht",
    title: "Overmacht",
    body: (
      <p>
        Helios hoeft een verplichting niet na te komen als dat door overmacht niet kan. Denk aan storingen bij hosting- of internetleveranciers, uitval van
        stroom of netwerken, cyberaanvallen die Helios redelijkerwijs niet kon voorkomen, en maatregelen van de overheid. Duurt de overmacht langer dan 60
        dagen, dan mogen beide partijen de overeenkomst schriftelijk beëindigen, zonder schadevergoeding.
      </p>
    ),
  },
  {
    id: "geheimhouding",
    title: "Geheimhouding",
    body: (
      <p>
        Helios en de klant houden vertrouwelijke informatie van elkaar geheim, ook na het einde van de overeenkomst. Informatie is vertrouwelijk als dat is
        gezegd of als dat uit de aard van de informatie blijkt.
      </p>
    ),
  },
  {
    id: "eigen-account",
    title: "Gebruikers met een eigen account",
    body: (
      <ol>
        <li>Wie zelf een gratis account aanmaakt, mag het platform voor zichzelf gebruiken, volgens deze voorwaarden voor zover ze daarvoor passen.</li>
        <li>Je kunt op elk moment stoppen en je account laten verwijderen via {COMPANY.email}.</li>
        <li>
          Helios mag een gratis account beëindigen of de gratis functies aanpassen. Bij het beëindigen van een account dat je gebruikt, laat Helios dat vooraf
          weten, zodat je je gegevens kunt bekijken of bewaren.
        </li>
        <li>Ben je consument, dan houd je altijd de rechten die de wet je geeft. Deze voorwaarden doen daar niets aan af.</li>
      </ol>
    ),
  },
  {
    id: "wijzigingen",
    title: "Wijziging van deze voorwaarden",
    body: (
      <p>
        Helios mag deze voorwaarden aanpassen. Een wijziging meldt Helios minstens 30 dagen voordat die ingaat. Is een wijziging in het nadeel van de klant, dan
        mag de klant de overeenkomst opzeggen per de datum waarop de wijziging ingaat.
      </p>
    ),
  },
  {
    id: "recht",
    title: "Toepasselijk recht en geschillen",
    body: (
      <ol>
        <li>Op alle overeenkomsten met Helios is Nederlands recht van toepassing.</li>
        <li>
          Helios en de klant proberen een geschil eerst samen op te lossen. Lukt dat niet, dan beslist de bevoegde rechter in het arrondissement waar Helios is
          gevestigd. Een consument mag ook naar de rechter die volgens de wet bevoegd is.
        </li>
      </ol>
    ),
  },
];

export default function VoorwaardenPage() {
  return (
    <LegalPage
      eyebrow="Voorwaarden"
      title="Algemene voorwaarden"
      intro={<p>Deze voorwaarden gelden voor het gebruik van Helios door scholen, organisaties en professionals, en voor gebruikers met een eigen account.</p>}
      sections={SECTIONS}
    />
  );
}
