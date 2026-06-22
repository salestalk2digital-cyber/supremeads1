import { whyChooseUs } from '../data';
import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp, Search, Eye, Filter, MessageSquare, ShieldAlert, FileText, UserCheck } from 'lucide-react';

const icons = [
  Target,       // Meta Specialists
  Lightbulb,    // Creative testing
  TrendingUp,   // Conversion Optimization
  Search,       // Audience research
  Eye,          // Pixel tracking
  Filter,       // Retargeting
  MessageSquare,// WhatsApp Automation
  ShieldAlert,  // Campaign Monitoring
  FileText,     // Transparent Reporting
  UserCheck     // Dedicated Account Management
];

export default function WhySupreme() {
  return (
    <section id="services" className="bg-bg-secondary py-24 md:py-32 relative text-primary">
      {/* Decorative luxury grid watermark background */}
      <div className="absolute inset-0 luxury-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Heading Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
            <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-3">
              Core Paradigm
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-primary leading-none">
              Why <br />
              <span className="font-serif italic text-accent capitalize">Supreme Ads</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="font-sans text-gray-600 text-base md:text-lg leading-relaxed max-w-xl font-light">
              We operate at the nexus of quantitative statistics and elite human creativity. We do not run generic brand awareness campaigns. We design custom Meta pipelines engineered solely for commercial ROI.
            </p>
          </div>
        </div>

        {/* 10 Performance Columns Bento/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {whyChooseUs.map((item, idx) => {
            const Icon = icons[idx] || Target;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-white p-8 md:p-10 hover:bg-primary transition-all duration-500 ease-in-out flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon with Gold Accent */}
                  <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:border-accent text-accent group-hover:text-primary flex items-center justify-center transition-all duration-500">
                    <Icon size={20} className="stroke-[1.5]" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-primary group-hover:text-white tracking-wide uppercase transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-6 font-sans text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
