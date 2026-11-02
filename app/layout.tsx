import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/app-links";
// Lettertypes van de eigen site (geen verzoeken naar Google, dus geen IP-adressen van bezoekers naar derden):
// Inter 400–600 en Inter Tight 700/800, zoals in het ontwerp.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource/inter-tight/800.css";
import "./globals.css";
import "./pages.css";

const TITLE = "Helios – Brengt talent aan het licht";
const DESCRIPTION =
  "Maak verschillende testen, ontdek je talenten, interesses en mogelijkheden en krijg direct persoonlijk advies voor je studie, werk of volgende stap.";

// Het deelbeeld (app/opengraph-image.png en twitter-image.png) geldt voor alle pagina's.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { type: "website", siteName: "Helios", locale: "nl_NL", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
};

// Licht of donker al vóór de eerste weergave: de eigen keuze (localStorage), anders die van het apparaat.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("helios-theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
