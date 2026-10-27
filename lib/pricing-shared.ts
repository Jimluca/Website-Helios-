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
  countable: boolean;
  prices: Price[];
  orderUrl?: string;
};

export type Pricing = {
  orderable: boolean;
  orderUrl: string;
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
