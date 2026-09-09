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
    title: '1. Acceptance of Terms',
    content: `By accessing or using Kriyasoft LLP's website and services, you agree to be
    bound by these Terms of Service and our Privacy Policy. If you do not agree with any part
    of these terms, please discontinue use of our website and services.`,
  },
  {
    title: '2. Services',
    content: `Kriyasoft LLP provides enterprise technology, software engineering, cloud
    architecture, AI & ML, cybersecurity, and data engineering services. The specific scope,
    deliverables, and terms of any engagement will be outlined in a separate agreement or
    statement of work between Kriyasoft LLP and the client.`,
  },
  {
    title: '3. Use of Website',
    content: `You agree to use our website only for lawful purposes and in a manner that does
    not infringe the rights of, restrict, or inhibit anyone else's use of the site. You may not
    attempt to gain unauthorized access to any part of our systems or networks.`,
  },
  {
    title: '4. Intellectual Property',
    content: `All content on this website — including text, graphics, logos, and software —
    is the property of Kriyasoft LLP or its licensors and is protected by applicable
    intellectual property laws. You may not reproduce, distribute, or create derivative works
    without our prior written consent.`,
  },
  {
    title: '5. Client Engagements',
    content: `Any project, contract, or service engagement entered into with Kriyasoft LLP is
    governed by a separate signed agreement, which will take precedence over these general
    Terms of Service in the event of any conflict.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `Kriyasoft LLP shall not be liable for any indirect, incidental, or consequential
    damages arising from your use of our website or services, to the fullest extent permitted
    by applicable law.`,
  },
  {
    title: '7. Third-Party Links',
    content: `Our website may contain links to third-party websites. We are not responsible for
    the content, privacy practices, or terms of any third-party sites linked from our platform.`,
  },
  {
    title: '8. Changes to These Terms',
    content: `We reserve the right to modify these Terms of Service at any time. Changes will
    be posted on this page, and continued use of our website after changes are posted
    constitutes acceptance of the revised terms.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms of Service shall be governed by and construed in accordance with the
    applicable laws of the jurisdiction in which Kriyasoft LLP operates, without regard to
    conflict of law principles.`,
  },
  {
    title: '10. Contact Us',
    content: `If you have any questions regarding these Terms of Service, please reach out to
    us through our Contact page.`,
  },
];

function TermsHero() {
  return (
    <section className="hero-bg grid-bg min-h-[46vh] flex items-center relative overflow-hidden pt-32 pb-16">
      <div className="w-[95%] md:w-[80%] mx-auto text-center">
        <SectionTag>Terms of Service</SectionTag>
        <h1 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight mb-4">
          Terms That <span className="gradient-text">Keep Us Aligned</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-3">
          Please read these terms carefully before using our website or engaging Kriyasoft LLP's
          services.
        </p>
        <p className="text-slate-500 text-xs uppercase tracking-widest">
          Effective Date: July 2026
        </p>
      </div>
    </section>
  );
}

function TermsContent() {
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />
      <TermsHero />
      <TermsContent />
      <Footer />
    </div>
  );
}