import { metricsData } from '../data';
import { motion } from 'motion/react';

export default function Metrics() {
  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden text-primary border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metricsData.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col justify-between p-8 border border-gray-100 bg-bg-secondary hover:bg-primary hover:text-white transition-all duration-500 rounded-lg shadow-sm"
            >
              <div className="space-y-4">
                {/* Metric value styled statically */}
                <div className="font-heading font-semibold text-4xl lg:text-5xl tracking-tight text-accent select-none">
                  {metric.value}
                </div>
                <div className="font-heading text-sm font-semibold tracking-wider uppercase">
                  {metric.label}
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-light">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Small disclaimer section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase leading-relaxed max-w-xl mx-auto">
            * Results vary depending upon offer quality, business model, market demand and sales process. 
            All capital figures are validated and audited metrics.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
