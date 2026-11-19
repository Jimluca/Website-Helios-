// Links naar het Helios-platform (inloggen en aanmelden). Zet NEXT_PUBLIC_APP_URL op het adres van het platform
// waar de website wordt gebouwd (bijv. https://app.jouwdomein.nl); lokaal is dat de Docker-app op poort 8800.
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8800").replace(/\/+$/, "");

// Adres van deze website zelf (voor de sitemap en de voorbeeldweergave van gedeelde links).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://helioscareer.nl").replace(/\/+$/, "");

export const LOGIN_URL = `${APP_URL}/login`;
// Zelf aanmelden als cliënt of leerling (een gratis account, zonder organisatie).
export const SIGNUP_URL = `${APP_URL}/aanmelden`;
// Een pakket bestellen voor een school of praktijk.
export const ORDER_URL = `${APP_URL}/bestellen`;

// Demo aanvragen, informatie, offerte en vragen: het contactformulier (/contact). Het platform mailt het naar het team
// (POST /api/contact); het e-mailadres staat er als alternatief bij.
export const CONTACT_EMAIL = "info@helioscareer.nl";
export const CONTACT_API = `${APP_URL}/api/contact`;
export const CONTACT_TOPICS = { demo: "Demo aanvragen", info: "Meer informatie", offerte: "Offerte", vraag: "Een vraag" } as const;
export type ContactTopic = keyof typeof CONTACT_TOPICS;

// Link naar het formulier met het onderwerp al gekozen, eventueel waarover het gaat en een begin van het bericht.
export function contactUrl(topic?: ContactTopic, about?: string, message?: string) {
  const q = new URLSearchParams();
  if (topic) q.set("onderwerp", topic);
  if (about) q.set("over", about);
  if (message) q.set("bericht", message);
  const s = q.toString();
  return s ? `/contact?${s}` : "/contact";
}

export const CONTACT_URL = contactUrl("vraag");
export const DEMO_URL = contactUrl("demo");
export const CONNECT_DEMO_URL = contactUrl("demo", "Helios Connect");
export const COACH_DEMO_URL = contactUrl("demo", "Helios Coach");
// Meer informatie over een onderdeel, bijv. moreInfoUrl("Beroepentest").
export const moreInfoUrl = (topic: string) => contactUrl("info", topic);
