"use client";

import { useEffect, useRef } from "react";
import { sceneHtml } from "./scene-html";

const HOLD = 5200; // ms per scherm in de zijbalk

// Productbeeld rechts in de hero: schaal van het canvas, automatisch wisselende zijbalk
// en parallax met de muis.
export default function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const stage = stageRef.current;
    const hero = visual?.closest<HTMLElement>(".hero");
    if (!visual || !stage || !hero) return;

    const cleanups: (() => void)[] = [];
    const stacked = matchMedia("(max-width: 1099px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Schaal: desktop toont het hele canvas (1774px), gestapeld alleen het rechterdeel (1184px).
    // Op desktop staat de inhoud lager, onder de vaste menubalk: evenveel als de bovenmarge van .hero
    // (--oy in canvaspixels).
    const fit = () => {
      const w = visual.clientWidth;
      if (!w) return;
      const s = w / (stacked.matches ? 1184 : 1774);
      const oy = stacked.matches ? 0 : parseFloat(getComputedStyle(hero).paddingTop) || 0;
      stage.style.setProperty("--s", String(s));
      stage.style.setProperty("--oy", `${oy / s}px`);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(visual);
    stacked.addEventListener("change", fit);
    fit();
    cleanups.push(() => {
      ro.disconnect();
      stacked.removeEventListener("change", fit);
    });

    // Zijbalk: elke 5,2 s het volgende scherm. Klikken kiest een scherm; zolang de muis op het
    // dashboard staat, pauzeert de wissel.
    const navItems = [...stage.querySelectorAll<HTMLElement>(".nav-item")];
    // Op naam koppelen (nav-beroepen → dashboard-beroepen): in de HTML staan de schermen in een andere volgorde.
    const screens = navItems.map((n) => stage.querySelector<HTMLElement>(`#dashboard-${n.id.replace("nav-", "")}`));
    let active = 0;
    let paused = false;
    let timer = 0;

    const setActive = (i: number) => {
      active = i;
      navItems.forEach((n, j) => n.classList.toggle("is-active", j === i));
      screens.forEach((s, j) => s?.classList.toggle("is-active", j === i));
    };

    // (Her)start de wissel, zodat een aangeklikt scherm de volle 5,2 s blijft staan.
    const schedule = () => {
      clearTimeout(timer);
      if (reduced) return;
      timer = window.setTimeout(() => {
        if (!paused) setActive((active + 1) % navItems.length);
        schedule();
      }, HOLD);
    };

    // Muis op een menu-item toont dat scherm en pauzeert de wissel; klikken werkt ook (aanraakschermen).
    navItems.forEach((n, i) => {
      const click = () => {
        setActive(i);
        schedule();
      };
      const enter = () => {
        setActive(i);
        paused = true;
      };
      n.addEventListener("click", click);
      n.addEventListener("mouseenter", enter);
      cleanups.push(() => {
        n.removeEventListener("click", click);
        n.removeEventListener("mouseenter", enter);
      });
    });

    // "Jouw volgende stap" op het scherm Resultaten: de stappen lopen op (1, 1, 2, 3, 4, 4, 4), elke 1,1 s.
    const steps = [...stage.querySelectorAll<HTMLElement>(".step-item")];
    if (steps.length && !reduced) {
      const seq = [1, 1, 2, 3, 4, 4, 4];
      let pos = 0;
      const tick = window.setInterval(() => {
        pos = (pos + 1) % seq.length;
        const step = seq[pos];
        stage.style.setProperty("--step-line", `${(step - 1) * 22}px`);
        steps.forEach((el) => {
          const n = Number(el.dataset.step);
          el.classList.toggle("is-done", n <= step);
          el.classList.toggle("is-current", n === step);
          el.classList.toggle("is-next", n === step + 1);
        });
      }, 1100);
      cleanups.push(() => clearInterval(tick));
    }

    // Na het verlaten van het dashboard krijgt het huidige scherm weer de volle 5,2 s.
    const dashboard = stage.querySelector<HTMLElement>("#dashboard-window");
    if (dashboard) {
      const enter = () => {
        paused = true;
      };
      const leave = () => {
        paused = false;
        schedule();
      };
      dashboard.addEventListener("mouseenter", enter);
      dashboard.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        dashboard.removeEventListener("mouseenter", enter);
        dashboard.removeEventListener("mouseleave", leave);
      });
    }

    schedule();
    cleanups.push(() => clearTimeout(timer));

    // Parallax: elke laag met data-depth beweegt iets mee met de muis (geen 3D, geen will-change).
    if (!reduced) {
      const layers = [...stage.querySelectorAll<HTMLElement>("[data-depth]")].map((el) => ({ el, d: Number(el.dataset.depth) }));
      let px = 0;
      let py = 0;
      let tx = 0;
      let ty = 0;
      let settled = false;
      let raf = 0;

      const onMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        if (!r.width) return;
        tx = ((e.clientX - r.left) / r.width - 0.62) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
      };
      const loop = () => {
        raf = requestAnimationFrame(loop);
        px += (tx - px) * 0.04;
        py += (ty - py) * 0.04;
        const still = Math.abs(tx - px) < 0.002 && Math.abs(ty - py) < 0.002;
        if (still && settled) return;
        settled = still;
        for (const { el, d } of layers) {
          const x = Math.round(-px * d * 0.35 * 2) / 2;
          const y = Math.round(-py * d * 0.25 * 2) / 2;
          el.style.transform = x || y ? `translate(${x}px,${y}px)` : "";
        }
      };

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      loop();
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="hero-visual" ref={visualRef} aria-hidden="true">
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-scene" dangerouslySetInnerHTML={{ __html: sceneHtml }} />
      </div>
    </div>
  );
}
