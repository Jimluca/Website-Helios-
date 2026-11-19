import Icon from "@/components/site/Icon";
import s from "./NextArt.module.css";

// Beelden op Helios Next (app/helios-next): de uitslag van de gratis studiekeuzetest zoals de studiekiezer hem ziet,
// en één opleiding uit die uitslag. Alles wat te zien is, zit echt in de test op helioscareer.nl (matchpercentage,
// "Waarom past dit bij mij?", filters op niveau, afstand en leervorm, favorieten, scholen, startmomenten, beroepen).
// Opleidingen, plaatsen en cijfers zijn voorbeelden.

const MATCHES = [
  { name: "Verpleegkunde", level: "HBO Bachelor", pct: 92, fav: true },
  { name: "Social Work", level: "HBO Bachelor", pct: 86, fav: false },
  { name: "Pedagogisch medewerker", level: "MBO 4", pct: 81, fav: true },
  { name: "Psychologie", level: "WO Bachelor", pct: 77, fav: false },
];

/** Hero: de uitslag met filters, plus zwevend de uitleg en de favorieten. */
export default function NextVisual() {
  return (
    <div
      className={s.visual}
      role="img"
      aria-label="Voorbeeld van de uitslag van de studiekeuzetest: passende opleidingen met matchpercentage en filters op niveau, afstand en leervorm. Rechtsboven de uitleg waarom een opleiding past, linksonder de bewaarde favorieten."
    >
      <div className={s.glow} aria-hidden="true" />

      <div className={`${s.window} glass-card`} aria-hidden="true">
        <p className={s.kicker}>Studiekeuzetest</p>
        <p className={s.title}>Jouw beste matches</p>
        <div className={s.chips}>
          <span>
            <Icon name="cap" size={14} stroke={2.2} />
            HBO en WO
          </span>
          <span>
            <Icon name="pin" size={14} stroke={2.2} />
            Binnen 25 km
          </span>
          <span>
            <Icon name="calendar" size={14} stroke={2.2} />
            Voltijd
          </span>
        </div>
        <ul className={s.matches}>
          {MATCHES.map((m) => (
            <li key={m.name}>
              <span className={s.name}>
                <b>{m.name}</b>
                <span>{m.level}</span>
              </span>
              <span className={s.bar}>
                <span style={{ width: `${m.pct}%` }} />
              </span>
              <span className={s.pct}>{m.pct}%</span>
              <span className={m.fav ? s.heartOn : s.heart}>
                <Icon name="heart" size={16} stroke={2.2} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${s.float} ${s.why}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Icon name="info" size={16} stroke={2.2} />
          </span>
          Waarom past dit bij mij?
        </p>
        <p className={s.floatText}>Je vindt het leuk om mensen te helpen en je werkt graag samen. Dat past bij Verpleegkunde.</p>
      </div>

      <div className={`${s.float} ${s.favs}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Icon name="heart" size={16} stroke={2.2} />
          </span>
          Bewaard
          <span className={s.count}>2</span>
        </p>
        <p className={s.floatText}>Verpleegkunde en Pedagogisch medewerker</p>
      </div>
    </div>
  );
}

/** Eén opleiding uit de uitslag, met wat de studiekiezer erover te zien krijgt. */
export function EducationArt() {
  const rows: [string, string, string][] = [
    ["school", "Scholen", "14 in Nederland"],
    ["pin", "Dichtstbij", "Utrecht · 12 km"],
    ["calendar", "Start", "september en februari"],
    ["clipboard", "Leervorm", "voltijd, deeltijd, duaal"],
    ["briefcase", "Beroepen", "verpleegkundige, wijkverpleegkundige"],
  ];
  return (
    <div className={`${s.panel} glass-card`} aria-hidden="true">
      <div className={s.panelHead}>
        <span className={s.panelIcon}>
          <Icon name="cap" size={22} stroke={2} />
        </span>
        <span>
          <b>Verpleegkunde</b>
          <span>HBO Bachelor · Zorg en welzijn</span>
        </span>
        <span className={s.panelPct}>92%</span>
      </div>
      <ul className={s.facts}>
        {rows.map(([icon, label, value]) => (
          <li key={label}>
            <Icon name={icon} size={16} stroke={2} />
            <span>{label}</span>
            <b>{value}</b>
          </li>
        ))}
      </ul>
      <div className={s.cta}>
        Naar de opleiding
        <Icon name="arrow" size={15} stroke={2.4} />
      </div>
    </div>
  );
}
