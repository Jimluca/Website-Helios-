import { euros, type Package, type Pricing } from "@/lib/pricing-shared";

// De configurator op de pagina Prijzen: van antwoorden (wie, welk onderwijs, hoeveel professionals, hoeveel leerlingen,
// studenten of cliënten) naar één pakket uit Helios. Alles komt uit Helios: doelgroepen, pakketten per grootte, de
// grenzen "Tot … gebruikers/cliënten" en de toevoegingen voor extra gebruikers of cliënten.

export type Answers = { who?: string; level?: string; team?: number; users?: number };

export type Composed = {
  packageId: number;
  /** Toevoegingen die bij de antwoorden horen (extra gebruikers of cliënten), met hun aantal. */
  extras: { id: number; count: number }[];
  family: string | null;
  /** Wat er in het pakket zit aan gebruikers en cliënten (Infinity = onbeperkt). */
  includedUsers: number;
  includedClients: number;
  summary: string;
};

export const LEVELS = [
  { key: "vo", label: "Middelbaar onderwijs", unit: "leerlingen" },
  { key: "mbo", label: "mbo", unit: "studenten" },
  { key: "hbo", label: "hbo", unit: "studenten" },
  { key: "wo", label: "wo", unit: "studenten" },
];

/** Teamgrootte: een antwoord valt in een band (min tot en met max); value is waarmee we rekenen. */
export const TEAMS = [
  { value: 1, min: 1, max: 1, label: "Alleen ik" },
  { value: 5, min: 2, max: 5, label: "2 tot 5 personen" },
  { value: 10, min: 6, max: 10, label: "6 tot 10 personen" },
  { value: 11, min: 11, max: Infinity, label: "Meer dan 10 personen" },
];

export const COUNTS = [
  { value: 50, label: "Tot 50" },
  { value: 250, label: "50 tot 250" },
  { value: 1000, label: "250 tot 1.000" },
  { value: 5000, label: "Meer dan 1.000" },
];

export const EDUCATION = "education";

/** leerlingen (middelbaar), studenten (mbo, hbo, wo) of cliënten (loopbaan). */
export function unitFor(answers: Answers): string {
  if (answers.who !== EDUCATION) return "cliënten";
  return LEVELS.find((l) => l.key === answers.level)?.unit ?? "leerlingen of studenten";
}

/** "Tot 5 gebruikers" → 5, "Onbeperkt …" → oneindig; zonder regel: oneindig. */
function limit(pkg: Package, word: RegExp): number {
  for (const line of pkg.includes) {
    if (!word.test(line)) continue;
    const n = line.match(/(\d[\d.]*)/);
    return /onbeperkt/i.test(line) || !n ? Infinity : Number(n[1].replace(/\./g, ""));
  }
  return Infinity;
}

const USERS = /gebruiker/i;
const CLIENTS = /cliënt|client|leerling|student/i;
export const usersOf = (pkg: Package) => limit(pkg, USERS);
export const clientsOf = (pkg: Package) => limit(pkg, CLIENTS);

/** De toevoeging voor extra gebruikers of extra cliënten (per stuk te kopen), met hoeveel er per stuk bij komen. */
export function extraAddon(data: Pricing, word: RegExp): { addon: Package; per: number } | null {
  const addon = data.addons.find((a) => a.countable && !a.category && a.includes.some((line) => word.test(line)));
  if (!addon) return null;
  const per = Number(
    addon.includes
      .map((line) => line.match(/(\d[\d.]*)/)?.[1])
      .find(Boolean)
      ?.replace(/\./g, "") ?? 1,
  );
  return { addon, per: per || 1 };
}

/** Een toevoeging die de antwoorden zelf regelen (extra gebruikers of cliënten); die staat niet bij "Voeg nog iets toe". */
export const isCountAddon = (addon: Package) => addon.countable && !addon.category;

const yearCents = (item: Package) => {
  const year = item.prices.find((p) => p.period === "year");
  if (year) return year.amount;
  const month = item.prices.find((p) => p.period === "month");
  return month ? month.amount * 12 : 0;
};

const isComplete = (answers: Answers) =>
  !!answers.who && !(answers.who === EDUCATION && !answers.level) && answers.team !== undefined && answers.users !== undefined;

/**
 * Het pakket bij de antwoorden, of null zolang er een antwoord ontbreekt. Per grootte: het pakket uit dezelfde
 * productlijn (de gekozen, anders de eerste betaalde in de volgorde van Helios), plus extra gebruikers en cliënten als
 * het team of het aantal groter is. De goedkoopste mogelijkheid wint; bij gelijke prijs de kleinere grootte.
 */
export function compose(data: Pricing, answers: Answers, family: string | null = null): Composed | null {
  if (!isComplete(answers)) return null;
  const team = Math.max(1, answers.team!);
  const users = Math.max(1, answers.users!);
  const packages = data.packages.filter((p) => p.audience === answers.who);
  const sizes = [...new Set(packages.map((p) => p.size ?? ""))];
  const extraUsers = extraAddon(data, USERS);
  const extraClients = extraAddon(data, CLIENTS);

  let best: (Composed & { cost: number }) | null = null;
  for (const size of sizes) {
    const inSize = packages.filter((p) => (p.size ?? "") === size);
    const pkg = (family && inSize.find((p) => p.family === family)) || inSize.find((p) => p.prices.some((price) => price.amount > 0)) || inSize[0];
    if (!pkg) continue;
    const u = usersOf(pkg);
    const c = clientsOf(pkg);
    const needUsers = Number.isFinite(u) ? Math.max(0, team - u) : 0;
    const needClients = Number.isFinite(c) ? Math.max(0, users - c) : 0;
    if ((needUsers && !extraUsers) || (needClients && !extraClients)) continue;
    const extras = [
      ...(needUsers && extraUsers ? [{ id: extraUsers.addon.id, count: Math.ceil(needUsers / extraUsers.per) }] : []),
      ...(needClients && extraClients ? [{ id: extraClients.addon.id, count: Math.ceil(needClients / extraClients.per) }] : []),
    ];
    const cost = yearCents(pkg) + extras.reduce((sum, e) => sum + e.count * yearCents(data.addons.find((a) => a.id === e.id)!), 0);
    if (!best || cost < best.cost) {
      best = { packageId: pkg.id, extras, family: pkg.family ?? null, includedUsers: u, includedClients: c, summary: "", cost };
    }
  }
  if (!best) return null;

  const pkg = data.packages.find((p) => p.id === best.packageId)!;
  const audience = data.audiences?.find((a) => a.key === answers.who)?.label ?? "";
  const unit = unitFor(answers);
  const parts = [
    `${pkg.family ?? pkg.name}${pkg.size ? ` (${pkg.size.toLowerCase()})` : ""} voor ${audience.toLowerCase()}`,
    `${team} ${team === 1 ? "professional" : "professionals"}`,
    Number.isFinite(best.includedClients) && best.includedClients >= users
      ? `tot ${best.includedClients.toLocaleString("nl-NL")} ${unit}`
      : Number.isFinite(best.includedClients)
        ? `${users.toLocaleString("nl-NL")} ${unit}`
        : `onbeperkt ${unit}`,
  ];
  for (const extra of best.extras) {
    const addon = data.addons.find((a) => a.id === extra.id)!;
    parts.push(`${extra.count} × ${addon.name.toLowerCase()} (${euros(yearCents(addon))} per stuk per jaar)`);
  }
  // Bedragen blijven bij elkaar ("€ 125" niet over twee regels).
  const summary = `Op basis van je antwoorden: ${parts.join(", ")}.`.replace(/€ /g, "€ ");

  return { ...best, summary };
}
