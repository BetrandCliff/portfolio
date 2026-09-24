"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/portfolio";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSending(true);
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");

      setToast({ kind: "success", text: "Message sent successfully. Thanks for reaching out!" });
      formElement.reset();
    } catch (error) {
      setToast({
        kind: "error",
        text: error instanceof Error ? error.message : "Your message could not be sent. Please try again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main id="top">
      <div className="noise" />
      <Navbar />
      <section className="contact-page">
        <div className="shell">
          <Reveal>
            <Link href="/#contact" className="case-back"><ArrowLeft size={14} /> Back to portfolio</Link>
            <div className="contact-page-heading">
              <span className="eyebrow">05 / Start a conversation</span>
              <h1>Tell me what<br /><span>you’re building.</span></h1>
              <p>Share a little about your project or idea. Your message will be sent directly to my inbox.</p>
            </div>
          </Reveal>
          <div className="contact-page-layout">
            <Reveal delay={0.08}>
              <form className="message-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" autoComplete="name" placeholder="Jane Doe" required />

                <label htmlFor="email">Your email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />

                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" placeholder="Project inquiry" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} placeholder="Tell me a bit about what you have in mind…" required />

                <button className="contact-send message-submit" type="submit" disabled={sending}>
                  <span><Mail size={16} /> {sending ? "Sending message…" : "Send message"}</span><ArrowUpRight size={18} />
                </button>
                <p className="form-note">I’ll reply to the email address you provide.</p>
              </form>
            </Reveal>
            <Reveal delay={0.16}>
              <aside className="contact-details">
                <span className="contact-label">Prefer a direct line?</span>
                <a className="detail-link" href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}<ArrowUpRight size={14} /></a>
                <a className="detail-link" href={`tel:${profile.phone}`}><Phone size={17} />{profile.phoneDisplay}<ArrowUpRight size={14} /></a>
                <div className="contact-detail-location"><span>{profile.location}</span><span>GMT +1</span></div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="shell"><div className="rule" style={{ marginBottom: 25 }} /><div className="footer-row"><small>© {new Date().getFullYear()} {profile.displayName}. Built with intention.</small><Link href="/#work" className="case-back">Explore selected work <ArrowUpRight size={14} /></Link></div></div>
      </footer>
      {toast && <div className={`toast toast-${toast.kind}`} role={toast.kind === "error" ? "alert" : "status"} aria-live="polite">{toast.text}</div>}
    </main>
  );
}
