import { navigationLinks } from '../data';
import { Mail, Phone, MapPin, ArrowUp, ArrowUpRight, Instagram } from 'lucide-react';

interface FooterProps {
  onLinkClick: (href: string) => void;
}

export default function Footer({ onLinkClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-gray-400 font-sans border-t border-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
      
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-800 pb-16">
          
          {/* Logo / Brand Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-heading font-semibold text-2xl tracking-[0.25em] text-white select-none">
              SUPREME<span className="text-accent">ADS</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              A bespoke performance advertising company engineering data-backed Meta structures. We build end-to-end customer acquisition engines for premium brands, driving true margin scale rather than hollow reach metrics.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
              <span className="text-xs tracking-widest text-[#C89B3C] font-semibold uppercase">META PLATINUM ARCHITECTS</span>
              <a
                href="https://www.instagram.com/supremeadvertisements/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-pink-500 hover:border-pink-500/30 transition-all duration-300 font-medium tracking-wide group"
              >
                <Instagram size={14} className="text-[#C89B3C] group-hover:text-pink-500 shrink-0 transition-colors duration-350" />
                <span className="hover:underline">@supremeadvertisements</span>
              </a>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-heading font-semibold text-xs text-white tracking-[0.2em] uppercase">Sitemap</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(link.href);
                  }}
                  className="hover:text-accent transition-colors duration-300 block text-gray-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-heading font-semibold text-xs text-white tracking-[0.2em] uppercase">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-gray-300 leading-relaxed">
                  Suite 402, Capital Chambers, Connaught Place, New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:performance@supremeads.agency" className="text-gray-300 hover:text-accent transition-colors block">
                  performance@supremeads.agency
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+18005553920" className="text-gray-300 hover:text-accent transition-colors block">
                  +1 (800) 555-3920
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclosures */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SUPREME ADS. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-gray-500 uppercase tracking-wider">
            <a href="#disclaimer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Terms of Performance</a>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                onLinkClick('#admin');
              }}
              className="hover:text-accent font-semibold transition-colors"
            >
              Admin Desk
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="group shrink-0 cursor-pointer p-4 rounded-full border border-gray-800 bg-gray-950 text-white hover:text-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
