import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  TrendingUp, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface MockTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  result: string;
  metric: string;
  avatar: string;
}

export default function SocialProofCarousel() {
  const [testimonials, setTestimonials] = useState<MockTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    // Simulating real API network latency to demonstrate elite loading states
    const timer = setTimeout(() => {
      fetch('/data/testimonials_mock.json')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setTestimonials(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch testimonials:", err);
          setError("Failed to load certified social proof data.");
          setLoading(false);
        });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0 || loading) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, testimonials, loading]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { duration: 0.3 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  if (loading) {
    return (
      <div className="w-full min-h-[350px] bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-4 py-16">
        <div className="relative">
          <RefreshCw className="w-10 h-10 text-accent animate-spin" />
          <div className="absolute inset-0 bg-radial from-accent/20 to-transparent blur-md animate-pulse" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em]">
            Syncing Active Case Logs
          </p>
          <p className="text-[10px] text-slate-400 font-sans">
            Fetching audited testimonials from secure storage...
          </p>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="w-full bg-red-50/50 border border-red-100 rounded-2xl p-8 text-center space-y-3">
        <p className="text-xs text-red-600 font-sans font-medium">
          {error || "No social proof testimonials available in storage."}
        </p>
        <button 
          onClick={() => { setLoading(true); setError(null); }}
          className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest border border-accent/20 hover:bg-accent/5 px-4 py-2 rounded-lg transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Decorative Outer Ambient Halo */}
      <div className="absolute -inset-4 bg-radial from-accent/5 via-transparent to-transparent opacity-70 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl overflow-hidden relative p-6 sm:p-8 md:p-12">
        {/* Subtle top brand glow line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500" />
        
        {/* Quote watermark */}
        <Quote className="absolute -top-4 -left-4 w-32 h-32 text-slate-100/50 stroke-[1px] rotate-180 pointer-events-none select-none" />

        <div className="relative z-10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"
            >
              {/* Left Column: Avatar, Trust indicators and verified Badges */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-10">
                <div className="relative">
                  {/* Glowing border */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 opacity-40 blur-sm animate-pulse" />
                  <img 
                    src={current.avatar} 
                    alt={current.author}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white relative z-10"
                    referrerPolicy="no-referrer"
                  />
                  {/* Small verified badge symbol */}
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white z-20 shadow-md">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-sm tracking-wide text-primary uppercase">
                    {current.author}
                  </h4>
                  <p className="text-[10px] font-sans text-slate-500 uppercase tracking-wider font-medium">
                    {current.role}
                  </p>
                  <p className="text-[11px] font-heading font-semibold text-accent uppercase tracking-widest mt-1">
                    {current.company}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Industry Tag */}
                <span className="inline-block text-[9px] font-heading font-bold tracking-widest uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {current.industry}
                </span>
              </div>

              {/* Right Column: Quote text, Growth Result and Scale Metric Badges */}
              <div className="md:col-span-8 space-y-6 flex flex-col justify-between h-full">
                {/* Micro Highlight header */}
                <div className="flex items-center gap-2 text-fuchsia-600">
                  <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[9px] font-heading font-extrabold uppercase tracking-[0.25em]">
                    Verified Client Audit
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed italic text-slate-700 font-medium">
                  "{current.quote}"
                </p>

                {/* Dynamic Results & Social Proof Showcase Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {/* ROI / Performance Growth Badge */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 space-y-1 flex flex-col items-center md:items-start transition-all hover:bg-emerald-50 hover:shadow-sm">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <TrendingUp size={14} />
                      <span className="text-[9px] font-heading font-bold uppercase tracking-wider">
                        Growth Achieved
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-heading font-black text-emerald-800 uppercase tracking-tight">
                      {current.result}
                    </span>
                  </div>

                  {/* Volume / Lead Scale Metric Badge */}
                  <div className="bg-fuchsia-50/70 border border-fuchsia-100 rounded-xl p-3.5 space-y-1 flex flex-col items-center md:items-start transition-all hover:bg-fuchsia-50 hover:shadow-sm">
                    <div className="flex items-center gap-1.5 text-fuchsia-700">
                      <Sparkles size={13} />
                      <span className="text-[9px] font-heading font-bold uppercase tracking-wider">
                        Volume Scaled
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-heading font-black text-fuchsia-800 uppercase tracking-tight">
                      {current.metric}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators & Arrow Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
          {/* Bullet Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-6 bg-gradient-to-r from-cyan-500 to-fuchsia-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Show slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Left / Right Nav Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-500 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-500 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
