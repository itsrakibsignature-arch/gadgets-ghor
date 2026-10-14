import React from 'react';
import { 
  CheckCircle2, 
  X, 
  PhoneCall, 
  ShoppingBag, 
  MapPin, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  const { orderId, customer, items, subtotal, deliveryFee, total } = completedOrder;

  // WhatsApp direct link with order details prefilled
  const whatsappMessage = encodeURIComponent(
    `হ্যালো Gadgets Ghor! আমি একটি অর্ডার করেছি।\nঅর্ডার আইডি: ${orderId}\nনাম: ${customer.name}\nফোন: ${customer.phone}\nমোট: ৳${total}`
  );
  const whatsappUrl = `https://wa.me/8801400725333?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div 
        onClick={() => setCompletedOrder(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-lg w-full overflow-hidden z-10 my-auto text-slate-800">
        
        {/* Top Celebration Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative">
          <button
            onClick={() => setCompletedOrder(null)}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black mb-1">
            অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
          </h3>
          <p className="text-xs text-emerald-100 max-w-xs mx-auto">
            ধন্যবাদ {customer.name}! আমাদের প্রতিনিধি খুব শীঘ্রই আপনার নম্বরে কল করে অর্ডার কনফার্ম করবেন।
          </p>

          <div className="mt-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full inline-block border border-white/20 text-xs font-mono font-bold tracking-wider">
            অর্ডার আইডি: <span className="text-yellow-300 font-extrabold">{orderId}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Customer & Shipping Summary */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <MapPin className="w-4 h-4 text-[#DE0D64]" />
              <span>ডেলিভারি তথ্য</span>
            </div>
            <div className="text-slate-600 pl-6 space-y-0.5">
              <p><span className="font-semibold text-slate-800">নাম:</span> {customer.name}</p>
              <p><span className="font-semibold text-slate-800">ফোন:</span> {customer.phone}</p>
              <p><span className="font-semibold text-slate-800">ঠিকানা:</span> {customer.address}</p>
              <p><span className="font-semibold text-slate-800">এলাকা:</span> {customer.deliveryZone === 'inside_dhaka' ? 'ঢাকার ভেতরে (২৪-৪৮ ঘণ্টা)' : 'ঢাকার বাইরে (৪৮-৭২ ঘণ্টা)'}</p>
              {customer.note && (
                <p><span className="font-semibold text-slate-800">নোট:</span> {customer.note}</p>
              )}
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-pink-50/50 p-3.5 rounded-2xl border border-pink-100">
            <div className="flex items-center justify-between font-bold text-slate-700 mb-2">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#DE0D64]" />
                অর্ডারের আইটেম
              </span>
              <span>{items.length}টি পণ্য</span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={item.image || '/logo-icon.jpg'} 
                      alt={item.name} 
                      className="w-9 h-9 object-contain rounded-md border border-slate-100 bg-white shrink-0" 
                      onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-500">
                        পরিমাণ: {item.quantity} | {item.color && item.color !== 'Standard' ? item.color : 'Standard'}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#DE0D64] shrink-0 ml-2">
                    ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="mt-3 pt-2 border-t border-pink-200/60 space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>সাবটোটাল:</span>
                <span className="font-bold">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? 'ফ্রি' : `৳${deliveryFee.toLocaleString('bn-BD')}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>সর্বমোট (ক্যাশ অন ডেলিভারি):</span>
                <span className="text-[#DE0D64]">৳{total.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Support Buttons (01400725333) */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-center shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp মেসেজ</span>
            </a>

            <a
              href="tel:01400725333"
              className="bg-slate-800 hover:bg-slate-900 text-white py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-center shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>01400725333</span>
            </a>
          </div>

          {/* Continue Shopping Button */}
          <button
            onClick={() => setCompletedOrder(null)}
            className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>আরও কেনাকাটা করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
