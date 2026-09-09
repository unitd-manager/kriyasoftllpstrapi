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
    title: '1. What Are Cookies',
    content: `Cookies are small text files placed on your device when you visit a website.
    They are widely used to make websites work more efficiently, remember your preferences,
    and provide information to site owners about how visitors use their site.`,
  },
  {
    title: '2. How We Use Cookies',
    content: `Kriyasoft LLP uses cookies to keep our website secure and functioning properly,
    remember your cookie consent preferences, understand how visitors navigate and interact
    with our site, and improve overall site performance and user experience.`,
  },
  {
    title: '3. Types of Cookies We Use',
    content: `Essential Cookies — required for core website functionality, such as navigation
    and access to secure areas; these cannot be disabled. Preference Cookies — remember choices
    you've made, such as your cookie consent selection, so you don't have to make them again on
    future visits. Analytics Cookies — help us understand how visitors use our website so we
    can improve content and performance. We do not use cookies for third-party advertising.`,
  },
  {
    title: '4. Your Cookie Choices',
    content: `When you first visit our website, you'll see a cookie consent banner allowing you
    to accept or reject non-essential cookies. You can also control or delete cookies at any
    time through your browser settings. Please note that disabling certain cookies may affect
    the functionality of our website.`,
  },
  {
    title: '5. Third-Party Cookies',
    content: `In some cases, we may use trusted third-party services (such as analytics
    providers) that place their own cookies on your device. These third parties have their own
    privacy and cookie policies, which we encourage you to review.`,
  },
  {
    title: '6. Changes to This Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in
    technology, legislation, or our own data practices. Any updates will be posted on this page
    with a revised "last updated" date.`,
  },
  {
    title: '7. Contact Us',
    content: `If you have any questions about how we use cookies, please reach out to us
    through our Contact page.`,
  },
];

function CookieHero() {
  return (
    <section className="hero-bg grid-bg min-h-[46vh] flex items-center relative overflow-hidden pt-32 pb-16">
      <div className="w-[95%] md:w-[80%] mx-auto text-center">
        <SectionTag>Cookie Policy</SectionTag>
        <h1 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight mb-4">
          How We Use <span className="gradient-text">Cookies</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-3">
          This Cookie Policy explains how Kriyasoft LLP uses cookies and similar technologies
          when you visit our website, and the choices you have around them.
        </p>
        <p className="text-slate-500 text-xs uppercase tracking-widest">
          Effective Date: July 2026
        </p>
      </div>
    </section>
  );
}

function CookieContent() {
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

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />
      <CookieHero />
      <CookieContent />
      <Footer />
    </div>
  );
}