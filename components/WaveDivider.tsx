import { useId, type CSSProperties } from "react";

const LINE = "M0 296 C 120 272, 250 262, 337 264 C 520 268, 760 394, 1047 466 C 1300 494, 1550 414, 1800 325 C 1950 279, 2080 262, 2167 274";
// Zelfde curve, 8px (glanslijn) en 34px (lint) lager.
const SHINE = "M0 304 C 120 280, 250 270, 337 272 C 520 276, 760 402, 1047 474 C 1300 502, 1550 422, 1800 333 C 1950 287, 2080 270, 2167 282";
const RIBBON = "M0 330 C 120 305, 250 296, 337 298 C 520 302, 760 428, 1047 500 C 1300 528, 1550 448, 1800 359 C 1950 313, 2080 296, 2167 308";

const NODES = [
  { x: 337, y: 271, color: "#4A1FC9", glow: "GP", delay: 0.9 },
  { x: 1047, y: 472, color: "#7350EF", glow: "GB", delay: 3.4 },
  { x: 1800, y: 331, color: "#A68FFA", glow: "GO", delay: 5.8 },
];

function Cloud({ transform, id }: { transform: string; id: (name: string) => string }) {
  return (
    <g className="wave-cloud" transform={transform}>
      <g filter={`url(#${id("CloudS")})`} opacity=".55" transform="translate(0 14)">
        <ellipse cx="0" cy="18" rx="150" ry="26" fill="#C9BEF6" />
        <ellipse cx="-30" cy="0" rx="70" ry="38" fill="#C9BEF6" />
        <ellipse cx="45" cy="-6" rx="60" ry="44" fill="#C9BEF6" />
      </g>
      <g filter={`url(#${id("CloudF")})`}>
        {[
          [0, 16, 150, 24],
          [-62, 4, 52, 30],
          [-14, -14, 62, 44],
          [52, -4, 56, 38],
          [104, 10, 40, 24],
        ].map(([cx, cy, rx, ry]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id("CloudFill")})`} />
        ))}
      </g>
      <ellipse cx="-20" cy="-26" rx="40" ry="16" fill="#FFFFFF" opacity=".7" filter={`url(#${id("Blur8")})`} />
    </g>
  );
}

// Decoratieve golf tussen twee secties: heuvels, een lint met glanslijn, twee wolken en drie punten
// die om de beurt zacht oplichten. `height` is de maximale hoogte in px; `opacity` de dekking van de golf
// (0,6 als scheiding, 0,85 in de footer). De ids zijn uniek, zodat de golf vaker op een pagina kan staan.
export default function WaveDivider({
  animate = true,
  height = 480,
  opacity = 0.6,
  className = "",
}: {
  animate?: boolean;
  height?: number;
  opacity?: number;
  className?: string;
}) {
  const prefix = "hg" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => prefix + name;
  const url = (name: string) => `url(#${id(name)})`;

  return (
    <div className={`wave-divider${animate ? " is-animated" : ""} ${className}`.trim()} role="separator" aria-hidden="true" style={{ maxHeight: height }}>
      <svg viewBox="0 120 2167 480" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={id("Blur20")} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          <filter id={id("Blur8")} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id={id("Blur3")}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id={id("Fade")} x1="0" y1="120" x2="0" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".14" stopColor="#fff" />
            <stop offset=".72" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={id("Mask")} maskUnits="userSpaceOnUse" x="0" y="0" width="2167" height="724">
            <rect x="0" y="0" width="2167" height="724" fill={url("Fade")} />
          </mask>
          <linearGradient id={id("Hill")} x1="0" y1="160" x2="0" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ECEBFC" />
            <stop offset="1" stopColor="#F3F2FD" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id("Ribbon")} x1="0" y1="0" x2="2167" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#CBBEF9" />
            <stop offset=".35" stopColor="#D3C8FA" />
            <stop offset=".55" stopColor="#DAD1FB" />
            <stop offset=".78" stopColor="#E2DBFC" />
            <stop offset="1" stopColor="#E9E3FD" />
          </linearGradient>
          <linearGradient id={id("Line")} x1="0" y1="0" x2="2167" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4A1FC9" />
            <stop offset=".45" stopColor="#7350EF" />
            <stop offset=".8" stopColor="#A68FFA" />
            <stop offset="1" stopColor="#C2B3FB" />
          </linearGradient>
          <filter id={id("CloudF")} x="-30%" y="-60%" width="160%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.018" numOctaves={5} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={46} xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="2.2" />
          </filter>
          <filter id={id("CloudS")} x="-30%" y="-60%" width="160%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.018" numOctaves={4} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={46} xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="9" />
          </filter>
          <linearGradient id={id("CloudFill")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".55" stopColor="#FAF9FF" />
            <stop offset="1" stopColor="#E4DEFB" />
          </linearGradient>
          <radialGradient id={id("GP")}>
            <stop offset="0" stopColor="#A27CFF" stopOpacity=".6" />
            <stop offset="1" stopColor="#A27CFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("GB")}>
            <stop offset="0" stopColor="#8E6EFF" stopOpacity=".55" />
            <stop offset="1" stopColor="#8E6EFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("GO")}>
            <stop offset="0" stopColor="#B19CFF" stopOpacity=".6" />
            <stop offset="1" stopColor="#B19CFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask={url("Mask")} opacity={opacity}>
          {/* Heuvels en zachte gloed */}
          <path d="M0 182 C 110 185, 200 220, 250 250 L 250 560 L 0 560 Z" className="wave-hill" fill={url("Hill")} />
          <path
            d="M190 228 C 300 190, 400 165, 480 167 C 640 172, 790 280, 930 360 C 1000 398, 1060 410, 1110 410 C 1180 410, 1240 345, 1320 338 C 1420 330, 1520 340, 1640 300 C 1760 260, 1870 245, 1930 240 L 1930 560 L 190 560 Z"
            className="wave-hill"
            fill={url("Hill")}
          />
          <path d="M1930 242 C 2000 200, 2080 180, 2167 180 L 2167 560 L 1930 560 Z" className="wave-hill" fill={url("Hill")} />
          <ellipse cx="520" cy="420" rx="520" ry="110" className="wave-glow" fill="#E3E0FB" opacity=".55" filter={url("Blur20")} />
          <ellipse cx="1300" cy="470" rx="420" ry="70" className="wave-glow" fill="#E3DEFB" opacity=".55" filter={url("Blur20")} />
          <ellipse cx="1930" cy="420" rx="280" ry="90" className="wave-glow" fill="#EAE2FC" opacity=".6" filter={url("Blur20")} />
          <path d="M1360 520 C 1550 470, 1750 390, 1900 370 C 2000 360, 2100 420, 2167 470 L 2167 600 L 1360 600 Z" className="wave-glow" fill="#F1ECFD" opacity=".5" filter={url("Blur8")} />

          <Cloud transform="translate(715 330) scale(0.82)" id={id} />
          <Cloud transform="translate(1440 370) scale(1.05)" id={id} />

          {/* Lint, gekleurde lijn en witte glanslijn */}
          <path className="wave-ribbon" d={RIBBON} stroke={url("Ribbon")} strokeWidth="64" fill="none" opacity=".55" filter={url("Blur3")} />
          <path d={LINE} stroke={url("Line")} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path className="wave-shine" d={SHINE} stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" />

          {NODES.map((n) => (
            <circle
              key={`glow-${n.x}`}
              className="wave-divider-glow"
              cx={n.x}
              cy={n.y}
              r="42"
              fill={url(n.glow)}
              style={{ animationDelay: `${n.delay}s` } as CSSProperties}
            />
          ))}
          {NODES.map((n) => (
            <g key={`node-${n.x}`}>
              <circle cx={n.x} cy={n.y} r="13" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="4" />
              <circle cx={n.x} cy={n.y} r="11" fill="#FFFFFF" stroke={n.color} strokeWidth="5.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
