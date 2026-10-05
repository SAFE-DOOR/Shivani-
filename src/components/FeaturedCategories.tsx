import React from 'react';
import { 
  CreditCard, 
  Megaphone, 
  Sparkles, 
  Gift, 
  Package, 
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ProductVisual } from './ProductVisual';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-rose-600" />;
      case 'Package':
        return <Package className="w-5 h-5 text-purple-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-neutral-200 pb-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Printo-Inspired Product Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Explore Core Print Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            From high-precision stationery to industrial large-format outdoor flex and acrylic retail displays.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600">
          5 Specialized Production Divisions · Delhi NCR
        </div>
      </div>

      {/* 5-Column Responsive Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group text-left bg-white rounded-xl border border-neutral-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
          >
            {/* Visual Thumbnail */}
            <div className="w-full relative overflow-hidden bg-slate-900 group-hover:opacity-95 transition-opacity">
              <ProductVisual category={cat.id} aspectRatio="4:3" />
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Category Information */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-neutral-100 group-hover:bg-blue-50 transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                    {cat.itemCount} Items
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>View Products</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
