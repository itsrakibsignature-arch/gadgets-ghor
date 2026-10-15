import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategorySlider from './components/CategorySlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickCheckoutModal from './components/QuickCheckoutModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import MobileBottomNav from './components/MobileBottomNav';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Toast from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#DE0D64] selection:text-white pb-16 md:pb-0 overflow-x-hidden">
        {/* Floating Toast Alerts */}
        <Toast />

        {/* Sticky Header with Navigation, Search, Hotline & Category Bar */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 space-y-4 sm:space-y-6">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Product Grid with Infinite Scroll & Filtering */}
          <ProductGrid />
        </main>

        {/* Footer */}
        <Footer />

        {/* Drawers & Modals */}
        <CartDrawer />
        <QuickCheckoutModal />
        <ProductDetailsModal />
        <OrderSuccessModal />

        {/* Mobile Fixed Navigation Bar */}
        <MobileBottomNav />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
