import React, { useState } from 'react';
import { 
  FileText, 
  RotateCcw, 
  ShieldCheck, 
  Truck, 
  Check, 
  AlertCircle, 
  Scale, 
  Clock, 
  Mail, 
  Phone
} from 'lucide-react';
import { CONTACT_INFO } from '../data/contact';

interface LegalPoliciesProps {
  initialTab?: string;
}

export const LegalPolicies: React.FC<LegalPoliciesProps> = ({ initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions', icon: <Scale className="w-4 h-4" /> },
    { id: 'refund', label: 'Refund & Cancellation Policy', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Data Protection', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'shipping', label: 'Shipping & Delivery Policy', icon: <Truck className="w-4 h-4" /> },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Legal & Operational Framework
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Commercial Policies & Quality Guarantee Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Official operating guidelines for custom printing, machine proofing, color calibration tolerances, and delivery fulfillment for Shivani Graphics (Shivani Digital Prints).
        </p>
      </div>

      {/* Policy Navigation Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto gap-2 bg-neutral-100 p-1.5 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT 1: Terms & Conditions */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Commercial Terms & Conditions</h2>
            <div className="text-[11px] text-slate-500 mt-0.5">Effective Date: January 1, 2026 · Jurisdiction: Delhi NCR, India</div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">1. Intellectual Property & Copyright Indemnity</h3>
              <p>
                The client affirms that all artwork, registered trademarks, corporate logos, photographs, and textual materials supplied to Shivani Graphics (Shivani Digital Prints) for printing are either owned by the client or utilized with explicit authorized licensing. The client agrees to indemnify and hold harmless Shivani Graphics, its proprietors, and machine technicians from any copyright infringement claims, trademark disputes, or intellectual property litigation.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">2. Digital Proofing & Sign-Off Waiver</h3>
              <p>
                Prior to offset plate etching or high-volume digital printing, a 3D digital PDF proof is issued via WhatsApp or email. The client’s written approval (e.g., "Approved for Print" or affirmative text message) constitutes final pre-press sign-off. Shivani Graphics assumes no financial liability for typographical errors, misspelled names, incorrect telephone numbers, or grammatical mistakes present in client-approved digital proofs.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">3. RGB to CMYK Color Shift Tolerances</h3>
              <p>
                Computer screens and mobile displays render graphics using emissive RGB color space, whereas physical commercial offset and digital presses utilize reflective 4-color CMYK ink processes. A color shift variance of up to 5%–10% between on-screen preview and final cured ink is an accepted industry manufacturing standard. Specific Pantone matches require pre-arranged spot-color mixing contracts.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">4. Cutting & Trimming Variance (±2mm)</h3>
              <p>
                Due to industrial hydraulic guillotines and mechanical paper movement during automated cutting, a mechanical cutting shift tolerance of up to ±2mm is standard across all paper products (visiting cards, flyers, brochures). Critical contact info and borders must maintain a safety margin of at least 3mm–5mm inward from the trim line.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">5. Legal Jurisdiction & Dispute Resolution</h3>
              <p>
                All contractual relationships, quotations, and disputes arising out of services provided by Shivani Graphics are exclusively governed by the laws of India and subject to the exclusive jurisdiction of the competent courts of Delhi NCR.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Refund & Cancellation */}
      {activeTab === 'refund' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Refund, Reprint & Cancellation Policy</h2>
            <div className="text-[11px] text-slate-500 mt-0.5">Custom-Printed Manufacturing Protocol</div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">1. Customized Print Nature & Cancellation Windows</h3>
              <p>
                Because commercial printing involves tailor-made materials, custom die-cuts, and irreversible paper ink deposition, orders cannot be cancelled once digital proofs are approved and machine plating/printing has commenced. Orders cancelled prior to plate generation will incur only a nominal DTP design fee (if custom design services were rendered).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">2. 48-Hour Defect Reporting & Photographic Evidence</h3>
              <p>
                Clients must inspect delivered orders upon arrival. Any manufacturing defects (such as severe banding, missing pages, inverted binding, or incorrect GSM paper usage) must be reported to <strong className="text-slate-900">{CONTACT_INFO.email}</strong> or our primary WhatsApp support line within <strong>48 hours of delivery</strong>, accompanied by clear high-resolution photographic and video proof showing the defects.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">3. 100% Free Reprint Guarantee for Manufacturing Faults</h3>
              <p>
                If a manufacturing defect is verified to be the fault of Shivani Graphics machinery (e.g. print head banding, severe misregistration, wrong lamination finish), we will initiate a <strong>100% free priority reprint</strong> and dispatch it via express courier at our expense within 24–48 hours.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">4. Refund Settlement Timeline (5–7 Business Days)</h3>
              <p>
                In exceptional circumstances where a verified defective print cannot be re-executed, approved refunds will be credited back to the client’s original payment source (UPI, IMPS, or bank transfer) within <strong>5 to 7 business days</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Privacy & Data Protection */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Privacy & Design File Security Policy</h2>
            <div className="text-[11px] text-slate-500 mt-0.5">Strict Enterprise Confidentiality</div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">1. Customer Data Protection & Non-Sharing Guarantee</h3>
              <p>
                Shivani Graphics respects client privacy. We collect client contact information (name, phone number, delivery address, GST number) solely for quote calculation, order fulfillment, tax invoicing, and direct dispatch coordination. We never rent, sell, or disclose your corporate or personal information to third-party telemarketers or advertising networks.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">2. 12-Month Secure Artwork Archiving</h3>
              <p>
                Approved vector CDR, AI, and press-ready PDF artwork files are retained in our secure encrypted Delhi server archive for a period of <strong>12 months</strong>. This allows corporate clients to initiate repeat re-orders via WhatsApp with zero file re-upload delays. Upon written request, files can be permanently purged earlier.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">3. Courier Logistics Fulfillment Security</h3>
              <p>
                Delivery address and receiver telephone credentials are provided only to authorized courier dispatch riders (e.g. Delhivery, BlueDart, or internal delivery riders) strictly for navigating physical store drop-offs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: Shipping & Delivery */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Shipping, Delivery & Turnaround Policy</h2>
            <div className="text-[11px] text-slate-500 mt-0.5">Delhi NCR & Pan-India Dispatch Mechanics</div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">1. Turnaround Timelines (1–4 Business Days)</h3>
              <p>
                Standard production lead times range from <strong>Same-Day / 24 Hours</strong> for urgent stationery and roll-up standees to <strong>2–4 business days</strong> for multi-panel brochures, 3D acrylic LED signage, and custom gift hampers. Production begins immediately following digital PDF proof sign-off and advance payment.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">2. Impact of Pre-Press Proofing Delays</h3>
              <p>
                Turnaround clocks begin strictly upon receipt of client written sign-off on WhatsApp. Any delay in client artwork approval will shift the estimated dispatch date accordingly.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">3. Delhi NCR Store Self-Pickup & Express Couriers</h3>
              <p>
                Clients within Delhi NCR may choose free physical store pickup from our Commercial Printing Complex during operating hours (Mon–Sat 9:30 AM – 8:30 PM), or opt for doorstep delivery via local two-wheeler/van delivery riders or courier logistics.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">4. Damaged Cargo In-Transit Protocol</h3>
              <p>
                All finished jobs are shrink-wrapped in moisture-proof polyfilm and heavy corrugated outer boxing. In the unlikely event that an outer box arrives visibly torn or crushed, the receiver must photograph the outer packaging before opening and notify Shivani Graphics within 24 hours for immediate logistics claims.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
