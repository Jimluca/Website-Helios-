"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CONTACT_URL, ORDER_URL, SIGNUP_URL, contactUrl } from "@/lib/app-links";
import {
  CONTENTS,
  PLANS,
  STUDY_TESTS,
  addOnPrice,
  euro,
  euroCents,
  packagePrice,
  cheapestPackage,
  schoolSitePrice,
  testByName,
  testsFor,
  type Segment,
  type TestName,
} from "@/lib/pricing";
import s from "./Pricing.module.css";

// Prijzenpagina: kies doelgroep en aantal cliënten, dan staan de pakketten met prijs meteen naast elkaar.
// Kies je een pakket, dan opent rechts "Jouw pakket": daar tel je extra testen en professionals op.
// Elke testnaam heeft een i-knop met wat de test doet en wat de cliënt eraan heeft. Prijzen: lib/pricing.ts.

function Icon({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const Check = () => <Icon size={16}><path d="m5 12.5 4.5 4.5L19 7.5" /></Icon>;
const Arrow = () => <Icon size={17}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>;
const Plus = () => <Icon size={16}><path d="M12 5v14M5 12h14" /></Icon>;
const Close = () => <Icon size={18}><path d="M6 6l12 12M18 6 6 18" /></Icon>;
const Bag = () => <Icon size={18}><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></Icon>;

// i-knop met uitleg. Het venster staat vast op het scherm (position: fixed, via een portal in body), zodat het
// niet wegvalt in een tabel, glazen kaart of paneel dat zelf scrolt. Sluit bij klikken ernaast, Escape of scrollen.
function InfoTip({ name, what, benefit, unitOne }: { name: string; what: string; benefit: string; unitOne: string }) {
  const [pos, setPos] = useState<CSSProperties | null>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!btn.current?.contains(t) && !pop.current?.contains(t)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (pos) return setPos(null);
    const r = btn.current!.getBoundingClientRect();
    const w = 300;
    const left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
    const below = r.bottom + 220 < window.innerHeight;
    setPos(below ? { left, top: r.bottom + 8, width: w } : { left, bottom: window.innerHeight - r.top + 8, width: w });
  };

  return (
    <>
      <button
        ref={btn}
        type="button"
        className={pos ? s.infoOn : s.info}
        aria-label={`Uitleg over ${name}`}
        aria-expanded={!!pos}
        onClick={toggle}
      >
        i
      </button>
      {pos &&
        createPortal(
          // In document.body: glazen kaarten (backdrop-filter) zouden een vast venster anders binnen de kaart houden.
          <div ref={pop} className={s.pop} style={pos} role="dialog" aria-label={name}>
            <b className={s.popTitle}>{name}</b>
            <p>{what}</p>
            <span className={s.popLabel}>Wat heeft je {unitOne} eraan?</span>
            <p>{benefit}</p>
          </div>,
          document.body,
        )}
    </>
  );
}

const FAQ: { q: string; a: string }[] = [
  { q: "Wat telt als cliënt of leerling?", a: "Eén persoon die in het abonnementsjaar minstens één test maakt. Maakt iemand meer testen, dan telt die nog steeds als één." },
  { q: "Wat als ik in de loop van het jaar boven mijn aantal kom?", a: "Dan stap je over naar de volgende staffel en betaal je het verschil voor de rest van het jaar. Je hoeft niets op te zeggen of opnieuw af te sluiten." },
  { q: "Hoe werkt een extra professional?", a: "Een extra professional is een extra gebruiker. Alle professionals gebruiken samen de cliënten van je staffel; een extra professional brengt geen extra cliënten mee." },
  { q: "Hoe lang loopt een abonnement en hoe zeg ik op?", a: "Een abonnement loopt per jaar en wordt automatisch verlengd. Opzeggen kan tot 3 maanden voor het einde van het abonnementsjaar." },
  { q: "Hoe zit het met btw?", a: "Voor Loopbaan & Re-integratie zijn de prijzen exclusief 21% btw. Onderwijs is btw-vrij (CRKBO-registratie)." },
  { q: "Hoe kan ik betalen?", a: "Met iDEAL, SEPA-incasso of creditcard, of op factuur binnen 30 dagen." },
];

type Cart = { pkgId: string | null; extras: TestName[]; pros: number };
const EMPTY: Cart = { pkgId: null, extras: [], pros: 0 };

export default function Pricing() {
  const [segment, setSegment] = useState<Segment>("lr");
  const [tierBySeg, setTierBySeg] = useState<Record<Segment, number>>({ lr: PLANS.lr.defaultTier, onderwijs: PLANS.onderwijs.defaultTier });
  const [cart, setCart] = useState<Cart>(EMPTY);
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState(20);
  const [higherEd, setHigherEd] = useState(false);

  const plan = PLANS[segment];
  const tier = tierBySeg[segment];
  const count = plan.tiers[tier];
  const setTier = (i: number) => setTierBySeg({ ...tierBySeg, [segment]: i });

  // Het pakket waar "Mis je een test?" over gaat: het gekozen pakket, anders het meest gekozen.
  // Een los product (Alleen Skills) is niet uit te breiden; dan gaat "Mis je een test?" over het meest gekozen pakket.
  const mainPkgs = plan.packages.filter((p) => !p.standalone);
  const standalone = plan.packages.filter((p) => p.standalone);
  const focusPkg = mainPkgs.find((p) => p.id === cart.pkgId) ?? mainPkgs.find((p) => p.popular) ?? mainPkgs[0];
  const included = CONTENTS[focusPkg.id];
  const missing = testsFor(plan).filter((t) => !included.includes(t.name));

  const chosen = plan.packages.find((p) => p.id === cart.pkgId);
  const extras = chosen && !chosen.standalone ? cart.extras.filter((n) => !CONTENTS[chosen.id].includes(n)) : [];
  const extrasTotal = extras.reduce((sum, n) => sum + addOnPrice(plan, testByName(n)!, tier, chosen), 0);
  const total = chosen ? packagePrice(chosen, tier) + extrasTotal + cart.pros * plan.extras.professional : 0;
  // Bij een eigen pakket: is een vast pakket (met testen erbij) goedkoper voor dezelfde testen?
  const bestDeal = chosen?.custom && extras.length ? cheapestPackage(plan, extras, tier) : null;
  const deal = bestDeal && bestDeal.total < extrasTotal ? bestDeal : null;
  // Samenvatting van "Jouw pakket" als begin van het bericht bij "Offerte aanvragen".
  const summary = chosen
    ? [
        `${plan.label}: ${chosen.name}, t/m ${count} ${plan.unit}`,
        ...extras.map((n) => `+ ${n}`),
        cart.pros ? `+ ${cart.pros} extra professional${cart.pros > 1 ? "s" : ""}` : "",
        `Totaal: ${euro(total)} ${plan.vat}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";
  const switchSegment = (k: Segment) => {
    setSegment(k);
    setCart(EMPTY);
    setOpen(false);
  };
  const choose = (id: string) => {
    setCart((c) => ({ ...c, pkgId: id }));
    setOpen(true);
  };
  const toggleExtra = (n: TestName) => {
    setCart((c) => ({
      pkgId: c.pkgId && mainPkgs.some((p) => p.id === c.pkgId) ? c.pkgId : focusPkg.id,
      pros: c.pros,
      extras: c.extras.includes(n) ? c.extras.filter((x) => x !== n) : [...c.extras, n],
    }));
    setOpen(true);
  };
  // Vinkje op de kaart "Eigen pakket": kiest het eigen pakket, zet de test aan of uit en opent het paneel.
  const toggleCustom = (id: string, n: TestName) => {
    setCart((c) => {
      const current = c.pkgId === id ? c.extras : [];
      return { pkgId: id, pros: c.pros, extras: current.includes(n) ? current.filter((x) => x !== n) : [...current, n] };
    });
    setOpen(true);
  };

  // Escape sluit het paneel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const tip = (name: string) => {
    const t = testByName(name);
    return t ? <InfoTip name={t.name} what={t.what} benefit={t.benefit} unitOne={plan.unitOne} /> : null;
  };

  return (
    <main className={s.page}>
      {/* ---------- Kop en keuzes ---------- */}
      <section className={s.hero}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Prijzen</p>
          <h1 className={s.title}>
            Eén abonnement, <span className={s.grad}>passend bij jouw aantal</span>.
          </h1>
          <p className={s.intro}>
            Kies voor wie je Helios gebruikt en hoeveel {plan.unit} je per jaar begeleidt. Je ziet meteen wat elk pakket kost. Een
            vast pakket is altijd het voordeligst.
          </p>

          <div className={s.controls}>
            <div className={s.segment} role="radiogroup" aria-label="Voor wie">
              {(Object.keys(PLANS) as Segment[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={segment === k} className={segment === k ? s.segOn : s.segBtn} onClick={() => switchSegment(k)}>
                  {PLANS[k].label}
                </button>
              ))}
            </div>

            <div className={s.tierWrap}>
              <span className={s.tierLabel}>Aantal {plan.unit} per jaar</span>
              <div className={s.tiers} role="radiogroup" aria-label={`Aantal ${plan.unit} per jaar`}>
                {plan.tiers.map((t, i) => (
                  <button key={t} type="button" role="radio" aria-checked={tier === i} className={tier === i ? s.tierOn : s.tierBtn} onClick={() => setTier(i)}>
                    t/m {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Pakketten ---------- */}
      <section className={`${s.inner} ${s.stage}`} aria-label="Pakketten">
        <div className={s.orbs} aria-hidden="true"><i /><i /><i /></div>
        <div className={s.cards}>
          {mainPkgs.map((p) => {
            const price = p.prices[tier];
            const isChosen = cart.pkgId === p.id;

            // Eigen pakket: geen vaste prijs. Drie testen om meteen aan te vinken; de rest kies je in het paneel.
            if (p.custom) {
              const picks: TestName[] = ["Beroepentest", "Skills", "Enneagram"];
              return (
                <article key={p.id} className={`${s.cardCustom}`}>
                  <svg className={s.customWaves} viewBox="0 0 200 160" aria-hidden="true">
                    <path d="M40 0c10 40 40 60 80 70s70 40 80 90V0Z" />
                    <path d="M95 0c8 30 30 45 60 52s40 25 45 48V0Z" />
                  </svg>
                  <span className={s.customIcon} aria-hidden="true">
                    <Icon size={26}>
                      <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
                      <path d="m3 12 9 4.5 9-4.5" />
                      <path d="m3 16.5 9 4.5 9-4.5" />
                    </Icon>
                  </span>
                  <h2 className={s.customName}>Eigen pakket</h2>
                  <p className={s.customPitch}>Stel zelf je ideale pakket samen en betaal alleen voor de testen die je nodig hebt.</p>
                  <div className={s.customPicks} role="group" aria-label={`Testen voor je eigen pakket, prijzen bij ${count} ${plan.unit}`}>
                    {picks.map((n) => {
                      const on = isChosen && cart.extras.includes(n);
                      return (
                        <label key={n} className={s.pick}>
                          <input type="checkbox" checked={on} onChange={() => toggleCustom(p.id, n)} />
                          <span className={s.box} aria-hidden="true"><Check /></span>
                          <span className={s.pickName}>{n}</span>
                          <span className={s.pickPrice}>{euro(addOnPrice(plan, testByName(n)!, tier, p))}</span>
                        </label>
                      );
                    })}
                  </div>
                  <button type="button" className={s.ctaCustom} onClick={() => choose(p.id)}>
                    <span>{isChosen && extras.length ? `Bekijk je pakket · ${euro(total)}` : "Stel je pakket samen"}</span>
                    <Arrow />
                  </button>
                  <div className={s.customFeat}>
                    <span className={s.featIcon} aria-hidden="true">
                      <Icon size={22}>
                        <path d="M4 6h16M4 12h16M4 18h16" />
                        <circle cx="9" cy="6" r="2" />
                        <circle cx="15" cy="12" r="2" />
                        <circle cx="10" cy="18" r="2" />
                      </Icon>
                    </span>
                    <span>
                      <b>Volledig op maat</b>
                      Flexibel, schaalbaar en altijd uit te breiden.
                    </span>
                  </div>
                </article>
              );
            }

            return (
              <article key={p.id} className={`${p.popular ? s.cardHi : s.card}`}>
                {p.popular && <span className={s.badge}>Meest gekozen</span>}
                <h2 className={s.cardName}>{p.name}</h2>
                <p className={s.pitch}>{p.pitch}</p>
                <div className={s.priceRow}>
                  <span key={`${segment}-${tier}-${p.id}`} className={s.price}>{euro(price)}</span>
                  <span className={s.per}>{plan.vat}</span>
                </div>
                <p className={s.perUnit}>
                  {euro(Math.round(price / count))} per {plan.unitOne} bij {count} {plan.unit}
                </p>
                <button type="button" className={p.popular ? s.ctaHi : s.cta} onClick={() => choose(p.id)}>
                  <span>{isChosen ? "Gekozen, bekijk je pakket" : `Kies ${p.name}`}</span>
                  {isChosen ? <Check /> : <Arrow />}
                </button>
                <ul className={s.list}>
                  {p.highlights.map((h) => (
                    <li key={h}>
                      <Check />
                      <span className={s.liText}>{h}</span>
                      {tip(h)}
                    </li>
                  ))}
                  {plan.freeTests.map((n) => (
                    <li key={n} className={s.freeItem}>
                      <Check />
                      <span className={s.liText}>{n} <b>gratis</b></span>
                      {tip(n)}
                    </li>
                  ))}
                  {segment === "onderwijs" && (
                    <li className={s.freeItem}>
                      <Check />
                      <span className={s.liText}>Studiekeuzetest <b>gratis</b></span>
                      <InfoTip {...STUDY_TESTS} unitOne={plan.unitOne} />
                    </li>
                  )}
                </ul>
              </article>
            );
          })}

          {segment === "onderwijs" && (
            <article className={s.card}>
              <h2 className={s.cardName}>Studiekeuzetest op je website</h2>
              <p className={s.pitch}>Aankomende leerlingen doen de test op jullie eigen site en zien welke van jullie opleidingen passen.</p>
              <div className={s.priceRow}>
                <span className={s.from}>vanaf</span>
                <span className={s.price}>{euro(255)}</span>
                <span className={s.per}>per jaar, btw-vrij</span>
              </div>
              <p className={s.perUnit}>Los af te nemen, ook zonder pakket</p>
              <a className={s.cta} href="#schoolsite">
                <span>Bereken je prijs</span>
                <Arrow />
              </a>
              <ul className={s.list}>
                <li><Check /><span className={s.liText}>Gekoppeld aan jullie opleidingen</span></li>
                <li><Check /><span className={s.liText}>Bezoekers tellen niet mee als leerling</span></li>
              </ul>
            </article>
          )}
        </div>

        {standalone.map((p) => (
          <div key={p.id} className={s.solo}>
            <span className={s.soloIcon} aria-hidden="true">
              <Icon size={22}>
                <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9Z" />
              </Icon>
            </span>
            <div className={s.soloText}>
              <b>
                {p.name} nodig? {tip("Skills")}
              </b>
              <span>{p.pitch} Voor wie alleen wil zien welke beroepen bij iemands skills passen.</span>
            </div>
            <div className={s.soloPrice}>
              <b key={`${p.id}-${tier}`}>{euro(p.prices[tier])}</b>
              <span>per jaar bij {count} {plan.unit}</span>
            </div>
            <button type="button" className={s.soloCta} onClick={() => choose(p.id)}>
              {cart.pkgId === p.id ? "Bekijk je pakket" : `Kies ${p.name}`}
              <Arrow />
            </button>
          </div>
        ))}

        <div className={s.includedBar}>
          <span className={s.includedTitle}>Altijd inbegrepen</span>
          {plan.included.map((i) => (
            <span key={i} className={s.chip}><Check />{i}</span>
          ))}
          <span className={s.maxNote}>
            {plan.maxNote} <a href={contactUrl("offerte", `Meer dan ${plan.tiers[plan.tiers.length - 1]} ${plan.unit}`)}>Neem contact op</a>
          </span>
        </div>
      </section>

      {/* ---------- Mis je een test? ---------- */}
      <section className={`${s.inner} ${s.stage}`} aria-labelledby="erbij">
        <div className={s.orbs} aria-hidden="true"><i /><i /><i /></div>
        <div className={s.head}>
          <p className={s.eyebrow}>Uitbreiden</p>
          <h2 id="erbij" className={s.h2}>
            {focusPkg.custom ? "Kies de testen voor je eigen pakket." : `Mis je een test in ${focusPkg.name}? Zet hem erbij.`}
          </h2>
          <p className={s.sub}>
            {focusPkg.custom
              ? `Klik op een test om hem aan je eigen pakket toe te voegen. Prijzen bij ${count} ${plan.unit}, per jaar.`
              : missing.length
              ? `Klik op een test om hem aan je pakket toe te voegen. Prijzen bij ${count} ${plan.unit}, per jaar.`
              : `In ${focusPkg.name} zitten alle testen al. Je kunt alleen nog extra professionals toevoegen.`}
          </p>
        </div>
        <div className={s.addGrid}>
          {missing.map((t) => {
            const on = extras.includes(t.name) || (!chosen && cart.extras.includes(t.name));
            return (
              <div key={t.name} className={on ? s.addOn : s.add}>
                <button type="button" className={s.addHit} aria-pressed={on} onClick={() => toggleExtra(t.name)}>
                  <span className={s.addName}>{t.name}</span>
                  <span className={s.addWhat}>{t.what}</span>
                  <span className={s.addFoot}>
                    <span className={s.addPrice}>+ {euro(addOnPrice(plan, t, tier, focusPkg))}</span>
                    <span className={s.addState}>{on ? <><Check /> Toegevoegd</> : <><Plus /> Toevoegen</>}</span>
                  </span>
                </button>
                <span className={s.addInfo}>
                  <InfoTip name={t.name} what={t.what} benefit={t.benefit} unitOne={plan.unitOne} />
                </span>
              </div>
            );
          })}
          <div className={cart.pros ? s.addOn : s.add}>
            <div className={s.addHit}>
              <span className={s.addName}>Extra professional</span>
              <span className={s.addWhat}>Een extra {plan.professionalLabel}, met dezelfde {plan.unit}.</span>
              <span className={s.addFoot}>
                <span className={s.addPrice}>+ {euro(plan.extras.professional)}</span>
                <span className={s.stepper}>
                  <button type="button" aria-label="Eén professional minder" disabled={!cart.pros} onClick={() => setCart((c) => ({ ...c, pros: Math.max(0, c.pros - 1) }))}>−</button>
                  <b>{cart.pros}</b>
                  <button
                    type="button"
                    aria-label="Eén professional meer"
                    onClick={() => {
                      setCart((c) => ({ ...c, pkgId: c.pkgId ?? focusPkg.id, pros: c.pros + 1 }));
                      setOpen(true);
                    }}
                  >
                    +
                  </button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Vergelijken ---------- */}
      <section className={s.inner} aria-labelledby="vergelijk">
        <div className={s.head}>
          <p className={s.eyebrow}>Vergelijken</p>
          <h2 id="vergelijk" className={s.h2}>Welke test zit in welk pakket?</h2>
          <p className={s.sub}>Klik op de i voor uitleg over een test.</p>
        </div>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Test</th>
                {mainPkgs.map((p) => (
                  <th key={p.id} className={p.popular ? s.thHi : undefined}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testsFor(plan).map((t) => (
                <tr key={t.name}>
                  <td>
                    <span className={s.testName}>
                      {t.name}
                      <InfoTip name={t.name} what={t.what} benefit={t.benefit} unitOne={plan.unitOne} />
                    </span>
                    <span className={s.testWhat}>{t.what}</span>
                  </td>
                  {mainPkgs.map((p) => (
                    <td key={p.id} className={s.cell}>
                      {plan.freeTests.includes(t.name) ? (
                        <span className={s.freeTag}>gratis</span>
                      ) : CONTENTS[p.id].includes(t.name) ? (
                        <span className={s.yes}><Check /></span>
                      ) : p.custom ? (
                        <span className={s.choice}>naar keuze</span>
                      ) : (
                        <span className={s.no}>–</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {segment === "onderwijs" && (
                <tr>
                  <td>
                    <span className={s.testName}>
                      {STUDY_TESTS.name}
                      <InfoTip {...STUDY_TESTS} unitOne={plan.unitOne} />
                    </span>
                    <span className={s.testWhat}>{STUDY_TESTS.what}</span>
                  </td>
                  {mainPkgs.map((p) => (
                    <td key={p.id} className={s.cell}><span className={s.freeTag}>gratis</span></td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- Studiekeuzetest op de schoolsite ---------- */}
      {segment === "onderwijs" && (
        <section id="schoolsite" className={s.inner} aria-labelledby="schoolsite-kop">
          <div className={s.calc}>
            <div className={s.calcText}>
              <p className={s.eyebrow}>Rekenhulp</p>
              <h2 id="schoolsite-kop" className={s.h2}>Studiekeuzetest op jullie eigen website</h2>
              <p className={s.sub}>Je betaalt per gekoppelde opleiding. Hoe meer opleidingen, hoe lager de prijs per opleiding.</p>
              <ul className={s.steps}>
                <li><span>1e opleiding</span><b>{euro(255)}</b></li>
                <li><span>2 t/m 10</span><b>+ {euro(85)}</b></li>
                <li><span>11 t/m 20</span><b>+ {euro(45)}</b></li>
                <li><span>21 t/m 150</span><b>+ {euro(20)}</b></li>
                <li><span>151 t/m 300</span><b>+ {euro(12)}</b></li>
              </ul>
            </div>
            <div className={s.calcBox}>
              <label htmlFor="opleidingen" className={s.calcLabel}>
                Aantal opleidingen <b>{courses}</b>
              </label>
              <input id="opleidingen" type="range" min={1} max={300} value={courses} onChange={(e) => setCourses(Number(e.target.value))} className={s.range} />
              <label className={s.toggle} htmlFor="hbo">
                <input id="hbo" type="checkbox" checked={higherEd} onChange={(e) => setHigherEd(e.target.checked)} />
                Hbo of wo (+ {euro(100)} vanaf 2 opleidingen)
              </label>
              <div className={s.calcTotal}>
                <span className={s.calcPrice}>{euro(schoolSitePrice(courses, higherEd))}</span>
                <span className={s.per}>per jaar, btw-vrij</span>
              </div>
              <p className={s.perUnit}>
                {euro(Math.round(schoolSitePrice(courses, higherEd) / courses))} per opleiding · meer dan 300: maatwerk
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Veelgestelde vragen ---------- */}
      <section className={s.inner} aria-labelledby="faq">
        <div className={s.faqGrid}>
          <div className={s.head}>
            <p className={s.eyebrow}>Veelgestelde vragen</p>
            <h2 id="faq" className={s.h2}>Goed om te weten</h2>
            <p className={s.sub}>
              Staat je vraag er niet bij? <a href={CONTACT_URL}>Neem contact op</a>, we denken graag mee.
            </p>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.qa}>
                <summary>
                  {f.q}
                  <span className={s.plus} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <p className={s.personal}>
        Ben je cliënt of leerling en wil je zelf testen doen? <a href={SIGNUP_URL}>Maak een gratis account</a>.
      </p>

      {/* ---------- Knop naar het paneel als het dicht is ---------- */}
      {chosen && !open && (
        <button type="button" className={s.cartFab} onClick={() => setOpen(true)}>
          <Bag />
          <span>Jouw pakket</span>
          <b>{euro(total)}</b>
        </button>
      )}

      {/* ---------- Paneel "Jouw pakket" ---------- */}
      <div className={open ? s.backdropOn : s.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={open ? s.drawerOn : s.drawer} aria-label="Jouw pakket" aria-hidden={!open} inert={!open}>
        <div className={s.drawerHead}>
          <div>
            <span className={s.drawerEyebrow}>{plan.label}</span>
            <h2 className={s.drawerTitle}>Jouw pakket</h2>
          </div>
          <button type="button" className={s.drawerClose} aria-label="Sluiten" onClick={() => setOpen(false)}>
            <Close />
          </button>
        </div>

        {chosen && (
          <div className={s.drawerBody}>
            <div className={s.dGroup}>
              <span className={s.dLabel}>Pakket</span>
              <div className={s.dPkgs}>
                {plan.packages.filter((p) => !p.standalone || p.id === chosen.id).map((p) => (
                  <button key={p.id} type="button" className={p.id === chosen.id ? s.dPkgOn : s.dPkg} onClick={() => setCart((c) => ({ ...c, pkgId: p.id }))}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.dGroup}>
              <label className={s.dLabel} htmlFor="d-tier">Aantal {plan.unit} per jaar</label>
              <select id="d-tier" className={s.dSelect} value={tier} onChange={(e) => setTier(Number(e.target.value))}>
                {plan.tiers.map((t, i) => (
                  <option key={t} value={i}>t/m {t} {plan.unit}</option>
                ))}
              </select>
            </div>

            <div className={s.dLines}>
              <div className={s.dLine}>
                <span><b>{chosen.name}</b> · t/m {count} {plan.unit}</span>
                {chosen.custom ? <span className={s.dHint}>je betaalt per test</span> : <b>{euro(chosen.prices[tier])}</b>}
              </div>
              <ul className={s.dIncluded}>
                {CONTENTS[chosen.id].map((n) => (
                  <li key={n}><Check />{n}{plan.freeTests.includes(n) ? " (gratis)" : ""}</li>
                ))}
                {segment === "onderwijs" && <li><Check />Studiekeuzetest, Studieswiper en RIASEC (studie) gratis</li>}
              </ul>
              {chosen.custom && extras.length === 0 && (
                <p className={s.dEmpty}>Je hebt nog geen testen gekozen. Kies hieronder welke testen je wilt.</p>
              )}
              {deal && (
                <div className={s.dDeal}>
                  <p>
                    <b>Voordeliger met {deal.pkg.name}.</b> Met {deal.pkg.name}
                    {deal.extras.length ? ` en ${deal.extras.length === 1 ? "1 test" : `${deal.extras.length} testen`} erbij` : ""} krijg je dezelfde
                    testen voor {euro(deal.total)} in plaats van {euro(extrasTotal)}. Je bespaart {euro(extrasTotal - deal.total)}
                    {CONTENTS[deal.pkg.id].filter((n) => !plan.freeTests.includes(n)).length > extras.length ? " en je krijgt er nog testen bij" : ""}.
                  </p>
                  <button type="button" onClick={() => setCart((c) => ({ ...c, pkgId: deal.pkg.id }))}>
                    Wissel naar {deal.pkg.name}
                    <Arrow />
                  </button>
                </div>
              )}

              {extras.map((n) => (
                <div key={n} className={s.dLine}>
                  <span>{n}</span>
                  <span className={s.dRight}>
                    <b>{euro(addOnPrice(plan, testByName(n)!, tier, chosen))}</b>
                    <button type="button" className={s.dRemove} aria-label={`${n} verwijderen`} onClick={() => toggleExtra(n)}>
                      <Close />
                    </button>
                  </span>
                </div>
              ))}

              <div className={s.dLine}>
                <span>Extra professionals</span>
                <span className={s.dRight}>
                  {cart.pros > 0 && <b>{euro(cart.pros * plan.extras.professional)}</b>}
                  <span className={s.stepper}>
                    <button type="button" aria-label="Eén professional minder" disabled={!cart.pros} onClick={() => setCart((c) => ({ ...c, pros: Math.max(0, c.pros - 1) }))}>−</button>
                    <b>{cart.pros}</b>
                    <button type="button" aria-label="Eén professional meer" onClick={() => setCart((c) => ({ ...c, pros: c.pros + 1 }))}>+</button>
                  </span>
                </span>
              </div>
            </div>

            {chosen.standalone && (
              <p className={s.dNote}>{chosen.name} is een los product. Wil je meer testen? Kies hierboven een pakket of stel je eigen pakket samen.</p>
            )}
            {!chosen.standalone && testsFor(plan).some((t) => !CONTENTS[chosen.id].includes(t.name) && !extras.includes(t.name)) && (
              <div className={s.dGroup}>
                <span className={s.dLabel}>Voeg een test toe</span>
                <div className={s.dAdd}>
                  {testsFor(plan).filter((t) => !CONTENTS[chosen.id].includes(t.name) && !extras.includes(t.name)).map((t) => (
                    <span key={t.name} className={s.dAddItem}>
                      <button type="button" className={s.dAddBtn} onClick={() => toggleExtra(t.name)}>
                        <Plus />
                        <span>{t.name}</span>
                        <span className={s.dAddPrice}>{euro(addOnPrice(plan, t, tier, chosen))}</span>
                      </button>
                      <InfoTip name={t.name} what={t.what} benefit={t.benefit} unitOne={plan.unitOne} />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {chosen && (
          <div className={s.drawerFoot}>
            <div className={s.dTotal}>
              <span>Totaal per jaar</span>
              <b key={total}>{euro(total)}</b>
            </div>
            <p className={s.dVat}>
              {plan.vatRate ? `Excl. btw. Incl. 21% btw: ${euroCents(total * (1 + plan.vatRate))}` : "Btw-vrij (CRKBO)"}
            </p>
            {total > 0 ? (
              <a className={s.dCta} href={ORDER_URL}>
                <span>Bestellen</span>
                <Arrow />
              </a>
            ) : (
              <span className={s.dCtaOff} aria-disabled="true">Kies eerst een test</span>
            )}
            <a className={s.dCta2} href={contactUrl("offerte", `Prijzen: ${chosen.name}`, summary)}>Offerte aanvragen</a>
          </div>
        )}
      </aside>
    </main>
  );
}
