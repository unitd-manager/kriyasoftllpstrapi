import fallbackCaseStudies, { type CaseStudy } from '../data/caseStudies';
import { getImageUrl } from './imageUrl';

const API_URL = (import.meta.env.VITE_STRAPI_URL || 'http://localhost:1339').replace(/\/$/, '');

type StrapiMedia = { url?: string } | null;
type StrapiResponse<T> = { data?: T[] };
type StrapiSingleResponse<T> = { data?: T };
type StrapiPage = {
  pageBuilder?: Array<Record<string, unknown>>;
};

type StrapiHeaderLink = {
  label?: string;
  url?: string;
  publish?: boolean;
  children?: Array<unknown>;
};

type StrapiHeader = {
  logo?: StrapiMedia;
  nav_links?: StrapiHeaderLink[];
};

type StrapiService = {
  id?: number;
  title: string;
  slug?: string;
  blurb?: string;
  tags?: unknown;
  points?: unknown;
  icon?: string;
  sortOrder?: number;
};

type StrapiCaseStudy = Partial<CaseStudy> & {
  image?: StrapiMedia;
  secondaryImage?: StrapiMedia;
};

export type SiteService = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  points: string[];
  icon?: string;
};

export type HomepageContent = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
    ctaLabel: string;
    experienceYears: string;
    experienceSuffix: string;
    experienceDescription: string;
    snapshotLabel: string;
    snapshotItems: { label: string; status: string; icon: string; color: string }[];
    snapshotFooter: string;
    badge: string;
    image?: string;
  };
  ticker: { items: string[] };
  services: { eyebrow: string; titleLine1: string; titleHighlight: string; items: SiteService[] };
  capabilities: {
    eyebrow: string;
    title: string;
    detailLabel: string;
    technologiesLabel: string;
    footer: string;
    items: { title: string; short: string; description: string; technologies: string[]; icon: string }[];
  };
  process: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    items: { number: string; title: string; description: string; icon: string }[];
  };
  caseStudies: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    items: { industry: string; title: string; image?: string }[];
  };
  cta: { eyebrow: string; titleLine1: string; titleHighlight: string; description: string; buttonLabel: string };
};

export type HeaderContent = {
  logo: string;
  links: Array<{ label: string; href: string }>;
};

export type AboutPageContent = {
  story: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  credentials: Array<{ icon: string; top: string; bottom: string }>;
  sectors: Array<{ icon: string; image?: string; title: string; description: string }>;
  teamRows: Array<{ top: string; bottom: string }>;
};

export type ServicesPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    titlehighlight:string;
    titleLine2:string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
    highlights: { label: string; value: string; description: string }[];
  };
  list: { eyebrow: string; title: string;  titlehighlight:string; description: string; items: SiteService[] };
  capabilities: { eyebrow: string; titlehighlight:string; title: string; items: { title: string; description: string; image?: string; icon: string }[] };
  process: { eyebrow: string; title: string; items: { number: string; title: string; description: string; icon: string }[] };
  cta: { eyebrow: string; title: string; subTitle: string; description: string; buttonLabel: string; buttonUrl: string };
};

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.map((item) => {
        if (typeof item === 'string') return item;
        if (!item || typeof item !== 'object') return '';

        const record = item as Record<string, unknown>;
        const source = record.attributes && typeof record.attributes === 'object'
          ? record.attributes as Record<string, unknown>
          : record;
        return textValue(source.value || source.name || source.title || source.label || source.tags || source.Tags || '');
      }).filter(Boolean)
    : [];

const unwrap = <T,>(item: T & { attributes?: T }): T => item.attributes || item;

const textValue = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value
      .map((block) => (block && typeof block === 'object' && 'children' in block
        ? textValue((block as { children?: unknown }).children)
        : textValue(block)))
      .join(' ');
  }
  if (value && typeof value === 'object' && 'text' in value) {
    return String((value as { text?: unknown }).text || '');
  }
  return '';
};

const mediaUrl = (media: StrapiMedia, fallback: string) => {
  return getImageUrl(media?.url || fallback, API_URL);
};

export async function getHeaderContent(): Promise<HeaderContent> {
  const response = await fetch(`${API_URL}/api/header?populate=*`);
  if (!response.ok) throw new Error(`Strapi Header request failed: ${response.status}`);

  const body = (await response.json()) as StrapiSingleResponse<StrapiHeader>;
  const header = body.data || {};
  const links = Array.isArray(header.nav_links)
    ? header.nav_links
        .filter((item) => item.publish !== false)
        .map((item) => ({
          label: textValue(item.label),
          href: textValue(item.url),
        }))
        .filter((item) => item.label && item.href)
    : [];

  return {
    logo: mediaUrl(header.logo as StrapiMedia, ''),
    links,
  };
}

export async function getServices(): Promise<SiteService[]> {
  const response = await fetch(`${API_URL}/api/services?sort=sortOrder:asc&pagination[pageSize]=100`);
  if (!response.ok) throw new Error(`Strapi services request failed: ${response.status}`);

  const body = (await response.json()) as StrapiResponse<StrapiService>;
  return (body.data || []).map((raw, index) => {
    const service = unwrap(raw);
    return {
      id: String(service.id || service.slug || index),
      title: service.title,
      blurb: service.blurb || '',
      tags: asStringArray(service.tags),
      points: asStringArray(service.points),
      icon: service.icon,
    };
  });
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const response = await fetch(`${API_URL}/api/pages/slug/home?populate=pageBuilder`);
  if (!response.ok) throw new Error(`Strapi Home page request failed: ${response.status}`);

  const body = (await response.json()) as StrapiSingleResponse<StrapiPage>;
  if (!body.data?.pageBuilder?.length) {
    throw new Error('The published Home page has no page-builder sections. Add and publish a layout in Strapi.');
  }

  const sections = body.data.pageBuilder;
  const section = (name: string) => sections.find((item) => item.__component === name) || {};
  const hero = section('acf-sections.qubi-home-hero');
  const ticker = section('acf-sections.qubi-client-ticker');
  const homeServices = section('acf-sections.qubi-home-services');
  const capabilities = section('acf-sections.qubi-capabilities-section');
  const process = section('acf-sections.qubi-how-it-works-section');
  const caseStudies = section('acf-sections.qubi-case-studies-section');
  const cta = section('acf-sections.qubi-final-cta-section');
  const menuLabel = (value: unknown) => value && typeof value === 'object' && 'label' in value
    ? String((value as { label?: unknown }).label || '')
    : '';

  const normalizeRelationArrayText = (entries: unknown): string[] =>
    Array.isArray(entries)
      ? entries.map((entry) => {
          if (entry && typeof entry === 'object') {
            return textValue(
              (entry as { name?: unknown }).name
              || (entry as { title?: unknown }).title
              || (entry as { label?: unknown }).label
              || (entry as { value?: unknown }).value
              || (entry as { technology?: unknown }).technology
              || (entry as { tech?: unknown }).tech
              || (entry as { Tags?: unknown }).Tags
              || (entry as { tag?: unknown }).tag,
            );
          }
          return textValue(entry);
        }).filter(Boolean)
      : [];

  const itemPoints = (item: Record<string, unknown>) => {
    const rawStats = Array.isArray(item.stat)
      ? item.stat
      : Array.isArray(item.points)
        ? item.points
        : [];

    return rawStats.map((entry) => {
      if (entry && typeof entry === 'object' && 'value' in entry) {
        return textValue((entry as { value?: unknown }).value);
      }
      return textValue(entry);
    }).filter(Boolean);
  };

  const itemTags = (item: Record<string, unknown>) => {
    const rawTags = Array.isArray(item.Service)
      ? item.Service
      : Array.isArray(item.tags)
        ? item.tags
        : [];

    return normalizeRelationArrayText(rawTags);
  };

  const itemTechnologies = (item: Record<string, unknown>) => {
    const raw = Array.isArray(item.ServiceTechnologies)
      ? item.ServiceTechnologies
      : Array.isArray(item.technologies)
        ? item.technologies
        : [];

    return normalizeRelationArrayText(raw);
  };

  return {
    hero: {
      eyebrow: textValue(hero.badge_text),
      titleLine1: textValue(hero.main_title),
      titleHighlight: textValue(hero.title_highlight),
      titleLine2: textValue(hero.title_line2),
      description: textValue(hero.description),
      ctaLabel: menuLabel(hero.button),
      experienceYears: textValue(hero.experience_years),
      experienceSuffix: textValue(hero.experience_suffix),
      experienceDescription: textValue(hero.experience_description),
      snapshotLabel: textValue(hero.snapshot_label),
      snapshotItems: Array.isArray(hero.snapshot_items) ? hero.snapshot_items as HomepageContent['hero']['snapshotItems'] : [],
      snapshotFooter: textValue(hero.snapshot_footer),
      badge: textValue(hero.badge),
      image: mediaUrl((hero.hero_image as StrapiMedia) || null, textValue(hero.image_url)),
    },
    ticker: {
      items: Array.isArray(ticker.items)
        ? ticker.items.map((item) => textValue(item.name || item.logo || item.title || item.label))
        : asStringArray(ticker.items),
    },
    services: {
      eyebrow: textValue(homeServices.eyebrow),
      titleLine1: textValue(homeServices.title_line_1 || homeServices.title_line1 || homeServices.titleLine1 || ''),
      titleHighlight: textValue(homeServices.title_highlight || ''),
      items: Array.isArray(homeServices.items)
        ? homeServices.items.map((item, index) => {
            const serviceItem = item as Record<string, unknown>;
            const points = itemPoints(serviceItem);
            const tags = itemTags(serviceItem);
            return {
              id: String(serviceItem.id || index),
              title: textValue(serviceItem.title),
              blurb: textValue(serviceItem.description || serviceItem.blurb || ''),
              tags,
              points: points.length
                ? points
                : asStringArray(serviceItem.points).length
                  ? asStringArray(serviceItem.points)
                  : textValue(serviceItem.description)
                    ? [textValue(serviceItem.description)]
                    : [],
              icon: textValue(serviceItem.icon),
            };
          })
        : [],
    },
    capabilities: {
      eyebrow: textValue(capabilities.eyebrow),
      title: textValue(capabilities.main_title),
      detailLabel: textValue(capabilities.detail_label || capabilities.detailLabel || ''),
      technologiesLabel: textValue(capabilities.technologies_label || capabilities.technologiesLabel || ''),
      footer: textValue(capabilities.footer || ''),
      items: Array.isArray(capabilities.capability_items)
        ? capabilities.capability_items.map((item) => {
            const capabilityItem = item as Record<string, unknown>;
            return {
              title: textValue(capabilityItem.title),
              short: textValue(capabilityItem.short || capabilityItem.short_label || capabilityItem.title || ''),
              description: textValue(capabilityItem.description),
              technologies: itemTechnologies(capabilityItem),
              icon: textValue(capabilityItem.icon),
            };
          })
        : [],
    },
    process: {
      eyebrow: textValue(process.eyebrow),
      titleLine1: textValue(process.main_title),
      titleHighlight: textValue(process.title_highlight),
      items: Array.isArray(process.steps)
        ? process.steps.map((item) => ({
            number: textValue(item.step_number),
            title: textValue(item.title),
            description: textValue(item.description),
            icon: textValue(item.icon),
          }))
        : [],
    },
    caseStudies: {
      eyebrow: textValue(caseStudies.eyebrow),
      titleLine1: textValue(caseStudies.main_title),
      titleHighlight: textValue(caseStudies.title_highlight),
      items: Array.isArray(caseStudies.case_studies)
        ? caseStudies.case_studies.map((item) => ({
            industry: textValue(item.industry),
            title: textValue(item.title),
            image: mediaUrl((item.image as StrapiMedia) || null, textValue(item.image_url)),
          }))
        : [],
    },
    cta: {
      eyebrow: textValue(cta.eyebrow),
      titleLine1: textValue(cta.main_title),
      titleHighlight: textValue(cta.title_highlight),
      description: textValue(cta.description),
      buttonLabel: menuLabel(cta.button),
    },
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const response = await fetch(`${API_URL}/api/pages/slug/about?populate=pageBuilder`);
  if (!response.ok) throw new Error(`Strapi About page request failed: ${response.status}`);

  const body = (await response.json()) as StrapiSingleResponse<StrapiPage>;
  if (!body.data?.pageBuilder?.length) {
    throw new Error('The published About page has no page-builder sections. Add and publish a layout in Strapi.');
  }

  const sections = body.data.pageBuilder;
  const section = (name: string) => sections.find((item) => item.__component === name) || {};

  const story = section('acf-sections.qubi-story-section');
  const stats = section('acf-sections.qubi-stats-section');
  const sectors = section('acf-sections.qubi-icon-grid-section');
  const team = section('acf-sections.qubi-differentiators-section');

  const credentials = Array.isArray(stats.stats)
    ? stats.stats.map((item: Record<string, unknown>) => ({
        icon: textValue(item.icon),
        top: textValue(item.value || item.top || item.title),
        bottom: textValue(item.label || item.bottom || item.description),
      }))
    : Array.isArray(stats.items)
      ? stats.items.map((item: Record<string, unknown>) => ({
          icon: textValue(item.icon),
          top: textValue(item.value || item.top || item.title),
          bottom: textValue(item.label || item.bottom || item.description),
        }))
      : [];

  const sectorItems = Array.isArray(sectors.items)
    ? sectors.items.map((item: Record<string, unknown>) => ({
        icon: textValue(item.icon),
        image: mediaUrl((item.image as StrapiMedia) || null, textValue(item.image_url)),
        title: textValue(item.title),
        description: textValue(item.description),
      }))
    : Array.isArray(sectors.sectors)
      ? sectors.sectors.map((item: Record<string, unknown>) => ({
          icon: textValue(item.icon),
          image: mediaUrl((item.image as StrapiMedia) || null, textValue(item.image_url)),
          title: textValue(item.title),
          description: textValue(item.description),
        }))
      : [];

  const teamRows = Array.isArray(team.items)
    ? team.items.map((item: Record<string, unknown>) => ({
        top: textValue(item.title || item.top),
        bottom: textValue(item.description || item.bottom),
      }))
    : Array.isArray(team.rows)
      ? team.rows.map((item: Record<string, unknown>) => ({
          top: textValue(item.title || item.top),
          bottom: textValue(item.description || item.bottom),
        }))
      : [];

  return {
    story: {
      eyebrow: textValue(story.eyebrow || story.badge || 'About Kriyasoft'),
      titleLine1: textValue(story.title_line1 || story.titleLine1 || story.main_title || story.title),
      titleHighlight: textValue(story.title_highlight || story.titleHighlight || ''),
      titleLine2: textValue(story.title_line2 || story.titleLine2 || ''),
      description: textValue(story.description),
      buttonLabel: textValue(story.button_label || story.buttonLabel || 'Talk to Our Experts'),
      buttonUrl: textValue(story.button_url || story.buttonUrl || '/contact'),
    },
    credentials,
    sectors: sectorItems,
    teamRows,
  };
}

export async function getServicesPageContent(): Promise<ServicesPageContent> {
  const response = await fetch(`${API_URL}/api/pages/slug/services`);
  if (!response.ok) throw new Error(`Strapi Services page request failed: ${response.status}`);
  const body = (await response.json()) as StrapiSingleResponse<StrapiPage>;
  if (!body.data?.pageBuilder?.length) throw new Error('The published Services page has no page-builder sections.');

  const sections = body.data.pageBuilder;
  const section = (name: string) => sections.find((item) => item.__component === name) || {};
  const hero = section('acf-sections.qubi-services-hero');
  const list = section('acf-sections.qubi-services-list');
  const capabilities = section('acf-sections.qubi-services-capabilities');
  const process = section('acf-sections.qubi-services-process');
  const cta = section('acf-sections.qubi-services-cta');
  return {
    hero: {
      eyebrow: textValue(hero.eyebrow), title: textValue(hero.title), titlehighlight: textValue(hero.title_highlight), titleLine2: textValue(hero.title_line2), description: textValue(hero.description),
      buttonLabel: textValue(hero.button_label), buttonUrl: textValue(hero.button_url),
      highlights: Array.isArray(hero.highlights) ? hero.highlights as ServicesPageContent['hero']['highlights'] : [],
    },
    list: {
      eyebrow: textValue(list.eyebrow), title: textValue(list.title), titlehighlight: textValue(list.title_highlight), description: textValue(list.description),
      items: Array.isArray(list.items) ? list.items.map((item, index) => ({
        id: String(item.id || index), title: textValue(item.title), blurb: textValue(item.blurb),
        tags: asStringArray(item.tags), points: asStringArray(item.points), icon: textValue(item.icon),
      })) : [],
    },
    capabilities: {
      eyebrow: textValue(capabilities.eyebrow), titlehighlight: textValue(capabilities.title_highlight), title: textValue(capabilities.title),
      items: Array.isArray(capabilities.items) ? capabilities.items.map((item) => ({
        title: textValue(item.title), description: textValue(item.description),
        image: mediaUrl((item.image as StrapiMedia) || null, textValue(item.image_url)), icon: textValue(item.icon),
      })) : [],
    },
    process: {
      eyebrow: textValue(process.eyebrow), title: textValue(process.title),
      items: Array.isArray(process.items) ? process.items as ServicesPageContent['process']['items'] : [],
    },
    cta: {
      eyebrow: textValue(cta.eyebrow), title: textValue(cta.title), subTitle: textValue(cta.sub_title),
      description: textValue(cta.description),
      buttonLabel: textValue(cta.button_label), buttonUrl: textValue(cta.button_url),
    },
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const response = await fetch(
    `${API_URL}/api/case-studies?sort=sortOrder:asc&pagination[pageSize]=100&populate=image,secondaryImage`,
  );
  if (!response.ok) throw new Error(`Strapi case studies request failed: ${response.status}`);

  const body = (await response.json()) as StrapiResponse<StrapiCaseStudy>;
  return (body.data || []).map((raw, index) => {
    const item = unwrap(raw);
    const fallback = fallbackCaseStudies[index] || fallbackCaseStudies[0];
    return {
      ...fallback,
      ...item,
      slug: item.slug || fallback.slug,
      img: mediaUrl(item.image || null, fallback.img),
      secondaryImg: mediaUrl(item.secondaryImage || null, fallback.secondaryImg),
      solution: asStringArray(item.solution),
      phases: Array.isArray(item.phases) ? item.phases : fallback.phases,
      outcomes: Array.isArray(item.outcomes) ? item.outcomes : fallback.outcomes,
      stack: asStringArray(item.stack),
      quote: item.quote || fallback.quote,
    } as CaseStudy;
  });
}

export { API_URL };
