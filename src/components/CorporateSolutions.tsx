import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  FileCheck2, 
  CreditCard, 
  Truck,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';
import { useAccount } from '../context/AccountContext';

export const CorporateSolutions: React.FC = () => {
  const { currentUser, isAuthenticated } = useAccount();

  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [contactPerson, setContactPerson] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [serviceRequired, setServiceRequired] = useState('Comprehensive Corporate Stationery & Merch');
  const [estimatedQuantity, setEstimatedQuantity] = useState('Bulk (1000+ units)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*B2B Corporate Printing Inquiry - Shivani Graphics*\n\n* Company: ${companyName}\n* Contact Person: ${contactPerson}\n* Phone: ${phone}\n* Email: ${email}\n* Service Needed: ${serviceRequired}\n* Est. Volume: ${estimatedQuantity}\n* Requirements: ${notes || 'Standard B2B Catalog'}\n\nPlease share official corporate rate card and GST ITC invoice terms.`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.alternatePhones[1].raw}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const benefits = [
    {
      title: 'Dedicated Account Manager',
      desc: 'Single point of contact on WhatsApp & direct phone for pre-press approvals, sample kits, and rush delivery orchestration.',
    },
    {
      title: '18% GST Input Tax Credit (ITC)',
      desc: 'Fully compliant automated GST tax invoicing for company accounting and seamless quarterly tax reconciliation.',
    },
    {
      title: 'Free Material Sample Swatch Kit',
      desc: 'We courier physical paper swatch decks (300/350/400 GSM, Linen, Ivory, Star Flex, Vinyl) directly to your Delhi NCR office.',
    },
    {
      title: 'Multi-Branch Delhi NCR Fulfillment',
      desc: 'Split-shipment capability to distribute signage and employee welcome merchandise across multiple regional branch offices.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Banner */}
      <div className="bg-slate-900 rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B Enterprise Printing Program</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
            Corporate Branding, Annual Collateral & Turnkey Merchandising
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Partner with Shivani Graphics for volume commercial print procurement. From startup welcome kits to multi-store retail signage rollouts across Delhi NCR.
          </p>
        </div>
      </div>

      {/* Grid of Corporate Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <h3 className="font-bold text-slate-900 text-sm">{b.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Inquiry Form & WhatsApp Trigger */}
      <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Bulk Quote Request
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Request an Official Quotation for Your Organization
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fill in your procurement specifications. Our enterprise print team will generate a formal proposal with volume discount pricing and dispatch it via WhatsApp & email to {CONTACT_INFO.email}.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Turnaround for bulk estimates: Under 60 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Free digital sample preview included</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
          {submitted ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Inquiry Routed to WhatsApp & Desk!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you! Your bulk procurement request has been routed to our senior Delhi NCR corporate manager at {CONTACT_INFO.alternatePhones[1].number}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company / Firm Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Tech Solutions"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91-98XXXXXXXX"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Print Category Required</label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300 font-medium"
                  >
                    <option value="Executive Stationery (Visiting cards, letterheads, stamps)">
                      Executive Stationery (Visiting cards, letterheads, stamps)
                    </option>
                    <option value="Exhibition Kit (Roll-up standees, backdrop flex, brochures)">
                      Exhibition Kit (Roll-up standees, backdrop flex, brochures)
                    </option>
                    <option value="Architectural 3D Acrylic & Glow Signage">
                      Architectural 3D Acrylic & Glow Signage
                    </option>
                    <option value="Employee Welcome Hampers (Mugs, T-Shirts, Diaries, Pens)">
                      Employee Welcome Hampers (Mugs, T-Shirts, Diaries, Pens)
                    </option>
                    <option value="Custom Packaging (Stickers, paper carry bags, mailers)">
                      Custom Packaging (Stickers, paper carry bags, mailers)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Quantity Volume</label>
                  <select
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300 font-medium"
                  >
                    <option value="Small Bulk (100–500 units)">Small Bulk (100–500 units)</option>
                    <option value="Medium Bulk (500–2500 units)">Medium Bulk (500–2500 units)</option>
                    <option value="Enterprise Run (5000+ units)">Enterprise Run (5000+ units)</option>
                    <option value="Annual Retainer / Continuous Monthly">Annual Retainer / Continuous Monthly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Additional Notes / Specs</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail your GSM preferences, dimensions, delivery date, or branch locations..."
                  className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Submit Corporate RFP via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
