import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Cpu,
  Landmark,
  Stethoscope,
  Lock,
  LineChart,
  Workflow,
  CheckCircle2,
  Sparkles,
  Activity,
  BrainCircuit,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import { getHomepageContent, type HomepageContent } from '../lib/strapi';


// ─── Hero ─────────────────────────────────────────────────────────────────────

const snapshotIcons = { Activity, BrainCircuit, ShieldCheck };
const serviceIcons = { Stethoscope, Cpu, Landmark };
const capabilityIcons = { Workflow, LineChart, Cpu, Shield };
const processIcons = { Workflow, Lock, Cpu, Shield };

function Hero({ content }: { content: HomepageContent['hero'] }) {
  return (
    <section className="hero-bg grid-bg min-h-screen flex items-center relative overflow-hidden pt-10">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-teal-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-[2.5%] sm:px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                {content.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-800 text-white leading-[1.05] mb-2">
             {content.titleLine1}
              <br />
              <span className="gradient-text">{content.titleHighlight}</span>
              <br />
               {content.titleLine2}
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-4">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium px-7 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-sky-500/20"
              >
                {content.ctaLabel}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — floating animated panel, same container/content design as the services page hero */}
<div className="relative flex justify-center lg:justify-end">
  <div className="float-animation relative w-full flex justify-center">
    <div className="stat-card rounded-2xl sm:rounded-3xl w-full max-w-[520px] p-5 sm:p-8 glow-pulse">
      {/* {content.image && (
        <img src={content.image} alt="" className="mb-5 h-36 w-full rounded-xl object-cover border border-sky-500/20" />
      )} */}
      {/* Experience badge — first item in the card */}
      <div className="mb-5 relative overflow-hidden rounded-xl border border-sky-500/25 bg-gradient-to-r from-sky-500/15 via-teal-400/10 to-sky-500/15 px-4 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-teal-300" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-800 text-lg text-white leading-none">
            {content.experienceYears}<span className="text-teal-300">+</span> {content.experienceSuffix}
          </p>
          <p className="text-slate-400 text-[11px] mt-1">
            {content.experienceDescription}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 gap-2">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-400 text-[10px] font-medium tracking-widest uppercase whitespace-nowrap">
            {content.snapshotLabel}
          </span>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
      </div>

      <div className="space-y-3">
        {content.snapshotItems.map(({ icon, label, status, color }) => {
          const Icon = snapshotIcons[icon as keyof typeof snapshotIcons] || Activity;
          return (
          <div
            key={label}
            className="bg-white/[0.04] rounded-xl p-4 border border-white/10 flex items-center gap-3 hover:bg-white/[0.07] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Icon size={18} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{label}</p>
              <p className={`text-xs ${color}`}>{status}</p>
            </div>
            <CheckCircle2 size={16} className="text-teal-400 ml-auto shrink-0" />
          </div>
          );
        })}
      </div>

      <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-3">
        <div className="flex -space-x-2 shrink-0">
          {['bg-sky-400', 'bg-teal-400', 'bg-blue-400'].map((c, i) => (
            <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-[#0a0f1e]`} />
          ))}
        </div>
        <span className="text-xs text-slate-400">
          {content.snapshotFooter}
        </span>
      </div>
    </div>

    <div className="hidden sm:flex absolute -top-5 -right-5 bg-teal-400/10 border border-teal-400/25 backdrop-blur-md rounded-xl px-5 py-3 shadow-lg items-center gap-2">
      <CheckCircle2 size={16} className="text-teal-400" />
      <span className="text-sm text-teal-300 font-medium whitespace-nowrap">
        {content.badge}
      </span>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
        <ChevronDown size={18} />
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function ClientTicker({ items }: { items: string[] }) {
  return (
    <div className="solid-card border-y border-sky-500/10 py-5 overflow-hidden">
      <div className="flex gap-16 items-center whitespace-nowrap animate-marquee">
        {[...items, ...items].map((c, i) => (
          <span key={i} className="text-slate-600 text-sm font-medium tracking-wide uppercase">
            {c}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services({ content }: { content: HomepageContent['services'] }) {
  return (
    <section className="bg-[#080c18] py-20">
      <div className="max-w-7xl mx-auto px-[2.5%] sm:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                {content.eyebrow}
              </span>
            </div>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-white leading-tight">
            {content.titleLine1}
            <br />
            <span className="gradient-text">{content.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {content.items.map(({ icon, title, points, tags }) => {
            const Icon = serviceIcons[icon as keyof typeof serviceIcons] || Stethoscope;
            return (
            <div
              key={title}
              className="card-hover group solid-card rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center group-hover:bg-sky-500/15 transition-colors">
                  <Icon size={20} className="text-sky-400" />
                </div>
                <h3 className="font-display font-600 text-teal-400 text-lg">{title}</h3>
              </div>
              <ul className="space-y-2.5 mb-6">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                    <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-5 border-t border-white/5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs whitespace-nowrap bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
 
// ─── Capabilities ─────────────────────────────────────────────────────────────
function Capabilities({ content }: { content: HomepageContent['capabilities'] }) {
  const [active, setActive] = useState(0);

  const current = content.items[active] || content.items[0];
  const Icon = capabilityIcons[current.icon as keyof typeof capabilityIcons] || Workflow;

  return (
    <section className="bg-[#0a0f1e] py-20">
      <div className="max-w-7xl mx-auto px-[2.5%] sm:px-6">

        {/* Heading */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />

            <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
              {content.eyebrow}
            </span>

          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {content.title}
          </h2>

        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6 sm:gap-8 items-stretch">

          {/* LEFT PANEL */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col h-auto lg:h-[420px]">

            {content.items.map((item, index) => (

              <button
                key={item.title}
                onClick={() => setActive(index)}
                className={`flex-1 px-5 sm:px-6 py-4 flex items-center justify-between gap-3 border-b last:border-b-0 transition-all duration-300

                ${
                  active === index
                    ? "bg-sky-500/10 border-sky-500/20"
                    : "border-white/10 hover:bg-white/[0.05]"
                }`}
              >

                <div className="text-left min-w-0">

                  <h3
                    className={`text-lg font-semibold transition-colors truncate

                    ${
                      active === index
                        ? "text-sky-400"
                        : "text-white"
                    }`}
                  >
                    {item.short}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {item.title}
                  </p>

                </div>

                <ArrowRight
                  size={20}
                  className={`shrink-0 transition-all duration-300

                  ${
                    active === index
                      ? "text-sky-400 translate-x-2"
                      : "text-slate-500"
                  }`}
                />

              </button>

            ))}

          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 flex flex-col justify-between h-auto lg:h-[420px]">

  <div>

    {/* Icon + Heading */}

    <div className="flex items-center gap-4 mb-4">

      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">

        <Icon
          size={28}
          className="text-sky-400 sm:w-8 sm:h-8"
        />

      </div>

      <div className="min-w-0">

        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-400 font-semibold mb-1">
          {content.detailLabel}
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {current.title}
        </h3>

      </div>

    </div>

    {/* Description */}

    <p className="flex w-[70%] items-start gap-2 text-slate-400 text-sm leading-[1.5rem] mb-10">
      
      {current.description}
    </p>

    {/* Technologies */}

    <div>

      <p className="text-lg font-semibold uppercase tracking-[0.25em] text-slate-100 mb-3">
        {content.technologiesLabel}
      </p>

      <div className="flex flex-wrap gap-2">

        {current.technologies.map((tech) => (

          <span
            key={tech}
            className="px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-300 text-sm font-medium transition-all duration-300 hover:bg-sky-500/20 hover:border-sky-400 hover:scale-105"
          >
            {tech}
          </span>

        ))}

      </div>

    </div>

  </div>

  {/* Bottom Footer */}
  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">

  <div className="flex -space-x-2 shrink-0">

    {[
      "bg-sky-400",
      "bg-teal-400",
      "bg-blue-400",
    ].map((color, index) => (

      <div
        key={index}
        className={`w-8 h-8 rounded-full ${color} border-2 border-[#0a0f1e]`}
      />

    ))}

  </div>

  <span className="text-sm text-slate-400">
    {content.footer}
  </span>

</div>

</div>

</div>

</div>

</section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function Process({ content }: { content: HomepageContent['process'] }) {
  return (
    <section className="bg-[#050810] py-20">
      <div className="max-w-7xl mx-auto px-[2.5%] sm:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                {content.eyebrow}
              </span>
            </div>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-white leading-tight">
            {content.titleLine1}
            <br />
            <span className="gradient-text">{content.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {content.items.map(({ number, icon, title, description }, idx) => {
            const Icon = processIcons[icon as keyof typeof processIcons] || Workflow;
            return (
            <div key={title} className="relative">
              {idx < content.items.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 h-px bg-gradient-to-r from-sky-500/40 to-teal-400/40 z-10" />
              )}
              <div className="card-hover solid-card rounded-2xl p-6 sm:p-7 h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-sky-400" />
                  </div>
                  <span className="font-display font-700 text-3xl text-white/5">{number}</span>
                </div>
                <h3 className="font-display font-600 text-white text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

function CaseStudies({ content }: { content: HomepageContent['caseStudies'] }) {
  return (
    <section className="bg-[#080c18] py-20">
      <div className="max-w-7xl mx-auto px-[2.5%] sm:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-white">
            {content.titleLine1}
            <br />
            <span className="gradient-text">{content.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map(({ industry, title, image }) => (
            <div
              key={title}
              className="card-hover group solid-card rounded-2xl overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                {image ? (
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-[#080c18] to-teal-400/10" />
                )}
                <span className="absolute top-4 left-4 bg-sky-500/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                  {industry}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-white font-medium text-base leading-snug">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection({ content }: { content: HomepageContent['cta'] }) {
  return (
    <section className="bg-[#0a0f1e] py-24">
      <div className="max-w-4xl mx-auto px-[2.5%] sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                {content.eyebrow}
              </span>
            </div>
        <h2 className="font-display text-3xl lg:text-4xl font-700 text-white leading-tight mb-5">
          {content.titleLine1}
          <br />
          <span className="gradient-text">{content.titleHighlight}</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto mb-10">
          {content.description}
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-sky-500/20"
        >
          {content.buttonLabel}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function Homepage() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHomepageContent()
      .then((homepage) => {
        setContent(homepage);
      })
      .catch((loadError: Error) => {
        setError(loadError.message);
      });
  }, []);

  if (error) {
    return <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center px-6">{error}</div>;
  }

  if (!content) {
    return <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center px-6">Loading homepage content...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />
      <Hero content={content.hero} />
      <ClientTicker items={content.ticker.items} />
      {content.services.items.length > 0 && <Services content={content.services} />}
      {content.capabilities.items.length > 0 && <Capabilities content={content.capabilities} />}
      {content.process.items.length > 0 && <Process content={content.process} />}
      <CaseStudies content={content.caseStudies} />
      <CTASection content={content.cta} />
      <Footer />
    </div>
  );
}