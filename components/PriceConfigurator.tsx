"use client";

import { useEffect, useRef, useState } from "react";
import PriceGuide, { type Composed } from "@/components/PriceGuide";
import Pricing from "@/components/Pricing";
import { CHOOSE_EVENT } from "@/lib/pricing-events";
import type { Pricing as PricingData } from "@/lib/pricing-shared";

// De configurator op de pagina Prijzen: eerst de vier vragen (PriceGuide), dan het samengestelde pakket in de
// prijscalculator (Pricing), waar je nog een ander pakket kiest en toevoegingen aanzet. De keuze gaat via de
// adresbalk (?pakket=…&extra=…), zodat hij ook bij herladen en in een gedeelde link blijft staan.

export default function PriceConfigurator({ data }: { data: PricingData }) {
  const [composed, setComposed] = useState<Composed | null>(null);
  // Zonder vragen meteen zelf samenstellen, of een gedeelde link met een samenstelling.
  const [skipped, setSkipped] = useState(false);
  const mounted = useRef(false);
  const target = useRef<HTMLElement>(null);
  const [scrollKey, setScrollKey] = useState(0);

  const open = composed !== null || skipped;

  const onResult = (next: Composed | null) => {
    if (next) {
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "";
      url.searchParams.set("pakket", String(next.packageId));
      if (next.extraCount && next.extraId) {
        url.searchParams.set("extra", `${next.extraId}:${next.extraCount}`);
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
        onResult={onResult}
        onSkip={() => {
          setSkipped(true);
          setScrollKey((n) => n + 1);
        }}
      />

      <section className="prc-build" id="zelf-samenstellen" ref={target} aria-label="Jouw pakket">
        {open && <Pricing data={data} summary={composed?.summary ?? null} />}
      </section>
    </>
  );
}
