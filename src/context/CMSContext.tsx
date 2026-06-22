import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getHeroConfig, 
  getDbCaseStudies, 
  getDbClientLogos, 
  getDbGalleryItems, 
  getDbTestimonials,
  saveHeroConfig,
  saveCaseStudy,
  deleteCaseStudy,
  saveClientLogo,
  deleteClientLogo,
  saveGalleryItem,
  deleteGalleryItem,
  saveTestimonial,
  deleteTestimonial,
  HeroConfig
} from '../lib/firebase';
import { 
  heroContent as defaultHero, 
  caseStudies as defaultCaseStudies, 
  clientLogos as defaultClientLogos, 
  galleryItems as defaultGalleryItems, 
  testimonialsData as defaultTestimonials 
} from '../data';
import { CaseStudy, GalleryItem, ClientLogo, Testimonial } from '../types';

interface CMSContextType {
  hero: HeroConfig;
  caseStudies: CaseStudy[];
  clientLogos: ClientLogo[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  loading: boolean;
  refreshCMS: () => Promise<void>;
  
  // Update actions
  updateHero: (config: HeroConfig) => Promise<void>;
  upsertCaseStudy: (id: string, study: Omit<CaseStudy, 'id'>) => Promise<void>;
  removeCaseStudy: (id: string) => Promise<void>;
  upsertClientLogo: (id: string, logo: Omit<ClientLogo, 'id'>) => Promise<void>;
  removeClientLogo: (id: string) => Promise<void>;
  upsertGalleryItem: (id: string, item: Omit<GalleryItem, 'id'>) => Promise<void>;
  removeGalleryItem: (id: string) => Promise<void>;
  upsertTestimonial: (id: string, testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  removeTestimonial: (id: string) => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroConfig>(defaultHero);
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudy[]>(defaultCaseStudies);
  const [clientLogosList, setClientLogosList] = useState<ClientLogo[]>(defaultClientLogos);
  const [galleryItemsList, setGalleryItemsList] = useState<GalleryItem[]>(defaultGalleryItems);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  const refreshCMS = async () => {
    setLoading(true);
    try {
      const dbHero = await getHeroConfig();
      if (dbHero) {
        setHero({ ...defaultHero, ...dbHero });
      }

      const dbCaseStudies = await getDbCaseStudies();
      if (dbCaseStudies && dbCaseStudies.length > 0) {
        setCaseStudiesList(dbCaseStudies);
      } else {
        setCaseStudiesList(defaultCaseStudies);
      }

      const dbLogos = await getDbClientLogos();
      if (dbLogos && dbLogos.length > 0) {
        setClientLogosList(dbLogos);
      } else {
        setClientLogosList(defaultClientLogos);
      }

      const dbGallery = await getDbGalleryItems();
      if (dbGallery && dbGallery.length > 0) {
        // Map any string-union types appropriately or default it safely
        setGalleryItemsList(dbGallery as GalleryItem[]);
      } else {
        setGalleryItemsList(defaultGalleryItems);
      }

      const dbTestimonials = await getDbTestimonials();
      if (dbTestimonials && dbTestimonials.length > 0) {
        setTestimonialsList(dbTestimonials);
      } else {
        setTestimonialsList(defaultTestimonials);
      }
    } catch (error) {
      console.error('Error refreshing CMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCMS();
  }, []);

  const updateHero = async (config: HeroConfig) => {
    await saveHeroConfig(config);
    setHero(config);
  };

  const upsertCaseStudy = async (id: string, study: Omit<CaseStudy, 'id'>) => {
    const studyObj = { ...study };
    await saveCaseStudy(id, studyObj);
    await refreshCMS();
  };

  const removeCaseStudy = async (id: string) => {
    await deleteCaseStudy(id);
    await refreshCMS();
  };

  const upsertClientLogo = async (id: string, logo: Omit<ClientLogo, 'id'>) => {
    const logoObj = { ...logo };
    await saveClientLogo(id, logoObj);
    await refreshCMS();
  };

  const removeClientLogo = async (id: string) => {
    await deleteClientLogo(id);
    await refreshCMS();
  };

  const upsertGalleryItem = async (id: string, item: Omit<GalleryItem, 'id'>) => {
    const itemObj = { ...item };
    await saveGalleryItem(id, itemObj);
    await refreshCMS();
  };

  const removeGalleryItem = async (id: string) => {
    await deleteGalleryItem(id);
    await refreshCMS();
  };

  const upsertTestimonial = async (id: string, testimonial: Omit<Testimonial, 'id'>) => {
    const testObj = { ...testimonial };
    await saveTestimonial(id, testObj);
    await refreshCMS();
  };

  const removeTestimonial = async (id: string) => {
    await deleteTestimonial(id);
    await refreshCMS();
  };

  return (
    <CMSContext.Provider value={{
      hero,
      caseStudies: caseStudiesList,
      clientLogos: clientLogosList,
      galleryItems: galleryItemsList,
      testimonials: testimonialsList,
      loading,
      refreshCMS,
      updateHero,
      upsertCaseStudy,
      removeCaseStudy,
      upsertClientLogo,
      removeClientLogo,
      upsertGalleryItem,
      removeGalleryItem,
      upsertTestimonial,
      removeTestimonial
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
