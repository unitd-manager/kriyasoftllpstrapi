import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import staticLogo from '../assets/logo.png';
import { getHeaderContent, type HeaderContent } from '../lib/strapi';

const fallbackLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [links, setLinks] = useState<Array<{ label: string; href: string }>>(fallbackLinks);
  const [logo, setLogo] = useState(staticLogo);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let active = true;

    getHeaderContent()
      .then((header: HeaderContent) => {
        if (!active) return;
        if (header.links.length) setLinks(header.links);
        if (header.logo) setLogo(header.logo);
      })
      .catch(() => {
        if (!active) return;
        setLinks(fallbackLinks);
        setLogo(staticLogo);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-0 backdrop-blur-md">
      {/* Background layer — always mounted, only opacity animates, so blur/border never toggle on/off */}
      <div
        className={`absolute inset-0 bg-[#0a0f1e] border-b border-white/5 transition-opacity duration-300 ${
          scrolled ? 'opacity-95' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="KriyaSoft LLP" className="h-24 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.label} to={l.href} className="nav-link text-sm text-white hover:text-slate-400 transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/*
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
            Sign In
          </a>
          */}
          {/*
          <Link
            to="/contact"
            className="text-sm font-medium bg-gradient-to-r from-sky-500 to-teal-400 text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          */}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="relative md:hidden bg-[#0a0f1e]/98 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)} className="text-white text-sm hover:text-slate-400">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}