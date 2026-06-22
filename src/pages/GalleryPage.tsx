import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Eye } from 'lucide-react';

export default function GalleryPage() {
  const { galleryItems } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter keys matching galleryCategories
  const categories = ['All', 'creatives', 'campaign-results', 'office', 'events', 'ads', 'clients'];

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
            Aesthetic Portfolio Ledger
          </span>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            CREATIVE <span className="font-serif italic text-accent capitalize">GALLERY</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Category triggers */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-16 border-b border-slate-100 pb-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-4.5 font-heading text-[10px] tracking-widest uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-primary font-bold'
                  : 'bg-slate-50 border border-slate-200 text-slate-550 hover:border-accent hover:text-primary'
              }`}
            >
              {cat === 'All' ? 'All Portfolio' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Gallery responsive masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-100 shadow-md overflow-hidden relative group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark premium gradient overlay on hover content */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Micro interactive zoom trigger icon */}
                <div className="absolute top-4 right-4 bg-accent text-primary h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Eye size={14} />
                </div>

                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 text-white z-10 space-y-1.5">
                  <span className="text-[9px] uppercase font-bold text-accent tracking-widest">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-heading font-semibold text-xs tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Minimal offline footer descriptor */}
              <div className="p-4 border-t border-slate-50 flex justify-between items-center text-slate-450 text-[10px]">
                <span className="capitalize font-mono">{item.category.replace('-', ' ')}</span>
                <span className="font-semibold uppercase tracking-wider text-accent font-heading">Meta Standard &bull;</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
