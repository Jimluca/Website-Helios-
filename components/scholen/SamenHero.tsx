"use client";

import { useEffect, useRef } from "react";
import { samenHtml } from "./samen-html";

// Animatie rechts in de hero van Voor scholen: vijf glazen kaarten draaien om de Helios-zon, worden erin opgenomen
// en maken plaats voor "Samen brengen we talent tot bloei." Elk element is een functie van de tijd t (s), zoals in
// het prototype. Speelt één keer af zodra 30% in beeld is; wie minder beweging wil, ziet direct de eindstand.
// Van het canvas (1920 × 1080) tonen we alleen het deel met de baan en de zon; op smalle schermen nog smaller,
// zodat de tekst groot genoeg blijft.
const VIEW = { x: 60, y: 150, w: 1750, h: 860 };
const NARROW = { x: 250, y: 160, w: 1420, h: 840 };

export default function SamenHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const board = boardRef.current;
    if (!wrap || !board) return;

    const fit = () => {
      const w = wrap.clientWidth;
      if (!w) return;
      const v = w < 700 ? NARROW : VIEW;
      const s = w / v.w;
      wrap.style.height = `${Math.round(v.h * s)}px`;
      board.style.transform = `scale(${s}) translate(${-v.x}px, ${-v.y}px)`;
    };
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    fit();

    const q = <T extends Element = HTMLElement>(id: string) => board.querySelector<T>("#" + id)!;
    const E = {
      glow: q("bg-glow"),
      blobA: q("blob-a"),
      blobB: q("blob-b"),
      orbit: q<SVGGElement>("orbit"),
      rings: q("rings-wrap"),
      flash: q("entry-flash"),
      orb: q("orb"),
      halo: q("halo"),
      rays: q("rays"),
      rays2: q("rays2"),
      plasmaA: q("plasma-a"),
      plasmaB: q("plasma-b"),
      turb: q<SVGElement>("turb"),
      flares: [0, 1, 2].map((i) => q("flare-" + i)),
      ripples: [0, 1, 2, 3, 4].map((i) => q("rip-" + i)),
      aura: q("aura"),
      aura2: q("aura2"),
      aura3: q("aura3"),
      coreLight: q("core-light"),
      text: q("helios-text"),
      msg: q("message"),
      words: [0, 1, 2, 3, 4, 5].map((i) => q("w" + i)),
      bloei: q("bloei"),
      sweep: q("sweep"),
      cards: [0, 1, 2, 3, 4].map((i) => q("card-" + i)),
      fils: [0, 1, 2, 3, 4].map((i) => q<SVGLineElement>("fil-" + i)),
      trails: [] as SVGPolylineElement[],
      sparks: Array.from(q("sparks").children) as HTMLElement[],
      pollen: Array.from(q("pollen").children) as HTMLElement[],
    };
    for (let i = 0; i < 5; i++) for (let k = 0; k < 3; k++) E.trails.push(q<SVGPolylineElement>(`tr-${i}-${k}`));

    let seed = 11;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const POL = Array.from({ length: 44 }, () => ({
      a: rnd() * Math.PI * 2,
      d: 160 + rnd() * 440,
      s: 0.5 + rnd() * 0.9,
      dly: rnd() * 0.5,
      up: 30 + rnd() * 140,
      tw: 2.4 + rnd() * 3,
      ph: rnd(),
      ox: (rnd() - 0.5) * 2,
      oy: (rnd() - 0.5) * 2,
    }));
    const SPK = Array.from({ length: 30 }, () => ({ a: rnd() * Math.PI * 2, d: 60 + rnd() * 120, s: 0.4 + rnd() * 0.8 }));
    const RX = 760;
    const RY = 300;
    let bb: { at: number; x: number; y: number; w: number } | null = null;

    const apply = (t: number, idle: boolean) => {
      const cl = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const pr = (a: number, b: number) => cl((t - a) / (b - a));
      const out = (x: number) => 1 - Math.pow(1 - x, 5);
      const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const bell = (a: number, b: number) => {
        const k = pr(a, b);
        return k > 0 && k < 1 ? Math.sin(Math.PI * k) : 0;
      };
      const CX = 962;
      const CY = 600;
      const OMEGA = (28 * Math.PI) / 180;
      const T0 = 0.8;
      const GAP = 1.5;
      const TC = T0 + 4 * GAP + 0.6 + 1.5;
      const DUR = 3.2;
      const SPACING = GAP * OMEGA;
      const START = (150 * Math.PI) / 180;
      const p1 = out(pr(0.1, 1.0));
      const gb = out(pr(TC + 1.6, TC + 3.2));
      const auS = TC + 3.5;
      const au = pr(auS, auS + 1.2);
      const fade = 1 - out(pr(auS + 0.9, auS + 2.1));
      const mS = auS + 1.9;
      const idleS = mS + 1.6;
      const idleOn = idle ? pr(idleS, idleS + 1.5) : 0;

      E.blobA.style.transform = `translate(${(40 * Math.sin(t * 0.13)).toFixed(1)}px,${(30 * Math.cos(t * 0.11)).toFixed(1)}px)`;
      E.blobB.style.transform = `translate(${(-50 * Math.sin(t * 0.09 + 1)).toFixed(1)}px,${(-30 * Math.cos(t * 0.12)).toFixed(1)}px)`;
      E.glow.style.opacity = ((0.6 + 0.4 * gb) * (0.5 + 0.5 * fade)).toFixed(3);

      const br = 0.5 + 0.5 * Math.sin((t * 2 * Math.PI) / 4.2);
      const br2 = 0.5 + 0.5 * Math.sin((t * 2 * Math.PI) / 6.7 + 1.3);
      let absorb = 0;
      for (let i = 0; i < 5; i++) absorb = Math.max(absorb, bell(TC + 0.12 * i + DUR * 0.86 - 0.1, TC + 0.12 * i + DUR * 0.86 + 0.6));
      E.orb.style.opacity = (p1 * fade).toFixed(3);
      E.orb.style.transform = `scale(${((0.9 + 0.1 * p1) * 1.08 * (1 + 0.05 * Math.sin(Math.PI * au)) * (1 + 0.012 * Math.sin((t * 2 * Math.PI) / 4.2)) * (1 + 0.02 * absorb)).toFixed(4)})`;
      E.text.style.opacity = pr(0.6, 1.1).toFixed(3);
      E.coreLight.style.opacity = cl(0.5 * gb + 0.35 * absorb).toFixed(3);
      E.halo.style.opacity = (cl(0.55 * p1 + 0.2 * bell(0.7, 1.8) + 0.4 * gb + 0.15 * bell(auS, auS + 1.4) + 0.12 * absorb) * fade).toFixed(3);
      E.halo.style.transform = `scale(${(0.92 + 0.14 * p1 + 0.1 * gb + 0.06 * Math.sin(Math.PI * au) + 0.03 * Math.sin((t * 2 * Math.PI) / 4.2 + 0.6) + 0.04 * absorb).toFixed(4)})`;
      E.rays.style.opacity = (cl(0.72 * p1 + 0.28 * gb + 0.2 * bell(auS, auS + 1.4)) * (0.82 + 0.18 * br) * fade).toFixed(3);
      E.rays.style.transform = `rotate(${(t * 0.8).toFixed(2)}deg) scale(${(0.9 + 0.1 * p1 + 0.08 * gb + 0.06 * Math.sin(Math.PI * au) + 0.025 * br + 0.04 * absorb).toFixed(3)})`;
      E.rays2.style.opacity = (cl(0.5 * p1 + 0.3 * gb) * (0.7 + 0.3 * br2) * fade).toFixed(3);
      E.rays2.style.transform = `rotate(${(-t * 1.4 + 6).toFixed(2)}deg) scale(${(0.92 + 0.08 * p1 + 0.08 * gb + 0.03 * br2).toFixed(3)})`;
      E.plasmaA.style.transform = `rotate(${(t * 9).toFixed(2)}deg) scale(${(1 + 0.06 * Math.sin(t * 0.9)).toFixed(3)})`;
      E.plasmaB.style.transform = `rotate(${(-t * 6.5).toFixed(2)}deg) scale(${(1 + 0.05 * Math.cos(t * 0.7)).toFixed(3)})`;
      E.turb.setAttribute("baseFrequency", `${(0.011 + 0.003 * Math.sin(t * 0.6)).toFixed(4)} ${(0.016 + 0.004 * Math.cos(t * 0.45)).toFixed(4)}`);
      for (let f = 0; f < 3; f++) {
        const per = 5.2 + f * 1.9;
        const ph = ((t + f * 2.1) / per) % 1;
        const ang = (f * 117 + Math.floor((t + f * 2.1) / per) * 71) % 360;
        const fl = E.flares[f];
        fl.style.opacity = cl(Math.sin(Math.PI * ph) * (0.35 + 0.3 * gb) * p1 * fade).toFixed(3);
        fl.style.transform = `rotate(${ang}deg) translateX(${(176 + 40 * ph).toFixed(1)}px) scale(${(0.6 + 0.6 * ph).toFixed(3)},${(0.9 - 0.4 * ph).toFixed(3)})`;
      }

      E.aura.style.opacity = (0.95 * bell(auS, auS + 1.3)).toFixed(3);
      E.aura.style.transform = `scale(${(0.75 + 0.5 * out(au)).toFixed(3)})`;
      E.aura2.style.opacity = (0.9 * bell(auS + 0.15, auS + 1.5)).toFixed(3);
      E.aura2.style.transform = `scale(${(0.8 + 0.8 * out(pr(auS + 0.15, auS + 1.5))).toFixed(3)})`;
      E.aura3.style.opacity = (0.9 * bell(auS + 0.3, auS + 1.9)).toFixed(3);
      E.aura3.style.transform = `scale(${(0.7 + 1.6 * out(pr(auS + 0.3, auS + 1.9))).toFixed(3)})`;

      E.orbit.setAttribute("opacity", (out(pr(0.3, 1.3)) * fade).toFixed(3));
      E.rings.style.opacity = (0.9 * out(pr(0.5, 1.6)) * fade).toFixed(3);
      E.rings.style.transform = `rotate(${(t * 0.6).toFixed(2)}deg)`;

      let flash = 0;
      for (let i = 0; i < 5; i++) flash = Math.max(flash, bell(T0 + GAP * i - 0.1, T0 + GAP * i + 0.7));
      E.flash.style.opacity = (0.9 * flash).toFixed(3);
      E.flash.style.transform = `scale(${(0.4 + 1.0 * flash).toFixed(3)})`;

      for (let i = 0; i < 5; i++) {
        const card = E.cards[i];
        const ti = T0 + GAP * i;
        const pe = out(pr(ti, ti + 0.9));
        let op = pe;
        let rf = 1;
        let shrink = 1;
        let th = START - SPACING * i + OMEGA * Math.max(t - T0, 0);
        const ts = TC + 0.12 * i;
        const u = io(pr(ts, ts + DUR));
        if (u > 0) {
          th += 0.6 * u;
          rf = 1 - u;
          shrink = u <= 0.5 ? 1 - 0.3 * (u / 0.5) : 0.7 * (1 - 0.88 * ((u - 0.5) / 0.5));
          op = 1 - cl((u - 0.86) / 0.14);
        }
        const z = Math.sin(th);
        const depth = (z + 1) / 2;
        const emerge = 0.86 + 0.14 * pe;
        const sc = (0.76 + 0.24 * depth) * (0.6 + 0.4 * pe) * shrink;
        const x = RX * Math.cos(th) * rf * emerge;
        const y = RY * Math.sin(th) * rf * emerge;
        const ry = (-Math.cos(th) * 18 * (1 - u)).toFixed(2);
        op *= 0.72 + 0.28 * depth;
        const blur = (1 - pe) * 8 + (z < 0 ? (1 - depth) * 1.6 : 0);
        card.style.opacity = op.toFixed(3);
        card.style.visibility = op < 0.002 ? "hidden" : "visible";
        card.style.zIndex = z > 0 ? "6" : "2";
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
        card.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${sc.toFixed(4)}) rotateY(${ry}deg)`;

        const tv = pe * (1 - cl(u / 0.6)) * fade;
        for (let k = 0; k < 3; k++) {
          const pl = E.trails[i * 3 + k];
          if (tv < 0.01) {
            pl.setAttribute("opacity", "0");
            continue;
          }
          let pts = "";
          for (let st = 0; st <= 6; st++) {
            const a = th - (k * 6 + st) * 0.03;
            pts += `${(CX + RX * Math.cos(a) * rf * emerge).toFixed(1)},${(CY + RY * Math.sin(a) * rf * emerge).toFixed(1)} `;
          }
          pl.setAttribute("points", pts);
          pl.setAttribute("opacity", (tv * (0.55 - k * 0.17) * (0.5 + 0.5 * depth)).toFixed(3));
        }
        const fil = E.fils[i];
        fil.setAttribute("x1", (CX + x).toFixed(1));
        fil.setAttribute("y1", (CY + y).toFixed(1));
        fil.setAttribute("opacity", (Math.sin(Math.PI * cl(u / 0.9)) * 0.75 * (u > 0 ? 1 : 0)).toFixed(3));
        const te = ts + DUR * 0.86;
        const rp = pr(te - 0.1, te + 0.9);
        const rip = E.ripples[i];
        rip.style.opacity = (Math.sin(Math.PI * rp) * 0.9).toFixed(3);
        rip.style.transform = `scale(${(0.85 + 0.75 * out(rp)).toFixed(3)})`;
        for (let j = 0; j < 6; j++) {
          const sp = SPK[i * 6 + j];
          const el = E.sparks[i * 6 + j];
          const qq = pr(te, te + 0.9);
          const dist = 140 + sp.d * out(qq);
          el.style.opacity = (qq > 0 && qq < 1 ? (1 - qq) * 0.95 : 0).toFixed(3);
          el.style.transform = `translate(${(Math.cos(sp.a) * dist).toFixed(1)}px,${(Math.sin(sp.a) * dist * 0.75).toFixed(1)}px) scale(${(sp.s * (1 - 0.5 * qq)).toFixed(3)})`;
        }
      }

      let bx = 0;
      let by = 0;
      let bw = 0;
      if (idle && t > idleS - 0.2) {
        if (!bb || performance.now() - bb.at > 2000) {
          const b = E.bloei;
          bb = { at: performance.now(), x: E.msg.offsetLeft + b.offsetLeft + b.offsetWidth / 2, y: E.msg.offsetTop + b.offsetTop + b.offsetHeight / 2, w: b.offsetWidth };
        }
        bx = bb.x;
        by = bb.y;
        bw = bb.w;
      }
      for (let j = 0; j < 44; j++) {
        const p = POL[j];
        const el = E.pollen[j];
        const qq = pr(auS + 0.1 + p.dly, auS + 0.1 + p.dly + 2.4);
        let o = 0;
        let tx = 0;
        let ty = 0;
        let sc = 1;
        if (qq > 0 && qq < 1) {
          const dist = 120 + p.d * out(qq);
          tx = Math.cos(p.a) * dist;
          ty = Math.sin(p.a) * dist * 0.8 - p.up * qq * qq;
          o = Math.sin(Math.PI * qq) * 0.95;
          sc = p.s * (1 - 0.3 * qq);
        } else if (j >= 32 && idleOn > 0) {
          const tw = Math.max(0, Math.sin(2 * Math.PI * (t / p.tw + p.ph)));
          tx = bx - CX + p.ox * (bw / 2 + 36);
          ty = by - CY + p.oy * 54 - 6 * Math.sin(t * 0.7 + p.ph * 6);
          o = tw * tw * tw * 0.85 * idleOn;
          sc = p.s * (0.5 + 0.5 * tw);
        }
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${sc.toFixed(3)})`;
      }

      for (let w = 0; w < 6; w++) {
        const ws = mS + 0.13 * w;
        const k = out(pr(ws, ws + (w === 5 ? 1.2 : 0.9)));
        const el = E.words[w];
        el.style.opacity = k.toFixed(3);
        const bl = (1 - k) * (w === 5 ? 10 : 6);
        el.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : "none";
        el.style.transform = k >= 0.999 ? "none" : `translateY(${((1 - k) * (w === 5 ? 22 : 14)).toFixed(2)}px) scale(${(w === 5 ? 0.92 + 0.08 * k : 1).toFixed(4)})`;
      }
      const sw0 = mS + 0.13 * 5 + 1.1;
      let k2 = pr(sw0, sw0 + 1.1);
      if (idle && t > sw0 + 1.1) {
        const ph = (t - sw0 - 1.1) % 7;
        k2 = ph < 1.2 ? cl(ph / 1.2) : 1;
      }
      E.sweep.style.backgroundPosition = `${(130 - 140 * k2).toFixed(1)}% 0`;
      const breathe = idle && t > idleS ? 0.5 + 0.5 * Math.sin(((t - idleS) * 2 * Math.PI) / 5.5) : 0;
      E.bloei.style.filter = `drop-shadow(0 10px 16px rgba(89,53,245,${(0.18 + 0.08 * breathe).toFixed(3)}))`;
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    apply(reduced ? 20 : 0, false);
    if (reduced) {
      return () => ro.disconnect();
    }

    let start: number | null = null;
    let visible = false;
    let raf = 0;
    let last = 0;
    let watch = 0;
    const step = (now: number, fromWatch: boolean) => {
      if (start == null) return;
      const t = (now - start) / 1000;
      // Na afloop blijft alleen de "ademende" eindstand lopen zolang de hero in beeld is.
      if (!visible && t > 20) return;
      last = performance.now();
      apply(t, true);
      if (!fromWatch) raf = requestAnimationFrame((n) => step(n, false));
    };
    const loop = () => {
      cancelAnimationFrame(raf);
      clearInterval(watch);
      // Ook in een achtergrondtabblad (geen requestAnimationFrame) loopt de tijdlijn door.
      watch = window.setInterval(() => {
        if (performance.now() - last > 80) step(performance.now(), true);
      }, 40);
      raf = requestAnimationFrame((n) => step(n, false));
    };
    const ioObs = new IntersectionObserver(
      (es) => {
        visible = es[0].isIntersecting;
        if (visible) {
          if (start == null) start = performance.now();
          loop();
        }
      },
      { threshold: 0.3 },
    );
    ioObs.observe(wrap);

    return () => {
      ro.disconnect();
      ioObs.disconnect();
      cancelAnimationFrame(raf);
      clearInterval(watch);
    };
  }, []);

  return (
    <div className="samen" role="img" aria-label="Vijf onderdelen van loopbaanoriëntatie draaien om Helios en komen samen. Samen brengen we talent tot bloei.">
      <div className="samen-wrap" ref={wrapRef}>
        <div className="samen-board" ref={boardRef} dangerouslySetInnerHTML={{ __html: samenHtml }} />
      </div>
    </div>
  );
}
