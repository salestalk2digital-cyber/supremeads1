import HowWeWork from '../components/HowWeWork';
import Testimonials from '../components/Testimonials';
import { Shield, Sparkles, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const brandMetrics = [
    { value: 'Since 2018', label: 'Agency Heritage', desc: 'Crafting elite advertising formulas.' },
    { value: '₹120 Crore+', label: 'Total Tracked Spend', desc: 'Managed across global networks.' },
    { value: '840+', label: 'Campaigns Optimized', desc: 'Through extreme margin precision.' },
    { value: '42', label: 'Served Verticals', desc: 'With customized source mapping.' }
  ];

  const values = [
    {
      icon: <Shield size={20} className="text-accent" />,
      title: 'Architectural Transparency',
      desc: 'No vanity clicks, no hidden metrics. We link every single rupee back to verified pipeline sales, CRM logs, and live margin audits.'
    },
    {
      icon: <Sparkles size={20} className="text-accent" />,
      title: 'Algorithmic Concentration',
      desc: 'We do not run simple social media posts or offline flyer flyers. We concentrate with obsessive focus purely on the Meta Ads environment.'
    },
    {
      icon: <Award size={20} className="text-accent" />,
      title: 'Creative Intensity',
      desc: 'Static images get ignored. We implement a systematic Creative Testing Protocol built to discover cinematic, scroll-stopping hooks.'
    },
    {
      icon: <TrendingUp size={20} className="text-accent" />,
      title: 'Unit Economics first',
      desc: 'We verify your profit margins, target acquisition costs, LTV, and conversion capabilities to make sure scaling ad budgets generates pure cashflow.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Agency Genesis
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            ABOUT <span className="font-serif italic text-accent capitalize">SUPREME ADS</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Brand Hero Narrative */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
              The Performance Formula
            </span>
            <h2 className="font-heading font-semibold text-2xl md:text-3xl uppercase tracking-tight text-primary leading-tight">
              We Don&apos;t Chase Eyeballs. <br />
              We Capture <span className="font-serif italic text-accent font-light lowercase">market share.</span>
            </h2>
            <div className="w-12 h-1 bg-accent" />
            <p className="text-slate-800 font-sans text-sm md:text-base leading-relaxed">
              Founded in 2018, Supreme Ads was engineered to solve a critical market crisis: premium brands burning millions of dollars on abstract digital marketing agencies who look at clicks instead of customer economic models.
            </p>
            <p className="text-slate-800 font-sans text-sm md:text-base leading-relaxed">
              We restructured the framework. We built a hyper-specialized team of Meta Ads architects, graphic directors, copy specialists, and Conversion API backend developers. We combined this with direct mathematical modeling to turn digital traffic into verified growth assets.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            {brandMetrics.map((met, idx) => (
              <div key={idx} className="border border-slate-100 p-6 shadow-md bg-slate-50/50 hover:border-accent/40 transition-all duration-300">
                <div className="text-3xl font-heading font-bold text-primary mb-1">
                  {met.value}
                </div>
                <div className="text-[10px] uppercase font-heading font-semibold text-accent tracking-widest mb-2">
                  {met.label}
                </div>
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  {met.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Operational Protocol */}
      <HowWeWork />

      {/* Core Sovereign Values */}
      <section className="py-24 bg-slate-50/70 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
              Our Sovereign Ideology
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter text-primary">
              Core Agency <span className="font-serif italic text-accent capitalize">Values</span>
            </h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100 rounded-xl shadow-lg relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="font-heading font-semibold text-sm text-primary mb-3">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Voice Testimonials */}
      <Testimonials />
    </div>
  );
}
