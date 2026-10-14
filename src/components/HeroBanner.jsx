import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Banknote,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function HeroBanner() {
  const { setSelectedCategory } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      
      {/* Main Single Banner from 4th Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-pink-100 group">
        
        {/* Banner Image */}
        <div className="w-full relative bg-slate-900 aspect-[16/9] sm:aspect-[21/9] max-h-[460px] overflow-hidden flex items-center justify-center">
          <img 
            src="/hero-banner.jpg" 
            alt="Gadgets Ghor Promotional Banner" 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
          />

          {/* Elegant Gradient Vignette for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          {/* Quick Floating Action on Banner */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 z-10">
            <button
              onClick={() => {
                setSelectedCategory('All');
                const el = document.getElementById('product-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#DE0D64] hover:bg-[#B8004F] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-transform active:scale-95 border border-white/20 cursor-pointer"
            >
              <span>Explore All Gadgets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md border border-white/30 text-white px-3.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Official Gadgets Ghor Deal</span>
          </div>
        </div>

      </div>

      {/* Trust & Guarantee Badges Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {[
          {
            icon: Truck,
            title: 'দ্রুত হোম ডেলিভারি',
            desc: 'ঢাকা ও দেশজুড়ে দ্রুততম শিপিং',
            color: 'text-[#DE0D64]',
            bg: 'bg-pink-50'
          },
          {
            icon: ShieldCheck,
            title: '১০০% অরিজিনাল গ্যাজেট',
            desc: 'সরাসরি ইন-স্টক অথেনটিক পণ্য',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          },
          {
            icon: RotateCcw,
            title: 'সহজ রিপ্লেসমেন্ট',
            desc: 'কোন সমস্যায় দ্রুত পরিবর্তন',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          {
            icon: Banknote,
            title: 'ক্যাশ অন ডেলিভারি',
            desc: 'পণ্য হাতে পেয়ে মূল্য পরিশোধ',
            color: 'text-amber-600',
            bg: 'bg-amber-50'
          }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div 
              key={i} 
              className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3 hover:border-pink-200 transition"
            >
              <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs md:text-sm font-bold text-slate-800 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
