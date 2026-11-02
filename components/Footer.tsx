import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CONTACT_URL, DEMO_URL } from "@/lib/app-links";

const COLUMNS = [
  {
    title: "Product",
    x: 446,
    links: [
      { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
      { label: "Testen", href: "/voor-scholen#testen" },
      { label: "Resultaten", href: "/#resultaat" },
      { label: "Begeleiding", href: "/voor-professionals" },
      { label: "Voor scholen", href: "/voor-scholen" },
      { label: "Voor organisaties", href: "/voor-professionals" },
      { label: "Prijzen", href: "/prijzen" },
    ],
  },
  {
    title: "Over Helios",
    x: 653,
    links: [
      { label: "Onze missie", href: "/over-ons#missie" },
      { label: "Over ons", href: "/over-ons" },
      { label: "Contact", href: CONTACT_URL },
    ],
  },
  {
    title: "Support",
    x: 860,
    links: [
      { label: "Privacy", href: "#" },
      { label: "Algemene voorwaarden", href: "#" },
    ],
  },
];

const USPS = [
  "Betrouwbare testen",
  "Overzichtelijke resultaten",
  "Ondersteunt het gesprek",
];

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={line}>
      {line}
      {i < lines.length - 1 ? " " : ""}
    </span>
  ));
}

// Footer van de site: logo met intro, drie linkkolommen, demokaart en onderbalk.
// De golf uit het ontwerp is weggelaten; .ft-inner schuift de inhoud daarom 316 ontwerppixels omhoog.
export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <svg
          className="ft-bg"
          viewBox="0 0 1536 1024"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ftHill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EEEDFB" />
              <stop offset="1" stopColor="#F4F3FD" />
            </linearGradient>
          </defs>
          <path
            d="M0 850 C 200 840, 380 870, 560 905 C 700 930, 820 935, 960 905 C 1120 872, 1300 860, 1536 880 L 1536 1024 L 0 1024 Z"
            fill="#F5F4FD"
            opacity=".8"
          />
          <path
            d="M0 940 C 160 925, 330 935, 480 960 C 620 985, 760 990, 900 965 C 1060 935, 1260 925, 1536 945 L 1536 1024 L 0 1024 Z"
            fill="url(#ftHill)"
          />
        </svg>

        <Link className="ft-logo" href="/" aria-label="Helios">
          <Image
            className="only-light"
            src="/assets/logo-helios.png"
            alt="Helios"
            width={234}
            height={73}
            loading="eager"
          />
          <Image
            className="only-dark"
            src="/assets/logo-helios-dark.png"
            alt="Helios"
            width={234}
            height={73}
            loading="eager"
          />
        </Link>

        <p className="ft-intro">
          <Lines
            lines={[
              "Eén platform voor testen, inzicht",
              "en begeleiding. Helios helpt",
              "leerlingen, studenten en cliënten",
              "om zichzelf beter te leren kennen",
              "en betere keuzes te maken.",
            ]}
          />
        </p>

        <ul className="ft-usps">
          {USPS.map((usp) => (
            <li key={usp}>
              <span className="ft-check" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6A2CF5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              {usp}
            </li>
          ))}
        </ul>

        {COLUMNS.map((col, i) => (
          <nav
            key={col.title}
            className={`ft-col ft-col-${i + 1}`}
            aria-label={col.title}
            style={{ "--x": col.x } as CSSProperties}
          >
            <h4 className="ft-col-title">{col.title}</h4>
            {col.links.map((l) => (
              <a key={l.label} className="ft-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        ))}

        <div className="ft-demo">
          <div className="ft-demo-cloud" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="ft-demo-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6A2CF5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
          <h3 className="ft-demo-title">
            <Lines lines={["Ontdek Helios", "in een persoonlijke demo"]} />
          </h3>
          <p className="ft-demo-body">
            <Lines
              lines={[
                "We laten je graag zien hoe Helios",
                "past bij jouw organisatie.",
              ]}
            />
          </p>
          <a className="ft-demo-btn" href={DEMO_URL}>
            <span>Plan een demo</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h16" />
              <path d="m14 6 6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="ft-line" aria-hidden="true" />
        <p className="ft-copy">© 2026 Helios. Alle rechten voorbehouden.</p>

        <div className="ft-social">
          {/* LinkedIn en YouTube komen terug zodra de adressen er zijn. */}
          <a href={CONTACT_URL} aria-label="E-mail">
            <svg
              className="ft-social-lg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5zm.2 2.3 7.3 5 7.3-5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
