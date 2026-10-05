import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data/contact';

export const LocationMap: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Physical Print Store & Production Facility
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Visit Our Delhi NCR Printing Complex
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Drop by for on-site material sample viewing, machine proof checking, and immediate self-pickup.
            </p>
          </div>

          <a
            href={CONTACT_INFO.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grid: Details on Left, Interactive Embedded Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Details */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-neutral-50/70 border-b lg:border-b-0 lg:border-r border-neutral-200 space-y-6 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Store Address</div>
                <div className="text-slate-600 mt-1 leading-relaxed">
                  {CONTACT_INFO.address}
                </div>
                <div className="text-slate-500 mt-1 font-medium">
                  Convenient access from central metro routes and highway corridors.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Working Hours</div>
                <div className="text-slate-600 mt-1 leading-relaxed">
                  {CONTACT_INFO.operatingHours}
                </div>
                <div className="text-emerald-700 font-semibold mt-1">
                  • Production Floor Active & Taking Orders
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Direct Phone Numbers</div>
                <div className="space-y-1 mt-1 font-semibold">
                  <div>
                    <a href={`tel:${CONTACT_INFO.primaryPhone}`} className="text-blue-600 hover:underline">
                      {CONTACT_INFO.primaryPhone} (Primary / WhatsApp)
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${CONTACT_INFO.alternatePhones[0].number}`} className="text-slate-700 hover:underline">
                      {CONTACT_INFO.alternatePhones[0].number} (Production)
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${CONTACT_INFO.alternatePhones[1].number}`} className="text-slate-700 hover:underline">
                      {CONTACT_INFO.alternatePhones[1].number} (Bulk Sales)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Maps Iframe */}
          <div className="lg:col-span-8 min-h-[360px] bg-neutral-100 relative">
            <iframe
              src={CONTACT_INFO.googleMapsEmbedIframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shivani Graphics Delhi NCR Google Maps Location"
              className="w-full h-full min-h-[360px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
