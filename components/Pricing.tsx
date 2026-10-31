"use client";

import { useEffect, useMemo, useState } from "react";
import { euros, type Package, type Price, type Pricing as PricingData } from "@/lib/pricing-shared";
import { CHOOSE_EVENT } from "@/lib/pricing-events";

// Prijscalculator (ontwerp: "Prijscalculator Helios"): kies een basispakket, voeg toevoegingen toe en zie meteen wat
// het kost, per jaar of per maand. Alle pakketten en bedragen komen uit Helios (Admin › Pakketten); hier staat geen
// enkele prijs vast. Een offerte aanvragen opent een e-mail met de samenstelling; opslaan bewaart hem en zet een link
// op het klembord; bestellen gaat naar de bestelpagina van Helios met het pakket al gekozen.

type Period = "month" | "year";

const CONTACT = "info@helioscarreer.nl";
const STORAGE_KEY = "helios-prijscalculator";

const ICONS = {
  box: "M21 8 12 3 3 8v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  bars: "M4 20h16M7 17v-5M11 17V6M15 17V9M19 17v-3",
  gem: "M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21 8 9l4-6 4 6-4 12",
  test: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7",
  mail: "M4 5h16v14H4zM4 7l8 6 8-6",
  bookmark: "M6 3h12v18l-6-4-6 4z",
  pen: "M16 3l5 5L9 20H4v-5L16 3z",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM21 21l-4.3-4.3",
  advice: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
};
const PACKAGE_ICONS = [ICONS.box, ICONS.bars, ICONS.gem];
// De volgorde van de soorten testen (zoals in Helios); een onbekende soort komt erachter, "Gebruikers" als laatste.
const GROUP_ORDER = ["Beroepen", "Opleidingen", "Waarden en talenten", "Werk- en studiehouding", "Ondersteuning"];

function Icon({ d, size = 18, stroke = 1.9 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const priceFor = (item: Package, period: Period): Price | undefined => item.prices.find((price) => price.period === period);

/** Wat iets kost in een periode, voor een aantal (gebruikers of stuks). Zonder prijs in die periode: omgerekend. */
function cost(item: Package, period: Period, units: number): { cents: number; exact: boolean } | null {
  const direct = priceFor(item, period);
  if (direct) {
    return { cents: direct.amount * units, exact: true };
  }
  const other = priceFor(item, period === "year" ? "month" : "year");
  if (!other) {
    return null;
  }

  return {
    cents: (period === "year" ? other.amount * 12 : Math.round(other.amount / 12)) * units,
    exact: false,
  };
}

/** "per jaar", "per gebruiker per maand", "per stuk per jaar". */
function unitText(item: Package, period: Period) {
  const per = period === "year" ? "per jaar" : "per maand";
  const price = priceFor(item, period) ?? item.prices[0];
  if (price?.perSeat) {
    return `per gebruiker ${per}`;
  }

  return item.countable ? `per stuk ${per}` : per;
}

/** De groottes die een doelgroep heeft, in de volgorde van Helios (klein eerst). */
const sizesOf = (packages: Package[], audience: string | null) => [
  ...new Set(packages.filter((item) => item.audience === audience && item.size).map((item) => item.size as string)),
];

/** De pakketten die bij de keuze van doelgroep en grootte horen; een pakket zonder doelgroep staat er altijd bij. */
const visibleFor = (packages: Package[], audience: string | null, size: string | null) =>
  packages.filter((item) => !item.audience || audience === null || (item.audience === audience && (!item.size || item.size === size)));

/** Bij een pakket per gebruiker telt het aantal gebruikers; bij een toevoeging per stuk het aantal stuks. */
const isPerSeat = (item: Package) => item.prices.some((price) => price.perSeat);

/** summary: wat de vragen bovenaan (PriceGuide) hebben samengesteld; dan staat hier "Jouw samengestelde pakket". */
export default function Pricing({ data, summary = null }: { data: PricingData; summary?: string | null }) {
  const periods = useMemo(() => {
    const all = new Set([...data.packages, ...data.addons].flatMap((item) => item.prices.map((price) => price.period)));

    return (["year", "month"] as const).filter((period) => all.has(period));
  }, [data.packages, data.addons]);

  const [period, setPeriod] = useState<Period>(periods[0] ?? "year");
  // De doelgroepen die pakketten hebben, en de gekozen doelgroep en grootte; zonder doelgroepen is er één lijst.
  const audienceList = useMemo(
    () => (data.audiences ?? []).filter((item) => data.packages.some((pack) => pack.audience === item.key)),
    [data.audiences, data.packages],
  );
  const [audience, setAudience] = useState<string | null>(audienceList[0]?.key ?? null);
  const [sizeChoice, setSizeChoice] = useState<string | null>(null);
  const sizes = sizesOf(data.packages, audience);
  const size = sizeChoice !== null && sizes.includes(sizeChoice) ? sizeChoice : (sizes[0] ?? null);
  const visiblePackages = visibleFor(data.packages, audience, size);
  const [packageId, setPackageId] = useState<number | null>(
    visibleFor(data.packages, audienceList[0]?.key ?? null, sizesOf(data.packages, audienceList[0]?.key ?? null)[0] ?? null)[0]?.id ?? null,
  );
  // Gekozen toevoegingen met hun aantal (1 voor een toevoeging die je niet per stuk koopt).
  const [chosen, setChosen] = useState<Record<number, number>>({});
  const [seats, setSeats] = useState(5);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Alles");
  const [saved, setSaved] = useState<string | null>(null);

  // Een opgeslagen samenstelling (of een gedeelde link) terugzetten; pas na de eerste weergave, zodat server en
  // browser eerst hetzelfde tonen.
  // De keuzehulp bovenaan (PriceGuide) zet een pakket in de adresbalk en vraagt dan om het hier te kiezen.
  useEffect(() => {
    const frame = requestAnimationFrame(() => restore());
    window.addEventListener(CHOOSE_EVENT, restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(CHOOSE_EVENT, restore);
    };

    function restore() {
      let state: {
        pakket?: number | null;
        extra?: Record<number, number>;
        gebruikers?: number;
        periode?: Period;
      } = {};
      try {
        state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
      } catch {}
      const url = new URLSearchParams(window.location.search);
      if (url.has("pakket")) {
        state.pakket = Number(url.get("pakket")) || null;
        state.extra = Object.fromEntries(
          (url.get("extra") ?? "")
            .split(",")
            .filter(Boolean)
            .map((part) => {
              const [id, qty] = part.split(":");
              return [Number(id), Math.max(1, Number(qty) || 1)];
            }),
        );
        state.gebruikers = Number(url.get("gebruikers")) || undefined;
        state.periode = url.get("periode") === "maand" ? "month" : url.get("periode") === "jaar" ? "year" : undefined;
      }
      const known = (id: number, list: Package[]) => list.some((item) => item.id === id);
      if (state.pakket === null || (state.pakket && known(state.pakket, data.packages))) {
        setPackageId(state.pakket ?? null);
        const restored = data.packages.find((item) => item.id === state.pakket);
        if (restored?.audience) {
          setAudience(restored.audience);
        }
        if (restored?.size) {
          setSizeChoice(restored.size);
        }
      }
      if (state.extra) {
        setChosen(Object.fromEntries(Object.entries(state.extra).filter(([id]) => known(Number(id), data.addons))));
      }
      if (state.gebruikers && state.gebruikers > 0) {
        setSeats(Math.min(999, state.gebruikers));
      }
      if (state.periode && periods.includes(state.periode)) {
        setPeriod(state.periode);
      }
    }
  }, [data.packages, data.addons, periods]);

  const pkg = data.packages.find((item) => item.id === packageId) ?? null;

  // Een andere doelgroep of grootte: dezelfde productlijn in de nieuwe keuze, anders het eerste pakket daarvan.
  const switchTo = (nextAudience: string | null, nextSize: string | null) => {
    const nextSizes = sizesOf(data.packages, nextAudience);
    const useSize = nextSize !== null && nextSizes.includes(nextSize) ? nextSize : (nextSizes[0] ?? null);
    const same = pkg?.family ? data.packages.find((item) => item.audience === nextAudience && item.family === pkg.family && item.size === useSize) : undefined;
    setAudience(nextAudience);
    setSizeChoice(useSize);
    setPackageId(!pkg ? null : !pkg.audience ? pkg.id : ((same ?? visibleFor(data.packages, nextAudience, useSize)[0])?.id ?? null));
  };
  const pkgUnits = pkg && isPerSeat(pkg) ? seats : 1;
  const addonUnits = (addon: Package) => (isPerSeat(addon) ? seats : 1) * (chosen[addon.id] ?? 1);
  const selected = data.addons.filter((addon) => chosen[addon.id] !== undefined);

  // Het totaal per jaar en per maand, en wat jaarlijks betalen scheelt (alleen voor wat beide prijzen heeft).
  const lines = [...(pkg ? [{ item: pkg, units: pkgUnits }] : []), ...selected.map((addon) => ({ item: addon, units: addonUnits(addon) }))];
  const total = (p: Period) => lines.reduce((sum, line) => sum + (cost(line.item, p, line.units)?.cents ?? 0), 0);
  const savings = lines.reduce((sum, { item, units }) => {
    const month = priceFor(item, "month");
    const year = priceFor(item, "year");
    return month && year ? sum + Math.max(0, month.amount * 12 - year.amount) * units : sum;
  }, 0);
  const onlyOther = lines.filter((line) => !priceFor(line.item, period)).map((line) => line.item.name);

  // Slimme suggestie: alles wat je los kiest, zit ook in een ander pakket dat goedkoper uitkomt.
  const wanted = selected.flatMap((addon) => addon.includes.map((line) => line.toLowerCase()));
  const suggestion = selected.length
    ? (visiblePackages.find((other) => {
        const has = new Set([...other.includes, other.name].map((line) => line.toLowerCase()));
        const price = cost(other, "year", isPerSeat(other) ? seats : 1);
        return other.id !== packageId && wanted.every((line) => has.has(line)) && price !== null && price.cents < total("year");
      }) ?? null)
    : null;

  // Filters: de soorten testen in de volgorde van Helios, en "Gebruikers" voor wat geen test is.
  const groupOf = (addon: Package) => addon.category ?? "Gebruikers";
  const rank = (group: string) => (GROUP_ORDER.indexOf(group) + 1 || GROUP_ORDER.length) + (group === "Gebruikers" ? 100 : 0);
  const includedNow = new Set(pkg?.includes ?? []);
  const redundant = (addon: Package) => chosen[addon.id] === undefined && addon.includes.length > 0 && addon.includes.every((line) => includedNow.has(line));
  // Een toevoeging met een grootte (de prijs verschilt per grootte) staat alleen bij pakketten van die grootte.
  const offeredAddons = data.addons.filter((addon) => !redundant(addon) && (!addon.size || size === null || addon.size === size));
  const sorted = [...offeredAddons].sort((a, b) => rank(groupOf(a)) - rank(groupOf(b)));
  const groups = ["Alles", ...new Set(sorted.map(groupOf))];
  const q = query.trim().toLowerCase();
  const addons = sorted.filter(
    (addon) =>
      (filter === "Alles" || groupOf(addon) === filter) &&
      (!q || addon.name.toLowerCase().includes(q) || addon.includes.some((line) => line.toLowerCase().includes(q))),
  );

  const toggleAddon = (id: number) =>
    setChosen((now) => {
      const next = { ...now };
      if (next[id] !== undefined) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  const setCount = (id: number, qty: number) =>
    setChosen((now) => ({
      ...now,
      [id]: Math.max(1, Math.min(999, qty || 1)),
    }));

  const periodWord = period === "year" ? "per jaar" : "per maand";
  const lineText = (item: Package, units: number) => {
    const c = cost(item, period, units);
    return c ? `${c.exact ? "" : "± "}${euros(c.cents)} ${periodWord}` : "prijs op aanvraag";
  };

  const shareUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("pakket", String(packageId ?? 0));
    if (selected.length) {
      url.searchParams.set("extra", selected.map((addon) => (chosen[addon.id] > 1 ? `${addon.id}:${chosen[addon.id]}` : String(addon.id))).join(","));
    }
    if ((pkg && isPerSeat(pkg)) || selected.some(isPerSeat)) {
      url.searchParams.set("gebruikers", String(seats));
    }
    url.searchParams.set("periode", period === "year" ? "jaar" : "maand");
    return url.toString();
  };

  const save = async () => {
    const link = shareUrl();
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          pakket: packageId,
          extra: chosen,
          gebruikers: seats,
          periode: period,
        }),
      );
    } catch {}
    window.history.replaceState(null, "", link);
    try {
      await navigator.clipboard.writeText(link);
      setSaved("Opgeslagen. De link naar deze samenstelling staat op je klembord.");
    } catch {
      setSaved("Opgeslagen in deze browser. Je kunt ook de link in de adresbalk bewaren.");
    }
  };

  const quoteHref = () => {
    const rows = [
      "Graag ontvang ik een offerte voor deze samenstelling:",
      "",
      pkg ? `Pakket: ${pkg.name}${isPerSeat(pkg) ? ` (${seats} gebruikers)` : ""}, ${lineText(pkg, pkgUnits)}` : "Pakket: nog geen keuze",
      ...selected.map((addon) => `Toevoeging: ${addon.name}${chosen[addon.id] > 1 ? ` (${chosen[addon.id]}×)` : ""}, ${lineText(addon, addonUnits(addon))}`),
      "",
      `Totaal: ${euros(total(period))} ${periodWord}, excl. ${data.taxPercent}% btw`,
      "",
      "Organisatie:",
      "Naam:",
      "Telefoon:",
    ];
    return `mailto:${CONTACT}?subject=${encodeURIComponent(`Offerte Helios${pkg ? ` – ${pkg.name}` : ""}`)}&body=${encodeURIComponent(rows.join("\n"))}`;
  };

  return (
    <div className="pc">
      <header className="pc-head">
        <p className="pc-eyebrow">{summary ? "JOUW PAKKET" : "ZELF SAMENSTELLEN"}</p>
        <h2 className="pc-title">
          {summary ? (
            <>
              Jouw <span>samengestelde</span> pakket
            </>
          ) : (
            <>
              Stel jouw <span>Helios-pakket</span> samen.
            </>
          )}
        </h2>
        <p className="pc-intro">
          {summary
            ? `${summary} Kies eventueel een ander pakket en voeg toe wat je nog nodig hebt.`
            : "Kies een basispakket en breid het naar wens uit met losse toevoegingen. Zo stel je eenvoudig een oplossing samen die past bij jouw organisatie."}
        </p>
        <div className="pc-badge" aria-hidden="true">
          <span className="pc-badge-icon">
            <Icon d={ICONS.pen} size={20} />
          </span>
          <span>
            <strong>Flexibel samenstellen</strong>
            <small>Betaal alleen voor wat je nodig hebt.</small>
          </span>
        </div>
      </header>

      <div className="pc-layout">
        <section className="pc-main" aria-label="Samenstellen">
          <div className="pc-step" id="pakketten">
            <span className="pc-step-num" aria-hidden="true">
              1
            </span>
            <div>
              <h2 className="pc-step-title">{summary ? "Jouw pakket" : "Kies jouw basispakket"}</h2>
              <p className="pc-step-text">
                {summary
                  ? "Dit pakket past bij je antwoorden en staat al aangevinkt. Een ander pakket kiezen kan ook."
                  : "Elk pakket bevat een set instrumenten en functies. Je kunt het later uitbreiden met toevoegingen."}
              </p>
            </div>
          </div>

          {/* Na de vragen liggen doelgroep en grootte vast (die volgen uit de antwoorden). */}
          {audienceList.length > 0 && !summary && (
            <div className="pc-audience">
              {audienceList.length > 1 && (
                <div className="pc-chips" role="radiogroup" aria-label="Doelgroep">
                  {audienceList.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="radio"
                      aria-checked={audience === item.key}
                      className={`pc-chip${audience === item.key ? " is-on" : ""}`}
                      onClick={() => switchTo(item.key, size)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
              {sizes.length > 1 && (
                <div className="pc-sizes">
                  <span className="pc-sizes-label">Grootte</span>
                  <div className="pc-chips" role="radiogroup" aria-label="Grootte">
                    {sizes.map((name) => (
                      <button
                        key={name}
                        type="button"
                        role="radio"
                        aria-checked={size === name}
                        className={`pc-chip${size === name ? " is-on" : ""}`}
                        onClick={() => switchTo(audience, name)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pc-packages" role="radiogroup" aria-label="Basispakket">
            {visiblePackages.map((item, i) => {
              const on = item.id === packageId;
              const price = cost(item, period, 1);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`pc-package${on ? " is-on" : ""}`}
                  onClick={() => setPackageId(item.id)}
                >
                  <span className="pc-package-top">
                    <span className="pc-icon pc-icon-lg">
                      <Icon d={PACKAGE_ICONS[i % PACKAGE_ICONS.length]} size={26} stroke={1.8} />
                    </span>
                    <span className="pc-package-name">
                      <strong>{item.family ?? item.name}</strong>
                      {item.description && <small>{item.description}</small>}
                    </span>
                    <span className="pc-radio" aria-hidden="true" />
                  </span>
                  <span className="pc-package-price">
                    {price ? (
                      <>
                        <strong>
                          {price.exact ? "" : "± "}
                          {euros(price.cents)}
                        </strong>
                        <small>{unitText(item, period)}</small>
                      </>
                    ) : (
                      <small>Prijs op aanvraag</small>
                    )}
                  </span>
                  {(() => {
                    const trial = item.prices.find((p) => p.trialDays > 0);
                    return trial ? <span className="pc-trial">{trial.trialDays} dagen gratis proberen</span> : null;
                  })()}
                  <span className="pc-rule" aria-hidden="true" />
                  <span className="pc-features">
                    {item.includes.map((line) => (
                      <span key={line}>
                        <Icon d={ICONS.check} size={14} stroke={2.6} />
                        {line}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          {data.addons.length > 0 && (
            <>
              <div className="pc-step pc-step-2">
                <span className="pc-step-num" aria-hidden="true">
                  2
                </span>
                <div className="pc-step-body">
                  <h2 className="pc-step-title">{summary ? "Voeg nog iets toe" : "Voeg losse toevoegingen toe"}</h2>
                  <p className="pc-step-text">Breid je pakket uit met losse testen en extra gebruikers. De prijs wordt automatisch berekend.</p>
                </div>
                {data.addons.length > 6 && (
                  <label className="pc-search">
                    <Icon d={ICONS.search} size={15} stroke={2} />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek een test…" aria-label="Zoek een test" />
                  </label>
                )}
              </div>

              {groups.length > 2 && (
                <div className="pc-chips" role="group" aria-label="Soort toevoeging">
                  {groups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      className={`pc-chip${filter === group ? " is-on" : ""}`}
                      aria-pressed={filter === group}
                      onClick={() => setFilter(group)}
                    >
                      {group}
                      <span>{group === "Alles" ? offeredAddons.length : offeredAddons.filter((addon) => groupOf(addon) === group).length}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="pc-addons">
                {addons.map((addon) => {
                  const on = chosen[addon.id] !== undefined;
                  const price = cost(addon, period, 1);
                  return (
                    <div key={addon.id} className={`pc-addon${on ? " is-on" : ""}`}>
                      <button type="button" className="pc-addon-toggle" aria-pressed={on} onClick={() => toggleAddon(addon.id)}>
                        <span className="pc-icon">
                          <Icon d={addon.countable || isPerSeat(addon) ? ICONS.users : ICONS.test} size={17} stroke={2} />
                        </span>
                        <span className="pc-addon-name">
                          <strong>{addon.name}</strong>
                          <small>{addon.description ?? addon.includes.join(", ")}</small>
                        </span>
                        <span className="pc-check" aria-hidden="true">
                          <Icon d={ICONS.check} size={11} stroke={3.4} />
                        </span>
                      </button>
                      <div className="pc-addon-foot">
                        <span className="pc-addon-price">
                          {price ? (
                            <>
                              <strong>
                                {price.exact ? "" : "± "}
                                {euros(price.cents)}
                              </strong>
                              <small>{unitText(addon, period)}</small>
                            </>
                          ) : (
                            <small>Prijs op aanvraag</small>
                          )}
                        </span>
                        {on && addon.countable && (
                          <span className="pc-qty">
                            <button type="button" aria-label={`Eén ${addon.name} minder`} onClick={() => setCount(addon.id, chosen[addon.id] - 1)}>
                              −
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={999}
                              value={chosen[addon.id]}
                              onChange={(e) => setCount(addon.id, Number(e.target.value))}
                              aria-label={`Aantal ${addon.name}`}
                            />
                            <button type="button" aria-label={`Eén ${addon.name} meer`} onClick={() => setCount(addon.id, chosen[addon.id] + 1)}>
                              +
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {addons.length === 0 && <p className="pc-empty">Geen toevoegingen gevonden.</p>}

              {suggestion && (
                <div className="pc-suggest">
                  <span className="pc-suggest-icon">
                    <Icon d={ICONS.bolt} size={24} stroke={1.7} />
                  </span>
                  <div>
                    <strong>Slimme suggestie</strong>
                    <p>
                      Wat je los hebt gekozen, zit ook in het <b>{suggestion.name}</b>-pakket. Dat is voordeliger dan losse toevoegingen.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="pc-ghost"
                    onClick={() => {
                      setPackageId(suggestion.id);
                      setChosen({});
                    }}
                  >
                    Kies {suggestion.name}
                    <Icon d={ICONS.arrow} size={15} stroke={2} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <aside className="pc-side" aria-labelledby="pc-side-title">
          <h2 className="pc-side-title" id="pc-side-title">
            Jouw samenstelling
          </h2>
          <p className="pc-side-text">Hier zie je direct wat je hebt gekozen.</p>

          {pkg ? (
            <div className="pc-chosen">
              <div className="pc-chosen-top">
                <span className="pc-icon pc-icon-lg">
                  <Icon d={PACKAGE_ICONS[data.packages.indexOf(pkg) % PACKAGE_ICONS.length]} size={24} stroke={1.8} />
                </span>
                <strong className="pc-chosen-name">{pkg.name}</strong>
                <span className="pc-chosen-price">{lineText(pkg, pkgUnits)}</span>
                <button type="button" className="pc-remove" aria-label={`${pkg.name} weghalen`} onClick={() => setPackageId(null)}>
                  <Icon d={ICONS.x} size={14} stroke={2.2} />
                </button>
              </div>
              {isPerSeat(pkg) && (
                <label className="pc-seats">
                  Aantal gebruikers
                  <span className="pc-qty">
                    <button type="button" aria-label="Eén gebruiker minder" onClick={() => setSeats((n) => Math.max(1, n - 1))}>
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={seats}
                      onChange={(e) => setSeats(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
                      aria-label="Aantal gebruikers"
                    />
                    <button type="button" aria-label="Eén gebruiker meer" onClick={() => setSeats((n) => Math.min(999, n + 1))}>
                      +
                    </button>
                  </span>
                </label>
              )}
              <div className="pc-features">
                {pkg.includes.map((line) => (
                  <span key={line}>
                    <Icon d={ICONS.check} size={14} stroke={2.6} />
                    {line}
                  </span>
                ))}
              </div>
              <a className="pc-link" href="#pakketten">
                Andere keuze maken <Icon d={ICONS.arrow} size={14} stroke={2} />
              </a>
            </div>
          ) : (
            <p className="pc-none">Nog geen basispakket gekozen.</p>
          )}

          {data.addons.length > 0 && (
            <>
              <h3 className="pc-side-sub">Toevoegingen ({selected.length})</h3>
              <div className="pc-lines">
                {selected.map((addon) => (
                  <div key={addon.id} className="pc-line">
                    <span className="pc-icon">
                      <Icon d={addon.countable || isPerSeat(addon) ? ICONS.users : ICONS.test} size={16} stroke={2} />
                    </span>
                    <span className="pc-line-text">
                      <strong>
                        {addon.name}
                        {chosen[addon.id] > 1 && <span> × {chosen[addon.id]}</span>}
                      </strong>
                      <span className="pc-line-price">{lineText(addon, addonUnits(addon))}</span>
                    </span>
                    <button type="button" className="pc-remove" aria-label={`${addon.name} weghalen`} onClick={() => toggleAddon(addon.id)}>
                      <Icon d={ICONS.x} size={12} stroke={2.4} />
                    </button>
                  </div>
                ))}
                {!selected.length && <p className="pc-none pc-none-sm">Nog geen toevoegingen.</p>}
              </div>
            </>
          )}

          <div className="pc-total">
            <div className="pc-total-head">
              <span>{period === "year" ? "Totaal per jaar" : "Totaal per maand"}</span>
              {period === "year" && savings > 0 && <span className="pc-save">Je bespaart {euros(savings)}</span>}
            </div>
            <p className="pc-total-amount" aria-live="polite">
              <strong>{euros(total(period))}</strong>
              <small>{periodWord}</small>
            </p>
            <p className="pc-vat">
              Excl. {data.taxPercent}% btw.
              {onlyOther.length > 0 && (
                <>
                  {" "}
                  {onlyOther.join(", ")}: alleen {period === "year" ? "per maand" : "per jaar"} te betalen, hier omgerekend (±).
                </>
              )}
            </p>
          </div>

          {periods.length > 1 && (
            <div className="pc-periods" role="radiogroup" aria-label="Betalen per">
              {(["year", "month"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={period === option}
                  className={`pc-period${period === option ? " is-on" : ""}`}
                  onClick={() => setPeriod(option)}
                >
                  <span className="pc-radio" aria-hidden="true" />
                  <span>
                    <strong>{option === "year" ? "Jaarlijks" : "Maandelijks"}</strong>
                    <small>{option === "year" ? (savings > 0 ? "Voordeligst" : "Eén keer per jaar") : `${euros(total("month"))} per maand`}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          <a className="pc-cta" href={quoteHref()}>
            Offerte aanvragen <Icon d={ICONS.arrow} size={16} stroke={2} />
          </a>
          <button type="button" className="pc-ghost pc-ghost-wide" onClick={save}>
            <Icon d={ICONS.bookmark} size={16} stroke={2} />
            Samenstelling opslaan
          </button>
          {saved && (
            <p className="pc-saved" role="status">
              {saved}
            </p>
          )}
          {data.orderable && pkg && priceFor(pkg, period) && (
            <a className="pc-order" href={pkg.orderUrl ?? data.orderUrl}>
              Liever direct bestellen? Bestel {pkg.name} <Icon d={ICONS.arrow} size={14} stroke={2} />
            </a>
          )}

          <ul className="pc-trust">
            <li>
              <span className="pc-icon">
                <Icon d={ICONS.mail} size={17} stroke={1.8} />
              </span>
              <strong>Vrijblijvende offerte</strong>
              <small>Binnen 1 werkdag</small>
            </li>
            <li>
              <span className="pc-icon">
                <Icon d={ICONS.advice} size={17} stroke={1.8} />
              </span>
              <strong>Persoonlijk advies</strong>
              <small>Van een specialist</small>
            </li>
            <li>
              <span className="pc-icon">
                <Icon d={ICONS.heart} size={17} stroke={1.8} />
              </span>
              <strong>Maatwerk mogelijk</strong>
              <small>Voor grotere organisaties</small>
            </li>
          </ul>
        </aside>
      </div>

      <ul className="prc-facts">
        <li>
          <strong>Betalen</strong>
          Met iDEAL, creditcard of incasso
          {data.invoice.enabled ? `, of op factuur (binnen ${data.invoice.days} dagen)` : ""}.
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
    </div>
  );
}
