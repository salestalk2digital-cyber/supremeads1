import { useState } from 'react';
import { whyChooseUs } from '../data';
import { Sparkles, BarChart3, TrendingUp, Cpu, Settings } from 'lucide-react';

export default function ServicesPage() {
  const [budget, setBudget] = useState(250000);
  const [vertical, setVertical] = useState('realestate');

  // Interactive forecast logic
  const getForecast = () => {
    let cpm = 150; // Cost per 1000 views in ₹
    let ctr = 0.015; // Click-through rate
    let convRate = 0.04; // Conversion rate
    let averageROAS = '8.0x - 12.0x';
    let label = 'Leads';

    switch (vertical) {
      case 'realestate':
        cpm = 180;
        ctr = 0.012;
        convRate = 0.025;
        averageROAS = '8.0x - 12.0x';
        label = 'Verified HNW Calls';
        break;
      case 'luxury_b2c':
        cpm = 100;
        ctr = 0.022;
        convRate = 0.035;
        averageROAS = '7.5x - 11.5x';
        label = 'Direct Purchases';
        break;
      case 'b2b':
        cpm = 220;
        ctr = 0.011;
        convRate = 0.018;
        averageROAS = '6.0x - 10.0x';
        label = 'Regional Buyers';
        break;
      case 'automobile':
        cpm = 130;
        ctr = 0.016;
        convRate = 0.05; // WhatsApp funnel lead capture rate is very high
        averageROAS = '8.0x - 11.0x';
        label = 'Direct Bookings';
        break;
      default:
        break;
    }

    const impressions = Math.floor((budget / cpm) * 1000);
    const clicks = Math.floor(impressions * ctr);
    const conversions = Math.floor(clicks * convRate);
    const costPerAcquisition = conversions > 0 ? Math.round(budget / conversions).toLocaleString() : '0';

    return {
      impressions: impressions.toLocaleString(),
      clicks: clicks.toLocaleString(),
      conversions: conversions.toLocaleString(),
      costPerAcquisition,
      averageROAS,
      label
    };
  };

  const fb = getForecast();

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Algorithmic Engineering
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            SPECIALIST <span className="font-serif italic text-accent capitalize">SERVICES</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Services List Grids */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
            End-To-End Deliverables
          </span>
          <h2 className="font-heading font-semibold text-2xl md:text-3xl uppercase tracking-tight text-primary">
            Our 10 Core Meta Performance <span className="font-serif italic text-accent font-light capitalize">Frameworks</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 p-8 shadow-md hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-0 bg-accent group-hover:h-full transition-all duration-300" />
              <div className="text-3xl font-heading font-bold text-slate-100 group-hover:text-accent/10 transition-colors mb-4 block">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <h3 className="font-heading font-semibold text-base text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-sans font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Campaign Forecast Projection Suite */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-b border-primary/20">
        <div className="absolute inset-0 opacity-5 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-heading font-bold text-accent tracking-[0.25em] uppercase block">
              COMPETITIVE FORECAST MODELLING
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter">
              METRIC <span className="font-serif italic text-accent lowercase">strategic planner</span>
            </h2>
            <p className="text-slate-400 font-sans text-xs max-w-sm mx-auto leading-relaxed">
              Calculate Meta algorithm estimates based on typical target CPC/CPM baselines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Input Panel */}
            <div className="lg:col-span-5 bg-slate-950 p-8 border border-slate-800 rounded-2xl space-y-8">
              <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block border-b border-slate-800 pb-3">
                Input Parameters
              </span>

              {/* Monthly Budget Selector */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs uppercase tracking-wider font-semibold">
                  <span className="font-heading">Monthly Ad Spend</span>
                  <span className="text-accent font-mono">₹{budget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-accent h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹50,000 min</span>
                  <span>₹10,00,000 max</span>
                </div>
              </div>

              {/* Business Specialty Group */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-semibold block font-heading">
                  Served Verticals
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVertical('realestate')}
                    className={`py-3 px-4 text-xs font-heading border text-center transition-all ${
                      vertical === 'realestate'
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Real Estate
                  </button>
                  <button
                    onClick={() => setVertical('luxury_b2c')}
                    className={`py-3 px-4 text-xs font-heading border text-center transition-all ${
                      vertical === 'luxury_b2c'
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Luxury Retail
                  </button>
                  <button
                    onClick={() => setVertical('b2b')}
                    className={`py-3 px-4 text-xs font-heading border text-center transition-all ${
                      vertical === 'b2b'
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    B2B Industrial
                  </button>
                  <button
                    onClick={() => setVertical('automobile')}
                    className={`py-3 px-4 text-xs font-heading border text-center transition-all ${
                      vertical === 'automobile'
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Automotive DET
                  </button>
                </div>
              </div>
            </div>

            {/* Response Preview Panel */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
              <div className="md:col-span-2 flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-[10px] uppercase font-semibold text-[#C89B3C] tracking-widest block">
                  Algorithmic Delivery Forecast
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">*Ad pricing fluctuates hourly</span>
              </div>

              {/* Grid block metrics */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Meta Impressions</span>
                <div className="text-3xl font-heading font-bold text-white tracking-tight">{fb.impressions}</div>
                <p className="text-[10px] text-slate-450 font-light">Est. total creative exposures per month.</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Ad Click volume</span>
                <div className="text-3xl font-heading font-bold text-white tracking-tight">{fb.clicks}</div>
                <p className="text-[10px] text-slate-450 font-light">Calculated using typical platform CTR vectors.</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Qualified {fb.label}</span>
                <div className="text-3xl font-heading font-bold text-accent tracking-tight">{fb.conversions}</div>
                <p className="text-[10px] text-slate-450 font-light">Projected conversion responses booked.</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Target CPA (Est.)</span>
                <div className="text-3xl font-heading font-bold text-white tracking-tight">₹{fb.costPerAcquisition}</div>
                <p className="text-[10px] text-slate-450 font-light">Target customer acquisition budget cap.</p>
              </div>

              <div className="md:col-span-2 bg-slate-950 p-4 border border-zinc-800 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase font-semibold block">PROJECTED PERFORMANCE INDEX</span>
                  <span className="text-base font-heading font-bold text-[#C89B3C]">{fb.averageROAS} ROAS Range</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
