import Icon from "@/components/site/Icon";
import s from "./CoachArt.module.css";

// Beelden op Helios Coach (app/helios-coach): het cliëntscherm van een begeleider in Helios en een beroep uit de
// uitslag. Alles wat te zien is, bestaat echt in Helios (testen per cliënt met voortgang, Bekijken als cliënt,
// 360 graden feedback, de to-do, passende beroepen met arbeidsmarkt en vacatures). Namen en cijfers zijn voorbeelden.

const TESTS: { name: string; state: string; pct: number }[] = [
  { name: "Beroepentest", state: "Afgerond", pct: 100 },
  { name: "Loopbaankompas", state: "Bezig", pct: 60 },
  { name: "Competentiescan", state: "Uitgenodigd", pct: 0 },
];

const MATCHES = [
  { name: "Verpleegkundige", pct: 92 },
  { name: "Pedagogisch medewerker", pct: 86 },
  { name: "Activiteitenbegeleider", pct: 81 },
];

/** Hero: het cliëntscherm met testen, plus zwevend de passende beroepen en de to-do. */
export default function CoachVisual() {
  return (
    <div
      className={s.visual}
      role="img"
      aria-label="Voorbeeld van een cliënt in Helios: drie testen met hun voortgang, de knop Bekijken als cliënt en 360 graden feedback. Rechtsboven de passende beroepen met matchpercentage, linksonder de to-do met een herinnering en een nieuw bericht."
    >
      <div className={s.glow} aria-hidden="true" />

      <div className={`${s.window} glass-card`} aria-hidden="true">
        <div className={s.head}>
          <span className={s.avatar}>SV</span>
          <span className={s.who}>
            <b>Sanne de Vries</b>
            <span>Uitgenodigd door jou</span>
          </span>
          <span className={s.status}>Actief</span>
        </div>
        <div className={s.actions}>
          <span className={s.btnPrimary}>
            <Icon name="eye" size={15} stroke={2.2} />
            Bekijken als cliënt
          </span>
          <span className={s.btn}>
            <Icon name="mail" size={15} stroke={2.2} />
            Test uitnodigen
          </span>
        </div>
        <p className={s.label}>Testen</p>
        <ul className={s.tests}>
          {TESTS.map((t) => (
            <li key={t.name}>
              <span className={s.testName}>{t.name}</span>
              <span className={s.bar}>
                <span style={{ width: `${t.pct}%` }} />
              </span>
              <span className={t.pct === 100 ? s.done : s.state}>{t.state}</span>
            </li>
          ))}
        </ul>
        <div className={s.feedback}>
          <Icon name="users" size={16} stroke={2.2} />
          360 graden feedback
          <b>3 van 4 ingevuld</b>
        </div>
      </div>

      <div className={`${s.float} ${s.matches}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Icon name="briefcase" size={16} stroke={2.2} />
          </span>
          Passende beroepen
        </p>
        <ul className={s.matchList}>
          {MATCHES.map((m) => (
            <li key={m.name}>
              <span>{m.name}</span>
              <b>{m.pct}%</b>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${s.float} ${s.todo}`} aria-hidden="true">
        <p className={s.floatHead}>
          <span className={s.floatIcon}>
            <Icon name="check" size={16} stroke={2.6} />
          </span>
          To-do
          <span className={s.count}>2</span>
        </p>
        <ul className={s.todoList}>
          <li>
            <Icon name="bell" size={14} stroke={2.2} />
            Herinnering sturen: Mark, Loopbaankompas
          </li>
          <li>
            <Icon name="mail" size={14} stroke={2.2} />
            Nieuw bericht van Lisa
          </li>
        </ul>
      </div>
    </div>
  );
}

/** Uitslag: één passend beroep met wat Helios erbij laat zien. */
export function ProfessionArt() {
  const rows: [string, string, string][] = [
    ["chart", "Kans op werk", "Groot"],
    ["euro", "Salaris", "€ 2.900 – € 4.400"],
    ["briefcase", "Vacatures nu", "128 in de regio"],
    ["cap", "Opleidingen", "mbo 4 en hbo"],
    ["arrow-up", "Doorgroeien", "Verpleegkundig specialist"],
  ];
  return (
    <div className={`${s.panel} glass-card`} aria-hidden="true">
      <div className={s.panelHead}>
        <span className={s.panelIcon}>
          <Icon name="heart-hand" size={20} stroke={2} />
        </span>
        <span>
          <b>Verpleegkundige</b>
          <span>Zorg en welzijn · mbo en hbo</span>
        </span>
        <span className={s.pct}>92%</span>
      </div>
      <p className={s.why}>
        <Icon name="info" size={15} stroke={2.2} />
        Past bij je interesse in mensen helpen en je talent voor zorgvuldig werken.
      </p>
      <ul className={s.facts}>
        {rows.map(([icon, label, value]) => (
          <li key={label}>
            <Icon name={icon} size={16} stroke={2} />
            <span>{label}</span>
            <b>{value}</b>
          </li>
        ))}
      </ul>
      <div className={s.compare}>
        <Icon name="grid" size={15} stroke={2.2} />
        Vergelijk met 2 andere beroepen
      </div>
    </div>
  );
}
