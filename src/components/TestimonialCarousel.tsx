import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { Quote, Sparkles, Star } from 'lucide-react';

export default function TestimonialCarousel() {
  const { testimonials } = useCMS();
  const [isPaused, setIsPaused] = useState(false);
  
  // Create a duplicate list of testimonials for seamless, infinite looping
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Meta AI Inspired Luminous Glow Sphere Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none z-0">
        {/* Soft back glowing radial gradients matching the Meta AI image */}
        <div className="absolute inset-0 bg-radial from-violet-500/10 via-fuchsia-500/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-pink-500/10 blur-3xl rounded-full" />
        
        {/* Meta AI Gradient Ring Simulator (gorgeous CSS torus with glowing border) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-[18px] border-transparent bg-gradient-to-tr from-[#0080FF] via-[#7B00FF] to-[#FF007F] opacity-10 blur-[3px] animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-[2px] border-white/60 bg-transparent opacity-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header with Meta AI Brand Theme Visuals */}
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-tight">
            PROVEN <span className="bg-gradient-to-r from-[#0080FF] via-[#7B00FF] to-[#FF007F] bg-clip-text text-transparent">SCALE &amp; GROWTH</span> REVIEWS
          </h2>
          
          <p className="text-xs md:text-sm text-slate-700 font-sans leading-relaxed">
            Real performance records verified directly from Meta Ads Managers, client dashboards, and business consultations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 mx-auto rounded-full" />
        </div>

        {/* Endless Seamless Marquee Track */}
        <div 
          className="relative w-full overflow-hidden py-4 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle fade overlay gradients left & right to keep focus in the center */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Inner container using smooth Framer Motion list */}
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: isPaused ? undefined : [0, -1600] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="w-[380px] md:w-[440px] bg-white/70 backdrop-blur-md border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:border-fuchsia-300/60"
              >
                {/* Luminous Glow Corner line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Accent Meta-colored decorative ring on top-right of cards */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-cyan-300/10 to-fuchsia-500/10 rounded-full blur-xl pointer-events-none" />

                {/* Star rating + Quote Icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/10 to-fuchsia-500/10 flex items-center justify-center text-fuchsia-500">
                    <Quote size={14} className="stroke-[2.5px]" />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-800 text-[13px] leading-relaxed font-sans font-medium mb-8 italic">
                  "{testimonial.quote}"
                </p>

                {/* Client Profile */}
                <div className="flex items-center gap-4 border-t border-slate-100 pt-5">
                  <div className="relative">
                    {/* Glowing outer circle avatar border */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
                    <img
                      src={testimonial.image || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
                      {testimonial.author}
                    </h4>
                    <p className="text-[10px] font-sans text-slate-500 mt-0.5">
                      {testimonial.role} &bull; <span className="text-fuchsia-600 font-semibold">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Drag and Hover guidance */}
        <div className="text-center mt-8">
          <p className="text-[10px] font-heading font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span>Hover / Touch to pause exploration</span>
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping" />
          </p>
        </div>

      </div>
    </section>
  );
}
