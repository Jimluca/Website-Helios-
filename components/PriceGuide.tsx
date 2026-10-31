"use client";

import type { ReactNode } from "react";
import { clientOptions, EDUCATION, LEVELS, teamOptions, unitFor, type Answers } from "@/lib/configurator";
import type { Pricing as PricingData } from "@/lib/pricing-shared";

// Stap 1 van de configurator op de pagina Prijzen: vier vragen (wie ben je, welk onderwijs, hoe groot is het team,
// hoeveel leerlingen, studenten of cliënten). De antwoorden houdt PriceConfigurator bij; die stelt er één pakket bij
// samen (lib/configurator.ts).

function Option({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`pg-option${on ? " is-on" : ""}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

export default function PriceGuide({
  data,
  answers,
  onAnswer,
  onSkip,
}: {
  data: PricingData;
  answers: Answers;
  onAnswer: (patch: Answers, clear?: (keyof Answers)[]) => void;
  onSkip: () => void;
}) {
  const audiences = (data.audiences ?? []).filter((a) => data.packages.some((p) => p.audience === a.key));

  // "Ik ben een …": de doelgroepen uit Helios, in de woorden van de bezoeker.
  const who = [
    ...(audiences.some((a) => a.key === EDUCATION) ? [{ key: EDUCATION, label: "Onderwijsinstelling" }] : []),
    ...(audiences.some((a) => a.key === "career") ? [{ key: "career", label: "Loopbaanorganisatie" }] : []),
  ];

  const isEducation = answers.who === EDUCATION;
  const unit = unitFor(answers);
  const needsLevel = isEducation && !answers.level;
  // De keuzes: 1 tot 5 professionals en de cliëntentreden uit Helios, telkens met "meer" (dan contact).
  const teams = teamOptions();
  const counts = clientOptions(data, answers.who, unit);

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
      <p className="pc-intro">Beantwoord vier korte vragen. Wij stellen er één pakket bij samen, met de prijs. Daarna pas je het aan zoals je wilt.</p>

      {who.length === 0 ? (
        <p className="pg-empty">
          De pakketten staan hier binnenkort. <a href="mailto:info@helioscarreer.nl">Neem contact op</a> voor een pakket op maat.
        </p>
      ) : (
        <div className="pg-questions">
          {question(
            "Ik ben een",
            who.map((w) => (
              <Option key={w.key} on={answers.who === w.key} onClick={() => onAnswer({ who: w.key }, ["level"])}>
                {w.label}
              </Option>
            )),
          )}

          {isEducation &&
            question(
              "Welk onderwijs?",
              LEVELS.map((l) => (
                <Option key={l.key} on={answers.level === l.key} onClick={() => onAnswer({ level: l.key })}>
                  {l.label}
                </Option>
              )),
            )}

          {answers.who &&
            !needsLevel &&
            question(
              "Hoe groot is het team?",
              teams.map((t) => (
                <Option key={t.value} on={answers.team === t.value} onClick={() => onAnswer({ team: t.value })}>
                  {t.label}
                </Option>
              )),
            )}

          {answers.who &&
            !needsLevel &&
            answers.team !== undefined &&
            question(
              `Hoeveel ${unit} gebruiken Helios?`,
              counts.map((c) => (
                <Option key={c.value} on={answers.users === c.value} onClick={() => onAnswer({ users: c.value })}>
                  {c.label}
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
