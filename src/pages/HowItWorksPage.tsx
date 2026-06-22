import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Target, Zap, CheckCircle2, AlertCircle, ArrowRight, Layers, BarChart } from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'platform' | 'supreme'>('platform');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const metaSteps = [
    {
      id: 1,
      title: 'Pixel & Server API Interlocking',
      tech: 'META CONVERSIONS API (CAPI)',
      desc: 'When a buyer clicks your ad, Meta registers browser cookie hashes. If a browser blocks cookies, our custom Server-Side CAPI matches the phone/email hashes directly, securing 100% server tracking.',
      status: 'Continuous Monitoring Active'
    },
    {
      id: 2,
      title: 'Estimated Action Rate Evaluation',
      tech: 'THE MACHINE LEARNING AUCTION',
      desc: 'Meta does not sell impressions to the highest bidder. Its auction engine scores your ad based on (Bid Price × Estimated Action Rate + User Experience Value). If we optimize real conversions, Meta rewards us with cheap placement.',
      status: 'Algorithmic Optimization'
    },
    {
      id: 3,
      title: 'Audience Cohort Clustering',
      tech: 'DEMOGRAPHIC VECTOR MAPPING',
      desc: 'The algorithm groups millions of profiles into micro-segmented cohorts. By running specialized lookalikes of your primary buyers, we feed the AI machine exact vectors of what your gold-standard customer looks like.',
      status: 'High Confidence Match'
    },
    {
      id: 4,
      title: 'Creative Feed Saturation Match',
      tech: 'SCROLL-STOPPING VISUAL MATCHING',
      desc: 'Meta evaluates user retention within the first 2 seconds of exposure. Ads with cinematic visual pacing get prioritized, decreasing overall client acquisition cost.',
      status: 'Creative Core Priority'
    }
  ];

  const supremeVantages = [
    {
      title: 'Obsessive Focus on Pure Net Margin',
      desc: 'Most agencies scream about useless "impressions." We sync with your product profit margins, local delivery costs, and checkout conversion rates to build a campaign that fuels your true net profit first.',
      metric: 'Profitability Priority'
    },
    {
      title: '10x ROAS Systematic Playbook',
      desc: 'We do not gamble. We deploy high-velocity creative testing matrices across hundreds of variations, tracking which specific hooks hook high-intent buyers, scaling only the premium winners.',
      metric: '10x Guarantee Focus'
    },
    {
      title: 'Server CAPI Custom Scripting',
      desc: 'We bypass iOS tracking limits by building direct private server matching scripts. This provides 30% to 40% cleaner conversion data to Meta, reducing cost-per-lead immediately.',
      metric: 'Zero Cookie Leakage'
    },
    {
      title: 'Rapid Creative Evolution Studio',
      desc: 'Static image layouts fatigue within 10 days. Our master designers and cinematic copy directors produce constant visual iterations, keeping your active CPA stable for months.',
      metric: 'Anti-Creative Fatigue'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Algorithmic Breakdown &amp; Strategy
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            HOW META ADS <span className="font-serif italic text-accent capitalize">WORK</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Main interactive Tab Switchers */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
            Systematic Transparency
          </span>
          <h2 className="font-heading font-semibold text-2xl md:text-3xl uppercase tracking-tight text-primary">
            Demystifying the Code Behind <span className="font-serif italic text-accent font-light capitalize">Premium Performance</span>
          </h2>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden max-w-md mx-auto mt-8 bg-slate-50 shadow-md">
            <button
              onClick={() => setActiveTab('platform')}
              className={`flex-1 py-4 text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'platform'
                  ? 'bg-primary text-white'
                  : 'text-slate-500 hover:text-primary bg-white'
              }`}
            >
              How Meta Ads Work
            </button>
            <button
              onClick={() => setActiveTab('supreme')}
              className={`flex-1 py-4 text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'supreme'
                  ? 'bg-primary text-white'
                  : 'text-slate-500 hover:text-primary bg-white'
              }`}
            >
              Why Supreme Wins
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'platform' ? (
            <motion.div
              key="platform-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Timeline Flow list column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-bold text-accent tracking-widest block">System Diagnostics</span>
                  <h3 className="text-xl font-heading font-semibold text-primary uppercase mt-1">
                    The 4 Pillars of the Meta Algorithm
                  </h3>
                </div>

                <div className="space-y-4">
                  {metaSteps.map((step, index) => {
                    const isHovered = hoveredStep === index;
                    return (
                      <div
                        key={step.id}
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                        className={`border p-6 shadow-sm transition-all duration-300 relative rounded-xl ${
                          isHovered 
                            ? 'border-accent/40 bg-slate-50/50' 
                            : 'border-slate-100 bg-white'
                        }`}
                      >
                        {/* Vertical timeline numbering dot lines */}
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-semibold text-xs tracking-tighter shrink-0 ${
                            isHovered ? 'bg-accent text-primary' : 'bg-slate-100 text-slate-500'
                          }`}>
                            0{step.id}
                          </div>
                          
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono font-bold text-accent tracking-widest uppercase block">
                              {step.tech}
                            </span>
                            <h4 className="font-heading font-semibold text-sm text-primary uppercase tracking-tight">
                              {step.title}
                            </h4>
                            <p className="text-xs text-slate-600 font-sans leading-relaxed font-light">
                              {step.desc}
                            </p>
                            
                            <div className="pt-2 flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-semibold text-emerald-600 uppercase">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              {step.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Blueprint Interactive Simulator */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl border border-primary/20 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                  <Cpu className="text-accent" size={18} />
                  <span className="text-xs uppercase tracking-widest font-heading font-semibold text-accent">
                    Platform Delivery Vector
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-semibold text-sm text-white">
                    The Meta Ad Auction Formula:
                  </h4>
                  <div className="bg-slate-950 p-6 border border-slate-800 rounded-lg text-center relative overflow-hidden">
                    <div className="text-lg font-mono font-bold text-accent tracking-tight">
                      Total Bid Score = V × CTR + UV
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono tracking-widest mt-2 block uppercase">
                      V: Advertiser Bid &bull; CTR: Action Rate &bull; UV: User Value
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
                    Meta doesn&apos;t just favor the largest budget. If our strategic creative assets produce high-velocity click action rates (CTR) and positive feedback (UV), Meta rewards the campaign with first-tier bid rankings at a major discount.
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest block font-heading">
                    Algorithmic Efficiency Metrics
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 border border-slate-805 rounded-lg">
                      <span className="text-[8px] text-slate-450 uppercase block">Typical Ad Waste</span>
                      <span className="text-base font-bold text-rose-500 tracking-tight">30% - 40%</span>
                    </div>
                    <div className="bg-slate-955 p-4 border border-slate-805 rounded-lg">
                      <span className="text-[8px] text-accent font-semibold uppercase block">With Server CAPI</span>
                      <span className="text-base font-bold text-accent tracking-tight">Less than 2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="supreme-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Detailed Explanation on Supreme results */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
                    Securing Outstanding Outcomes
                  </span>
                  <h3 className="font-heading font-semibold text-3xl uppercase tracking-tighter text-primary leading-tight">
                    How We Guarantee <br />
                    <span className="font-serif italic text-accent capitalize">10x ROAS Capabilities</span>
                  </h3>
                  <div className="w-12 h-1 bg-accent" />
                </div>

                <p className="text-slate-600 font-sans text-sm leading-relaxed font-light">
                  Most agencies set up basic budgets, dump standard stock graphics, and check the dashboard once a month. We operate with structural intensity.
                </p>

                <p className="text-slate-600 font-sans text-sm leading-relaxed font-light">
                  We run deep-domain pixel mapping. We write server scripts. We record high-production user reviews. And we manage your ad spend with immediate live analytics reports that pull verified cash sales, not speculative clicks.
                </p>

                <div className="bg-slate-50 p-5 border border-slate-100 rounded-xl flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <BarChart className="text-accent" size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block font-heading">AVERAGE CAMPAIGN ROAS</span>
                    <span className="text-base font-bold text-primary">10x Scale Target Achieved</span>
                  </div>
                </div>
              </div>

              {/* Split metrics panel */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                {supremeVantages.map((van, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-8 shadow-lg hover:border-accent/40 transition-colors duration-300 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 h-1.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-accent block mb-2">
                      {van.metric}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-primary mb-3">
                      {van.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans font-light leading-relaxed">
                      {van.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Meta Ads diagnostic check list */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.2em] uppercase block">
                Algorithm Diagnostic
              </span>
              <h2 className="font-heading font-semibold text-2xl md:text-3xl uppercase tracking-tight text-primary leading-tight">
                Is your active ad spend <br />
                <span className="font-serif italic text-accent capitalize">leaking capital?</span>
              </h2>
              <p className="text-slate-600 font-sans text-xs md:text-sm leading-relaxed max-w-lg font-light">
                Check if your contemporary system suffers from algorithmic friction under these standard performance checkpoints. If any of these are unoptimized, your active ROAS drops significantly.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white p-8 border border-slate-100 shadow-xl space-y-4">
              <div className="flex gap-3 items-start border-b border-slate-100 pb-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-xs font-heading font-semibold text-primary block">NO ACTIVE SERVER CONVERSIONS API (CAPI)</span>
                  <p className="text-[10px] text-slate-450 font-sans">Meta loses up to 30% of actual sales signals due to Apple iOS 14+ or Safari tracking cuts.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start border-b border-slate-100 pb-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-xs font-heading font-semibold text-primary block">CREATIVE REPETITION FATIGUE</span>
                  <p className="text-[10px] text-slate-450 font-sans">Serving identical image assets for more than 14 days causes CPM pricing to skyrocket instantly.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-xs font-heading font-semibold text-primary block">LACK OF REVENUE-LED PIXEL DATAFEED</span>
                  <p className="text-[10px] text-slate-450 font-sans">Feeding Meta general "traffic clicks" instead of verified order margins makes the algorithm purchase cheap, low-intent catalog views.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instant schedule strategy call CTA */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.3em] uppercase block">
            Begin Absolute Scaling
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter leading-none">
            Scale with elite <br />
            <span className="font-serif italic text-accent capitalize">Ad Architects</span>
          </h2>
          <p className="font-sans text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Get a live visual breakdown of your active pixel health and learn how our 10x ROAS blueprint fits your product.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-block bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-[0.2em] px-8 py-4 uppercase transition-colors"
            >
              Book Strategy Audit Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
