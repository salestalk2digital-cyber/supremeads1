import { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Eye } from 'lucide-react';

const categories = [
  { label: 'All Assets', value: 'all' },
  { label: 'Events', value: 'events' },
  { label: 'Campaign Ads', value: 'ads' },
  { label: 'Creatives & Hooks', value: 'creatives' },
  { label: 'Campaign Results', value: 'campaign-results' },
  { label: 'Our Offices', value: 'office' },
  { label: 'Our Clients', value: 'clients' }
];

export default function GallerySection() {
  const { galleryItems } = useCMS();
  const [activeTab, setActiveTab] = useState('all');
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Active filter items computed lazily
  const filteredGallery = useMemo(() => {
    if (activeTab === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeTab);
  }, [activeTab, galleryItems]);

  return (
    <section id="gallery" className="bg-white py-24 md:py-32 text-primary border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
              Omnichannel Portfolios
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-none">
              Creative <br /><span className="font-serif italic text-accent capitalize">Gallery</span>
            </h2>
          </div>
          <p className="font-sans text-gray-500 text-xs max-w-sm leading-relaxed font-light">
            A curated index of physical workspace, strategic events, customer audit dashboards, and actual high-converting visual assets catalogued for Meta placements.
          </p>
        </div>

        {/* Filter Buttons Navigation bar */}
        <div className="flex flex-wrap gap-2 pb-10 border-b border-gray-100 mb-12">
          {categories.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-5 py-2.5 font-heading text-[10px] tracking-widest uppercase transition-all duration-300 rounded ${
                  isActive 
                    ? 'bg-primary text-white font-medium border border-primary shadow-md' 
                    : 'text-gray-500 hover:text-primary hover:bg-gray-50 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Masonry Columns Layout */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm bg-bg-secondary cursor-pointer"
                onClick={() => setZoomImg(item.image)}
              >
                {/* Image item element */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full object-cover select-none transition-transform duration-700 group-hover:scale-105 rounded-xl block"
                />
                
                {/* Elegant overlay styled with extreme minimalist luxury aesthetic */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <div className="space-y-2">
                    <span className="text-[9px] font-heading font-semibold text-accent uppercase tracking-widest block">
                      {categories.find(c => c.value === item.category)?.label}
                    </span>
                    <h3 className="font-heading font-semibold text-xs text-white uppercase tracking-wider leading-relaxed">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-accent text-[9px] font-semibold tracking-widest uppercase pt-2">
                      <ZoomIn size={12} />
                      <span>Inspect Artwork</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Lightbox zoomed preview layer */}
        <AnimatePresence>
          {zoomImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomImg(null)}
              className="fixed inset-0 bg-primary/95 backdrop-blur-md z-50 flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                src={zoomImg}
                alt="Enlarged Showcase asset"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
              />
              <span className="absolute top-6 right-6 text-xs font-heading font-semibold tracking-widest text-accent uppercase select-none">
                Close Preview [X]
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
