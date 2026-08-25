import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { PublicReview } from '../types';
import { 
  Star, MessageSquarePlus, ShieldCheck, CheckCircle2, 
  Search, Edit3, Trash2, LogIn, LogOut, Sparkles, Building, User, Mail, 
  TrendingUp, X, Filter, AlertCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PublicFeedbackSectionProps {
  initialLimit?: number;
  showAllLink?: boolean;
  onNavigate?: (href: string) => void;
}

const INDUSTRY_OPTIONS = [
  'Ecommerce & D2C',
  'Luxury & Perfumery',
  'Real Estate & Architecture',
  'Healthcare & Aesthetic Clinics',
  'Jewellery & High Fashion',
  'B2B SaaS & Professional Services',
  'Education & Coaching',
  'Hospitality & F&B',
  'Other Enterprise'
];

export default function PublicFeedbackSection({ 
  initialLimit,
  showAllLink = false,
  onNavigate 
}: PublicFeedbackSectionProps) {
  const { 
    publicReviews, 
    userEmail, 
    userName, 
    loginWithEmail, 
    loginWithGoogle, 
    logoutUser, 
    submitReview, 
    modifyReview 
  } = useCMS();

  // Filter & Search states
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<PublicReview | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState('');
  const [authNameInput, setAuthNameInput] = useState('');
  const [authFeedbackMsg, setAuthFeedbackMsg] = useState('');

  // New Review Form State
  const [formData, setFormData] = useState({
    businessName: '',
    authorName: userName || '',
    authorEmail: userEmail || '',
    role: '',
    rating: 5,
    industry: 'Ecommerce & D2C',
    growthResult: '',
    feedback: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Edit Review Form State
  const [editFormData, setEditFormData] = useState({
    businessName: '',
    authorName: '',
    role: '',
    rating: 5,
    industry: '',
    growthResult: '',
    feedback: ''
  });
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Sync user email to form if changed
  React.useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({
        ...prev,
        authorEmail: userEmail,
        authorName: prev.authorName || userName || ''
      }));
    }
  }, [userEmail, userName]);

  // Compute published reviews & metrics
  const publishedReviews = useMemo(() => {
    return publicReviews.filter(r => r.status !== 'hidden');
  }, [publicReviews]);

  const avgRating = useMemo(() => {
    if (publishedReviews.length === 0) return 5.0;
    const sum = publishedReviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    return (sum / publishedReviews.length).toFixed(1);
  }, [publishedReviews]);

  const filteredReviews = useMemo(() => {
    let list = publishedReviews.filter(r => {
      const matchIndustry = selectedIndustry === 'all' || r.industry === selectedIndustry;
      const matchRating = minRating === 0 || r.rating >= minRating;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        r.businessName?.toLowerCase().includes(q) ||
        r.authorName?.toLowerCase().includes(q) ||
        r.feedback?.toLowerCase().includes(q) ||
        r.growthResult?.toLowerCase().includes(q) ||
        r.industry?.toLowerCase().includes(q);

      return matchIndustry && matchRating && matchSearch;
    });

    if (initialLimit && initialLimit > 0) {
      list = list.slice(0, initialLimit);
    }
    return list;
  }, [publishedReviews, selectedIndustry, minRating, searchQuery, initialLimit]);

  // Handle Review Submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      alert('Authentication required: Please sign in with your email or Google account to post a verified review.');
      return;
    }

    if (!formData.businessName || !formData.authorName || !formData.feedback) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    setFormSubmitting(true);
    try {
      await submitReview({
        businessName: formData.businessName.trim(),
        authorName: formData.authorName.trim(),
        authorEmail: userEmail.trim().toLowerCase(),
        role: formData.role.trim() || 'Business Leader',
        rating: Number(formData.rating),
        industry: formData.industry,
        growthResult: formData.growthResult.trim() || 'Verified Performance Growth',
        feedback: formData.feedback.trim()
      });

      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setIsSubmitModalOpen(false);
        setFormData({
          businessName: '',
          authorName: userName || '',
          authorEmail: userEmail || '',
          role: '',
          rating: 5,
          industry: 'Ecommerce & D2C',
          growthResult: '',
          feedback: ''
        });
      }, 1500);
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Failed to submit your review. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Open Edit Modal for matching review
  const openEditModal = (review: PublicReview) => {
    setEditingReview(review);
    setEditFormData({
      businessName: review.businessName,
      authorName: review.authorName,
      role: review.role || '',
      rating: review.rating || 5,
      industry: review.industry || 'Ecommerce & D2C',
      growthResult: review.growthResult || '',
      feedback: review.feedback
    });
  };

  // Handle Review Edit Save
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    // Verify ownership
    if (editingReview.authorEmail.toLowerCase() !== userEmail?.toLowerCase()) {
      alert('Unauthorized: You can only edit reviews matching your verified email address.');
      return;
    }

    setEditSubmitting(true);
    try {
      await modifyReview(editingReview.id, {
        businessName: editFormData.businessName.trim(),
        authorName: editFormData.authorName.trim(),
        role: editFormData.role.trim(),
        rating: Number(editFormData.rating),
        industry: editFormData.industry,
        growthResult: editFormData.growthResult.trim(),
        feedback: editFormData.feedback.trim()
      });

      setEditingReview(null);
      alert('Your review has been successfully updated!');
    } catch (err) {
      console.error('Error updating review:', err);
      alert('Failed to update review. Please try again.');
    } finally {
      setEditSubmitting(false);
    }
  };

  // Handle Auth Login
  const handleManualEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmailInput || !authEmailInput.includes('@')) {
      setAuthFeedbackMsg('Please enter a valid email address.');
      return;
    }

    loginWithEmail(authEmailInput, authNameInput);
    setAuthFeedbackMsg(`Logged in successfully as ${authEmailInput.toLowerCase()}`);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setAuthFeedbackMsg('');
      setAuthEmailInput('');
      setAuthNameInput('');
    }, 800);
  };

  const handleGoogleSignIn = async () => {
    const email = await loginWithGoogle();
    if (email) {
      setIsAuthModalOpen(false);
    } else {
      setAuthFeedbackMsg('Google Sign-In popup completed or cancelled. You can also use email login directly.');
    }
  };

  return (
    <section id="feedback-reviews" className="py-20 bg-[#FDFDFE] relative overflow-hidden border-t border-slate-150">
      {/* Subtle luxury grid pattern backdrop */}
      <div className="absolute inset-0 opacity-[0.03] luxury-grid pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading & Aggregate Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-primary text-xs font-mono font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-accent" />
              <span>Public Feedback &amp; Review Ledger</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tighter text-primary">
              CLIENT VOICES &amp; <span className="font-serif italic font-normal text-accent">HONEST RATINGS</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed">
              Real testimonials directly from business owners and marketing leaders. Verified reviews are publicly posted and only editable by the author&apos;s registered email.
            </p>
          </div>

          {/* Social Proof & Submit CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3 pr-4 sm:border-r border-slate-200">
              <div className="flex flex-col items-center justify-center bg-primary text-white w-14 h-14 rounded-xl font-heading font-bold text-2xl shadow-inner">
                {avgRating}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-medium block mt-0.5">
                  {publishedReviews.length} Verified Client Reviews
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <MessageSquarePlus size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* User Identity / Verification Status Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              userEmail ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
            }`}>
              {userEmail ? userEmail.charAt(0).toUpperCase() : <User size={14} />}
            </div>
            <div>
              {userEmail ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-sans text-slate-700">
                    Logged in as <strong className="font-mono text-primary">{userEmail}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    <CheckCircle2 size={10} /> Verified Reviewer Active
                  </span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-xs font-sans text-slate-700 font-medium flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-accent" />
                    <strong>Mandatory Sign-In Policy:</strong> Authenticate with Google or work email to post or edit your verified review.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {userEmail ? (
              <button
                onClick={logoutUser}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 font-mono transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50"
              >
                <LogOut size={13} />
                <span>Switch / Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:text-accent uppercase tracking-wider px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-sm"
              >
                <LogIn size={14} />
                <span>Sign In To Post / Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Search Box */}
            <div className="relative flex-grow max-w-md">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by company, founder, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 pl-10 pr-4 py-2.5 outline-none rounded-lg text-xs font-sans text-primary focus:border-accent focus:bg-white transition-colors"
              />
            </div>

            {/* Rating & Industry Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                <Filter size={13} className="text-slate-500" />
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="bg-transparent text-xs font-sans text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">All Industries</option>
                  {INDUSTRY_OPTIONS.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-transparent text-xs font-sans text-slate-700 outline-none cursor-pointer"
                >
                  <option value={0}>All Star Ratings</option>
                  <option value={5}>5 Stars Only</option>
                  <option value={4}>4+ Stars</option>
                  <option value={3}>3+ Stars</option>
                </select>
              </div>

              {(searchQuery || selectedIndustry !== 'all' || minRating !== 0) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustry('all');
                    setMinRating(0);
                  }}
                  className="text-xs text-rose-500 hover:underline font-mono px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <MessageSquarePlus size={24} />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-heading font-semibold text-base text-primary uppercase">No Reviews Found</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                {searchQuery || selectedIndustry !== 'all' 
                  ? 'No reviews match your selected filter criteria. Try resetting filters.'
                  : 'Be the first client to publish an honest feedback review for Supreme Ads!'}
              </p>
            </div>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-accent text-primary font-heading font-semibold text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider hover:bg-accent-dark transition-all"
            >
              Post First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => {
              const isOwner = userEmail && review.authorEmail?.toLowerCase() === userEmail.toLowerCase();

              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 md:p-7 shadow-sm hover:shadow-md relative ${
                    isOwner ? 'border-accent ring-1 ring-accent/30 bg-amber-50/10' : 'border-slate-200'
                  }`}
                >
                  {/* Card Header: Rating, Industry & Edit button */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={15}
                              className={i < (review.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                            />
                          ))}
                          <span className="text-xs font-mono font-bold text-slate-700 ml-1.5">
                            {review.rating || 5}.0
                          </span>
                        </div>
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {review.industry}
                        </span>
                      </div>

                      {/* Verified Badge or Owner Edit Badge */}
                      {isOwner ? (
                        <button
                          onClick={() => openEditModal(review)}
                          className="inline-flex items-center gap-1 bg-accent/20 hover:bg-accent text-primary font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md border border-accent/40 transition-all cursor-pointer shadow-sm"
                          title="Edit your review"
                        >
                          <Edit3 size={12} />
                          <span>Edit My Review</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> Verified Client
                        </span>
                      )}
                    </div>

                    {/* Growth Metric Highlight Pill */}
                    {review.growthResult && (
                      <div className="mb-4 bg-slate-900 text-accent px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 border border-slate-800">
                        <TrendingUp size={14} className="text-accent shrink-0" />
                        <span className="truncate">{review.growthResult}</span>
                      </div>
                    )}

                    {/* Review Feedback Statement */}
                    <p className="text-xs md:text-sm text-slate-700 font-sans leading-relaxed mb-6 italic whitespace-pre-line">
                      &ldquo;{review.feedback}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Business & Author credentials */}
                  <div className="pt-4 border-t border-slate-150 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm shrink-0 border border-primary/20">
                        {review.authorName ? review.authorName.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-heading font-bold text-xs uppercase tracking-tight text-primary truncate">
                          {review.authorName}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-sans truncate">
                          {review.role ? `${review.role}, ` : ''}{review.businessName}
                        </p>
                      </div>
                    </div>

                    {/* Post date */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {review.createdAt?.toDate 
                          ? review.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : review.createdAt 
                            ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Verified'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Optional View All Link for Home embedded state */}
        {showAllLink && (
          <div className="text-center mt-12">
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('#reviews');
                else window.location.hash = '#reviews';
              }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-slate-900 text-white font-heading font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-md"
            >
              <span>Explore All {publishedReviews.length} Verified Reviews &amp; Submit Yours</span>
              <ArrowRight size={14} className="text-accent" />
            </a>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. MODAL: SUBMIT NEW REVIEW                                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl p-6 md:p-8 relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="mb-6 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-primary text-[11px] font-mono font-semibold uppercase">
                  <ShieldCheck size={13} className="text-accent" />
                  <span>Mandatory Verified Submission</span>
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-primary">
                  {userEmail ? 'Share Your Growth Story' : 'Sign In To Write A Review'}
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  {userEmail 
                    ? 'Your review will be posted publicly under your verified account. You can edit it anytime.'
                    : 'To maintain verified authenticity and eliminate spam, reviewers must sign in with Google or their work email.'}
                </p>
              </div>

              {formSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-primary uppercase">
                    Review Submitted Successfully!
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">
                    Thank you! Your feedback is now live on our verified public ledger.
                  </p>
                </div>
              ) : !userEmail ? (
                /* MANDATORY SIGN IN GATE */
                <div className="space-y-5 py-2">
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                    <div className="text-xs text-slate-700 space-y-1">
                      <strong className="font-heading uppercase tracking-wide text-primary block">Sign-in Required</strong>
                      <p>
                        All public reviews require email verification. Once authenticated, you will immediately proceed to post your review and retain permanent edit rights.
                      </p>
                    </div>
                  </div>

                  {/* Google Sign In button */}
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-heading font-semibold text-xs py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign In with Google to Continue</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="h-px bg-slate-200 flex-grow" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">OR SIGN IN WITH EMAIL</span>
                    <div className="h-px bg-slate-200 flex-grow" />
                  </div>

                  <form onSubmit={handleManualEmailLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Your Work / Business Email *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. founder@yourcompany.com"
                        value={authEmailInput}
                        onChange={(e) => setAuthEmailInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-mono focus:border-accent outline-none text-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Your Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={authNameInput}
                        onChange={(e) => setAuthNameInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      />
                    </div>

                    {authFeedbackMsg && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-sans">
                        {authFeedbackMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-slate-900 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      Authenticate &amp; Open Review Form
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Verified Identity Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-emerald-800 block uppercase font-bold tracking-wider">
                          Authenticated Reviewer
                        </span>
                        <p className="text-xs font-mono text-emerald-950 truncate font-semibold">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={logoutUser}
                      className="text-[11px] text-emerald-700 hover:text-rose-600 underline font-mono shrink-0"
                    >
                      Switch
                    </button>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Overall Satisfaction Score *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            size={26}
                            className={star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                          />
                        </button>
                      ))}
                      <span className="font-mono font-bold text-xs text-slate-700 ml-2">
                        {formData.rating} Star{formData.rating > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Business Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Enterprise / Brand Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Aboodi Luxury Perfumes"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                        required
                      />
                    </div>

                    {/* Reviewer Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aman Bhabhani"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                        required
                      />
                    </div>

                    {/* Verified Reviewer Email (Readonly to prevent impersonation) */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Verified Work Email (Locked)
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        readOnly
                        disabled
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-mono bg-slate-100 text-slate-600 cursor-not-allowed"
                      />
                    </div>

                    {/* Role / Designation */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Your Role / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Founder &amp; CEO"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      />
                    </div>

                    {/* Industry */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Industry Category
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary bg-white cursor-pointer"
                      >
                        {INDUSTRY_OPTIONS.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    {/* Metric / Result */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                        Key Metric / Result Achieved
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6.4x ROAS, 180+ Leads"
                        value={formData.growthResult}
                        onChange={(e) => setFormData({ ...formData, growthResult: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      />
                    </div>
                  </div>

                  {/* Feedback Commentary */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Your Honest Review &amp; Experience *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share what worked best: Meta ad creatives, WhatsApp lead automation, ROAS scaling, or communication..."
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {formSubmitting ? 'Publishing...' : 'Publish Feedback'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MODAL: EDIT EXISTING REVIEW (Locked to Matching Email)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {editingReview && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl p-6 md:p-8 relative my-8"
            >
              <button
                onClick={() => setEditingReview(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="mb-6 space-y-1">
                <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                  Verified Edit Permission
                </span>
                <h3 className="font-heading font-bold text-xl uppercase text-primary">
                  Update Your Review
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Updating review created by <strong className="font-mono text-primary">{editingReview.authorEmail}</strong>
                </p>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Rating Selector */}
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                    Updated Satisfaction Score
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, rating: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={26}
                          className={star <= editFormData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                        />
                      </button>
                    ))}
                    <span className="font-mono font-bold text-xs text-slate-700 ml-2">
                      {editFormData.rating} Star{editFormData.rating > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Enterprise Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.businessName}
                      onChange={(e) => setEditFormData({ ...editFormData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.authorName}
                      onChange={(e) => setEditFormData({ ...editFormData, authorName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Industry Category
                    </label>
                    <select
                      value={editFormData.industry}
                      onChange={(e) => setEditFormData({ ...editFormData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary bg-white cursor-pointer"
                    >
                      {INDUSTRY_OPTIONS.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Performance Metric / Result
                    </label>
                    <input
                      type="text"
                      value={editFormData.growthResult}
                      onChange={(e) => setEditFormData({ ...editFormData, growthResult: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                    Updated Review Commentary
                  </label>
                  <textarea
                    rows={4}
                    value={editFormData.feedback}
                    onChange={(e) => setEditFormData({ ...editFormData, feedback: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editSubmitting}
                    className="bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {editSubmitting ? 'Saving...' : 'Save Updated Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. MODAL: EMAIL SIGN IN / VERIFICATION FOR REVIEW EDITING                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 md:p-8 relative"
            >
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setAuthFeedbackMsg('');
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto text-primary">
                  <LogIn size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg uppercase text-primary">
                  Reviewer Sign-In
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Sign in with your Google account or work email to post authenticated reviews and unlock full owner edit permissions.
                </p>
              </div>

              {/* Google Sign In option */}
              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-grow" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">OR WITH EMAIL</span>
                  <div className="h-px bg-slate-200 flex-grow" />
                </div>

                <form onSubmit={handleManualEmailLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Author Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. farooq@royaloudluxury.com"
                      value={authEmailInput}
                      onChange={(e) => setAuthEmailInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-mono focus:border-accent outline-none text-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-widest block">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mohammad Farooq"
                      value={authNameInput}
                      onChange={(e) => setAuthNameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs font-sans focus:border-accent outline-none text-primary"
                    />
                  </div>

                  {authFeedbackMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-sans">
                      {authFeedbackMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-slate-900 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Authorize Review Editing
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
