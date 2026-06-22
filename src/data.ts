import { CaseStudy, GalleryItem, ClientLogo, Testimonial, IndustryGroup } from './types';

export const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How Meta Ads Work', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Clients & Proof', href: '#clients' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' }
];

export const heroContent = {
  headline: 'TURN CLICKS INTO CUSTOMERS',
  subheadline: 'SUPREME ADS develops bespoke Meta advertising systems designed to deliver 10x ROAS with absolute margin precision.',
  primaryCta: 'Book Strategy Call',
  secondaryCta: 'Explore Industries',
  backgroundImage: '/images/hero_bg.jpg', // User can replace this at public/images/hero_bg.jpg
  fallbackVideo: 'https://cdn.pixabay.com/video/2019/04/12/22749-329864272_large.mp4' // Minimal dark abstract wave video as default fallback, looks incredibly premium
};

export const metricsData = [
  {
    value: '₹120 Crore+',
    label: 'Managed Ad Spend',
    description: 'Directly deployed across Meta-owned networks with extreme margin efficiency in Indian & global sectors.'
  },
  {
    value: '840+',
    label: 'Campaigns Delivered',
    description: 'Engineered from initial creative concept to scaled final customer acquisition.'
  },
  {
    value: '42',
    label: 'Industries Served',
    description: 'Custom audiences built for highly specific high-intent premium segments.'
  },
  {
    value: '10x+',
    label: 'ROAS Delivered',
    description: 'Securing heavy compounding returns through systematic, high-velocity creative testing.'
  }
];

export const whyChooseUs = [
  {
    title: 'Meta Advertising Specialists',
    description: 'We do not run generalized print or simple social media posts. We live and breathe the Meta Ads platform, understanding the algorithm to buy inventory at peak capital efficiency.'
  },
  {
    title: 'Creative Testing Framework',
    description: 'We run a systematic high-velocity testing protocol. We test concepts, angles, hooks, and static vs. cinematic video formats to mathematically define winning creatives.'
  },
  {
    title: 'Conversion Optimization',
    description: 'A great ad fails on a poor landing page. We design high-converting, blazing-fast funnels and feedback pipelines to turn fleeting ad clicks into dedicated customer actions.'
  },
  {
    title: 'Advanced Audience Research',
    description: 'We go beyond basic age and country criteria. We perform aggressive psychological profiling, competitor analysis, and custom source mapping to target gold-status buyer groups.'
  },
  {
    title: 'Pixel Tracking & Custom CAPI',
    description: 'Our proprietary Meta Conversions API (CAPI) and Advanced Matching protocols ensure zero data loss in a post-iOS14 world, allowing the campaign algorithm to learn precisely.'
  },
  {
    title: 'Retargeting Funnels',
    description: 'We orchestrate multi-touch retargeting sequences. We serve testimonials, objection-handlers, and targeted offers to maximize the value of cold awareness clicks.'
  },
  {
    title: 'WhatsApp Lead Automation',
    description: 'We integrate immediate direct-response WhatsApp automations, instant follow-up triggers, CRM tracking, and booking calendars to capitalize on fresh lead momentum.'
  },
  {
    title: 'Campaign Monitoring',
    description: 'Hourly tracking of key cost vectors, CPM health, CTR degradation, and frequency caps. We prune cold creatives before they eat away your scaling budget.'
  },
  {
    title: 'Transparent Reporting',
    description: 'No vanity stats. We report on true cost-per-acquisition, total pipeline revenue, true margin ROAS, and net leads in our live-synced client analytics command center.'
  },
  {
    title: 'Dedicated Account Management',
    description: 'Direct Slack integrations, weekly performance sprints, and monthly strategy retrospectives with certified Meta Ads architects. No junior hand-offs ever.'
  }
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'A comprehensive evaluation of your business model, customer margins, historical performance data, tracking infrastructure, and true unit economics.'
  },
  {
    step: '02',
    title: 'Research',
    description: 'We audit your leading global competitors, scrap reviews, extract deep customer pain points, and define precise avatar profiles that resonate.'
  },
  {
    step: '03',
    title: 'Creative Strategy',
    description: 'Our studios build premium, scroll-stopping visual mockups, high-end copy variations, and localized video structures tailored for high Meta engagement.'
  },
  {
    step: '04',
    title: 'Campaign Launch',
    description: 'We execute high-grain CBO and ABO campaign groupings, configuring pixel APIs, custom conversion events, and pristine demographic guardrails.'
  },
  {
    step: '05',
    title: 'Optimization',
    description: 'We run statistical tests on active audiences, trim underperforming placements, scale lookalikes, and constantly elevate our winning creative angles.'
  },
  {
    step: '06',
    title: 'Scaling',
    description: 'With clear statistical validation, we aggressively allocate capital into high-converting pools, expanding horizontally and bidding vertically for market dominance.'
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    category: 'Real Estate & Infrastructure',
    icon: 'Building2',
    items: [
      'Real Estate Developers (High-rise residential, commercial properties)',
      'Premium Builders & Land developers',
      'Exclusive Channel Partners & Agencies',
      'Luxury Property Consultants & Private Brokers'
    ]
  },
  {
    category: 'Weddings & Celebrations',
    icon: 'GlassWater',
    items: [
      'Premium Event Planners',
      'High-end Wedding Organizers',
      'Luxury Destination Wedding Curators'
    ]
  },
  {
    category: 'B2B & Industrial Scale',
    icon: 'Factory',
    items: [
      'Quality Manufacturers looking for regional buyers',
      'Global Exporters & Trading Hubs',
      'Industrial Suppliers & Equipment Providers'
    ]
  },
  {
    category: 'Fragrances & Luxury B2C',
    icon: 'Sparkles',
    items: [
      'Premium Perfume Brands',
      'Premium Attar Sellers',
      'Luxury Fragrance Companies & Distillers',
      'Boutique Owners & Niche Fashion Labels',
      'High-End Fashion Designers & Atelier Outlets',
      'Heritage Ethnic Wear Stores'
    ]
  },
  {
    category: 'Entertainment & Private Cinemas',
    icon: 'Film',
    items: [
      'Luxury Private Theatre Designers',
      'Mini Cinema Operators & Visual-Acoustic Studios'
    ]
  },
  {
    category: 'Beauty, Salon & Luxury Studios',
    icon: 'Scissors',
    items: [
      'Celebrity Makeup Artists & Bridal Stylists',
      'Elite Salon Owners & Luxury Medspas',
      'Premium Beauty Studios'
    ]
  },
  {
    category: 'Premium Academics & Institutions',
    icon: 'GraduationCap',
    items: [
      'Professional Coaching Institutes',
      'Language Academies & Linguistic Centers',
      'Overseas IELTS Training Centers',
      'Selective Schools & Modern Educational Systems'
    ]
  },
  {
    category: 'Healthcare, Labs & Clinics',
    icon: 'Activity',
    items: [
      'Aesthetic & Multi-Specialist Hospitals',
      'Surgical Clinics & Specialized Practices',
      'State-of-the-Art Diagnostic Labs'
    ]
  },
  {
    category: 'Premium Automobile Ventures',
    icon: 'CarFront',
    items: [
      'Authorized Luxury Automobile Dealers',
      'Premium Second-Hand Car Brokers',
      'Luxury Pre-Owned Car Salons',
      'High-End Car Detailing Studios',
      'Ceramic Coating Centers & Premium Garages'
    ]
  },
  {
    category: 'Ecommerce & D2C Brands',
    icon: 'ShoppingBag',
    items: [
      'Scale-oriented Ecommerce Brands',
      'Digital-Native D2C Labels',
      'Exclusive Jewellery Stores',
      'Designer Home Decor Brands',
      'Curated Consumer Electronics Shops'
    ]
  },
  {
    category: 'Food, Beverage & Hospitality',
    icon: 'UtensilsCrossed',
    items: [
      'Elite Fine Dining Restaurants',
      'Premium Cloud Kitchen Networks',
      'Boutique Cafes & Roasteries'
    ]
  },
  {
    category: 'Professional Advisory & Consultancy',
    icon: 'Briefcase',
    items: [
      'Architects & Luxury Interior Designers',
      'Corporate Legal Consultants & Firms',
      'Wealth & Financial Advisors',
      'Commercial Insurance Consultants',
      'CA Firms & Global Audit Desks',
      'Premium Study Abroad Advisors'
    ]
  },
  {
    category: 'Lifestyle, Leisure & Retail',
    icon: 'Compass',
    items: [
      'Curated Travel Agencies & Destination Clubs',
      'Fitness Centers, Premium Crossfit & Gyms',
      'Boutique Pet Stores',
      'Premium Pet Grooming Salons',
      'Designer Furniture Showrooms',
      'Elite Electronics Boutiques',
      'Luxury Watch Dealers & Collectors'
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    industry: 'Real Estate Developer',
    title: 'Acquiring Verified High-Net-Worth Residential Leads',
    campaignObjective: 'Qualified Lead Generation for Luxury Penthouses',
    adSpend: '₹20,00,000',
    qualifiedLeads: '512 (HNW buyers)',
    costPerLead: '₹3,900',
    roas: '10.8x (Attributed)',
    challenge: 'Targeting true high-net-worth buyers in an overcrowded urban market without wasting budget on speculative clickers.',
    solution: 'Designed and deployed a multi-stage Meta Ads funnel syncing custom demographic overlays with zero-friction direct lead forms and CRM checks.',
    results: [
      '512 verified leads with verified asset size and active mobile numbers',
      '₹20 Lakhs total budget parsed, securing ₹2.16 Crore+ in immediate booking sales',
      'Overall cost per call booked reduced by 41% against past digital benchmarks'
    ],
    image: '/case-studies/real_estate.jpg' // Fallback handled gracefully in UI
  },
  {
    id: 'cs2',
    industry: 'Luxury Fragrance Brand',
    title: 'Scaling Gold-Standard Attar Sales Online',
    campaignObjective: 'Direct Purchase Conversion Scaling',
    adSpend: '₹14,20,000',
    qualifiedLeads: 'N/A (6,420 direct orders)',
    costPerLead: 'N/A (Average CAC: ₹221)',
    roas: '10.1x',
    challenge: 'Dribbling through severe direct-response competition while maintaining the high-margin, elite luxury cachet of premium French/Arabic fragrance collections.',
    solution: 'Engineered a creative-led approach focusing on premium close-up videos, atmospheric reviews, and custom mobile checkout funnels designed to convert on first screen.',
    results: [
      '6,420 verified luxury-tier purchases with zero brand erosion',
      'Increased repeat customer buying rate by 24% via custom post-purchase retargeting',
      'Maintained stable top-of-funnel ROAS close to 10.1x during premium sales events'
    ],
    image: '/case-studies/perfume.jpg'
  },
  {
    id: 'cs3',
    industry: 'Luxury Automobile detailing',
    title: 'Monopolizing High-Ticket Ceramic Coating Bookings',
    campaignObjective: 'Instant Booking & High-Intent Calling Campaigns',
    adSpend: '₹6,80,000',
    qualifiedLeads: '184 Premium Bookings',
    costPerLead: '₹3,690',
    roas: '10.2x',
    challenge: 'A localized service area requiring high average order value (₹1,20,000+) ceramic coating and interior detailing bookings.',
    solution: 'Deployed a WhatsApp Direct routing structure coupled with crisp, high-definition before/after cinematic videos showcasing paint correction results.',
    results: [
      '184 ceramic coating applications booked and executed in 60 days',
      'Boosted direct WhatsApp conversation-to-booking rate to 38%',
      'Acquired prime high-value audience profiles that unlocked ₹68,00,000+ in revenue'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
  }
];

export const clientLogos: ClientLogo[] = [
  { id: 'logo1', name: 'Al-Haramain Perfumes', logoUrl: '/clients/logo1.png' },
  { id: 'logo2', name: 'Zircon Real Estate', logoUrl: '/clients/logo2.png' },
  { id: 'logo3', name: 'Vanguard Builders', logoUrl: '/clients/logo3.png' },
  { id: 'logo4', name: 'Atelier Couture', logoUrl: '/clients/logo4.png' },
  { id: 'logo5', name: 'Oud & Amber Co', logoUrl: '/clients/logo5.png' },
  { id: 'logo6', name: 'Horizon Developers', logoUrl: '/clients/logo6.png' },
  { id: 'logo7', name: 'The Private Theatre Group', logoUrl: '/clients/logo7.png' },
  { id: 'logo8', name: 'Precision Detailing Co', logoUrl: '/clients/logo8.png' }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal1',
    category: 'creatives',
    title: 'Premium Cosmetic Static Ad Layout',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal2',
    category: 'campaign-results',
    title: 'Meta Ads Manager Scaled Framework',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal3',
    category: 'office',
    title: 'Supreme Ads Creative Collaboration Lab',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal4',
    category: 'events',
    title: 'Exclusive High-Performance Masterclass 2026',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal5',
    category: 'ads',
    title: 'Real Estate Cinematic Scroll-Stopper',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal6',
    category: 'clients',
    title: 'Strategic Onsite Revenue Audit',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal7',
    category: 'creatives',
    title: 'Minimalist Premium Watch Banner',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gal8',
    category: 'office',
    title: 'Data-Screen Integration Lounge',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote: 'SUPREME ADS completely restructured our customer acquisition channel on Meta. We were struggling to clear a 1.8x ROAS benchmark due to severe tracking leaks. Within 45 days of deploying their Creative Testing Framework and Conversion API integration, our performance stabilized at a 4.2x ROAS on higher scale.',
    author: 'Tariq Al-Aboodi',
    role: 'Founder & CEO',
    company: 'Al-Aboodi Luxury Fragrances',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 't2',
    quote: 'Our team was skeptical about outsourcing Meta lead generation for our premium villas. Most agencies send low-intent clicks that clog up our sales pipeline. SUPREME ADS custom direct-response forms combined with WhatsApp instant qualification filtered out unqualified buyers entirely. $24.5k ad spend netted $270k+ in true closed commission value.',
    author: 'Sarah Jenkins',
    role: 'Director of Marketing',
    company: 'Vanguard Luxury Penthouses',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 't3',
    quote: 'They are not an agency that sends pretty mood boards without conversion tracking. Their transparent reporting dashboard pulls directly from our stripe accounts, mapping every single purchase back to the specific creative angle. The dedicated Slack updates and weekly sprints make them act like an elite in-house department rather than a distant vendor.',
    author: 'Rajeev Mehta',
    role: 'Marketing Head',
    company: 'Deccan Craft Jewellery',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  }
];
