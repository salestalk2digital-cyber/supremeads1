import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, Timestamp, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { PublicReview } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyB-WBW80GKvhYPMX0s25-qkqkc_FKVh-uM",
  authDomain: "gen-lang-client-0075670835.firebaseapp.com",
  projectId: "gen-lang-client-0075670835",
  storageBucket: "gen-lang-client-0075670835.firebasestorage.app",
  messagingSenderId: "791283285825",
  appId: "1:791283285825:web:564f050104f68f540eebc0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-665bf8be-25cb-43ce-b90e-45b6e1cae539");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut, onAuthStateChanged };
export type { User };

export interface Enquiry {
  id?: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  industry: string;
  budget: string;
  message: string;
  createdAt: any;
}

export interface HeroConfig {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  backgroundImage: string;
}

export async function addEnquiry(enquiry: Omit<Enquiry, 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...enquiry,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding enquiry to Firestore:', error);
    throw error;
  }
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const enquiries: Enquiry[] = [];
    querySnapshot.forEach((doc) => {
      enquiries.push({ id: doc.id, ...doc.data() } as Enquiry);
    });
    return enquiries;
  } catch (error) {
    console.error('Error getting enquiries from Firestore:', error);
    throw error;
  }
}

// Hero Dynamic Configs
export async function getHeroConfig(): Promise<HeroConfig | null> {
  try {
    const snap = await getDoc(doc(db, 'system', 'hero'));
    if (snap.exists()) {
      return snap.data() as HeroConfig;
    }
    return null;
  } catch (error) {
    console.error('Error fetching hero config:', error);
    return null;
  }
}

export async function saveHeroConfig(config: HeroConfig) {
  try {
    await setDoc(doc(db, 'system', 'hero'), config);
  } catch (error) {
    console.error('Error saving hero config:', error);
    throw error;
  }
}

// Case Studies
export async function getDbCaseStudies(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'case_studies'));
    const list: any[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function saveCaseStudy(id: string, study: any) {
  try {
    await setDoc(doc(db, 'case_studies', id), study);
  } catch (error) {
    console.error('Error saving case study:', error);
    throw error;
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    await deleteDoc(doc(db, 'case_studies', id));
  } catch (error) {
    console.error('Error deleting case study:', error);
    throw error;
  }
}

// Client Logos
export async function getDbClientLogos(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'client_logos'));
    const list: any[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}

export async function saveClientLogo(id: string, logo: any) {
  try {
    await setDoc(doc(db, 'client_logos', id), logo);
  } catch (error) {
    console.error('Error saving client logo:', error);
    throw error;
  }
}

export async function deleteClientLogo(id: string) {
  try {
    await deleteDoc(doc(db, 'client_logos', id));
  } catch (error) {
    console.error('Error deleting client logo:', error);
    throw error;
  }
}

// Gallery Items
export async function getDbGalleryItems(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'gallery_items'));
    const list: any[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
}

export async function saveGalleryItem(id: string, item: any) {
  try {
    await setDoc(doc(db, 'gallery_items', id), item);
  } catch (error) {
    console.error('Error saving gallery item:', error);
    throw error;
  }
}

export async function deleteGalleryItem(id: string) {
  try {
    await deleteDoc(doc(db, 'gallery_items', id));
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
}

// Testimonials
export async function getDbTestimonials(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'testimonials'));
    const list: any[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function saveTestimonial(id: string, testimonial: any) {
  try {
    await setDoc(doc(db, 'testimonials', id), testimonial);
  } catch (error) {
    console.error('Error saving testimonial:', error);
    throw error;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// PUBLIC CLIENT FEEDBACK & REVIEWS
// ---------------------------------------------------------------------------

const INITIAL_PUBLIC_REVIEWS: Omit<PublicReview, 'id'>[] = [
  {
    businessName: 'Royal Oud & Attar Co.',
    authorName: 'Mohammad Farooq',
    authorEmail: 'farooq@royaloudluxury.com',
    role: 'Managing Director',
    rating: 5,
    industry: 'Luxury Ecommerce',
    growthResult: '7.8x ROAS (₹32L+ Monthly Sales)',
    feedback: 'Supreme Ads transformed our entire Meta ad acquisition funnels. They meticulously audited our COD return issues, restructured creative angles for high-net-worth buyers, and brought our blended ROAS from 2.1x to over 7.8x consistently.',
    status: 'published',
    createdAt: new Date('2025-01-14T10:30:00Z')
  },
  {
    businessName: 'Aura Skin & Aesthetic Clinics',
    authorName: 'Dr. Shalini Verma',
    authorEmail: 'dr.shalini@auraclinics.in',
    role: 'Founder & Head Dermatologist',
    rating: 5,
    industry: 'Healthcare & Aesthetics',
    growthResult: '420+ Consultations Booked',
    feedback: 'We were struggling with high CPLs and low show-up rates from typical agency setups. Aman and his team built hyper-targeted local Meta ads with instant WhatsApp booking automation that reduced our cost per walk-in by 62%.',
    status: 'published',
    createdAt: new Date('2025-01-20T14:15:00Z')
  },
  {
    businessName: 'Apex Urban Developers',
    authorName: 'Vikramaditya Mehta',
    authorEmail: 'vikram@apexurban.com',
    role: 'Chief Marketing Officer',
    rating: 5,
    industry: 'Real Estate & Luxury Villas',
    growthResult: '₹18 Cr In Signed Inventory',
    feedback: 'Supreme Ads delivered ultra high-intent NRI and domestic luxury buyers for our high-ticket villa launches. Transparent reporting, no fluff metrics, and razor-sharp audience segmentation.',
    status: 'published',
    createdAt: new Date('2025-02-02T09:00:00Z')
  },
  {
    businessName: 'Kaveri Silk & Couture',
    authorName: 'Ananya Deshmukh',
    authorEmail: 'ananya@kavericouture.com',
    role: 'Co-Founder & Creative Lead',
    rating: 5,
    industry: 'Fashion & Apparel',
    growthResult: '4.9x ROAS & 34% Lower RTO',
    feedback: 'Their creative frameworks and hook variations are unmatched. The weekly video ad testing strategy unlocked a massive scaling phase for our festive wedding collections.',
    status: 'published',
    createdAt: new Date('2025-02-12T16:45:00Z')
  }
];

export async function getPublicReviews(): Promise<PublicReview[]> {
  try {
    const q = query(collection(db, 'public_reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews: PublicReview[] = [];
    querySnapshot.forEach((docSnap) => {
      reviews.push({ id: docSnap.id, ...docSnap.data() } as PublicReview);
    });

    // If database has no reviews yet, seed initial reviews gracefully
    if (reviews.length === 0) {
      const seeded: PublicReview[] = [];
      for (const initReview of INITIAL_PUBLIC_REVIEWS) {
        try {
          const docRef = await addDoc(collection(db, 'public_reviews'), {
            ...initReview,
            createdAt: Timestamp.fromDate(new Date(initReview.createdAt))
          });
          seeded.push({ id: docRef.id, ...initReview, createdAt: initReview.createdAt });
        } catch (e) {
          console.warn('Seeding fallback review in memory:', e);
          seeded.push({ id: 'local_' + Math.random(), ...initReview });
        }
      }
      return seeded;
    }

    return reviews;
  } catch (error) {
    console.error('Error fetching public reviews from Firestore:', error);
    return INITIAL_PUBLIC_REVIEWS.map((r, i) => ({ id: 'fallback_' + i, ...r }));
  }
}

export async function addPublicReview(review: Omit<PublicReview, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: 'published' | 'hidden' }): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'public_reviews'), {
      ...review,
      status: review.status || 'published',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting public review:', error);
    throw error;
  }
}

export async function updatePublicReview(id: string, review: Partial<PublicReview>): Promise<void> {
  try {
    const ref = doc(db, 'public_reviews', id);
    await updateDoc(ref, {
      ...review,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating public review:', error);
    throw error;
  }
}

export async function deletePublicReview(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'public_reviews', id));
  } catch (error) {
    console.error('Error deleting public review:', error);
    throw error;
  }
}

export async function togglePublicReviewStatus(id: string, newStatus: 'published' | 'hidden'): Promise<void> {
  try {
    const ref = doc(db, 'public_reviews', id);
    await updateDoc(ref, {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error toggling public review status:', error);
    throw error;
  }
}

