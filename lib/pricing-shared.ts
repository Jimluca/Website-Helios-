// Wat de prijzenpagina en de knoppen delen (ook in de browser): de vorm van de pakketten uit Helios en bedragen.

export type Price = {
  id: number;
  amount: number;
  period: "month" | "year";
  perSeat: boolean;
  trialDays: number;
  label: string;
};

export type Package = {
  id: number;
  name: string;
  description: string | null;
  includes: string[];
  /** Het soort test van een toevoeging (bijv. "Beroepen"); leeg bij gebruikers of klanten. */
  category?: string | null;
  countable: boolean;
  prices: Price[];
  orderUrl?: string;
  /** Voor wie het pakket is (sleutel uit `audiences`); leeg bij een pakket zonder doelgroep. */
  audience?: string | null;
  /** De productlijn (bijv. "Loopbaan"): pakketten met dezelfde doelgroep en productlijn verschillen in grootte. */
  family?: string | null;
  /** De grootte (bijv. "Klein" of "Organisatie"); bij een toevoeging: alleen bij pakketten van die grootte. */
  size?: string | null;
  /** Pakket: zoveel professionals en cliënten zitten erin (null: onbeperkt). */
  users?: number | null;
  clients?: number | null;
  /** Toevoeging: zoveel professionals of cliënten komen erbij. */
  extraUsers?: number;
  extraClients?: number;
  /** Per test wat het is (verkooptekst), hoe het werkt en wat het oplevert; voor de "i". */
  info?: { name: string; line: string; pitch: string; how: string; results: string[] }[];
};

export type Pricing = {
  orderable: boolean;
  orderUrl: string;
  /** De doelgroepen van de calculator, in volgorde. */
  audiences?: { key: string; label: string }[];
  packages: Package[];
  addons: Package[];
  taxPercent: number;
  noticeMonths: number;
  invoice: { enabled: boolean; days: number };
};

/** Bijv. "€ 49" of "€ 12,50". */
export function euros(cents: number): string {
  const whole = cents % 100 === 0;

  return `€ ${(cents / 100).toLocaleString("nl-NL", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
