import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Share2, 
  ArrowRight, 
  Sliders, 
  Layers, 
  Palette, 
  Scissors, 
  FileCheck2,
  BookmarkCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { CONTACT_INFO, buildWhatsAppOrderUrl } from '../data/contact';
import { useAccount } from '../context/AccountContext';

interface ProductConfiguratorProps {
  product: Product;
  onOrderCompleted?: () => void;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  onOrderCompleted,
}) => {
  const { currentUser, isAuthenticated, recordNewOrder, openAccountModal } = useAccount();

  // Configurator Options State
  const [quantity, setQuantity] = useState<number>(product.moq || 100);
  const [customQtyInput, setCustomQtyInput] = useState<string>('');

  // Paper / Material Selection
  const allMaterials = useMemo(() => {
    // Merge standard product materials with common industry materials if not already present
    const base = [...product.specs.materials];
    const suggestions = ['350 GSM Velvet Matte', '300 GSM High-Gloss Art Card', '400 GSM Super-Thick Ivory', 'Star Flex 320 GSM', 'Waterproof Vinyl'];
    suggestions.forEach((s) => {
      if (!base.includes(s) && (product.category === 'stationery' || product.category === 'marketing')) {
        base.push(s);
      }
    });
    return base;
  }, [product]);

  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    allMaterials[0] || '350 GSM Velvet Matte'
  );

  // Finishing Options
  const allFinishes = useMemo(() => {
    const base = [...product.specs.finishes];
    const suggestions = ['Spot UV Varnish', 'Die-Cut Custom Shape', 'Velvet Soft-Touch Lamination', 'Metallic Gold Stamping', 'Thermal Matte Lamination', 'Gloss High-Shine'];
    suggestions.forEach((s) => {
      if (!base.includes(s)) {
        base.push(s);
      }
    });
    return base;
  }, [product]);

  const [selectedFinish, setSelectedFinish] = useState<string>(
    allFinishes[0] || 'Velvet Soft-Touch Lamination'
  );

  // Size / Dimension Selection
  const [selectedSize, setSelectedSize] = useState<string>(
    product.specs.standardSizes[0] || 'Standard'
  );

  // Target Phone
  const [selectedPhoneRaw, setSelectedPhoneRaw] = useState<string>(CONTACT_INFO.primaryPhoneRaw);

  // Special Notes
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [orderRecordedNotice, setOrderRecordedNotice] = useState(false);

  // Real-Time Dynamic Price Engine
  const priceBreakdown = useMemo(() => {
    // 1. Base unit rate from product pricing tiers
    let baseRate = product.basePrice / (product.moq || 1);
    if (product.pricingTiers && product.pricingTiers.length > 0) {
      const matchedTier = [...product.pricingTiers].reverse().find((t) => quantity >= t.qty);
      baseRate = matchedTier ? matchedTier.unitPrice : product.pricingTiers[0].unitPrice;
    }

    // 2. Paper Stock / Material Multiplier
    let materialMultiplier = 1.0;
    if (selectedMaterial.includes('400 GSM') || selectedMaterial.includes('Ivory')) {
      materialMultiplier = 1.25;
    } else if (selectedMaterial.includes('Velvet') || selectedMaterial.includes('350 GSM')) {
      materialMultiplier = 1.15;
    } else if (selectedMaterial.includes('Star Flex') || selectedMaterial.includes('Backlit')) {
      materialMultiplier = 1.3;
    } else if (selectedMaterial.includes('Vinyl') || selectedMaterial.includes('Holographic')) {
      materialMultiplier = 1.2;
    }

    // 3. Finishing Add-On Cost per unit
    let finishAddOn = 0.0;
    if (selectedFinish.includes('Spot UV')) {
      finishAddOn = 0.65; // ₹0.65 per unit spot UV varnish
    } else if (selectedFinish.includes('Die-Cut')) {
      finishAddOn = 0.45; // ₹0.45 custom contour die punch
    } else if (selectedFinish.includes('Velvet Soft-Touch')) {
      finishAddOn = 0.4; // ₹0.40 thermal velvet film
    } else if (selectedFinish.includes('Gold Stamping') || selectedFinish.includes('Foil')) {
      finishAddOn = 0.85; // ₹0.85 hot foil stamping
    } else if (selectedFinish.includes('Gloss') || selectedFinish.includes('Matte')) {
      finishAddOn = 0.15;
    }

    const calculatedUnitPrice = Number(((baseRate * materialMultiplier) + finishAddOn).toFixed(2));
    const subtotal = Math.round(calculatedUnitPrice * quantity);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return {
      baseRate,
      calculatedUnitPrice,
      subtotal,
      gst,
      total,
    };
  }, [product, quantity, selectedMaterial, selectedFinish]);

  // Handle Custom Quantity Input
  const handleCustomQtyChange = (val: string) => {
    setCustomQtyInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= (product.moq || 1)) {
      setQuantity(num);
    }
  };

  // Launch WhatsApp with Dynamic Payload
  const handleLaunchWhatsApp = () => {
    if (isAuthenticated && currentUser) {
      const defaultAddr = currentUser.addresses.find((a) => a.isDefault) || currentUser.addresses[0] || {
        id: 'addr_auto',
        title: 'Office',
        receiverName: currentUser.name,
        phone: currentUser.phone,
        street: 'Commercial Address',
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
            quantity,
            material: selectedMaterial,
            finish: selectedFinish,
            size: selectedSize,
            unitPrice: priceBreakdown.calculatedUnitPrice,
            totalPrice: priceBreakdown.subtotal,
          },
        ],
        subtotal: priceBreakdown.subtotal,
        gstAmount: priceBreakdown.gst,
        totalAmount: priceBreakdown.total,
        status: 'proof_pending',
        deliveryAddress: defaultAddr,
        deliveryType: 'Delhi NCR Express',
        paymentStatus: 'Advance Paid',
        whatsappReferenceText: `${product.name} (Qty: ${quantity}, ${selectedMaterial}, ${selectedFinish})`,
      });

      setOrderRecordedNotice(true);
    }

    const whatsappUrl = buildWhatsAppOrderUrl({
      productName: product.name,
      quantity,
      material: selectedMaterial,
      finish: selectedFinish,
      size: selectedSize,
      estimatedPrice: priceBreakdown.total,
      customerName: currentUser?.name,
      customerPhone: currentUser?.phone,
      city: currentUser?.addresses[0]?.city || 'Delhi NCR',
      targetPhoneRaw: selectedPhoneRaw,
      customNotes: customNotes.trim() ? customNotes : undefined,
    });

    window.open(whatsappUrl, '_blank');
    if (onOrderCompleted) onOrderCompleted();
  };

  const handleCopyQuote = () => {
    if (navigator.clipboard) {
      const text = `Shivani Graphics Quote:\nProduct: ${product.name}\nQuantity: ${quantity} units\nMaterial: ${selectedMaterial}\nFinish: ${selectedFinish}\nSize: ${selectedSize}\nUnit Price: ₹${priceBreakdown.calculatedUnitPrice}\nTotal Price: ₹${priceBreakdown.total} (Incl. 18% GST)\nTurnaround: ${product.turnaroundTime}`;
      navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Dynamic Configurator</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-normal">Real-Time Pricing Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight">
            {product.name}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Configure paper GSM, finishes, and quantity with instant price updates & pre-filled WhatsApp routing.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-slate-800 border border-slate-700 text-emerald-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Dispatch: {product.turnaroundTime}</span>
          </div>
        </div>
      </div>

      {/* Main Configurator Layout */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Visual & Specifications Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Canvas */}
          <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-2xs bg-slate-900">
            <ProductVisual
              category={product.category}
              subCategory={product.subCategory}
              name={product.name}
              aspectRatio="4:3"
            />
          </div>

          {/* Real-time Configured Summary Badge */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Your Current Configuration:</span>
              <span className="text-emerald-700 font-mono font-bold">
                ₹{priceBreakdown.calculatedUnitPrice}/unit
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Material</span>
                <span className="font-semibold text-slate-800 truncate block">{selectedMaterial}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Finishing</span>
                <span className="font-semibold text-slate-800 truncate block">{selectedFinish}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Quantity</span>
                <span className="font-semibold text-slate-800 tabular-nums">{quantity.toLocaleString()} units</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dimension</span>
                <span className="font-semibold text-slate-800 truncate block">{selectedSize}</span>
              </div>
            </div>
          </div>

          {/* Pre-Press Quality Guarantee */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-blue-950">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Free Pre-Press 3D Digital PDF Proof</span>
            </div>
            <p className="text-blue-800 leading-relaxed text-[11px]">
              Before physical machine plating or flex plotting starts, our Delhi NCR DTP team shares a 3D digital PDF proof on WhatsApp for your final sign-off.
            </p>
          </div>
        </div>

        {/* Right Configuration Controls & Real-Time Price (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. QUANTITY SELECTOR (Tiers + Custom) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>1. Select Quantity</span>
                <span className="text-slate-400 font-normal">(MOQ: {product.moq} pcs)</span>
              </label>
              <span className="text-xs font-bold text-blue-700 font-mono tabular-nums">
                Current: {quantity.toLocaleString()} units
              </span>
            </div>

            {/* Preset Tier Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {product.pricingTiers.map((tier) => (
                <button
                  key={tier.qty}
                  type="button"
                  onClick={() => {
                    setQuantity(tier.qty);
                    setCustomQtyInput('');
                  }}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    quantity === tier.qty && !customQtyInput
                      ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-slate-800 border-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold tabular-nums">{tier.qty}</div>
                  <div className="text-[10px] text-emerald-600 font-medium">₹{tier.unitPrice}/u</div>
                </button>
              ))}
            </div>

            {/* Custom Quantity Input */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min={product.moq}
                  value={customQtyInput}
                  onChange={(e) => handleCustomQtyChange(e.target.value)}
                  placeholder={`Or enter custom quantity (Min ${product.moq})...`}
                  className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:border-blue-600 outline-none font-medium"
                />
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                Bulk discounts automatically apply
              </span>
            </div>
          </div>

          {/* 2. PAPER TYPE / MATERIAL SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Select Paper Type / Material</span>
              </label>
              <span className="text-[11px] text-slate-500">Live price recalculation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allMaterials.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setSelectedMaterial(mat)}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    selectedMaterial === mat
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold'
                      : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs">{mat}</span>
                  {selectedMaterial === mat ? (
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-neutral-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. FINISHING SELECTION (Spot UV, Die-Cut, Velvet Lamination, etc.) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-purple-600" />
                <span>3. Select Finishing & Surface Treatment</span>
              </label>
              <span className="text-[11px] text-slate-500">Tactile & visual finishes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allFinishes.map((fin) => (
                <button
                  key={fin}
                  type="button"
                  onClick={() => setSelectedFinish(fin)}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    selectedFinish === fin
                      ? 'border-purple-600 bg-purple-50/70 text-purple-900 font-bold'
                      : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs">{fin}</span>
                  {selectedFinish === fin ? (
                    <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-neutral-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. DIMENSIONS / SIZE */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              4. Dimensions / Standard Sizing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {product.specs.standardSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`p-2.5 text-xs text-left rounded-lg border transition-colors cursor-pointer ${
                    selectedSize === sz
                      ? 'border-slate-900 bg-slate-900 text-white font-bold'
                      : 'border-neutral-200 text-slate-700 hover:bg-neutral-50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* 5. WHATSAPP ROUTING DESK */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <span className="font-semibold text-slate-700">Dispatch Route WhatsApp To:</span>
            <select
              value={selectedPhoneRaw}
              onChange={(e) => setSelectedPhoneRaw(e.target.value)}
              className="bg-white border border-neutral-300 text-xs rounded-lg px-3 py-1.5 font-bold text-slate-800 outline-none"
            >
              <option value={CONTACT_INFO.primaryPhoneRaw}>Primary Routing: {CONTACT_INFO.primaryPhone}</option>
              <option value={CONTACT_INFO.alternatePhones[0].raw}>Production Desk: {CONTACT_INFO.alternatePhones[0].number}</option>
              <option value={CONTACT_INFO.alternatePhones[1].raw}>Bulk Enquiries: {CONTACT_INFO.alternatePhones[1].number}</option>
            </select>
          </div>

          {/* 6. REAL-TIME PRICE SUMMARY BOX */}
          <div className="bg-neutral-900 text-white rounded-xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Pricing Calculation (Delhi NCR Direct)
              </span>
              <button
                type="button"
                onClick={handleCopyQuote}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedQuote ? 'Copied to Clipboard!' : 'Share Quote'}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Calculated Unit Price:</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums text-sm">
                  ₹{priceBreakdown.calculatedUnitPrice.toFixed(2)} / unit
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Net Subtotal ({quantity.toLocaleString()} units):</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  ₹{priceBreakdown.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated 18% GST (Tax Invoice):</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  ₹{priceBreakdown.gst.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-white">Estimated Order Total:</span>
                  <div className="text-[10px] text-slate-400">Includes Delhi NCR print preparation</div>
                </div>
                <div className="text-2xl font-extrabold text-white font-display tabular-nums">
                  ₹{priceBreakdown.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Customer Account Auto-Fill Alert */}
            {isAuthenticated ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Ordering as <strong>{currentUser?.name}</strong>. Your saved delivery address & GST will be auto-attached.
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAccountModal('login')}
                className="text-[11px] text-blue-400 hover:underline block text-left"
              >
                Tip: Sign in to attach your saved Delhi delivery address & order history.
              </button>
            )}

            {/* DYNAMIC WHATSAPP ORDER TRIGGER CTA */}
            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>Order via WhatsApp Now (₹{priceBreakdown.total.toLocaleString('en-IN')})</span>
            </button>
            <div className="text-center text-[10px] text-slate-400">
              Instant routing with exact specs: Material: {selectedMaterial} | Finish: {selectedFinish} | Qty: {quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
