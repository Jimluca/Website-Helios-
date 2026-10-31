"use client";

import { useState, type ReactNode } from "react";
import { CHOOSE_EVENT } from "@/lib/pricing-events";
import { euros, type Package, type Pricing as PricingData } from "@/lib/pricing-shared";

// Het begin van de pagina Prijzen: vier vragen (wie ben je, welk onderwijs, hoe groot is het team, hoeveel leerlingen,
// studenten of cliënten) en daarna de pakketten uit Helios die daarbij passen. Alles komt uit Helios: de doelgroepen,
// de pakketten per grootte en hun prijzen. De grootte is de kleinste waarin het team en het aantal gebruikers passen
// (de grenzen "Tot … gebruikers" en "Tot … cliënten" van Helios); is het team groter, dan komen er extra
// professionalaccounts bij. "Kies" zet het pakket in de prijscalculator eronder (#zelf-samenstellen).

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

function yearPrice(pkg: Package): { cents: number; text: string } | null {
  const year = pkg.prices.find((p) => p.period === "year");
  if (year) return { cents: year.amount, text: "per jaar" };
  const month = pkg.prices.find((p) => p.period === "month");
  return month ? { cents: month.amount, text: "per maand" } : null;
}

function Option({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`pg-option${on ? " is-on" : ""}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function PriceGuide({ data }: { data: PricingData | null }) {
  const [answers, setAnswers] = useState<Answers>({});
  const audiences = (data?.audiences ?? []).filter((a) => data?.packages.some((p) => p.audience === a.key));
  const education = audiences.find((a) => a.key === "education");
  const career = audiences.find((a) => a.key === "career");

  // "Ik ben een …": de doelgroepen uit Helios, in de woorden van de bezoeker.
  const WHO = [
    ...(education ? [{ key: education.key, label: "Onderwijsinstelling" }] : []),
    ...(career ? [{ key: career.key, label: "Loopbaanorganisatie" }] : []),
  ];

  const isEducation = answers.who === education?.key;
  const unit = isEducation ? (LEVELS.find((l) => l.key === answers.level)?.unit ?? "leerlingen of studenten") : "cliënten";
  const needsLevel = isEducation && !answers.level;

  const set = (patch: Answers, clear: (keyof Answers)[]) =>
    setAnswers((now) => {
      const next = { ...now, ...patch };
      for (const key of clear) delete next[key];
      return next;
    });

  // De pakketten van de gekozen doelgroep, per grootte (in de volgorde van Helios: klein eerst).
  const packages = data?.packages.filter((p) => p.audience === answers.who) ?? [];
  const sizes = [...new Set(packages.map((p) => p.size ?? ""))];
  const done = answers.who !== undefined && !needsLevel && answers.team !== undefined && answers.users !== undefined;

  let size = "";
  let extraUsers = 0;
  if (done && sizes.length) {
    const fits = sizes.find((s) => {
      const sample = packages.find((p) => (p.size ?? "") === s)!;
      return usersOf(sample) >= answers.team! && clientsOf(sample) >= answers.users!;
    });
    size = fits ?? sizes[sizes.length - 1];
    const sample = packages.find((p) => (p.size ?? "") === size)!;
    extraUsers = Math.max(0, answers.team! - (Number.isFinite(usersOf(sample)) ? usersOf(sample) : answers.team!));
  }
  const offered = packages.filter((p) => (p.size ?? "") === size);
  const extraAddon = data?.addons.find((a) => a.countable && !a.category && a.includes.some((line) => /gebruiker/i.test(line)));
  const perExtra = extraAddon ? Number(extraAddon.includes.join(" ").match(/(\d+)\s*extra gebruiker/i)?.[1] ?? 1) : 1;
  const extraCount = extraAddon && extraUsers > 0 ? Math.ceil(extraUsers / perExtra) : 0;
  const extraPrice = extraAddon ? yearPrice(extraAddon) : null;

  const choose = (pkg: Package) => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("pakket", String(pkg.id));
    if (extraCount && extraAddon) {
      url.searchParams.set("extra", `${extraAddon.id}:${extraCount}`);
    }
    url.hash = "zelf-samenstellen";
    window.history.replaceState(null, "", url.toString());
    window.dispatchEvent(new Event(CHOOSE_EVENT));
    document.getElementById("zelf-samenstellen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sizeLabel = size ? size.toLowerCase() : "";
  let step = 0;

  return (
    <section className="pg-guide" aria-labelledby="pg-title">
      <p className="pc-eyebrow">PRIJZEN</p>
      <h1 className="pc-title" id="pg-title">
        Welk <span>Helios-pakket</span> past bij jou?
      </h1>
      <p className="pc-intro">Beantwoord vier korte vragen en zie meteen welke pakketten bij je passen, met hun prijs. Of stel zelf een pakket samen.</p>

      {!data || !WHO.length ? (
        <p className="pg-empty">
          De pakketten staan hier binnenkort. <a href="mailto:info@helioscarreer.nl">Neem contact op</a> voor een pakket op maat.
        </p>
      ) : (
        <div className="pg-questions">
          <div className="pg-question">
            <p className="pg-q">
              <span className="pg-q-num" aria-hidden="true">
                {++step}
              </span>
              Ik ben een
            </p>
            <div className="pg-options" role="group" aria-label="Ik ben een">
              {WHO.map((w) => (
                <Option key={w.key} on={answers.who === w.key} onClick={() => set({ who: w.key }, ["level"])}>
                  {w.label}
                </Option>
              ))}
            </div>
          </div>

          {isEducation && (
            <div className="pg-question">
              <p className="pg-q">
                <span className="pg-q-num" aria-hidden="true">
                  {++step}
                </span>
                Welk onderwijs?
              </p>
              <div className="pg-options" role="group" aria-label="Welk onderwijs?">
                {LEVELS.map((l) => (
                  <Option key={l.key} on={answers.level === l.key} onClick={() => set({ level: l.key }, [])}>
                    {l.label}
                  </Option>
                ))}
              </div>
            </div>
          )}

          {answers.who && !needsLevel && (
            <div className="pg-question">
              <p className="pg-q">
                <span className="pg-q-num" aria-hidden="true">
                  {++step}
                </span>
                Hoe groot is het team?
              </p>
              <div className="pg-options" role="group" aria-label="Hoe groot is het team?">
                {TEAMS.map((t) => (
                  <Option key={t.value} on={answers.team === t.value} onClick={() => set({ team: t.value }, [])}>
                    {t.label}
                  </Option>
                ))}
              </div>
            </div>
          )}

          {answers.who && !needsLevel && answers.team !== undefined && (
            <div className="pg-question">
              <p className="pg-q">
                <span className="pg-q-num" aria-hidden="true">
                  {++step}
                </span>
                Hoeveel {unit} gebruiken Helios?
              </p>
              <div className="pg-options" role="group" aria-label={`Hoeveel ${unit} gebruiken Helios?`}>
                {COUNTS.map((c) => (
                  <Option key={c.value} on={answers.users === c.value} onClick={() => set({ users: c.value }, [])}>
                    {c.label} {unit}
                  </Option>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {done && offered.length > 0 && (
        <div className="pg-result" role="status">
          <div className="pg-result-head">
            <span className="pg-advice-label">Pakketten voor jou</span>
            <strong>
              {audiences.find((a) => a.key === answers.who)?.label}
              {size && <>, {sizeLabel}</>}
            </strong>
            <span>
              {Number.isFinite(clientsOf(offered[0])) ? `Tot ${clientsOf(offered[0]).toLocaleString("nl-NL")} ${unit}` : `Onbeperkt ${unit}`}
              {extraCount > 0 && extraAddon && (
                <>
                  , plus {TEAMS.find((t) => t.value === answers.team)?.open ? `${extraCount} of meer` : extraCount} × {extraAddon.name.toLowerCase()}
                  {extraPrice && (
                    <>
                      {" "}
                      ({euros(extraPrice.cents)} per stuk {extraPrice.text})
                    </>
                  )}{" "}
                  voor een team van {TEAMS.find((t) => t.value === answers.team)?.label.toLowerCase()}
                </>
              )}
              . Prijzen exclusief btw.
            </span>
          </div>

          <div className="pg-cards">
            {offered.map((pkg) => {
              const price = yearPrice(pkg);
              const own = price?.cents === 0;
              const tests = pkg.includes.filter((line) => !/gebruiker|cliënt|onbeperkt|^tot /i.test(line));
              return (
                <article key={pkg.id} className={`pg-card${own ? " is-own" : ""}`}>
                  <h3>{pkg.family ?? pkg.name}</h3>
                  {pkg.description && <p className="pg-card-desc">{pkg.description}</p>}
                  <p className="pg-card-price">
                    {own ? (
                      <strong>Zelf kiezen</strong>
                    ) : price ? (
                      <>
                        <strong>{euros(price.cents)}</strong>
                        <small>{price.text}</small>
                      </>
                    ) : (
                      <small>Prijs op aanvraag</small>
                    )}
                  </p>
                  {tests.length > 0 && (
                    <ul className="pg-card-list">
                      {tests.map((line) => (
                        <li key={line}>
                          <Check />
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button type="button" className={own ? "pc-ghost pg-card-btn" : "pc-cta pg-card-btn"} onClick={() => choose(pkg)}>
                    {own ? "Zelf samenstellen" : `Kies ${pkg.family ?? pkg.name}`}
                  </button>
                </article>
              );
            })}
          </div>

          <button type="button" className="pg-restart" onClick={() => setAnswers({})}>
            Opnieuw beginnen
          </button>
        </div>
      )}

      <p className="pg-skip">
        <a href="#zelf-samenstellen">Direct zelf een pakket samenstellen</a>
      </p>
    </section>
  );
}
