import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ClientTestimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sunil Aggarwal',
      role: 'Director of Procurement',
      company: 'Apex Realty Solutions, Connaught Place',
      text: 'Shivani Graphics executed 5,000 velvet visiting cards and 20 roll-up standees for our Delhi NCR property expo on a tight 36-hour notice. The color consistency and spot UV finish matched our strict brand guide perfectly.',
      project: '5,000 Velvet Cards & 20 Standees',
      rating: 5,
    },
    {
      name: 'Pooja Kashyap',
      role: 'Head of Marketing',
      company: 'Velocita Healthcare Pvt Ltd, Okhla',
      text: 'The 3D acrylic LED glow sign board installed at our Okhla regional diagnostic centre is top tier. Samsung LEDs have uniform illumination with zero dark corners, and the ACP backing is weather-sealed.',
      project: '3D Acrylic LED Glow Signage',
      rating: 5,
    },
    {
      name: 'Manish Rawat',
      role: 'Founder & Managing Partner',
      company: 'Rawat & Co. Legal Chambers, Delhi',
      text: 'Direct WhatsApp communication with their Delhi production desk made proof approvals painless. Their 100 GSM executive bond letterheads and self-inking Trodat stamps are flawless in daily court filings.',
      project: 'Executive Letterheads & Trodat Stamps',
      rating: 5,
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Verified Client Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Commercial Client Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Real corporate and retail clients across Delhi NCR sharing their print quality and turnaround experiences.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-xs font-bold text-amber-900 self-start md:self-auto">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>4.9 / 5.0 Rating (850+ Commercial Jobs)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Order</span>
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <div className="font-bold text-slate-900 text-xs">{rev.name}</div>
              <div className="text-[11px] text-slate-500">{rev.role}</div>
              <div className="text-[11px] text-blue-600 font-medium">{rev.company}</div>
              <div className="text-[10px] text-slate-400 mt-1">Project: {rev.project}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
