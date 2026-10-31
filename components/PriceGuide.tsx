"use client";

import { useState, type ReactNode } from "react";
import { euros, type Package, type Pricing as PricingData } from "@/lib/pricing-shared";

// Stap 1 van de configurator op de pagina Prijzen: vier vragen (wie ben je, welk onderwijs, hoe groot is het team,
// hoeveel leerlingen, studenten of cliënten). Met het laatste antwoord stelt hij een pakket samen uit Helios: het
// standaardpakket van die doelgroep in de kleinste grootte waarin team en aantal passen (de grenzen "Tot …
// gebruikers" en "Tot … cliënten" van Helios), plus extra professionalaccounts als het team groter is. Dat pakket gaat
// naar de prijscalculator eronder (PriceConfigurator), waar je nog kunt wisselen en toevoegen.

export type Composed = {
  packageId: number;
  extraId?: number;
  extraCount: number;
  /** Eén zin over wat er is samengesteld, voor boven de calculator. */
  summary: string;
};

type Answers = { who?: string; level?: string; team?: number; users?: number };

const LEVELS = [
  { key: "vo", label: "Middelbaar onderwijs", unit: "leerlingen" },
  { key: "mbo", label: "mbo", unit: "studenten" },
  { key: "hbo", label: "hbo", unit: "studenten" },
  { key: "wo", label: "wo", unit: "studenten" },
];

const TEAMS: { value: number; label: string; open?: boolean }[] = [
  { value: 1, label: "Alleen ik" },
  { value: 5, label: "2 tot 5 personen" },
  { value: 10, label: "6 tot 10 personen" },
  // Open naar boven: we rekenen met 11, in de calculator zet je het precieze aantal.
  { value: 11, label: "Meer dan 10 personen", open: true },
];

const COUNTS = [
  { value: 50, label: "Tot 50" },
  { value: 250, label: "50 tot 250" },
  { value: 1000, label: "250 tot 1.000" },
  { value: 5000, label: "Meer dan 1.000" },
];

/** "Tot 5 gebruikers" → 5, "Onbeperkt …" → oneindig; zonder regel: oneindig. */
function limit(pkg: Package, word: RegExp): number {
  for (const line of pkg.includes) {
    if (!word.test(line)) continue;
    const n = line.match(/(\d[\d.]*)/);
    return /onbeperkt/i.test(line) || !n ? Infinity : Number(n[1].replace(/\./g, ""));
  }
  return Infinity;
}

const usersOf = (pkg: Package) => limit(pkg, /gebruiker/i);
const clientsOf = (pkg: Package) => limit(pkg, /cliënt|client|leerling|student/i);
const hasPrice = (pkg: Package) => pkg.prices.some((p) => p.amount > 0);

/** Het samengestelde pakket bij de antwoorden, of null zolang er een antwoord ontbreekt. */
function compose(data: PricingData, answers: Answers, education: string | undefined): Composed | null {
  const needsLevel = answers.who === education && !answers.level;
  if (!answers.who || needsLevel || answers.team === undefined || answers.users === undefined) {
    return null;
  }
  const team = answers.team;
  const users = answers.users;
  const packages = data.packages.filter((p) => p.audience === answers.who);
  const sizes = [...new Set(packages.map((p) => p.size ?? ""))];
  if (!sizes.length) {
    return null;
  }
  const sampleOf = (size: string) => packages.find((p) => (p.size ?? "") === size)!;
  const size = sizes.find((s) => usersOf(sampleOf(s)) >= team && clientsOf(sampleOf(s)) >= users) ?? sizes[sizes.length - 1];
  const inSize = packages.filter((p) => (p.size ?? "") === size);
  // Het standaardpakket: het eerste betaalde pakket in de volgorde van Helios.
  const chosen = inSize.find(hasPrice) ?? inSize[0];

  const included = usersOf(chosen);
  const extraUsers = Number.isFinite(included) ? Math.max(0, team - included) : 0;
  const extra = data.addons.find((a) => a.countable && !a.category && a.includes.some((line) => /gebruiker/i.test(line)));
  const perExtra = extra ? Number(extra.includes.join(" ").match(/(\d+)\s*extra gebruiker/i)?.[1] ?? 1) : 1;
  const extraCount = extra && extraUsers > 0 ? Math.ceil(extraUsers / perExtra) : 0;

  const audience = data.audiences?.find((a) => a.key === answers.who)?.label ?? "";
  const unit = answers.who === education ? (LEVELS.find((l) => l.key === answers.level)?.unit ?? "leerlingen") : "cliënten";
  const teamOption = TEAMS.find((t) => t.value === team);
  const clients = clientsOf(chosen);
  const parts = [
    `${chosen.family ?? chosen.name}${size ? ` (${size.toLowerCase()})` : ""} voor ${audience.toLowerCase()}`,
    Number.isFinite(clients) ? `tot ${clients.toLocaleString("nl-NL")} ${unit}` : `onbeperkt ${unit}`,
  ];
  if (extraCount && extra) {
    const price = extra.prices.find((p) => p.period === "year") ?? extra.prices[0];
    parts.push(
      `${teamOption?.open ? `${extraCount} of meer` : extraCount} × ${extra.name.toLowerCase()} voor een team van ${teamOption?.label.toLowerCase()}${price ? ` (${euros(price.amount)} per stuk)` : ""}`,
    );
  }

  return {
    packageId: chosen.id,
    extraId: extra?.id,
    extraCount,
    // Bedragen blijven bij elkaar ("€ 125" niet over twee regels).
    summary: `Op basis van je antwoorden: ${parts.join(", ")}.`.replace(/€ /g, "€ "),
  };
}

function Option({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`pg-option${on ? " is-on" : ""}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

export default function PriceGuide({ data, onResult, onSkip }: { data: PricingData; onResult: (composed: Composed | null) => void; onSkip: () => void }) {
  const [answers, setAnswers] = useState<Answers>({});
  const audiences = (data.audiences ?? []).filter((a) => data.packages.some((p) => p.audience === a.key));
  const education = audiences.find((a) => a.key === "education");
  const career = audiences.find((a) => a.key === "career");

  // "Ik ben een …": de doelgroepen uit Helios, in de woorden van de bezoeker.
  const who = [
    ...(education ? [{ key: education.key, label: "Onderwijsinstelling" }] : []),
    ...(career ? [{ key: career.key, label: "Loopbaanorganisatie" }] : []),
  ];

  const isEducation = answers.who === education?.key;
  const unit = isEducation ? (LEVELS.find((l) => l.key === answers.level)?.unit ?? "leerlingen of studenten") : "cliënten";
  const needsLevel = isEducation && !answers.level;

  // Elk antwoord stelt meteen opnieuw samen; zo volgt de calculator eronder elke wijziging.
  const set = (patch: Answers, clear: (keyof Answers)[] = []) => {
    const next = { ...answers, ...patch };
    for (const key of clear) delete next[key];
    setAnswers(next);
    onResult(compose(data, next, education?.key));
  };

  let step = 0;
  const question = (text: string, children: ReactNode) => (
    <div className="pg-question" key={text}>
      <p className="pg-q">
        <span className="pg-q-num" aria-hidden="true">
          {++step}
        </span>
        {text}
      </p>
      <div className="pg-options" role="group" aria-label={text}>
        {children}
      </div>
    </div>
  );

  return (
    <section className="pg-guide" aria-labelledby="pg-title">
      <p className="pc-eyebrow">PRIJZEN</p>
      <h1 className="pc-title" id="pg-title">
        Stel jouw <span>Helios-pakket</span> samen.
      </h1>
      <p className="pc-intro">Beantwoord vier korte vragen. Wij stellen er een pakket bij samen, met de prijs. Daarna voeg je toe wat je nog nodig hebt.</p>

      {who.length === 0 ? (
        <p className="pg-empty">
          De pakketten staan hier binnenkort. <a href="mailto:info@helioscarreer.nl">Neem contact op</a> voor een pakket op maat.
        </p>
      ) : (
        <div className="pg-questions">
          {question(
            "Ik ben een",
            who.map((w) => (
              <Option key={w.key} on={answers.who === w.key} onClick={() => set({ who: w.key }, ["level"])}>
                {w.label}
              </Option>
            )),
          )}

          {isEducation &&
            question(
              "Welk onderwijs?",
              LEVELS.map((l) => (
                <Option key={l.key} on={answers.level === l.key} onClick={() => set({ level: l.key })}>
                  {l.label}
                </Option>
              )),
            )}

          {answers.who &&
            !needsLevel &&
            question(
              "Hoe groot is het team?",
              TEAMS.map((t) => (
                <Option key={t.value} on={answers.team === t.value} onClick={() => set({ team: t.value })}>
                  {t.label}
                </Option>
              )),
            )}

          {answers.who &&
            !needsLevel &&
            answers.team !== undefined &&
            question(
              `Hoeveel ${unit} gebruiken Helios?`,
              COUNTS.map((c) => (
                <Option key={c.value} on={answers.users === c.value} onClick={() => set({ users: c.value })}>
                  {c.label} {unit}
                </Option>
              )),
            )}
        </div>
      )}

      <p className="pg-skip">
        <button type="button" onClick={onSkip}>
          Liever direct zelf samenstellen
        </button>
      </p>
    </section>
  );
}
