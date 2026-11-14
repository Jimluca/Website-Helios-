import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm, { ContactFormFromLink } from "@/components/contact/ContactForm";
import { Accent, CheckList, Eyebrow, IconBadge } from "@/components/site/PageBits";
import { CONTACT_EMAIL } from "@/lib/app-links";

const TITLE = "Contact – Helios";
const DESCRIPTION = "Vraag een vrijblijvende demo aan, vraag meer informatie of een offerte op, of stel je vraag aan het team van Helios.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
};

export default function ContactPage() {
  return (
    <main className="pg">
      <section className="pg-hero ct-hero">
        <div className="pg-wrap ct-grid">
          <div className="pg-hero-copy">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="pg-h1">
              Laten we <Accent>kennismaken.</Accent>
            </h1>
            <p className="pg-lead">
              Wil je Helios in actie zien, weten welk pakket bij je past of heb je een vraag? Laat je gegevens achter, dan nemen we contact met je op.
            </p>
            <CheckList
              items={["Een vrijblijvende demo van het platform", "Advies over het pakket dat bij je past", "Antwoord op je vragen over de testen"]}
            />
            <div className="ct-direct glass-card">
              <IconBadge name="mail" />
              <span>
                <span className="ct-direct-label">Liever direct mailen?</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
            </div>
          </div>

          {/* De link kan het onderwerp al kiezen (?onderwerp=demo, &over=…, &bericht=…); zonder script het lege formulier. */}
          <Suspense fallback={<ContactForm />}>
            <ContactFormFromLink />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
