// Wat de prijzenpagina en de knoppen delen (ook in de browser): de vorm van de pakketten uit Helios en bedragen.

export type Price = {
  id: number;
  amount: number;
  period: "month" | "year";
  perSeat: boolean;
  /** Een staffel: de prijs per stuk tot een aantal (de laatste zonder einde), in centen; null: één prijs per stuk. */
  tiers?: { up_to: number | null; amount: number }[] | null;
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
  /** Wat één stuk is bij een toevoeging per stuk, bijv. "opleidingen" of "professionals". */
  unit?: string | null;
  /** De testen die het geeft (ids); een toevoeging zonder testen (bijv. de studiekeuzetest op de website) kan zonder pakket. */
  tests?: number[];
  /** De studiekeuzetest op de eigen website van de school. */
  embed?: boolean;
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
  /** Cliëntentrede: kost dit percentage van het pakket en de testen, minimaal surchargeMin (centen), afgerond op roundTo. */
  surcharge?: number;
  surchargeMin?: number;
  roundTo?: number;
  /** Een pakket of test (geen extra professional of trede): waar het percentage van een trede over gaat. */
  countsForSurcharge?: boolean;
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
  /** De doelgroepen zonder btw (Onderwijs, CRKBO): hun prijzen zijn btw-vrij. */
  vatExempt?: string[];
  noticeMonths: number;
  invoice: { enabled: boolean; days: number };
};

/** Wat een aantal stuks kost: prijs × aantal, of bij een staffel elk stuk de prijs van zijn trede (zoals in Helios). */
export function priceTotal(price: Price, units: number): number {
  const count = Math.max(1, units);
  if (!price.tiers?.length) return price.amount * count;
  let sum = 0;
  let from = 0;
  for (const tier of price.tiers) {
    const to = tier.up_to === null ? count : Math.min(count, tier.up_to);
    if (to > from) {
      sum += (to - from) * tier.amount;
      from = to;
    }
    if (from >= count) break;
  }
  return sum;
}

/** "excl. 21% btw", of "btw-vrij" voor een doelgroep zonder btw (Onderwijs). */
export function vatText(data: Pricing, audience: string | null | undefined): string {
  return audience && data.vatExempt?.includes(audience) ? "btw-vrij" : `excl. ${data.taxPercent}% btw`;
}

/** Bijv. "€ 49" of "€ 12,50". */
export function euros(cents: number): string {
  const whole = cents % 100 === 0;

  return `€ ${(cents / 100).toLocaleString("nl-NL", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
