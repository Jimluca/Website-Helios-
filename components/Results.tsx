import type { CSSProperties, ReactNode } from "react";

// Eén ontwerppixel: op desktop schaalt --u mee met de sectie, op mobiel staat hij vast (zie globals.css).
const u = (n: number) => `calc(var(--u) * ${n})`;

// Absoluut geplaatst blok in ontwerppixels.
function box(left: number, top: number, width?: number, height?: number, extra: CSSProperties = {}): CSSProperties {
  return { position: "absolute", left: u(left), top: u(top), width: width === undefined ? undefined : u(width), height: height === undefined ? undefined : u(height), ...extra };
}

function Bar({ w, h = 5, color }: { w: number; h?: number; color: string }) {
  return <span style={{ display: "block", width: u(w), height: u(h), borderRadius: u(3), background: color }} />;
}

function IconCircle({ left, top, bg, shadow, children }: { left: number; top: number; bg: string; shadow: string; children: ReactNode }) {
  return (
    <div style={box(left, top, 66, 66, { borderRadius: "50%", background: bg, boxShadow: shadow, display: "flex", alignItems: "center", justifyContent: "center" })}>
      {children}
    </div>
  );
}

function Blob({ left, top, width, height, color }: { left: number; top: number; width: number; height: number; color: string }) {
  return <div className="res-blob" style={box(left, top, width, height, { borderRadius: "50%", background: `radial-gradient(closest-side, ${color} 0%, ${color}99 60%, ${color}00 100%)` })} />;
}

// Lines: op desktop elk een eigen regel, op mobiel lopen ze door.
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={line}>
      {line}
      {i < lines.length - 1 ? " " : ""}
    </span>
  ));
}

const iconSize = (n: number) => ({ width: u(n), height: u(n) });

// Stap 1: kaart met drie resultaatregels
function ArtResult() {
  const rows = ["#4A1FC9", "#7350EF", "#9C82FF"];
  return (
    <>
      <Blob left={0} top={30} width={250} height={180} color="#EEEAFD" />
      <div
        style={box(70, 53, 131, 126, {
          boxSizing: "border-box",
          borderRadius: u(16),
          background: "#FFFFFF",
          boxShadow: "0 18px 34px -14px rgba(90,60,200,.28), 0 2px 6px rgba(90,60,200,.06)",
          padding: `${u(24)} ${u(20)} 0`,
          display: "flex",
          flexDirection: "column",
          gap: u(13),
        })}
      >
        {rows.map((color, i) => (
          <div key={color} style={{ display: "flex", alignItems: "center", gap: u(11) }}>
            <span style={{ ...iconSize(19), borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i === 0 && (
                <svg style={iconSize(11)} viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              )}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: u(5) }}>
              <Bar w={60} color="#D9D3FB" />
              <Bar w={44} color="#E7E3FC" />
            </span>
          </div>
        ))}
      </div>
      <IconCircle left={170} top={1} bg="#EDE7FF" shadow="0 10px 24px -8px rgba(74,31,201,.35)">
        <svg style={iconSize(34)} viewBox="0 0 24 24" fill="none" stroke="#4A1FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
          <path d="M9 11h0" />
          <path d="M9 7h2" />
        </svg>
      </IconCircle>
    </>
  );
}

// Stap 2: kaarten met afstudeerhoed, koffertje en lampje
function ArtInsight() {
  const backCard: CSSProperties = { borderRadius: u(12), background: "#F4F1FD", boxShadow: "0 10px 22px -12px rgba(102,57,236,.25)" };
  return (
    <>
      <Blob left={0} top={22} width={235} height={180} color="#ECE6FE" />
      <div style={box(30, 92, 90, 78, { ...backCard, transform: "rotate(-8deg)" })} />
      <div
        style={box(150, 88, 68, 80, {
          ...backCard,
          transform: "rotate(9deg)",
          display: "flex",
          flexDirection: "column",
          gap: u(7),
          padding: `${u(22)} ${u(10)} 0`,
          boxSizing: "border-box",
        })}
      >
        <Bar w={42} color="#E4DDFA" />
        <Bar w={32} color="#E4DDFA" />
      </div>
      <div
        style={box(66, 57, 100, 117, {
          boxSizing: "border-box",
          borderRadius: u(14),
          background: "#FFFFFF",
          boxShadow: "0 18px 34px -14px rgba(102,57,236,.30)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: u(16),
          gap: u(9),
        })}
      >
        <svg style={{ width: u(44), height: u(40) }} viewBox="0 0 24 24" fill="#6639EC">
          <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
          <path d="M6 12.6V16c0 1.66 2.7 3 6 3s6-1.34 6-3v-3.4l-5.2 2.4a2 2 0 0 1-1.6 0z" />
          <path d="M21.2 10v5.5" stroke="#6639EC" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <Bar w={62} color="#DDD3FB" />
        <Bar w={62} color="#DDD3FB" />
        <Bar w={44} color="#E8E2FC" />
      </div>
      <div
        style={box(16, 135, 47, 45, {
          borderRadius: u(11),
          background: "#FFFFFF",
          boxShadow: "0 10px 22px -10px rgba(102,57,236,.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <svg style={iconSize(30)} viewBox="0 0 24 24" fill="#6639EC">
          <path d="M9 4h6a2 2 0 0 1 2 2v1h2.5A2.5 2.5 0 0 1 22 9.5v8A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-8A2.5 2.5 0 0 1 4.5 7H7V6a2 2 0 0 1 2-2zm0 3h6V6H9z" />
          <path d="M2 12.5h20" stroke="#FFFFFF" strokeWidth="1.6" />
        </svg>
      </div>
      <IconCircle left={173} top={3} bg="#EFEAFF" shadow="0 10px 24px -8px rgba(102,57,236,.35)">
        <svg style={iconSize(34)} viewBox="0 0 24 24" fill="none" stroke="#6639EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      </IconCircle>
    </>
  );
}

// Stap 3: twee chatballonnen en een groepje mensen
function ArtTalk() {
  return (
    <>
      <Blob left={5} top={28} width={265} height={185} color="#F1ECFE" />
      <div
        style={box(108, 118, 96, 58, {
          borderRadius: u(13),
          background: "#ECE9FC",
          boxShadow: "0 12px 24px -12px rgba(110,80,220,.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: u(7),
          paddingLeft: u(20),
          boxSizing: "border-box",
        })}
      >
        <span style={{ display: "flex", gap: u(6) }}>
          <Bar w={10} color="#8D7FF2" />
          <Bar w={44} color="#C9C1F7" />
        </span>
        <Bar w={40} color="#D7D1F9" />
      </div>
      <svg style={box(186, 172, 20, 16)} viewBox="0 0 20 16">
        <path d="M2 0 H18 L 6 14 Z" fill="#ECE9FC" />
      </svg>
      <div
        style={box(63, 70, 116, 72, {
          borderRadius: u(14),
          background: "#FFFFFF",
          boxShadow: "0 18px 32px -14px rgba(110,80,220,.32)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: u(11),
          paddingLeft: u(20),
          boxSizing: "border-box",
        })}
      >
        <Bar w={76} h={6} color="#7F6CF4" />
        <span style={{ display: "flex", gap: u(7) }}>
          <Bar w={13} h={6} color="#6A3CF5" />
          <Bar w={56} h={6} color="#C9C1F7" />
        </span>
      </div>
      <svg style={box(76, 139, 22, 18)} viewBox="0 0 22 18">
        <path d="M2 0 H20 L 4 16 Z" fill="#FFFFFF" />
      </svg>
      <IconCircle left={195} top={24} bg="#F2EEFF" shadow="0 10px 24px -8px rgba(135,104,246,.35)">
        <svg style={iconSize(34)} viewBox="0 0 24 24" fill="none" stroke="#7B5CF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </IconCircle>
    </>
  );
}

const CARDS = [
  {
    id: "onderbouwd",
    title: "Onderbouwd advies",
    body: ["Je werkt met wetenschappelijk", "onderbouwde testen en actuele", "opleidings- en arbeidsmarktinformatie."],
    box: [67, 337, 458],
    icon: [26, 52],
    text: 151,
    rgb: "107, 53, 242",
    bg: "#EDE7FF",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4A1FC9" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "zoekwerk",
    title: "Minder zoekwerk",
    body: ["Alle relevante informatie op één plek.", "Van testresultaten tot opleidingen,", "beroepen en arbeidsmarktinformatie."],
    box: [541, 337, 457],
    icon: [24, 54],
    text: 150,
    rgb: "47, 111, 240",
    bg: "#EFEAFF",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#6639EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 6.5V12l3.5 2.5" />
      </svg>
    ),
  },
  {
    id: "overzicht",
    title: "Meer overzicht",
    body: ["Je ziet in één oogopslag wat iemand", "kan, wil en welke vervolgstappen", "besproken kunnen worden."],
    box: [1014, 337, 458],
    icon: [26, 52],
    text: 153,
    rgb: "245, 106, 44",
    bg: "#F2EEFF",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7B5CF0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: "Testresultaat",
    body: ["Interesses, talenten,", "persoonlijkheid en waarden."],
    // Illustratie (positie en breedte in het paneel) en de plek van het label ten opzichte daarvan.
    art: [480, 20, 260],
    label: [13, 204, 18],
    numBg: "#EDE7FF",
    numColor: "#4A1FC9",
    Art: ArtResult,
  },
  {
    title: "Inzicht",
    body: ["Passende opleidingen, beroepen", "en mogelijkheden."],
    art: [795, 20, 260],
    label: [-4, 204, 18],
    numBg: "#EFEAFF",
    numColor: "#6639EC",
    Art: ArtInsight,
  },
  {
    title: "Gesprek",
    body: ["Een goed onderbouwd", "adviesgesprek en vervolgstappen."],
    art: [1115, 20, 280],
    label: [-15, 204, 16],
    numBg: "#F2EEFF",
    numColor: "#7B5CF0",
    Art: ArtTalk,
  },
];

// Sectie "Resultaat": kop, drie voordelen, het paneel "Van resultaat naar inzicht" en een knop.
export default function Results() {
  return (
    <section className="res" id="resultaat" aria-labelledby="res-title">
      <svg className="res-bg" viewBox="0 0 1536 1024" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rbHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EEEDFB" />
            <stop offset="1" stopColor="#F6F5FD" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* De heuvels onderaan uit het ontwerp zijn op verzoek weggelaten; de sectie loopt vlak over in de footer. */}
        <path d="M0 240 C 90 200, 200 185, 290 200 C 380 215, 430 260, 470 300 L 470 560 L 0 560 Z" fill="url(#rbHill)" />
        <path d="M1280 330 C 1350 300, 1440 230, 1536 190 L 1536 560 L 1280 560 Z" fill="url(#rbHill)" />
      </svg>

      <p className="res-eyebrow">
        <span className="res-dot" aria-hidden="true" />
        RESULTAAT
      </p>

      <h2 className="res-title" id="res-title">
        <span>Betere keuzes, </span>
        <span className="res-title-accent">betere gesprekken</span>
      </h2>

      <p className="res-intro">
        <Lines
          lines={[
            "Helios helpt leerlingen, studenten en cliënten om zichzelf beter te leren kennen.",
            "Met betrouwbare testen, helder inzicht en een omgeving waarin je het gesprek",
            "echt kunt voeren.",
          ]}
        />
      </p>

      <ul className="res-cards">
        {CARDS.map((c) => (
          <li
            key={c.id}
            id={`res-${c.id}`}
            className="res-card"
            style={
              {
                "--rgb": c.rgb,
                "--icon-bg": c.bg,
                "--x": c.box[0],
                "--y": c.box[1],
                "--w": c.box[2],
                "--ix": c.icon[0],
                "--is": c.icon[1],
                "--tx": c.text,
              } as CSSProperties
            }
          >
            <div className="res-card-icon" aria-hidden="true">
              {c.svg}
            </div>
            <h3 className="res-card-title">{c.title}</h3>
            <p className="res-card-body">
              <Lines lines={c.body} />
            </p>
          </li>
        ))}
      </ul>

      <div className="res-panel">
        <p className="res-panel-eyebrow">
          <span className="res-dot" aria-hidden="true" />
          VAN RESULTAAT NAAR INZICHT
        </p>
        <h3 className="res-panel-title">
          <span>Een test is het begin. </span>
          <span className="res-panel-accent">Inzicht maakt het verschil.</span>
        </h3>
        <p className="res-panel-body">
          <Lines lines={["Helios brengt testresultaten, beroeps- en", "opleidingsinformatie samen en maakt dit", "direct bruikbaar voor het gesprek."]} />
        </p>

        <svg className="res-arrows" viewBox="0 0 1405 332" aria-hidden="true">
          <defs>
            <linearGradient id="rbA1" x1="0" x2="1">
              <stop offset="0" stopColor="#C9BEF8" stopOpacity=".2" />
              <stop offset="1" stopColor="#8A6CF5" />
            </linearGradient>
            <linearGradient id="rbA2" x1="0" x2="1">
              <stop offset="0" stopColor="#C9BEF8" stopOpacity=".25" />
              <stop offset="1" stopColor="#A76CF2" />
            </linearGradient>
          </defs>
          <path d="M693 126 C 720 120, 755 128, 780 146" stroke="url(#rbA1)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M772 134 L 782 148 L 766 152" stroke="#8A6CF5" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1025 126 C 1055 120, 1090 128, 1115 146" stroke="url(#rbA2)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M1107 134 L 1117 148 L 1101 152" stroke="#A76CF2" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <ol className="res-steps">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="res-step"
              style={
                {
                  "--x": s.art[0],
                  "--y": s.art[1],
                  "--w": s.art[2],
                  "--lx": s.label[0],
                  "--ly": s.label[1],
                  "--lg": s.label[2],
                  "--num-bg": s.numBg,
                  "--num-color": s.numColor,
                } as CSSProperties
              }
            >
              <div className="res-step-art" aria-hidden="true">
                <s.Art />
              </div>
              <div className="res-step-label">
                <span className="res-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="res-step-text">
                  <span className="res-step-title">{s.title}</span>
                  {s.body.map((line) => (
                    <span key={line} className="res-step-line">
                      {line}{" "}
                    </span>
                  ))}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <a className="res-btn" href="#">
        <span>Ontdek hoe Helios werkt</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12h16" />
          <path d="m14 6 6 6-6 6" />
        </svg>
      </a>
    </section>
  );
}
