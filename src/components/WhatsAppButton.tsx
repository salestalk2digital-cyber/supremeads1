import { useState } from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  // High-performance direct chat link (Supreme Ads verified sales desk link)
  const whatsappNumber = '919667173693'; // Aman's direct WhatsApp
  const encodedText = encodeURIComponent(
    'Hello Supreme Ads, I would like to book a Meta advertising performance consultation.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  return (
    <div
      className="fixed bottom-8 right-6 md:right-10 z-40 flex items-center space-x-3 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="bg-primary border border-accent/30 text-white shadow-2xl px-4 py-2.5 rounded-full text-xs font-heading font-medium tracking-widest uppercase flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Talk to a strategist</span>
            <ArrowUpRight size={12} className="text-accent" />
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 select-none relative group"
        aria-label="Contact us via WhatsApp"
        title="Contact us via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping group-hover:hidden" />
        {/* SVG for WhatsApp icon or clean MessageSquare, users prefer beautiful authentic icons */}
        <svg 
          className="w-7 h-7 fill-current" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.022-.015-.022-.015-.407-.207-.193-.096-.907-.441-1.048-.49-.14-.049-.243-.074-.346.074-.103.149-.403.49-.49.593-.088.103-.177.113-.37.015-.193-.096-.814-.298-1.547-.949-.569-.508-.949-1.14-1.061-1.326-.112-.19-.012-.294.084-.391.088-.088.193-.219.29-.33.096-.11.129-.187.193-.311.065-.129.033-.243-.016-.341-.049-.096-.403-.969-.553-1.327-.145-.353-.291-.305-.403-.311-.104-.005-.224-.005-.345-.005-.12 0-.316.044-.48.225-.164.18-.629.614-.629 1.498 0 .884.643 1.738.733 1.861.09.124 1.266 1.932 3.067 2.709.428.185.761.296 1.021.378.43.136.822.117 1.13.072.344-.051 1.048-.429 1.196-.843.148-.414.148-.77.103-.843-.045-.074-.165-.119-.344-.225zM12.002 2c-5.522 0-10 4.477-10 10 0 1.77.463 3.491 1.343 5.013l-1.343 4.987 5.105-1.339c1.474.805 3.125 1.233 4.895 1.233 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </motion.a>
    </div>
  );
}
