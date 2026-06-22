import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import ClientMarquee from '../components/ClientMarquee';
import { whyChooseUs } from '../data';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { caseStudies } = useCMS();
  // Take first 3 reasons for a home spotlight
  const homeReasons = whyChooseUs.slice(0, 3);
  // Take first case study as home highlight
  const featuredStudy = caseStudies[0] || {
    id: 'cs1',
    industry: 'Real Estate Developer',
    title: 'Acquiring Verified High-Net-Worth Residential Leads',
    campaignObjective: 'Qualified Lead Generation for Luxury Penthouses',
    adSpend: '₹20,00,000',
    qualifiedLeads: '512 (HNW buyers)',
    costPerLead: '₹3,900',
    roas: '10.8x (Attributed)',
    challenge: 'Targeting true high-net-worth buyers in an overcrowded urban market without wasting budget on speculative clickers.',
    solution: 'Designed and deployed a multi-stage Meta Ads funnel.',
    results: [],
    image: '/case-studies/real_estate.jpg'
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero 
        onExploreClick={() => onNavigate('#industries')} 
        onBookCallClick={() => onNavigate('#contact')} 
      />

      {/* Metrics Banner */}
      <Metrics />

      {/* Clients partner line */}
      <ClientMarquee />

      {/* Dynamic Services / Blueprint Spotlight teaser */}
      <section className="py-24 bg-[#F8FAFC] border-t border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
                SPECIALIST CAPABILITIES
              </span>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-none">
                Bespoke <br />
                <span className="font-serif italic text-accent capitalize">Meta Strategies</span>
              </h2>
              <p className="text-slate-600 font-sans text-sm leading-relaxed max-w-sm">
                We design highly granular customer acquisition frameworks. Here is a snapshot of our high-performance protocol built for premium businesses.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('#services')}
                  className="group inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-heading font-semibold text-xs tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
                >
                  View All 10 Services
                  <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {homeReasons.map((reason, idx) => (
                <div key={idx} className="bg-white p-6 border border-slate-100 shadow-md group hover:border-accent/45 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent font-heading font-bold text-xs flex items-center justify-center mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-primary mb-2 line-clamp-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study Highlight */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
              PERFORMANCE SNAPSHOT
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter text-primary">
              FEATURED <span className="font-serif italic text-accent capitalize">SUCCESS</span> STORY
            </h2>
            <div className="w-12 h-[2px] bg-accent mx-auto" />
          </div>

          <div className="bg-[#0F172A] text-white p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="lg:col-span-12 flex justify-between items-center border-b border-slate-800 pb-6 mb-2">
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase">
                {featuredStudy.industry}
              </span>
              <div className="flex gap-4 text-xs font-mono text-slate-400">
                <span>Spend <strong className="text-white">{featuredStudy.adSpend}</strong></span>
                <span>ROAS <strong className="text-accent">{featuredStudy.roas}</strong></span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-heading font-semibold text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {featuredStudy.title}
              </h3>
              
              <div className="space-y-3 text-sm text-slate-300 font-light max-w-xl">
                <p>
                  <strong className="text-white font-medium">Objective:</strong> {featuredStudy.campaignObjective}
                </p>
                <p>
                  <strong className="text-white font-medium">Challenge:</strong> {featuredStudy.challenge}
                </p>
                <p>
                  <strong className="text-white font-medium">Strategy:</strong> {featuredStudy.solution}
                </p>
              </div>

              <div className="flex pt-4">
                <button
                  onClick={() => onNavigate('#case-studies')}
                  className="bg-accent hover:bg-accent-dark text-primary font-heading font-semibold text-xs tracking-[0.2em] px-6 py-3.5 uppercase transition-all duration-300 flex items-center gap-2"
                >
                  View Full Report Archive
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold block">
                AUDITED Campaign Metrics
              </span>
              <div className="space-y-3">
                {featuredStudy.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed font-light">{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <span className="text-xs font-heading font-bold text-accent tracking-[0.3em] uppercase block">
            SECURE ADVERTISING SUPERIORITY
          </span>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Ready to scale true <br />
            <span className="font-serif italic text-accent lowercase tracking-normal">margin revenue?</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            Book an live interactive audit presentation with our master Meta layout architects.
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => onNavigate('#contact')}
              className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-[0.2em] px-10 py-5 uppercase transition-all duration-300 shadow-xl"
            >
              Book Strategy Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
