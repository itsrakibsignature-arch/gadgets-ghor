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
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-pink-300 p-2 sm:p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* 1. Square Image Container with Pure White Background (Exact Ghorer Bazar Style) */}
      <div className="relative">
        
        {/* Top Badges (Ghorer Bazar Style) */}
        <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-md shadow-xs">
              New
            </span>
          )}
        </div>

        <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-1">
          {product.discount > 0 && (
            <span className="bg-emerald-600 text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
              Save {product.discount}tk
            </span>
          )}
          
          {/* Wishlist Heart Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-1 sm:p-1.5 rounded-full backdrop-blur-xs transition shadow-xs cursor-pointer ${
              isWishlisted 
                ? 'bg-pink-50 text-[#DE0D64]' 
                : 'bg-white/90 hover:bg-white text-slate-400 hover:text-[#DE0D64]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isWishlisted ? 'fill-[#DE0D64]' : ''}`} />
          </button>
        </div>

        {/* Product Image Box */}
        <div 
          onClick={() => setSelectedProduct(product)}
          className="w-full aspect-square bg-white rounded-xl p-2 sm:p-4 flex items-center justify-center overflow-hidden cursor-pointer border border-slate-100 relative group/img"
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
          <div className="hidden sm:flex absolute inset-0 bg-slate-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity items-center justify-center">
            <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#DE0D64]" /> Details
            </span>
          </div>
        </div>

      </div>

      {/* 2. Product Info */}
      <div className="pt-2 sm:pt-3 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Product Title directly below image */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-[11px] sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-[#DE0D64] cursor-pointer transition leading-snug mb-1.5 min-h-[2rem] sm:min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div>
          <div className="flex items-baseline gap-1.5 mb-2 sm:mb-3">
            <span className="text-sm sm:text-lg font-black text-[#DE0D64]">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-normal">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          {/* Action Buttons: 2-column on mobile / stacked on desktop like Ghorer Bazar */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 sm:gap-2 shadow-xs active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>কার্টে যোগ করুন</span>
            </button>

            <button
              onClick={() => openQuickCheckout(product)}
              className="w-full bg-pink-50 hover:bg-pink-100 text-[#DE0D64] border border-pink-200 py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold transition flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-[#DE0D64]" />
              <span>অর্ডার করুন</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
