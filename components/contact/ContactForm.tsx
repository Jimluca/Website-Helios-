"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import Icon from "@/components/site/Icon";
import { CONTACT_API, CONTACT_EMAIL, CONTACT_TOPICS, type ContactTopic } from "@/lib/app-links";

// Contactformulier (app/contact): Helios mailt het naar het team (POST /api/contact van het platform, met het
// verborgen veld "website" als val voor robots). Stijlen in app/pages.css ("ct-").

type Fields = { name: string; email: string; organization: string; phone: string; message: string };
type Status = "idle" | "sending" | "sent" | "failed";

const isTopic = (t: string | null): t is ContactTopic => !!t && t in CONTACT_TOPICS;

export function ContactFormFromLink() {
  const params = useSearchParams();
  const topic = params.get("onderwerp");
  return (
    <ContactForm
      key={params.toString()}
      topic={isTopic(topic) ? topic : undefined}
      about={params.get("over")?.slice(0, 160) || undefined}
      message={params.get("bericht")?.slice(0, 5000) || undefined}
    />
  );
}

export default function ContactForm({ topic: initialTopic = "demo", about, message = "" }: { topic?: ContactTopic; about?: string; message?: string }) {
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", organization: "", phone: "", message });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trap = new FormData(e.currentTarget).get("website");

    const found: typeof errors = {};
    if (!fields.name.trim()) found.name = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) found.email = "Vul een geldig e-mailadres in.";
    if (!fields.message.trim()) found.message = "Schrijf kort waar we je mee kunnen helpen.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ topic, about, ...fields, website: trap }),
      });
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        const server: typeof errors = {};
        for (const k of ["name", "email", "message"] as const) if (body?.errors?.[k]) server[k] = found[k] ?? "Controleer dit veld.";
        setErrors(server);
        setStatus(Object.keys(server).length ? "idle" : "failed");
        return;
      }
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="ct-card glass-card ct-done" role="status">
        <span className="pg-icon is-lg" aria-hidden="true">
          <Icon name="check" />
        </span>
        <h2 className="ct-done-title">Bedankt, {fields.name.trim().split(/\s+/)[0]}!</h2>
        <p className="ct-done-text">
          We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op via <strong>{fields.email.trim()}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form className="ct-card glass-card" onSubmit={submit} noValidate>
      <fieldset className="ct-topics">
        <legend className="ct-label">Waar kunnen we je mee helpen?</legend>
        <div className="ct-topic-list">
          {(Object.keys(CONTACT_TOPICS) as ContactTopic[]).map((t) => (
            <label key={t} className={`ct-topic${topic === t ? " is-on" : ""}`}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
              {CONTACT_TOPICS[t]}
            </label>
          ))}
        </div>
        {about && (
          <p className="ct-about">
            Over: <strong>{about}</strong>
          </p>
        )}
      </fieldset>

      <div className="ct-row">
        <Field id="ct-name" label="Naam" required error={errors.name}>
          <input id="ct-name" autoComplete="name" value={fields.name} onChange={set("name")} maxLength={120} aria-invalid={!!errors.name} />
        </Field>
        <Field id="ct-email" label="E-mailadres" required error={errors.email}>
          <input id="ct-email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} maxLength={190} aria-invalid={!!errors.email} />
        </Field>
      </div>
      <div className="ct-row">
        <Field id="ct-org" label="School of organisatie">
          <input id="ct-org" autoComplete="organization" value={fields.organization} onChange={set("organization")} maxLength={160} />
        </Field>
        <Field id="ct-phone" label="Telefoonnummer">
          <input id="ct-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} maxLength={40} />
        </Field>
      </div>
      <Field id="ct-message" label="Bericht" required error={errors.message}>
        <textarea id="ct-message" rows={5} value={fields.message} onChange={set("message")} maxLength={5000} aria-invalid={!!errors.message} />
      </Field>

      {/* Val voor robots: mensen zien en bereiken dit veld niet. */}
      <div className="ct-trap" aria-hidden="true">
        <label htmlFor="ct-website">Website</label>
        <input id="ct-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && (
        <p className="ct-failed" role="alert">
          Versturen lukte niet. Probeer het later nog eens, of mail ons op <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <div className="ct-submit">
        <button type="submit" className="pg-btn pg-btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Versturen…" : "Verstuur"}
          <Icon name="arrow" size={20} stroke={2.2} />
        </button>
        <p className="ct-privacy">We gebruiken je gegevens alleen om op je bericht te reageren.</p>
      </div>
    </form>
  );
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className={`ct-field${error ? " has-error" : ""}`}>
      <label className="ct-label" htmlFor={id}>
        {label}
        {!required && <span className="ct-optional"> (optioneel)</span>}
      </label>
      {children}
      {error && <span className="ct-error">{error}</span>}
    </div>
  );
}
