"use client";

import { useEffect, useRef, useState } from "react";
import PriceAdvice from "@/components/PriceAdvice";
import PriceGuide from "@/components/PriceGuide";
import Pricing from "@/components/Pricing";
import { compose, type Answers, type Composed } from "@/lib/configurator";
import { CHOOSE_EVENT } from "@/lib/pricing-events";
import type { Pricing as PricingData } from "@/lib/pricing-shared";

// De configurator op de pagina Prijzen: de vier vragen (PriceGuide) stellen één pakket samen (lib/configurator.ts),
// "Ons advies" (PriceAdvice) laat het zien met de prijs, en in de calculator eronder (Pricing) voeg je nog dingen toe.
// Een ander antwoord stelt opnieuw samen, in de goedkoopste grootte. De keuze gaat via de adresbalk
// (?pakket=…&extra=…), zodat hij bij herladen en in een gedeelde link blijft staan.

export default function PriceConfigurator({ data }: { data: PricingData }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [composed, setComposed] = useState<Composed | null>(null);
  // Zonder vragen meteen zelf samenstellen, of een gedeelde link met een samenstelling.
  const [skipped, setSkipped] = useState(false);
  const mounted = useRef(false);
  const target = useRef<HTMLElement>(null);
  const [scrollKey, setScrollKey] = useState(0);

  const open = composed !== null || skipped;

  const apply = (nextAnswers: Answers) => {
    const next = compose(data, nextAnswers);
    if (next) {
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "";
      url.searchParams.set("pakket", String(next.packageId));
      if (next.extras.length) {
        url.searchParams.set("extra", next.extras.map((e) => `${e.id}:${e.count}`).join(","));
      }
      window.history.replaceState(null, "", url.toString());
      // Staat de calculator er al, dan neemt hij de nieuwe keuze over; anders leest hij hem bij het openen.
      if (mounted.current) {
        window.dispatchEvent(new Event(CHOOSE_EVENT));
      }
      if (!composed) {
        setScrollKey((n) => n + 1);
      }
    }
    setComposed(next);
  };

  const onAnswer = (patch: Answers, clear: (keyof Answers)[] = []) => {
    const next = { ...answers, ...patch };
    for (const key of clear) delete next[key];
    setAnswers(next);
    apply(next);
  };

  // Een gedeelde link met een samenstelling opent de calculator meteen; pas na de eerste weergave, zodat server en
  // browser eerst hetzelfde tonen.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (new URLSearchParams(window.location.search).has("pakket")) {
        setSkipped(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    mounted.current = open;
  }, [open]);

  // Bij het eerste samengestelde pakket rustig naar beneden.
  useEffect(() => {
    if (scrollKey) {
      target.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollKey]);

  return (
    <>
      <PriceGuide
        data={data}
        answers={answers}
        onAnswer={onAnswer}
        onSkip={() => {
          setSkipped(true);
          setScrollKey((n) => n + 1);
        }}
      />

      <section className="prc-build" id="zelf-samenstellen" ref={target} aria-label="Jouw pakket">
        {composed && (
          <PriceAdvice
            data={data}
            answers={answers}
            composed={composed}
            onEdit={() => document.getElementById("pg-title")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        )}
        {open && <Pricing data={data} summary={composed?.summary ?? null} configured={composed !== null} />}
      </section>
    </>
  );
}
