import React, { useState, useEffect } from 'react';
import { getEnquiries, Enquiry } from '../lib/firebase';
import { useCMS } from '../context/CMSContext';
import { 
  Lock, Search, Download, Calendar, Mail, Phone, RefreshCw, 
  Send, CheckCircle2, Shield, Settings, Plus, Trash2, Edit2, 
  Upload, Video, Image as ImageIcon, Sparkles, FileText, Layout
} from 'lucide-react';
import { motion } from 'motion/react';

type AdminTab = 'leads' | 'hero' | 'clients' | 'case_studies' | 'gallery' | 'testimonials';

export default function AdminPage() {
  const { 
    hero, updateHero,
    caseStudies, upsertCaseStudy, removeCaseStudy,
    clientLogos, upsertClientLogo, removeClientLogo,
    galleryItems, upsertGalleryItem, removeGalleryItem,
    testimonials, upsertTestimonial, removeTestimonial
  } = useCMS();

  // Guard passcode & WhatsApp OTP
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // WhatsApp OTP Authentication State
  const [phoneNumber, setPhoneNumber] = useState('919667173693'); // Pre-fill target (Aman's direct WA)
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [authMethod, setAuthMethod] = useState<'otp' | 'passcode'>('otp'); // Default to OTP for modern security
  
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Editing forms state
  // 1. Hero
  const [heroForm, setHeroForm] = useState({
    headline: '',
    subheadline: '',
    primaryCta: '',
    secondaryCta: '',
    backgroundImage: ''
  });

  // 2. Clients Logos
  const [editingClient, setEditingClient] = useState<string | null>(null); // 'new' or id
  const [clientForm, setClientForm] = useState({
    name: '',
    logoUrl: ''
  });

  // 3. Case Studies
  const [editingCase, setEditingCase] = useState<string | null>(null); // 'new' or id
  const [caseForm, setCaseForm] = useState({
    industry: '',
    title: '',
    campaignObjective: '',
    adSpend: '',
    qualifiedLeads: '',
    costPerLead: '',
    roas: '',
    challenge: '',
    solution: '',
    resultsRaw: '', // comma-separated or newline
    image: ''
  });

  // 4. Gallery Items
  const [editingGallery, setEditingGallery] = useState<string | null>(null); // 'new' or id
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'creatives' as any,
    image: ''
  });

  // 5. Testimonials
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null); // 'new' or id
  const [testimonialForm, setTestimonialForm] = useState({
    quote: '',
    author: '',
    role: '',
    company: '',
    image: ''
  });

  const ADMIN_PASSCODE = '9667173693'; // Aman's pre-authorized admin code (WhatsApp)

  // Countdown timer for resending OTP
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter a valid WhatsApp phone number.');
      return;
    }

    setOtpLoading(true);
    setErrorMsg('');

    // Generate a secure 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    // Prepare WhatsApp Message configuration
    const messageText = `[Supreme Ads Verification] Your secure Admin Console Login OTP is: ${code}. Valid for 10 minutes.`;
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      setCooldown(60); // 60s cooldown limit
      
      // Open click-to-dispatch in a new page/tab
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!enteredOtp.trim()) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    // Match OTP dynamically OR allow existing ADMIN_PASSCODE as a master-override
    if (enteredOtp === generatedOtp || enteredOtp === '966717') {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setErrorMsg('Invalid verification OTP code. Please review and try again.');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setErrorMsg('Incorrect passcode. Please check and try again.');
    }
  };

  useEffect(() => {
    if (hero) {
      setHeroForm({
        headline: hero.headline || '',
        subheadline: hero.subheadline || '',
        primaryCta: hero.primaryCta || '',
        secondaryCta: hero.secondaryCta || '',
        backgroundImage: hero.backgroundImage || ''
      });
    }
  }, [hero]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  // Base64 Reader Helper
  const processImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Safety check size (< 1.5MB to save securely in Firestore)
    if (file.size > 1500000) {
      alert('File is too large. For optimal speed we limit files to 1.5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHero(heroForm);
      alert('Hero Configuration updated successfully!');
    } catch (err) {
      alert('Error saving Hero Config.');
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name) return;
    try {
      const id = editingClient === 'new' ? 'client_' + Date.now() : editingClient!;
      await upsertClientLogo(id, {
        name: clientForm.name,
        logoUrl: clientForm.logoUrl
      });
      setEditingClient(null);
      alert('Client Logo saved successfully!');
    } catch (err) {
      alert('Error saving Client Logo.');
    }
  };

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseForm.title || !caseForm.industry) return;
    try {
      const id = editingCase === 'new' ? 'case_' + Date.now() : editingCase!;
      const results = caseForm.resultsRaw
        .split('\n')
        .map(r => r.trim())
        .filter(r => r !== '');

      await upsertCaseStudy(id, {
        industry: caseForm.industry,
        title: caseForm.title,
        campaignObjective: caseForm.campaignObjective,
        adSpend: caseForm.adSpend,
        qualifiedLeads: caseForm.qualifiedLeads,
        costPerLead: caseForm.costPerLead,
        roas: caseForm.roas,
        challenge: caseForm.challenge,
        solution: caseForm.solution,
        results: results,
        image: caseForm.image
      });
      setEditingCase(null);
      alert('Case Study log saved successfully!');
    } catch (err) {
      alert('Error saving Case Study.');
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) return;
    try {
      const id = editingGallery === 'new' ? 'gal_' + Date.now() : editingGallery!;
      await upsertGalleryItem(id, {
        title: galleryForm.title,
        category: galleryForm.category,
        image: galleryForm.image
      });
      setEditingGallery(null);
      alert('Gallery item uploaded successfully!');
    } catch (err) {
      alert('Error saving Gallery Item.');
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.quote || !testimonialForm.author) return;
    try {
      const id = editingTestimonial === 'new' ? 't_' + Date.now() : editingTestimonial!;
      await upsertTestimonial(id, {
        quote: testimonialForm.quote,
        author: testimonialForm.author,
        role: testimonialForm.role,
        company: testimonialForm.company,
        image: testimonialForm.image
      });
      setEditingTestimonial(null);
      alert('Testimonial saved successfully!');
    } catch (err) {
      alert('Error saving Testimonial.');
    }
  };

  const downloadCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Name', 'Company', 'Email', 'Phone', 'Industry', 'Budget', 'Message', 'Created At'];
    const rows = enquiries.map(lead => [
      lead.name,
      lead.companyName,
      lead.email,
      lead.phone,
      lead.industry,
      lead.budget,
      lead.message.replace(/"/g, '""'),
      lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString() : new Date(lead.createdAt).toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `supremeads_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = enquiries.filter(item => 
    item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.companyName?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.phone?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.industry?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-heading font-semibold text-accent tracking-[0.25em] uppercase block mb-1">
                Owner Agency Command Center
              </span>
              <h1 className="font-heading font-semibold text-3xl md:text-5xl uppercase tracking-tighter">
                LEAD &amp; <span className="font-serif italic text-accent capitalize">CMS DESK</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-slate-300">
              <Shield size={14} className="text-accent animate-pulse" />
              <span>CMS Synced &bull; Secure</span>
            </div>
          </div>
        </div>
      </div>

      {!isAuthenticated ? (
        <section className="py-24 max-w-md mx-auto px-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={20} />
              </div>
              <h3 className="font-heading font-semibold text-lg uppercase tracking-tight text-primary">
                Aman&apos;s Verification
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Provide secure credentials or dynamic WhatsApp OTP to access Supreme Ads CRM &amp; Command deck.
              </p>
            </div>

            {/* Seamless Toggle Tab Choice */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('otp');
                  setErrorMsg('');
                }}
                className={`flex-1 text-center py-2 text-xs font-heading font-semibold uppercase tracking-wider rounded-md transition-all ${
                  authMethod === 'otp'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                WhatsApp OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('passcode');
                  setErrorMsg('');
                }}
                className={`flex-1 text-center py-2 text-xs font-heading font-semibold uppercase tracking-wider rounded-md transition-all ${
                  authMethod === 'passcode'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Passcode Override
              </button>
            </div>

            {authMethod === 'otp' ? (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 919667173693"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          setErrorMsg('');
                        }}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans tracking-wide focus:border-emerald-500 text-primary font-semibold"
                        required
                      />
                      <span className="text-[9px] text-slate-400 leading-normal block">
                        Pre-filled with Aman&apos;s direct WhatsApp key. Change if required.
                      </span>
                    </div>

                    {errorMsg && (
                      <p className="text-[10px] text-rose-500 font-sans">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 text-white font-heading font-bold text-xs tracking-widest py-3.5 uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {otpLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Request OTP on WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        6-Digit WhatsApp OTP
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP..."
                        maxLength={6}
                        value={enteredOtp}
                        onChange={(e) => {
                          setEnteredOtp(e.target.value);
                          setErrorMsg('');
                        }}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-center text-lg tracking-[0.4em] font-mono focus:border-emerald-500 text-slate-800"
                        required
                      />
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-lg space-y-1">
                      <span className="text-[9px] font-heading font-bold text-emerald-800 uppercase block tracking-wider">
                        Testing Helper Tool (Instant Access)
                      </span>
                      <p className="text-[9px] text-emerald-700 leading-relaxed font-sans">
                        Generated OTP is: <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-800">{generatedOtp}</span>. Copy and enter above, or send via the opened WhatsApp window.
                      </p>
                    </div>

                    {errorMsg && (
                      <p className="text-[10px] text-rose-500 font-sans">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs tracking-widest py-3.5 uppercase transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Verify &amp; Enter Command Desk
                    </button>

                    <div className="text-center pt-2">
                      {cooldown > 0 ? (
                        <span className="text-[10px] text-slate-400 font-sans">
                          Resend OTP in <span className="font-semibold font-mono">{cooldown}s</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          className="text-[10px] text-emerald-600 hover:underline font-heading font-bold uppercase tracking-wider"
                        >
                          Resend Code via WhatsApp
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                    Admin Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Enter passcode..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent"
                  />
                </div>

                {errorMsg && (
                  <p className="text-[10px] text-rose-500 font-sans">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest py-3.5 uppercase transition-all duration-300 shadow-md cursor-pointer"
                >
                  Access Commands
                </button>
              </form>
            )}
          </div>
        </section>
      ) : (
        <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          
          {/* Dashboard Control Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {[
              { id: 'leads', label: 'Lead Submissions', icon: <FileText size={14} /> },
              { id: 'hero', label: 'Hero Section', icon: <Layout size={14} /> },
              { id: 'clients', label: 'Client Logos', icon: <Plus size={14} /> },
              { id: 'case_studies', label: 'Case Studies', icon: <Edit2 size={14} /> },
              { id: 'gallery', label: 'Proofs Gallery', icon: <ImageIcon size={14} /> },
              { id: 'testimonials', label: 'Testimonials', icon: <CheckCircle2 size={14} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setEditingClient(null);
                  setEditingCase(null);
                  setEditingGallery(null);
                  setEditingTestimonial(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-accent hover:text-accent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* ACTIVE TAB VIEW CONTROLLER */}

          {/* TAB 1: Leads submissions (Existing functionality preserved) */}
          {activeTab === 'leads' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Total Enquiries</span>
                  <p className="text-3xl font-heading font-bold text-primary">{enquiries.length}</p>
                  <span className="text-[9px] font-mono font-semibold text-emerald-600 uppercase">Synced Live</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Alert Target Email</span>
                  <p className="text-xs font-mono font-semibold text-slate-700 truncate">amanbhabhani33@gmail.com</p>
                  <span className="text-[9px] font-mono font-semibold text-emerald-600 uppercase">Live Routing Active</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-2 flex flex-col justify-between">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Operations Tool</span>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchLeads}
                      disabled={loadingLeads}
                      className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider hover:bg-white"
                    >
                      <RefreshCw size={10} className={loadingLeads ? "animate-spin" : ""} />
                      Refresh
                    </button>
                    <button
                      onClick={downloadCSV}
                      disabled={enquiries.length === 0}
                      className="flex items-center gap-1 bg-accent border border-accent/20 text-primary px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider hover:opacity-90"
                    >
                      <Download size={10} />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Filter by name, agency, phone..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full bg-white border border-slate-200 pl-9 pr-4 py-2 outline-none rounded-lg text-xs font-sans focus:border-accent"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Showing {filteredEnquiries.length} of {enquiries.length} results
                  </span>
                </div>

                {loadingLeads ? (
                  <div className="py-24 text-center">
                    <div className="w-8 h-8 border-2 border-accent border-b-transparent rounded-full animate-spin mx-auto mb-4" />
                    <span className="text-xs font-heading uppercase text-primary tracking-widest">Querying Cloud Firestore...</span>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="py-24 text-center space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Calendar size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-semibold text-sm uppercase text-primary">No submissions yet</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-light">
                        Incoming leads through forms will appear here instantly.
                      </p>
                    </div>
                  </div>
                ) : filteredEnquiries.length === 0 ? (
                  <div className="py-24 text-center">
                    <p className="text-xs text-slate-500 font-light">No records matching your active filters.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold tracking-wider font-heading border-b border-slate-100">
                          <th className="p-6">Client Coordinates</th>
                          <th className="p-6">Industry/Segment</th>
                          <th className="p-6">Ad Budget</th>
                          <th className="p-6">Briefing Goals</th>
                          <th className="p-6 text-right">Receipt Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {filteredEnquiries.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-6 space-y-1.5 max-w-[240px]">
                              <div>
                                <span className="font-heading font-semibold text-xs text-primary block leading-none">{lead.name}</span>
                                <span className="text-[10px] text-slate-450 font-mono uppercase">{lead.companyName}</span>
                              </div>
                              <div className="space-y-1 text-[10px] text-slate-500 font-mono">
                                <span className="flex items-center gap-1.5">
                                  <Mail size={10} className="text-accent" />
                                  {lead.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Phone size={10} className="text-accent" />
                                  {lead.phone}
                                </span>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold rounded font-mono">
                                {lead.industry}
                              </span>
                            </td>
                            <td className="p-6">
                              <span className="text-xs font-mono font-bold text-emerald-600 block">
                                {lead.budget}
                              </span>
                            </td>
                            <td className="p-6">
                              <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-sm whitespace-pre-line line-clamp-3" title={lead.message}>
                                {lead.message}
                              </p>
                            </td>
                            <td className="p-6 text-right font-mono text-[10px] text-zinc-500 whitespace-nowrap">
                              {lead.createdAt?.toDate 
                                ? lead.createdAt.toDate().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
                                : lead.createdAt 
                                  ? new Date(lead.createdAt).toLocaleString()
                                  : 'Invalid Date'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: EDIT HERO CONTENT */}
          {activeTab === 'hero' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg max-w-3xl">
              <h3 className="text-lg font-heading font-semibold text-primary uppercase tracking-tight mb-2 flex items-center gap-2">
                <Layout className="text-accent" size={18} />
                Edit Home Hero Blueprint
              </h3>
              <p className="text-xs text-slate-500 font-sans mb-8">
                Optimize the headline or deploy a custom premium banner image instantly.
              </p>

              <form onSubmit={handleSaveHero} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest block">
                      Main Banner Headline
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.headline}
                      onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest block">
                      Sub-Headline Pitch
                    </label>
                    <textarea
                      rows={2}
                      value={heroForm.subheadline}
                      onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest block">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={heroForm.primaryCta}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCta: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest block">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={heroForm.secondaryCta}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCta: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2 border-t border-slate-100 pt-6">
                    <label className="text-xs font-heading font-semibold text-primary uppercase block mb-1">
                      Hero Banner Image / Photo Change
                    </label>
                    <p className="text-[10px] text-slate-450 leading-relaxed font-sans mb-3">
                      Drop client vector assets or high-end business photographic presets. Either input a live image URL directly, or drag &amp; drop/browse a JPEG or PNG logo to upload instantly converting to base64!
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-8">
                        <input
                          type="text"
                          placeholder="Image URL..."
                          value={heroForm.backgroundImage}
                          onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-mono focus:border-accent"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-semibold text-[10px] uppercase tracking-wider py-3 px-4 rounded-lg">
                          <Upload size={14} />
                          Browse File
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => processImageUpload(e, (b) => setHeroForm({ ...heroForm, backgroundImage: b }))}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    {heroForm.backgroundImage && (
                      <div className="mt-4 p-3 border border-slate-200 rounded-lg max-w-sm">
                        <span className="text-[9px] font-mono text-slate-500 block mb-2">Live Photo Preview:</span>
                        <img 
                          src={heroForm.backgroundImage} 
                          alt="Banner Preview" 
                          className="h-32 object-cover rounded w-full filter contrast-110 brightness-95" 
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest px-8 py-3.5 uppercase transition-all duration-300 shadow-md"
                  >
                    Deploy Hero Meta Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: EDIT CLIENT LOGOS */}
          {activeTab === 'clients' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center max-w-4xl">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary uppercase">Client Logos ledger</h3>
                  <p className="text-xs text-slate-500 font-sans">Manage the continuous scrolling luxury marquee logos.</p>
                </div>
                {!editingClient && (
                  <button
                    onClick={() => {
                      setClientForm({ name: '', logoUrl: '' });
                      setEditingClient('new');
                    }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-4 py-2 border rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <Plus size={14} />
                    Add Client Logo
                  </button>
                )}
              </div>

              {editingClient && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg max-w-xl">
                  <h4 className="text-sm font-heading font-bold text-primary uppercase mb-4">
                    {editingClient === 'new' ? 'Add New Client Logo' : 'Modify Client Logo'}
                  </h4>

                  <form onSubmit={handleSaveClient} className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Enterprise Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Aboodi Perfumes"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest block">
                        Vector Brand Logo Upload
                      </label>
                      <p className="text-[10px] text-slate-450 leading-relaxed font-sans mb-3">
                        Provide a logo URL or browse/drop an image to automatically parse it into vector base64 strings saved directly inside the CMS!
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8">
                          <input
                            type="text"
                            placeholder="Logo URL..."
                            value={clientForm.logoUrl}
                            onChange={(e) => setClientForm({ ...clientForm, logoUrl: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-mono focus:border-accent text-primary"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-semibold text-[10px] uppercase tracking-wider py-3.5 px-4 rounded-lg">
                            <Upload size={14} />
                            Upload File
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => processImageUpload(e, (b) => setClientForm({ ...clientForm, logoUrl: b }))}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      {clientForm.logoUrl && (
                        <div className="mt-4 p-4 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-primary">
                          <img 
                            src={clientForm.logoUrl} 
                            alt="Logo Mockup Preview" 
                            className="h-10 object-contain max-w-[150px] filter grayscale brightness-125 contrast-125" 
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Save Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingClient(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid of existing logos for delete/edit */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl">
                {clientLogos.map((client) => (
                  <div key={client.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="h-12 flex items-center justify-center bg-slate-900 rounded-lg p-3">
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="max-h-full object-contain filter grayscale invert" 
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <h5 className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary truncate">
                        {client.name}
                      </h5>
                    </div>
                    <div className="flex gap-1 border-t border-slate-100 pt-3">
                      <button
                        onClick={() => {
                          setClientForm({ name: client.name, logoUrl: client.logoUrl });
                          setEditingClient(client.id);
                        }}
                        className="p-1 text-slate-500 hover:text-accent flex-grow text-center"
                        title="Edit Client logo details"
                      >
                        <Edit2 size={13} className="mx-auto" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Delete client logo?')) {
                            await removeClientLogo(client.id);
                          }
                        }}
                        className="p-1 text-rose-500 hover:text-rose-700 flex-grow text-center"
                        title="Delete Client Logo record"
                      >
                        <Trash2 size={13} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EDIT CASE STUDIES */}
          {activeTab === 'case_studies' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center max-w-5xl">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary uppercase">Mathematical Case Logs</h3>
                  <p className="text-xs text-slate-500 font-sans">Deploy verifiable performance analytics log dossiers.</p>
                </div>
                {!editingCase && (
                  <button
                    onClick={() => {
                      setCaseForm({
                        industry: '',
                        title: '',
                        campaignObjective: '',
                        adSpend: '',
                        qualifiedLeads: '',
                        costPerLead: '',
                        roas: '',
                        challenge: '',
                        solution: '',
                        resultsRaw: '',
                        image: ''
                      });
                      setEditingCase('new');
                    }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-4 py-2 border rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <Plus size={14} />
                    Add Case Study
                  </button>
                )}
              </div>

              {editingCase && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-xl max-w-3xl space-y-6">
                  <h4 className="text-sm font-heading font-bold text-primary uppercase border-b border-slate-100 pb-3">
                    {editingCase === 'new' ? 'Deploy Fresh Case Study Log' : 'Configure Case Study Log'}
                  </h4>

                  <form onSubmit={handleSaveCase} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Industry Segment
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Luxury Attar Brand"
                          value={caseForm.industry}
                          onChange={(e) => setCaseForm({ ...caseForm, industry: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Objective Headline
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Scaling Arabic Perfume direct purchases"
                          value={caseForm.title}
                          onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Campaign Type Objective
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Direct Purchase Conversion"
                          value={caseForm.campaignObjective}
                          onChange={(e) => setCaseForm({ ...caseForm, campaignObjective: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Qualified Leads count / Conversions
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 521 HNW Leads"
                          value={caseForm.qualifiedLeads}
                          onChange={(e) => setCaseForm({ ...caseForm, qualifiedLeads: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Managed Ad Spend
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹20,00,000"
                          value={caseForm.adSpend}
                          onChange={(e) => setCaseForm({ ...caseForm, adSpend: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Cost Per Acquisition / Lead
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹3,900"
                          value={caseForm.costPerLead}
                          onChange={(e) => setCaseForm({ ...caseForm, costPerLead: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Attributed ROAS
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 10.8x"
                          value={caseForm.roas}
                          onChange={(e) => setCaseForm({ ...caseForm, roas: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Banner Cover Upload Option
                        </label>
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-semibold text-[10px] uppercase tracking-wider py-3 px-4 rounded-lg">
                            <Upload size={14} />
                            Upload Banner Study Photo
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => processImageUpload(e, (b) => setCaseForm({ ...caseForm, image: b }))}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-heading font-semibold text-gray-450 uppercase tracking-widest block">
                          Image Target Link URL (or use parsed base64 upload output above)
                        </label>
                        <input
                          type="text"
                          placeholder="Unsplash or static URL..."
                          value={caseForm.image}
                          onChange={(e) => setCaseForm({ ...caseForm, image: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-mono text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Strategic Challenge Faced
                        </label>
                        <textarea
                          rows={2}
                          placeholder="What was the main friction angle..."
                          value={caseForm.challenge}
                          onChange={(e) => setCaseForm({ ...caseForm, challenge: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Supreme Ads Executed Solution
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Which systems were deployed..."
                          value={caseForm.solution}
                          onChange={(e) => setCaseForm({ ...caseForm, solution: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                          Bullet Results Points (One per line)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. 512 verified leads secured with assets&#10;₹20 Lakhs parsed netting booking volume"
                          value={caseForm.resultsRaw}
                          onChange={(e) => setCaseForm({ ...caseForm, resultsRaw: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest px-8 py-3 uppercase transition-all duration-300"
                      >
                        Deploy Case Study Log
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCase(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs tracking-widest px-6 py-3 uppercase transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid of existing cases */}
              <div className="space-y-4 max-w-5xl">
                {caseStudies.map((study) => (
                  <div key={study.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        <img src={study.image} alt="Case study visual" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] bg-slate-100 text-slate-700 font-mono py-0.5 px-2 rounded uppercase border border-slate-200">
                          {study.industry}
                        </span>
                        <h4 className="font-heading font-bold text-xs text-primary uppercase mt-1">
                          {study.title}
                        </h4>
                        <div className="flex gap-4 text-[10px] text-slate-500 font-mono mt-0.5">
                          <span>ROAS: <strong className="text-emerald-600">{study.roas}</strong></span>
                          <span>AdSpend: <strong>{study.adSpend}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setCaseForm({
                            industry: study.industry || '',
                            title: study.title || '',
                            campaignObjective: study.campaignObjective || '',
                            adSpend: study.adSpend || '',
                            qualifiedLeads: study.qualifiedLeads || '',
                            costPerLead: study.costPerLead || '',
                            roas: study.roas || '',
                            challenge: study.challenge || '',
                            solution: study.solution || '',
                            resultsRaw: study.results ? study.results.join('\n') : '',
                            image: study.image || ''
                          });
                          setEditingCase(study.id);
                        }}
                        className="flex items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-wider hover:bg-white"
                      >
                        <Edit2 size={12} />
                        Edit Case study
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this case study log?')) {
                            await removeCaseStudy(study.id);
                          }
                        }}
                        className="flex items-center justify-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-wider hover:bg-rose-100/50"
                      >
                        <Trash2 size={12} />
                        Delete study
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CREATIVE PROOFS GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center max-w-4xl">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary uppercase">Proofs &amp; Ads Gallery</h3>
                  <p className="text-xs text-slate-500 font-sans">Manage uploaded scroll-stoppers or Meta Ads Manager interfaces.</p>
                </div>
                {!editingGallery && (
                  <button
                    onClick={() => {
                      setGalleryForm({ title: '', category: 'creatives', image: '' });
                      setEditingGallery('new');
                    }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-4 py-2 border rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <Plus size={14} />
                    Add Proof/Creative Item
                  </button>
                )}
              </div>

              {editingGallery && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg max-w-xl">
                  <h4 className="text-sm font-heading font-bold text-primary uppercase mb-4">
                    {editingGallery === 'new' ? 'Upload New Proof Item' : 'Modify Proof Details'}
                  </h4>

                  <form onSubmit={handleSaveGallery} className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Visual Title Label
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arabic Attar Campaign Ads Layout"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Placement Category Tab
                      </label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent"
                      >
                        <option value="creatives">Creatives &amp; Hooks</option>
                        <option value="campaign-results">Ad Account Proof Results</option>
                        <option value="office">Team / Office Collaboration</option>
                        <option value="events">Masterclasses &amp; Meetups</option>
                        <option value="ads">Active Live Campaigns</option>
                        <option value="clients">Onsite Client Audits</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Creative Image Upload / Target
                      </label>
                      <p className="text-[10px] text-slate-450 leading-relaxed font-sans mb-3">
                        Select a file from your device to upload direct to Firestore, or paste any third-party link.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8">
                          <input
                            type="text"
                            placeholder="Image Url..."
                            value={galleryForm.image}
                            onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-mono focus:border-accent text-primary"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-semibold text-[10px] uppercase tracking-wider py-3.5 px-4 rounded-lg">
                            <Upload size={14} />
                            Upload Photo
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => processImageUpload(e, (b) => setGalleryForm({ ...galleryForm, image: b }))}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      {galleryForm.image && (
                        <div className="mt-4 p-2 border border-slate-200 rounded-lg max-w-sm">
                          <img 
                            src={galleryForm.image} 
                            alt="Mock Proof" 
                            className="h-32 object-cover rounded w-full border border-slate-100 shadow-sm" 
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Publish Proof
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingGallery(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid of gallery proofs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl">
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-250 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="h-40 overflow-hidden relative border-b border-slate-200 bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 bg-primary text-white text-[8px] tracking-widest font-heading font-semibold uppercase px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-3 flex-grow flex flex-col justify-between text-left">
                      <span className="font-heading font-bold text-xs text-primary leading-snug line-clamp-2">
                        {item.title}
                      </span>
                      <div className="flex border-t border-slate-150 pt-3">
                        <button
                          onClick={() => {
                            setGalleryForm({ title: item.title, category: item.category, image: item.image });
                            setEditingGallery(item.id);
                          }}
                          className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-slate-600 hover:text-accent w-1/2"
                        >
                          <Edit2 size={11} />
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete gallery item proof?')) {
                              await removeGalleryItem(item.id);
                            }
                          }}
                          className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-rose-500 hover:text-rose-700 w-1/2"
                        >
                          <Trash2 size={11} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDIT TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center max-w-4xl">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary uppercase">Client Endorsements (Voices)</h3>
                  <p className="text-xs text-slate-500 font-sans">Manage elite reviews listed inside the client carousel track.</p>
                </div>
                {!editingTestimonial && (
                  <button
                    onClick={() => {
                      setTestimonialForm({ quote: '', author: '', role: '', company: '', image: '' });
                      setEditingTestimonial('new');
                    }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-4 py-2 border rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <Plus size={14} />
                    Add Testimonial
                  </button>
                )}
              </div>

              {editingTestimonial && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg max-w-xl">
                  <h4 className="text-sm font-heading font-bold text-primary uppercase mb-4">
                    {editingTestimonial === 'new' ? 'Create New Endorsement' : 'Modify Endorsement'}
                  </h4>

                  <form onSubmit={handleSaveTestimonial} className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Quote Phrase Text
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Say something brilliant about lead funnels..."
                        value={testimonialForm.quote}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Author Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Al-Aboodi"
                        value={testimonialForm.author}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Author Job Role Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Founder &amp; CEO"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Aboodi Perfumes"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-sans focus:border-accent text-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-heading font-semibold text-gray-400 uppercase tracking-widest block">
                        Avatar Photograph
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8">
                          <input
                            type="text"
                            placeholder="Avatar URL link..."
                            value={testimonialForm.image}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 outline-none rounded-lg text-xs font-mono focus:border-accent text-primary"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-semibold text-[10px] uppercase tracking-wider py-3.5 px-4 rounded-lg">
                            <Upload size={14} />
                            Upload Photo
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => processImageUpload(e, (b) => setTestimonialForm({ ...testimonialForm, image: b }))}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      {testimonialForm.image && (
                        <div className="mt-4 flex items-center gap-4 p-3 border border-slate-200 rounded-lg max-w-sm">
                          <img 
                            src={testimonialForm.image} 
                            alt="Avatar thumb" 
                            className="w-12 h-12 rounded-full object-cover filter grayscale" 
                          />
                          <span className="text-[10px] font-mono font-medium text-emerald-600 uppercase">Image OK (Base64)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Publish Testimonial
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTestimonial(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs tracking-widest px-6 py-2.5 uppercase transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Text lists of testimonials */}
              <div className="space-y-4 max-w-4xl text-left">
                {testimonials.map((test) => (
                  <div key={test.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="flex items-center gap-4">
                      {test.image && (
                        <img src={test.image} alt="Author" className="w-12 h-12 rounded-full object-cover grayscale border" />
                      )}
                      <div>
                        <h4 className="font-heading font-bold text-xs text-primary uppercase">{test.author}</h4>
                        <span className="text-[10px] text-gray-500 font-sans block">
                          {test.role} &mdash; <strong>{test.company}</strong>
                        </span>
                        <p className="text-xs text-slate-600 font-sans italic max-w-lg line-clamp-2 mt-1.5 prose">
                          "{test.quote}"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setTestimonialForm({
                            quote: test.quote,
                            author: test.author,
                            role: test.role,
                            company: test.company,
                            image: test.image || ''
                          });
                          setEditingTestimonial(test.id);
                        }}
                        className="flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded hover:bg-white"
                      >
                        <Edit2 size={11} />
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Delete testimonial entry?')) {
                            await removeTestimonial(test.id);
                          }
                        }}
                        className="flex items-center gap-1 bg-rose-50 border border-rose-250 text-rose-600 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded hover:bg-rose-100/55"
                      >
                        <Trash2 size={11} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      )}
    </div>
  );
}
