// De prijslijsten op de pagina Prijzen (bron: de prijslijsten 2026, map "prijzen"). Eén plek om bedragen aan te passen.
// Bedragen in hele euro's, exclusief btw (Onderwijs is btw-vrij). De testen heten zoals in Helios.

export type PriceRow = {
  label: string;
  /** Kleine regel onder het label, bijv. "prijs per extra instrument". */
  sub?: string;
  /** Wat erin zit of waaruit je kiest. */
  items?: string[];
  /** Eén bedrag per kolom (zie columns); een tekst zoals "€ 0,50 per km" kan ook. */
  prices: (number | string)[];
  /** Een pakket (gekleurde rij). */
  highlight?: boolean;
};

export type PriceList = {
  id: string;
  name: string;
  /** Voor wie, in een paar woorden (op de tab). */
  short: string;
  intro: string;
  /** Kolomkoppen bij meer dan één prijs per rij, bijv. ["12 cliënten", "25 cliënten", "50 cliënten"]. */
  columns?: string[];
  rows: PriceRow[];
  /** Standaard in elk pakket. */
  standard?: string[];
  notes: string[];
  vatFree?: boolean;
};

export const INSTRUMENTS = {
  aspects: "Werkvaardigheden (kort)",
  study: "Werkhouding (leren)",
  work: "Werkhouding (werk)",
  interest: "Interessetest",
  enneagram: "Enneagram",
  functional: "Functionele mogelijkheden",
  values: "Werkwaarden",
  bigFive: "Persoonlijkheidstest (Big Five)",
  competences: "Competentietest",
} as const;

const MODULES = ["Filter functionele mogelijkheden", "Rapportage", "Beroepenfilter"];

export const STANDARD = [
  "Beroepenzoeker",
  "Functiebelemmeringen",
  "Kansberoepen",
  "Koppeling met opleidingen",
  "Sectorale interessescan",
  "Profielkeuze",
  "Favorieten",
  "Portfolio",
  "Werkvormen",
  "Groepsuitnodiging",
  "Helpdesk",
];

const TRAINING: PriceRow[] = [
  { label: "Training op locatie", prices: ["€ 560 + € 0,50 per km"] },
  { label: "Training bij Helios", prices: ["€ 195 per persoon"] },
];

export const PRICE_LISTS: PriceList[] = [
  {
    id: "solo",
    name: "Solo",
    short: "Eén professional, 12 tot 50 cliënten",
    intro:
      "Voor één professional. Een jaarlicentie met stilzwijgende verlenging en testinzet voor 12, 25 of 50 cliënten. Het basispakket stel je samen en breid je uit met instrumenten, modules of Skills Match naar keuze.",
    columns: ["12 cliënten", "25 cliënten", "50 cliënten"],
    rows: [
      { label: "Basispakket", items: ["Beroepentest", "3 instrumenten naar keuze, of 2 instrumenten en 1 module"], prices: [490, 850, 1450], highlight: true },
      {
        label: "Instrumenten",
        sub: "prijs per extra instrument",
        items: [
          INSTRUMENTS.study,
          INSTRUMENTS.work,
          INSTRUMENTS.interest,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.functional,
          INSTRUMENTS.values,
          INSTRUMENTS.bigFive,
          INSTRUMENTS.competences,
        ],
        prices: [100, 150, 200],
      },
      { label: "Modules", sub: "prijs per extra module", items: MODULES, prices: [200, 300, 400] },
      { label: "Skills Match", items: ["Skillstest, Skillswiper en skillsdashboard"], prices: [300, 450, 600] },
      { label: "Groot pakket", sub: "met één professionalaccount", items: ["Alle instrumenten en modules"], prices: [960, 1575, 2435], highlight: true },
      {
        label: "Compleet pakket",
        sub: "met één professionalaccount",
        items: ["Alle instrumenten en modules, inclusief Skills Match"],
        prices: [1050, 1800, 2700],
        highlight: true,
      },
      ...TRAINING.map((row) => ({ ...row, prices: [row.prices[0], "", ""] })),
    ],
    standard: STANDARD,
    notes: ["Prijzen per jaar, exclusief btw."],
  },
  {
    id: "vijf",
    name: "Vijf",
    short: "Eén professional, 5 cliënten",
    intro: "Voor één professional, met testinzet voor 5 cliënten. De looptijd is maximaal 5 jaar.",
    rows: [
      { label: "Enkel", items: ["Beroepentest"], prices: [185], highlight: true },
      { label: "Basis", items: ["Beroepentest", "3 instrumenten, of 2 instrumenten en 1 module"], prices: [285], highlight: true },
      {
        label: "Compleet",
        items: [
          INSTRUMENTS.aspects,
          INSTRUMENTS.study,
          INSTRUMENTS.work,
          INSTRUMENTS.interest,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.functional,
          INSTRUMENTS.values,
          INSTRUMENTS.bigFive,
          `${INSTRUMENTS.competences} met 360° feedback`,
          "Modules: filter functionele mogelijkheden en rapportage",
        ],
        prices: [430],
        highlight: true,
      },
      ...TRAINING,
    ],
    standard: STANDARD,
    notes: [
      "Prijs ongeacht de werkelijke inzet van de instrumenten. Exclusief btw.",
      "Digitale factuur; de testinzet staat klaar na ontvangst van de betaling.",
    ],
  },
  {
    id: "per-client",
    name: "Per cliënt",
    short: "Betaal per cliënt, zonder afname",
    intro:
      "Je betaalt per cliënt die je uitnodigt. Een eigen organisatieaccount met je eigen logo en 1 testcliënt, zonder afnameverplichting. Inclusief portfolio, werkvormen en de helpdesk.",
    columns: ["Per cliënt"],
    rows: [
      {
        label: "Beroepentest",
        items: [
          "Beroepenzoeker",
          "Favorieten",
          "Kansberoepen",
          "Koppeling met opleidingen",
          "Optionele belemmeringen",
          "Profielkeuze",
          "Sectorale interessescan",
        ],
        prices: [43],
        highlight: true,
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        label: `Beroepentest + ${i + 1} ${i ? "opties" : "optie"}`,
        sub: i === 2 ? "vergelijkbaar met de arbeidsmarktscan: Beroepentest, Werkwaarden, Competentietest en Rapportage" : undefined,
        prices: [[48, 53, 58, 63, 68, 73, 78, 83, 85][i]],
      })),
      {
        label: "Keuzeopties",
        items: [
          INSTRUMENTS.aspects,
          INSTRUMENTS.study,
          INSTRUMENTS.work,
          INSTRUMENTS.interest,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.values,
          INSTRUMENTS.bigFive,
          "Rapportage",
          INSTRUMENTS.competences,
        ],
        prices: [""],
      },
    ],
    notes: ["Prijzen per cliënt, exclusief btw.", "Factuur na het aanmaken van een cliënt; betalen binnen een week."],
  },
  {
    id: "jaarlicentie",
    name: "Jaarlicentie",
    short: "Professionals met veel cliënten",
    intro:
      "Een jaarlicentie met stilzwijgende verlenging, op basis van fair use: maximaal 100 cliënten per jaar per professionalaccount. Breid het basispakket uit met instrumenten, modules en Skills Match.",
    rows: [
      {
        label: "Basispakket",
        sub: "met één professionalaccount",
        items: ["Beroepentest", INSTRUMENTS.interest, `${INSTRUMENTS.study} of ${INSTRUMENTS.work.toLowerCase()}`],
        prices: [525],
        highlight: true,
      },
      {
        label: "Instrumenten",
        sub: "prijs per instrument",
        items: [
          INSTRUMENTS.aspects,
          `${INSTRUMENTS.work} of ${INSTRUMENTS.study.toLowerCase()}`,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.functional,
          INSTRUMENTS.values,
          INSTRUMENTS.bigFive,
          INSTRUMENTS.competences,
        ],
        prices: [165],
      },
      { label: "Modules", sub: "prijs per module", items: MODULES, prices: [300] },
      { label: "Skills Match", items: ["Skillstest en skillsdashboard"], prices: [450] },
      { label: "Extra professionalaccount", sub: "en/of testinzet voor 100 cliënten extra", prices: [150] },
      { label: "Groot pakket", sub: "met één professionalaccount", items: ["Alle instrumenten en modules"], prices: [1935], highlight: true },
      { label: "Compleet pakket", sub: "met één professionalaccount", items: ["Alle instrumenten, modules en Skills Match"], prices: [2150], highlight: true },
      { label: "Training op locatie", prices: ["€ 545 + € 0,50 per km"] },
      { label: "Training bij Helios", prices: ["€ 190 per persoon"] },
    ],
    standard: STANDARD,
    notes: ["Prijzen per jaar, exclusief btw."],
  },
  {
    id: "onderwijs",
    name: "Onderwijs",
    short: "Scholen en decanen",
    intro:
      "Voor scholen: een jaarlicentie met stilzwijgende verlenging, voor maximaal 100 cliënten per professionalaccount per jaar. Btw-vrij dankzij onze CRKBO-registratie.",
    rows: [
      {
        label: "Basispakket",
        sub: "met één professionalaccount",
        items: ["Beroepentest", INSTRUMENTS.study, INSTRUMENTS.interest],
        prices: [600],
        highlight: true,
      },
      {
        label: "Instrumenten",
        sub: "prijs per instrument",
        items: [
          INSTRUMENTS.aspects,
          INSTRUMENTS.work,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.functional,
          INSTRUMENTS.values,
          INSTRUMENTS.bigFive,
          INSTRUMENTS.competences,
        ],
        prices: [175],
      },
      { label: "Modules", sub: "prijs per module", items: MODULES, prices: [300] },
      { label: "Skills Match", items: ["Skillstest en skillsdashboard"], prices: [450] },
      { label: "Extra professionalaccount", sub: "en/of testinzet voor 100 cliënten extra", prices: [150] },
      { label: "Extra beroepenset", sub: "per ander land", prices: [300] },
      { label: "Compleet pakket", sub: "met één professionalaccount", items: ["Alle instrumenten, modules en Skills Match"], prices: [2150], highlight: true },
      ...TRAINING,
    ],
    standard: STANDARD,
    notes: ["Prijzen per jaar, btw-vrij (CRKBO)."],
    vatFree: true,
  },
  {
    id: "skills-match",
    name: "Skills Match",
    short: "Skills in kaart, per bundel",
    intro:
      "Skills Match combineert de Skillstest of Skillswiper met het skillsdashboard: welke beroepen passen bij iemands skills, en welke skills kunnen nog groeien. Je koopt een bundel cliënten; ook te combineren met de Beroepentest.",
    columns: ["20 cliënten", "100 cliënten"],
    rows: [
      {
        label: "Skills Match",
        sub: "bundel",
        items: [
          "Skillstest: 130 skills op volgorde",
          "Skillswiper: 130 afbeeldingen van skills",
          "Skillsdashboard: passende beroepen, skillsfilter en vergelijken",
        ],
        prices: [500, 1500],
        highlight: true,
      },
      {
        label: "Skills Match + Beroepentest",
        sub: "combibundel",
        items: ["Skills Match", "Beroepentest met beroepenzoeker, kansberoepen en sectorale interessescan"],
        prices: [1000, 3000],
        highlight: true,
      },
      {
        label: "Extra instrumenten",
        sub: "optioneel, per instrument",
        items: [
          INSTRUMENTS.aspects,
          INSTRUMENTS.interest,
          INSTRUMENTS.study,
          INSTRUMENTS.work,
          INSTRUMENTS.competences,
          INSTRUMENTS.values,
          INSTRUMENTS.enneagram,
          INSTRUMENTS.bigFive,
          INSTRUMENTS.functional,
        ],
        prices: [165, ""],
      },
      { label: "Extra modules", sub: "optioneel, per module", items: ["Rapportage", "Beroepenfilter", "Filter functionele mogelijkheden"], prices: [300, ""] },
    ],
    standard: [
      "3800 beroepen met beschrijving en sector",
      "Koppeling met opleidingen",
      "Kansberoepen",
      "Favorieten",
      "Organisatieaccount met eigen logo",
      "1 professionalaccount",
      "Helpdesk",
    ],
    notes: [
      "Exclusief btw. De bundel wordt actief na ontvangst van de betaling.",
      "Looptijd maximaal 3 jaar, zonder stilzwijgende verlenging; de inzet stopt bij het bereiken van de limiet.",
    ],
  },
];

/** "€ 1.450" */
export const eur = (value: number | string) => (typeof value === "number" ? `€ ${value.toLocaleString("nl-NL")}` : value);
