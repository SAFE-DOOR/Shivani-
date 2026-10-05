import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Instagram, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';
import { LocationMap } from './LocationMap';
import { useAccount } from '../context/AccountContext';

export const ContactSection: React.FC = () => {
  const { currentUser } = useAccount();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [subject, setSubject] = useState('Print Job Inquiry');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentNotice(true);

    const fullMessage = `*New Customer Inquiry - Shivani Graphics Portal*\n\n* Name: ${name}\n* Email: ${email}\n* Phone: ${phone}\n* Topic: ${subject}\n* Message: ${message}\n\nPlease get in touch with pricing and design proof requirements.`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.primaryPhoneRaw}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Official Credentials & Support
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Connect with Shivani Graphics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Direct communication lines for quote consultations, artwork review, and immediate production status inquiries.
        </p>
      </div>

      {/* Official Credentials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Primary WhatsApp & Enquiries */}
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-emerald-600" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Primary & WhatsApp</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{CONTACT_INFO.primaryPhone}</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Automated 24/7 Routing</div>
          </div>
          <a
            href={buildGeneralWhatsAppUrl('Website General Inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Card 2: Production Desk */}
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Production & Printing</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{CONTACT_INFO.alternatePhones[0].number}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Job Status & Technical Specs</div>
          </div>
          <a
            href={`tel:${CONTACT_INFO.alternatePhones[0].number}`}
            className="block text-center py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Call Production
          </a>
        </div>

        {/* Card 3: Bulk & Enterprise Desk */}
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Bulk Procurement</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{CONTACT_INFO.alternatePhones[1].number}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Corporate Rate Cards & RFPs</div>
          </div>
          <a
            href={`tel:${CONTACT_INFO.alternatePhones[1].number}`}
            className="block text-center py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Call Bulk Desk
          </a>
        </div>

        {/* Card 4: Official Business Email */}
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Official Business Email</div>
            <div className="font-bold text-slate-900 text-xs truncate mt-0.5" title={CONTACT_INFO.email}>
              {CONTACT_INFO.email}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Artwork files & invoices</div>
          </div>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="block text-center py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Email Files
          </a>
        </div>
      </div>

      {/* Main Interactive Contact Form */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Quick Inbound Form
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Send an Inquiry or Upload Job Details
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our DTP graphic designers and production estimators are on standby to evaluate your requirements and offer immediate turnaround commitments.
          </p>

          <div className="pt-4 border-t border-neutral-200 space-y-3 text-xs text-slate-700">
            <div className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram:</span>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Shivani Graphics Official Handle</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Response Time: Under 30 minutes during store hours</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {sentNotice ? (
            <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">Inquiry Prepared & Routed to WhatsApp!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you! Your message payload has been sent to our primary Delhi NCR desk at {CONTACT_INFO.primaryPhone}.
              </p>
              <button
                onClick={() => setSentNotice(false)}
                className="mt-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number (With WhatsApp) *</label>
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
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300 font-medium"
                  >
                    <option value="Print Job Inquiry">Visiting Cards / Stationery</option>
                    <option value="Outdoor Flex & Standee">Outdoor Flex & Standee</option>
                    <option value="3D Acrylic & LED Signage">3D Acrylic & LED Signage</option>
                    <option value="Corporate Gifting & Merch">Corporate Gifting & Merch</option>
                    <option value="Packaging & Custom Stickers">Packaging & Custom Stickers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Details / Requirements *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your dimensions, quantity, paper GSM, delivery timeline, or any specific instructions..."
                  className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Location Map Block */}
      <LocationMap />
    </div>
  );
};
