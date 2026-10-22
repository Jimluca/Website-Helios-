"use client";

import { useLayoutEffect, useState } from "react";

// Licht/donker. De keuze staat in localStorage; zonder keuze volgt de site het apparaat.
// Het inline script in app/layout.tsx zet het thema al vóór de eerste weergave (geen flits).
export const THEME_KEY = "helios-theme";

type Theme = "light" | "dark";

function current(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    // In development haalt React het attribuut bij de tweede mount weg; zet het opnieuw.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {}
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const next: Theme = stored === "dark" || stored === "light" ? stored : media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    apply();
    // Zonder eigen keuze meewisselen met het apparaat.
    const follow = () => {
      if (!stored) apply();
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  function toggle() {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      aria-label="Donkere modus"
      aria-pressed={dark}
      title={dark ? "Lichte modus aanzetten" : "Donkere modus aanzetten"}
      onClick={toggle}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
