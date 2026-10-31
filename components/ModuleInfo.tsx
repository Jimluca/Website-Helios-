"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Package } from "@/lib/pricing-shared";

// De uitleg achter de "i" bij een test of module in de prijscalculator: per test wat het is en waarvoor (de verkooptekst
// uit Helios › Testen), hoe het werkt en wat het oplevert. Onderaan de prijs met een knop om de module toe te voegen, of
// dat de test al in het pakket zit. Een <dialog>, zodat Escape, de focus en de achtergrond vanzelf goed gaan.

export type TestInfo = NonNullable<Package["info"]>[number];

const ICON = {
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
};

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function ModuleInfo({
  title,
  eyebrow,
  info,
  fallback,
  foot,
  onClose,
}: {
  title: string;
  eyebrow: string;
  info: TestInfo[];
  /** De tekst als er geen uitleg per test is (bijv. bij een extra professional). */
  fallback?: string | null;
  /** Onderaan: de prijs en wat je ermee doet (die knoppen sluiten het venster via onClose van de ouder). */
  foot: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => dialog?.close();
  }, []);

  const close = () => ref.current?.close();
  const many = info.length > 1;
  const results = [...new Set(info.flatMap((test) => test.results))];

  return (
    <dialog
      ref={ref}
      className="mi"
      aria-labelledby="mi-title"
      onClose={onClose}
      // Klik op de achtergrond sluit het venster.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="mi-body">
        <button type="button" className="mi-close" aria-label="Sluiten" onClick={close}>
          <Icon d={ICON.x} size={18} />
        </button>
        <p className="mi-eyebrow">
          <Icon d={ICON.spark} size={13} />
          {eyebrow}
        </p>
        <h2 className="mi-title" id="mi-title">
          {title}
        </h2>

        {info.length === 0 && fallback && <p className="mi-pitch">{fallback}</p>}

        {info.map((test) => (
          <section key={test.name} className="mi-test">
            {many && <h3 className="mi-test-name">{test.name}</h3>}
            <p className="mi-pitch">{test.pitch}</p>
            <h4 className="mi-sub">Zo werkt het</h4>
            <p className="mi-how">{test.how}</p>
          </section>
        ))}

        {results.length > 0 && (
          <>
            <h4 className="mi-sub">Wat het oplevert</h4>
            <ul className="mi-results">
              {results.map((line) => (
                <li key={line}>
                  <Icon d={ICON.check} size={14} />
                  {line}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mi-foot">{foot}</div>
      </div>
    </dialog>
  );
}
