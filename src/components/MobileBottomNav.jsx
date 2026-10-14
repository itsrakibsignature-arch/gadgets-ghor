import React from 'react';
import { 
  Home, 
  Grid, 
  ShoppingCart, 
  PhoneCall, 
  MessageSquare 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MobileBottomNav() {
  const { 
    totalCartCount, 
    setIsCartOpen, 
    setSelectedCategory 
  } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-pink-100 z-40 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around text-[10px] font-bold text-slate-600">
        
        {/* Home */}
        <button
          onClick={() => {
            setSelectedCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 hover:text-[#DE0D64] transition cursor-pointer"
        >
          <Home className="w-5 h-5 text-slate-700" />
          <span>Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            const el = document.getElementById('product-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 hover:text-[#DE0D64] transition cursor-pointer"
        >
          <Grid className="w-5 h-5 text-slate-700" />
          <span>Categories</span>
        </button>

        {/* Cart Button (Highlighted in Pink) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[#DE0D64] relative cursor-pointer"
        >
          <div className="w-10 h-10 -mt-5 rounded-full bg-[#DE0D64] text-white flex items-center justify-center shadow-md border-2 border-white">
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </div>
          <span>Cart ({totalCartCount})</span>
        </button>

        {/* Hotline Call (01400725333) */}
        <a
          href="tel:01400725333"
          className="flex flex-col items-center gap-1 hover:text-[#DE0D64] transition"
        >
          <PhoneCall className="w-5 h-5 text-slate-700" />
          <span>01400725333</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801400725333"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-emerald-600 hover:text-emerald-700 transition"
        >
          <MessageSquare className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
