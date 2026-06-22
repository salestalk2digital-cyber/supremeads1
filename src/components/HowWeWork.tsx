import { processSteps } from '../data';
import { motion } from 'motion/react';

export default function HowWeWork() {
  return (
    <section id="how-it-works" className="bg-white py-24 md:py-32 text-primary overflow-hidden relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Center */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block">
            Operational Protocol
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary">
            How We <span className="font-serif italic text-accent capitalize">Work</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Vertical/Horizontal Editorial Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Decorative faint background connector layout in desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-100 -translate-y-1/2 z-0 hidden lg:block" />
          
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative bg-bg-secondary hover:bg-white border hover:border-accent/40 p-8 md:p-10 transition-all duration-500 rounded-lg shadow-sm z-10 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                {/* Step Index Number */}
                <span className="font-heading font-semibold text-4xl text-accent/20 block select-none mb-6">
                  {step.step}
                </span>

                {/* Step Title */}
                <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-primary mb-4">
                  {step.title}
                </h3>
              </div>

              {/* Step Description */}
              <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                {step.description}
              </p>
              
              {/* Gold dot hover effect anchor */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-transparent group-hover:bg-accent rounded-full transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
