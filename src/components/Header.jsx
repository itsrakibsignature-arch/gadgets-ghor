import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { 
    products, 
    categories, 
    totalCartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    wishlist,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setSelectedProduct
  } = useCart();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Live search results
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-pink-100 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#DE0D64] via-[#E60067] to-[#F43F5E] text-white py-1.5 px-3 md:px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold flex items-center gap-1 shrink-0">
              <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" /> হট অফার
            </span>
            <p className="truncate text-[11px] md:text-xs">
              দেশজুড়ে ক্যাশ অন ডেলিভারি! অর্ডার করুন: <a href="tel:01400725333" className="font-bold text-yellow-200 hover:underline">01400725333</a>
            </p>
          </div>

          <div className="hidden md:flex items-center gap-5 shrink-0 text-[11px]">
            <a href="tel:01400725333" className="flex items-center gap-1.5 hover:text-yellow-200 transition">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>হটলাইন: 01400725333</span>
            </a>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>সকাল ৯টা - রাত ১১টা</span>
            </div>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-1 text-yellow-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>১০০% অরিজিনাল গ্যাজেট</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (Mobile optimized like Ghorer Bazar) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Menu Button + Logo & Brand Name */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 rounded-lg text-slate-700 hover:bg-pink-50 hover:text-[#DE0D64] transition cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="/" className="flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/logo-icon.jpg" 
                alt="Gadgets Ghor Logo" 
                className="h-9 sm:h-12 md:h-16 w-auto object-contain rounded-xl transition-transform group-hover:scale-105 shrink-0" 
              />
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-[#DE0D64] block leading-none">
                  GADGETS GHOR
                </span>
                <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-500 tracking-wider mt-1">
                  স্মার্ট গ্যাজেটের সেরা কালেকশন
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar (Hidden on Mobile, shown full-width row below) */}
          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-xl mx-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search gadgets (e.g., TWS, Smart Watch, Power Bank, Cooler...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-11 pr-24 py-2.5 rounded-full border-2 border-pink-200 focus:border-[#DE0D64] focus:outline-none focus:ring-3 focus:ring-pink-100 text-sm transition bg-slate-50/50 hover:bg-white"
              />
              <Search className="absolute left-4 w-5 h-5 text-pink-400 pointer-events-none" />
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => setIsSearchFocused(false)}
                className="absolute right-1.5 bg-[#DE0D64] hover:bg-[#B8004F] text-white px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>Search</span>
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden z-50">
                <div className="p-2 bg-pink-50/60 border-b border-pink-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Search Results ({searchResults.length})</span>
                  <span className="text-[#DE0D64]">Press enter to view all</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {searchResults.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 flex items-center justify-between hover:bg-pink-50/50 cursor-pointer transition gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          <img 
                            src={item.image || '/logo.png'} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = '/logo.png'; }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-pink-600 font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-[#DE0D64]">
                          ৳{item.price.toLocaleString('bn-BD')}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-[11px] text-slate-400 line-through">
                            ৳{item.originalPrice.toLocaleString('bn-BD')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* Phone Support Pill (Hotline 01400725333) */}
            <a 
              href="tel:01400725333" 
              className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100/80 text-slate-700 transition border border-pink-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#DE0D64] text-white flex items-center justify-center shadow-xs">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] font-bold text-[#DE0D64] uppercase block tracking-wider">
                  কল করে অর্ডার করুন
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  01400725333
                </span>
              </div>
            </a>

            {/* Mobile Call Icon */}
            <a
              href="tel:01400725333"
              className="md:hidden p-2 rounded-full text-[#DE0D64] bg-pink-50 hover:bg-pink-100 transition"
              title="Call Hotline"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Wishlist Button */}
            <button 
              onClick={() => {
                if (wishlist.length > 0) {
                  setSelectedProduct(wishlist[0]);
                }
              }}
              className="hidden sm:flex relative p-2 rounded-full text-slate-700 hover:bg-pink-50 hover:text-[#DE0D64] transition cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DE0D64] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Total */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#DE0D64] hover:bg-[#B8004F] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#DE0D64]">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start text-left leading-none text-xs">
                <span className="text-[10px] text-pink-200 font-medium">কার্ট</span>
                <span className="font-extrabold text-white text-xs">
                  ৳{cartSubtotal.toLocaleString('bn-BD')}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Full-Width Search Bar (Exact Ghorer Bazar Style) */}
        <div className="md:hidden mt-2.5">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search gadgets (e.g. Watch, TWS, Cooler...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-pink-200 focus:border-[#DE0D64] focus:outline-none text-xs transition bg-slate-50"
            />
            <Search className="absolute left-3.5 w-4 h-4 text-pink-500 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Bar (Desktop & Horizontal Mobile Scroll) */}
      <div className="bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-1 py-1 w-full md:w-auto overflow-x-auto scrollbar-none">
            {/* All Categories Dropdown Trigger (Desktop) */}
            <div className="hidden lg:block relative">
              <button 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 bg-[#DE0D64] text-white px-4 py-2 font-bold rounded-md hover:bg-[#B8004F] transition cursor-pointer"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Categories Dropdown */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-b-xl shadow-xl border border-pink-100 py-2 z-50 max-h-96 overflow-y-auto">
                  <button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-pink-50 transition ${
                      selectedCategory === 'All' ? 'bg-pink-50 text-[#DE0D64] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {products.length}
                    </span>
                  </button>

                  {categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-pink-50 transition ${
                        selectedCategory === cat.name ? 'bg-pink-50 text-[#DE0D64] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Category Links (Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 pl-1 scrollbar-none w-full">
              {[
                'All',
                'Smart Watch',
                'TWS & Earbuds',
                'Bluetooth Speaker',
                'Power Bank',
                'Mobile Cooler',
                'Gaming Headset',
                'Mini Fan',
                'Smart Lamp & Lights',
                'RC & Diecast Cars'
              ].map(catName => (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap text-xs shrink-0 cursor-pointer ${
                    selectedCategory === catName 
                      ? 'bg-[#DE0D64] text-white shadow-xs' 
                      : 'bg-white md:bg-transparent text-slate-700 border border-slate-200 md:border-transparent hover:text-[#DE0D64] hover:bg-white'
                  }`}
                >
                  {catName === 'All' ? 'All Gadgets' : catName}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status Pill */}
          <div className="hidden xl:flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>727+ In-Stock Gadgets</span>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50">
              <div className="flex items-center gap-2.5">
                <img src="/logo-icon.jpg" alt="Gadgets Ghor" className="h-10 w-auto rounded-lg" />
                <span className="font-extrabold text-[#DE0D64] text-lg">GADGETS GHOR</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:bg-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Categories (English)
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'All' ? 'bg-pink-100 text-[#DE0D64]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>All Gadgets</span>
                  <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{products.length}</span>
                </button>

                {categories.slice(0, 18).map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left rounded-lg text-sm font-semibold flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.name ? 'bg-pink-100 text-[#DE0D64]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <a 
                  href="tel:01400725333" 
                  className="w-full flex items-center justify-center gap-2 bg-[#DE0D64] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Hotline: 01400725333</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
}
