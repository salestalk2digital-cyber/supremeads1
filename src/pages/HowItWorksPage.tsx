import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Target, Zap, CheckCircle2, AlertCircle, ArrowRight, Layers, BarChart } from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'platform' | 'supreme'>('platform');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const metaSteps = [
    {
      id: 1,
      title: 'TRACKING SETUP & WEBSITE ANALYSIS',
      tech: 'STEP 01',
      desc: (
        <div className="space-y-3">
          <p className="text-xs text-slate-800 leading-relaxed">
            Before running advertisements, we make sure proper tracking is in place. This helps us understand what visitors do after clicking your advertisement.
          </p>
          <div className="space-y-1 pl-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">For businesses with websites, we can assist with:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 font-sans list-disc list-inside">
              <li>Meta Pixel setup</li>
              <li>Conversions API guidance</li>
              <li>Lead form tracking</li>
              <li>Add to cart tracking</li>
              <li>Purchase tracking</li>
              <li>WhatsApp click tracking</li>
            </ul>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed">
            This data helps Meta understand who is genuinely interested in your business and improves campaign performance over time.
          </p>
        </div>
      ),
      status: 'Tracking Integration'
    },
    {
      id: 2,
      title: 'AUDIENCE RESEARCH & TARGETING',
      tech: 'STEP 02',
      desc: (
        <div className="space-y-3">
          <p className="text-xs text-slate-800 leading-relaxed">
            Showing advertisements to everyone rarely works. We focus on finding people who are more likely to become customers.
          </p>
          <div className="space-y-1 pl-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">Audience research may include:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 font-sans list-disc list-inside">
              <li>Age groups</li>
              <li>Locations</li>
              <li>Occupation</li>
              <li>Income profile</li>
              <li>Interests</li>
              <li>Buying behaviour</li>
              <li>Lifestyle preferences</li>
            </ul>
          </div>
          <div className="space-y-1 pl-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">We also create:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 font-sans list-disc list-inside">
              <li>Customer based audiences</li>
              <li>Similar audiences</li>
              <li>Retargeting campaigns</li>
              <li>Instagram engagement audiences</li>
              <li>Website visitor audiences</li>
            </ul>
          </div>
        </div>
      ),
      status: 'Audience Definition'
    },
    {
      id: 3,
      title: 'CREATIVE GUIDANCE',
      tech: 'STEP 03',
      desc: (
        <div className="space-y-3">
          <p className="text-xs text-slate-800 leading-relaxed">
            Good creatives are one of the biggest reasons Meta campaigns succeed. Many businesses use photos or videos that do not attract attention. We help clients understand what type of content works best.
          </p>
          <div className="space-y-1 pl-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">Suggested creatives include:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 font-sans list-disc list-inside">
              <li>Product showcase videos</li>
              <li>Property walkthrough videos</li>
              <li>Customer testimonial videos</li>
              <li>Before and after transformations</li>
              <li>Reel concepts</li>
              <li>Festival campaign creatives</li>
              <li>Limited period offers</li>
              <li>Founder introduction videos</li>
            </ul>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed">
            The goal is simple: capture attention quickly and encourage customers to take action.
          </p>
        </div>
      ),
      status: 'Creative Strategy'
    },
    {
      id: 4,
      title: 'ECOMMERCE GROWTH SUPPORT',
      tech: 'STEP 04',
      desc: (
        <div className="space-y-3">
          <p className="text-xs text-slate-800 leading-relaxed">
            For ecommerce businesses, getting orders is only part of the journey. Efficient operations are equally important.
          </p>
          <div className="space-y-1 pl-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">Businesses working with Supreme Ads may also receive guidance on:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 font-sans list-disc list-inside">
              <li>Cash on Delivery confirmation process</li>
              <li>Reducing fake orders</li>
              <li>Shipping workflow suggestions</li>
              <li>Courier partner recommendations</li>
              <li>Order management practices</li>
              <li>Customer communication process</li>
            </ul>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            This helps ecommerce brands improve customer experience and reduce operational losses.
          </p>
        </div>
      ),
      status: 'Operations Support'
    }
  ];

  const supremeVantages = [
    {
      title: 'Ecommerce Operations Support',
      desc: 'We offer strategic operational advice. We guide your team on order management workflows, RTO reduction, and courier setups to sustain long-term retail growth.',
      metric: 'Operations Guidance'
    },
    {
      title: 'Product Analysis & Competitor Study',
      desc: 'We analyze your service strengths, pricing, locations, and competitor campaigns before launching to define high-performing customer acquisition pathways.',
      metric: 'Deep Analysis'
    },
    {
      title: 'Audience Targeting Guidance',
      desc: 'We identify customers most likely to purchase by income profile, interests, lifestyle and buying behaviour to maximize overall returns on your ad investment.',
      metric: 'Audience Targeting'
    },
    {
      title: 'Growth Consultation Included',
      desc: 'Onboarding with Supreme Ads includes complimentary strategy sessions on cash-on-delivery workflows, delivery setups, and digital growth practices.',
      metric: 'Growth Consultation'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            HOW META ADS WORK
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
            HOW META ADS WORK
          </span>
          <h2 className="font-heading font-semibold text-2xl md:text-4xl uppercase tracking-tight text-primary leading-tight">
            How Supreme Ads Helps Businesses Get Better Customers Through Meta Advertising
          </h2>
          <div className="text-slate-800 font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto space-y-4 pt-2">
            <p>
              Meta Ads on Facebook and Instagram can help businesses reach people who are genuinely interested in their products or services.
            </p>
            <p>
              However, running advertisements without proper research often leads to wasted budget and poor-quality enquiries.
            </p>
            <p>
              At Supreme Ads, we follow a step-by-step process to help businesses attract the right audience, improve lead quality and grow consistently.
            </p>
          </div>
          
          <div className="flex border border-slate-200 rounded-lg overflow-hidden max-w-md mx-auto mt-10 bg-slate-50 shadow-md">
            <button
              onClick={() => setActiveTab('platform')}
              className={`flex-1 py-4 text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'platform'
                  ? 'bg-primary text-white'
                  : 'text-slate-700 hover:text-primary bg-white'
              }`}
            >
              How Meta Ads Work
            </button>
            <button
              onClick={() => setActiveTab('supreme')}
              className={`flex-1 py-4 text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'supreme'
                  ? 'bg-primary text-white'
                  : 'text-slate-700 hover:text-primary bg-white'
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
                  <span className="text-[10px] uppercase font-bold text-accent tracking-widest block">Core Process</span>
                  <h3 className="text-xl font-heading font-semibold text-primary uppercase mt-1">
                    Our Step-by-Step Meta Methodology
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
                          
                          <div className="space-y-2 flex-1">
                            <span className="text-[9px] font-mono font-bold text-accent tracking-widest uppercase block">
                              {step.tech}
                            </span>
                            <h4 className="font-heading font-semibold text-sm text-primary uppercase tracking-tight">
                              {step.title}
                            </h4>
                            <div className="text-xs text-slate-800 font-sans leading-relaxed">
                              {step.desc}
                            </div>
                            
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
                    Professional <br />
                    <span className="font-serif italic text-accent capitalize">Growth Support</span>
                  </h3>
                  <div className="w-12 h-1 bg-accent" />
                </div>

                <p className="text-slate-800 font-sans text-sm leading-relaxed">
                  Most agencies set up basic budgets, dump standard stock graphics, and check the dashboard once a month. We operate with structural intensity and clear strategic preparation.
                </p>

                <p className="text-slate-800 font-sans text-sm leading-relaxed">
                  We integrate complete pixel configurations, guide creative conceptualization, and manage campaigns dynamically. On top of standard performance tracking, ecommerce clients receive dedicated support on fulfillment, COD verification, and order processing setups.
                </p>

                <div className="bg-slate-50 p-5 border border-slate-100 rounded-xl flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <BarChart className="text-accent" size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block font-heading">E-COMMERCE GROWTH</span>
                    <span className="text-base font-bold text-primary">Strategic Logistics &amp; COD Support</span>
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
                    <p className="text-xs text-slate-700 font-sans leading-relaxed">
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
              <p className="text-slate-800 font-sans text-xs md:text-sm leading-relaxed max-w-lg">
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
            SUPREME ADS
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter leading-none">
            TURN CLICKS <br />
            <span className="font-serif italic text-accent capitalize">INTO CUSTOMERS</span>
          </h2>
          <p className="font-sans text-gray-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Meta Advertising works best when the right audience sees the right message at the right time. At Supreme Ads, we combine audience research, competitor analysis, creative suggestions and campaign optimization to help businesses attract better enquiries and grow with confidence.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-block bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-[0.2em] px-8 py-4 uppercase transition-colors"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
