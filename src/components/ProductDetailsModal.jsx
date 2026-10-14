import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailsModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    openQuickCheckout, 
    wishlist, 
    toggleWishlist 
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.some(item => item.id === selectedProduct.id);
  const colors = selectedProduct.colors || ['Standard'];
  const currentColor = selectedColor || colors[0];

  const handleOrderNow = () => {
    openQuickCheckout(selectedProduct, quantity, currentColor);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentColor);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-3xl w-full overflow-hidden z-10 my-auto text-slate-800 animate-subtle">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-500 hover:text-[#DE0D64] transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image on Pure White Background */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-center relative shadow-xs">
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                {selectedProduct.discount > 0 && (
                  <span className="bg-[#DE0D64] text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                    Save {selectedProduct.discount}tk
                  </span>
                )}
                {selectedProduct.isFreeDelivery && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    ফ্রি ডেলিভারি
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`absolute top-3 right-3 p-2.5 rounded-full transition shadow-xs ${
                  isWishlisted 
                    ? 'bg-pink-50 text-[#DE0D64]' 
                    : 'bg-slate-50 text-slate-400 hover:text-[#DE0D64]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#DE0D64]' : ''}`} />
              </button>

              <img
                src={selectedProduct.image || '/logo-icon.jpg'}
                alt={selectedProduct.name}
                className="w-full h-full object-contain max-h-[320px] transition-transform duration-300 hover:scale-105"
                onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
              />
            </div>

            {/* In-Stock Indicator */}
            <div className="mt-3 w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-center gap-2 text-xs text-emerald-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>In-Stock: {selectedProduct.stock} items available</span>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category in English */}
              <span className="text-xs font-bold uppercase tracking-wider text-[#DE0D64] block mb-1">
                {selectedProduct.category}
              </span>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-2">
                {selectedProduct.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-700">{selectedProduct.rating} / 5.0</span>
                <span>({selectedProduct.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl sm:text-3xl font-black text-[#DE0D64]">
                  ৳{selectedProduct.price.toLocaleString('bn-BD')}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{selectedProduct.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                {selectedProduct.discount > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Save {selectedProduct.discount}tk
                  </span>
                )}
              </div>

              {/* Variants / Colors */}
              {colors.length > 0 && colors[0] !== 'Standard' && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Select Color / Variant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          currentColor === c
                            ? 'bg-pink-50 border-[#DE0D64] text-[#DE0D64] shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <label className="text-xs font-bold text-slate-700">Quantity:</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2 hover:bg-white text-slate-600 transition cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2 hover:bg-white text-slate-600 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <button
                  onClick={handleOrderNow}
                  className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span>এখনই অর্ডার করুন (৳{(selectedProduct.price * quantity).toLocaleString('bn-BD')})</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-pink-50 hover:bg-pink-100 text-[#DE0D64] border-2 border-pink-200 py-3 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>

            {/* Service & Guarantee Strip */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#DE0D64] shrink-0" />
                <span>দেশজুড়ে ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>১০০% অরিজিনাল গ্যাজেট পণ্য গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>৭ দিনের ইজি রিপ্লেসমেন্ট সুবিধা | হেল্পলাইন: 01400725333</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
