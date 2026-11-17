// Prijslijst 2026 (concept 16 nov 2026): pakketten met staffels, wat je erbij koopt en de studiekeuzetest op de
// schoolsite. Alle bedragen per jaar per organisatie. Loopbaan & Re-integratie excl. 21% btw, Onderwijs btw-vrij.

export type Segment = "lr" | "onderwijs";

export type Pkg = {
  id: string;
  name: string;
  pitch: string;
  prices: number[]; // per staffel, zelfde volgorde als Plan.tiers
  highlights: string[]; // korte regels op de kaart (testnamen krijgen een i-knop)
  popular?: boolean;
  custom?: boolean; // eigen pakket: alleen zelf gekozen testen, geen vaste prijs
  standalone?: boolean; // los product zonder uitbreiding (Alleen Skills); staat als strook onder de pakketten
  // Prijs per test in een eigen pakket, per staffel. Bewust duurder dan dezelfde testen in een vast pakket.
  testPrices?: { beroepentest: number[]; test: number[]; skills: number[] };
};

export type Plan = {
  label: string;
  unit: string; // "cliënten" of "leerlingen"
  unitOne: string; // "cliënt" of "leerling"
  tiers: number[];
  defaultTier: number; // index in tiers
  vat: string;
  vatRate: number; // 0.21 of 0
  maxNote: string;
  professionalLabel: string;
  packages: Pkg[];
  extras: { extraTest: number[]; functional: number[]; skills: number[]; professional: number };
  freeTests: TestName[]; // zitten gratis in elk pakket van deze doelgroep
  excludedTests: TestName[]; // bestaan niet voor deze doelgroep
  included: string[];
};

// kind bepaalt de prijs als je de test erbij koopt: gewone extra test, Functionele mogelijkheden of Skills.
export const TESTS = [
  {
    name: "Beroepentest",
    what: "Welke beroepen en sectoren passen bij je interesses?",
    benefit: "Een lijst met beroepen en sectoren die passen, als concreet startpunt voor het gesprek.",
    kind: "extra",
  },
  {
    name: "RIASEC (werk)",
    what: "Foto’s, vakken en verhalen: jouw interessecode.",
    benefit: "Je ziet welk soort werk je aanspreekt, ook als je nog niet weet welke beroepen er allemaal zijn.",
    kind: "extra",
  },
  {
    name: "Loopbaankompas",
    what: "Wat vind je belangrijk in werk?",
    benefit: "Je weet waar een nieuwe baan of opleiding aan moet voldoen, bijvoorbeeld zekerheid, vrijheid of samenwerken.",
    kind: "extra",
  },
  {
    name: "Competentiescan",
    what: "Waar ben je sterk in? Met 360 graden feedback.",
    benefit: "Je ziet je sterke kanten en hoe anderen die zien. Tot 4 mensen uit je omgeving geven feedback.",
    kind: "extra",
  },
  {
    name: "Persoonlijkheidstest (Big Five)",
    what: "Je persoonlijkheid in het Big Five-model.",
    benefit: "Je begrijpt beter hoe je werkt en welke werkomgeving bij je past.",
    kind: "extra",
  },
  {
    name: "Werkvaardigheden (kort)",
    what: "Vaardigheden die in veel beroepen belangrijk zijn.",
    benefit: "Je ziet welke vaardigheden je al goed beheerst en welke je nog kunt ontwikkelen.",
    kind: "extra",
  },
  {
    name: "Enneagram",
    what: "Jouw persoonlijkheidstype.",
    benefit: "Inzicht in je drijfveren en in hoe je met anderen samenwerkt.",
    kind: "extra",
  },
  {
    name: "Werkhouding (werk)",
    what: "Hoe pak jij je werk aan?",
    benefit: "Je ziet hoe het staat met motivatie, samenwerken en omgaan met regels, en waar je kunt groeien.",
    kind: "extra",
  },
  {
    name: "Werkhouding (leren)",
    what: "Hoe pak jij leren en studeren aan?",
    benefit: "Je ziet hoe het staat met motivatie, doorzetten en omgaan met tegenslag tijdens je opleiding.",
    kind: "extra",
  },
  {
    name: "Functionele mogelijkheden",
    what: "Wat kun je wel en niet in werk?",
    benefit: "Beroepen die niet passen bij wat iemand kan vallen weg. Zo zie je alleen haalbare opties.",
    kind: "functional",
  },
  {
    name: "Skills",
    what: "Skillstest en Skillsdashboard.",
    benefit: "Je ziet welke beroepen passen bij de skills die je al hebt, ook buiten je eigen vakgebied.",
    kind: "skills",
  },
] as const;

export type TestName = (typeof TESTS)[number]["name"];
export type Test = (typeof TESTS)[number];

export const STUDY_TESTS = {
  name: "Studiekeuzetest, Studieswiper en RIASEC (studie)",
  what: "Welke opleidingen passen bij je?",
  benefit: "Een lijst met opleidingen in vo, mbo, hbo en wo die passen bij je interesses. Gratis in elk Onderwijs-pakket.",
};

export const testByName = (name: string) => TESTS.find((t) => t.name === name);

// Welke test in welk pakket zit (pakket-id → testnamen).
export const CONTENTS: Record<string, readonly TestName[]> = {
  basis: ["Beroepentest", "RIASEC (werk)", "Loopbaankompas", "Functionele mogelijkheden"],
  loopbaan: ["Beroepentest", "RIASEC (werk)", "Loopbaankompas", "Competentiescan", "Persoonlijkheidstest (Big Five)", "Functionele mogelijkheden"],
  "compleet-lr": TESTS.map((t) => t.name),
  start: ["Beroepentest", "RIASEC (werk)", "Werkhouding (leren)"],
  "compleet-o": TESTS.map((t) => t.name).filter((n) => n !== "Functionele mogelijkheden"),
  "eigen-lr": ["Functionele mogelijkheden"],
  "skills-lr": ["Skills", "Functionele mogelijkheden"],
  "eigen-o": [],
};

// De testen die een doelgroep kan krijgen.
export const testsFor = (plan: Plan) => TESTS.filter((t) => !plan.excludedTests.includes(t.name));

export const PLANS: Record<Segment, Plan> = {
  lr: {
    label: "Loopbaan & Re-integratie",
    unit: "cliënten",
    unitOne: "cliënt",
    tiers: [5, 10, 25, 50, 100],
    defaultTier: 2,
    vat: "per jaar, excl. 21% btw",
    vatRate: 0.21,
    maxNote: "Meer dan 100 cliënten per jaar?",
    professionalLabel: "coach of adviseur",
    packages: [
      {
        id: "basis",
        name: "Basis",
        pitch: "De basis voor elk loopbaangesprek: interesses, beroepen en wat iemand belangrijk vindt.",
        prices: [215, 440, 700, 1290, 1635],
        highlights: ["Beroepentest", "RIASEC (werk)", "Loopbaankompas"],
      },
      {
        id: "loopbaan",
        name: "Loopbaan",
        pitch: "Wat wil je, wat kun je en wie ben je. Voor complete loopbaantrajecten.",
        prices: [240, 500, 790, 1460, 1850],
        highlights: ["Alles uit Basis", "Competentiescan", "Persoonlijkheidstest (Big Five)"],
        popular: true,
      },
      {
        id: "compleet-lr",
        name: "Compleet",
        pitch: "Alle 11 testen, voor re-integratie en trajecten waarin je alles wilt kunnen inzetten.",
        prices: [390, 810, 1400, 2380, 3010],
        highlights: ["Alle 11 testen", "Skills"],
      },
      {
        // Geen vaste prijs: je betaalt per gekozen test. Losse testen zijn bewust duurder dan in een pakket:
        // - een test kost meer dan een test gemiddeld kost in Basis (Basis / 3, plus ruim 10%);
        // - de Beroepentest kost 1,5 keer een test, zodat de testen van Basis los ongeveer 30% duurder zijn dan Basis;
        // - Beroepentest + Skills los is 10% duurder dan Basis + Skills.
        id: "eigen-lr",
        name: "Eigen pakket",
        pitch: "Stel zelf je pakket samen. Je betaalt alleen voor de testen die je kiest.",
        prices: [0, 0, 0, 0, 0],
        highlights: ["Beroepentest", "Testen naar keuze"],
        custom: true,
        testPrices: {
          beroepentest: [120, 250, 390, 720, 915],
          test: [80, 165, 260, 480, 610],
          skills: [450, 565, 710, 1250, 1435],
        },
      },
      {
        // Voor wie alleen Skills wil: blijft goedkoper dan Icares "alleen Skills" (20 cliënten € 500, 100 cliënten € 1.500).
        // Niet uit te breiden; wie meer testen wil, kiest een pakket.
        id: "skills-lr",
        name: "Alleen Skills",
        pitch: "Alleen de Skillstest en het Skillsdashboard, zonder pakket.",
        prices: [105, 220, 380, 720, 1140],
        highlights: ["Skills"],
        standalone: true,
      },
    ],
    extras: {
      extraTest: [40, 80, 135, 135, 135],
      functional: [0, 0, 0, 0, 0], // zit gratis in elk L&R-pakket
      skills: [300, 300, 300, 500, 500], // t/m 25: Basis + Skills = € 1.000
      professional: 195,
    },
    freeTests: ["Functionele mogelijkheden"],
    excludedTests: [],
    included: ["1 professional", "Functionele mogelijkheden gratis", "Rapportage en Beroepenfilter", "Extra taalset"],
  },
  onderwijs: {
    label: "Onderwijs",
    unit: "leerlingen",
    unitOne: "leerling",
    tiers: [25, 50, 100, 250, 500],
    defaultTier: 2,
    vat: "per jaar, btw-vrij",
    vatRate: 0,
    maxNote: "Meer dan 500 leerlingen of studenten per jaar?",
    professionalLabel: "decaan of loopbaanbegeleider",
    packages: [
      {
        id: "start",
        name: "Start",
        pitch: "Alles voor een goede start met loopbaanoriëntatie, met de Studiekeuzetest gratis erbij.",
        prices: [360, 415, 470, 485, 510],
        highlights: ["Beroepentest", "RIASEC (werk)", "Werkhouding (leren)"],
        popular: true,
      },
      {
        id: "compleet-o",
        name: "Compleet",
        pitch: "Alle 10 testen voor decanen en loopbaanbegeleiders die het hele palet willen.",
        prices: [1400, 1610, 1820, 1890, 1990],
        highlights: ["Alle 10 testen", "Skills"],
      },
      {
        // Zelfde opzet als bij L&R; een losse test kost minstens € 165 (duurder dan € 135 erbij bij Start).
        id: "eigen-o",
        name: "Eigen pakket",
        pitch: "Stel zelf je pakket samen. Je betaalt alleen voor de testen die je kiest.",
        prices: [0, 0, 0, 0, 0],
        highlights: ["Beroepentest", "Testen naar keuze"],
        custom: true,
        testPrices: {
          beroepentest: [250, 250, 265, 270, 285],
          test: [165, 165, 175, 180, 190],
          skills: [530, 590, 635, 650, 660],
        },
      },
    ],
    extras: { extraTest: [135, 135, 135, 135, 135], functional: [0, 0, 0, 0, 0], skills: [350, 350, 350, 350, 350], professional: 100 },
    freeTests: [],
    excludedTests: ["Functionele mogelijkheden"], // niet te koop voor Onderwijs
    included: ["1 decaan of loopbaanbegeleider", "Studiekeuzetest, Studieswiper en RIASEC (studie) gratis", "Rapportage en Beroepenfilter"],
  },
};

// Prijs van een test als je hem erbij koopt, bij staffel tier. In een eigen pakket gelden de (hogere) prijzen
// per test van dat pakket; de Beroepentest koop je alleen los in een eigen pakket.
export function addOnPrice(plan: Plan, test: Test, tier: number, pkg?: Pkg) {
  if (test.kind === "functional") return plan.extras.functional[tier];
  const own = pkg?.custom ? pkg.testPrices : undefined;
  if (own) {
    if (test.name === "Beroepentest") return own.beroepentest[tier];
    if (test.kind === "skills") return own.skills[tier];
    return own.test[tier];
  }
  if (test.kind === "skills") return plan.extras.skills[tier];
  return plan.extras.extraTest[tier];
}

// Studiekeuzetest op de eigen schoolwebsite: prijs per jaar bij n gekoppelde opleidingen.
export function schoolSitePrice(n: number, higherEd: boolean) {
  const span = (from: number, to: number) => Math.max(0, Math.min(n, to) - from + 1);
  if (n < 1) return 0;
  const total = 255 + span(2, 10) * 85 + span(11, 20) * 45 + span(21, 150) * 20 + span(151, 300) * 12;
  return total + (higherEd && n >= 2 ? 100 : 0);
}

// Vaste prijs van een pakket; een eigen pakket heeft geen vaste prijs.
export const packagePrice = (pkg: Pkg, tier: number) => (pkg.custom ? 0 : pkg.prices[tier]);

// Goedkoopste vaste pakket (met losse testen erbij) dat alle gekozen testen bevat, voor de tip in het paneel.
export function cheapestPackage(plan: Plan, picked: TestName[], tier: number) {
  let best: { pkg: Pkg; total: number; extras: TestName[] } | null = null;
  for (const p of plan.packages) {
    if (p.custom) continue;
    const extras = picked.filter((n) => !CONTENTS[p.id].includes(n));
    if (p.standalone && extras.length) continue; // los product: geen testen erbij
    const total = p.prices[tier] + extras.reduce((sum, n) => sum + addOnPrice(plan, testByName(n)!, tier, p), 0);
    if (!best || total < best.total) best = { pkg: p, total, extras };
  }
  return best;
}

export const euro = (n: number) => "€ " + n.toLocaleString("nl-NL");
export const euroCents = (n: number) =>
  "€ " + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
