import { euros, type Package, type Pricing } from "@/lib/pricing-shared";

// De configurator op de pagina Prijzen: van antwoorden (wie, welk onderwijs, hoeveel professionals, hoeveel leerlingen,
// studenten of cliënten) naar één pakket uit Helios. De prijslijst heeft kolommen: een pakket bestaat per aantal
// cliënten per jaar (de grootte, bijv. "t/m 25"), met 1 professional. Het aantal cliënten kiest de kolom; extra
// professionals zijn een toevoeging (tot MAX_PROFESSIONALS in totaal) en brengen geen cliënten mee. Meer professionals
// of cliënten dan de grootste kolom: "neem contact op". Pakketten, kolommen en prijzen komen uit Helios; alleen het
// maximum aantal professionals staat hier.

/** Tot zoveel professionals stel je zelf samen; daarboven maken we een pakket op maat. */
export const MAX_PROFESSIONALS = 5;

export const EDUCATION = "education";

export type Answers = { who?: string; level?: string; team?: number; users?: number };

export type Composed = {
  packageId: number;
  /** De toevoegingen bij de antwoorden: de cliëntentrede en de extra professionals, met hun aantal. */
  extras: { id: number; count: number }[];
  family: string | null;
  /** Wat er in het pakket zit (Infinity = onbeperkt). */
  includedUsers: number;
  includedClients: number;
  /** Professionals en cliënten met de toevoegingen erbij. */
  users: number;
  clients: number;
  /** Meer gevraagd dan zelf samen te stellen is: dan "neem contact op". */
  contact: ("team" | "clients")[];
  summary: string;
};

export type Option = { value: number; label: string; contact?: boolean };

export const LEVELS = [
  { key: "vo", label: "Middelbaar onderwijs", unit: "leerlingen" },
  { key: "mbo", label: "mbo", unit: "studenten" },
  { key: "hbo", label: "hbo", unit: "studenten" },
  { key: "wo", label: "wo", unit: "studenten" },
];

/** leerlingen (middelbaar), studenten (mbo, hbo, wo) of cliënten (loopbaan). */
export function unitFor(answers: Answers): string {
  if (answers.who !== EDUCATION) return "cliënten";
  return LEVELS.find((l) => l.key === answers.level)?.unit ?? "leerlingen of studenten";
}

/** "Tot 5 gebruikers" → 5, "Onbeperkt …" → oneindig; zonder regel: oneindig. Voor Helios zonder de velden users/clients. */
function limit(pkg: Package, word: RegExp): number {
  for (const line of pkg.includes) {
    if (!word.test(line)) continue;
    const n = line.match(/(\d[\d.]*)/);
    return /onbeperkt/i.test(line) || !n ? Infinity : Number(n[1].replace(/\./g, ""));
  }
  return Infinity;
}

export const usersOf = (pkg: Package) => (pkg.users === undefined ? limit(pkg, /gebruiker/i) : (pkg.users ?? Infinity));
export const clientsOf = (pkg: Package) => (pkg.clients === undefined ? limit(pkg, /cliënt|client|leerling|student/i) : (pkg.clients ?? Infinity));

/** Een toevoeging voor één doelgroep (bijv. een test tegen de onderwijsprijs) hoort alleen bij een pakket van die doelgroep. */
export const fitsAudience = (addon: Package, audience: string | null | undefined) => !addon.audience || !audience || addon.audience === audience;

/** Wat een cliëntentrede kost bovenop $base (het pakket en de testen, in centen): ClientSurcharge in Helios (oude prijslijst). */
export function surchargeAmount(tier: Package, base: number): number {
  const raw = Math.max((base * (tier.surcharge ?? 0)) / 100, tier.surchargeMin ?? 0);
  const round = tier.roundTo || 500;

  return Math.round(raw / round) * round;
}

/** Een toevoeging die professionals of cliënten toevoegt; die regel je met de aantallen, niet bij de losse modules. */
export const isLimitAddon = (addon: Package) =>
  (addon.extraUsers ?? 0) > 0 || (addon.extraClients ?? 0) > 0 || (addon.countable && !addon.category && !addon.embed && !addon.unit);

/** De toevoeging voor een extra professional (bij de doelgroep: in het onderwijs is hij goedkoper). */
export const professionalAddon = (data: Pricing, audience?: string | null) =>
  data.addons.find((a) => (a.extraUsers ?? 0) > 0 && fitsAudience(a, audience)) ??
  data.addons.find((a) => a.countable && !a.category && a.includes.some((l) => /gebruiker/i.test(l))) ??
  null;

/** De kolommen van een pakket: dezelfde doelgroep en productlijn in elke grootte, van weinig naar veel cliënten. */
export function clientSteps(data: Pricing, pkg: Package | null): { pkg: Package | null; total: number }[] {
  if (!pkg || !Number.isFinite(clientsOf(pkg))) return [{ pkg, total: pkg ? clientsOf(pkg) : Infinity }];
  const columns = data.packages
    .filter((p) => p.audience === pkg.audience && (p.family ?? p.name) === (pkg.family ?? pkg.name) && Number.isFinite(clientsOf(p)))
    .map((p) => ({ pkg: p as Package | null, total: clientsOf(p) }))
    .sort((a, b) => a.total - b.total);
  return columns.length ? columns : [{ pkg, total: clientsOf(pkg) }];
}

/**
 * Het pakket van een doelgroep voor een aantal cliënten: de gekozen productlijn (anders de eerste betaalde in de
 * volgorde van Helios), in de kleinste kolom waar ze in passen (anders de grootste).
 */
export function standardPackage(data: Pricing, who: string | undefined, family: string | null = null, clients = 1): Package | null {
  const packages = data.packages.filter((p) => p.audience === who);
  const first = (family && packages.find((p) => p.family === family)) || packages.find((p) => p.prices.some((price) => price.amount > 0)) || packages[0];
  if (!first) return null;
  const steps = clientSteps(data, first);
  return (steps.find((step) => step.total >= clients) ?? steps[steps.length - 1]).pkg ?? first;
}

/** De keuzes bij "Hoe groot is het team?": 1 tot MAX_PROFESSIONALS, en meer (dan contact). */
export function teamOptions(): Option[] {
  return [
    ...Array.from({ length: MAX_PROFESSIONALS }, (_, i) => ({ value: i + 1, label: i ? `${i + 1} personen` : "Alleen ik" })),
    { value: MAX_PROFESSIONALS + 1, label: `Meer dan ${MAX_PROFESSIONALS} personen`, contact: true },
  ];
}

/** De keuzes bij "Hoeveel … gebruiken Helios?": de kolommen van de prijslijst, en meer dan de grootste (dan contact). */
export function clientOptions(data: Pricing, who: string | undefined, unit: string): Option[] {
  const steps = clientSteps(data, standardPackage(data, who));
  if (!Number.isFinite(steps[0].total)) return [{ value: Infinity, label: `Onbeperkt ${unit}` }];
  const max = steps[steps.length - 1].total;
  return [
    ...steps.map((s) => ({ value: s.total, label: `Tot en met ${s.total.toLocaleString("nl-NL")} ${unit}` })),
    { value: max + 1, label: `Meer dan ${max.toLocaleString("nl-NL")} ${unit}`, contact: true },
  ];
}

/** De toevoegingen voor een aantal professionals en cliënten bij een pakket (binnen wat zelf samen te stellen is). */
export function limitExtras(
  data: Pricing,
  pkg: Package,
  team: number,
  clients: number,
): { extras: { id: number; count: number }[]; users: number; clients: number } {
  const extras: { id: number; count: number }[] = [];
  const included = usersOf(pkg);
  const prof = professionalAddon(data, pkg.audience);
  let users = included;
  if (Number.isFinite(included) && prof) {
    const want = Math.min(Math.max(1, team), MAX_PROFESSIONALS);
    const count = Math.ceil(Math.max(0, want - included) / (prof.extraUsers || 1));
    if (count) extras.push({ id: prof.id, count });
    users = included + count * (prof.extraUsers || 1);
  }
  // De cliënten komen uit de kolom van het pakket (compose kiest de kolom bij het aantal).
  void clients;
  return { extras, users, clients: clientsOf(pkg) };
}

const yearCents = (item: Package) => {
  const year = item.prices.find((p) => p.period === "year");
  if (year) return year.amount;
  const month = item.prices.find((p) => p.period === "month");
  return month ? month.amount * 12 : 0;
};

const isComplete = (answers: Answers) =>
  !!answers.who && !(answers.who === EDUCATION && !answers.level) && answers.team !== undefined && answers.users !== undefined;

/** Het pakket bij de antwoorden, of null zolang er een antwoord ontbreekt. */
export function compose(data: Pricing, answers: Answers, family: string | null = null): Composed | null {
  if (!isComplete(answers)) return null;
  const team = Math.max(1, answers.team!);
  const wanted = Math.max(1, answers.users!);
  const pkg = standardPackage(data, answers.who, family, wanted);
  if (!pkg) return null;
  const { extras, users, clients } = limitExtras(data, pkg, team, wanted);
  const contact: Composed["contact"] = [];
  if (team > MAX_PROFESSIONALS) contact.push("team");
  if (Number.isFinite(clients) && wanted > clients) contact.push("clients");

  const audience = data.audiences?.find((a) => a.key === answers.who)?.label ?? "";
  const unit = unitFor(answers);
  const parts = [
    `${pkg.family ?? pkg.name} voor ${audience.toLowerCase()}`,
    `${users} ${users === 1 ? "professional" : "professionals"}`,
    Number.isFinite(clients) ? `tot en met ${clients.toLocaleString("nl-NL")} ${unit} per jaar (${euros(yearCents(pkg))} per jaar)` : `onbeperkt ${unit}`,
  ];
  for (const extra of extras) {
    const addon = data.addons.find((a) => a.id === extra.id)!;
    const cents = addon.surcharge ? surchargeAmount(addon, yearCents(pkg)) : yearCents(addon) * extra.count;
    parts.push(`${extra.count > 1 ? `${extra.count} × ` : ""}${addon.name.toLowerCase()} (${euros(cents)} per jaar)`);
  }
  // Bedragen blijven bij elkaar ("€ 125" niet over twee regels).
  const summary = `Op basis van je antwoorden: ${parts.join(", ")}.`.replace(/€ /g, "€ ");

  return {
    packageId: pkg.id,
    extras,
    family: pkg.family ?? null,
    includedUsers: usersOf(pkg),
    includedClients: clientsOf(pkg),
    users,
    clients,
    contact,
    summary,
  };
}
