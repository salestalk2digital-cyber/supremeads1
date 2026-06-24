import { useCMS } from '../context/CMSContext';
import { useState } from 'react';

export default function ClientMarquee() {
  const { clientLogos } = useCMS();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Double the static list for seamless looping marquee wraps
  const loopedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="bg-primary py-16 overflow-hidden relative border-y border-gray-900 select-none">
      <div className="absolute inset-0 luxury-grid-dark opacity-[0.04] pointer-events-none" />
      
      {/* Container header context */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center">
        <span className="text-[9px] font-heading font-semibold text-accent tracking-[0.3em] uppercase block">
          Trusted by elite enterprises internationally
        </span>
      </div>

      {/* Infinite Marquee Slider track */}
      <div className="flex w-full overflow-hidden relative py-4 bg-gray-950/40">
        {/* Soft edge blur shadows */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee shrink-0 space-x-12 md:space-x-16 items-center">
          {loopedLogos.map((client, cIdx) => {
            const hasError = imgErrors[client.id] || !client.logoUrl;
            return (
              <div
                key={`${client.id}-${cIdx}`}
                className="flex items-center justify-center h-20 px-8 transition-all duration-300 shrink-0 hover:scale-105"
              >
                {hasError ? (
                  // Custom ultra-high-end monogram credit block if image doesn't exist yet
                  <div className="flex flex-col items-center justify-center border border-accent/20 px-5 py-2.5 bg-primary/20 rounded">
                    <span className="font-heading font-semibold text-[10px] md:text-xs tracking-[0.25em] text-accent uppercase whitespace-nowrap">
                      {client.name}
                    </span>
                    <span className="text-[7px] text-gray-500 font-sans tracking-widest mt-1 uppercase select-none">
                      META AUDITED COMPANY
                    </span>
                  </div>
                ) : (
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} Logo`}
                    onError={() => handleImgError(client.id)}
                    referrerPolicy="no-referrer"
                    className="max-h-10 object-contain w-auto block select-none pointer-events-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
