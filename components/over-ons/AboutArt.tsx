import Icon from "@/components/site/Icon";

// Illustratie rechts in de hero van Over ons: de Helios-zon op een sokkel, een baan met lichtpunten, een weg die
// naar voren loopt en vier glazen kaarten. Canvas van 900 × 720; --a is één ontwerppixel (app/pages.css).
const CARDS = [
  { icon: "user", label: ["Talenten", "ontdekken"], x: 290, y: 40 },
  { icon: "chart", label: ["Kansen", "verkennen"], x: 640, y: 262 },
  { icon: "cap", label: ["Ontwikkelen", "en groeien"], x: 60, y: 470 },
  { icon: "compass", label: ["Concreet", "en actie"], x: 616, y: 506 },
];

// Twaalf segmenten van de zon, als ringsectoren rond (450, 340).
function segments() {
  const cx = 450;
  const cy = 336;
  const r1 = 92;
  const r2 = 150;
  const n = 12;
  const gap = 0.12;
  return Array.from({ length: n }, (_, i) => {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + gap;
    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - gap;
    const p = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `M${p(r1, a0)} L${p(r2, a0)} A${r2} ${r2} 0 0 1 ${p(r2, a1)} L${p(r1, a1)} A${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
  });
}

export default function AboutArt() {
  return (
    <div className="about-art" aria-hidden="true">
      <div className="about-canvas">
        <svg className="about-svg" viewBox="0 0 900 720" fill="none">
          <defs>
            <linearGradient id="abSeg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8F74FF" />
              <stop offset=".55" stopColor="#5B3BF0" />
              <stop offset="1" stopColor="#3E17B4" />
            </linearGradient>
            <linearGradient id="abRoad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E9E3FF" />
              <stop offset=".6" stopColor="#CBBDFF" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="abPed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
              <stop offset="1" stopColor="#E4DCFF" stopOpacity=".8" />
            </linearGradient>
            <linearGradient id="abPanel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity=".85" />
              <stop offset="1" stopColor="#F1ECFF" stopOpacity=".45" />
            </linearGradient>
            <radialGradient id="abGlow" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#C9B8FF" stopOpacity=".55" />
              <stop offset="1" stopColor="#C9B8FF" stopOpacity="0" />
            </radialGradient>
            <filter id="abBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          <ellipse className="about-glow" cx="470" cy="360" rx="420" ry="330" fill="url(#abGlow)" />

          {/* Weg die van achter de sokkel naar voren loopt */}
          <path className="about-road" d="M520 560 C 600 580, 640 620, 700 720 L 900 720 C 820 640, 760 560, 600 528 Z" fill="url(#abRoad)" />
          <path className="about-road-edge" d="M520 560 C 600 580, 640 620, 700 720" />
          <path className="about-road-edge" d="M600 528 C 760 560, 820 640, 900 720" />
          <path className="about-road is-back" d="M330 600 C 240 640, 120 650, 0 640 L 0 720 C 160 712, 300 680, 420 600 Z" fill="url(#abRoad)" />

          {/* Zwevende panelen op de achtergrond */}
          <g className="about-panels">
            <rect x="120" y="230" width="130" height="190" rx="14" fill="url(#abPanel)" />
            <rect x="140" y="268" width="80" height="16" rx="5" />
            <rect x="140" y="300" width="90" height="8" rx="4" />
            <rect x="140" y="318" width="70" height="8" rx="4" />
            <rect x="140" y="336" width="84" height="8" rx="4" />
            <rect x="760" y="110" width="130" height="160" rx="14" fill="url(#abPanel)" />
            <path d="M780 240 L800 220 L815 228 L835 196 L855 204 L875 160" className="about-panel-line" />
            <rect x="788" y="214" width="9" height="34" rx="2" />
            <rect x="806" y="204" width="9" height="44" rx="2" />
            <rect x="824" y="190" width="9" height="58" rx="2" />
            <rect x="842" y="176" width="9" height="72" rx="2" />
            <rect x="860" y="160" width="9" height="88" rx="2" />
            <rect x="780" y="400" width="90" height="100" rx="12" fill="url(#abPanel)" />
            <rect x="796" y="424" width="56" height="7" rx="3.5" />
            <rect x="796" y="442" width="44" height="7" rx="3.5" />
            <rect x="796" y="460" width="52" height="7" rx="3.5" />
            <rect x="248" y="410" width="54" height="64" rx="10" fill="url(#abPanel)" />
            <circle cx="275" cy="442" r="13" className="about-panel-line" />
          </g>

          {/* Glazen plaat achter de zon */}
          <rect className="about-plate" x="300" y="170" width="300" height="330" rx="26" />

          {/* Sokkel */}
          <ellipse cx="450" cy="568" rx="190" ry="48" fill="url(#abPed)" className="about-ped" />
          <path d="M260 540 V 568 A 190 48 0 0 0 640 568 V 540 Z" fill="url(#abPed)" className="about-ped" />
          <ellipse cx="450" cy="540" rx="190" ry="48" fill="url(#abPed)" className="about-ped" />
          <ellipse cx="450" cy="526" rx="150" ry="36" fill="url(#abPed)" className="about-ped" />

          {/* Baan achter de zon */}
          <path className="about-orbit" d="M140 290 C 120 190, 330 150, 450 150 C 640 150, 790 200, 780 300" />

          {/* De zon */}
          <g className="about-sun">
            {segments().map((d, i) => (
              <path key={i} d={d} fill="url(#abSeg)" opacity={0.72 + 0.28 * Math.abs(Math.cos((i / 12) * Math.PI))} />
            ))}
          </g>

          {/* Baan voor de zon */}
          <path className="about-orbit" d="M780 300 C 800 420, 620 470, 450 470 C 250 470, 120 420, 140 290" />
          <path className="about-orbit is-soft" d="M100 520 C 160 440, 360 410, 520 420 C 690 430, 830 480, 820 520" />
          {[
            [140, 290],
            [212, 205],
            [370, 156],
            [780, 300],
            [700, 430],
            [250, 446],
            [820, 520],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} className="about-node">
              <circle cx={x} cy={y} r="9" className="about-node-glow" filter="url(#abBlur)" />
              <circle cx={x} cy={y} r="4.5" />
            </g>
          ))}
        </svg>

        {CARDS.map((c) => (
          <span key={c.label.join(" ")} className="about-card glass-card" style={{ left: `calc(var(--a) * ${c.x})`, top: `calc(var(--a) * ${c.y})` }}>
            <span className="pg-icon is-md">
              <Icon name={c.icon} />
            </span>
            <span className="about-card-label">
              {c.label[0]}
              <br />
              {c.label[1]}
            </span>
            <span className="about-card-arrow">
              <Icon name="arrow" size={18} stroke={2.2} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
