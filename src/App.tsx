/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AccountProvider } from './context/AccountContext';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FeaturedCategories } from './components/FeaturedCategories';
import { InstantQuoteCalculator } from './components/InstantQuoteCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductConfigurator } from './components/ProductConfigurator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ClientTestimonials } from './components/ClientTestimonials';
import { CorporateSolutions } from './components/CorporateSolutions';
import { LegalPolicies } from './components/LegalPolicies';
import { ContactSection } from './components/ContactSection';
import { LocationMap } from './components/LocationMap';
import { AccountModal } from './components/AccountModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product } from './types';

function MainApp() {
  const [currentView, setCurrentView] = useState<
    'home' | 'catalog' | 'calculator' | 'corporate' | 'policies' | 'contact'
  >('home');
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialPolicyTab, setInitialPolicyTab] = useState<string>('terms');

  const handleNavigate = (
    view: 'home' | 'catalog' | 'calculator' | 'corporate' | 'policies' | 'contact',
    policyTab?: string
  ) => {
    setCurrentView(view);
    if (policyTab) {
      setInitialPolicyTab(policyTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: string) => {
    setCatalogInitialCategory(catId);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 pb-16 md:pb-0 selection:bg-amber-100 selection:text-amber-900">
      {/* Global Navigation Header & Announcement Bar */}
      <Header
        onSelectProduct={handleOpenProduct}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW 1: HOMEPAGE */}
        {currentView === 'home' && (
          <div className="space-y-4">
            {/* Hero Carousel */}
            <HeroCarousel
              onExploreCategory={handleSelectCategory}
              onOpenCalculator={() => handleNavigate('calculator')}
            />

            {/* Featured Printo-Inspired Categories Grid */}
            <FeaturedCategories onSelectCategory={handleSelectCategory} />

            {/* Featured Best-Seller Dynamic Configurator Spotlight */}
            <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                  Interactive Product Showcase
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  Live Product Configurator
                </h2>
              </div>
              <ProductConfigurator product={PRODUCTS[0]} />
            </section>

            {/* Interactive Instant Price Calculator Tool */}
            <InstantQuoteCalculator />

            {/* Why Choose Us Proposition */}
            <WhyChooseUs />

            {/* Client Testimonials */}
            <ClientTestimonials />

            {/* Interactive Google Map of Delhi NCR Store */}
            <LocationMap />
          </div>
        )}

        {/* VIEW 2: PRODUCT CATALOG (With Advanced Filtering) */}
        {currentView === 'catalog' && (
          <div>
            <ProductCatalog
              onSelectProduct={handleOpenProduct}
              initialCategory={catalogInitialCategory}
            />
          </div>
        )}

        {/* VIEW 3: INSTANT PRICE CALCULATOR */}
        {currentView === 'calculator' && (
          <div className="py-6 space-y-8">
            <InstantQuoteCalculator />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                  Detailed Configuration
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Configure Popular Large Format Flex & Standee
                </h3>
              </div>
              <ProductConfigurator product={PRODUCTS[5]} />
            </div>
          </div>
        )}

        {/* VIEW 4: CORPORATE SOLUTIONS */}
        {currentView === 'corporate' && (
          <div>
            <CorporateSolutions />
          </div>
        )}

        {/* VIEW 5: LEGAL & POLICIES HUB */}
        {currentView === 'policies' && (
          <div>
            <LegalPolicies initialTab={initialPolicyTab} />
          </div>
        )}

        {/* VIEW 6: CONTACT & STORE LOCATION */}
        {currentView === 'contact' && (
          <div>
            <ContactSection />
          </div>
        )}
      </main>

      {/* Global Product Detail Configurator Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Customer Account Portal Modal */}
      <AccountModal />

      {/* Live Interactive Chat Support Widget (routes to email & WhatsApp) */}
      <LiveChatWidget />

      {/* Pulse-animated Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Sticky Mobile Action Bar (Call Now & WhatsApp) */}
      <MobileStickyBar />

      {/* Comprehensive Official Credentials Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccountProvider>
      <MainApp />
    </AccountProvider>
  );
}
