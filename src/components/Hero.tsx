import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, PlayCircle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useRef, useState } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onBookCallClick: () => void;
}

export default function Hero({ onExploreClick, onBookCallClick }: HeroProps) {
  const { hero } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 400], [0, 100]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-primary text-white overflow-hidden py-24 md:py-32"
    >
      {/* Background Visual Wrapper */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        {/* Abstract Gradient Overlay for luxurious contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.12)_0%,rgba(15,23,42,0.95)_75%)] z-10" />

        {/* Video stream background (fails over gracefully to image) */}
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover select-none filter brightness-50 contrast-125"
          >
            <source src="https://cdn.pixabay.com/video/2019/04/12/22749-329864272_large.mp4" type="video/mp4" />
          </video>
        ) : null}

        {/* Static Base Luxury Image Background */}
        {videoError || hero.backgroundImage ? (
          <img
            src={hero.backgroundImage || '/images/hero_bg.jpg'}
            alt="Supreme Ads Editorial Background"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
          />
        ) : null}
      </motion.div>

      {/* Decorative vertical lines and indicators */}
      <div className="absolute top-0 bottom-0 left-12 md:left-24 w-[1px] bg-white/5 z-10 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-12 md:right-24 w-[1px] bg-white/5 z-10 hidden md:block" />

      {/* Side rotated branding element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-64 flex items-center justify-center border-r border-white/10 z-10 hidden md:flex">
        <div className="rotate-[-90deg] whitespace-nowrap text-[9px] font-heading font-semibold tracking-[0.5em] text-white/30 uppercase select-none">
          Performance First Agency / Since 2018
        </div>
      </div>

      {/* Hero Core Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center md:ml-12 lg:ml-16">
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-8 space-y-8 text-left"
          >
            {/* Accent Label */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center space-x-2 border border-accent/20 bg-accent/5 px-4 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-heading font-semibold text-[10px] tracking-widest uppercase">
                META PERFORMANCE PARTNER
              </span>
            </motion.div>

            {/* Core Headline with Elegant Playfair Serif Italic accent */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[0.95] whitespace-pre-line"
            >
              {hero.headline}
            </motion.h1>

            <div className="w-16 h-[2px] bg-accent" />

            {/* Subheadline description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-gray-300 text-base md:text-lg leading-relaxed max-w-xl font-light"
            >
              {hero.subheadline}
            </motion.p>

            {/* Action Call buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6"
            >
              {/* Book Strategy Call */}
              <button
                onClick={onBookCallClick}
                className="bg-accent hover:bg-accent-dark text-primary font-heading font-semibold text-xs tracking-[0.2em] px-8 py-4 uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 border border-accent"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight size={14} />
              </button>

              {/* Explore Industries */}
              <button
                onClick={onExploreClick}
                className="border-b-2 border-white hover:border-accent bg-transparent text-white font-heading font-semibold text-xs tracking-[0.2em] px-2 py-4 uppercase transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{hero.secondaryCta}</span>
                <span>&rarr;</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Artistic Aspect-ratio Card in desktop sizes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-4 relative hidden lg:block"
          >
            {/* Watermark */}
            <div className="absolute -top-32 -right-16 text-[180px] font-black text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter">
              ROAS
            </div>
            
            <div className="aspect-[3/4] bg-white text-primary border border-gray-100 p-8 flex flex-col justify-between shadow-2xl rounded-2xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="text-[44px] font-heading font-bold text-primary leading-none">
                  10x+
                </div>
                <div className="text-[10px] tracking-widest uppercase font-semibold text-accent">
                  Avg. ROAS
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-[1px] bg-slate-200 w-full" />
                <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                  Featured Case Study
                </div>
                <div className="text-xl font-heading font-semibold text-primary tracking-tight">
                  LUXURY REAL ESTATE
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-sans">
                  <span>Qualified Leads</span>
                  <span className="font-bold text-primary">+342%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide down mouse indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[10px] tracking-widest text-gray-500 uppercase">Scroll To Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-9 border border-gray-600 rounded-full flex justify-center pt-2"
        >
          <span className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
