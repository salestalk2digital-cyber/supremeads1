import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  path: string;
}

export default function SEO({ title, description, keywords, path }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanPath = path.startsWith('#') ? path : `#${path}`;
    canonicalLink.setAttribute('href', `https://supremeads.agency/${cleanPath}`);

    // 5. Update Open Graph (OG) Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': `https://supremeads.agency/${cleanPath}`,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 6. Update Twitter Card Tags
    const twitterTags = {
      'twitter:title': title,
      'twitter:description': description,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

  }, [title, description, keywords, path]);

  return null;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
}

export const SEO_CONFIG: Record<string, SEOMetadata> = {
  '#home': {
    title: 'Supreme Ads — Elite Meta Ads & High-Intent Lead Generation Agency',
    description: 'Supreme Ads is an elite performance agency engineering data-backed Meta structures. We build scalable, high-intent lead generation pipelines designed to deliver peak sales growth and margin scale.',
    keywords: 'Meta Ads, Lead Generation, Facebook Ads, Instagram Advertising, Sales Growth, Customer Acquisition, Premium Leads, Performance Marketing, Dynamic Ads Blueprint'
  },
  '#about': {
    title: 'About Us — Supreme Ads | The Performance Engineering Experts',
    description: 'Meet the team behind Supreme Ads. We are performance engineers, copywriters, and media buyers who scale businesses using rigorous testing and scientific lead pipelines.',
    keywords: 'Supreme Ads Team, Performance Marketing Agency, Lead Gen Experts, Meta Ads Specialists, Scientific Advertising'
  },
  '#how-it-works': {
    title: 'How It Works — Scalable Multi-Stage Acquisition | Supreme Ads',
    description: 'Discover our scientific 4-step performance formula. We handle audience modeling, creative iteration, funnel testing, and real-time optimization to maximize your advertising ROI.',
    keywords: 'Meta Funnel Optimization, Creative Testing, Scaled Lead Acquisition, Audience Modeling Process'
  },
  '#strategy': {
    title: 'Strategic Performance & Media Blueprint — Supreme Ads',
    description: 'Explore our proprietary advertising blueprints. We build custom funnels that pre-qualify prospects, eliminate low-intent clicks, and feed your CRM with high-value clients.',
    keywords: 'CRM Lead Pipeline, Custom Sales Funnel, Facebook Funnels, High Intent Audience Targeting'
  },
  '#services': {
    title: 'Our Services — Custom Meta Creative, Copy & Funnel Design | Supreme Ads',
    description: 'Explore our core performance services: High-conversion copy, automated lead-nurturing funnels, predictive custom audience modeling, and hyper-targeted campaign setups.',
    keywords: 'Copywriting for Facebook, Automated Lead Nurturing, Meta Creative Production, Campaign Media Buying'
  },
  '#industries': {
    title: 'Industries We Scale — Real Estate, B2B, Finance & Services | Supreme Ads',
    description: 'Bespoke lead acquisition tailored for your industry. We build optimized vertical campaigns for Real Estate brokers, High-Ticket B2B, Financial Services, and local business consulting.',
    keywords: 'Real Estate Lead Generation, B2B Meta Ads, High-Ticket Lead Sourcing, Financial Service Leads'
  },
  '#case-studies': {
    title: 'Our Case Studies — 5.8x Avg ROAS & Verified Revenue Growth | Supreme Ads',
    description: 'Browse real audited case studies and performance reports from Meta Ads Manager. See how we scaled real estate developers, local clinics, and SaaS providers.',
    keywords: 'ROAS Case Studies, Marketing Proof, Client Success Stories, Meta Ads Campaign Results'
  },
  '#clients': {
    title: 'Client Reviews & Direct Dashboard Proof — Supreme Ads',
    description: 'Read real, verified reviews from business owners, founders, and marketing directors. See the metrics directly from active client ad dashboards.',
    keywords: 'Supreme Ads Reviews, Marketing Agency Testimonials, Client Success Stories'
  },
  '#gallery': {
    title: 'Creative Portfolio & Ads Showcase — Supreme Ads',
    description: 'Step inside our performance creative portfolio. High-click rate visual hooks, scroll-stopping videos, and psychological copywriting that converts cold traffic.',
    keywords: 'Ad Creative Portfolio, Copywriting Examples, High CTR Video Ads, Scroll Stopper Hooks'
  },
  '#contact': {
    title: 'Claim Your Free Meta Ads Audit & Action Plan | Supreme Ads',
    description: 'Ready to eliminate wasted ad spend? Book a free 30-minute campaign audit and custom lead-acquisition blueprint session with our senior strategist today.',
    keywords: 'Free Meta Ads Audit, High-Intent Lead Strategy, Marketing Consultation, Book Ads Agency'
  },
  '#privacy': {
    title: 'Privacy Policy & Data Security — Supreme Ads',
    description: 'Your data protection is our highest priority. Read our privacy policy to understand how we store, handle, and secure client and prospect information.',
    keywords: 'Privacy Policy, Data Retention, Lead Information Security'
  },
  '#privacy-policy': {
    title: 'Privacy Policy & Data Security — Supreme Ads',
    description: 'Your data protection is our highest priority. Read our privacy policy to understand how we store, handle, and secure client and prospect information.',
    keywords: 'Privacy Policy, Data Retention, Lead Information Security'
  },
  '#admin': {
    title: 'Admin Command Desk — Supreme Ads',
    description: 'Secure authentication terminal for senior agency consultants and campaigns performance control.',
    keywords: 'Admin Terminal, Campaign Monitoring, Client Roster'
  }
};

export function AppSEO({ activeHash }: { activeHash: string }) {
  const config = SEO_CONFIG[activeHash] || SEO_CONFIG['#home'];
  return (
    <SEO
      title={config.title}
      description={config.description}
      keywords={config.keywords}
      path={activeHash}
    />
  );
}
