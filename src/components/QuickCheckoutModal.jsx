import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  Truck, 
  Zap,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickCheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    directCheckoutItem, 
    setDirectCheckoutItem,
    cartItems, 
    cartSubtotal, 
    deliveryZone, 
    setDeliveryZone, 
    freeDeliveryThreshold,
    placeOrder 
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Active items to order
  const checkoutItems = directCheckoutItem ? [directCheckoutItem] : cartItems;
  const itemsSubtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFree = itemsSubtotal >= freeDeliveryThreshold;
  const deliveryCost = isFree ? 0 : (deliveryZone === 'inside_dhaka' ? 70 : 130);
  const totalAmount = itemsSubtotal + deliveryCost;

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'আপনার সম্পূর্ণ নাম লিখুন';
    
    // Bangladesh phone validation
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = 'সঠিক মোবাইল নম্বর লিখুন';
    } else if (cleanPhone.length < 11) {
      errs.phone = '১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 018XXXXXXXX)';
    }

    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'বিস্তারিত ডেলিভারি ঠিকানা লিখুন (বাসা নং, রোড, থানা, জেলা)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        name,
        phone,
        address,
        note,
        deliveryZone
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={() => {
          setIsCheckoutOpen(false);
          setDirectCheckoutItem(null);
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-2xl w-full overflow-hidden z-10 animate-subtle my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#DE0D64] to-[#F43F5E] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <h3 className="font-black text-base md:text-lg">অর্ডার সম্পন্ন করুন</h3>
              <p className="text-xs text-white/90">
                পণ্যটি নিশ্চিত করতে নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setDirectCheckoutItem(null);
            }}
            className="p-1 rounded-full bg-black/10 hover:bg-black/25 text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          
          {/* Order Items Preview */}
          <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
              <ShoppingBag className="w-4 h-4 text-[#DE0D64]" />
              <span>অর্ডারের পণ্যসমূহ ({checkoutItems.length}টি)</span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={item.image || '/logo-icon.jpg'} 
                      alt={item.name} 
                      className="w-10 h-10 object-contain rounded-md border border-slate-100 p-0.5 bg-white shrink-0"
                      onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <span className="text-[10px] text-slate-500">
                        {item.color && item.color !== 'Standard' ? `কালার: ${item.color} | ` : ''}পরিমাণ: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#DE0D64] shrink-0 ml-2">
                    ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Input Fields */}
          <div className="space-y-3">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#DE0D64]" />
                <span>আপনার সম্পূর্ণ নাম <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                }}
                className={`w-full p-2.5 rounded-xl border text-sm transition focus:outline-none ${
                  errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#DE0D64] focus:ring-2 focus:ring-pink-100'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.name}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#DE0D64]" />
                <span>মোবাইল নম্বর <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                placeholder="যেমন: 01712345678"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                }}
                className={`w-full p-2.5 rounded-xl border text-sm transition focus:outline-none ${
                  errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#DE0D64] focus:ring-2 focus:ring-pink-100'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.phone}</p>}
            </div>

            {/* Full Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#DE0D64]" />
                <span>সম্পূর্ণ ঠিকানা (বাসা নং, রোড, থানা, জেলা) <span className="text-red-500">*</span></span>
              </label>
              <textarea
                rows="2"
                placeholder="যেমন: বাসা নং ১২, রোড ৫, ব্লক সি, মিরপুর-১০, ঢাকা"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors(prev => ({ ...prev, address: null }));
                }}
                className={`w-full p-2.5 rounded-xl border text-sm transition focus:outline-none ${
                  errors.address ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#DE0D64] focus:ring-2 focus:ring-pink-100'
                }`}
              ></textarea>
              {errors.address && <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.address}</p>}
            </div>

            {/* Delivery Zone Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#DE0D64]" />
                <span>ডেলিভারি এলাকা নির্বাচন করুন:</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-[#DE0D64] bg-pink-50/70 text-[#DE0D64] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs">
                    <p className="font-bold">ঢাকার ভেতরে</p>
                    <span className="text-[10px] text-slate-500">২৪ থেকে ৪৮ ঘণ্টা</span>
                  </div>
                  <span className="text-xs font-black">
                    {isFree ? 'ফ্রি (০ ৳)' : '৳৭০'}
                  </span>
                </div>

                <div 
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-[#DE0D64] bg-pink-50/70 text-[#DE0D64] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs">
                    <p className="font-bold">ঢাকার বাইরে</p>
                    <span className="text-[10px] text-slate-500">৪৮ থেকে ৭২ ঘণ্টা</span>
                  </div>
                  <span className="text-xs font-black">
                    {isFree ? 'ফ্রি (০ ৳)' : '৳১৩০'}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Note (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>অর্ডার সম্পর্কিত অতিরিক্ত মন্তব্য (ঐচ্ছিক)</span>
              </label>
              <input
                type="text"
                placeholder="যেমন: কোনো নির্দিষ্ট সময় বা ডেলিভারির নির্দেশনা থাকলে লিখুন"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#DE0D64]"
              />
            </div>

          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>পণ্যগুলোর মোট মূল্য:</span>
              <span className="font-bold">৳{itemsSubtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডেলিভারি চার্জ:</span>
              <span className="font-bold">
                {deliveryCost === 0 ? (
                  <span className="text-emerald-600 font-extrabold">ফ্রি (০ ৳)</span>
                ) : (
                  `৳${deliveryCost.toLocaleString('bn-BD')}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>সর্বমোট প্রদেয় মূল্য:</span>
              <span className="text-[#DE0D64] text-lg font-black">
                ৳{totalAmount.toLocaleString('bn-BD')}
              </span>
            </div>
          </div>

          {/* Cash on Delivery Notice (As requested: no payment gateway) */}
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="leading-tight">
              <span className="font-bold">ক্যাশ অন ডেলিভারি:</span> পণ্য ডেলিভারি ম্যানের কাছ থেকে হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করবেন।
            </p>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>অর্ডার সম্পন্ন হচ্ছে...</span>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span>অর্ডার নিশ্চিত করুন (৳{totalAmount.toLocaleString('bn-BD')})</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
