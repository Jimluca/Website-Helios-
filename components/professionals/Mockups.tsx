import Image from "next/image";
import Icon from "@/components/site/Icon";

// Productbeelden op Voor professionals, opgebouwd uit glazen kaarten (stijlen in app/pages.css, "pro-").
// Namen, cijfers en vacatures zijn voorbeelddata.

function Logo() {
  return (
    <span className="pro-logo">
      <Image className="only-light" src="/assets/logo-helios.png" alt="Helios" width={100} height={32} />
      <Image className="only-dark" src="/assets/logo-helios-dark.png" alt="Helios" width={100} height={32} />
    </span>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) return <span className="pro-avatar" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />;
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="pro-avatar is-initials" aria-hidden="true">
      {initials}
    </span>
  );
}

function CardHead({ title, link, info }: { title: string; link?: boolean; info?: boolean }) {
  return (
    <div className="pro-card-head">
      <span className="pro-card-title">
        {title}
        {info && <Icon name="info" size={14} className="pro-info" />}
      </span>
      {link && (
        <span className="pro-link">
          Bekijk alle <Icon name="arrow" size={13} stroke={2.4} />
        </span>
      )}
    </div>
  );
}

function Bars({ values, years = true }: { values: number[]; years?: boolean }) {
  return (
    <div className="pro-bars">
      {values.map((v, i) => (
        <span key={i} className="pro-bar-col">
          <span className="pro-bar" style={{ height: `${v}%`, opacity: 0.35 + (i / (values.length - 1)) * 0.65 }} />
          {years && <span className="pro-bar-year">{2024 + i}</span>}
        </span>
      ))}
    </div>
  );
}

function SalaryChart({ tip }: { tip?: boolean }) {
  return (
    <svg className="pro-line" viewBox="0 0 260 120" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={tip ? "proArea2" : "proArea"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B5CF0" stopOpacity=".32" />
          <stop offset="1" stopColor="#7B5CF0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M4 104 L 30 100 L 62 70 L 104 82 L 150 54 L 178 60 L 220 32 L 256 8 L 256 120 L 4 120 Z" fill={`url(#${tip ? "proArea2" : "proArea"})`} />
      <path d="M4 104 L 30 100 L 62 70 L 104 82 L 150 54 L 178 60 L 220 32 L 256 8" fill="none" stroke="#5B3BF0" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      {[
        [4, 104],
        [30, 100],
        [62, 70],
        [104, 82],
        [150, 54],
        [178, 60],
        [220, 32],
        [256, 8],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="#5B3BF0" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

const JOBS = [
  { name: "Projectmanager", pct: 92, img: "/assets/ber/bouwkundige.png" },
  { name: "Adviseur duurzaamheid", pct: 88, img: "/assets/ber/productontwerper.png" },
  { name: "HR-adviseur", pct: 84, img: "/assets/ber/docent.png" },
  { name: "Beleidsmedewerker", pct: 78, img: "/assets/ber/marketing-specialist.png" },
  { name: "Communicatieadviseur", pct: 74, img: "/assets/ber/software-developer.png" },
];

// Hero: het dashboard "Mijn cliënt" van de professional.
export function ClientDashboard() {
  return (
    <div className="pro-dash" aria-label="Voorbeeld van het cliëntdashboard in Helios" role="img">
      <div className="pro-dash-top">
        <div className="pro-side glass-card">
          <Logo />
          <ul className="pro-nav">
            {[
              ["home", "Dashboard"],
              ["user", "Cliënten"],
              ["clipboard", "Tests"],
              ["chart-l", "Resultaten"],
              ["briefcase", "Beroepen"],
              ["cap", "Opleidingen"],
              ["file", "Rapporten"],
            ].map(([icon, label], i) => (
              <li key={label} className={i === 0 ? "is-active" : undefined}>
                <Icon name={icon} size={16} />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="pro-dash-main">
          <div className="pro-head glass-card">
            <div className="pro-head-row">
              <span className="pro-head-title">Mijn cliënt</span>
              <span className="pro-user">
                <Avatar name="Sanne de Vries" />
                <span>
                  <b>Sanne de Vries</b>
                  <small>Loopbaancoach</small>
                </span>
                <Icon name="chevron-down" size={14} />
              </span>
            </div>
            <div className="pro-tabs">
              {["Overzicht", "Tests", "Beroepen", "Vacatures", "Opleidingen", "Rapportage"].map((t, i) => (
                <span key={t} className={i === 0 ? "is-active" : undefined}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="pro-dash-cards">
            <div className="pro-card glass-card">
              <CardHead title="Talentprofiel" />
              <svg className="pro-radar" viewBox="0 0 240 170" aria-hidden="true">
                {[1, 0.75, 0.5, 0.25].map((k) => (
                  <polygon key={k} points={radar(k)} className="pro-radar-grid" />
                ))}
                <polygon points="120,40 166,72 150,128 96,132 76,74" className="pro-radar-area" />
                {[
                  [120, 40],
                  [166, 72],
                  [150, 128],
                  [96, 132],
                  [76, 74],
                ].map(([x, y]) => (
                  <circle key={x} cx={x} cy={y} r="2.6" className="pro-radar-dot" />
                ))}
                <text x="120" y="14" textAnchor="middle">Analytisch</text>
                <text x="120" y="24" textAnchor="middle">vermogen</text>
                <text x="202" y="72" textAnchor="middle">Praktisch</text>
                <text x="202" y="82" textAnchor="middle">inzicht</text>
                <text x="176" y="164" textAnchor="middle">Samenwerken</text>
                <text x="64" y="164" textAnchor="middle">Zelfstandigheid</text>
                <text x="34" y="76" textAnchor="middle">Communicatie</text>
              </svg>
            </div>
            <div className="pro-card glass-card">
              <CardHead title="Passende beroepen" link />
              <ul className="pro-jobs">
                {JOBS.map((j) => (
                  <li key={j.name}>
                    <Avatar name={j.name} src={j.img} />
                    <span className="pro-job-name">{j.name}</span>
                    <span className="pro-meter">
                      <span style={{ width: `${j.pct}%` }} />
                    </span>
                    <span className="pro-pct">{j.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="pro-dash-bottom">
        <div className="pro-card glass-card">
          <CardHead title="Arbeidsmarktperspectief" />
          <Bars values={[22, 40, 56, 76, 100]} />
          <span className="pro-growth">
            <Icon name="arrow-up" size={15} stroke={2.6} /> Groeiende vraag
          </span>
        </div>
        <div className="pro-card glass-card">
          <CardHead title="Salaris indicatie" />
          <span className="pro-salary">€ 2.800 - € 4.500</span>
          <small className="pro-muted">Gemiddeld bruto p/m</small>
          <SalaryChart />
        </div>
        <div className="pro-card glass-card">
          <CardHead title="Passende opleidingen" link />
          <ul className="pro-list">
            {["HBO Projectmanagement", "Duurzaamheidsmanagement", "Communicatie en gedrag", "HRM en organisatie"].map((t) => (
              <li key={t}>
                <span className="pro-list-icon">
                  <Icon name="box" size={12} stroke={2.2} />
                </span>
                {t}
                <Icon name="chevron" size={14} className="pro-chev" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function radar(k: number) {
  const cx = 120;
  const cy = 88;
  const r = 50 * k;
  return Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

const MATCHES = [
  { name: "Projectmanager", pct: 92, img: "/assets/ber/bouwkundige.png", sub: "92% match" },
  { name: "HR-adviseur", pct: 88, img: "/assets/ber/docent.png" },
  { name: "Beleidsmedewerker", pct: 84, img: "/assets/ber/marketing-specialist.png" },
  { name: "Communicatieadviseur", pct: 78, img: "/assets/ber/software-developer.png" },
  { name: "Loopbaancoach", pct: 76, img: "/assets/ber/verpleegkundige.png" },
];

// Verzonnen werkgevers: echte namen zouden een samenwerking suggereren.
const VACANCIES = [
  { title: "Projectmanager Onderwijs", org: "Gemeente Lindestad", mono: "GL", tag: "Nieuw" },
  { title: "HR-adviseur", org: "ROC Lindewaard", mono: "RL", tag: "Nieuw" },
  { title: "Beleidsmedewerker", org: "Stichting Werkkompas", mono: "SW", when: "2 dagen geleden" },
  { title: "Communicatieadviseur", org: "Zorggroep Veldzicht", mono: "ZV", when: "3 dagen geleden" },
  { title: "Loopbaancoach", org: "Loopbaanhuis Noord", mono: "LN", when: "5 dagen geleden" },
];

const COURSES = [
  ["HBO Projectmanagement", "HBO"],
  ["Cursus Gespreksvoering", "Cursus"],
  ["Loopbaanbegeleiding (Post-HBO)", "Post-HBO"],
  ["Training Duurzame Inzetbaarheid", "Training"],
  ["HRM en Organisatie", "HBO"],
];

// "Van inzicht naar concrete mogelijkheden": beroepen, vacatures, salaris, arbeidsmarkt en opleidingen.
export function MatchPanels() {
  return (
    <div className="pro-match" role="img" aria-label="Voorbeeld van passende beroepen, vacatures, salaris, arbeidsmarkt en opleidingen">
      <svg className="pro-orbit" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="500" cy="280" rx="490" ry="200" />
      </svg>
      <span className="pro-orbit-dot" style={{ left: "0.5%", top: "48%" }} aria-hidden="true" />
      <span className="pro-orbit-dot" style={{ right: "0.5%", top: "48%" }} aria-hidden="true" />
      <span className="pro-orbit-dot" style={{ left: "3%", top: "72%" }} aria-hidden="true" />

      <div className="pro-match-top">
        <div className="pro-card glass-card">
          <CardHead title="Passende beroepen" link />
          <ul className="pro-jobs is-detailed">
            {MATCHES.map((j) => (
              <li key={j.name}>
                <Avatar name={j.name} src={j.img} />
                <span className="pro-job-name">
                  {j.name}
                  {j.sub && <small>{j.sub}</small>}
                </span>
                <span className="pro-meter-wrap">
                  <small>{j.pct}%</small>
                  <span className="pro-meter">
                    <span style={{ width: `${j.pct}%` }} />
                  </span>
                </span>
                <Icon name="chevron" size={14} className="pro-chev" />
              </li>
            ))}
          </ul>
        </div>
        <div className="pro-card glass-card">
          <CardHead title="Actuele vacatures" link />
          <ul className="pro-vacs">
            {VACANCIES.map((v) => (
              <li key={v.title}>
                <span className="pro-org">{v.mono}</span>
                <span className="pro-job-name">
                  {v.title}
                  <small>{v.org}</small>
                </span>
                {v.tag ? <span className="pro-tag">{v.tag}</span> : <small className="pro-muted">{v.when}</small>}
                {v.tag && <Icon name="chevron" size={14} className="pro-chev" />}
              </li>
            ))}
          </ul>
        </div>
        <div className="pro-card glass-card">
          <CardHead title="Salaris indicatie" info />
          <span className="pro-salary is-lg">€ 3.200 - € 5.800</span>
          <small className="pro-muted">Gemiddeld bruto p/m</small>
          <div className="pro-salary-chart">
            <span className="pro-tip">€ 4.600</span>
            <SalaryChart tip />
          </div>
        </div>
      </div>
      <div className="pro-match-bottom">
        <div className="pro-card glass-card pro-market">
          <CardHead title="Arbeidsmarktperspectief" info />
          <div className="pro-market-body">
            <Bars values={[24, 48, 62, 78, 100]} />
            <div className="pro-growth-box">
              <span className="pro-growth">
                <Icon name="arrow-up" size={15} stroke={2.6} /> Groeiende vraag
              </span>
              <p>De vraag naar dit beroep neemt de komende jaren toe.</p>
            </div>
          </div>
        </div>
        <div className="pro-card glass-card">
          <CardHead title="Passende opleidingen en cursussen" link />
          <ul className="pro-list">
            {COURSES.map(([t, k]) => (
              <li key={t}>
                <span className="pro-list-icon">
                  <Icon name="box" size={12} stroke={2.2} />
                </span>
                {t}
                <span className="pro-kind">{k}</span>
                <Icon name="chevron" size={14} className="pro-chev" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const CLIENTS = [
  { name: "Sanne de Vries", sub: "Loopbaanbegeleiding", traject: "Loopbaanbegeleiding", status: "Actief", when: "2 dagen geleden" },
  { name: "Mark Jansen", sub: "Re-integratie", traject: "Re-integratie", status: "Actief", when: "1 week geleden" },
  { name: "Lisa van den Berg", sub: "Oriëntatie", traject: "Oriëntatie", status: "Actief", when: "3 dagen geleden" },
  { name: "Thomas Bakker", traject: "Carrièreontwikkeling", status: "Wachtend", when: "1 week geleden" },
  { name: "Eva de Jong", traject: "Loopbaanbegeleiding", status: "Actief", when: "Vandaag" },
  { name: "Ruben Smit", traject: "Re-integratie", status: "Afgerond", when: "2 weken geleden" },
];

// "Eenvoudig je cliënten begeleiden": cliëntenlijst, voortgang, afspraken en rapportages.
export function ClientsApp() {
  return (
    <div className="pro-clients" role="img" aria-label="Voorbeeld van het cliëntenoverzicht met voortgang, afspraken en rapportages">
      <div className="pro-clients-main">
        <div className="pro-window glass-card">
          <div className="pro-side is-flat">
            <Logo />
            <ul className="pro-nav">
              {[
                ["home", "Dashboard"],
                ["users", "Cliënten"],
                ["clipboard", "Trajecten"],
                ["calendar", "Afspraken"],
                ["chart-l", "Resultaten"],
                ["file", "Rapportages"],
                ["folder", "Documenten"],
                ["settings", "Instellingen"],
              ].map(([icon, label], i) => (
                <li key={label} className={i === 1 ? "is-active" : undefined}>
                  <Icon name={icon} size={16} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="pro-table-wrap">
            <span className="pro-head-title">Cliënten</span>
            <div className="pro-toolbar">
              <span className="pro-search">
                <Icon name="search" size={14} /> Zoeken naar cliënt...
              </span>
              <span className="pro-select">
                Alle trajecten <Icon name="chevron-down" size={13} />
              </span>
              <span className="pro-new">
                <Icon name="plus" size={14} stroke={2.4} /> Nieuwe cliënt
              </span>
            </div>
            <div className="pro-table">
              <div className="pro-tr is-head">
                <span>Naam</span>
                <span>Traject</span>
                <span>Status</span>
                <span>Laatste activiteit</span>
                <span />
              </div>
              {CLIENTS.map((c) => (
                <div key={c.name} className="pro-tr">
                  <span className="pro-client">
                    <Avatar name={c.name} />
                    <span>
                      <b>{c.name}</b>
                      {c.sub && <small>{c.sub}</small>}
                    </span>
                  </span>
                  <span className="pro-muted">{c.traject}</span>
                  <span>
                    <span className={`pro-status is-${c.status.toLowerCase()}`}>{c.status}</span>
                  </span>
                  <span className="pro-muted">{c.when}</span>
                  <Icon name="more-v" size={16} className="pro-chev" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pro-card glass-card pro-reports">
          <CardHead title="Resultaten en rapportages" />
          <div className="pro-reports-body">
            <Bars values={[30, 46, 62, 80, 100]} years={false} />
            <ul className="pro-list is-files">
              {["Persoonlijk rapport", "Competentieprofiel", "Beroepenoverzicht", "Ontwikkeladvies"].map((t) => (
                <li key={t}>
                  <span className="pro-list-icon">
                    <Icon name="clipboard" size={12} stroke={2.2} />
                  </span>
                  {t}
                  <span className="pro-kind">PDF</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pro-clients-side">
        <div className="pro-card glass-card">
          <div className="pro-profile">
            <Avatar name="Sanne de Vries" />
            <span>
              <b>Sanne de Vries</b>
              <small>Loopbaanbegeleiding</small>
            </span>
            <Icon name="more" size={18} className="pro-chev" />
          </div>
          <div className="pro-tabs is-small">
            {["Overzicht", "Resultaten", "Afspraken", "Rapporten"].map((t, i) => (
              <span key={t} className={i === 0 ? "is-active" : undefined}>
                {t}
              </span>
            ))}
          </div>
          <div className="pro-progress-head">
            <b>Voortgang traject</b>
            <b>75%</b>
          </div>
          <span className="pro-meter is-wide">
            <span style={{ width: "75%" }} />
          </span>
          <ul className="pro-steps">
            {[
              ["Intake en kennismaking", "12 mei", true],
              ["Tests en analyse", "2 jun", true],
              ["Bespreking resultaten", "16 jun", true],
              ["Vervolgacties", "Inplannen", false],
            ].map(([t, d, done]) => (
              <li key={t as string} className={done ? "is-done" : undefined}>
                <span className="pro-step-check">{done && <Icon name="check" size={11} stroke={3} />}</span>
                {t}
                <small>{d}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="pro-card glass-card">
          <div className="pro-card-head">
            <span className="pro-card-title">
              <Icon name="calendar" size={18} className="pro-cal" /> Afspraken
            </span>
            <span className="pro-link">
              Bekijk alles <Icon name="arrow" size={13} stroke={2.4} />
            </span>
          </div>
          <ul className="pro-appts">
            {[
              ["Gesprek resultaten", "Ma 16 jun, 10:00 – 11:00"],
              ["Vervolgafspraak", "Di 24 jun, 14:00 – 15:00"],
              ["Training sollicitatievaardigheden", "Do 3 jul, 13:00 – 16:00"],
            ].map(([t, d]) => (
              <li key={t}>
                <span className="pro-appt-dot" />
                <span>
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
                <Icon name="chevron" size={14} className="pro-chev" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
