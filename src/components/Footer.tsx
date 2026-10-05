import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'calculator' | 'corporate' | 'policies' | 'contact', policyTab?: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Brand & Store Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-1.5 shadow-sm border border-slate-700">
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 opacity-90"></span>
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-pink-500 opacity-90"></span>
                <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-yellow-400 opacity-90"></span>
                <span className="relative z-10 text-white font-extrabold text-sm font-display tracking-tighter">SG</span>
              </div>
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-white font-display">
                SHIVANI GRAPHICS
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">
                Shivani Digital Prints · Delhi NCR
              </div>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            Commercial offset & digital printing house specializing in corporate stationery, large format Star Flex hoardings, roll-up standees, 3D acrylic LED signage, and custom merchandise.
          </p>

          <div className="space-y-2 pt-2 text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{CONTACT_INFO.operatingHours}</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Shivani Graphics on Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Core Categories (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Printing Divisions
          </div>
          <ul className="space-y-2 text-slate-400">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate('calculator')}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
              >
                ★ Instant Price Calculator
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('corporate')}
                className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium"
              >
                ★ Corporate Bulk Solutions & RFPs
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Policies Hub (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Policy & Quality Hub
          </div>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => onNavigate('policies', 'terms')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policies', 'refund')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Refund & Cancellation
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policies', 'privacy')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Privacy & Data Security
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policies', 'shipping')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Shipping & Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Delhi NCR Store Map
              </button>
            </li>
          </ul>
        </div>

        {/* Official Contact Matrix (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Official Contact Matrix
          </div>
          <div className="space-y-2.5 text-slate-300">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Primary & WhatsApp Routing:</div>
              <a
                href={`tel:${CONTACT_INFO.primaryPhone}`}
                className="font-bold text-white hover:text-amber-400 transition-colors text-sm"
              >
                {CONTACT_INFO.primaryPhone}
              </a>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Production Desk:</div>
              <a
                href={`tel:${CONTACT_INFO.alternatePhones[0].number}`}
                className="font-semibold text-slate-200 hover:text-white transition-colors"
              >
                {CONTACT_INFO.alternatePhones[0].number}
              </a>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Bulk Sales & Enterprise:</div>
              <a
                href={`tel:${CONTACT_INFO.alternatePhones[1].number}`}
                className="font-semibold text-slate-200 hover:text-white transition-colors"
              >
                {CONTACT_INFO.alternatePhones[1].number}
              </a>
            </div>

            <div className="pt-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Support & Artwork Email:</div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-blue-400 hover:underline break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Shivani Graphics (Shivani Digital Prints). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>CMYK Delta-E Calibrated</span>
            <span>·</span>
            <span>Delhi NCR Local Dispatch</span>
            <span>·</span>
            <span>18% GST Invoicing Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
