export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  campaignObjective: string;
  adSpend: string;
  qualifiedLeads: string;
  costPerLead: string;
  roas: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  category: 'events' | 'ads' | 'creatives' | 'campaign-results' | 'office' | 'clients';
  title: string;
  image: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface PublicReview {
  id: string;
  businessName: string;
  authorName: string;
  authorEmail: string;
  role: string;
  rating: number;
  industry: string;
  growthResult: string;
  feedback: string;
  avatarUrl?: string;
  status: 'published' | 'hidden';
  createdAt: any;
  updatedAt?: any;
}

export interface IndustryGroup {
  category: string;
  icon: string;
  items: string[];
}
