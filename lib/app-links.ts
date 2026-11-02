// Links naar het Helios-platform (inloggen en aanmelden). Zet NEXT_PUBLIC_APP_URL op het adres van het platform
// waar de website wordt gebouwd (bijv. https://app.jouwdomein.nl); lokaal is dat de Docker-app op poort 8800.
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8800").replace(/\/+$/, "");

// Adres van deze website zelf (voor de sitemap en de voorbeeldweergave van gedeelde links).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://helioscarreer.nl").replace(/\/+$/, "");

export const LOGIN_URL = `${APP_URL}/login`;
// Zelf aanmelden als cliënt of leerling (een gratis account, zonder organisatie).
export const SIGNUP_URL = `${APP_URL}/aanmelden`;
// Een pakket bestellen voor een school of praktijk.
export const ORDER_URL = `${APP_URL}/bestellen`;

// Demo aanvragen en contact: per e-mail, zolang er geen eigen pagina's voor zijn.
export const CONTACT_EMAIL = "info@helioscarreer.nl";
export const CONTACT_URL = `mailto:${CONTACT_EMAIL}`;
export const DEMO_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demo aanvragen")}`;
// Meer informatie over een onderdeel, bijv. moreInfoUrl("Beroepentest").
export const moreInfoUrl = (topic: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Meer informatie: ${topic}`)}`;
