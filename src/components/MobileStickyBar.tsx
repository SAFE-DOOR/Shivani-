import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-3 py-2 shadow-lg flex items-center gap-2">
      {/* Call Now Button */}
      <a
        href={`tel:${CONTACT_INFO.primaryPhone}`}
        className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 active:bg-slate-800 transition-colors shadow-xs"
      >
        <Phone className="w-4 h-4 text-amber-400" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp Chat Button */}
      <a
        href={buildGeneralWhatsAppUrl('Mobile Bottom Action Bar Enquiry')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 active:bg-emerald-700 transition-colors shadow-xs"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
};
