import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import ClientMarquee from '../components/ClientMarquee';
import { whyChooseUs } from '../data';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, CheckCircle, Layers, Target, Lightbulb, ShieldCheck, Truck, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const homeSteps = [
    {
      title: 'PRODUCT ANALYSIS',
      description: (
        <div className="space-y-2 text-left">
          <p className="text-xs text-slate-500 leading-relaxed font-light">Every business is different. We study your product or service in detail.</p>
          <p className="text-xs text-slate-500 leading-relaxed font-light">We understand pricing, location, strengths, offers and unique selling points.</p>
          <p className="text-xs text-slate-500 leading-relaxed font-light">This helps us position your business correctly before launching campaigns.</p>
        </div>
      )
    },
    {
      title: 'AUDIENCE RESEARCH',
      description: (
        <div className="space-y-2 text-left">
          <p className="text-xs text-slate-500 leading-relaxed font-light font-medium">Finding the right customer is more important than reaching thousands of random people. We identify who is most likely to buy from you:</p>
          <ul className="text-xs text-slate-500 leading-relaxed font-light list-disc list-inside space-y-0.5 pl-1 font-sans">
            <li>Age group</li>
            <li>Income profile</li>
            <li>Buying behaviour</li>
            <li>Interests</li>
            <li>Location</li>
            <li>Occupation</li>
            <li>Lifestyle patterns</li>
          </ul>
        </div>
      )
    },
    {
      title: 'MARKET AND COMPETITOR SURVEY',
      description: (
        <div className="space-y-2 text-left">
          <p className="text-xs text-slate-500 leading-relaxed font-light font-medium">We analyse your competitors and understand what is already working in your industry. Our team studies:</p>
          <ul className="text-xs text-slate-500 leading-relaxed font-light list-disc list-inside space-y-0.5 pl-1 font-sans">
            <li>Competitor Meta advertisements</li>
            <li>Marketing messages</li>
            <li>Offers</li>
            <li>Landing pages</li>
            <li>Lead forms</li>
            <li>Customer engagement patterns</li>
          </ul>
          <p className="text-xs text-slate-500 leading-relaxed font-light">This helps us create campaigns that stand out.</p>
        </div>
      )
    },
    {
      title: 'CREATIVE GUIDANCE',
      description: (
        <div className="space-y-2 text-left">
          <p className="text-xs text-slate-500 leading-relaxed font-light font-medium">Many businesses struggle because they use the wrong photos or videos. We help you understand what type of content performs best. Suggested services include:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-slate-500 leading-relaxed font-light list-disc list-inside pl-1 font-sans">
            <li>Video shoot concepts</li>
            <li>Property walkthrough ideas</li>
            <li>Product showcase suggestions</li>
            <li>Reel concepts</li>
            <li>Customer testimonial videos</li>
            <li>Festival campaign creatives</li>
            <li>Offer creatives</li>
            <li>Before and after visuals</li>
            <li>Brand awareness creatives</li>
          </ul>
        </div>
      )
    }
  ];

  const featuredStudy = {
    industry: 'Real Estate Developer',
    title: 'Generating Verified Enquiries For Luxury Apartments',
    campaignObjective: 'Generate genuine enquiries for premium residential apartments.',
    adSpend: '₹20,00,000',
    roas: '10.8X',
    challenge: 'Most enquiries received earlier were not serious buyers. The client wanted better quality leads from people genuinely interested in purchasing luxury homes.',
    solution: 'Detailed audience research, competitor advertisement analysis, video creative suggestions, multiple Meta campaigns, retargeting campaigns, and a lead qualification process.',
    results: [
      'Detailed audience research',
      'Competitor advertisement analysis',
      'Video creative suggestions',
      'Multiple Meta campaigns',
      'Retargeting campaigns',
      'Lead qualification process'
    ],
    outcome: 'Consistent flow of verified enquiries from high-intent buyers.'
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
                How Supreme <br />
                <span className="font-serif italic text-accent capitalize">Ads Works</span>
              </h2>
              <div className="text-slate-600 font-sans text-sm leading-relaxed max-w-sm space-y-4">
                <p>
                  Before spending a single rupee on advertising, we first understand your business, customers and market position.
                </p>
                <p>
                  Our team follows a structured process to make sure your Meta campaigns reach the right people and generate quality enquiries.
                </p>
              </div>
              
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

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {homeSteps.map((reason, idx) => (
                <div key={idx} className="bg-white p-6 border border-slate-100 shadow-md group hover:border-accent/45 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent font-heading font-bold text-xs flex items-center justify-center mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-primary mb-2">
                    {reason.title}
                  </h3>
                  <div>
                    {reason.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecommerce Growth Support Section */}
      <section className="py-24 bg-white border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
                ECOMMERCE GROWTH SUPPORT
              </span>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-none">
                More Than Ads. <br />
                <span className="font-serif italic text-accent capitalize">We Help Ecommerce Brands Scale.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <div className="text-slate-600 font-sans text-sm md:text-base leading-relaxed max-w-2xl space-y-4">
                <p>
                  Running successful Meta Ads is only one part of ecommerce growth.
                </p>
                <p>
                  Many businesses struggle because of poor order management, delivery delays, high RTO rates and inefficient COD processes.
                </p>
                <p>
                  When you onboard with Supreme Ads, our team can also guide you with ecommerce operational best practices to help you scale more efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Meta Advertising',
                desc: 'Performance-focused campaigns designed to increase orders and revenue.',
                icon: <Layers size={18} className="text-accent" />
              },
              {
                title: 'Audience Research',
                desc: 'Identify and target customers most likely to purchase.',
                icon: <Target size={18} className="text-accent" />
              },
              {
                title: 'Creative Guidance',
                desc: 'Product videos, reels, UGC concepts and high-converting ad creatives.',
                icon: <Lightbulb size={18} className="text-accent" />
              },
              {
                title: 'COD Process Guidance',
                desc: 'Suggestions to improve order confirmation workflows and reduce fake orders.',
                icon: <ShieldCheck size={18} className="text-accent" />
              },
              {
                title: 'Delivery Setup Support',
                desc: 'Guidance on courier partners, shipping workflows and fulfilment processes.',
                icon: <Truck size={18} className="text-accent" />
              },
              {
                title: 'Growth Consultation',
                desc: 'Ongoing recommendations to help improve customer acquisition and business growth.',
                icon: <TrendingUp size={18} className="text-accent" />
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-[#F8FAFC] p-8 border border-slate-100 shadow-sm rounded-xl hover:border-accent/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-base text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight Banner */}
          <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block">
                  Ecommerce Onboarding Advantage
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-light max-w-3xl">
                  Businesses onboarding with Supreme Ads receive complimentary guidance on COD workflows, delivery setup and ecommerce operational best practices as part of our growth support approach.
                </p>
                <p className="text-[10px] text-slate-500 font-sans italic">
                  (Subject to business requirements and onboarding scope.)
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Case Study Highlight */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
              FEATURED SUCCESS STORY
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
                  <strong className="text-white font-medium">Strategy Used:</strong> {featuredStudy.solution}
                </p>
              </div>

              <div className="flex pt-4">
                <button
                  onClick={() => onNavigate('#case-studies')}
                  className="bg-accent hover:bg-accent-dark text-primary font-heading font-semibold text-xs tracking-[0.2em] px-6 py-3.5 uppercase transition-all duration-300 flex items-center gap-2"
                >
                  View Campaign Breakdown
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold block">
                Strategy Used
              </span>
              <div className="space-y-3">
                {featuredStudy.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed font-light">{res}</span>
                  </div>
                ))}
                <div className="h-[1px] bg-slate-800 my-2" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block">
                    Result
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-light">
                    {featuredStudy.outcome}
                  </p>
                </div>
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
            READY TO GROW YOUR BUSINESS
          </span>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Want More Customers <br />
            <span className="font-serif italic text-accent capitalize tracking-normal">Through Meta Advertising?</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            Book a strategy session with Supreme Ads and discover how we can help you attract the right audience, improve lead quality and scale your business.
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => onNavigate('#contact')}
              className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-[0.2em] px-10 py-5 uppercase transition-all duration-300 shadow-xl"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
