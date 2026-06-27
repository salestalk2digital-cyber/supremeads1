import { CaseStudy, GalleryItem, ClientLogo, Testimonial, IndustryGroup } from './types';

export const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How Meta Ads Work', href: '#how-it-works' },
  { label: 'Strategy Planner', href: '#strategy' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Clients & Proof', href: '#clients' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' }
];

export const heroContent = {
  headline: 'TURN CLICKS INTO CUSTOMERS',
  subheadline: 'Supreme Ads helps businesses attract the right customers through audience research, competitor analysis, creative strategy and performance-driven Meta advertising. For ecommerce brands, we also provide guidance on COD workflows, delivery setup and operational best practices to support long-term growth.',
  primaryCta: 'Book Strategy Call',
  secondaryCta: 'Explore Industries',
  backgroundImage: '/images/hero_bg.jpg', // User can replace this at public/images/hero_bg.jpg
  fallbackVideo: 'https://cdn.pixabay.com/video/2019/04/12/22749-329864272_large.mp4' // Minimal dark abstract wave video as default fallback, looks incredibly premium
};

export const metricsData = [
  {
    value: '₹1 Cr+',
    label: 'Manage Ad Spends',
    description: 'Directly deployed across Meta-owned networks with extreme margin efficiency in Indian & global sectors.'
  },
  {
    value: '100+',
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
    title: 'Product Analysis Before Advertising',
    description: 'Every business is different. We study your product or service in detail to understand your pricing, location, strengths, offers and unique selling points before launching any campaigns.'
  },
  {
    title: 'Audience Research',
    description: 'Finding the right customer is more important than reaching random crowds. We identify exactly who is most likely to buy from you based on income profile, age group, buying behaviour, interests, and location.'
  },
  {
    title: 'Competitor Advertisement Study',
    description: 'We analyse your competitors and understand what is already working in your industry, studying their advertisements, landing pages, and lead forms to create campaigns that stand out.'
  },
  {
    title: 'Creative Suggestions',
    description: 'We help you understand what type of content performs best, providing guidance on video shoot concepts, walkthroughs, product showcases, reels, and customer testimonial concepts.'
  },
  {
    title: 'Meta Campaign Management',
    description: 'Performance-focused campaigns built with advanced CBO/ABO structures and pixel integration. We optimize your campaigns daily to maximize order volume and lead quality.'
  },
  {
    title: 'Retargeting Strategies',
    description: 'We implement systematic retargeting funnels to bring back warm prospects, serving testimonials, objection-handlers, and targeted offers to maximize your conversion rate.'
  },
  {
    title: 'Ecommerce Operations Guidance',
    description: 'For ecommerce brands, we provide strategic operational support. We guide your team on order management workflows, RTO reduction, and order processing to support long-term growth.'
  },
  {
    title: 'COD Workflow Guidance',
    description: 'We offer suggestions to optimize your cash-on-delivery workflows, order confirmation procedures, and customer validation protocols to reduce fake orders and cancellations.'
  },
  {
    title: 'Delivery Setup Support',
    description: 'Strategic guidance on shipping configurations, courier partner selection, and fulfillment workflows to streamline your delivery pipeline and improve customer satisfaction.'
  },
  {
    title: 'Transparent Reporting',
    description: 'No vanity metrics. We report on true cost-per-acquisition, net qualified leads, and actual return on ad spend (ROAS) in our live-synced client analytics command center.'
  },
  {
    title: 'Dedicated Support Team',
    description: 'Direct communication channels, regular performance sprints, and monthly strategy updates with certified Meta Ads strategists. No junior hand-offs ever.'
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
    industry: 'Real Estate',
    title: 'Acquiring Qualified Real Estate Buyers with 1 Lakh Campaign Spend',
    campaignObjective: 'High-Intent Leads & Site Visits for Premium Properties',
    adSpend: '₹1,00,000 (1 Lakh)',
    qualifiedLeads: '450 Leads',
    costPerLead: '₹222',
    roas: '70+ Site Visits Verified',
    challenge: 'Generating highly responsive buyers who actually convert to physical site visits instead of casual browser clicks.',
    solution: 'Engineered highly local and micro-targeted custom audiences coupled with a strict two-step telephone verification and instant WhatsApp scheduling.',
    results: [
      '450 raw lead contacts generated at a highly optimized CPL',
      '150 to 170 highly qualified potential leads filtered via validation',
      '70+ physical site visits executed by verified prospects'
    ],
    image: '/case-studies/real_estate.jpg'
  },
  {
    id: 'cs2',
    industry: 'High Class Event Management',
    title: 'Scaling Premium Event Bookings on a 50K Monthly Budget',
    campaignObjective: 'Lead Generation and Direct Booking Conversions',
    adSpend: '₹50,000 (50K)',
    qualifiedLeads: '350 Leads',
    costPerLead: '₹142',
    roas: '25x ROAS Minimum',
    challenge: 'Acquiring high-budget hosts for upscale social gatherings, weddings, and premium corporate galas under strict local filters.',
    solution: 'Deployed cinematic short-form video walk-throughs of actual premium events paired with custom lead forms that capture event size and guest counts.',
    results: [
      '350 premium booking leads generated in a single month',
      'Stable, validated conversion pipeline ensuring qualified enquiries',
      'Delivered 25x minimum return on advertising spend (ROAS) directly attributed'
    ],
    image: '/case-studies/perfume.jpg'
  },
  {
    id: 'cs3',
    industry: 'Private Theater',
    title: 'Generating 3,000 Monthly Leads & 300+ Bookings for Private Cinema',
    campaignObjective: 'High-Volume Ticket Sales & Group Bookings',
    adSpend: '₹75,000 (75K)',
    qualifiedLeads: '3,000 Leads',
    costPerLead: '₹25',
    roas: '15x+ ROAS',
    challenge: 'Filling weekday and weekend slots for high-end boutique private theater reservations with predictable booking velocity.',
    solution: 'Engineered an automated WhatsApp chatbot funnel triggered directly from Meta scroll-stopping video ads, allowing instant bookings.',
    results: [
      '3,000 highly engaged leads captured in a single month',
      '300+ guaranteed minimum bookings verified and reserved',
      'Maximized weekly theater occupancy rate to a record 94%'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cs4',
    industry: 'Lady Boutique',
    title: 'Boosting High-End Fashion Sales to 1.5 Lakhs on a 20k Budget',
    campaignObjective: 'Direct Fashion Purchase & Catalog Sales',
    adSpend: '₹20,000 (20K)',
    qualifiedLeads: 'N/A (Direct Sales)',
    costPerLead: 'N/A',
    roas: '7.5x ROAS Minimum',
    challenge: 'Scaling catalog purchases for high-margin, boutique lady wear and customized apparel on a minimal starting spend.',
    solution: 'Configured Carousel Ads showcasing detailed fabric premium textures combined with retargeting custom lookalike fashion audiences.',
    results: [
      'Delivered ₹1,50,000 (1.5 Lakh) minimum monthly sales',
      'Achieved an outstanding 7.5x minimum Return on Ad Spend (ROAS)',
      'Secured high recurring buyer rate of 34% within the same month'
    ],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
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
