"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

const SLIDE_MS = 5000;
// Een stap met meerdere schermen (de uitslagen) toont elk scherm zo lang.
const SHOT_MS = 2400;

type Shot = { src: string; alt: string; label?: string };

const STEPS: { title: string; body: string; shots: Shot[] }[] = [
  {
    title: "Nodig je cliënten uit",
    body: "Stuur een uitnodiging per e-mail. Je cliënt maakt zelf een account aan en kan direct beginnen.",
    shots: [
      {
        src: "/assets/screens/02-clienten-uitnodigen.png",
        alt: "Het venster Nieuwe cliënt uitnodigen in Helios, met voornaam, achternaam en e-mailadres ingevuld",
      },
    ],
  },
  {
    title: "Volg de voortgang",
    body: "Je cliënt ziet in een eigen dashboard welke testen klaarstaan en wat al af is. Jij ziet in je overzicht direct wie waar staat.",
    shots: [
      {
        src: "/assets/screens/03-client-dashboard.png",
        alt: "Het dashboard van een cliënt in Helios: de testen waarvoor de cliënt is uitgenodigd, de voortgang en de recente uitslagen",
      },
    ],
  },
  {
    title: "Bespreek de resultaten",
    body: "Bekijk per cliënt de uitslagen en bepaal zelf wat je deelt. Zo voer je een goed onderbouwd gesprek.",
    shots: [
      {
        src: "/assets/screens/04-uitslag-bekende-beroepen.png",
        alt: "De uitslag Jouw beroepen in Helios: bekende beroepen zoals politiemedewerker, scheidsrechter en winkelsurveillant met een matchpercentage, en uitleg over politiemedewerker",
        label: "Beroepen",
      },
      {
        src: "/assets/screens/04-uitslag-opleidingen.png",
        alt: "De uitslag Jouw opleidingen in Helios: passende opleidingen met een matchpercentage en uitleg per opleiding",
        label: "Opleidingen",
      },
      {
        src: "/assets/screens/04-uitslag-loopbaanwaarden.png",
        alt: "De uitslag Jouw loopbaanwaarden in Helios: twintig waarden op volgorde en de loopbaancirkel",
        label: "Loopbaanwaarden",
      },
    ],
  },
];

const duration = (i: number) => (STEPS[i].shots.length > 1 ? SHOT_MS * STEPS[i].shots.length : SLIDE_MS);

// Sectie "Hoe het werkt": drie stappen met een slideshow van echte schermen uit het platform.
// De slideshow loopt vanzelf door; klikken kiest een stap (of bij stap 3 een uitslag), hover pauzeert.
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
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
    const shots = STEPS[active].shots.length;
    const timer = window.setTimeout(
      () => {
        if (shot < shots - 1) {
          setShot(shot + 1);
        } else {
          setActive((active + 1) % STEPS.length);
          setShot(0);
        }
      },
      shots > 1 ? SHOT_MS : SLIDE_MS,
    );
    return () => clearTimeout(timer);
  }, [active, shot, paused, reduced]);

  const choose = (i: number) => {
    setActive(i);
    setShot(0);
  };

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
              <li key={s.title} className="how-step-item">
                <button
                  type="button"
                  className={`how-step${i === active ? " is-active" : ""}${s.shots.length > 1 ? " has-points" : ""}`}
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => choose(i)}
                >
                  <span className="how-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="how-step-text">
                    <span className="how-step-title">{s.title}</span>
                    <span className="how-step-desc">{s.body}</span>
                  </span>
                  {/* Voortgangsbalk; loopt gelijk op met de timer en begint opnieuw na een pauze. */}
                  {i === active && !paused && !reduced && (
                    <span key={active} className="how-step-progress" style={{ animationDuration: `${duration(i)}ms` } as CSSProperties} aria-hidden="true" />
                  )}
                </button>
                {/* Stap 3: drie puntjes, één per uitslag; het actieve puntje is het scherm dat je ziet. */}
                {s.shots.length > 1 && (
                  <ul className="how-points" aria-label="Uitslagen">
                    {s.shots.map((sh, j) => {
                      const on = i === active && j === shot;
                      return (
                        <li key={sh.src}>
                          <button
                            type="button"
                            className={`how-point${on ? " is-active" : ""}`}
                            aria-pressed={on}
                            onClick={() => {
                              setActive(i);
                              setShot(j);
                            }}
                          >
                            <span className="how-point-dot" aria-hidden="true" />
                            {sh.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
              {STEPS.flatMap((s, i) =>
                s.shots.map((sh, j) => {
                  const on = i === active && j === shot;
                  return (
                    <Image
                      key={sh.src}
                      className={`how-slide${on ? " is-active" : ""}`}
                      src={sh.src}
                      alt={sh.alt}
                      width={3200}
                      height={2000}
                      sizes="(max-width: 1099px) 100vw, 60vw"
                      priority={i === 0}
                      aria-hidden={!on}
                    />
                  );
                }),
              )}
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
