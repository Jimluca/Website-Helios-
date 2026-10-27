"use client";

import { useMemo, useState } from "react";
import { euros, type Package, type Price, type Pricing as PricingData } from "@/lib/pricing-shared";

// De pakketten met hun prijs per maand of per jaar, en een knop naar de bestelpagina van Helios (met het pakket
// al gekozen). Toevoegingen staan eronder; die kies je bij het bestellen of later in je account.

const PERIODS = { month: "Per maand", year: "Per jaar" } as const;

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function periodText(price: Price, countable = false) {
  const period = price.period === "year" ? "per jaar" : "per maand";
  if (price.perSeat) {
    return `per gebruiker ${period}`;
  }

  return countable ? `per stuk ${period}` : period;
}

export default function Pricing({ data }: { data: PricingData }) {
  const periods = useMemo(() => {
    const all = new Set(data.packages.flatMap((p) => p.prices.map((price) => price.period)));

    return (["month", "year"] as const).filter((period) => all.has(period));
  }, [data.packages]);
  const [period, setPeriod] = useState<"month" | "year">(periods[0] ?? "month");

  const priceOf = (pkg: Package) => pkg.prices.find((price) => price.period === period);
  const addons = data.addons.filter((addon) => priceOf(addon));

  return (
    <>
      {periods.length > 1 && (
        <div className="prc-toggle" role="radiogroup" aria-label="Betalen per">
          {periods.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={period === option}
              className={period === option ? "is-active" : undefined}
              onClick={() => setPeriod(option)}
            >
              {PERIODS[option]}
            </button>
          ))}
        </div>
      )}

      <div className="prc-grid">
        {data.packages.map((pkg) => {
          const price = priceOf(pkg);

          return (
            <article key={pkg.id} className="prc-card">
              <h2 className="prc-name">{pkg.name}</h2>
              {pkg.description && <p className="prc-desc">{pkg.description}</p>}
              {price ? (
                <>
                  <p className="prc-price">
                    <span className="prc-amount">{euros(price.amount)}</span>
                    <span className="prc-period">{periodText(price)}</span>
                  </p>
                  <p className="prc-note">
                    excl. {data.taxPercent}% btw
                    {price.trialDays > 0 && <> · {price.trialDays} dagen gratis proberen</>}
                  </p>
                </>
              ) : (
                <p className="prc-note prc-none">Niet {period === "year" ? "per jaar" : "per maand"} te krijgen.</p>
              )}
              <ul className="prc-includes">
                {pkg.includes.map((line) => (
                  <li key={line}>
                    <Check />
                    {line}
                  </li>
                ))}
              </ul>
              {data.orderable && price ? (
                <a className="prc-btn" href={pkg.orderUrl ?? data.orderUrl}>
                  Bestellen
                </a>
              ) : (
                <a className="prc-btn prc-btn-soft" href="mailto:info@helioscarreer.nl">
                  Neem contact op
                </a>
              )}
            </article>
          );
        })}
      </div>

      {addons.length > 0 && (
        <section className="prc-addons" aria-labelledby="prc-addons-title">
          <h2 id="prc-addons-title" className="prc-subtitle">
            Toevoegingen
          </h2>
          <p className="prc-intro-small">Bovenop je pakket. Kies ze bij het bestellen, of later in je account.</p>
          <ul className="prc-addon-list">
            {addons.map((addon) => {
              const price = priceOf(addon)!;

              return (
                <li key={addon.id}>
                  <span className="prc-addon-name">{addon.name}</span>
                  <span className="prc-addon-what">{addon.includes.join(", ")}</span>
                  <span className="prc-addon-price">
                    {euros(price.amount)} <span>{periodText(price, addon.countable)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <ul className="prc-facts">
        <li>
          <strong>Betalen</strong>
          Met iDEAL, creditcard of incasso{data.invoice.enabled ? `, of op factuur (binnen ${data.invoice.days} dagen)` : ""}.
        </li>
        <li>
          <strong>Opzeggen</strong>
          Met een opzegtermijn van {data.noticeMonths} maanden, tot het einde van een betaalperiode.
        </li>
        <li>
          <strong>Meteen aan de slag</strong>
          Na het bestellen nodig je zelf je collega&apos;s uit en zet je cliënten of leerlingen klaar.
        </li>
      </ul>
    </>
  );
}
