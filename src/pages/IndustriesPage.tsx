import { useState } from 'react';
import { industryGroups } from '../data';
import { Search, Sparkles, Navigation } from 'lucide-react';

export default function IndustriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Multi-tier filtering
  const categories = ['All', ...industryGroups.map(ig => ig.category)];

  const filteredGroups = industryGroups.map(group => {
    // Check if query matches either group category OR any specific item inside the group
    const matchesCategory = group.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedItems = group.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const hasMatches = matchesCategory || matchedItems.length > 0;
    
    // Check tab filter
    const matchesTab = activeTab === 'All' || group.category === activeTab;

    if (hasMatches && matchesTab) {
      return {
        ...group,
        items: searchQuery ? matchedItems : group.items, // filter items only if actively searching
        opacity: true
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Elite Domain Mapping
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            INDUSTRIES <span className="font-serif italic text-accent capitalize">WE SERVE</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Dynamic Filter / Search Console */}
        <div className="mb-16 space-y-8 bg-[#F8FAFC] p-8 border border-slate-100 shadow-md">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-heading font-semibold text-lg text-primary uppercase">
                Audience Filter Center
              </h3>
              <p className="text-xs text-slate-500 font-light font-sans">
                Review our historical segment coverage across 42 micro-niches.
              </p>
            </div>

            {/* Premium Custom Search input */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450" size={16} />
              <input
                type="text"
                placeholder="Search your exact industry sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs py-4 pl-12 pr-6 border border-slate-200 focus:border-accent hover:border-slate-300 transition-colors focus:outline-none"
              />
            </div>
          </div>

          {/* Quick horizontal categories switcher */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none border-t border-slate-200 pt-6">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(cat)}
                className={`py-2.5 px-5 font-heading text-[10px] tracking-wider uppercase whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? 'bg-accent text-primary font-bold'
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-accent hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results layout */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
            <p className="font-heading text-sm text-slate-500 uppercase tracking-widest mb-3">No direct matches found</p>
            <p className="font-sans text-xs text-slate-450 font-light max-w-sm mx-auto">
              Our structures can configure custom map profiles for unlisted high-revenue categories. Shoot us an intake brief.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="bg-white border border-slate-100 p-8 shadow-lg hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Category Card Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#C89B3C] font-semibold block">Vertical Domain</span>
                      <h4 className="font-heading font-semibold text-sm text-primary tracking-tight mt-1">
                        {group?.category}
                      </h4>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-accent/5 text-accent flex items-center justify-center shrink-0">
                      <Navigation size={14} />
                    </div>
                  </div>

                  {/* Category detailed items */}
                  <ul className="space-y-3.5">
                    {group?.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2.5 items-start">
                        <span className="h-1.5 w-1.5 bg-accent rounded-full shrink-0 mt-2" />
                        <span className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-6 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Market verified
                  </span>
                  <span className="text-[11px] font-mono text-zinc-450 uppercase font-semibold">Active pixel maps</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
