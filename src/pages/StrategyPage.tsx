import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Layers, 
  Flame, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  Target, 
  PhoneCall, 
  DollarSign,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface StrategyState {
  businessCategory: string;
  orderValue: string;
  adSpend: string;
  targetCpl: string;
  salesObjective: string;
  targetAvatar: string;
}

export default function StrategyPage() {
  const [formData, setFormData] = useState<StrategyState>({
    businessCategory: 'Real Estate',
    orderValue: '',
    adSpend: '100000',
    targetCpl: '250',
    salesObjective: 'Generate Verified Phone Contacts',
    targetAvatar: '',
  });

  const [blueprint, setBlueprint] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const primaryObjectives = [
    { value: 'Generate Verified Phone Contacts', label: 'Verified Phone Contacts (Fastest follow-up)' },
    { value: 'Book Qualified Calendar Consultations', label: 'Scheduled Calendar Consultations (Bespoke sales calls)' },
    { value: 'Automate Direct WhatsApp Enquiries', label: 'Direct WhatsApp Enquiries (High engagement chat)' },
    { value: 'Acquire Long-Form Email Enquiries', label: 'Long-Form Enquiries (For high-ticket products)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Parse adSpend and targetCpl safely with absolutely no caps, mins, or maxes
      const parsedSpend = parseFloat(formData.adSpend.replace(/[^0-9.]/g, '')) || 50000;
      const parsedCpl = parseFloat(formData.targetCpl.replace(/[^0-9.]/g, '')) || 250;
      
      const expectedLeadsCount = Math.round(parsedSpend / parsedCpl);
      const minLeads = Math.max(1, Math.round(expectedLeadsCount * 0.85));
      const maxLeads = Math.max(2, Math.round(expectedLeadsCount * 1.15));

      let campaignStructure = '1 CBO (Campaign Budget Optimization) with 2 Ad Sets targeting Broad Interests and Lookalikes.';
      let customConversions = 'Meta Instant Form Lead Event + Conversions CAPI backup';
      let recommendedCreativeStrategy = '2x Hook-to-Problem static sheets, 2x video walk-through, 1x customer social proof reel.';

      const categoryLower = formData.businessCategory.toLowerCase();
      if (categoryLower.includes('estate') || categoryLower.includes('property')) {
        campaignStructure = 'ABO Testing Campaign targeting specific pin-codes combined with a high-intent custom questionnaire to qualify buyers.';
        customConversions = 'Instant Form Pre-Qualifying CRM trigger';
        recommendedCreativeStrategy = 'Cinematic drone teaser, WhatsApp chat hook, client reference layout static grid.';
      } else if (categoryLower.includes('event') || categoryLower.includes('wedding')) {
        campaignStructure = 'Visual Portfolio CBO Campaign retargeting past site visitors with bespoke luxury celebration proofs.';
        customConversions = 'Custom Lead Event synced with WhatsApp CRM';
        recommendedCreativeStrategy = 'Breathtaking 15-sec destination teaser reel, client emotional response review, visual carousel.';
      } else if (categoryLower.includes('theater') || categoryLower.includes('cinema')) {
        campaignStructure = 'Automated WhatsApp Chatbot Campaign coupled with local engagement lookalike audiences.';
        customConversions = 'WhatsApp booking initiation CAPI track';
        recommendedCreativeStrategy = 'Immersive acoustic room walk-through, VIP booking offer carousel, client experience reels.';
      } else if (categoryLower.includes('boutique') || categoryLower.includes('fashion') || categoryLower.includes('wear') || categoryLower.includes('brand')) {
        campaignStructure = 'Meta Advantage+ Shopping Campaign (ASC) utilizing catalog feeds and dynamic creative optimization (DCO).';
        customConversions = 'Purchase Conversions API standard event';
        recommendedCreativeStrategy = 'High-end fabric texture macro shots, boutique aesthetic tour, styled outfit transitions.';
      }

      setBlueprint({
        estimatedCPL: `₹${parsedCpl}`,
        volume: `${minLeads} - ${maxLeads}`,
        structure: campaignStructure,
        conversionSetup: customConversions,
        creativeMix: recommendedCreativeStrategy,
        calculatedAt: new Date().toLocaleDateString()
      });
      setIsGenerating(false);

      // Scroll smoothly to results card
      setTimeout(() => {
        document.getElementById('strategy-results-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Construct WhatsApp message and open directly! (All enquiries to WhatsApp)
      const whatsappText = `Hello Aman, I just completed my Supreme Ads Meta Lead Generation Strategy Planner.\n\n*My Custom Details*:\n• Service Vertical: ${formData.businessCategory}\n• Monthly Spend: ₹${formData.adSpend}\n• Target CPL: ₹${formData.targetCpl}\n• Primary Sales Goal: ${formData.salesObjective}\n• Average Ticket: ${formData.orderValue || 'N/A'}\n• Target Audience: ${formData.targetAvatar || 'General'}\n\n*Proposed Blueprint*:\n• Target CPL Goal: ₹${parsedCpl}\n• Est. Monthly Leads: ${minLeads} - ${maxLeads}/Mo\n• Creative Mix: ${recommendedCreativeStrategy}\n\nI want to schedule an interactive live audit call to implement this custom sales pipeline. Let's discuss!`;
      const encodedMsg = encodeURIComponent(whatsappText);
      window.open(`https://wa.me/919667173693?text=${encodedMsg}`, '_blank');
    }, 1200);
  };

  const getWhatsAppMessageRaw = () => {
    if (!blueprint) return '';
    const text = `Hello Aman, I just completed my Supreme Ads Meta Lead Generation Strategy Planner.\n\n*My Custom Details*:\n• Service Vertical: ${formData.businessCategory}\n• Monthly Spend: ₹${formData.adSpend}\n• Target CPL: ₹${formData.targetCpl}\n• Primary Sales Goal: ${formData.salesObjective}\n• Average Ticket: ${formData.orderValue || 'N/A'}\n• Target Audience: ${formData.targetAvatar || 'General'}\n\n*Proposed Blueprint*:\n• Target CPL Goal: ${blueprint.estimatedCPL}\n• Est. Monthly Leads: ${blueprint.volume}/Mo\n• Creative Mix: ${blueprint.creativeMix}\n\nI want to schedule an interactive live audit call to implement this custom sales pipeline. Let's discuss!`;
    return encodeURIComponent(text);
  };

  return (
    <div id="strategy-maker-container" className="pt-24 min-h-screen bg-slate-50/50">
      
      {/* Editorial Header Block */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,155,60,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-6 relative z-10">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.3em] uppercase block">
            THE PERFORMANCE LAB
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-none max-w-4xl mx-auto">
            LEARN META ADS &amp; <br />
            <span className="font-serif italic text-accent capitalize">Build Your Custom</span> Blueprint
          </h1>
          <p className="font-sans text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            We are a **dedicated lead generation force** focused on your sales growth. Below, discover our 3 absolute pillars of high-converting lead acquisitions, feed your variables into our strategy engine, and claim your custom Meta Blueprint.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <a href="#how-leads-convert" className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-heading font-medium text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all">
              1. Learn Conversion Pillars
            </a>
            <a href="#strategy-calculator" className="bg-accent text-primary font-heading font-bold text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all hover:scale-105">
              2. Launch Blueprint Generator
            </a>
          </div>
        </div>
      </section>

      {/* PILLAR CONTENT: Learn Meta Lead Generation */}
      <section id="how-leads-convert" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
            META ADS ACADEMY
          </span>
          <h2 className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-primary uppercase tracking-tighter">
            3 GOLDEN LAWS OF <span className="font-serif italic text-accent capitalize">HIGH-CONVERTING</span> LEADS
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-lg mx-auto">
            Why ordinary social media posts generate cold, visual-less clicks, while true performance-engineered funnels feed active buyers directly to your closers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Law 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-6 relative hover:border-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center font-heading font-bold text-lg group-hover:bg-accent/15 transition-colors">
              01
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-base text-primary uppercase tracking-tight">
                Stop Chasing Empty Clicks
              </h3>
              <p className="text-[10px] text-accent font-heading tracking-widest font-semibold uppercase">
                Law of intentional sorting
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Meta&apos;s default algorithm optimizes for the cheapest cost per tap. If you don&apos;t restrict demographics or embed active pre-qualifying question lists directly in your forms, you will get accidental submissions. Always screen out unqualified seekers early.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-heading font-bold text-primary">
              <CheckCircle2 size={12} className="text-[#C89B3C]" />
              <span>Drives 4x Sales Readiness</span>
            </div>
          </div>

          {/* Law 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-6 relative hover:border-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center font-heading font-bold text-lg group-hover:bg-accent/15 transition-colors">
              02
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-base text-primary uppercase tracking-tight">
                Speed to Lead (Instant Follow)
              </h3>
              <p className="text-[10px] text-accent font-heading tracking-widest font-semibold uppercase">
                Law of structural time decay
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              A hot lead left unattended for more than 15 minutes suffers a **391% drop in engagement likelihood**. The human attention span is fleeting; we plug instant auto-response WhatsApp triggers and direct-routing CRM frameworks so you connect while intent is absolute.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-heading font-bold text-primary">
              <CheckCircle2 size={12} className="text-[#C89B3C]" />
              <span>Saves wasted outbound spend</span>
            </div>
          </div>

          {/* Law 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-6 relative hover:border-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center font-heading font-bold text-lg group-hover:bg-accent/15 transition-colors">
              03
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-base text-primary uppercase tracking-tight">
                Systematic Hook Testing
              </h3>
              <p className="text-[10px] text-accent font-heading tracking-widest font-semibold uppercase">
                Law of algorithmic freshness
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Meta is a visual auction. If you run the exact same creative graphic for 3 months, your target audience ignores it, click-rates decline, and your CPL climbs. We continuously refresh hooks, angles, and cinematic templates to maintain algorithmic lead efficiency.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-heading font-bold text-primary">
              <CheckCircle2 size={12} className="text-[#C89B3C]" />
              <span>Maintains reliable scaling margins</span>
            </div>
          </div>

        </div>
      </section>

      {/* CORE GENERATOR SECTION */}
      <section id="strategy-calculator" className="py-24 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Left Side */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
                  INTERACTIVE LAB
                </span>
                <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-tighter leading-none">
                  BUILD YOUR CUSTOM <span className="font-serif italic text-accent capitalize">PIPELINE PROOF</span>
                </h2>
                <p className="text-xs font-sans text-slate-400 leading-relaxed max-w-lg font-light">
                  Input your true business specifications and ad spend boundaries below. Our certified conversion models will map out a customized, mathematical performance structure.
                </p>
              </div>

              <form onSubmit={generateStrategy} className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm relative">
                
                {/* 1. Category (Service Vertical / Industry) */}
                <div className="space-y-3">
                  <label htmlFor="businessCategory" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                    Service Vertical / Industry (Available to any in the market)
                  </label>
                  <input
                    id="businessCategory"
                    name="businessCategory"
                    type="text"
                    required
                    placeholder="e.g. Real Estate, Private Theater, Lady Boutique, High Class Event"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-xs text-white outline-none focus:border-accent font-sans transition-colors"
                  />
                  
                  {/* Quick Select Suggestion Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Real Estate', 'Event Management', 'Private Theater', 'Lady Boutique', 'E-commerce', 'Consulting'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, businessCategory: cat }))}
                        className={`px-3 py-1 rounded-full text-[9px] font-heading font-semibold uppercase tracking-widest border transition-all ${
                          formData.businessCategory.toLowerCase().includes(cat.toLowerCase().substring(0, 5))
                            ? 'bg-accent/20 border-accent text-accent'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        + {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Spend & Target CPL (No caps, no min, no max) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label htmlFor="adSpend" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                      Target Monthly Marketing Spend (₹ INR — No Limits)
                    </label>
                    <input
                      id="adSpend"
                      name="adSpend"
                      type="text"
                      required
                      placeholder="e.g. 50000 or 1.5 Lakh"
                      value={formData.adSpend}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-xs text-white outline-none focus:border-accent font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="targetCpl" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                      Target Cost Per Lead (₹ CPL — No Limits)
                    </label>
                    <input
                      id="targetCpl"
                      name="targetCpl"
                      type="text"
                      required
                      placeholder="e.g. 150 or 500"
                      value={formData.targetCpl}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-xs text-white outline-none focus:border-accent font-sans transition-colors"
                    />
                  </div>
                </div>

                {/* 4. Objective */}
                <div className="space-y-3">
                  <label htmlFor="salesObjective" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                    Primary Goal For Your Closers &amp; Sales Force
                  </label>
                  <select
                    id="salesObjective"
                    name="salesObjective"
                    value={formData.salesObjective}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-xs text-white outline-none focus:border-accent font-sans cursor-pointer transition-colors"
                  >
                    {primaryObjectives.map(obj => (
                      <option key={obj.value} value={obj.value}>{obj.label}</option>
                    ))}
                  </select>
                </div>

                {/* 5. AOV / Ticket & Target Avatar Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="orderValue" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                      Avg. Unit Deal Size / AOV (Optional)
                    </label>
                    <input
                      id="orderValue"
                      name="orderValue"
                      type="text"
                      placeholder="e.g. ₹2,00,000"
                      value={formData.orderValue}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="targetAvatar" className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest block">
                      Target Customer / City (Optional)
                    </label>
                    <input
                      id="targetAvatar"
                      name="targetAvatar"
                      type="text"
                      placeholder="e.g. Married couples 30-50, Delhi"
                      value={formData.targetAvatar}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Estimated Value Notice Box inside inputs */}
                <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-xl">
                  <p className="text-[10px] text-slate-300 leading-normal font-sans">
                    <strong>Estimated Value:</strong> Any calculated lead counts, volumes, or targets are initial dynamic estimates for planning purposes. The final real metrics and performance numbers will be determined solely by Meta's active algorithms and live advertising auctions.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-[0.25em] py-4 uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-b-transparent rounded-full animate-spin" />
                      <span>Synthesizing Meta Blueprint Model...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Strategy &amp; Send to WhatsApp</span>
                      <ArrowRight size={13} className="stroke-[2.5px]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Graphic Right Side Info / Placeholder */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              
              <AnimatePresence mode="wait">
                {!blueprint ? (
                  <motion.div
                    key="placeholder"
                    className="border border-slate-800 bg-slate-900/40 p-8 rounded-2xl text-center space-y-6 flex flex-col items-center justify-center min-h-[380px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-accent/5 text-accent flex items-center justify-center border border-slate-800 mb-2">
                      <BrainCircuit size={24} className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-200">
                        Await Interactive Computation
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-sans font-light">
                        Select your business parameters on the left and dispatch the matrix to formulate target Cost Per Lead (CPL) structures and target campaign topologies.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    id="strategy-results-view"
                    className="border border-accent/20 bg-slate-950 p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    {/* Golden top neon bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
                    <div className="absolute top-2 right-4 text-[9px] font-mono font-semibold text-accent/50 uppercase">
                      REF-CODE: SUPREME-{Math.floor(1000 + Math.random() * 9000)}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] tracking-widest font-heading font-bold text-accent uppercase">
                        YOUR STRATEGY BLUEPRINT
                      </span>
                      <h3 className="font-heading font-semibold text-lg uppercase text-white tracking-tight">
                        Meta Sales Generation Blueprint
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Formulated on {blueprint.calculatedAt}
                      </p>
                    </div>

                    <div className="h-[1px] bg-slate-800" />

                    {/* Calculated Matrix grids */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                        <span className="text-[9px] font-heading font-semibold text-slate-500 uppercase tracking-widest block">
                          EST. TARGET CPL
                        </span>
                        <div className="text-lg font-heading font-bold text-white tracking-tight font-mono">
                          {blueprint.estimatedCPL}
                        </div>
                        <span className="text-[8px] text-slate-400 block font-light">
                          Verified, phone-secured.
                        </span>
                      </div>
                      
                      <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                        <span className="text-[9px] font-heading font-semibold text-slate-500 uppercase tracking-widest block">
                          EST. MONTHLY LEADS
                        </span>
                        <div className="text-lg font-heading font-bold text-accent tracking-tight font-mono">
                          {blueprint.volume}
                        </div>
                        <span className="text-[8px] text-slate-400 block font-light">
                          Depending on creative speed.
                        </span>
                      </div>
                    </div>

                    {/* Funnel Details */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-heading font-semibold text-slate-400 uppercase tracking-[0.15em] block">
                          Recommended Campaign Scheme
                        </span>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                          {blueprint.structure}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[9px] font-heading font-semibold text-slate-400 uppercase tracking-[0.15em] block">
                          Tracking &amp; CAPI Stack Setup
                        </span>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                          {blueprint.conversionSetup}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[9px] font-heading font-semibold text-slate-400 uppercase tracking-[0.15em] block">
                          Winning Creative Composition
                        </span>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed font-light font-mono text-accent">
                          {blueprint.creativeMix}
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-slate-800 pt-1" />

                    {/* Primary action to discuss via WhatsApp with Aman */}
                    <div className="space-y-3">
                      <p className="text-[10px] text-slate-400 leading-normal font-sans text-center">
                        Secure absolute sales growth with a bespoke execution of this Blueprint. Let&apos;s map hooks and CAPI setups for your specific company.
                      </p>
                      <a
                        href={`https://wa.me/919667173693?text=${getWhatsAppMessageRaw()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-heading font-bold text-xs tracking-widest py-4 uppercase transition-all duration-300 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Smartphone size={14} className="stroke-[2.5px]" />
                        <span>Discuss blueprint with Aman</span>
                      </a>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
