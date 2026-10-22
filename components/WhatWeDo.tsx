import type { CSSProperties, ReactNode } from "react";

// Pad tussen de vier stappen, in coördinaten van het ontwerpcanvas (1536 × 1024).
const PATH =
  "M858 177 C 790 210, 770 270, 790 310 C 810 350, 860 360, 897 370 C 950 384, 965 440, 920 470 C 885 492, 820 482, 779 496 C 735 512, 715 570, 742 615 C 775 670, 860 700, 907 762 C 920 778, 930 790, 937 800";

const NODES = [
  { x: 858, y: 177, r: 28, color: "#6B35F2", glow: "wwd-glow-p" },
  { x: 897, y: 370, r: 28, color: "#2F7BF5", glow: "wwd-glow-b" },
  { x: 779, y: 496, r: 32, color: "#F56A2C", glow: "wwd-glow-o" },
  { x: 907, y: 762, r: 28, color: "#7A35EE", glow: "wwd-glow-p" },
];

type Step = {
  id: string;
  title: string;
  // Regeleinden komen uit het ontwerp.
  body: string[];
  rgb: string;
  color: string;
  iconBg: string;
  badgeBg: string;
  badgeColor: string;
  // Posities en maten in ontwerppixels: kaart, icoon, nummer en tekst.
  box: [number, number, number, number];
  icon: [number, number, number];
  badge: [number, number];
  text: [number, number, number];
  svg: ReactNode;
};

const STEPS: Step[] = [
  {
    id: "testen",
    title: "Betrouwbare testen",
    body: ["Wetenschappelijk onderbouwde", "instrumenten voor studie- en loopbaankeuze.", "Je cliënt ontdekt zijn interesses, talenten,", "persoonlijkheid en waarden."],
    rgb: "107, 53, 242",
    color: "#6B35F2",
    iconBg: "#ECE8FD",
    badgeBg: "#E9E5FD",
    badgeColor: "#5A2DF0",
    box: [875, 105, 585, 192],
    icon: [60, 46, 52],
    badge: [143, 14],
    text: [200, 41, 75],
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M12 5v13" />
        <path d="M8.5 9.5h1.5" />
        <path d="M14 9.5h1.5" />
        <path d="M8.5 14h2" />
        <path d="M13.5 14h2" />
      </svg>
    ),
  },
  {
    id: "inzicht",
    title: "Helder inzicht",
    body: ["Overzichtelijke resultaten en rapporten,", "voor de cliënt én voor jou. Je ziet in één", "oogopslag wat iemand kan, wil en wat", "bij hem past."],
    rgb: "47, 123, 245",
    color: "#2F6FF0",
    iconBg: "#E4ECFD",
    badgeBg: "#E1EBFE",
    badgeColor: "#2F6FF0",
    box: [955, 335, 522, 188],
    icon: [40, 33, 48],
    badge: [124, 3],
    text: [180, 30, 62],
    svg: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="7" y="27" width="7" height="12" rx="2" />
        <rect x="17" y="21" width="7" height="18" rx="2" />
        <rect x="27" y="9" width="7" height="30" rx="2" />
        <rect x="37" y="18" width="7" height="21" rx="2" />
      </svg>
    ),
  },
  {
    id: "begeleiding",
    title: "Persoonlijke begeleiding",
    body: ["Een eigen omgeving waarin je cliënten", "uitnodigt, hun voortgang volgt en resultaten", "samen bespreekt. Zo heb je altijd een goed", "onderbouwd gesprek."],
    rgb: "245, 106, 44",
    color: "#F2662A",
    iconBg: "#FFE7DC",
    badgeBg: "#FFE4D6",
    badgeColor: "#F2662A",
    box: [775, 537, 563, 168],
    icon: [35, 25, 50],
    badge: [119, -3],
    text: [177, 25, 55],
    svg: (
      <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="25" cy="15" r="6" />
        <path d="M15 39v-7a10 10 0 0 1 20 0v7" />
        <path d="M5 39v-5a7 7 0 0 1 9-6.7" />
        <path d="M45 39v-5a7 7 0 0 0-9-6.7" />
        <path d="M25 32v7" />
      </svg>
    ),
  },
  {
    id: "advies",
    title: "Van test tot advies",
    body: ["Alle stappen in het keuzeproces", "in één samenhangende omgeving.", "Van de eerste oriëntatie tot het", "adviesgesprek."],
    rgb: "122, 53, 238",
    color: "#6B35F2",
    iconBg: "#ECE8FD",
    badgeBg: "#E9E5FD",
    badgeColor: "#5A2DF0",
    box: [936, 738, 510, 195],
    icon: [46, 44, 50],
    badge: [129, 14],
    text: [186, 41, 75],
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
];

// Regels met een spatie ertussen: op desktop elk een eigen regel, op mobiel lopen ze door.
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={line}>
      {line}
      {i < lines.length - 1 ? " " : ""}
    </span>
  ));
}

function stepStyle(s: Step): CSSProperties {
  return {
    "--rgb": s.rgb,
    "--color": s.color,
    "--icon-bg": s.iconBg,
    "--badge-bg": s.badgeBg,
    "--badge-color": s.badgeColor,
    "--x": s.box[0],
    "--y": s.box[1],
    "--w": s.box[2],
    "--h": s.box[3],
    "--ix": s.icon[0],
    "--iy": s.icon[1],
    "--is": s.icon[2],
    "--bx": s.badge[0],
    "--by": s.badge[1],
    "--tx": s.text[0],
    "--ty": s.text[1],
    "--py": s.text[2],
  } as CSSProperties;
}

// Sectie "Wat we doen": tekst links, rechts vier stappen verbonden door een pad met een lichtpuls.
export default function WhatWeDo() {
  return (
    <section className="wwd" id="wat-we-doen" aria-labelledby="wwd-title">
      <div className="wwd-blob" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="wwd-copy">
        <p className="wwd-eyebrow">
          <span className="wwd-eyebrow-dot" aria-hidden="true" />
          WAT WE DOEN
        </p>

        <h2 className="wwd-title" id="wwd-title">
          <span>Eén platform voor </span>
          <span>testen, inzicht en </span>
          <span className="wwd-title-accent">begeleiding</span>
        </h2>

        <p className="wwd-intro">
          <Lines lines={["Helios brengt alles samen wat je nodig hebt om", "leerlingen, studenten en cliënten te helpen bij hun", "keuze. Van de eerste test tot het adviesgesprek,", "alles op één plek."]} />
        </p>

        <div className="wwd-actions">
          <a className="wwd-btn-demo" href="#">
            <span>Plan een demo</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16" />
              <path d="m14 6 6 6-6 6" />
            </svg>
          </a>
          <a className="wwd-btn-how" href="#hoe-het-werkt">
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="17.5" stroke="#4B2BF0" strokeWidth="2.4" />
              <path d="M16.5 13.2v13.6L27 20z" fill="#4B2BF0" stroke="#4B2BF0" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <span>Bekijk hoe het werkt</span>
          </a>
        </div>
      </div>

      <svg className="wwd-path" viewBox="0 0 1536 1024" fill="none" aria-hidden="true" preserveAspectRatio="xMinYMin meet">
        <defs>
          <linearGradient id="wwd-path-grad" x1="0" y1="177" x2="0" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#B8A6F7" />
            <stop offset=".33" stopColor="#A9B9F7" />
            <stop offset=".55" stopColor="#C6B2F2" />
            <stop offset="1" stopColor="#BFAEF6" />
          </linearGradient>
          <radialGradient id="wwd-glow-p">
            <stop offset="0" stopColor="#A27CFF" stopOpacity=".55" />
            <stop offset="1" stopColor="#A27CFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wwd-glow-b">
            <stop offset="0" stopColor="#5E9BFF" stopOpacity=".5" />
            <stop offset="1" stopColor="#5E9BFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wwd-glow-o">
            <stop offset="0" stopColor="#FF8A4D" stopOpacity=".6" />
            <stop offset="1" stopColor="#FF8A4D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className="wwd-path-line" d={PATH} stroke="url(#wwd-path-grad)" strokeWidth="3.2" strokeLinecap="round" />
        <path className="wwd-pulse-glow" pathLength={100} d={PATH} stroke="#9A7BFF" strokeOpacity=".45" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 110" />
        <path className="wwd-pulse" pathLength={100} d={PATH} stroke="#7B4DFF" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="8 112" />
        <path
          d="M838 228 C 812 250, 806 290, 826 318 M 906 420 C 880 440, 850 448, 822 452 M 766 540 C 752 575, 764 610, 790 640 M 846 700 C 870 720, 885 735, 893 748"
          stroke="#CFC6F4"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {NODES.map((n, i) => (
          <circle
            key={`glow-${i}`}
            className="wwd-node-glow"
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={`url(#${n.glow})`}
            style={{ "--grow": (n.r + 12) / n.r, animationDelay: `${[0, 0.9, 1.8, 3][i]}s` } as CSSProperties}
          />
        ))}
        {NODES.map((n, i) => (
          <circle key={`node-${i}`} cx={n.x} cy={n.y} r="8.5" fill="#FFFFFF" stroke={n.color} strokeWidth="4" />
        ))}
      </svg>

      <ol className="wwd-steps">
        {STEPS.map((s, i) => (
          <li key={s.id} id={`wwd-${s.id}`} className="wwd-step" style={stepStyle(s)}>
            <div className="wwd-step-icon" aria-hidden="true">
              {s.svg}
            </div>
            <span className="wwd-step-badge" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="wwd-step-title">{s.title}</h3>
            <p className="wwd-step-body">
              <Lines lines={s.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
