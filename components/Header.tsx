"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "Product", href: "/#producten", menu: true },
  { label: "Voor scholen", href: "#" },
  { label: "Voor professionals", href: "#" },
  { label: "Over Helios", href: "#" },
  { label: "Prijzen", href: "#" },
  { label: "Contact", href: "#" },
];

const PRODUCTS = [
  {
    title: "Helios Coach",
    sub: "Voor loopbaanprofessionals en re-integratie",
    href: "/#product-coach",
    tile: "linear-gradient(145deg,#7A4DFF,#5426F6)",
    shadow: "rgba(112,72,240,.45)",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </>
    ),
  },
  {
    title: "Helios Next",
    sub: "Voor studiekeuze in vo, mbo en hbo",
    href: "/#product-next",
    tile: "linear-gradient(145deg,#3F86FF,#1F5CF5)",
    shadow: "rgba(46,109,255,.45)",
    icon: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </>
    ),
  },
  {
    title: "Helios Horizon",
    sub: "Voor LOB en burgerschap",
    href: "/#product-horizon",
    tile: "linear-gradient(145deg,#FF8A4C,#F55A1E)",
    shadow: "rgba(253,109,51,.45)",
    icon: (
      <>
        <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
        <path d="M9 4v14" />
        <path d="M15 6v14" />
      </>
    ),
  },
  {
    title: "Helios Connect",
    sub: "Voor koppeling met je eigen systemen",
    href: "/#product-connect",
    tile: "linear-gradient(145deg,#6E48FF,#4A22F5)",
    shadow: "rgba(87,50,254,.45)",
    icon: (
      <>
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </>
    ),
  },
];

function Arrow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

// Menubalk in liquid glass-stijl: vast bovenaan, wordt compacter bij scrollen. Een glijdende pil volgt
// het menu-item onder de muis; "Product" opent een uitklapmenu. Onder 1000px een hamburgermenu.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(-1);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const closeTimer = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const enter = (i: number) => {
    clearTimeout(closeTimer.current);
    const el = listRef.current?.querySelector<HTMLElement>(`[data-nav="${i}"]`);
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    setHover(i);
    setMenuOpen(i === 0);
  };

  // Sluit 120ms na het verlaten, zodat je de muis naar het uitklapmenu kunt bewegen.
  const leave = () => {
    closeTimer.current = window.setTimeout(() => {
      setHover(-1);
      setMenuOpen(false);
    }, 120);
  };

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
      <nav className="hdr-bar" aria-label="Hoofdmenu" ref={barRef}>
        {/* Het glas zit in een eigen laag: zo is de balk geen "backdrop root" en vervagen de uitklapmenu's de pagina erachter. */}
        <span className="hdr-glass" aria-hidden="true" />
        <span className="hdr-shine" aria-hidden="true" />
        <span className="hdr-accent" aria-hidden="true" />

        <Link className="hdr-logo" href="/" aria-label="Helios – home">
          <Image src="/assets/logo-helios.png" alt="Helios" width={128} height={40} priority />
        </Link>

        <div className="hdr-list" ref={listRef} onMouseLeave={leave}>
          <span className="hdr-pill" aria-hidden="true" style={{ width: pill.w, transform: `translateX(${pill.x}px)`, opacity: hover >= 0 ? 1 : 0 }} />
          {ITEMS.map((it, i) => (
            <a
              key={it.label}
              className={`hdr-link${hover === i ? " is-hover" : ""}`}
              href={it.href}
              data-nav={i}
              onMouseEnter={() => enter(i)}
              onFocus={() => enter(i)}
              aria-haspopup={it.menu ? "true" : undefined}
              aria-expanded={it.menu ? menuOpen : undefined}
            >
              <span>{it.label}</span>
              {it.menu && (
                <svg className={`hdr-chevron${menuOpen ? " is-open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </a>
          ))}

          <div className={`hdr-menu${menuOpen ? " is-open" : ""}`} onMouseEnter={() => clearTimeout(closeTimer.current)}>
            {PRODUCTS.map((p) => (
              <a key={p.title} className="hdr-product" href={p.href} tabIndex={menuOpen ? 0 : -1}>
                <span className="hdr-product-tile" style={{ background: p.tile, boxShadow: `0 8px 16px -6px ${p.shadow}` }} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <span className="hdr-product-text">
                  <span className="hdr-product-title">{p.title}</span>
                  <span className="hdr-product-sub">{p.sub}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="hdr-actions">
          <a className="hdr-login" href="#">
            Inloggen
          </a>
          <a className="hdr-cta" href="#">
            <span className="hdr-cta-sheen" aria-hidden="true" />
            <span className="hdr-cta-label">Aanmelden</span>
            <Arrow size={18} />
          </a>
        </div>

        {/* Mobiel */}
        <span className="hdr-spacer" />
        <button type="button" className={`hdr-burger${mobileOpen ? " is-open" : ""}`} aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d={mobileOpen ? "M6 6l12 12" : "M4 9h16"} />
            <path d={mobileOpen ? "M18 6 6 18" : "M4 15h16"} />
          </svg>
        </button>
        <div className={`hdr-mobile${mobileOpen ? " is-open" : ""}`}>
          {ITEMS.map((it) => (
            <a key={it.label} className="hdr-mobile-link" href={it.href} tabIndex={mobileOpen ? 0 : -1} onClick={() => setMobileOpen(false)}>
              {it.label}
            </a>
          ))}
          <div className="hdr-mobile-actions">
            <a className="hdr-mobile-login" href="#" tabIndex={mobileOpen ? 0 : -1}>
              Inloggen
            </a>
            <a className="hdr-mobile-cta" href="#" tabIndex={mobileOpen ? 0 : -1}>
              Aanmelden <Arrow size={16} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
