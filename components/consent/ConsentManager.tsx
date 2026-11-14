"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_HASH,
  CONSENT_KEY,
  HAS_ANALYTICS,
  HAS_MARKETING,
  parseConsent,
  readConsentRaw,
  saveConsent,
  type Choice,
} from "@/lib/consent";
import { applyConsent, removeTrackingCookies, trackPageView } from "@/lib/trackers";

// Cookiemelding: verschijnt bij het eerste bezoek als er meet- of advertentiediensten zijn ingesteld, en altijd via een
// link naar #cookie-instellingen (footer, cookieverklaring). "Alles accepteren" en "Alleen noodzakelijk" zijn even groot
// en even makkelijk; niets staat vooraf aan. Diensten laden pas na toestemming (lib/trackers.ts). Stijlen: app/pages.css
// ("cb-").

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === CONSENT_KEY && onChange();
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const SERVER = "server";

export default function ConsentManager() {
  const raw = useSyncExternalStore(subscribe, readConsentRaw, () => SERVER);
  const consent = useMemo(() => (raw === SERVER ? null : parseConsent(raw)), [raw]);
  const [reopened, setReopened] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState<Choice>({ analytics: false, marketing: false });
  const applied = useRef<Choice | null>(null);
  const pathname = usePathname();
  const firstPath = useRef(true);

  // De gekozen diensten aanzetten; bij intrekken de cookies weg en de pagina opnieuw laden (scripts zijn niet uit te
  // zetten zodra ze draaien).
  useEffect(() => {
    if (!consent) return;
    const before = applied.current;
    if (before && ((before.analytics && !consent.analytics) || (before.marketing && !consent.marketing))) {
      removeTrackingCookies();
      location.reload();
      return;
    }
    applyConsent(consent);
    applied.current = { analytics: consent.analytics, marketing: consent.marketing };
  }, [consent]);

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  // Links naar #cookie-instellingen openen de instellingen (met de huidige keuze) in plaats van te springen.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`a[href$="${CONSENT_HASH}"]`);
      if (!link) return;
      e.preventDefault();
      const current = parseConsent(readConsentRaw());
      setDraft({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      setDetails(true);
      setReopened(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const open = raw !== SERVER && (reopened || (!consent && (HAS_ANALYTICS || HAS_MARKETING)));
  if (!open) return null;

  const choose = (choice: Choice) => {
    saveConsent(choice);
    setReopened(false);
    setDetails(false);
  };

  return (
    <section className="cb" role="dialog" aria-modal="false" aria-labelledby="cb-title">
      <h2 id="cb-title" className="cb-title">
        Cookies op Helios
      </h2>
      <p className="cb-text">
        We gebruiken noodzakelijke cookies om de site te laten werken. Met jouw toestemming gebruiken we ook cookies van Google, Meta en LinkedIn om te meten
        hoe de site wordt gebruikt en om advertenties beter te laten aansluiten. Je kunt je keuze altijd wijzigen via Cookie-instellingen onderaan de pagina.
        Lees meer in de <a href="/cookies">cookieverklaring</a>.
      </p>

      {details && (
        <ul className="cb-options">
          <li>
            <span className="cb-option-text">
              <strong>Noodzakelijk</strong>
              <span>Voor het werken van de site en het onthouden van je keuzes.</span>
            </span>
            <span className="cb-always">Altijd aan</span>
          </li>
          <li>
            <label className="cb-option-text" htmlFor="cb-analytics">
              <strong>Analytisch</strong>
              <span>Google Analytics: meten hoe bezoekers de site gebruiken.</span>
            </label>
            <input
              id="cb-analytics"
              className="cb-switch"
              type="checkbox"
              role="switch"
              checked={draft.analytics}
              onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
            />
          </li>
          <li>
            <label className="cb-option-text" htmlFor="cb-marketing">
              <strong>Marketing</strong>
              <span>Google Ads, Meta en LinkedIn: advertenties meten en laten aansluiten.</span>
            </label>
            <input
              id="cb-marketing"
              className="cb-switch"
              type="checkbox"
              role="switch"
              checked={draft.marketing}
              onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
            />
          </li>
        </ul>
      )}

      <div className="cb-actions">
        <button type="button" className="cb-btn" onClick={() => choose({ analytics: true, marketing: true })}>
          Alles accepteren
        </button>
        <button type="button" className="cb-btn" onClick={() => choose({ analytics: false, marketing: false })}>
          Alleen noodzakelijk
        </button>
        {details ? (
          <button type="button" className="cb-btn cb-btn-save" onClick={() => choose(draft)}>
            Keuze opslaan
          </button>
        ) : (
          <button type="button" className="cb-link" onClick={() => setDetails(true)}>
            Zelf kiezen
          </button>
        )}
      </div>
    </section>
  );
}
