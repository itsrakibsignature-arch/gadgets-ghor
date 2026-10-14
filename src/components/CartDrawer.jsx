import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    totalCartCount, 
    cartSubtotal, 
    deliveryZone, 
    setDeliveryZone, 
    deliveryFee, 
    cartTotal, 
    freeDeliveryThreshold, 
    isFreeDelivery, 
    removeFromCart, 
    updateQuantity,
    setIsCheckoutOpen,
    setDirectCheckoutItem
  } = useCart();

  if (!isCartOpen) return null;

  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleProceedToCheckout = () => {
    setDirectCheckoutItem(null); // checkout whole cart
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
          
          {/* Drawer Header */}
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-pink-50 text-[#DE0D64] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">শপিং কার্ট</h3>
                <span className="text-xs text-slate-500 font-medium">{totalCartCount}টি আইটেম যুক্ত আছে</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-pink-50/70 p-3.5 border-b border-pink-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-4 h-4 text-[#DE0D64]" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700">অভিনন্দন! আপনি ফ্রি ডেলিভারি পেয়েছেন! 🎉</span>
                ) : (
                  <span>আর ৳{remainingForFreeDelivery.toLocaleString('bn-BD')} কিনলে <span className="text-[#DE0D64]">ফ্রি ডেলিভারি</span></span>
                )}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">{Math.round(freeDeliveryProgress)}%</span>
            </div>
            
            <div className="w-full bg-pink-200/60 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#DE0D64] h-2 rounded-full transition-all duration-500" 
                style={{ width: `${freeDeliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.color}`} className="py-3 flex items-center gap-3 group">
                  {/* Thumbnail on white background */}
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl p-1 flex items-center justify-center shrink-0">
                    <img 
                      src={item.image || '/logo-icon.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
                    />
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-0.5">
                      {item.name}
                    </h4>
                    {item.color && item.color !== 'Standard' && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium inline-block mb-1">
                        কালার: {item.color}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#DE0D64]">
                        ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        (৳{item.price.toLocaleString('bn-BD')} × {item.quantity})
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.color, -1)}
                      className="p-1 hover:bg-white text-slate-600 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, 1)}
                      className="p-1 hover:bg-white text-slate-600 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.color)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition"
                    title="মুছে ফেলুন"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-20 h-20 bg-pink-50 text-[#DE0D64] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-base mb-1">আপনার কার্ট খালি</h4>
                <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                  পছন্দের গ্যাজেট কার্টে যোগ করুন এবং এক ক্লিকে সহজ ডেলিভারি উপভোগ করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#DE0D64] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#B8004F] transition shadow-md"
                >
                  গ্যাজেট পছন্দ করুন
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              
              {/* Delivery Zone Toggle */}
              <div className="mb-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                  ডেলিভারি লোকেশন নির্বাচন করুন:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryZone('inside_dhaka')}
                    className={`py-1.5 px-2 rounded-lg font-bold border transition ${
                      deliveryZone === 'inside_dhaka'
                        ? 'bg-pink-50 border-[#DE0D64] text-[#DE0D64]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    ঢাকার ভেতরে (৳৭০)
                  </button>
                  <button
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`py-1.5 px-2 rounded-lg font-bold border transition ${
                      deliveryZone === 'outside_dhaka'
                        ? 'bg-pink-50 border-[#DE0D64] text-[#DE0D64]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    ঢাকার বাইরে (৳১৩০)
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1 text-xs mb-3">
                <div className="flex justify-between text-slate-600">
                  <span>সাবটোটাল</span>
                  <span className="font-bold">৳{cartSubtotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold">ফ্রি (০ ৳)</span>
                    ) : (
                      `৳${deliveryFee.toLocaleString('bn-BD')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>মোট পরিশোধযোগ্য</span>
                  <span className="text-[#DE0D64]">৳{cartTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-3 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>অর্ডার করতে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ক্যাশ অন ডেলিভারি | ১০০% নিরাপদ কেনাকাটা</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
