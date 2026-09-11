import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Cpu,
  Landmark,
  Briefcase,
  Building2,
  ShieldCheck,
  Workflow,
  LineChart,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import healthImg from "../assets/health about.webp";
import aiImg from "../assets/AI about.webp";
import financeImg from "../assets/finance about.webp";
import { getAboutPageContent, type AboutPageContent } from "../lib/strapi";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Cpu,
  Landmark,
  Briefcase,
  Building2,
  ShieldCheck,
  Workflow,
  LineChart,
  Stethoscope,
};

const fallbackCredentials = [
  { icon: "Briefcase", top: "10+", bottom: "Years Experience" },
  { icon: "Building2", top: "Architects", bottom: "Systems Design" },
  { icon: "Cpu", top: "Engineers", bottom: "AI · Platform" },
  { icon: "ShieldCheck", top: "Domain Specialists", bottom: "Healthcare · Finance" },
];

const fallbackSectors = [
  {
    icon: "HeartPulse",
    image: healthImg,
    title: "Healthcare",
    description: "EHR integration, HIPAA-compliant architecture, patient data platforms, and telemedicine.",
  },
  {
    icon: "Cpu",
    image: aiImg,
    title: "AI",
    description: "Custom ML models, predictive analytics, intelligent automation, and NLP/computer vision.",
  },
  {
    icon: "Landmark",
    image: financeImg,
    title: "Finance",
    description: "Payment systems, AML/KYC compliance, transaction settlement, and blockchain solutions.",
  },
];

const fallbackStory = {
  eyebrow: 'About Kriyasoft',
  titleLine1: 'A technology partner for',
  titleHighlight: 'Healthcare, AI,',
  titleLine2: 'and Finance',
  description: 'Kriyasoft is a technology services firm specializing in enterprise solutions for three primary sectors: Healthcare, AI, and Finance. With 10+ years of industry experience, our team of architects, engineers, and domain specialists delivers secure, scalable, and compliant solutions that drive measurable business value.',
  buttonLabel: 'Talk to Our Experts',
  buttonUrl: '/contact',
};

export default function AboutPage() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAboutPageContent()
      .then(setContent)
      .catch((loadError: Error) => {
        setError(loadError.message);
      });
  }, []);

  const active = content || {
    story: fallbackStory,
    credentials: fallbackCredentials,
    sectors: fallbackSectors,
    teamRows: fallbackCredentials.slice(1).map((item) => ({ top: item.top, bottom: item.bottom })),
  };

  if (error && !content) {
    return <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center px-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />

      <section className="hero-bg grid-bg relative overflow-hidden pt-6">
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-400/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-[3%] sm:px-6 w-full pt-24 pb-20 relative">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1. mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
              {active.story.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-800 text-white leading-[1.05] max-w-4xl mb-8">
            {active.story.titleLine1}{' '}
            <span className="gradient-text">{active.story.titleHighlight}</span>{' '}
            {active.story.titleLine2}
          </h1>

          <p className="text-slate-400 text-lg font-semibold leading-relaxed max-w-2xl mb-10 border-l-2 border-sky-500/30 pl-5 sm:pl-6">
            {active.story.description}
          </p>

          <Link
            to={active.story.buttonUrl}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium px-7 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-sky-500/20 mb-16"
          >
            {active.story.buttonLabel}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {active.credentials.map((credential) => {
              const Icon = iconMap[credential.icon] || Briefcase;
              return (
                <div key={credential.top} className="card-hover solid-card rounded-2xl p-3 sm:p-5">
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                      <Icon size={18} className="text-sky-400" />
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="font-display text-base sm:text-lg md:text-xl font-800 text-white leading-tight break-words">
                        {credential.top}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1 break-words sm:truncate">
                        {credential.bottom}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#080c18] py-24">
        <div className="max-w-7xl mx-auto px-[3%] sm:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                What We Focus On
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight">
              Three sectors. One standard of care.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {active.sectors.map((sector) => {
              const Icon = iconMap[sector.icon] || HeartPulse;
              return (
                <div key={sector.title} className="card-hover solid-card rounded-2xl overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={sector.image || healthImg} alt={sector.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-[#0a0f1e]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Icon size={20} className="text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display font-600 text-teal-400 text-lg mb-3">{sector.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#050810] py-28">
        <div className="max-w-4xl mx-auto px-[3%] sm:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-medium tracking-widest uppercase">
                Our Team
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-800 text-white leading-tight">
              Architects, engineers, and domain specialists.
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed mt-6 max-w-xl mx-auto">
              We focus on delivering secure, scalable, compliant solutions that drive measurable business value.
            </p>
          </div>

          <div className="border-t border-white/10">
            {active.teamRows.map((team, i) => (
              <div key={team.top} className="group flex items-center justify-between gap-3 sm:gap-6 py-6 border-b border-white/10 hover:bg-white/[0.03] transition-colors px-2">
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                  <span className="font-mono text-xs text-slate-600 w-5 sm:w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle2 size={18} className="text-sky-400 shrink-0" />
                  <span className="font-display font-700 text-white text-base sm:text-lg truncate">
                    {team.top}
                  </span>
                </div>
                <span className="font-semibold text-[11px] sm:text-[13px] uppercase tracking-widest text-slate-500 text-right shrink-0">
                  {team.bottom}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}