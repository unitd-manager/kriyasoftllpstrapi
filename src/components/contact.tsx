import { useEffect, useState } from 'react';
import {
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

import {
  getPageBySlug,
  createEnquiry,
  type ContactPageSection,
} from '../lib/pages';

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export default function Contact() {
  const [content, setContent] = useState<ContactPageSection | null>(null);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [sending, setSending] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  /*
   * ---------------------------------------------------------
   * LOAD CONTACT PAGE FROM STRAPI
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const loadContactPage = async () => {
      try {
        setLoading(true);

        const page = await getPageBySlug('contact');

        const contactSection = page?.pageBuilder?.find(
          (block) =>
            block?.__component ===
            'acf-sections.contact-page-section'
        );

        if (!contactSection) {
          throw new Error(
            'Contact Page Section was not found in Strapi.'
          );
        }

        setContent(contactSection as ContactPageSection);
      } catch (error) {
        console.error('Failed to load Contact page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContactPage();
  }, []);

  /*
   * ---------------------------------------------------------
   * FORM CHANGE
   * ---------------------------------------------------------
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    setServerError(null);
  };

  /*
   * ---------------------------------------------------------
   * FORM VALIDATION
   * ---------------------------------------------------------
   */
  const validate = () => {
    const nextErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Message is required.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /*
   * ---------------------------------------------------------
   * FORM SUBMIT
   * ---------------------------------------------------------
   *
   * Sends the enquiry to Strapi.
   *
   * Frontend:
   * message
   *
   * Strapi:
   * comments
   *
   * Email/SMTP notification can be configured separately
   * in Strapi.
   * ---------------------------------------------------------
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSending(true);
    setServerError(null);

    try {
      await createEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setSubmitted(true);

      setForm({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to submit enquiry:', error);

      setServerError(
        'Something went wrong while sending your message. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * LOADING STATE
   * ---------------------------------------------------------
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080c18] flex items-center justify-center">
        <Loader2
          size={32}
          className="text-sky-400 animate-spin"
        />
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * ERROR STATE
   * ---------------------------------------------------------
   */
  if (!content) {
    return (
      <div className="min-h-screen bg-[#080c18] text-white">
        <Navbar />

        <section className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-3">
              Contact page unavailable
            </h1>

            <p className="text-slate-400">
              The Contact Page Section could not be loaded from Strapi.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * GOOGLE MAP
   * ---------------------------------------------------------
   *
   * Use the complete Google Maps embed URL stored in Strapi.
   *
   * Example:
   * https://www.google.com/maps/embed?pb=...
   *
   * Do not generate the map URL using:
   * https://www.google.com/maps?q=...
   *
   * The complete embed URL gives the correct Google Maps
   * appearance.
   * ---------------------------------------------------------
   */
  const mapUrl = content.map_embed_url?.trim() || '';

  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />

      {/* =====================================================
          HERO
          ===================================================== */}
      <section
        className="
          min-h-[40vh]
          flex
          items-center
          relative
          overflow-hidden
          pt-32
          pb-14
          bg-[#0a0f1e]
          border-b
          border-white/10
        "
      >
        {/* Grid background */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-40
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '72px 72px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-center">
          <SectionTag>
            {content.eyebrow || 'Contact Us'}
          </SectionTag>

          <h1
            className="
              font-display
              text-4xl
              lg:text-5xl
              xl:text-6xl
              font-800
              text-white
              leading-[1.05]
              mb-4
            "
          >
            {content.heading || "Let's start a"}

            <br />

            <span
              className="
                bg-gradient-to-r
                from-sky-400
                to-teal-400
                bg-clip-text
                text-transparent
              "
            >
              {content.heading_highlight || 'conversation.'}
            </span>
          </h1>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM + CONTACT INFORMATION
          ===================================================== */}
      <section
        className="
          bg-[#080c18]
          border-t
          border-white/10
          py-14
          md:py-20
        "
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="
              grid
              lg:grid-cols-2
              gap-8
              items-stretch
            "
          >
            {/* =================================================
                CONTACT FORM
                ================================================= */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.015]
                p-6
                md:p-8
                flex
                flex-col
              "
            >
              <h2
                className="
                  font-display
                  font-700
                  text-2xl
                  text-white
                  mb-6
                "
              >
                {content.form_title || 'Send us a message'}
              </h2>

              {submitted ? (
                <div
                  className="
                    rounded-xl
                    border
                    border-teal-400/25
                    bg-teal-400/10
                    px-5
                    py-4
                    text-teal-300
                    text-sm
                  "
                >
                  Thanks — your message has been sent.
                  Our team will get back to you shortly.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="
                    space-y-5
                    flex-1
                    flex
                    flex-col
                  "
                >
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        block
                        text-slate-400
                        text-xs
                        font-medium
                        mb-2
                        uppercase
                        tracking-wide
                      "
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="
                        w-full
                        rounded-xl
                        bg-white/[0.03]
                        border
                        border-white/10
                        px-4
                        py-3
                        text-white
                        placeholder:text-slate-600
                        focus:outline-none
                        focus:border-sky-500/40
                        transition-colors
                      "
                    />

                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        block
                        text-slate-400
                        text-xs
                        font-medium
                        mb-2
                        uppercase
                        tracking-wide
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="
                        w-full
                        rounded-xl
                        bg-white/[0.03]
                        border
                        border-white/10
                        px-4
                        py-3
                        text-white
                        placeholder:text-slate-600
                        focus:outline-none
                        focus:border-sky-500/40
                        transition-colors
                      "
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="
                        block
                        text-slate-400
                        text-xs
                        font-medium
                        mb-2
                        uppercase
                        tracking-wide
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="
                        w-full
                        flex-1
                        rounded-xl
                        bg-white/[0.03]
                        border
                        border-white/10
                        px-4
                        py-3
                        text-white
                        placeholder:text-slate-600
                        focus:outline-none
                        focus:border-sky-500/40
                        transition-colors
                        resize-none
                      "
                    />

                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* SERVER ERROR */}
                  {serverError && (
                    <p className="text-sm text-red-400">
                      {serverError}
                    </p>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      group
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-gradient-to-r
                      from-sky-500
                      to-teal-400
                      text-white
                      font-medium
                      px-7
                      py-3.5
                      rounded-full
                      hover:opacity-90
                      transition-all
                      duration-200
                      shadow-lg
                      shadow-sky-500/20
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >
                    {sending ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message

                        <ArrowRight
                          size={16}
                          className="
                            group-hover:translate-x-1
                            transition-transform
                          "
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* =================================================
                RIGHT SIDE
                ================================================= */}
            <div
              className="
                flex
                flex-col
                gap-5
                h-full
              "
            >
              {/* OFFICE */}
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.015]
                  p-6
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    bg-sky-500/10
                    border
                    border-sky-500/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MapPin
                    size={20}
                    className="text-sky-400"
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-white
                      font-600
                      mb-1
                    "
                  >
                    {content.office_label || 'Office (India)'}
                  </h3>

                  <p
                    className="
                      text-slate-400
                      text-sm
                      leading-relaxed
                      whitespace-pre-line
                    "
                  >
                    {content.office_address ||
                      'Landons Road, Kilpauk\nChennai – 600010'}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.015]
                  p-6
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    bg-sky-500/10
                    border
                    border-sky-500/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Mail
                    size={20}
                    className="text-sky-400"
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-white
                      font-600
                      mb-1
                    "
                  >
                    Email
                  </h3>

                  {/* 
                    Same text color as the address:
                    text-slate-400
                  */}
                  <a
                    href={`mailto:${content.email}`}
                    className="
                      text-slate-400
                      text-sm
                      hover:text-slate-300
                      transition-colors
                    "
                  >
                    {content.email}
                  </a>
                </div>
              </div>

              {/* =================================================
                  GOOGLE MAP
                  ================================================= */}
              <div
                className="
                  rounded-2xl
                  overflow-hidden
                  border
                  border-white/10
                  flex-1
                  min-h-[230px]
                  bg-[#080c18]
                "
              >
                {mapUrl ? (
                  <iframe
                    title="Kriyasoft office location"
                    src={mapUrl}
                    className="
                      w-full
                      h-full
                      min-h-[230px]
                      border-0
                      block
                    "
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-full
                      min-h-[230px]
                      flex
                      items-center
                      justify-center
                      text-slate-500
                      text-sm
                    "
                  >
                    Map is not configured.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}