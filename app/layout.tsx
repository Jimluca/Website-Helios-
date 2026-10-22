import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

// Fonts via de Google Fonts-stylesheet, net als in het ontwerp: Inter 400–600 (vet valt terug op 600)
// en Inter Tight 700/800. next/font/google faalt onder Turbopack in deze Next-versie.
const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Inter:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: "Helios – Brengt talent aan het licht",
  description:
    "Maak verschillende testen, ontdek je talenten, interesses en mogelijkheden en krijg direct persoonlijk advies voor je studie, werk of volgende stap.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
