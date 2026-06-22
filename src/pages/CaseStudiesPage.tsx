import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, Trophy, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

export default function CaseStudiesPage() {
  const { caseStudies } = useCMS();
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>('cs1'); // default first open

  // Category tags based on actual data objectives
  const filterTabs = ['All', 'Lead Generation', 'Direct Purchase', 'WhatsApp'];

  const filteredStudies = caseStudies.filter(study => {
    if (filter === 'All') return true;
    if (filter === 'Lead Generation') return study.campaignObjective.includes('Lead') || study.campaignObjective.includes('Calling');
    if (filter === 'Direct Purchase') return study.campaignObjective.includes('Direct Purchase') || study.campaignObjective.includes('Conversion');
    if (filter === 'WhatsApp') return study.solution.includes('WhatsApp') || study.campaignObjective.includes('WhatsApp');
    return true;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Mathematical Audited Success
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            RESULTS &amp; <span className="font-serif italic text-accent capitalize">CASE LOGS</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Objectives switcher header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-100 pb-8">
          <div className="space-y-1">
            <h3 className="font-heading font-semibold text-base text-primary uppercase">
              Campaign Objective Index
            </h3>
            <p className="text-xs text-slate-500 font-sans font-light">
              Select key target conversions and audit real verified outcomes.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setFilter(tab)}
                className={`py-2 px-4 font-heading text-[10px] tracking-widest uppercase transition-all ${
                  filter === tab
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-slate-50 border border-slate-200 text-slate-500 hover:border-accent hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Accordion list layout */}
        <div className="space-y-6">
          {filteredStudies.map((study) => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                className={`border transition-all duration-500 overflow-hidden ${
                  isExpanded 
                    ? 'border-accent/40 bg-slate-50/50 shadow-lg' 
                    : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : study.id)}
                  className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer select-none"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-heading font-semibold text-accent tracking-widest uppercase border border-accent/20 bg-accent/5 px-2.5 py-1">
                        {study.industry}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-bold">&#10003; Audited</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg md:text-xl text-primary tracking-tight">
                      {study.title}
                    </h3>
                  </div>

                  <div className="flex gap-4 md:gap-8 items-center shrink-0 w-full md:w-auto border-t border-slate-100 md:border-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Peak ROAS</span>
                      <span className="text-xl font-heading font-bold text-accent">{study.roas}</span>
                    </div>
                    
                    <button className="h-10 w-10 border border-slate-200 flex items-center justify-center font-heading text-lg font-bold hover:bg-accent hover:text-primary hover:border-accent transition-colors ml-auto">
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>
                </div>

                {/* Sub-body Expandable Panel */}
                {isExpanded && (
                  <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                    
                    {/* Primary Report Narrative */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="grid grid-cols-2 gap-4 bg-white p-4 border border-slate-100 shadow-sm rounded-lg">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">Campaign Spend</span>
                          <span className="font-heading text-sm font-semibold text-primary">{study.adSpend}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">Objective</span>
                          <span className="font-heading text-sm font-semibold text-primary line-clamp-1">{study.campaignObjective}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="text-xs uppercase tracking-widest text-[#C89B3C] font-semibold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            Client Challenge
                          </h4>
                          <p className="text-xs text-slate-600 font-sans font-light leading-relaxed pl-4">
                            {study.challenge}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-xs uppercase tracking-widest text-[#C89B3C] font-semibold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            Engine Strategy
                          </h4>
                          <p className="text-xs text-slate-600 font-sans font-light leading-relaxed pl-4">
                            {study.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Result Verification block */}
                    <div className="lg:col-span-5 bg-slate-900 text-white p-6 md:p-8 rounded-xl space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
                      <div className="flex gap-2 items-center border-b border-slate-800 pb-3">
                        <Trophy size={16} className="text-accent" />
                        <span className="text-xs uppercase tracking-widest font-heading font-semibold text-accent">
                          Performance Audit Ledger
                        </span>
                      </div>

                      <div className="space-y-4">
                        {study.results.map((res, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-slate-800 text-accent font-mono text-[9px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              0{i + 1}
                            </div>
                            <span className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                              {res}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Visual ROAS indicator */}
                      <div className="pt-4 border-t border-slate-805 space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase font-heading">
                          <span>ROAS target achieved</span>
                          <span className="text-accent font-mono">{study.roas}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
