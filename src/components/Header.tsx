import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Search, 
  User, 
  MessageCircle, 
  ChevronDown, 
  Sparkles, 
  FileText, 
  ExternalLink,
  Clock,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useAccount } from '../context/AccountContext';
import { Product } from '../types';

interface HeaderProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: 'home' | 'catalog' | 'calculator' | 'corporate' | 'policies' | 'contact', policyTab?: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectProduct, onNavigate, currentView }) => {
  const { currentUser, isAuthenticated, openAccountModal } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on live search
  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.hindiTagline && p.hindiTagline.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (prod: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSelectProduct(prod);
  };

  return (
    <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
      {/* 1. Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact Numbers & Email */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Call / WhatsApp:</span>
            </span>
            <a 
              href={`tel:${CONTACT_INFO.primaryPhone}`} 
              className="hover:text-white font-semibold transition-colors underline decoration-amber-400/50"
            >
              {CONTACT_INFO.primaryPhone}
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={`tel:${CONTACT_INFO.alternatePhones[0].number}`} 
              className="hover:text-white transition-colors hidden sm:inline"
            >
              {CONTACT_INFO.alternatePhones[0].number}
            </a>
            <span className="text-slate-600 hidden md:inline">|</span>
            <a 
              href={`tel:${CONTACT_INFO.alternatePhones[1].number}`} 
              className="hover:text-white transition-colors hidden lg:inline"
            >
              {CONTACT_INFO.alternatePhones[1].number}
            </a>
            <span className="text-slate-600 hidden md:inline">|</span>
            <a 
              href={`mailto:${CONTACT_INFO.email}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          {/* Right: Dispatch Guarantee & Location highlight */}
          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Clock className="w-3 h-3" />
              <span>Express Same-Day Dispatch in Delhi NCR</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>CMYK Color Fidelity Assured</span>
            </span>
            {isAuthenticated ? (
              <button 
                onClick={() => openAccountModal('profile')}
                className="text-amber-400 hover:text-amber-300 font-medium pl-2 border-l border-slate-700 cursor-pointer"
              >
                Hi, {currentUser?.name.split(' ')[0]}
              </button>
            ) : (
              <button 
                onClick={() => openAccountModal('login')}
                className="text-amber-400 hover:text-amber-300 font-medium pl-2 border-l border-slate-700 cursor-pointer"
              >
                Customer Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Printo-style Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer shrink-0"
        >
          {/* High-res SVG CMYK Emblem */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-1.5 shadow-sm border border-slate-800">
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 opacity-90"></span>
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-pink-500 opacity-90"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-yellow-400 opacity-90"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-slate-900 border border-white/50 opacity-90 flex items-center justify-center text-[7px] font-black text-white">K</span>
              <span className="relative z-10 text-white font-extrabold text-sm font-display tracking-tighter">SG</span>
            </div>
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-slate-900 font-display leading-none flex items-center gap-1.5">
              <span>SHIVANI</span>
              <span className="text-blue-600 font-black">GRAPHICS</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Shivani Digital Prints · Delhi NCR
            </div>
          </div>
        </button>

        {/* Center: Printo-style Live Predictive Search Bar */}
        <div className="hidden md:block flex-1 max-w-lg relative" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search visiting cards, flex banners, standees, acrylic signs, mugs..."
              className="w-full bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white text-sm text-slate-900 rounded-full pl-10 pr-10 py-2 border border-neutral-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Predictive Search Dropdown Panel */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {filteredProducts.length > 0 ? (
                <div className="divide-y divide-neutral-100">
                  <div className="p-2 bg-neutral-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Products ({filteredProducts.length})</span>
                    <span>Instant WhatsApp Order Available</span>
                  </div>
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProductClick(p)}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-blue-50/60 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {p.subCategory} · Min Qty: {p.moq} pcs · {p.turnaroundTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-900 tabular-nums">
                          ₹{p.basePrice}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {p.priceUnit}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No matching print products found for "{searchQuery}".
                  <div className="mt-2 text-xs text-blue-600 font-medium">
                    Try searching: "visiting cards", "standee", "flex", "mug", "acrylic"
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <div className="text-xs font-semibold text-slate-500 mb-2 px-2">
                    Popular Categories
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          onNavigate('catalog');
                        }}
                        className="px-3 py-2 rounded-lg text-left hover:bg-neutral-100 text-xs font-medium text-slate-700 flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400">{cat.itemCount} items</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Zone: Primary Actions & Account */}
        <div className="flex items-center gap-3">
          {/* Customer Account Button */}
          <button
            onClick={() => openAccountModal(isAuthenticated ? 'profile' : 'login')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-300 hover:border-slate-400 hover:bg-neutral-50 text-slate-700 transition-colors text-xs font-semibold cursor-pointer"
            title="Customer Account & Order History"
          >
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
              {isAuthenticated ? currentUser?.name.charAt(0) : <User className="w-3 h-3" />}
            </div>
            <span className="hidden sm:inline">
              {isAuthenticated ? currentUser?.name.split(' ')[0] : 'My Account'}
            </span>
          </button>

          {/* Quick WhatsApp Quote CTA Button */}
          <a
            href={buildGeneralWhatsAppUrl('Instant Quick Quote & Print Job Enquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Order</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Links (Desktop) */}
      <nav className="hidden md:block bg-neutral-50/80 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-8 py-2.5">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer ${
                currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer ${
                currentView === 'catalog' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              Product Catalog
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer flex items-center gap-1.5 ${
                currentView === 'calculator' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Price Calculator</span>
            </button>
            <button
              onClick={() => onNavigate('corporate')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer ${
                currentView === 'corporate' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              Corporate & Bulk Solutions
            </button>
            <button
              onClick={() => onNavigate('policies')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer flex items-center gap-1 ${
                currentView === 'policies' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Policies & Quality Hub</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-blue-600 transition-colors pb-0.5 cursor-pointer ${
                currentView === 'contact' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : ''
              }`}
            >
              Contact & Store Location
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-normal">
            Store Location: <span className="font-semibold text-slate-700">Delhi NCR</span>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-6 shadow-xl space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search print products..."
              className="w-full bg-neutral-100 text-sm rounded-lg pl-9 pr-4 py-2 border border-neutral-300"
            />
          </div>

          {searchQuery && filteredProducts.length > 0 && (
            <div className="border border-neutral-200 rounded-lg p-2 divide-y divide-neutral-100 max-h-48 overflow-y-auto">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    handleProductClick(p);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-left text-xs font-medium text-slate-800 flex justify-between"
                >
                  <span>{p.name}</span>
                  <span className="font-bold">₹{p.basePrice}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col space-y-2 pt-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600"
            >
              All Product Categories
            </button>
            <button
              onClick={() => {
                onNavigate('calculator');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600 flex items-center justify-between"
            >
              <span>Instant Price Calculator</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">HOT</span>
            </button>
            <button
              onClick={() => {
                onNavigate('corporate');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600"
            >
              Corporate Solutions & Bulk Pricing
            </button>
            <button
              onClick={() => {
                onNavigate('policies');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600"
            >
              Legal Terms & Quality Guarantee
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-left hover:text-blue-600"
            >
              Store Location & Contact Us
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-200">
            <button
              onClick={() => {
                openAccountModal(isAuthenticated ? 'profile' : 'login');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-neutral-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{isAuthenticated ? `Logged in: ${currentUser?.name}` : 'Customer Account / Sign In'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
