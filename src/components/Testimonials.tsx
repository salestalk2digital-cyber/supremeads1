import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = useCMS();
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const listLength = testimonials.length || 1;

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? listLength - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === listLength - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIdx] || {
    id: 't1',
    quote: 'Fallback quote',
    author: 'Author',
    role: 'Role',
    company: 'Company',
    image: ''
  };

  // Motion physics configuration for elite smooth transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <section id="about" className="bg-bg-secondary py-24 md:py-32 text-primary overflow-hidden border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Title center */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
            Executive Endorsements
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary">
            Client <span className="font-serif italic text-accent capitalize">Voices</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Minimal Slider Box */}
        <div className="relative min-h-[380px] flex flex-col justify-between">
          <div className="relative overflow-hidden w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="space-y-8 text-center px-4 md:px-12"
              >
                {/* Clean, gorgeous quoted text without quotation icons */}
                <p className="font-sans text-base md:text-lg lg:text-xl text-primary leading-relaxed italic max-w-3xl mx-auto">
                  "{current.quote}"
                </p>

                {/* Author Metadata Panel */}
                <div className="flex flex-col items-center space-y-3 pt-4">
                  {current.image && (
                    <img
                      src={current.image}
                      alt={current.author}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover filter grayscale contrast-110 border border-accent/20 shadow-sm"
                    />
                  )}
                  <div className="space-y-0.5">
                    <h4 className="font-heading font-semibold text-xs text-primary uppercase tracking-wider">
                      {current.author}
                    </h4>
                    <p className="font-sans text-[11px] text-slate-700 uppercase tracking-widest leading-relaxed">
                      {current.role} &mdash; <strong className="text-accent font-medium">{current.company}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Pagination Controls */}
          <div className="flex items-center justify-center space-x-12 mt-10">
            <button
              onClick={handlePrev}
              className="cursor-pointer p-3 border border-gray-200 hover:border-accent hover:bg-white text-gray-400 hover:text-accent rounded-full transition-all duration-300"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, iIdx) => (
                <button
                  key={iIdx}
                  onClick={() => {
                    setDirection(iIdx > activeIdx ? 1 : -1);
                    setActiveIdx(iIdx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    iIdx === activeIdx ? 'bg-accent w-4' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${iIdx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="cursor-pointer p-3 border border-gray-200 hover:border-accent hover:bg-white text-gray-400 hover:text-accent rounded-full transition-all duration-300"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
