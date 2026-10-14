import React from 'react';
import { 
  ShoppingCart, 
  Zap, 
  Heart, 
  Eye 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    openQuickCheckout, 
    setSelectedProduct, 
    wishlist, 
    toggleWishlist 
  } = useCart();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-pink-300 p-3 sm:p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative">
      
      {/* 1. Square Image Container with Pure White Background (Exact Ghorer Bazar Style) */}
      <div className="relative">
        
        {/* Top Badges (Ghorer Bazar Style) */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
          {product.discount > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
              Save {product.discount}tk
            </span>
          )}
          
          {/* Wishlist Heart Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-1.5 rounded-full backdrop-blur-xs transition shadow-xs ${
              isWishlisted 
                ? 'bg-pink-50 text-[#DE0D64]' 
                : 'bg-white/90 hover:bg-white text-slate-400 hover:text-[#DE0D64]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#DE0D64]' : ''}`} />
          </button>
        </div>

        {/* Product Image Box */}
        <div 
          onClick={() => setSelectedProduct(product)}
          className="w-full aspect-square bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center overflow-hidden cursor-pointer border border-slate-100 relative group/img"
        >
          <img
            src={product.image || '/logo-icon.jpg'}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
            onError={(e) => {
              e.target.src = '/logo-icon.jpg';
            }}
          />

          {/* Quick View Overlay on Hover */}
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#DE0D64]" /> View Details
            </span>
          </div>
        </div>

      </div>

      {/* 2. Product Info (Category & In-Stock lines removed as requested in image 1) */}
      <div className="pt-3 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Product Title directly below image */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-[#DE0D64] cursor-pointer transition leading-snug mb-2 min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-black text-[#DE0D64]">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-normal">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          {/* Signature Action Buttons: Full-width Add To Cart + Quick Order */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={() => openQuickCheckout(product)}
              className="w-full bg-pink-50 hover:bg-pink-100 text-[#DE0D64] border border-pink-200 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-[#DE0D64]" />
              <span>Direct Order (অর্ডার করুন)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
