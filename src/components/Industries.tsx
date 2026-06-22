import { useState, useMemo } from 'react';
import { industryGroups } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Building2, GlassWater, Factory, Sparkles, Film, Scissors, GraduationCap, Activity, CarFront, ShoppingBag, UtensilsCrossed, Briefcase, Compass, ArrowRight } from 'lucide-react';

// Icon Map helper to load dynamically
const iconMap: Record<string, any> = {
  Building2,
  GlassWater,
  Factory,
  Sparkles,
  Film,
  Scissors,
  GraduationCap,
  Activity,
  CarFront,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  Compass
};

export default function Industries() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Search filter matching categories or items
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return industryGroups;
    
    return industryGroups.filter((group) => {
      const matchCategory = group.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchItems = group.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory || matchItems;
    });
  }, [searchQuery]);

  // Adjust active tab if filters make active index invalid
  const finalActiveIdx = useMemo(() => {
    if (activeIdx >= filteredGroups.length) return 0;
    return activeIdx;
  }, [activeIdx, filteredGroups]);

  const activeGroup = filteredGroups[finalActiveIdx];

  return (
    <section id="industries" className="bg-bg-secondary py-24 md:py-32 text-primary relative overflow-hidden">
      <div className="absolute inset-0 luxury-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
              Deep Domain Expertise
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-none">
              Industries <br /><span className="font-serif italic text-accent capitalize">We Serve</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end space-y-4">
            <p className="font-sans text-gray-600 text-sm max-w-xl font-light">
              We compile highly customized target pools and custom Conversion API parameters specifically tailored for your unit margins and buyers pipeline. Select or search your operational niche below.
            </p>
            
            {/* Search Input Filter */}
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your business niche (e.g. Attar, Penthouse, CA)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveIdx(0);
                }}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 outline-none bg-white rounded-lg text-sm transition-all focus:border-accent font-sans"
              />
            </div>
          </div>
        </div>

        {/* Directory Panel layout */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden min-h-[500px]">
            
            {/* Left Nav Tabs Column (Scrollable) */}
            <div className="lg:col-span-5 border-r border-gray-100 bg-bg-secondary/40 max-h-[500px] overflow-y-auto">
              <div className="p-2 space-y-1">
                {filteredGroups.map((group, idx) => {
                  const IconComponent = iconMap[group.icon] || Building2;
                  const isActive = idx === finalActiveIdx;
                  return (
                    <button
                      key={group.category}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-full text-left p-4 rounded-lg font-heading text-xs uppercase tracking-wider flex items-center space-x-4 transition-all duration-300 relative ${
                        isActive 
                          ? 'bg-white text-primary font-semibold shadow-sm border-l-4 border-accent' 
                          : 'text-gray-500 hover:bg-white hover:text-primary'
                      }`}
                    >
                      <IconComponent size={16} className={isActive ? 'text-accent' : 'text-gray-400'} />
                      <span className="truncate">{group.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Sub-items List Column */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between max-h-[500px] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup?.category}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-2 border-b border-gray-100 pb-4">
                    <span className="text-[10px] tracking-widest text-accent font-semibold uppercase">Category Segment</span>
                    <h3 className="font-heading font-semibold text-lg text-primary uppercase tracking-wide">
                      {activeGroup?.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {activeGroup?.items.map((subItem, sIdx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                        key={subItem}
                        className="flex items-start space-x-3 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="font-sans text-sm text-gray-700 leading-relaxed font-light">
                          {subItem}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Pitch Block */}
              <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-xs text-gray-500 leading-relaxed font-light max-w-md">
                  Do not see your exact business subcategory? We build customized algorithmic funnels from scratch for custom target matrices.
                </p>
                <a
                  href="#contact"
                  className="text-xs font-heading font-semibold text-accent tracking-widest uppercase flex items-center space-x-2 shrink-0 hover:text-accent-dark transition-colors group"
                >
                  <span>Inquire Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
            <p className="text-sm text-gray-500">No matching industries found for "{searchQuery}". Try options like "fragrance" or "real estate".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs font-heading font-semibold text-accent tracking-widest uppercase hover:underline"
            >
              Clear Search Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
