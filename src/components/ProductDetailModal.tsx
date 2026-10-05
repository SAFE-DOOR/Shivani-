import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Check, 
  Clock, 
  ShieldCheck, 
  FileCheck2, 
  Truck, 
  PhoneCall, 
  BookmarkCheck,
  Share2
} from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { CONTACT_INFO, buildWhatsAppOrderUrl } from '../data/contact';
import { useAccount } from '../context/AccountContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { currentUser, isAuthenticated, recordNewOrder, openAccountModal } = useAccount();

  if (!product) return null;

  const [selectedQty, setSelectedQty] = useState<number>(product.moq || 100);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.specs.materials[0] || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState<string>(product.specs.finishes[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.specs.standardSizes[0] || 'Standard');
  const [selectedPhoneRaw, setSelectedPhoneRaw] = useState<string>(CONTACT_INFO.primaryPhoneRaw);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'guidelines' | 'faq'>('specs');
  const [orderRecorded, setOrderRecorded] = useState(false);

  // Price calculations based on tiers
  const getCalculatedPrice = () => {
    let unitRate = product.basePrice / (product.moq || 1);
    if (product.pricingTiers && product.pricingTiers.length > 0) {
      const matched = [...product.pricingTiers].reverse().find((t) => selectedQty >= t.qty);
      unitRate = matched ? matched.unitPrice : product.pricingTiers[0].unitPrice;
    }

    if (selectedMaterial.includes('400 GSM') || selectedMaterial.includes('Textured')) {
      unitRate *= 1.25;
    }
    if (selectedFinish.includes('Spot UV') || selectedFinish.includes('Gold')) {
      unitRate += 0.5;
    }

    const subtotal = Math.round(unitRate * selectedQty);
    const gst = Math.round(subtotal * 0.18);
    return {
      unitRate: Number(unitRate.toFixed(2)),
      subtotal,
      gst,
      total: subtotal + gst,
    };
  };

  const pricing = getCalculatedPrice();

  const handleLaunchWhatsApp = () => {
    // Also record order in customer's order history if authenticated
    if (isAuthenticated && currentUser) {
      const defaultAddr = currentUser.addresses.find((a) => a.isDefault) || currentUser.addresses[0] || {
        id: 'addr_quick',
        title: 'Primary Office',
        receiverName: currentUser.name,
        phone: currentUser.phone,
        street: 'Commercial Delivery Address',
        city: 'Delhi NCR',
        state: 'Delhi',
        pincode: '110001',
      };

      recordNewOrder({
        items: [
          {
            productId: product.id,
            productName: product.name,
            category: product.category,
            quantity: selectedQty,
            material: selectedMaterial,
            finish: selectedFinish,
            size: selectedSize,
            unitPrice: pricing.unitRate,
            totalPrice: pricing.subtotal,
          },
        ],
        subtotal: pricing.subtotal,
        gstAmount: pricing.gst,
        totalAmount: pricing.total,
        status: 'proof_pending',
        deliveryAddress: defaultAddr,
        deliveryType: 'Delhi NCR Express',
        paymentStatus: 'Advance Paid',
        whatsappReferenceText: `${product.name} (Qty: ${selectedQty})`,
      });
      setOrderRecorded(true);
    }

    const whatsappUrl = buildWhatsAppOrderUrl({
      productName: product.name,
      quantity: selectedQty,
      material: selectedMaterial,
      finish: selectedFinish,
      size: selectedSize,
      estimatedPrice: pricing.total,
      customerName: currentUser?.name,
      customerPhone: currentUser?.phone,
      city: currentUser?.addresses[0]?.city || 'Delhi NCR',
      targetPhoneRaw: selectedPhoneRaw,
      customNotes: customNotes.trim() ? customNotes : undefined,
    });

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Product Configurator & WhatsApp Order Engine
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Visual Gallery & Specs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Visual Display */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xs bg-slate-900">
              <ProductVisual
                category={product.category}
                subCategory={product.subCategory}
                name={product.name}
                aspectRatio="4:3"
              />
            </div>

            {/* Quick Highlights Row */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Min Qty</span>
                <span className="font-bold text-slate-900">{product.moq} units</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Dispatch</span>
                <span className="font-bold text-emerald-600">{product.turnaroundTime}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Color Mode</span>
                <span className="font-bold text-blue-600">CMYK Verified</span>
              </div>
            </div>

            {/* Tabbed Info */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden">
              <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-2.5 text-center cursor-pointer transition-colors ${
                    activeTab === 'specs'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('guidelines')}
                  className={`flex-1 py-2.5 text-center cursor-pointer transition-colors ${
                    activeTab === 'guidelines'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Artwork & Pre-Press
                </button>
              </div>

              <div className="p-4 text-xs space-y-3">
                {activeTab === 'specs' ? (
                  <>
                    <p className="text-slate-600 leading-relaxed">{product.description}</p>
                    <div className="space-y-1.5 pt-2">
                      <div className="font-bold text-slate-800">Commercial Key Features:</div>
                      {product.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-slate-600">
                    <p className="font-medium text-slate-800">Recommended File Formats for Maximum Clarity:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.specs.fileFormatsAccepted.map((fmt, idx) => (
                        <span key={idx} className="bg-neutral-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono">
                          {fmt}
                        </span>
                      ))}
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 pt-2">
                      <li>Maintain 3mm bleed margin for edge trimming tolerance (±2mm).</li>
                      <li>Convert all fonts/text to outlines/curves (Ctrl+Q in CorelDraw).</li>
                      <li>Use CMYK color space. RGB screen colors will be converted with CMYK tolerances.</li>
                      <li>Share files directly via WhatsApp document or Google Drive link.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator & WhatsApp Engine (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* 1. Size Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Standard Dimensions / Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {product.specs.standardSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2 text-xs text-left rounded-lg border transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'border-blue-600 bg-blue-50/70 font-bold text-blue-900'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Paper Stock / Material */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Material / GSM Paper Grade
              </label>
              <div className="space-y-1.5">
                {product.specs.materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full p-2.5 text-xs text-left rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                      selectedMaterial === mat
                        ? 'border-blue-600 bg-blue-50/70 font-bold text-blue-900'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{mat}</span>
                    {selectedMaterial === mat && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Surface Finishing */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Finishing & Surface Treatment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {product.specs.finishes.map((fin) => (
                  <button
                    key={fin}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-2 text-xs text-left rounded-lg border transition-colors cursor-pointer ${
                      selectedFinish === fin
                        ? 'border-blue-600 bg-blue-50/70 font-bold text-blue-900'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    {fin}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Quantity Tiers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Select Quantity Tier
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {product.pricingTiers.map((tier) => (
                  <button
                    key={tier.qty}
                    onClick={() => setSelectedQty(tier.qty)}
                    className={`p-2 text-center rounded-lg border transition-colors cursor-pointer ${
                      selectedQty === tier.qty
                        ? 'bg-slate-900 text-white font-bold'
                        : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-xs font-semibold tabular-nums">{tier.qty}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">₹{tier.unitPrice}/u</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Custom Requirements / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Custom Instructions (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Need punch hole, rounded corners, urgent 24hr delivery..."
                className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:border-blue-600 outline-none"
              />
            </div>

            {/* 6. Desk Number Selector */}
            <div className="bg-neutral-100 p-2.5 rounded-lg text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700">Route WhatsApp To:</span>
              <select
                value={selectedPhoneRaw}
                onChange={(e) => setSelectedPhoneRaw(e.target.value)}
                className="bg-white border border-neutral-300 text-xs rounded px-2 py-1 font-semibold text-slate-800 outline-none"
              >
                <option value={CONTACT_INFO.primaryPhoneRaw}>Primary (+91-7053197695)</option>
                <option value={CONTACT_INFO.alternatePhones[0].raw}>Production (+91-9810157695)</option>
                <option value={CONTACT_INFO.alternatePhones[1].raw}>Bulk (+91-9266944315)</option>
              </select>
            </div>

            {/* 7. Pricing Summary Box */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Calculated Unit Price:</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{pricing.unitRate.toFixed(2)} / unit
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Subtotal ({selectedQty} units):</span>
                <span className="font-semibold tabular-nums">₹{pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Est. GST (18% ITC Eligible):</span>
                <span className="font-semibold tabular-nums">₹{pricing.gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-900">Total Order Estimate:</span>
                  <div className="text-[10px] text-slate-500">Pay after proof approval</div>
                </div>
                <div className="text-xl font-extrabold text-blue-700 font-display tabular-nums">
                  ₹{pricing.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Customer Account Hook */}
            {isAuthenticated ? (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Clicking Order will record this order in your customer portal for <strong>{currentUser?.name}</strong>.
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAccountModal('login')}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Have an account? Sign in for saved billing addresses & order tracking.</span>
              </button>
            )}

            {/* Primary Action: Direct WhatsApp Order Trigger Button */}
            <button
              onClick={handleLaunchWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order Specifications via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-neutral-100 border-t border-neutral-200 text-center text-xs text-slate-600 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Delhi NCR Local Courier & Store Pickup</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Call: {CONTACT_INFO.primaryPhone}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
