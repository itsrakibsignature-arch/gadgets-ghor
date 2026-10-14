import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { setSelectedCategory } = useCart();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 mt-16 border-t-4 border-[#DE0D64]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DE0D64]/10 border border-[#DE0D64]/30 text-[#DE0D64] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">দেশজুড়ে ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-slate-400">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">১০০% অথেনটিক গ্যাজেট</h4>
              <p className="text-xs text-slate-400">প্রতিটি পণ্য ইন-স্টক ও পরীক্ষিত কোয়ালিটি</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">৭ দিনের সহজ রিপ্লেসমেন্ট</h4>
              <p className="text-xs text-slate-400">যে কোনো সমস্যায় দ্রুত সমাধানের নিশ্চয়তা</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-icon.jpg" alt="Gadgets Ghor" className="h-12 w-auto bg-white p-1 rounded-xl" />
              <div>
                <span className="text-white font-black text-xl tracking-tight block leading-none">
                  GADGETS GHOR
                </span>
                <span className="text-[11px] text-[#DE0D64] font-bold">
                  স্মার্ট গ্যাজেট শপ
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Gadgets Ghor বাংলাদেশের বিশ্বস্ত গ্যাজেট শপ। ৭ শতাধিক ট্রেন্ডি গ্যাজেট, স্মার্ট ওয়াচ, ইয়ারবাডস ও আধুনিক এক্সেসরিজ সেরা দামে পৌঁছে দিচ্ছি সারা দেশে।
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#DE0D64] hover:text-white flex items-center justify-center transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#DE0D64] hover:text-white flex items-center justify-center transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#DE0D64] hover:text-white flex items-center justify-center transition" aria-label="YouTube">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Categories in English */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-[#DE0D64] pl-2.5">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {['Smart Watch', 'TWS & Earbuds', 'Bluetooth Speaker', 'Power Bank', 'Mobile Cooler', 'Gaming Headset'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      const el = document.getElementById('product-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#DE0D64] transition cursor-pointer"
                  >
                    • {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-[#DE0D64] pl-2.5">
              কাস্টমার কেয়ার
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• অর্ডার করার সহজ নিয়ম</li>
              <li>• ডেলিভারি ও শিপিং পলিসি</li>
              <li>• রিটার্ন ও রিফান্ড নীতি</li>
              <li>• শর্তাবলী ও গোপনীয়তা নীতি</li>
              <li>• ওয়ারেন্টি ক্লেইম গাইড</li>
            </ul>
          </div>

          {/* Contact Details (01400725333) */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-[#DE0D64] pl-2.5">
              যোগাযোগ ও হেল্পলাইন
            </h4>
            <div className="space-y-3 text-xs">
              <a href="tel:01400725333" className="flex items-center gap-3 text-white hover:text-[#DE0D64] transition">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 text-[#DE0D64] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">হটলাইন নম্বর:</span>
                  <span className="font-bold text-sm">01400725333</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">ইমেইল:</span>
                  <span>support@gadgetsghor.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">অফিস ঠিকানা:</span>
                  <span>উত্তরা, ঢাকা-১২৩০, বাংলাদেশ</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© ২০২৬ Gadgets Ghor. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#DE0D64] fill-[#DE0D64]" /> for Gadget Lovers in Bangladesh
          </p>
        </div>

      </div>
    </footer>
  );
}
