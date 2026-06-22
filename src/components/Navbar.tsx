import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '../data';

interface NavbarProps {
  activeHash: string;
  onLinkClick: (href: string) => void;
}

export default function Navbar({ activeHash, onLinkClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onLinkClick(href);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'glass-navbar-scrolled py-4 shadow-xl' : 'glass-navbar py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <span className="font-heading font-semibold text-xl md:text-2xl tracking-[0.25em] text-white">
            SUPREME<span className="text-accent group-hover:text-white transition-colors duration-300">ADS</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigationLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 relative py-1 ${
                  isActive 
                    ? 'text-accent font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="border border-accent/40 hover:border-accent bg-transparent hover:bg-accent text-white hover:text-primary font-heading font-semibold text-xs tracking-[0.2em] px-5 py-2.5 uppercase transition-all duration-300"
          >
            Scale Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-300 hover:text-white transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-primary/95 backdrop-blur-md z-40 lg:hidden flex flex-col justify-center px-8 space-y-6 transition-all duration-300">
          {navigationLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`font-heading text-xl tracking-widest uppercase py-2 border-b border-gray-800 transition-all duration-300 block ${
                  isActive ? 'text-accent pl-2' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="w-full text-center block bg-accent hover:bg-accent-dark text-primary font-heading font-semibold text-sm tracking-[0.2em] py-3.5 uppercase transition-colors"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
