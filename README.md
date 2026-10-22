# Helios website (Next.js)

Homepage van Helios, nagebouwd vanuit de Claude Design-handoff (`Bureaublad\Website\Pagina analyseren en nabouwen\design_handoff_helios_hero`).

## Starten

```bash
npm install
npm run dev
```

Open daarna http://localhost:3000.

**Koppeling met het platform.** Inloggen, Aanmelden en "Maak de gratis studiekeuzetest" gaan naar het Helios-platform (`/login` en `/aanmelden`). Het adres staat in `NEXT_PUBLIC_APP_URL` (zie `.env.example`; lokaal de Docker-app op http://localhost:8800). Zet het op de server waar de website wordt gebouwd op het echte adres van het platform: het wordt bij `npm run build` in de pagina gezet.

## Opbouw

- `app/layout.tsx`: html-basis, metadata en de fonts (Inter 400–600 en Inter Tight 700/800 via de Google Fonts-stylesheet; `next/font/google` faalt onder Turbopack in Next 16.4).
- `app/page.tsx`: de homepage.
- `app/globals.css`: alle stijlen van de hero, de schermwissel (`.screen` / `.is-active`), de stappen en de hover-effecten (`hv-*`).
- `components/Header.tsx`: vaste menubalk in liquid glass-stijl (via `app/layout.tsx`): glijdende hoverpil, uitklapmenu Product, compacter bij scrollen, hamburgermenu onder 1000px. Het glas zit in een eigen laag (`.hdr-glass`), zodat de uitklapmenu's de pagina erachter vervagen.
- `components/Hero.tsx`: de tekstkolom (logo, kop, intro, knoppen en drie ingangen: Zoek per school, Opleidingen swiper, Zoek per sector).
- `components/HeroVisual.tsx`: het productbeeld rechts (client component). Regelt de schaal, de automatisch wisselende zijbalk (zeven schermen, elke 5,2 s; klikken kiest een scherm, zolang de muis op het dashboard staat pauzeert de wissel) en de parallax. Op desktop staat het beeld 100px lager (`--oy`), onder de menubalk. Bij `prefers-reduced-motion` staan de animaties uit.
- `components/Products.tsx`: de vier productkaarten onder de hero (Helios Coach, Next, Horizon en Connect). De bovenkant valt een stukje over de hero heen. Binnen een kaart schalen alle maten mee met de kaartbreedte (`--c` in `globals.css`).
- `components/WhatWeDo.tsx`: sectie "Wat we doen": tekst links, rechts vier stappen verbonden door een pad met een lichtpuls (CSS-animaties, uit bij `prefers-reduced-motion`). Op desktop exact op het ontwerpcanvas (1536 × 1024), onder 1100px onder elkaar met het pad links.
- `components/WaveDivider.tsx`: decoratieve golf als scheiding tussen secties (nu tussen "Wat we doen" en "Hoe het werkt"). Props `animate` (standaard aan) en `height` (maximale hoogte, standaard 480).
- `components/HowItWorks.tsx`: sectie "Hoe het werkt": drie stappen met een slideshow van echte schermen uit het platform (`public/assets/screens`). Wisselt elke 5 s, klikken kiest een stap, hover pauzeert.
- `components/Results.tsx`: sectie "Resultaat": kop, drie voordeelkaarten, het paneel "Van resultaat naar inzicht" met drie getekende stappen, en een knop. Op desktop exact op het ontwerpcanvas (1536 × 1024), onder 1100px onder elkaar.
- `scripts/capture-screens.mjs`: maakt de schermen voor de slideshow opnieuw vanuit het lokale Helios-platform.
- `components/Footer.tsx`: footer op elke pagina (via `app/layout.tsx`): logo met intro, drie linkkolommen, demokaart en onderbalk. Op desktop op het ontwerpcanvas (1536 × 1024), zonder de golf bovenaan.
- `components/scene-html.ts`: de markup van het dashboard als vaste illustratie (canvas 1774 × 887, inline stijlen uit het ontwerp). Aangepast t.o.v. het ontwerp: alle zwevende kaarten behalve de glazen tegels weg, "Maatschappij" i.p.v. "Mens & maatschappij", extra menu-items en schermen "Vacatures" en "Populair".
- `public/assets/`: logo en afbeeldingen.

## Nog te vervangen (voorbeeldmateriaal uit de handoff)

- `public/assets/logo-helios.png`: het officiële logo (PNG, doorzichtig, 960 × 298). Een SVG-versie zou nog scherper zijn. De favicon (`app/icon.png`) en het Apple-icoon (`app/apple-icon.png`) zijn gemaakt van het zonne-embleem.
- De drie glazen tegels zijn uitsneden uit `hero2-ref.png` en zien er wat zacht uit. Vervangen door eigen 3D/glas-iconen.
- De foto's in `public/assets/opl` en `public/assets/ber`, de vacatures en de percentages zijn voorbeeldgegevens.
- `public/assets/prod/*`: illustraties van de productkaarten, uitgesneden uit een screenshot en daardoor niet scherp. Vervangen door de originele 3D-renders (liefst transparant, op 2×).
- De links in de footer, de drie ingangen in de hero, "Bekijk de testen" en de knoppen op de productkaarten en "Plan een demo" en "Ontdek hoe Helios werkt" (Resultaat) linken nog naar `#`. "Bekijk hoe het werkt" linkt naar `#hoe-het-werkt`, de volgende sectie.
