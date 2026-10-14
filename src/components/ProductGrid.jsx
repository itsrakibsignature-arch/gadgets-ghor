import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Search,
  RotateCcw
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
      result.sort((a, b) => b.discount - a.discount);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, selectedSort]);

  // Seamless infinite scroll without any "Load More" button
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayCount < filteredProducts.length) {
          setDisplayCount(prev => prev + 60);
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayCount, filteredProducts.length]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  return (
    <section id="product-catalog" className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Catalog Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs mb-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#DE0D64] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>In-Stock Gadgets Collection</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {selectedCategory === 'All' ? 'All Gadget Products' : selectedCategory}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing <span className="font-bold text-[#DE0D64]">{filteredProducts.length} items</span> (all in stock)
            </p>
          </div>

          {/* Filter Bar Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Price Filter Select */}
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                setDisplayCount(60);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-[#DE0D64]"
            >
              <option value="all">All Prices</option>
              <option value="under_1000">Under ৳1,000</option>
              <option value="1000_2500">৳1,000 - ৳2,500</option>
              <option value="2500_5000">৳2,500 - ৳5,000</option>
              <option value="above_5000">Above ৳5,000</option>
            </select>

            {/* Sorting Select */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-[#DE0D64]"
            >
              <option value="featured">Featured Gadgets (Default)</option>
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
                className="text-xs text-slate-500 hover:text-[#DE0D64] flex items-center gap-1 font-semibold px-2 py-1.5 cursor-pointer"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Filter Pills in English */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setDisplayCount(60);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#DE0D64] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-[#DE0D64]'
            }`}
          >
            All Products ({products.length})
          </button>

          {categories.slice(0, 12).map(cat => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setDisplayCount(60);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
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

      {/* Products Grid */}
      {visibleProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Invisible Observer Target for seamless loading without button */}
          <div ref={observerTarget} className="h-10 w-full"></div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs max-w-md mx-auto my-8">
          <div className="w-16 h-16 bg-pink-50 text-[#DE0D64] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Gadgets Found</h3>
          <p className="text-xs text-slate-500 mb-4">
            No in-stock gadgets matched your search or filters. Please try resetting your search.
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

    </section>
  );
}
