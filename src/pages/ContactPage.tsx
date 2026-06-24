import ContactForm from '../components/ContactForm';
import { Mail, Phone, Compass, Instagram } from 'lucide-react';

export default function ContactPage() {
  const supports = [
    {
      icon: <Mail size={18} className="text-accent" />,
      title: 'Strategic Briefs',
      desc: 'Send digital mapping decks directly to our account engineers.',
      action: 'performance@supremeads.agency',
      href: 'mailto:performance@supremeads.agency'
    },
    {
      icon: <Phone size={18} className="text-accent" />,
      title: 'Enterprise Hotline',
      desc: 'Instant direct interface for budgets reaching ₹5 Lakhs+ Monthly spend.',
      action: '+1 (800) 555-3920',
      href: 'tel:+18005553920'
    },
    {
      icon: <Instagram size={18} className="text-accent" />,
      title: 'Instagram Handle',
      desc: 'Inspect live ad campaigns and creative masterwork break-downs.',
      action: '@supremeadvertisements',
      href: 'https://www.instagram.com/supremeadvertisements/'
    },
    {
      icon: <Compass size={18} className="text-accent" />,
      title: 'Physical Inquiries',
      desc: 'Suite 920, Premium Capital Towers, Elite Business District, Dubai.',
      action: 'Schedule Visit'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Digital Audit Portal
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            ACQUISITION <span className="font-serif italic text-accent capitalize">INTAKE</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Main Intake briefing splits */}
      <ContactForm />

      {/* Auxiliary contact directory loops */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
              Contact Directories
            </span>
            <h2 className="font-heading font-semibold text-2xl uppercase tracking-tighter text-primary">
              Alternative <span className="font-serif italic text-accent capitalize">Communications</span>
            </h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {supports.map((sup, idx) => {
              const CardContent = (
                <>
                  <div className="w-10 h-10 rounded-full bg-accent/5 text-accent flex items-center justify-center mx-auto group-hover:bg-accent/10 transition-colors">
                    {sup.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-primary uppercase">
                    {sup.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-light leading-relaxed max-w-xs mx-auto">
                    {sup.desc}
                  </p>
                  <div className="pt-2 font-semibold font-mono text-xs text-primary group-hover:text-accent transition-colors">
                    {sup.action}
                  </div>
                </>
              );

              if (sup.href) {
                return (
                  <a
                    key={idx}
                    href={sup.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-8 border border-slate-100 rounded-xl shadow-md text-center space-y-4 hover:border-accent/40 hover:shadow-lg transition-all duration-300 block group"
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <div key={idx} className="bg-white p-8 border border-slate-100 rounded-xl shadow-md text-center space-y-4 hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
