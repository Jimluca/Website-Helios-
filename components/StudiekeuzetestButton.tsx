import type { ReactNode } from "react";
import Script from "next/script";
import { APP_URL, SIGNUP_URL } from "@/lib/app-links";

// "Maak de gratis studiekeuzetest": de knop opent de Studiekeuzetest van Helios over het hele scherm, net als op de
// website van een school (de code "Achter een knop" met mode="verborgen" en een eigen knop met data-helios-studiekeuzetest).
// De publieke sleutel (pk_…) komt uit Helios: Admin → Organisaties → organisatie → Studiekeuzetest op website → API
// aanmaken, met helioscareer.nl en www.helioscareer.nl als websites. Zet hem in NEXT_PUBLIC_STUDIEKEUZETEST_KEY (in
// Coolify een build-variabele). Zonder sleutel, of zolang het script nog niet geladen is, gaat de knop naar aanmelden.
const KEY = (process.env.NEXT_PUBLIC_STUDIEKEUZETEST_KEY || "").trim();
const HAS_KEY = /^pk_[a-z0-9]+$/i.test(KEY);

export default function StudiekeuzetestButton({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a className={className} href={SIGNUP_URL} {...(HAS_KEY ? { "data-helios-studiekeuzetest": "" } : {})}>
      {children}
    </a>
  );
}

// Het element van de test en het script. Staat los van de knop, direct in de pagina: het venster van de test zit in dit
// element, en binnen de hero (z-index 1) zou de vaste menubalk van de site eroverheen vallen. In de modus "verborgen"
// toont het element zelf niets.
export function StudiekeuzetestEmbed() {
  if (!HAS_KEY) return null;
  return (
    <>
      {/* "key" is in React een gereserveerd woord, dus het element staat er als HTML in. */}
      <div dangerouslySetInnerHTML={{ __html: `<helios-studiekeuzetest key="${KEY}" mode="verborgen"></helios-studiekeuzetest>` }} />
      <Script src={`${APP_URL}/embed/v1/studiekeuzetest.js`} strategy="afterInteractive" />
    </>
  );
}
