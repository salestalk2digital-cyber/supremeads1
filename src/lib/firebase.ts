import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, Timestamp, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

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
