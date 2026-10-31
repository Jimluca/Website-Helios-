"use client";

import { useState, type ReactNode } from "react";
import { COUNTS, EDUCATION, LEVELS, TEAMS, unitFor, type Answers, type Composed } from "@/lib/configurator";
import { euros, type Package, type Pricing as PricingData } from "@/lib/pricing-shared";

// Het advies boven het voorgestelde pakket (ontwerp: "Ons advies"): links welk pakket we adviseren en waarom, rechts
// de antwoorden met "Wijzig antwoorden". Alles volgt uit de antwoorden en het pakket uit Helios.

// Thema's van een pakket, afgeleid van de testen die erin zitten (in deze volgorde); er staan er hoogstens vijf, de rest
// als "+3".
const MAX_THEMES = 5;
const THEMES: [RegExp, string][] = [
  [/studiekeuze/i, "Studiekeuze"],
  [/beroepentest|interessetest/i, "Loopbaanoriëntatie"],
  [/werkwaarden|loopbaanankers/i, "Waarden en drijfveren"],
  [/competentie|werkvaardigheden/i, "Talentontwikkeling"],
  [/persoonlijkheid|enneagram/i, "Persoonlijkheid"],
  [/werkhouding/i, "Werk- en studiehouding"],
  [/skills/i, "Skills"],
  [/functionele/i, "Functionele mogelijkheden"],
];

const ICONS = {
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  building: "M3 21h18M5 21V5l7-3 7 3v16M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4",
  cap: "M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5",
  team: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  people: "M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-3A3.5 3.5 0 0 0 7 18.5V20M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 20v-1a3 3 0 0 1 2-2.8M20 20v-1a3 3 0 0 0-2-2.8",
  shield:
    "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z",
  pen: "M16 3l5 5L9 20H4v-5L16 3z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6 9 17l-5-5",
};

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/** "Compleet" → "het Compleet pakket", "Eigen pakket" → "het Eigen pakket". */
const packageWord = (name: string) => (/pakket$/i.test(name) ? name : `${name} pakket`);

const tests = (pkg: Package) => pkg.includes.filter((line) => !/gebruiker|cliënt|onbeperkt|^tot /i.test(line));

export default function PriceAdvice({
  data,
  answers,
  composed,
  onEdit,
  children,
}: {
  data: PricingData;
  answers: Answers;
  composed: Composed;
  onEdit: () => void;
  /** "Jouw samenstelling" uit de calculator (Pricing): rechts in het advies. */
  children: ReactNode;
}) {
  const [why, setWhy] = useState(false);
  const pkg = data.packages.find((p) => p.id === composed.packageId);
  if (!pkg) return null;

  const name = pkg.family ?? pkg.name;
  const unit = unitFor(answers);
  const education = answers.who === EDUCATION;
  const team = answers.team ?? 1;
  const teamBand = TEAMS.find((t) => team >= t.min && team <= t.max);
  // Een band zoals gekozen, of het precieze aantal als je dat later bij het pakket hebt aangepast.
  const teamText = teamBand && teamBand.value === team ? teamBand.label : `${team} ${team === 1 ? "persoon" : "personen"}`;
  const countBand = COUNTS.find((c, i) => (answers.users ?? 0) <= c.value && (i === 0 || (answers.users ?? 0) > COUNTS[i - 1].value));
  const countText = countBand ? `${countBand.label} ${unit}` : `${answers.users} ${unit}`;
  const level = LEVELS.find((l) => l.key === answers.level)?.label;

  const themes = THEMES.filter(([test]) => tests(pkg).some((line) => test.test(line))).map(([, theme]) => theme);
  const extraUsers = composed.extras.map((e) => ({ ...e, addon: data.addons.find((a) => a.id === e.id) })).filter((e) => e.addon);
  const yearPrice = pkg.prices.find((p) => p.period === "year") ?? pkg.prices[0];

  // De prijs van het advies per jaar: het pakket plus de extra accounts (een maandprijs telt twaalf keer).
  const perYear = (item: Package) => {
    const year = item.prices.find((p) => p.period === "year");
    const month = item.prices.find((p) => p.period === "month");
    return year ? year.amount : month ? month.amount * 12 : 0;
  };
  const priceLines = [
    { label: `${name}${pkg.size ? ` (${pkg.size.toLowerCase()})` : ""}`, cents: perYear(pkg) },
    ...extraUsers.map((e) => ({ label: `${e.count} ${e.addon!.name.toLowerCase()}${e.count === 1 ? "" : "s"}`, cents: perYear(e.addon!) * e.count })),
  ];
  const totalCents = priceLines.reduce((sum, line) => sum + line.cents, 0);

  const reasons = [
    Number.isFinite(composed.includedUsers)
      ? `Er zitten ${composed.includedUsers} ${composed.includedUsers === 1 ? "gebruiker" : "gebruikers"} in${
          extraUsers.length
            ? `, voor jullie team komen er ${extraUsers.map((e) => `${e.count} ${e.addon!.name.toLowerCase()}${e.count === 1 ? "" : "s"}`).join(" en ")} bij`
            : ""
        }.`
      : "Onbeperkt gebruikers voor je hele team.",
    Number.isFinite(composed.includedClients)
      ? `Tot ${composed.includedClients.toLocaleString("nl-NL")} ${unit} per jaar.`
      : `Onbeperkt ${unit}: je betaalt niet per ${unit === "leerlingen" ? "leerling" : unit === "studenten" ? "student" : unit === "cliënten" ? "cliënt" : "persoon"}.`,
    `Dit is de voordeligste grootte (${(pkg.size ?? "").toLowerCase() || "standaard"}) voor jullie aantal${yearPrice ? `, vanaf ${euros(yearPrice.amount).replace(" ", " ")} per jaar` : ""}.`,
    tests(pkg).length
      ? `Met ${tests(pkg)
          .map((line, i) => (i ? line.replace(/^Alle /, "alle ") : line))
          .join(", ")}.`
      : "Je kiest zelf welke testen je erbij zet.",
  ];

  const rows = [
    { icon: ICONS.building, label: "Organisatie", value: education ? "Onderwijsinstelling" : "Loopbaanorganisatie" },
    ...(education && level ? [{ icon: ICONS.cap, label: "Onderwijs", value: level }] : []),
    { icon: ICONS.team, label: "Teamgrootte", value: teamText },
    { icon: ICONS.people, label: `Aantal ${unit}`, value: countText.replace(` ${unit}`, "") },
  ];

  return (
    <section className="pa" aria-labelledby="pa-title">
      <div className="pa-main">
        <p className="pa-badge">
          <span className="pa-badge-icon">
            <Icon d={ICONS.spark} size={14} />
          </span>
          ONS ADVIES
        </p>
        <h2 className="pa-title" id="pa-title">
          Op basis van jouw antwoorden adviseren wij het <span>{packageWord(name)}.</span>
        </h2>
        <p className="pa-text">
          Dit pakket sluit het beste aan bij {education ? "onderwijsinstellingen" : "loopbaanorganisaties"} met {countText.toLowerCase()} en een teamgrootte van{" "}
          {teamText.toLowerCase()}. {pkg.description ?? ""} Hieronder voeg je nog toe wat je nodig hebt.
        </p>
        <div className="pa-price">
          <p className="pa-price-total">
            <strong>{euros(totalCents)}</strong>
            <span>per jaar, excl. btw</span>
          </p>
          {priceLines.length > 1 && (
            <p className="pa-price-lines">
              {priceLines.map((line, i) => (
                <span key={line.label}>
                  {i > 0 && <span aria-hidden="true"> + </span>}
                  {line.label} {euros(line.cents).replace(" ", " ")}
                </span>
              ))}
            </p>
          )}
          {priceLines.length === 1 && <p className="pa-price-lines">{priceLines[0].label}</p>}
        </div>
        <button type="button" className="pa-why" aria-expanded={why} onClick={() => setWhy((v) => !v)}>
          Waarom dit pakket?
          <Icon d={ICONS.arrow} size={16} />
        </button>
        {why && (
          <ul className="pa-reasons">
            {reasons.map((reason) => (
              <li key={reason}>
                <Icon d={ICONS.check} size={15} />
                {reason}
              </li>
            ))}
          </ul>
        )}

        {/* De antwoorden kort onder het advies; de samenstelling staat rechts. */}
        <div className="pa-answers">
          <div className="pa-answers-head">
            <h3>Jouw antwoorden</h3>
            <button type="button" onClick={onEdit}>
              <Icon d={ICONS.pen} size={14} />
              Wijzig antwoorden
            </button>
          </div>
          <ul className="pa-answer-list">
            {rows.map((row) => (
              <li key={row.label} title={row.label}>
                <Icon d={row.icon} size={15} />
                <span className="sr-only">{row.label}: </span>
                {row.value}
                {row.label.startsWith("Aantal") ? ` ${unit}` : ""}
              </li>
            ))}
          </ul>
          {themes.length > 0 && (
            <p className="pa-themes">
              <span className="pa-themes-label">Thema&apos;s</span>
              {themes.slice(0, MAX_THEMES).map((theme) => (
                <span key={theme} className="pa-chip">
                  {theme}
                </span>
              ))}
              {themes.length > MAX_THEMES && (
                <span className="pa-chip pa-chip-more" title={themes.slice(MAX_THEMES).join(", ")}>
                  +{themes.length - MAX_THEMES}
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}
