import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ];

  const serviceLinks = [
    { label: 'Cloud Architecture', href: '/services' },
    { label: 'Software Engineering', href: '/services' },
    { label: 'AI & ML', href: '/services' },
    { label: 'Cybersecurity', href: '/services' },
    { label: 'Data Engineering', href: '/services' },
  ];

  // Always lands on the Services page's hero section (top of the page), even if
  // you're already on /services — a plain <Link> to the same route won't scroll
  // on its own, so we force it here.
  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/services');
      // Wait a tick for the new page to mount, then scroll to top.
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  };

  return (
    <footer className="bg-[#050810] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 flex items-center justify-start h-full">
            <img src={logo} alt="KriyaSoft LLP" className="h-28 w-46" />
          </div>

          {/* Services column — every item always scrolls to the top (hero) of the Services page */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Services</p>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={handleServiceClick}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Company</p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <p className="text-white text-sm font-medium mb-4">Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-slate-600 text-sm text-center">
            &copy; {new Date().getFullYear()} Kriyasoft LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}