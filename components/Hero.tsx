import type { CSSProperties, ReactNode } from "react";
import HeroVisual from "./HeroVisual";
import { SIGNUP_URL } from "@/lib/app-links";

// Vier snelle ingangen onder de knoppen. De links volgen zodra de pagina's er zijn.
const TOOLS: { title: string; body: string; href: string; color: string; bg: string; icon: ReactNode }[] = [
  {
    title: "Zoek per school",
    body: "Ontdek opleidingen binnen een organisatie",
    href: "#",
    color: "#4A1FC9",
    bg: "#EDE7FF",
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
        <path d="M10 10h4" />
      </>
    ),
  },
  {
    title: "Opleidingen swiper",
    body: "Swipe door opleidingen die bij jou passen",
    href: "#",
    color: "#6639EC",
    bg: "#EFEAFF",
    icon: (
      <>
        <rect x="7" y="3" width="10" height="15" rx="2" />
        <path d="M4 6v9a2 2 0 0 0 1 1.7" />
        <path d="M20 6v9a2 2 0 0 1-1 1.7" />
        <path d="m9 21 3-2 3 2" />
      </>
    ),
  },
  {
    title: "Zoek per sector",
    body: "Ontdek welke opleidingen bij favoriete sectoren passen",
    href: "#",
    color: "#7B5CF0",
    bg: "#F2EEFF",
    icon: (
      <>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
      </>
    ),
  },
  {
    title: "Populaire testen",
    body: "Bekijk de testen die het meest gemaakt worden",
    href: "#",
    color: "#8F74F5",
    bg: "#F5F2FF",
    icon: <path d="M11.5 2.8a.6.6 0 0 1 1 0l2.6 5.3 5.8.8a.6.6 0 0 1 .3 1l-4.2 4.1 1 5.8a.6.6 0 0 1-.9.6L12 17.6l-5.2 2.8a.6.6 0 0 1-.9-.6l1-5.8-4.2-4.1a.6.6 0 0 1 .3-1l5.8-.8z" />,
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <HeroVisual />

      <div className="hero-copy">
        <p className="hero-eyebrow">STUDIE- EN LOOPBAANTESTEN VOOR IEDEREEN</p>

        <h1 className="hero-title">
          <span>Brengt talent</span>
          <span>
            aan het{" "}
            <span className="licht">
              <span className="licht-glow" aria-hidden="true" />
              <span className="licht-text">licht</span>
            </span>
          </span>
        </h1>

        <p className="hero-intro">
          Maak verschillende testen, ontdek je talenten, <br />
          interesses en mogelijkheden en krijg direct <br />
          persoonlijk advies voor je studie, werk of volgende stap.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={SIGNUP_URL}>
            Maak de gratis studiekeuzetest
            <ArrowIcon />
          </a>
          {/* TODO: doorlinken naar de pagina met alle testen zodra die er is. */}
          <a className="btn btn-secondary" href="#">
            Bekijk de testen
          </a>
        </div>

        <div className="hero-tools">
          {TOOLS.map((t) => (
            <a key={t.title} className="hero-tool" href={t.href} style={{ "--tool-color": t.color, "--tool-bg": t.bg } as CSSProperties}>
              <span className="hero-tool-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {t.icon}
                </svg>
              </span>
              <span className="hero-tool-text">
                <span className="hero-tool-title">{t.title}</span>
                <span className="hero-tool-body">{t.body}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
