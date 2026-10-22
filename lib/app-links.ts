// Links naar het Helios-platform (inloggen en aanmelden). Zet NEXT_PUBLIC_APP_URL op het adres van het platform
// waar de website wordt gebouwd (bijv. https://app.jouwdomein.nl); lokaal is dat de Docker-app op poort 8800.
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8800").replace(/\/+$/, "");

export const LOGIN_URL = `${APP_URL}/login`;
export const SIGNUP_URL = `${APP_URL}/aanmelden`;
