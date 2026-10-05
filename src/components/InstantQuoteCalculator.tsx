import React, { useState } from 'react';
import { 
  Calculator, 
  MessageCircle, 
  Sparkles, 
  Check, 
  Clock, 
  ShieldCheck, 
  Share2, 
  ChevronRight,
  FileCheck2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { buildWhatsAppOrderUrl, CONTACT_INFO } from '../data/contact';
import { useAccount } from '../context/AccountContext';

export const InstantQuoteCalculator: React.FC = () => {
  const { currentUser, isAuthenticated } = useAccount();

  // Selected State
  const [selectedCategoryId, setSelectedCategoryId] = useState('stationery');
  const availableProducts = PRODUCTS.filter((p) => p.category === selectedCategoryId);
  const [selectedProductId, setSelectedProductId] = useState(availableProducts[0]?.id || PRODUCTS[0].id);

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [quantity, setQuantity] = useState<number>(product.moq || 100);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.specs.materials[0] || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState<string>(product.specs.finishes[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.specs.standardSizes[0] || 'Standard');
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // When product changes, reset to default options
  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const p = PRODUCTS.find((item) => item.id === prodId);
    if (p) {
      setQuantity(p.moq || 50);
      setSelectedMaterial(p.specs.materials[0] || 'Standard');
      setSelectedFinish(p.specs.finishes[0] || 'Standard');
      setSelectedSize(p.specs.standardSizes[0] || 'Standard');
    }
  };

  // Calculate pricing based on tiers
  const calculatePricing = () => {
    let unitRate = product.basePrice / (product.moq || 1);

    // Check pricing tiers
    if (product.pricingTiers && product.pricingTiers.length > 0) {
      // Find the closest tier less than or equal to quantity
      const matchedTier = [...product.pricingTiers]
        .reverse()
        .find((t) => quantity >= t.qty);

      if (matchedTier) {
        unitRate = matchedTier.unitPrice;
      } else {
        unitRate = product.pricingTiers[0].unitPrice;
      }
    }

    // Material modifier
    let materialMultiplier = 1;
    if (selectedMaterial.includes('400 GSM') || selectedMaterial.includes('Textured')) {
      materialMultiplier = 1.25;
    } else if (selectedMaterial.includes('Blackout') || selectedMaterial.includes('Backlit')) {
      materialMultiplier = 1.3;
    }

    // Finish modifier
    let finishAdder = 0;
    if (selectedFinish.includes('Spot UV') || selectedFinish.includes('Gold Stamping')) {
      finishAdder = 0.6; // per unit
    } else if (selectedFinish.includes('Velvet')) {
      finishAdder = 0.35;
    }

    const finalUnitRate = Number(((unitRate * materialMultiplier) + finishAdder).toFixed(2));
    const subtotal = Math.round(finalUnitRate * quantity);
    const gst = includeGst ? Math.round(subtotal * 0.18) : 0;
    const total = subtotal + gst;

    return {
      unitRate: finalUnitRate,
      subtotal,
      gst,
      total,
    };
  };

  const pricing = calculatePricing();

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppOrderUrl({
      productName: product.name,
      quantity,
      material: selectedMaterial,
      finish: selectedFinish,
      size: selectedSize,
      estimatedPrice: pricing.total,
      customerName: currentUser?.name,
      customerPhone: currentUser?.phone,
      city: currentUser?.addresses[0]?.city || 'Delhi NCR',
    });
    window.open(url, '_blank');
  };

  const handleShareQuote = () => {
    if (navigator.clipboard) {
      const quoteText = `Shivani Graphics Quote: ${product.name} | Qty: ${quantity} | Est. ₹${pricing.total} (Incl. GST)`;
      navigator.clipboard.writeText(quoteText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Container with Printo style configurator */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Calculator className="w-4 h-4" />
              <span>Interactive Print Configurator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight">
              Instant Commercial Print & Price Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Select your specifications, preview real-time bulk tiered prices, and trigger an instant order on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-4 py-2.5 rounded-lg border border-slate-700 shrink-0">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Turnaround: <strong className="text-white">{product.turnaroundTime}</strong></span>
          </div>
        </div>

        {/* Configurator Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Category Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategoryId(c.id);
                      const prods = PRODUCTS.filter((p) => p.category === c.id);
                      if (prods.length > 0) {
                        handleProductChange(prods[0].id);
                      }
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      selectedCategoryId === c.id
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Product Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                2. Select Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-slate-900 text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none"
              >
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.subCategory})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Quantity Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  3. Select Quantity (MOQ: {product.moq} pcs)
                </label>
                <span className="text-xs font-bold text-blue-600 tabular-nums">
                  {quantity.toLocaleString()} {product.subCategory === 'Flex Banners' ? 'Sq. Ft' : 'Pcs'}
                </span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.pricingTiers.map((tier) => (
                  <button
                    key={tier.qty}
                    onClick={() => setQuantity(tier.qty)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer tabular-nums ${
                      quantity === tier.qty
                        ? 'bg-slate-900 text-white'
                        : 'bg-neutral-100 text-slate-700 hover:bg-neutral-200'
                    }`}
                  >
                    {tier.qty} {product.subCategory === 'Flex Banners' ? 'sqft' : 'pcs'}
                    <span className="ml-1 text-[10px] text-emerald-600 font-bold">
                      (₹{tier.unitPrice}/u)
                    </span>
                  </button>
                ))}
              </div>

              {/* Slider for custom quantity */}
              <input
                type="range"
                min={product.moq}
                max={product.moq * 25}
                step={product.moq >= 100 ? 50 : 5}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 4. Material / Paper Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                4. Paper Stock / Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors ${
                      selectedMaterial === mat
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{mat}</span>
                    {selectedMaterial === mat && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Finishing Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                5. Surface Finish / Lamination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.finishes.map((fin) => (
                  <button
                    key={fin}
                    onClick={() => setSelectedFinish(fin)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors ${
                      selectedFinish === fin
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{fin}</span>
                    {selectedFinish === fin && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Summary Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Estimated Commercial Quote
                </div>
                <button
                  onClick={handleShareQuote}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Quote'}</span>
                </button>
              </div>

              {/* Item Details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Selected Product:</span>
                  <span className="font-bold text-slate-900 text-right">{product.name}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Quantity:</span>
                  <span className="font-semibold tabular-nums">{quantity.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Stock:</span>
                  <span className="font-semibold text-right">{selectedMaterial}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Finish:</span>
                  <span className="font-semibold text-right">{selectedFinish}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Calculated Unit Rate:</span>
                  <span className="font-mono font-bold text-blue-700 tabular-nums">
                    ₹{pricing.unitRate.toFixed(2)} / unit
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold tabular-nums">₹{pricing.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGst}
                      onChange={(e) => setIncludeGst(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span>Include 18% GST (Tax Invoice)</span>
                  </label>
                  <span className="font-semibold tabular-nums">₹{pricing.gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900">Total Estimate:</span>
                    <div className="text-[10px] text-slate-500">Includes Delhi NCR pre-press review</div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
                    ₹{pricing.total.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Customer Integration Note */}
              {isAuthenticated ? (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Logged in as <strong>{currentUser?.name}</strong>. Your Delhi delivery address and contact will be auto-attached.
                  </span>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500">
                  Tip: Log in to save this quote or order with your default company billing address.
                </div>
              )}

              {/* Instant WhatsApp Order CTA Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order via WhatsApp Now</span>
                </button>
                <div className="text-center text-[10px] text-slate-400">
                  Automated routing to Delhi NCR Desk: {CONTACT_INFO.primaryPhone}
                </div>
              </div>
            </div>

            {/* Quality badge below */}
            <div className="mt-4 p-3 bg-neutral-100/70 rounded-lg border border-neutral-200 flex items-center gap-3 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Free digital PDF proof shared on WhatsApp prior to offset/digital machine run.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
