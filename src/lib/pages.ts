const API_URL = (
  import.meta.env.VITE_STRAPI_URL || 'http://localhost:1336'
).replace(/\/$/, '');

/* =========================================================
   CONTACT PAGE
========================================================= */

export interface ContactPageSection {
  __component: 'acf-sections.contact-page-section';
  id: number;
  eyebrow?: string;
  heading?: string;
  heading_highlight?: string;
  form_title?: string;
  office_label?: string;
  office_address?: string;
  email: string;
  map_embed_url?: string;
  map_open_url?: string;
}

/* =========================================================
   LEGAL PAGES
========================================================= */

export interface LegalSectionItem {
  id: number;
  title: string;
  body: string;
}

export interface LegalPageHero {
  __component: 'acf-sections.legal-page-hero';
  id: number;
  eyebrow?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  effective_date?: string;
}

export interface LegalPageBody {
  __component: 'acf-sections.legal-page-body';
  id: number;
  sections: LegalSectionItem[];
}

export interface LegalPageCta {
  __component: 'acf-sections.legal-page-cta';
  id: number;
  title?: string;
  description?: string;
  link_text?: string;
  link_url?: string;
  after_link_text?: string;
}

/* =========================================================
   PAGE BUILDER
========================================================= */

export type PageBuilderBlock =
  | ContactPageSection
  | LegalPageHero
  | LegalPageBody
  | LegalPageCta
  | {
      __component: string;
      [key: string]: unknown;
    };

export interface PageData {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  pageBuilder: PageBuilderBlock[];
}

/* =========================================================
   FOOTER
========================================================= */

export interface FooterLink {
  id?: number;
  label?: string;
  url?: string;
  Publish?: boolean;
}

export interface FooterColumn {
  id?: number;
  title?: string;
  links?: FooterLink[];
}

export interface FooterData {
  id?: number;
  documentId?: string;

  logo?: {
    id?: number;
    url?: string;
    alternativeText?: string | null;
  } | null;

  logo_alt?: string;

  columns?: FooterColumn[];

  copyright_text?: string;
}

/* =========================================================
   GET PAGE BY SLUG
========================================================= */

export async function getPageBySlug(
  slug: string
): Promise<PageData> {
  const response = await fetch(
    `${API_URL}/api/pages/slug/${slug}?populate=deep`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load page "${slug}" (status ${response.status})`
    );
  }

  const json = await response.json();

  return json.data ?? json;
}

/* =========================================================
   CREATE ENQUIRY
========================================================= */

export interface CreateEnquiryData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

export async function createEnquiry(
  data: CreateEnquiryData
): Promise<unknown> {
  const response = await fetch(
    `${API_URL}/api/enquiries`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          comments: data.message,
          captchaToken: data.captchaToken,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorJson: unknown = await response.json().catch(() => null);
    let errorMessage =
      response.status === 400
        ? 'Please check your details and complete the CAPTCHA before trying again.'
        : response.status === 429
          ? 'Too many requests. Please wait a moment and try again.'
          : 'Unable to submit your enquiry. Please try again.';

    if (
      typeof errorJson === 'object' &&
      errorJson !== null &&
      'error' in errorJson &&
      typeof errorJson.error === 'object' &&
      errorJson.error !== null &&
      'message' in errorJson.error &&
      typeof errorJson.error.message === 'string'
    ) {
      errorMessage = errorJson.error.message;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

/* =========================================================
   GET FOOTER
========================================================= */

export async function getFooter(): Promise<FooterData> {
  const response = await fetch(
    `${API_URL}/api/footer?populate[logo]=true&populate[columns][populate][links]=true`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load footer (status ${response.status})`
    );
  }

  const json = await response.json();

  console.log('FOOTER API RESPONSE:', json);

  return json.data ?? json;
}

/* =========================================================
   EXPORT API URL
========================================================= */

export { API_URL };