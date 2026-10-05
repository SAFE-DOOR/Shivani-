import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl, CONTACT_INFO } from '../data/contact';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="WhatsApp Quick Connect" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center group">
      {/* Tooltip on Desktop hover */}
      <span className="hidden sm:inline-block mr-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Order on WhatsApp · {CONTACT_INFO.primaryPhone}
      </span>

      {/* Floating Animated Button */}
      <a
        href={buildGeneralWhatsAppUrl('Floating Sticky CTA')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-108 active:scale-95 cursor-pointer border-2 border-white"
        aria-label="Chat directly on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulse radar wave */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />
        <MessageCircle className="w-6 h-6 fill-white relative z-10" />
      </a>
    </aside>
  );
};
