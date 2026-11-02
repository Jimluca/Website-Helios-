# Uitrollen met Coolify (Hetzner)

De website draait in Coolify als Docker-app (de `Dockerfile` in de hoofdmap), op dezelfde server als de Helios-app
(`app.helioscarreer.nl`). Er is geen database nodig: de prijzen komen uit de Helios-app (`/api/pakketten`).

## Vooraf

- **Domein:** `helioscarreer.nl` en `www.helioscarreer.nl` wijzen al naar de server (49.12.250.154, A- en AAAA-record).
  Coolify regelt het HTTPS-certificaat.
- **Geheugen:** het bouwen van de website kost ongeveer 1 GB. De server heeft al 2 GB swap voor het bouwen van Helios;
  dat is genoeg.

## De app in Coolify

Zet alles in deze stap goed **voordat** je de eerste keer op **Deploy** klikt. Pas je later iets aan, dan geldt het pas na
een nieuwe **Deploy** (bovenaan staat dan _Changes pending_).

1. **GitHub:** de GitHub App van Coolify heeft nu alleen toegang tot `Jimluca/Helios-`. Geef hem ook toegang tot
   `Jimluca/Website-Helios-`: GitHub → **Settings** → **Applications** → de Coolify-app → **Configure** →
   _Repository access_ → `Website-Helios-` toevoegen → **Save**.
2. In Coolify: het project van Helios → **+ New** → **Application** → **Private Repository (with GitHub App)** →
   `Jimluca/Website-Helios-`.
3. Branch `main`, **Build Pack: Dockerfile** (bestand `/Dockerfile`), **Ports Exposes: `3000`** (dat vult Coolify zelf al
   in; de website luistert op 3000, anders dan Helios op 80).
4. **Domains:** vervang het tijdelijke adres (eindigt op `sslip.io`) door
   `https://helioscarreer.nl,https://www.helioscarreer.nl`. Kies bij **Direction** (of _Redirect_) **Redirect to non-www**,
   zodat `www.` doorverwijst naar `helioscarreer.nl`.
5. **Health check:** aan, pad `/up`, poort `3000`. (De image heeft ook zelf een health check op `/up`.)
6. **Environment Variables** (_Developer view_):

    ```
    NEXT_PUBLIC_APP_URL=https://app.helioscarreer.nl
    NEXT_PUBLIC_SITE_URL=https://helioscarreer.nl
    ```

    Zet bij beide het vinkje **Buildtime** juist **aan** (in oudere versies van Coolify: _Build Variable_). Anders dan bij
    Helios gaan deze adressen bij het bouwen vast in de pagina's. Ontbreken ze, dan gebruikt de `Dockerfile` precies
    deze adressen.
7. **Auto Deploy** aan (zoals bij Helios): elke push naar `main` zet de nieuwe versie live.
8. Controleer nog één keer **Ports Exposes** (`3000`) en **Domains**, en klik dan op **Deploy**. Het eerste bouwen duurt
   een paar minuten.

## Controleren na het uitrollen

- `https://helioscarreer.nl/up` geeft `ok`.
- `https://helioscarreer.nl` toont de homepagina; **Inloggen** en **Aanmelden** gaan naar `https://app.helioscarreer.nl`.
- `https://helioscarreer.nl/prijzen` toont de vragen van de keuzehulp (de pakketten komen uit Helios).
- `https://www.helioscarreer.nl` stuurt door naar `https://helioscarreer.nl`.
- `https://helioscarreer.nl/robots.txt` en `/sitemap.xml` bestaan; deel een link in WhatsApp of LinkedIn om het deelbeeld
  te zien.

## Een nieuwe versie

Push naar `main`. Met _Auto Deploy_ bouwt Coolify de nieuwe versie, start hem naast de oude en schakelt over zodra `/up`
werkt. Direct na een push kan de site een minuut lang afwisselend de oude en de nieuwe versie tonen.

## Als iets niet werkt

- **`no available server`, `404 page not found` of `503`:** de proxy van Coolify kent het domein (nog) niet. Controleer
  **Domains** en klik op **Deploy** (staat er _Changes pending_, dan is een wijziging nog niet toegepast).
- **`Bad Gateway`:** **Ports Exposes** staat niet op `3000`. Pas het aan en klik op **Deploy**.
- **Inloggen of Aanmelden gaat naar `localhost`:** de site is gebouwd met een verkeerde `NEXT_PUBLIC_APP_URL`. Controleer de
  variabele (met _Buildtime_ aan) en klik op **Redeploy**; alleen opnieuw starten is niet genoeg, er moet opnieuw
  gebouwd worden.
- **Prijzen: "De pakketten staan hier binnenkort":** de website kon `https://app.helioscarreer.nl/api/pakketten` niet
  bereiken. Controleer of de Helios-app draait; de website probeert het elke minuut opnieuw.
- **Bouwen stopt halverwege:** te weinig geheugen. Controleer de swap (`swapon --show`) of bouw niet tegelijk met Helios.
- **Foutmeldingen:** bij de app onder **Logs**.
