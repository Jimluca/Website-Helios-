"use client";

import { useRef, useState } from "react";
import { PRICE_LISTS, eur, type PriceList, type PriceRow } from "@/lib/price-lists";

// Het begin van de pagina Prijzen: een paar vragen die naar de passende prijslijst wijzen, en daaronder de prijslijsten
// zelf (een tab per soort licentie). Zelf samenstellen kan daarna in de prijscalculator (#zelf-samenstellen).

type Advice = { list: string; column?: number; why: string };

type Option = { label: string; next?: string; advice?: Advice };
type Question = { id: string; text: string; options: Option[] };

const QUESTIONS: Record<string, Question> = {
  who: {
    id: "who",
    text: "Voor wie is Helios?",
    options: [
      { label: "Een school", advice: { list: "onderwijs", why: "Voor scholen, btw-vrij." } },
      { label: "Loopbaanprofessional of re-integratie", next: "team" },
      { label: "Alleen skills in kaart brengen", next: "skills" },
    ],
  },
  team: {
    id: "team",
    text: "Met hoeveel professionals werk je?",
    options: [
      { label: "Alleen ik", next: "clients" },
      {
        label: "Met meerdere professionals",
        advice: { list: "jaarlicentie", why: "Per professionalaccount tot 100 cliënten per jaar; extra accounts voeg je toe." },
      },
    ],
  },
  clients: {
    id: "clients",
    text: "Hoeveel cliënten begeleid je per jaar?",
    options: [
      { label: "Een paar (tot 5)", advice: { list: "vijf", why: "Testinzet voor 5 cliënten, tot 5 jaar lang." } },
      { label: "Tot 12", advice: { list: "solo", column: 0, why: "Een jaarlicentie voor 12 cliënten." } },
      { label: "Tot 25", advice: { list: "solo", column: 1, why: "Een jaarlicentie voor 25 cliënten." } },
      { label: "Tot 50", advice: { list: "solo", column: 2, why: "Een jaarlicentie voor 50 cliënten." } },
      { label: "Meer dan 50", advice: { list: "jaarlicentie", why: "Tot 100 cliënten per jaar per professionalaccount." } },
      { label: "Wisselend: liever per cliënt betalen", advice: { list: "per-client", why: "Geen afnameverplichting: je betaalt per cliënt." } },
    ],
  },
  skills: {
    id: "skills",
    text: "Voor hoeveel cliënten?",
    options: [
      { label: "Tot 20", advice: { list: "skills-match", column: 0, why: "Een bundel voor 20 cliënten." } },
      { label: "Tot 100", advice: { list: "skills-match", column: 1, why: "Een bundel voor 100 cliënten." } },
    ],
  },
};

const ARROW = "M5 12h14M12 5l7 7-7 7";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ARROW} />
    </svg>
  );
}

/** Het eerste pakket in de lijst (het instapbedrag), in de gekozen kolom. */
function startPrice(list: PriceList, column = 0) {
  const row = list.rows.find((r) => r.highlight);
  const price = row?.prices[column] ?? row?.prices[0];
  return row && typeof price === "number" ? { row, price } : null;
}

/** Een rij met maar één tekst (bijv. training) beslaat alle kolommen. */
const spans = (row: PriceRow) => row.prices.slice(1).every((p) => p === "");

function Table({ list, column }: { list: PriceList; column: number }) {
  const columns = list.columns ?? [""];
  const many = columns.length > 1;

  return (
    <table className="pg-table" data-column={many ? column : undefined}>
      {many && (
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Onderdeel</span>
            </th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`pg-col${i === column ? " is-on" : ""}`} data-col={i}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {list.rows.map((row) => (
          <tr key={row.label} className={row.highlight ? "is-package" : undefined}>
            <th scope="row">
              <span className="pg-label">{row.label}</span>
              {row.sub && <span className="pg-sub">{row.sub}</span>}
              {row.items && (
                <ul className="pg-items">
                  {row.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </th>
            {spans(row) ? (
              <td colSpan={columns.length} className="pg-price pg-price-wide">
                {eur(row.prices[0])}
              </td>
            ) : (
              row.prices.map((price, i) => (
                <td key={i} className={`pg-price${many && i === column ? " is-on" : ""}`} data-col={many ? i : undefined}>
                  {many && <span className="pg-price-col">{columns[i]}</span>}
                  {eur(price)}
                </td>
              ))
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PriceGuide() {
  const [path, setPath] = useState<string[]>(["who"]);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [tab, setTab] = useState(PRICE_LISTS[0].id);
  const [column, setColumn] = useState<Record<string, number>>({});
  const listsRef = useRef<HTMLElement>(null);

  const answer = (question: Question, option: Option) => {
    const index = path.indexOf(question.id);
    setPath([...path.slice(0, index + 1), ...(option.next ? [option.next] : [])]);
    setPicked((now) => ({ ...Object.fromEntries(Object.entries(now).filter(([id]) => path.indexOf(id) < index)), [question.id]: option.label }));
    setAdvice(option.advice ?? null);
  };

  const restart = () => {
    setPath(["who"]);
    setPicked({});
    setAdvice(null);
  };

  const show = (id: string, col?: number) => {
    setTab(id);
    if (col !== undefined) {
      setColumn((now) => ({ ...now, [id]: col }));
    }
    listsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const advised = advice ? PRICE_LISTS.find((l) => l.id === advice.list) : null;
  const start = advised ? startPrice(advised, advice?.column) : null;
  const current = PRICE_LISTS.find((l) => l.id === tab) ?? PRICE_LISTS[0];
  const currentColumn = column[current.id] ?? 0;

  return (
    <>
      <section className="pg-guide" aria-labelledby="pg-title">
        <p className="pc-eyebrow">PRIJZEN</p>
        <h1 className="pc-title" id="pg-title">
          Welk <span>Helios-pakket</span> past bij jou?
        </h1>
        <p className="pc-intro">Beantwoord een paar vragen en zie meteen welke prijslijst bij je past. Of bekijk alle prijzen en stel zelf een pakket samen.</p>

        <div className="pg-questions">
          {path.map((id, step) => {
            const question = QUESTIONS[id];
            return (
              <div key={id} className="pg-question">
                <p className="pg-q">
                  <span className="pg-q-num" aria-hidden="true">
                    {step + 1}
                  </span>
                  {question.text}
                </p>
                <div className="pg-options" role="group" aria-label={question.text}>
                  {question.options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className={`pg-option${picked[id] === option.label ? " is-on" : ""}`}
                      aria-pressed={picked[id] === option.label}
                      onClick={() => answer(question, option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {advised && advice && (
          <div className="pg-advice" role="status">
            <div className="pg-advice-text">
              <span className="pg-advice-label">Ons advies</span>
              <strong>
                {advised.name}
                {advice.column !== undefined && advised.columns ? `, ${advised.columns[advice.column]}` : ""}
              </strong>
              <span>
                {advice.why}
                {start && (
                  <>
                    {" "}
                    {start.row.label} vanaf <b>{eur(start.price)}</b>
                    {advised.id === "per-client" ? " per cliënt" : advised.id === "vijf" || advised.id === "skills-match" ? "" : " per jaar"}.
                  </>
                )}
              </span>
            </div>
            <div className="pg-advice-actions">
              <button type="button" className="pc-cta pg-cta" onClick={() => show(advised.id, advice.column)}>
                Bekijk de prijslijst <Arrow />
              </button>
              <button type="button" className="pc-ghost" onClick={restart}>
                Opnieuw
              </button>
            </div>
          </div>
        )}

        <p className="pg-skip">
          <a href="#prijslijsten">Alle prijslijsten bekijken</a>
          <span aria-hidden="true">·</span>
          <a href="#zelf-samenstellen">Zelf een pakket samenstellen</a>
        </p>
      </section>

      <section className="pg-lists" id="prijslijsten" ref={listsRef} aria-labelledby="pg-lists-title">
        <h2 className="pc-step-title pg-lists-title" id="pg-lists-title">
          Alle prijslijsten
        </h2>
        <div className="pg-tabs" role="tablist" aria-label="Prijslijsten">
          {PRICE_LISTS.map((list) => (
            <button
              key={list.id}
              type="button"
              role="tab"
              id={`pg-tab-${list.id}`}
              aria-selected={list.id === tab}
              aria-controls="pg-panel"
              className={`pg-tab${list.id === tab ? " is-on" : ""}${advice?.list === list.id ? " is-advised" : ""}`}
              onClick={() => setTab(list.id)}
            >
              <strong>{list.name}</strong>
              <small>{list.short}</small>
            </button>
          ))}
        </div>

        <div className="pg-panel" id="pg-panel" role="tabpanel" aria-labelledby={`pg-tab-${current.id}`}>
          <div className="pg-panel-head">
            <div>
              <h3 className="pg-panel-title">{current.name}</h3>
              <p className="pg-panel-intro">{current.intro}</p>
            </div>
            {current.columns && current.columns.length > 1 && (
              <div className="pg-columns" role="radiogroup" aria-label="Aantal cliënten">
                {current.columns.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={i === currentColumn}
                    className={`pc-chip${i === currentColumn ? " is-on" : ""}`}
                    onClick={() => setColumn((now) => ({ ...now, [current.id]: i }))}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Table list={current} column={currentColumn} />

          {current.standard && (
            <div className="pg-standard">
              <h4>Standaard in elk pakket</h4>
              <ul>
                {current.standard.map((line) => (
                  <li key={line}>
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
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pg-foot">
            <div className="pg-notes">
              {current.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
            <div className="pg-foot-actions">
              <a
                className="pc-cta pg-cta"
                href={`mailto:info@helioscarreer.nl?subject=${encodeURIComponent(`Offerte Helios ${current.name}`)}&body=${encodeURIComponent(
                  `Graag ontvang ik een offerte voor Helios ${current.name}${current.columns && current.columns.length > 1 ? ` (${current.columns[currentColumn]})` : ""}.\n\nOrganisatie:\nNaam:\nTelefoon:`,
                )}`}
              >
                Offerte aanvragen <Arrow />
              </a>
              <a className="pc-ghost" href="#zelf-samenstellen">
                Zelf samenstellen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
