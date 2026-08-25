import React from 'react';
import PublicFeedbackSection from '../components/PublicFeedbackSection';
import { Star, ShieldCheck, Sparkles, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewsPageProps {
  onNavigate?: (href: string) => void;
}

export default function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  return (
    <div className="pt-24 min-h-screen bg-[#FDFDFE]">
      {/* Hero Header */}
      <div className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-mono font-semibold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-accent" />
              <span>Public Client Reviews &amp; Transparency Ledger</span>
            </div>
            <h1 className="font-heading font-semibold text-3xl md:text-6xl uppercase tracking-tighter leading-tight">
              VERIFIED CLIENT <span className="font-serif italic text-accent capitalize">Feedback &amp; ROAS</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300 font-sans leading-relaxed font-light">
              Explore authentic performance reviews from real founders, CMOs, and enterprise partners. Any client can submit public feedback, and records remain strictly editable only by the author&apos;s registered email.
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900 text-slate-200 border-y border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Star size={18} className="fill-accent" />
              </div>
              <div>
                <strong className="text-white block font-heading uppercase tracking-wider text-xs">100% Verified Submissions</strong>
                <span className="text-slate-400">Authenticated client feedback directly logged into Firestore.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong className="text-white block font-heading uppercase tracking-wider text-xs">Email-Bound Ownership</strong>
                <span className="text-slate-400">Only the original reviewer email address can edit or update feedback.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Award size={18} />
              </div>
              <div>
                <strong className="text-white block font-heading uppercase tracking-wider text-xs">Admin Moderation Desk</strong>
                <span className="text-slate-400">Backend management for review curation, deletion, and visibility controls.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Public Feedback Section Component */}
      <PublicFeedbackSection onNavigate={onNavigate} />

      {/* Conversion Banner */}
      <div className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block">
            Ready For Measurable Growth?
          </span>
          <h3 className="font-heading font-bold text-2xl md:text-4xl uppercase tracking-tight text-primary">
            Experience The Supreme Ads Performance Standard
          </h3>
          <p className="text-xs md:text-sm text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Let us engineer a custom Meta advertising campaign that turns your ad spend into predictable revenue and profitable customers.
          </p>
          <div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('#contact');
                else window.location.hash = '#contact';
              }}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary font-heading font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
