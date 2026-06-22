import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, DollarSign, Target, Award, ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  const { caseStudies } = useCMS();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="case-studies" className="bg-white py-24 md:py-32 text-primary border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
            Verifiable Proof
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary">
            Case <span className="font-serif italic text-accent capitalize">Studies</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Case Studies Lists */}
        <div className="space-y-16">
          {caseStudies.map((study, idx) => {
            const isExpanded = expandedId === study.id;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className="border border-gray-100 shadow-xl rounded-2xl overflow-hidden bg-bg-secondary flex flex-col"
              >
                {/* Horizontal Core Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Case Study Visual Banner (Left) */}
                  <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
                    <div className="absolute top-6 left-6 bg-primary text-white border border-accent/30 px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-widest">
                      {study.industry}
                    </div>
                  </div>

                  {/* Case Study Analytics Dashboard (Right) */}
                  <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                      <span className="text-[10px] font-heading font-semibold text-accent uppercase tracking-widest">
                        Performance Breakdown
                      </span>
                      <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary leading-tight uppercase">
                        {study.title}
                      </h3>
                    </div>

                    {/* Stats Metric Panel Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-200/60 py-6">
                      <div className="space-y-1">
                        <span className="text-[10px] tracking-wider uppercase text-gray-400">Campaign Objective</span>
                        <div className="text-xs font-semibold uppercase text-primary line-clamp-1">{study.campaignObjective}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] tracking-wider uppercase text-gray-400">Total Ad Spend</span>
                        <div className="text-sm font-semibold uppercase text-primary">{study.adSpend}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] tracking-wider uppercase text-gray-400">Qualified Leads</span>
                        <div className="text-sm font-semibold uppercase text-primary">{study.qualifiedLeads}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] tracking-wider uppercase text-accent font-semibold">ROAS Achieved</span>
                        <div className="text-base font-bold text-accent">{study.roas}</div>
                      </div>
                    </div>

                    {/* Cost Per Lead Metrics */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      {study.costPerLead !== 'N/A' && (
                        <div className="text-xs text-gray-500 font-sans">
                          Cost Per Verified Lead: <strong className="text-primary">{study.costPerLead}</strong>
                        </div>
                      )}
                      
                      {/* Action trigger button */}
                      <button
                        onClick={() => toggleExpand(study.id)}
                        className="font-heading font-semibold text-xs tracking-widest uppercase flex items-center space-x-2 text-accent hover:text-accent-dark transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Strategy Details' : 'View Full Study'}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Collapsible Strategy Section */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="border-t border-gray-200/60 overflow-hidden bg-white"
                    >
                      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-600">
                        {/* Obstacles & Orchestration columns */}
                        <div className="space-y-6 border-r border-gray-100 pr-0 md:pr-12">
                          <div className="space-y-2">
                            <h4 className="font-heading font-semibold text-xs text-primary uppercase tracking-widest">
                              The Challenge
                            </h4>
                            <p className="font-sans font-light leading-relaxed">
                              {study.challenge}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-heading font-semibold text-xs text-accent uppercase tracking-widest">
                              The Supreme Solution
                            </h4>
                            <p className="font-sans font-light leading-relaxed">
                              {study.solution}
                            </p>
                          </div>
                        </div>

                        {/* Outcomes list */}
                        <div className="space-y-6">
                          <h4 className="font-heading font-semibold text-xs text-primary uppercase tracking-widest">
                            Verifiable Action Results
                          </h4>
                          <ul className="space-y-4">
                            {study.results.map((res, rIdx) => (
                              <li key={rIdx} className="flex items-start space-x-3 text-xs leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                <span className="font-sans font-light">{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
