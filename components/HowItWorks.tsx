"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_MS = 5000;

const STEPS = [
  {
    title: "Nodig je cliënten uit",
    body: "Stuur een uitnodiging per e-mail. Je cliënt maakt zelf een account aan en kan direct beginnen.",
    src: "/assets/screens/02-clienten-uitnodigen.png",
    alt: "Het venster Nieuwe cliënt uitnodigen in Helios, met voornaam, achternaam en e-mailadres ingevuld",
  },
  {
    title: "Volg de voortgang",
    body: "Je cliënt maakt de testen online, op elk apparaat en in zijn eigen tempo. In je overzicht zie je direct wie waar staat.",
    src: "/assets/screens/03-voortgang-volgen.png",
    alt: "Het cliëntenoverzicht in Helios met per cliënt de status, zoals actief, uitgenodigd of in afwachting",
  },
  {
    title: "Bespreek de resultaten",
    body: "Bekijk per cliënt alle resultaten en rapporten. Jij bepaalt wat je deelt en voert een goed onderbouwd gesprek.",
    src: "/assets/screens/04-resultaten-bespreken.png",
    alt: "De pagina van een cliënt in Helios met testresultaten per instrument en rapportages die je kunt delen",
  },
];

// Sectie "Hoe het werkt": drie stappen met een slideshow van echte schermen uit het platform.
// De slideshow loopt vanzelf door; klikken kiest een stap, hover pauzeert.
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % STEPS.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, reduced]);

  return (
    <section className="how" id="hoe-het-werkt" aria-labelledby="how-title">
      <div className="how-inner">
        <div className="how-head">
          <p className="how-eyebrow">
            <span className="how-eyebrow-dot" aria-hidden="true" />
            HOE HET WERKT
          </p>
          <h2 className="how-title" id="how-title">
            In drie stappen <span className="how-title-accent">aan de slag</span>
          </h2>
          <p className="how-intro">Geen ingewikkelde installatie of training. Je nodigt je eerste cliënt binnen een paar minuten uit.</p>
        </div>

        <div className="how-body" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="how-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={`how-step${i === active ? " is-active" : ""}`}
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => setActive(i)}
                >
                  <span className="how-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="how-step-text">
                    <span className="how-step-title">{s.title}</span>
                    <span className="how-step-desc">{s.body}</span>
                  </span>
                  {/* Voortgangsbalk; loopt gelijk op met de timer en begint opnieuw na een pauze. */}
                  {i === active && !paused && !reduced && <span key={active} className="how-step-progress" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>

          <div className="how-frame">
            <div className="how-frame-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="how-slides">
              {STEPS.map((s, i) => (
                <Image
                  key={s.src}
                  className={`how-slide${i === active ? " is-active" : ""}`}
                  src={s.src}
                  alt={s.alt}
                  width={3200}
                  height={2000}
                  sizes="(max-width: 1099px) 100vw, 60vw"
                  priority={i === 0}
                  aria-hidden={i !== active}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="how-actions">
          <a className="how-btn" href="#">
            <span>Plan een demo</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16" />
              <path d="m14 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
