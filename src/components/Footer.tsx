import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  API_URL,
  getFooter,
  type FooterData,
  type FooterColumn,
} from '../lib/pages';
import { getImageUrl } from '../lib/imageUrl';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [footer, setFooter] = useState<FooterData | null>(null);

  /* =========================================================
     LOAD FOOTER FROM STRAPI
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadFooter() {
      try {
        const data = await getFooter();

        console.log('DYNAMIC FOOTER FROM STRAPI:', data);

        if (mounted) {
          setFooter(data);
        }
      } catch (error) {
        console.error('Failed to load footer:', error);
      }
    }

    loadFooter();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     FALLBACK FOOTER
     Used only if Strapi is unavailable or has no columns.
  ========================================================= */

  const fallbackColumns: FooterColumn[] = [
    {
      title: 'Services',
      links: [
        {
          label: 'Cloud Architecture',
          url: '/services',
        },
        {
          label: 'Software Engineering',
          url: '/services',
        },
        {
          label: 'AI & ML',
          url: '/services',
        },
        {
          label: 'Cybersecurity',
          url: '/services',
        },
        {
          label: 'Data Engineering',
          url: '/services',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Services',
          url: '/services',
        },
        {
          label: 'About Us',
          url: '/about',
        },
        {
          label: 'Contact Us',
          url: '/contact',
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          label: 'Privacy Policy',
          url: '/privacy-policy',
        },
        {
          label: 'Terms of Service',
          url: '/terms-of-service',
        },
        {
          label: 'Cookie Policy',
          url: '/cookie-policy',
        },
      ],
    },
  ];

  /* =========================================================
     USE STRAPI DATA
  ========================================================= */

  const columns =
    footer?.columns && footer.columns.length > 0
      ? footer.columns
      : fallbackColumns;

  /* =========================================================
     STRAPI LOGO
  ========================================================= */

  const footerLogo = getImageUrl(footer?.logo?.url, API_URL) || logo;

  /* =========================================================
     COPYRIGHT
  ========================================================= */

  const copyrightText =
    footer?.copyright_text ||
    '© {year} Kriyasoft LLP. All rights reserved.';

  const finalCopyright = copyrightText.replace(
    '{year}',
    String(new Date().getFullYear())
  );

  /* =========================================================
     SERVICE LINK HANDLER
  ========================================================= */

  const handleServiceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (location.pathname === '/services') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate(href);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  };

  /* =========================================================
     RENDER LINK
  ========================================================= */

  const renderLink = (
    link: {
      label?: string;
      url?: string;
    },
    index: number
  ) => {
    if (!link.label || !link.url) {
      return null;
    }

    const isInternal =
      link.url.startsWith('/') &&
      !link.url.startsWith('//');

    const isServicesLink =
      link.url === '/services';

    /* ---------------------------------------------------------
       INTERNAL LINKS
    --------------------------------------------------------- */

    if (isInternal) {
      return (
        <li key={`${link.label}-${index}`}>
          {isServicesLink ? (
            <a
              href={link.url}
              onClick={(e) =>
                handleServiceClick(e, link.url!)
              }
              className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ) : (
            <Link
              to={link.url}
              className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
            >
              {link.label}
            </Link>
          )}
        </li>
      );
    }

    /* ---------------------------------------------------------
       EXTERNAL LINKS
    --------------------------------------------------------- */

    return (
      <li key={`${link.label}-${index}`}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          {link.label}
        </a>
      </li>
    );
  };

  /* =========================================================
     FOOTER UI
  ========================================================= */

  return (
    <footer className="bg-[#050810] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            TOP FOOTER
        ===================================================== */}

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* ---------------------------------------------------
              LOGO
          --------------------------------------------------- */}

          <div className="col-span-1 flex items-center justify-start h-full">
            <img
              src={footerLogo}
              alt={
                footer?.logo_alt ||
                footer?.logo?.alternativeText ||
                'Kriyasoft LLP'
              }
              className="h-28 w-46 object-contain"
            />
          </div>

          {/* ---------------------------------------------------
              DYNAMIC FOOTER COLUMNS
          --------------------------------------------------- */}

          {columns.map((column, index) => (
            <div
              key={
                column.id ??
                `${column.title}-${index}`
              }
            >
              <p className="text-white text-sm font-medium mb-4">
                {column.title}
              </p>

              <ul className="space-y-2.5">
                {(column.links || []).map(
                  renderLink
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-slate-600 text-sm text-center">
            {finalCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}