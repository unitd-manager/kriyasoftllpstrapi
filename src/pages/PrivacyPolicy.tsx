import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you fill out a
    contact form, request a consultation, or subscribe to updates. This may include your name,
    email address, phone number, company name, and any project details you choose to share.
    We also automatically collect certain technical information — including your IP address,
    browser type, device information, and pages visited — through cookies and similar
    technologies when you use our website.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to respond to your inquiries, provide and
    improve our services, communicate with you about projects or updates, analyze website
    usage to enhance user experience, and comply with legal obligations. We do not sell your
    personal information to third parties.`,
  },
  {
    title: '3. Cookies & Tracking Technologies',
    content: `Our website uses cookies to remember your preferences and understand how
    visitors interact with our site. You can control or disable cookies through your browser
    settings or through the cookie consent banner shown when you first visit our site. Please
    see our Cookie Policy for more details.`,
  },
  {
    title: '4. Data Sharing & Disclosure',
    content: `We may share your information with trusted third-party service providers who
    assist us in operating our website and delivering our services (such as hosting providers
    or analytics platforms), all of whom are obligated to keep your information confidential.
    We may also disclose information if required by law or to protect our rights and safety.`,
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard technical and organizational measures to protect
    your personal information against unauthorized access, alteration, disclosure, or
    destruction. However, no method of transmission over the internet is completely secure,
    and we cannot guarantee absolute security.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain personal information only for as long as necessary to fulfill the
    purposes outlined in this policy, unless a longer retention period is required or permitted
    by law.`,
  },
  {
    title: '7. Your Rights',
    content: `Depending on your location, you may have the right to access, correct, update,
    or request deletion of your personal information. To exercise any of these rights, please
    contact us using the details on our Contact page.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our
    practices or for legal, operational, or regulatory reasons. We encourage you to review this
    page periodically for the latest information.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy or how we handle your
    information, please reach out to us through our Contact page.`,
  },
];

function PrivacyHero() {
  return (
    <section className="hero-bg grid-bg min-h-[46vh] flex items-center relative overflow-hidden pt-32 pb-16">
      <div className="w-[95%] md:w-[80%] mx-auto text-center">
        <SectionTag>Privacy Policy</SectionTag>
        <h1 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight mb-4">
          Your Privacy <span className="gradient-text">Matters to Us</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-3">
          Read how Kriyasoft LLP collects, uses, and protects the information you share with us
          through our website and services.
        </p>
        <p className="text-slate-500 text-xs uppercase tracking-widest">
          Effective Date: July 2026
        </p>
      </div>
    </section>
  );
}

function PrivacyContent() {
  return (
    <section className="bg-[#080c18] border-t border-white/10 py-14 md:py-20">
      <div className="w-[95%] md:w-[80%] mx-auto">
        <div className="space-y-5">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 md:p-8"
            >
              <h3 className="font-display font-700 text-xl text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 leading-[1.9] text-[15px]">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-8 text-center">
          <h3 className="font-display font-700 text-lg text-white mb-2">
            Questions about this document?
          </h3>
          <p className="text-slate-400 text-sm">
            Reach us at{' '}
            <a href="/contact" className="text-sky-400 hover:text-sky-300 transition-colors">
              our Contact page
            </a>{' '}
            and we'll get back within two business days.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />
      <PrivacyHero />
      <PrivacyContent />
      <Footer />
    </div>
  );
}