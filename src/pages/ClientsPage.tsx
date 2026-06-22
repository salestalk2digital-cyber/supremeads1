import { useCMS } from '../context/CMSContext';
import { ShieldCheck, CalendarRange, Medal, Layers } from 'lucide-react';

export default function ClientsPage() {
  const { clientLogos } = useCMS();
  const certifications = [
    {
      icon: <Layers size={20} className="text-accent" />,
      title: 'Meta Partner Badge',
      desc: 'Certified architectural deployment partner leveraging API clusters.'
    },
    {
      icon: <ShieldCheck size={20} className="text-accent" />,
      title: 'Conversion API Integration',
      desc: 'Validated secure matching engine with cookieless tracking loops.'
    },
    {
      icon: <Medal size={20} className="text-accent" />,
      title: 'A/B Testing Standard',
      desc: 'Statistical confidence scoring for high-velocity copy variants.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Corporate Validations &amp; Portfolios
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            CLIENT <span className="font-serif italic text-accent capitalize">PORTFOLIO</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Main Brands Directory section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
            Brand Records Ledger
          </span>
          <h2 className="font-heading font-semibold text-2xl md:text-3xl uppercase tracking-tight text-primary">
            Trusted by Leaders <span className="font-serif italic text-accent font-light capitalize">Globally</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clientLogos.map((client) => (
            <div
              key={client.id}
              className="group bg-[#F8FAFC] border border-slate-100 p-8 rounded-xl flex flex-col justify-center items-center h-40 shadow-sm relative overflow-hidden hover:border-accent/40 hover:bg-white transition-all duration-300"
            >
              {/* Luxury gold hover accent card lines */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-accent/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Since we don't have true logo images on disk, we render an elegant monogram / abstract vector representation */}
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-heading font-bold text-xs tracking-tighter group-hover:bg-accent/10 group-hover:text-accent transition-colors mb-3">
                {client.name.substring(0, 2).toUpperCase()}
              </div>

              <span className="font-heading font-semibold text-xs text-primary tracking-widest text-center select-none uppercase line-clamp-1">
                {client.name}
              </span>
              <span className="text-[9px] text-[#C89B3C] font-mono tracking-wider font-semibold block mt-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Scale secure &bull; Active
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Authority certifications */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
                Partner Authority Standard
              </span>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter text-primary leading-none">
                OUR platform <br />
                <span className="font-serif italic text-accent capitalize">Credentials</span>
              </h2>
              <p className="text-slate-600 font-sans text-xs md:text-sm leading-relaxed max-w-sm">
                We maintain active platform certifications and standard compliance audits to preserve high level pixel tracking capabilities.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-white p-6 border border-slate-100 rounded-xl shadow-md space-y-3 hover:border-accent/40 transition-colors duration-300">
                  <div className="w-9 h-9 bg-accent/10 flex items-center justify-center">
                    {cert.icon}
                  </div>
                  <h4 className="font-heading font-semibold text-[13px] text-primary uppercase">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans font-light leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
