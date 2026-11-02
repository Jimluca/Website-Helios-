import type { ReactNode } from "react";
import Icon from "./Icon";

// Bouwstenen voor Over ons, Voor professionals en Voor scholen (stijlen in app/pages.css).

export function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return <p className={`pg-eyebrow${center ? " is-center" : ""}`}>{children}</p>;
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="pg-accent">{children}</span>;
}

export function PrimaryButton({ href, children, arrow = true }: { href: string; children: ReactNode; arrow?: boolean }) {
  return (
    <a className="pg-btn pg-btn-primary" href={href}>
      {children}
      {arrow && <Icon name="arrow" size={20} stroke={2.2} />}
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="pg-btn pg-btn-secondary" href={href}>
      {children}
    </a>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`pg-checks ${className}`}>
      {items.map((t) => (
        <li key={t}>
          <span className="pg-check" aria-hidden="true">
            <Icon name="check" size={14} stroke={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function IconBadge({ name, size = "md", square }: { name: string; size?: "sm" | "md" | "lg"; square?: boolean }) {
  return (
    <span className={`pg-icon is-${size}${square ? " is-square" : ""}`} aria-hidden="true">
      <Icon name={name} />
    </span>
  );
}

// Afsluitende band: kop, tekst, twee knoppen en eventueel drie kenmerken; golvende lijnen met lichtpunten
// en glazen bollen aan de zijkanten.
export function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  features,
  boxed,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  features?: { icon: string; label: string }[];
  boxed?: boolean;
}) {
  return (
    <section className={`pg-band${boxed ? " is-boxed" : ""}`}>
      <div className="pg-band-inner">
        <svg className="pg-band-waves" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
          <path className="pg-band-sheet" d="M0 150 C 260 120, 420 300, 640 360 L 0 520 Z" />
          <path className="pg-band-sheet" d="M1440 120 C 1250 160, 1150 330, 900 380 L 1440 520 Z" />
          <path className="pg-band-line" d="M-10 170 C 160 150, 260 230, 380 320 S 560 420, 700 400" />
          <path className="pg-band-line" d="M1450 60 C 1330 130, 1270 270, 1120 330 S 920 380, 820 372" />
          <path className="pg-band-line is-soft" d="M1450 470 C 1300 450, 1200 360, 1050 330" />
        </svg>
        <span className="pg-band-dot" style={{ left: "11.5%", top: "33%" }} aria-hidden="true" />
        <span className="pg-band-dot" style={{ left: "88%", top: "35%" }} aria-hidden="true" />
        <span className="pg-band-dot is-small" style={{ left: "24%", top: "58%" }} aria-hidden="true" />
        <span className="pg-sphere" style={{ left: "6%", top: "64%", width: 96 }} aria-hidden="true" />
        <span className="pg-sphere" style={{ left: "14%", top: "14%", width: 58 }} aria-hidden="true" />
        <span className="pg-sphere" style={{ right: "5%", top: "46%", width: 92 }} aria-hidden="true" />
        <span className="pg-sphere" style={{ right: "9%", top: "10%", width: 54 }} aria-hidden="true" />

        <div className="pg-band-content">
          <Eyebrow center>{eyebrow}</Eyebrow>
          <h2 className="pg-h2 pg-band-title">{title}</h2>
          <p className="pg-lead pg-band-text">{text}</p>
          <div className="pg-actions is-center">
            <PrimaryButton href={primary.href}>{primary.label}</PrimaryButton>
            <SecondaryButton href={secondary.href}>{secondary.label}</SecondaryButton>
          </div>
          {features && (
            <ul className="pg-band-features">
              {features.map((f) => (
                <li key={f.label}>
                  <IconBadge name={f.icon} />
                  {f.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
