import React from 'react';
import { 
  Palette, 
  Clock, 
  Tag, 
  FileCheck2, 
  Truck, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Palette className="w-6 h-6 text-blue-600" />,
      title: 'CMYK Color Accuracy & Calibration',
      description: 'Zero guesswork in color rendering. Our calibrated Heidelberg offset and Konica Minolta production presses ensure delta-E color consistency across repeat print batches.',
      highlight: 'Delta-E < 2.0 Precision',
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      title: 'Fast Delhi NCR Production Turnaround',
      description: 'Equipped for rapid rush jobs. Same-day dispatch on visiting cards, roll-up standees, and star flex banners for orders approved before 1:00 PM.',
      highlight: 'Same-Day & 24-Hr Rush',
    },
    {
      icon: <Tag className="w-6 h-6 text-amber-600" />,
      title: 'Direct Factory Bulk Pricing',
      description: 'Eliminate middlemen commissions. Get transparent volume discounts on enterprise quantities with full 18% GST Input Tax Credit (ITC) invoices.',
      highlight: 'Tiered Bulk Wholesale',
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
      title: 'Free Pre-Press Digital Proofing',
      description: 'Our senior DTP operators examine your artwork for bleeding margins, low-res bitmaps, and font curves, sharing a 3D digital PDF proof for sign-off prior to plating.',
      highlight: 'Pre-Flight Guarantee',
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          Quality Commitment & Machinery
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Why Brands & Enterprises Trust Shivani Graphics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Over 15+ years of delivering high-precision commercial prints, large-format outdoor media, and architectural retail signage across Delhi NCR.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-white border border-neutral-200 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
