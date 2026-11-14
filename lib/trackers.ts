import { TRACKERS, type Choice } from "./consent";

// Laadt Google (gtag.js of Tag Manager, met Consent Mode v2), de Meta-pixel en de LinkedIn Insight Tag pas na toestemming, en geeft
// een gewijzigde keuze door. Zonder toestemming wordt er niets van deze diensten geladen (ook geen cookieloze pings).

type Fn = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  q?: unknown[];
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Fn;
    fbq?: Fn;
    _fbq?: Fn;
    lintrk?: Fn;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

const loaded = { google: false, meta: false, linkedin: false };

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function googleConsent(choice: Choice) {
  const ads = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

// Google-tags die al geladen zijn, en of gtag.js zelf er al is (één script voor alle G-/AW-tags).
const googleTags = new Set<string>();
let gtagScript = false;

function google(choice: Choice) {
  // NEXT_PUBLIC_GA4_ID mag een Google-tag (G-…) zijn of een Tag Manager-container (GTM-…), zoals Google die bij de
  // gegevensstream geeft. Een container laadt gtm.js; welke tags daarin zitten, regel je in Tag Manager.
  const ids = [choice.analytics ? TRACKERS.ga4 : "", choice.marketing ? TRACKERS.googleAds : ""].filter(Boolean);

  if (!loaded.google) {
    if (!ids.length) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js en gtm.js verwachten het arguments-object zelf, geen array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("consent", "update", googleConsent(choice));
    window.gtag("js", new Date());
    loaded.google = true;
  } else {
    window.gtag?.("consent", "update", googleConsent(choice));
  }

  for (const id of ids) {
    if (googleTags.has(id)) continue;
    googleTags.add(id);
    if (id.startsWith("GTM-")) {
      addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`);
      continue;
    }
    if (!gtagScript) {
      addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
      gtagScript = true;
    }
    window.gtag!("config", id);
  }
}

function meta() {
  if (loaded.meta || !TRACKERS.meta) return;
  const fbq: Fn = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  addScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("consent", "grant");
  fbq("init", TRACKERS.meta);
  fbq("track", "PageView");
  loaded.meta = true;
}

function linkedin() {
  if (loaded.linkedin || !TRACKERS.linkedin) return;
  window._linkedin_partner_id = TRACKERS.linkedin;
  window._linkedin_data_partner_ids = [TRACKERS.linkedin];
  if (!window.lintrk) {
    // Zoals de officiële snippet: aanroepen wachten in .q tot het script er is.
    const lintrk: Fn = function (...args: unknown[]) {
      lintrk.q!.push(args);
    };
    lintrk.q = [];
    window.lintrk = lintrk;
  }
  addScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  loaded.linkedin = true;
}

/** Zet de diensten aan die bij de keuze horen. */
export function applyConsent(choice: Choice) {
  google(choice);
  if (choice.marketing) {
    meta();
    linkedin();
  }
}

/** Een paginawissel binnen de site (Google Analytics ziet die zelf via de browsergeschiedenis). */
export function trackPageView() {
  if (loaded.meta) window.fbq?.("track", "PageView");
}

// Cookies die deze diensten op ons eigen domein zetten; bij het intrekken van toestemming verwijderen we ze.
const TRACKING_COOKIE = /^(_ga|_gid|_gat|_gcl_|_fbp|_fbc|li_|lms_|_uetsid|_uetvid|AnalyticsSyncHistory|UserMatchHistory)/;

export function removeTrackingCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!TRACKING_COOKIE.test(name)) continue;
    for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
  }
}
