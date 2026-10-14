import React from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Eye 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    setSelectedProduct, 
    wishlist, 
    toggleWishlist 
  } = useCart();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-pink-300 p-2 sm:p-3.5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      
      {/* 1. Square Image Container with Pure White Background (Exact Ghorer Bazar Style) */}
      <div className="relative">
        
        {/* Top Badges (Ghorer Bazar Style) */}
        <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs">
              New
            </span>
          )}
        </div>

        <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-1">
          {product.discount > 0 && (
            <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
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
        <div className="w-full aspect-square bg-white rounded-xl p-2 sm:p-3 flex items-center justify-center overflow-hidden border border-slate-100 relative group/img">
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
              <Eye className="w-3.5 h-3.5 text-[#DE0D64]" /> View Details
            </span>
          </div>
        </div>

      </div>

      {/* 2. Product Info (Exact Ghorer Bazar Style: Clean Title, Price, and Single Add To Cart button) */}
      <div className="pt-2 sm:pt-2.5 flex-1 flex flex-col justify-between">
        
        <div>
          <h3 
            className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 line-clamp-2 hover:text-[#DE0D64] transition leading-snug mb-1 min-h-[1.9rem] sm:min-h-[2.3rem]"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="mt-1">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm sm:text-base font-extrabold text-[#DE0D64]">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-normal">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          {/* Single Ghorer Bazar Style Button: Clean "Add To Cart" only (Order Now removed) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-[#DE0D64] hover:bg-[#B8004F] text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add To Cart</span>
          </button>

        </div>

      </div>

    </div>
  );
}
