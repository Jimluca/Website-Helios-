// Toestemming voor cookies (AVG en Telecommunicatiewet): noodzakelijk altijd, analytisch (Google Analytics) en marketing
// (Google Ads, Meta, LinkedIn) alleen na een keuze in de cookiemelding. De keuze staat in localStorage, met datum en
// versie; na 12 maanden, of bij een nieuwe versie (andere diensten), vragen we opnieuw.

export const CONSENT_KEY = "helios-consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

// Een link met deze hash (bijv. "Cookie-instellingen" in de footer) opent de instellingen opnieuw.
export const CONSENT_HASH = "#cookie-instellingen";
export const CONSENT_CHANGE_EVENT = "helios-consent-change";

export type Consent = { v: number; at: string; analytics: boolean; marketing: boolean };
export type Choice = Pick<Consent, "analytics" | "marketing">;

// De meet- en advertentiediensten, per omgeving in te stellen bij het bouwen (Coolify: Build Variables). Leeg = uit.
export const TRACKERS = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "",
};

export const HAS_ANALYTICS = !!TRACKERS.ga4;
export const HAS_MARKETING = !!(TRACKERS.googleAds || TRACKERS.meta || TRACKERS.linkedin);

// Wat er echt aan staat. De cookiemelding, de cookieverklaring en de privacyverklaring noemen alleen deze diensten;
// komt er een ID bij, dan verschijnt die dienst daar vanzelf.
const only = (items: (string | false)[]) => items.filter((s): s is string => !!s);

/** Advertentiediensten die aan staan, bijv. ["Google Ads", "Meta"]. */
export const MARKETING_SERVICES = only([!!TRACKERS.googleAds && "Google Ads", !!TRACKERS.meta && "Meta", !!TRACKERS.linkedin && "LinkedIn"]);

/** Bedrijven die na toestemming cookies plaatsen, bijv. ["Google"]. */
export const TRACKING_COMPANIES = only([(HAS_ANALYTICS || !!TRACKERS.googleAds) && "Google", !!TRACKERS.meta && "Meta", !!TRACKERS.linkedin && "LinkedIn"]);

/** "A", "A en B", "A, B en C". */
export function joinNl(items: string[]) {
  return items.length < 2 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<Consent>;
    if (c.v !== CONSENT_VERSION || typeof c.at !== "string") return null;
    if (!(Date.now() - Date.parse(c.at) < MAX_AGE_MS)) return null;
    return { v: c.v, at: c.at, analytics: c.analytics === true, marketing: c.marketing === true };
  } catch {
    return null;
  }
}

export function readConsentRaw(): string {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveConsent(choice: Choice) {
  const consent: Consent = { v: CONSENT_VERSION, at: new Date().toISOString(), ...choice };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Opslaan kan niet (privévenster): de keuze geldt dan alleen voor deze pagina.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
}
