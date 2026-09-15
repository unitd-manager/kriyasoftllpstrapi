import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPageBySlug } from '../lib/pages';

type LegalSectionItem = {
  id?: number;
  title: string;
  body: string;
};

type LegalPageHero = {
  __component?: 'acf-sections.legal-page-hero';
  eyebrow?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  effective_date?: string;
};

type LegalPageBody = {
  __component?: 'acf-sections.legal-page-body';
  sections?: LegalSectionItem[];
};

type LegalPageCTA = {
  __component?: 'acf-sections.legal-page-cta';
  title?: string;
  description?: string;
  link_text?: string;
  link_url?: string;
  after_link_text?: string;
};

type LegalPageSection =
  | LegalPageHero
  | LegalPageBody
  | LegalPageCTA;

type LegalPageData = {
  id?: number;
  title?: string;
  slug?: string;
  pageBuilder?: LegalPageSection[];
};

const initialLegalPage: LegalPageData = {
  pageBuilder: [
    {
      __component: 'acf-sections.legal-page-hero',
      eyebrow: 'Legal',
      heading: 'Legal Information',
      description: 'Our policies and terms are being prepared.',
    },
  ],
};

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

function LegalHero({ hero }: { hero: LegalPageHero }) {
  return (
    <section className="hero-bg grid-bg min-h-[46vh] flex items-center relative overflow-hidden pt-32 pb-16">
      <div className="w-[95%] md:w-[80%] mx-auto text-center">
        <SectionTag>
          {hero.eyebrow || 'Legal'}
        </SectionTag>

        <h1 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight mb-4">
          {hero.heading || 'Legal Information'}{' '}

          {hero.heading_highlight && (
            <span className="gradient-text">
              {hero.heading_highlight}
            </span>
          )}
        </h1>

        {hero.description && (
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-3">
            {hero.description}
          </p>
        )}

        {hero.effective_date && (
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            Effective Date: {hero.effective_date}
          </p>
        )}
      </div>
    </section>
  );
}

function LegalContent({
  body,
  cta,
}: {
  body?: LegalPageBody;
  cta?: LegalPageCTA;
}) {
  const sections = body?.sections || [];

  return (
    <section className="bg-[#080c18] border-t border-white/10 py-14 md:py-20">
      <div className="w-[95%] md:w-[80%] mx-auto">

        <div className="space-y-5">
          {sections.map((section, index) => (
            <div
              key={section.id ?? `${section.title}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 md:p-8"
            >
              <h3 className="font-display font-700 text-xl text-white mb-3">
                {section.title}
              </h3>

              <p className="text-slate-400 leading-[1.9] text-[15px] whitespace-pre-line">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {cta && (
          <div className="mt-10 rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-8 text-center">

            {cta.title && (
              <h3 className="font-display font-700 text-lg text-white mb-2">
                {cta.title}
              </h3>
            )}

            <p className="text-slate-400 text-sm">
              {cta.description && (
                <>
                  {cta.description}{' '}
                </>
              )}

              {cta.link_url && cta.link_text && (
                <a
                  href={cta.link_url}
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {cta.link_text}
                </a>
              )}

              {cta.after_link_text && (
                <>
                  {' '}
                  {cta.after_link_text}
                </>
              )}
            </p>

          </div>
        )}
      </div>
    </section>
  );
}

export default function LegalPage({
  slug,
}: {
  slug: string;
}) {
  const [page, setPage] = useState<LegalPageData>(initialLegalPage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPage() {
      try {
        setError(null);

        const data = await getPageBySlug(slug);

        if (mounted) {
          setPage(data as LegalPageData);
        }
      } catch (err) {
        console.error(
          `Failed to load legal page: ${slug}`,
          err
        );

        if (mounted) {
          setError('Unable to load this page.');
        }
      } finally {
      }
    }

    loadPage();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (error && !page.pageBuilder?.length) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
        <Navbar />

        <section className="min-h-screen flex items-center justify-center bg-[#080c18]">
          <div className="text-center">
            <h1 className="font-display text-3xl font-800 text-white mb-3">
              Page Not Found
            </h1>

            <p className="text-slate-400 text-sm">
              {error || 'The requested page could not be found.'}
            </p>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  const pageBuilder = Array.isArray(page.pageBuilder)
    ? page.pageBuilder
    : [];

  const hero = pageBuilder.find(
    (block) =>
      block.__component ===
      'acf-sections.legal-page-hero'
  ) as LegalPageHero | undefined;

  const body = pageBuilder.find(
    (block) =>
      block.__component ===
      'acf-sections.legal-page-body'
  ) as LegalPageBody | undefined;

  const cta = pageBuilder.find(
    (block) =>
      block.__component ===
      'acf-sections.legal-page-cta'
  ) as LegalPageCTA | undefined;

  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />

      {hero && <LegalHero hero={hero} />}

      <LegalContent
        body={body}
        cta={cta}
      />

      <Footer />
    </div>
  );
}