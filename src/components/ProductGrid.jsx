import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    selectedSort,
    setSelectedSort
  } = useCart();

  const [priceRange, setPriceRange] = useState('all');
  const [displayCount, setDisplayCount] = useState(60);
  const observerTarget = useRef(null);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Price range
    if (priceRange === 'under_1000') {
      result = result.filter(p => p.price < 1000);
    } else if (priceRange === '1000_2500') {
      result = result.filter(p => p.price >= 1000 && p.price <= 2500);
    } else if (priceRange === '2500_5000') {
      result = result.filter(p => p.price > 2500 && p.price <= 5000);
    } else if (priceRange === 'above_5000') {
      result = result.filter(p => p.price > 5000);
    }

    // Sort
    if (selectedSort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'discount') {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, selectedSort]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setDisplayCount(prev => Math.min(prev + 60, filteredProducts.length));
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [filteredProducts.length]);

  // Reset display count on filter changes
  useEffect(() => {
    setDisplayCount(60);
  }, [selectedCategory, searchQuery, priceRange, selectedSort]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  return (
    <div id="product-catalog" className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      
      {/* Section Header & Filter Controls */}
      <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-xs mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#DE0D64] mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>In-Stock Gadgets Collection</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-slate-800">
              {selectedCategory === 'All' ? 'All Gadget Products' : selectedCategory}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Showing <span className="font-bold text-[#DE0D64]">{filteredProducts.length} items</span>
            </p>
          </div>

          {/* Filter Bar Controls */}
          <div className="flex items-center gap-2">
            
            {/* Price Filter Select */}
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                setDisplayCount(60);
              }}
              className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1.5 sm:py-2 rounded-xl focus:outline-none focus:border-[#DE0D64] cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under_1000">Under ৳1k</option>
              <option value="1000_2500">৳1k - ৳2.5k</option>
              <option value="2500_5000">৳2.5k - ৳5k</option>
              <option value="above_5000">Above ৳5k</option>
            </select>

            {/* Sorting Select */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1.5 sm:py-2 rounded-xl focus:outline-none focus:border-[#DE0D64] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Reset Filter Button */}
            {(selectedCategory !== 'All' || searchQuery || priceRange !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setPriceRange('all');
                  setSelectedSort('featured');
                  setDisplayCount(60);
                }}
                className="text-xs text-slate-500 hover:text-[#DE0D64] p-1.5 rounded-lg border border-slate-200 hover:border-pink-200 cursor-pointer"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Chips: Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#DE0D64] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-[#DE0D64]'
            }`}
          >
            All ({products.length})
          </button>

          {categories.slice(0, 15).map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#DE0D64] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-[#DE0D64]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid: 2 columns on Mobile (Exact Ghorer Bazar Style), 3 on tablet, 4 on desktop, 5 on wide */}
      {visibleProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Invisible Observer Target for seamless loading without button */}
          <div ref={observerTarget} className="h-12 w-full"></div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-100 shadow-xs max-w-md mx-auto my-8">
          <div className="w-14 h-14 bg-pink-50 text-[#DE0D64] rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">No Gadgets Found</h3>
          <p className="text-xs text-slate-500 mb-4">
            No in-stock gadgets matched your search or filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setPriceRange('all');
            }}
            className="bg-[#DE0D64] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#B8004F] transition cursor-pointer"
          >
            Show All Gadgets
          </button>
        </div>
      )}

    </div>
  );
}
