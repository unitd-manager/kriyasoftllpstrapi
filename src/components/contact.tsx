import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

/* ────────────────────────────────────────────────────────────────────────
 * EMAIL SETUP (FormSubmit) — zero config, purely static, no signup
 * ────────────────────────────────────────────────────────────────────────
 * Messages are delivered straight to RECIPIENT_EMAIL below via FormSubmit
 * (https://formsubmit.co) — no account, no API key, no backend required.
 *
 * ONE-TIME STEP: the very first message you send will trigger an
 * "Activate your form" email from FormSubmit to RECIPIENT_EMAIL.
 * Open it and click the activation link once. After that, every message
 * submitted on the site is delivered directly to that inbox automatically.
 * ──────────────────────────────────────────────────────────────────────── */
const RECIPIENT_EMAIL = 'info@kriyasoft.io';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}

const contactInfo = {
  address: {
    line1: 'Landons Road, Kilpauk',
    line2: 'Chennai – 600010',
    mapQuery: 'Landons Road, Kilpauk, Chennai – 600010',
  },
  email: RECIPIENT_EMAIL,
};

function ContactHero() {
  return (
    <section className="hero-bg grid-bg min-h-[40vh] flex items-center relative overflow-hidden pt-32 pb-14">
      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        <SectionTag>Contact Us</SectionTag>
        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-800 text-white leading-[1.05] mb-4">
          Let's start a
          <br />
          <span className="gradient-text">conversation.</span>
        </h1>
      </div>
    </section>
  );
}

function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

function ContactFormAndInfo() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError(null);
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Message is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setServerError(null);

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New contact form message from ${form.name}`,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setServerError('Something went wrong while sending your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const mapQuery = encodeURIComponent(contactInfo.address.mapQuery);

  return (
    <section className="bg-[#080c18] border-t border-white/10 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact form */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 md:p-8 flex flex-col">
            <h2 className="font-display font-700 text-2xl text-white mb-6">
              Send us a message
            </h2>

            {submitted ? (
              <div className="rounded-xl border border-teal-400/25 bg-teal-400/10 px-5 py-4 text-teal-300 text-sm">
                Thanks — your message has been sent. Our team will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 flex-1 flex flex-col">
                <div>
                  <label htmlFor="name" className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full flex-1 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {serverError && (
                  <p className="text-sm text-red-400">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium px-7 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-sky-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info: address, email, map — three equal-weight blocks */}
          <div className="flex flex-col gap-5 h-full">
            <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                <MapPin size={20} className="text-sky-400" />
              </div>
              <div>
                <h3 className="text-white font-600 mb-1">Office (India)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                <Mail size={20} className="text-sky-400" />
              </div>
              <div>
                <h3 className="text-white font-600 mb-1">Email</h3>
                <p className="text-slate-400 text-sm">{contactInfo.email}</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 flex-1 min-h-[160px]">
              <iframe
                title="Kriyasoft office location"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />
      <ContactHero />
      <ContactFormAndInfo />
      <Footer />
    </div>
  );
}