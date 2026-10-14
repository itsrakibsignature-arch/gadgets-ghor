import React, { useState } from 'react';
import { MessageSquare, PhoneCall, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex flex-col items-end">
      
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 bg-white p-4 rounded-2xl shadow-2xl border border-pink-100 max-w-xs text-xs text-slate-800 animate-subtle relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600"
            aria-label="Close Support"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2 font-bold text-[#DE0D64]">
            <img src="/logo-icon.jpg" alt="Gadgets Ghor" className="w-6 h-6 object-contain rounded-md" />
            <span>Gadgets Ghor Support</span>
          </div>

          <p className="text-slate-600 mb-3 text-[11px] leading-relaxed">
            কোনো গ্যাজেট সম্পর্কিত তথ্য বা সরাসরি অর্ডার করতে নক দিন:
          </p>

          <div className="space-y-1.5">
            <a
              href="https://wa.me/8801400725333?text=Hello%20Gadgets%20Ghor!%20I%20want%20to%20order%20gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp চ্যাট করুন</span>
            </a>

            <a
              href="tel:01400725333"
              className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>কল করুন (01400725333)</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-white relative cursor-pointer"
        aria-label="Customer Support"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DE0D64] border-2 border-white"></span>
      </button>

    </div>
  );
}
