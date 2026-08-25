import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getHeroConfig, 
  getDbCaseStudies, 
  getDbClientLogos, 
  getDbGalleryItems, 
  getDbTestimonials,
  getPublicReviews,
  addPublicReview,
  updatePublicReview,
  deletePublicReview,
  togglePublicReviewStatus,
  saveHeroConfig,
  saveCaseStudy,
  deleteCaseStudy,
  saveClientLogo,
  deleteClientLogo,
  saveGalleryItem,
  deleteGalleryItem,
  saveTestimonial,
  deleteTestimonial,
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  HeroConfig
} from '../lib/firebase';
import { 
  heroContent as defaultHero, 
  caseStudies as defaultCaseStudies, 
  clientLogos as defaultClientLogos, 
  galleryItems as defaultGalleryItems, 
  testimonialsData as defaultTestimonials 
} from '../data';
import { CaseStudy, GalleryItem, ClientLogo, Testimonial, PublicReview } from '../types';

interface CMSContextType {
  hero: HeroConfig;
  caseStudies: CaseStudy[];
  clientLogos: ClientLogo[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  publicReviews: PublicReview[];
  loading: boolean;
  userEmail: string | null;
  userName: string | null;
  refreshCMS: () => Promise<void>;
  
  // Auth actions for reviewer identification
  loginWithGoogle: () => Promise<string | null>;
  loginWithEmail: (email: string, name?: string) => void;
  logoutUser: () => Promise<void>;

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

  // Public Review actions
  submitReview: (review: Omit<PublicReview, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<string>;
  modifyReview: (id: string, review: Partial<PublicReview>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  toggleReviewVisibility: (id: string, status: 'published' | 'hidden') => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroConfig>(defaultHero);
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudy[]>(defaultCaseStudies);
  const [clientLogosList, setClientLogosList] = useState<ClientLogo[]>(defaultClientLogos);
  const [galleryItemsList, setGalleryItemsList] = useState<GalleryItem[]>(defaultGalleryItems);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(defaultTestimonials);
  const [publicReviewsList, setPublicReviewsList] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Authenticated user for reviewer verification and editing
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('supremeads_reviewer_email') || null;
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('supremeads_reviewer_name') || null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email.toLowerCase());
        setUserName(user.displayName || user.email.split('@')[0]);
        localStorage.setItem('supremeads_reviewer_email', user.email.toLowerCase());
        if (user.displayName) {
          localStorage.setItem('supremeads_reviewer_name', user.displayName);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<string | null> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user && result.user.email) {
        const email = result.user.email.toLowerCase();
        setUserEmail(email);
        setUserName(result.user.displayName || email.split('@')[0]);
        localStorage.setItem('supremeads_reviewer_email', email);
        if (result.user.displayName) {
          localStorage.setItem('supremeads_reviewer_name', result.user.displayName);
        }
        return email;
      }
      return null;
    } catch (err) {
      console.warn('Google sign-in popup error (fallback to email login):', err);
      return null;
    }
  };

  const loginWithEmail = (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setUserEmail(cleanEmail);
    localStorage.setItem('supremeads_reviewer_email', cleanEmail);
    if (name) {
      setUserName(name);
      localStorage.setItem('supremeads_reviewer_name', name);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem('supremeads_reviewer_email');
    localStorage.removeItem('supremeads_reviewer_name');
  };

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

      const dbReviews = await getPublicReviews();
      setPublicReviewsList(dbReviews);
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

  // Public Review Handlers
  const submitReview = async (review: Omit<PublicReview, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const docId = await addPublicReview(review);
    // Auto login as this reviewer email so they can edit immediately
    loginWithEmail(review.authorEmail, review.authorName);
    await refreshCMS();
    return docId;
  };

  const modifyReview = async (id: string, review: Partial<PublicReview>) => {
    await updatePublicReview(id, review);
    await refreshCMS();
  };

  const deleteReview = async (id: string) => {
    await deletePublicReview(id);
    await refreshCMS();
  };

  const toggleReviewVisibility = async (id: string, status: 'published' | 'hidden') => {
    await togglePublicReviewStatus(id, status);
    await refreshCMS();
  };

  return (
    <CMSContext.Provider value={{
      hero,
      caseStudies: caseStudiesList,
      clientLogos: clientLogosList,
      galleryItems: galleryItemsList,
      testimonials: testimonialsList,
      publicReviews: publicReviewsList,
      loading,
      userEmail,
      userName,
      refreshCMS,
      loginWithGoogle,
      loginWithEmail,
      logoutUser,
      updateHero,
      upsertCaseStudy,
      removeCaseStudy,
      upsertClientLogo,
      removeClientLogo,
      upsertGalleryItem,
      removeGalleryItem,
      upsertTestimonial,
      removeTestimonial,
      submitReview,
      modifyReview,
      deleteReview,
      toggleReviewVisibility
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

