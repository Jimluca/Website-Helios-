"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

// Gebogen lijn met lichtpunten naast de drie kaarten van "Eenvoudig te implementeren" (Voor scholen).
// Elk punt staat op het midden van zijn kaart, een vaste afstand links ervan (--node-gap op .impl-art);
// de lijn loopt door precies die punten. Gemeten in de browser, zodat het klopt bij elke kaarthoogte.
export default function ImplCurve() {
  const ref = useRef<SVGSVGElement>(null);
  const [pts, setPts] = useState<Point[] | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const svg = ref.current;
    const art = svg?.parentElement;
    if (!svg || !art) return;

    const measure = () => {
      const a = art.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(art).getPropertyValue("--node-gap")) || 60;
      const cards = [...art.querySelectorAll<HTMLElement>(".impl-card")];
      setSize({ w: a.width, h: a.height });
      setPts(
        cards.map((c) => {
          const r = c.getBoundingClientRect();
          return { x: Math.round(r.left - a.left - gap), y: Math.round(r.top - a.top + r.height / 2) };
        }),
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(art);
    art.querySelectorAll(".impl-card").forEach((c) => ro.observe(c));
    measure();
    return () => ro.disconnect();
  }, []);

  // Vloeiende boog door de punten: verticaal door het middelste punt.
  let d = "";
  if (pts && pts.length === 3) {
    const [p1, p2, p3] = pts;
    const h1 = p2.y - p1.y;
    const h2 = p3.y - p2.y;
    d =
      `M${p1.x} ${p1.y} ` +
      `C${p1.x + (p2.x - p1.x) * 0.6} ${p1.y + h1 * 0.3} ${p2.x} ${p2.y - h1 * 0.45} ${p2.x} ${p2.y} ` +
      `C${p2.x} ${p2.y + h2 * 0.45} ${p3.x + (p2.x - p3.x) * 0.6} ${p3.y - h2 * 0.3} ${p3.x} ${p3.y}`;
  }

  return (
    <>
      <svg ref={ref} className="impl-path" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
        {d && <path d={d} />}
      </svg>
      {pts?.map((p, i) => <span key={i} className="impl-node" style={{ left: p.x, top: p.y }} aria-hidden="true" />)}
    </>
  );
}
