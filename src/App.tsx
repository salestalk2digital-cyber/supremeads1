import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSProvider } from './context/CMSContext';

// Custom layout elements
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Diverse independent page modules
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import StrategyPage from './pages/StrategyPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ClientsPage from './pages/ClientsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const [activeHash, setActiveHash] = useState('#home');
  const [loading, setLoading] = useState(true);

  // Initial luxury brand intro loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Sync state & page scroll actions with window URL Hash router
  useEffect(() => {
    if (loading) return;

    const handleHashSync = () => {
      const hash = window.location.hash || '#home';
      setActiveHash(hash);
      
      // Auto-scrolling straight back to top on pages switcher triggers real multi-page feel
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    };

    window.addEventListener('hashchange', handleHashSync);
    // Execute hash matching on mount
    handleHashSync();

    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [loading]);

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    window.location.hash = href;
  };

  // Switcher to output distinct multi-page instances
  const renderActivePage = () => {
    switch (activeHash) {
      case '#home':
        return <HomePage onNavigate={handleLinkClick} />;
      case '#about':
        return <AboutPage />;
      case '#how-it-works':
        return <HowItWorksPage />;
      case '#strategy':
        return <StrategyPage />;
      case '#services':
        return <ServicesPage />;
      case '#industries':
        return <IndustriesPage />;
      case '#case-studies':
        return <CaseStudiesPage />;
      case '#clients':
        return <ClientsPage />;
      case '#gallery':
        return <GalleryPage />;
      case '#contact':
        return <ContactPage />;
      case '#admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={handleLinkClick} />;
    }
  };

  return (
    <div id="app-container" className="relative min-h-screen bg-white font-sans text-[#111827]">
      {/* Dynamic Brand Loader Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="brand-loader"
            className="fixed inset-0 bg-primary z-[9999] flex flex-col justify-center items-center text-white"
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.3em', opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="font-heading font-semibold text-2xl md:text-3xl tracking-[0.3em]"
              >
                SUPREME<span className="text-accent">ADS</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[10px] tracking-[0.4em] uppercase font-sans font-light"
              >
                Scale Secured &bull; Creative Precision
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Layout Wrapper */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col min-h-screen"
        >
          {/* Custom stateful micro-interactive cursor */}
          <CustomCursor />

          {/* Transparent Glass Navigation */}
          <Navbar activeHash={activeHash} onLinkClick={handleLinkClick} />

          {/* Dynamic multi-page viewport container */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHash}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {renderActivePage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Core sitemapping footer */}
          <Footer onLinkClick={handleLinkClick} />

          {/* Floating instant WhatsApp coordinator */}
          <WhatsAppButton />
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
