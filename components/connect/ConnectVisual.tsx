import type { ReactNode } from "react";
import s from "./ConnectVisual.module.css";

// Beeld rechts in de hero van Helios Connect (app/helios-connect): de studiekeuzetest op de site van een hogeschool in
// haar eigen huisstijl, met de instellingen en de lead die eruit komt. Alle namen, opleidingen en percentages zijn
// voorbeeldgegevens.

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const MATCHES = [
  { name: "Verpleegkunde", pct: 92 },
  { name: "Pedagogiek", pct: 81 },
  { name: "Social Work", pct: 67 },
];

export default function ConnectVisual() {
  return (
    <div
      className={s.visual}
      role="img"
      aria-label="Voorbeeld: de studiekeuzetest op de website van een hogeschool in haar eigen huisstijl, met toestemming voor contact. Rechtsboven de instellingen (opleidingen, wanneer gegevens gevraagd worden, velden, CRM-koppeling en huisstijl), linksonder een nieuwe lead met beste match, startjaar en toestemming, op weg naar het CRM."
    >
      <div className={s.glow} aria-hidden="true" />

      {/* De website van de hogeschool, in haar eigen kleuren */}
      <div className={s.browser} aria-hidden="true">
        <div className={s.chrome}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.url}>
            <Svg>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </Svg>
            jouwhogeschool.nl/studiekeuzetest
          </span>
        </div>

        <div className={s.site}>
          <div className={s.siteNav}>
            <span className={s.siteLogo}>
              <b>JH</b>
              Jouw Hogeschool
            </span>
            <span className={s.siteLinks}>
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className={s.siteBody}>
            <span className={s.siteChip}>Studiekeuzetest</span>
            <p className={s.siteTitle}>Welke opleiding past bij jou?</p>
            <p className={s.siteSub}>Jouw beste matches binnen onze opleidingen</p>

            <ul className={s.matches}>
              {MATCHES.map((m) => (
                <li key={m.name}>
                  <span className={s.matchName}>{m.name}</span>
                  <span className={s.matchBar}>
                    <span style={{ width: `${m.pct}%` }} />
                  </span>
                  <span className={s.matchPct}>{m.pct}%</span>
                </li>
              ))}
            </ul>

            <div className={s.optin}>
              <span className={s.box}>
                <Svg>
                  <path d="M20 6 9 17l-5-5" />
                </Svg>
              </span>
              Ja, stuur mij informatie over de open dagen
            </div>
            <span className={s.siteBtn}>Bekijk mijn uitslag</span>
          </div>
        </div>
      </div>

      {/* Instellingen: alles in te richten */}
      <div className={`${s.float} ${s.settings}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Svg>
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
              <path d="M1 14h6M9 8h6M17 16h6" />
            </Svg>
          </span>
          Jullie instellingen
        </p>
        <ul className={s.settingList}>
          <li>
            <span>Opleidingen</span>
            <b>42 gekoppeld</b>
          </li>
          <li>
            <span>Gegevens</span>
            <b>Na de uitslag</b>
          </li>
          <li>
            <span>Velden</span>
            <b>6 gekozen</b>
          </li>
          <li>
            <span>CRM-koppeling</span>
            <span className={s.toggle} />
          </li>
          <li>
            <span>Huisstijl</span>
            <span className={s.swatches}>
              <i />
              <i />
              <i />
            </span>
          </li>
        </ul>
      </div>

      {/* De lead die eruit komt */}
      <div className={`${s.float} ${s.lead}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Svg>
              <circle cx="9" cy="8" r="4" />
              <path d="M2 21a7 7 0 0 1 14 0" />
              <path d="M19 8v6M16 11h6" />
            </Svg>
          </span>
          Nieuwe lead
          <span className={s.now}>zojuist</span>
        </p>
        <ul className={s.leadList}>
          <li>
            <span>Beste match</span>
            <b>Verpleegkunde · 92%</b>
          </li>
          <li>
            <span>Startjaar</span>
            <b>2027</b>
          </li>
          <li>
            <span>Toestemming</span>
            <b className={s.ok}>Contact</b>
          </li>
        </ul>
        <span className={s.campaign}>
          <Svg>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </Svg>
          Naar HubSpot · Open dag
        </span>
      </div>
    </div>
  );
}
