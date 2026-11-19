import type { ReactNode } from "react";
import Icon from "@/components/site/Icon";
import s from "./ConnectArt.module.css";

// Kleine voorbeelden op app/helios-connect (versiering, daarom aria-hidden): het leadformulier zoals de school het
// instelt, en de beelden boven de kaarten van "Alles instelbaar". De keuzes zijn echte instellingen van de
// Studiekeuzetest in Helios (EmbedOptions); de namen, opleidingen en plaatsen zijn voorbeelden.

function Switch({ on }: { on: boolean }) {
  return <span className={on ? s.switchOn : s.switch} />;
}

const FIELDS: [string, string][] = [
  ["E-mailadres", "Altijd"],
  ["Voor- en achternaam", "Verplicht"],
  ["Telefoonnummer", "Optioneel"],
  ["Postcode", "Optioneel"],
  ["Vooropleiding", "Verplicht"],
  ["Gewenst startjaar", "Optioneel"],
  ["Interesse in de open dag", "Optioneel"],
];

const MOMENTS = ["Direct", "Na de uitslag", "Teaser (top 3)", "Eerst gegevens", "Eerst een account"];

/** Gegevens en toestemming: de velden met hun stand, het moment en het toestemmingsvakje (nooit vooraf aangevinkt). */
export function LeadArt() {
  return (
    <div className={`${s.panel} glass-card`} aria-hidden="true">
      <p className={s.panelHead}>
        <span className={s.panelIcon}>
          <Icon name="user" size={16} stroke={2.2} />
        </span>
        Gegevens en toestemming
      </p>
      <ul className={s.fields}>
        {FIELDS.map(([name, state]) => (
          <li key={name}>
            <span>{name}</span>
            <b className={state === "Optioneel" ? s.soft : undefined}>{state}</b>
          </li>
        ))}
      </ul>
      <p className={s.subHead}>Wanneer vragen jullie het?</p>
      <div className={s.moments}>
        {MOMENTS.map((m) => (
          <span key={m} className={m === "Na de uitslag" ? s.momentOn : s.moment}>
            {m}
          </span>
        ))}
      </div>
      <div className={s.consent}>
        <span className={s.box} />
        Ja, Jouw Hogeschool mag mij informatie sturen over opleidingen en open dagen.
      </div>
    </div>
  );
}

function Art({ children, col }: { children: ReactNode; col?: boolean }) {
  return (
    <div className={`${s.art}${col ? ` ${s.artCol}` : ""}`} aria-hidden="true">
      {children}
    </div>
  );
}

/** Opleidingen: aan en uit per opleiding en plaats, en een eigen opleiding toevoegen. */
export function EducationsArt() {
  return (
    <Art col>
      {[
        ["Verpleegkunde · Utrecht", true],
        ["Pedagogiek · Amersfoort", true],
        ["Social Work · Zwolle", false],
      ].map(([label, on]) => (
        <span key={label as string} className={s.row}>
          {label}
          <Switch on={on as boolean} />
        </span>
      ))}
      <span className={s.add}>
        <Icon name="plus" size={14} stroke={2.4} />
        Eigen opleiding toevoegen
      </span>
    </Art>
  );
}

/** Huisstijl: kleuren, lettertype, hoeken en de donkere modus. */
export function BrandArt() {
  return (
    <Art>
      <span className={s.swatches}>
        <i />
        <i />
        <i />
      </span>
      <span className={s.font}>Aa</span>
      <span className={s.brandCol}>
        <span className={s.chip}>Knop</span>
        <span className={s.row}>
          Donker
          <Switch on />
        </span>
      </span>
    </Art>
  );
}

/** Uitslag: de locaties binnen bereik van de studiekiezer. */
export function RadiusArt() {
  return (
    <Art>
      <svg className={s.map} viewBox="0 0 200 110">
        <circle cx="100" cy="55" r="48" className={s.ring} />
        <circle cx="100" cy="55" r="28" className={s.ringInner} />
        <circle cx="100" cy="55" r="5" className={s.home} />
        <circle cx="74" cy="40" r="4" className={s.pin} />
        <circle cx="128" cy="70" r="4" className={s.pin} />
        <circle cx="176" cy="22" r="4" className={s.pinOff} />
        <circle cx="22" cy="92" r="4" className={s.pinOff} />
      </svg>
      <span className={s.radiusLabel}>25 km</span>
    </Art>
  );
}
