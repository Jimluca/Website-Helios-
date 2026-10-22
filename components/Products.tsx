import type { CSSProperties } from "react";
import ProductArtDark from "./ProductArtDark";

type Product = {
  id: string;
  title: string;
  // Regeleinden komen uit het ontwerp.
  sub: string[];
  body: string[];
  cta: string;
  href: string;
  rgb: string;
  tile: [string, string];
  tint: [string, string];
  border: string;
  icon: string[];
  circle?: boolean;
  api?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "coach",
    title: "Helios Coach",
    sub: ["Voor loopbaanprofessionals", "en re-integratie"],
    body: ["Breng samen met je cliënt in beeld", "wat hij kan en wil. Met betrouwbare", "loopbaantesten, heldere rapporten", "en een eigen omgeving om cliënten", "te begeleiden."],
    cta: "Ontdek Helios Coach",
    href: "#",
    rgb: "112, 72, 240",
    tile: ["#7A4DFF", "#5426F6"],
    tint: ["#F6F0FF", "#ECE2FF"],
    border: "#DCCBFE",
    icon: ["m15.5 8.5-2 5-5 2 2-5z", "M5.5 18.5l13-13"],
    circle: true,
  },
  {
    id: "next",
    title: "Helios Next",
    sub: ["Voor studiekeuze in vo, mbo en hbo"],
    body: ["Helpt leerlingen en studenten", "een opleiding te kiezen die bij ze past.", "Ze ontdekken hun interesses en", "talenten en zien direct welke", "opleidingen aansluiten."],
    cta: "Ontdek Helios Next",
    href: "#",
    rgb: "46, 109, 255",
    tile: ["#3F86FF", "#1F5CF5"],
    tint: ["#F1F6FF", "#E2ECFF"],
    border: "#C9DAFE",
    icon: ["M22 10 12 5 2 10l10 5 10-5z", "M6 12v5c3 2 9 2 12 0v-5"],
  },
  {
    id: "horizon",
    title: "Helios Horizon",
    sub: ["Voor LOB en burgerschap"],
    body: ["Een doorlopende leerlijn waarmee", "leerlingen ontdekken wie ze zijn en", "wat ze willen. Met kant-en-klare", "LOB-opdrachten, burgerschapslessen", "en overzicht per klas voor de mentor."],
    cta: "Ontdek Helios Horizon",
    href: "#",
    rgb: "253, 109, 51",
    tile: ["#FF8A4C", "#F55A1E"],
    tint: ["#FFF5F0", "#FFE7DD"],
    border: "#FCD3C2",
    icon: ["M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z", "M9 4v14", "M15 6v14"],
  },
  {
    id: "connect",
    title: "Helios Connect",
    sub: ["Voor koppeling met je eigen", "systemen"],
    body: ["Zet de testen van Helios in je eigen", "website, portaal of leerlingvolgsysteem.", "Via een API, in je eigen huisstijl, zonder", "dat gebruikers apart hoeven in te", "loggen."],
    cta: "Ontdek Helios Connect",
    href: "#",
    rgb: "87, 50, 254",
    tile: ["#6E48FF", "#4A22F5"],
    tint: ["#F5F0FF", "#EBE3FF"],
    border: "#D8CCFE",
    icon: ["M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7", "M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"],
    api: true,
  },
];

// Vier productkaarten direct onder de hero; de bovenkant valt een stukje over de hero heen.
export default function Products() {
  return (
    <section className="products" id="producten" aria-label="Producten">
      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            id={`product-${p.id}`}
            className="product-card"
            style={
              {
                "--rgb": p.rgb,
                "--tile-0": p.tile[0],
                "--tile-1": p.tile[1],
                "--tint-0": p.tint[0],
                "--tint-1": p.tint[1],
                "--btn-border": p.border,
              } as CSSProperties
            }
          >
            <div className="product-inner">
              {/* eslint-disable-next-line @next/next/no-img-element -- vaste illustratie, schaalt mee met de kaart */}
              <img className="product-art only-light" src={`/assets/prod/${p.id}.png`} alt="" width={400} height={232} />
              <ProductArtDark id={p.id} />
              {p.api && (
                <span className="product-api" aria-hidden="true">
                  API
                </span>
              )}

              <div className="product-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon.map((d) => (
                    <path key={d} d={d} />
                  ))}
                  {p.circle && <circle cx="12" cy="12" r="9" />}
                </svg>
              </div>

              <h3 className="product-title">{p.title}</h3>
              <p className="product-sub">
                {p.sub.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <p className="product-body">
                {p.body.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>

              <a className="product-btn" href={p.href}>
                <span className="product-btn-highlight" aria-hidden="true" />
                <span className="product-btn-sheen" aria-hidden="true" />
                <span className="product-btn-glow" aria-hidden="true" />
                <span className="product-btn-label">{p.cta}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
