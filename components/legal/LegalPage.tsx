import type { ReactNode } from "react";
import { Eyebrow } from "@/components/site/PageBits";
import { LEGAL_UPDATED } from "@/lib/company";

// Opmaak van de juridische pagina's (privacy, cookies, algemene voorwaarden): kop, datum, inhoudsopgave en de tekst op
// een glazen kaart. Stijlen in app/pages.css ("lg-").

export type LegalSection = { id: string; title: string; body: ReactNode };

export default function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <main className="pg">
      <section className="pg-hero lg-hero">
        <div className="pg-wrap lg-wrap">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="pg-h1 lg-title">{title}</h1>
          <div className="pg-lead lg-intro">{intro}</div>
          <p className="lg-updated">Laatst bijgewerkt: {LEGAL_UPDATED}</p>

          <nav className="lg-toc glass-card" aria-label="Inhoud">
            <p className="lg-toc-title">Inhoud</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="lg-body glass-card">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="lg-section">
                <h2>
                  <span className="lg-num">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
