import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus,
  MessageCircle,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Check
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Build product image list (if product has images array, use it; otherwise fallback to main image)
  const productImages = selectedProduct 
    ? (selectedProduct.images && selectedProduct.images.length > 0 
        ? selectedProduct.images 
        : [selectedProduct.image || '/logo-icon.jpg'])
    : [];

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedColor(null);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.some(item => item.id === selectedProduct.id);
  const colors = selectedProduct.colors || ['Standard'];
  const currentColor = selectedColor || colors[0];

  const handleBuyNow = () => {
    openQuickCheckout(selectedProduct, quantity, currentColor);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentColor);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Gadgets Ghor, I want to order this product:\n\n*Product:* ${selectedProduct.name}\n*Price:* ৳${selectedProduct.price}\n*Quantity:* ${quantity}\n*Variant:* ${currentColor}\n\nPlease confirm my order!`
    );
    window.open(`https://wa.me/8801400725333?text=${text}`, '_blank');
  };

  const currentDisplayImage = productImages[activeImageIndex] || selectedProduct.image || '/logo-icon.jpg';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-3xl w-full overflow-hidden z-10 my-auto text-slate-800 animate-subtle max-h-[94vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-[#DE0D64] font-bold truncate max-w-[200px] sm:max-w-none">
              {selectedProduct.category}
            </span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Main Product Showcase: Ghorer Bazar Style with Multi-Image Gallery & Details */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            
            {/* Left Image Section: Exact Ghorer Bazar Gallery (Vertical Thumbnails on left + Main preview on right) */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              
              <div className="w-full flex gap-2 sm:gap-3 items-start">
                
                {/* Vertical Thumbnails List (Matching 2nd image on mobile & desktop) */}
                {productImages.length > 1 && (
                  <div className="flex flex-col gap-2 max-h-[300px] sm:max-h-[360px] overflow-y-auto pb-1 scrollbar-none shrink-0 w-12 sm:w-16">
                    {productImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl p-1 bg-white border-2 transition cursor-pointer flex items-center justify-center shrink-0 ${
                          activeImageIndex === idx 
                            ? 'border-[#DE0D64] shadow-xs ring-1 ring-[#DE0D64]/30' 
                            : 'border-slate-200 hover:border-pink-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image Stage */}
                <div className="flex-1 aspect-square bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-6 flex items-center justify-center relative shadow-xs group">
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                    {selectedProduct.discount > 0 && (
                      <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
                        Save {selectedProduct.discount}tk
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full transition shadow-xs cursor-pointer ${
                      isWishlisted 
                        ? 'bg-pink-50 text-[#DE0D64]' 
                        : 'bg-white/90 hover:bg-white text-slate-400 hover:text-[#DE0D64]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DE0D64]' : ''}`} />
                  </button>

                  <img
                    src={currentDisplayImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain max-h-[280px] sm:max-h-[340px] transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/logo-icon.jpg'; }}
                  />

                  {/* Gallery Next/Prev Navigation Arrows (if multiple images) */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveImageIndex(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

              </div>

              {/* In-Stock Indicator */}
              <div className="mt-2.5 w-full bg-emerald-50 border border-emerald-200 rounded-xl py-1.5 px-3 flex items-center justify-center gap-2 text-xs text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>In-Stock: {selectedProduct.stock || 5} items available</span>
              </div>
            </div>

            {/* Right Product Info */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              
              <div>
                {/* Product Title */}
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug mb-2">
                  {selectedProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-700">{selectedProduct.rating || 4.9}</span>
                  <span>({selectedProduct.reviewsCount || 48} reviews)</span>
                </div>

                {/* Price Strip with Save XTk */}
                <div className="flex items-baseline gap-2.5 mb-4">
                  <span className="text-xl sm:text-2xl font-black text-[#DE0D64]">
                    ৳{selectedProduct.price.toLocaleString('bn-BD')}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      ৳{selectedProduct.originalPrice.toLocaleString('bn-BD')}
                    </span>
                  )}
                  {selectedProduct.discount > 0 && (
                    <span className="text-xs font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md shadow-xs">
                      Save {selectedProduct.discount}tk
                    </span>
                  )}
                </div>

                {/* Variant / Color Selector */}
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

                {/* Quantity Box (Exact Ghorer Bazar Style with border box and +/-) */}
                <div className="mb-4 flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700">Quantity:</label>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-black text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4 Action Buttons Strip: Directly after Quantity (Exact Ghorer Bazar Position) */}
                <div className="space-y-2 pt-1 mb-5">
                  {/* Row 1: ADD TO CART (Pink brand color) + BUY NOW (Dark Slate/Navy) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-3 px-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-slate-900 hover:bg-black text-white py-3 px-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      <span>BUY NOW</span>
                    </button>
                  </div>

                  {/* Row 2: Order On WhatsApp (Green) + Call For Order (Blue) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order On WhatsApp</span>
                    </button>

                    <a
                      href="tel:01400725333"
                      className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 text-center"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call For Order</span>
                    </a>
                  </div>
                </div>

                {/* Product Key Highlights (Clean concise points) - Placed after action buttons */}
                {selectedProduct.highlights && selectedProduct.highlights.length > 0 && (
                  <div className="mb-4 bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/60">
                    <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DE0D64]"></span>
                      মূল বৈশিষ্ট্যসমূহ (Key Highlights):
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedProduct.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warranty & Return Policy (ওয়ারেন্টি ও রিটার্ন পলিসি) */}
                <div className="mb-4 bg-pink-50/40 rounded-xl p-3.5 border border-pink-100 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs pb-1 border-b border-pink-200/60">
                    <ShieldCheck className="w-4 h-4 text-[#DE0D64]" />
                    <span>ওয়ারেন্টি ও রিটার্ন পলিসি (Warranty & Return Policy)</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#DE0D64] font-bold mt-0.5">•</span>
                      <span><strong>৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি:</strong> প্রডাক্টে কোনো ম্যানুফ্যাকচারিং ত্রুটি বা সমস্যা থাকলে ৭ দিনের মধ্যে সহজ এক্সচেঞ্জ সুবিধা।</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#DE0D64] font-bold mt-0.5">•</span>
                      <span><strong>আনবক্সিং ভিডিও:</strong> পার্সেল রিসিভ করার সময় অবশ্যই একটি আনবক্সিং ভিডিও ধারণ করার অনুরোধ করা হচ্ছে।</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#DE0D64] font-bold mt-0.5">•</span>
                      <span className="text-slate-800 font-semibold bg-pink-100/70 px-1.5 py-0.5 rounded leading-relaxed">
                        আমাদের পক্ষ থেকে ভুল বা ত্রুটিপূর্ণ পণ্য গেলে এক্সচেঞ্জ ফি ও ডেলিভারি চার্জের সম্পূর্ণ দায়িত্ব <strong>Gadgets Ghor</strong> বহন করবে (অবশ্যই আনবক্সিং ভিডিও দেখাতে হবে)।
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

          {/* Trust Guarantees */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] font-semibold text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#DE0D64]" />
              <span>ক্যাশ অন ডেলিভারি</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% অরিজিনাল</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>সহজ রিটার্ন</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
