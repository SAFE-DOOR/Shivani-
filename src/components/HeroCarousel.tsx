import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../data/contact';

interface HeroCarouselProps {
  onExploreCategory: (categorySlug: string) => void;
  onOpenCalculator: () => void;
}

interface Slide {
  id: string;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  categorySlug: string;
  ctaText: string;
  accentColor: string;
  bgGradient: string;
  bulletPoints: string[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onExploreCategory, onOpenCalculator }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 'commercial-offset',
      badge: 'Certified Heidelberg & Konica Minolta Fleet',
      title: 'Commercial Digital & Offset Printing in Delhi NCR',
      highlightText: 'Same-Day Dispatch & CMYK Precision',
      description: 'Ultra-crisp business cards, executive letterheads, catalogs, and brochures crafted on premium imported 300–400 GSM art card with velvet & spot UV finishes.',
      categorySlug: 'stationery',
      ctaText: 'Explore Business Stationery',
      accentColor: 'blue',
      bgGradient: 'from-slate-950 via-slate-900 to-blue-950',
      bulletPoints: ['Free 3D Digital Proofing', '±0.5mm Registration Accuracy', 'Same-Day Delhi NCR Delivery'],
    },
    {
      id: 'flex-signage',
      badge: 'Outdoor Exhibition & Retail Branding',
      title: 'Large Format Star Flex & Roll-Up Standees',
      highlightText: 'High-Impact Weatherproof Displays',
      description: 'Vibrant outdoor banners, backdrop hoardings, and aluminium roll-up standees printed on high-resolution eco-solvent plotters with reinforced brass eyelets.',
      categorySlug: 'marketing',
      ctaText: 'View Exhibition Banners',
      accentColor: 'amber',
      bgGradient: 'from-slate-950 via-zinc-900 to-amber-950',
      bulletPoints: ['High-Tension Star Flex Media', 'Ready in 24 Hours', 'Fade-Resistant Outdoor Inks'],
    },
    {
      id: 'acrylic-signage',
      badge: 'Architectural Storefront Engineering',
      title: '3D Acrylic LED Letters & Glow Sign Boards',
      highlightText: 'Illuminated Retail Excellence',
      description: 'Laser-cut cast acrylic letters with waterproof Samsung LED modules, ACP panelling, and heavy iron-pipe glow signboards for storefronts and corporate offices.',
      categorySlug: 'signage',
      ctaText: 'Design 3D Signage Board',
      accentColor: 'orange',
      bgGradient: 'from-zinc-950 via-stone-900 to-orange-950',
      bulletPoints: ['IP67 Waterproof Samsung LEDs', 'CNC Laser-Precision Cut', 'On-Site Delhi NCR Mounting'],
    },
    {
      id: 'corporate-merch',
      badge: 'Enterprise Bulk Merchandising',
      title: 'Custom Corporate Gifting & Welcome Kits',
      highlightText: 'Elevate Your Company Brand',
      description: 'Sublimation ceramic coffee mugs, bio-wash cotton t-shirts, engraved metal pen sets, and debossed executive diaries with tailored employee onboarding kits.',
      categorySlug: 'gifting',
      ctaText: 'Explore Corporate Gifting',
      accentColor: 'rose',
      bgGradient: 'from-slate-950 via-stone-900 to-rose-950',
      bulletPoints: ['Low MOQ from 10 Sets', 'Laser & DTF Screen Printing', 'Bulk Tiered Wholesale Pricing'],
    },
  ];

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white border-b border-neutral-800">
      {/* Dynamic Slide Background with Subtle Grid Pattern */}
      <div className={`transition-all duration-700 bg-gradient-to-r ${slide.bgGradient} py-14 sm:py-20 px-4 sm:px-6 relative`}>
        {/* Subtle dot matrix overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Copy & Primary CTAs (7 columns) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{slide.badge}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">Delhi NCR Hub</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              {slide.title}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                {slide.highlightText}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {slide.description}
            </p>

            {/* Bullet Points */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200 pt-1">
              {slide.bulletPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onExploreCategory(slide.categorySlug)}
                className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Instant Price Calculator</span>
              </button>
            </div>
          </div>

          {/* Right: Quick Highlights Card (5 columns) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Print Desk Highlights
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Open for Orders
                </span>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-100">Same-Day Rush Dispatch</div>
                    <div className="text-slate-400 text-[11px]">Orders placed before 1:00 PM ready by evening</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-100">Free Machine Proofing</div>
                    <div className="text-slate-400 text-[11px]">Digital PDF proof sign-off before machine plating</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-100">B2B GST Invoicing</div>
                    <div className="text-slate-400 text-[11px]">100% Tax invoice with Input Tax Credit (ITC)</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800">
                <a
                  href={buildGeneralWhatsAppUrl('Bulk Quote for Delhi NCR Store')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Chat With Print Master on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls & Indicators */}
        <div className="max-w-7xl mx-auto mt-8 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] tabular-nums text-slate-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
