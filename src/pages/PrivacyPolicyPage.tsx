import { Shield, Mail, MessageSquare, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate?: (href: string) => void;
}

export default function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  // Back button handler
  const handleBack = () => {
    if (onNavigate) {
      onNavigate('#home');
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50/50">
      {/* Editorial Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid-dark pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <Shield className="mx-auto text-accent mb-4 shrink-0" size={40} />
          <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight uppercase">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs text-slate-300 uppercase tracking-widest mt-3">
            Supreme Ads &bull; Corporate Protection &amp; Data Trust
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Navigation Return */}
        <button
          onClick={handleBack}
          className="group inline-flex items-center space-x-2 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Policy Document Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 md:p-12 space-y-10">
          
          {/* Highlighted Last Updated */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <span className="text-[11px] font-heading font-semibold uppercase tracking-widest text-slate-400">
              Supreme Ads Data Policy
            </span>
            <div className="text-xs font-sans text-slate-700">
              Last updated: <span className="bg-accent/10 border border-accent/30 text-accent-dark font-semibold px-2.5 py-1 rounded-full text-[11px]">June 29, 2026 (TODAY)</span>
            </div>
          </div>

          {/* Intro */}
          <p className="text-sm text-slate-800 leading-relaxed font-sans">
            At Supreme Ads, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, fill out our enquiry form, or contact us through WhatsApp, email, or any other channel.
          </p>

          {/* 1. Information We Collect */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">1.</span> Information We Collect
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-4">
              <p>We may collect the following information:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Business name</li>
                <li>Industry</li>
                <li>Monthly advertising budget</li>
                <li>Message or enquiry details</li>
                <li>Any other information you share through our forms, calls, WhatsApp messages, or email</li>
              </ul>
              <p className="pt-2">We may also collect basic technical information such as:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>Browser type</li>
                <li>Device type</li>
                <li>IP address</li>
                <li>Pages visited</li>
                <li>Time spent on the website</li>
                <li>Form submission activity</li>
              </ul>
            </div>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">2.</span> How We Use Your Information
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>Respond to your enquiry</li>
                <li>Contact you about our services</li>
                <li>Share strategy, pricing, or project details</li>
                <li>Improve our website and service quality</li>
                <li>Store leads safely for future follow-up</li>
                <li>Send updates related to your enquiry</li>
                <li>Understand which industries and services are most relevant to you</li>
              </ul>
            </div>
          </div>

          {/* 3. How We Store Your Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">3.</span> How We Store Your Information
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                Your enquiry details may be stored securely in our internal systems, email inbox, lead records, or connected tools used by Supreme Ads for business communication and follow-up.
              </p>
              <p>
                We take reasonable steps to protect your information from unauthorized access, misuse, or loss.
              </p>
            </div>
          </div>

          {/* 4. Sharing of Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">4.</span> Sharing of Information
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>We do not sell your personal information.</p>
              <p>We may share your information only when necessary:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>With service providers who help us operate our website or manage enquiries</li>
                <li>With platforms used for communication, analytics, or lead management</li>
                <li>When required by law, regulation, or government authority</li>
              </ul>
            </div>
          </div>

          {/* 5. WhatsApp and Email Communication */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">5.</span> WhatsApp and Email Communication
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-4">
              <p>
                If you contact us on WhatsApp or email, we may use those details to respond to your message, continue the conversation, or share service-related information.
              </p>
              <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3">
                <p className="font-heading font-semibold text-xs uppercase tracking-widest text-slate-500">Our direct contact channels:</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-accent" />
                    <span className="text-slate-600">Email:</span>
                    <a href="mailto:amanbhambhani33@gmail.com" className="text-primary font-bold hover:text-accent transition-colors">
                      amanbhambhani33@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="text-accent" />
                    <span className="text-slate-600">WhatsApp:</span>
                    <a href="https://wa.me/919667173693" target="_blank" rel="noreferrer" className="text-primary font-bold hover:text-accent transition-colors">
                      +91 9667173693
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Cookies and Analytics */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">6.</span> Cookies and Analytics
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                Our website may use cookies or analytics tools to understand how visitors use the site and to improve performance.
              </p>
              <p>These tools may help us learn:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>Which pages are visited most</li>
                <li>How visitors find our website</li>
                <li>Which forms or buttons are used</li>
                <li>Whether the website is working properly</li>
              </ul>
              <p className="pt-2">You may control cookies through your browser settings.</p>
            </div>
          </div>

          {/* 7. Data Retention */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">7.</span> Data Retention
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                We keep your information only for as long as needed for business, communication, service, or legal purposes.
              </p>
              <p>
                If you ask us to delete your data, we will review your request and take reasonable action where applicable.
              </p>
            </div>
          </div>

          {/* 8. Your Rights */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">8.</span> Your Rights
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>Depending on applicable law, you may have the right to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-slate-700">
                <li>Ask what personal data we hold about you</li>
                <li>Request correction of incorrect information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent where applicable</li>
                <li>Contact us about how your data is used</li>
              </ul>
              <p className="pt-2">
                To make such a request, you can email us at{' '}
                <a href="mailto:amanbhambhani33@gmail.com" className="text-accent font-semibold hover:underline">
                  amanbhambhani33@gmail.com
                </a>.
              </p>
            </div>
          </div>

          {/* 9. Third-Party Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">9.</span> Third-Party Links
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those external websites. Please review their policies separately.
              </p>
            </div>
          </div>

          {/* 10. Children’s Privacy */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">10.</span> Children’s Privacy
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                Our services are intended for business use. We do not knowingly collect personal information from children.
              </p>
            </div>
          </div>

          {/* 11. Updates to This Policy */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">11.</span> Updates to This Policy
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-3">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.
              </p>
            </div>
          </div>

          {/* 12. Contact Us */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
              <span className="text-accent">12.</span> Contact Us
            </h2>
            <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-4">
              <p>If you have any questions about this Privacy Policy or how we handle your information, please contact us:</p>
              <div className="p-6 bg-primary text-white rounded-xl space-y-3">
                <p className="font-heading font-bold text-sm tracking-wide text-accent">SUPREME ADS</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <p>Email: <a href="mailto:amanbhambhani33@gmail.com" className="hover:text-accent transition-colors font-medium">amanbhambhani33@gmail.com</a></p>
                  <p>WhatsApp: <a href="https://wa.me/919667173693" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors font-medium">+91 9667173693</a></p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-primary text-white font-heading font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 shadow-md"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
