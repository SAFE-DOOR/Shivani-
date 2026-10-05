import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  Layers, 
  Scissors, 
  Sparkles,
  CheckCircle2,
  X,
  Filter,
  RotateCcw
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { buildWhatsAppOrderUrl } from '../data/contact';
import { useAccount } from '../context/AccountContext';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  initialCategory = 'all',
}) => {
  const { currentUser } = useAccount();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('all');
  const [selectedFinishFilter, setSelectedFinishFilter] = useState<string>('all');
  const [selectedTurnaroundFilter, setSelectedTurnaroundFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'moq-asc'>('popular');
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  // Available Material Filter Buckets
  const materialFilters = [
    { id: 'all', label: 'All Materials' },
    { id: 'gsm', label: 'High GSM Paper (300–400 GSM)' },
    { id: 'flex', label: 'Outdoor Flex Media' },
    { id: 'vinyl', label: 'Waterproof Vinyl' },
    { id: 'acrylic', label: 'Cast Acrylic & ACP' },
    { id: 'cotton_ceramic', label: 'Cotton Apparel & Ceramic' },
  ];

  // Available Finishing Filter Buckets
  const finishFilters = [
    { id: 'all', label: 'All Finishes' },
    { id: 'spot_uv', label: 'Spot UV Varnish' },
    { id: 'velvet', label: 'Velvet Soft-Touch / Lamination' },
    { id: 'foil', label: 'Gold Foil & Debossing' },
    { id: 'die_cut', label: 'Die-Cut & Contour Shape' },
    { id: 'gloss', label: 'High-Gloss Lamination' },
  ];

  // Turnaround Filters
  const turnaroundFilters = [
    { id: 'all', label: 'Any Turnaround' },
    { id: 'same_day', label: 'Same Day Dispatch' },
    { id: '24_48', label: '24–48 Hours' },
  ];

  // Helper matching functions
  const matchesMaterial = (product: Product, filter: string): boolean => {
    if (filter === 'all') return true;
    const mats = product.specs.materials.join(' ').toLowerCase();
    if (filter === 'gsm') {
      return mats.includes('gsm') || mats.includes('ivory') || mats.includes('art card') || mats.includes('bond');
    }
    if (filter === 'flex') {
      return mats.includes('flex');
    }
    if (filter === 'vinyl') {
      return mats.includes('vinyl') || mats.includes('film');
    }
    if (filter === 'acrylic') {
      return mats.includes('acrylic') || mats.includes('acp') || mats.includes('iron');
    }
    if (filter === 'cotton_ceramic') {
      return mats.includes('cotton') || mats.includes('ceramic') || mats.includes('leatherette');
    }
    return true;
  };

  const matchesFinish = (product: Product, filter: string): boolean => {
    if (filter === 'all') return true;
    const fins = product.specs.finishes.join(' ').toLowerCase();
    if (filter === 'spot_uv') return fins.includes('spot uv') || fins.includes('uv');
    if (filter === 'velvet') return fins.includes('velvet') || fins.includes('matte') || fins.includes('lamination');
    if (filter === 'foil') return fins.includes('gold') || fins.includes('foil') || fins.includes('debossing') || fins.includes('engraved');
    if (filter === 'die_cut') return fins.includes('die-cut') || fins.includes('cutout') || fins.includes('contour');
    if (filter === 'gloss') return fins.includes('gloss');
    return true;
  };

  const matchesTurnaround = (product: Product, filter: string): boolean => {
    if (filter === 'all') return true;
    const turn = product.turnaroundTime.toLowerCase();
    if (filter === 'same_day') return turn.includes('same day') || turn.includes('2 hours');
    if (filter === '24_48') return turn.includes('24') || turn.includes('48') || turn.includes('same day') || turn.includes('2 hours');
    return true;
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesMat = matchesMaterial(p, selectedMaterialFilter);
      const matchesFin = matchesFinish(p, selectedFinishFilter);
      const matchesTurn = matchesTurnaround(p, selectedTurnaroundFilter);
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.hindiTagline && p.hindiTagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.specs.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.specs.finishes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesMat && matchesFin && matchesTurn && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'moq-asc') return a.moq - b.moq;
      return 0;
    });
  }, [selectedCategory, selectedMaterialFilter, selectedFinishFilter, selectedTurnaroundFilter, searchQuery, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMaterialFilter !== 'all' ? 1 : 0) +
    (selectedFinishFilter !== 'all' ? 1 : 0) +
    (selectedTurnaroundFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterialFilter('all');
    setSelectedFinishFilter('all');
    setSelectedTurnaroundFilter('all');
    setSearchQuery('');
  };

  const handleQuickWhatsApp = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const url = buildWhatsAppOrderUrl({
      productName: product.name,
      quantity: product.moq,
      material: product.specs.materials[0] || 'Standard Paper',
      finish: product.specs.finishes[0] || 'Standard Finish',
      estimatedPrice: product.basePrice,
      customerName: currentUser?.name,
      customerPhone: currentUser?.phone,
      city: currentUser?.addresses[0]?.city || 'Delhi NCR',
    });
    window.open(url, '_blank');
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-neutral-200 pb-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Commercial Digital Catalog · Printo Benchmark
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Printing Products, Signage & Merch Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Filter by paper GSM, outdoor flex, vinyl, Spot UV finishes, or turnarounds. Real-time pricing & WhatsApp routing.
          </p>
        </div>

        {/* Live Counter & Reset */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters ({activeFiltersCount})</span>
            </button>
          )}
          <div className="text-xs font-semibold text-slate-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            Showing <span className="text-blue-600 font-bold">{filteredProducts.length}</span> verified products
          </div>
        </div>
      </div>

      {/* Primary Category Tabs (Segmented Button Controls) */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Filter by Category:
          </label>
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100/90 rounded-xl border border-neutral-200">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-200/60'
              }`}
            >
              All Products ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-200/60'
                }`}
              >
                {cat.name} ({PRODUCTS.filter((p) => p.category === cat.id).length})
              </button>
            ))}
          </div>
        </div>

        {/* Search, Advanced Filter Toggle & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search visiting cards, 350 GSM, Spot UV, Standee, Flex..."
              className="w-full bg-white text-xs text-slate-900 rounded-lg pl-9 pr-4 py-2.5 border border-neutral-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Toggle Advanced Filters Button */}
            <button
              onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAdvancedFiltersOpen || selectedMaterialFilter !== 'all' || selectedFinishFilter !== 'all' || selectedTurnaroundFilter !== 'all'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-neutral-300 text-slate-700 hover:bg-neutral-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Advanced Filters</span>
              {(selectedMaterialFilter !== 'all' || selectedFinishFilter !== 'all' || selectedTurnaroundFilter !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 whitespace-nowrap hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-neutral-300 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="moq-asc">MOQ: Low First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel (Material & Finishing options as requested) */}
        {isAdvancedFiltersOpen && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Filter by Material Type & Surface Finishing</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              {/* Material Filter */}
              <div>
                <label className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Material / Paper Type</span>
                </label>
                <div className="space-y-1">
                  {materialFilters.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterialFilter(m.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-between text-[11px] ${
                        selectedMaterialFilter === m.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-600 hover:bg-neutral-200/70'
                      }`}
                    >
                      <span>{m.label}</span>
                      {selectedMaterialFilter === m.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finishing Filter */}
              <div>
                <label className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Scissors className="w-3.5 h-3.5 text-purple-600" />
                  <span>Finishing / Surface Treatment</span>
                </label>
                <div className="space-y-1">
                  {finishFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinishFilter(f.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-between text-[11px] ${
                        selectedFinishFilter === f.id
                          ? 'bg-purple-600 text-white font-bold'
                          : 'text-slate-600 hover:bg-neutral-200/70'
                      }`}
                    >
                      <span>{f.label}</span>
                      {selectedFinishFilter === f.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Turnaround Speed */}
              <div>
                <label className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Production Turnaround</span>
                </label>
                <div className="space-y-1">
                  {turnaroundFilters.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTurnaroundFilter(t.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-between text-[11px] ${
                        selectedTurnaroundFilter === t.id
                          ? 'bg-amber-600 text-white font-bold'
                          : 'text-slate-600 hover:bg-neutral-200/70'
                      }`}
                    >
                      <span>{t.label}</span>
                      {selectedTurnaroundFilter === t.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white rounded-xl border border-neutral-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Product Visual Top */}
              <div>
                <div className="relative w-full overflow-hidden bg-slate-900">
                  <ProductVisual
                    category={product.category}
                    subCategory={product.subCategory}
                    name={product.name}
                    aspectRatio="4:3"
                  />

                  {/* Single Clean Tag (anti-slop rule) */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 border border-emerald-900">
                    <Clock className="w-3 h-3" />
                    <span>{product.turnaroundTime}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2">
                  {/* Clean unboxed metadata with dot separator */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span>{product.subCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span>MOQ: {product.moq} pcs</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {product.hindiTagline && (
                    <div className="text-[11px] text-slate-400 font-normal">
                      {product.hindiTagline}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Bottom */}
              <div className="p-4 pt-3 border-t border-neutral-100 bg-neutral-50/50 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting at</span>
                    <span className="text-base font-extrabold text-slate-900 font-display tabular-nums">
                      ₹{product.basePrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {product.priceUnit}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleQuickWhatsApp(e, product)}
                    className="py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Instant WhatsApp Order"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No print products match your filter criteria</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting your material or finishing filters to see available products.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
