import React from 'react';
import { 
  Watch, 
  Headphones, 
  Volume2, 
  BatteryCharging, 
  Fan, 
  Lamp, 
  Gamepad2, 
  Car, 
  Flame, 
  Sparkles, 
  Grid,
  Droplets,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CategorySlider() {
  const { categories, selectedCategory, setSelectedCategory } = useCart();

  // Icon map
  const getIcon = (name) => {
    switch (name) {
      case 'Smart Watch': return Watch;
      case 'TWS & Earbuds':
      case 'Gaming Headset': return Headphones;
      case 'Bluetooth Speaker': return Volume2;
      case 'Power Bank': return BatteryCharging;
      case 'Mobile Cooler': return Fan;
      case 'Mini Fan': return Fan;
      case 'Smart Lamp & Lights': return Lamp;
      case 'Gaming Accessories': return Gamepad2;
      case 'RC & Diecast Cars':
      case 'Tech & RC Toys': return Car;
      case 'Electronic Lighter': return Flame;
      case 'Humidifier': return Droplets;
      case 'Mobile Stand & Tripod': return Smartphone;
      default: return Sparkles;
    }
  };

  // Top featured categories to display prominently in English
  const displayCategories = [
    { name: 'All', label: 'All Gadgets', count: 727, icon: Grid },
    ...categories.slice(0, 11).map(c => ({
      name: c.name,
      label: c.name,
      count: c.count,
      icon: getIcon(c.name)
    }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span className="w-2 sm:w-2.5 h-5 sm:h-6 bg-[#DE0D64] rounded-full inline-block"></span>
            Popular Categories
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Browse through our wide range of in-stock gadgets
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-[#DE0D64] hover:underline cursor-pointer"
          >
            View All
          </button>
        )}
      </div>

      {/* Categories Grid: Horizontal scroll on mobile (exact Ghorer Bazar style), grid on desktop */}
      <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        {displayCategories.map((cat) => {
          const Icon = cat.icon || Sparkles;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                const el = document.getElementById('product-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition group cursor-pointer text-center shrink-0 w-20 sm:w-auto ${
                isSelected 
                  ? 'bg-pink-50/80 border-[#DE0D64] shadow-xs' 
                  : 'bg-white border-slate-100 hover:border-pink-200 hover:shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1.5 sm:mb-2 transition-transform group-hover:scale-110 ${
                isSelected 
                  ? 'bg-[#DE0D64] text-white shadow-sm' 
                  : 'bg-pink-50 text-[#DE0D64] group-hover:bg-[#DE0D64] group-hover:text-white'
              }`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className={`text-[10px] sm:text-[11px] font-bold line-clamp-1 leading-tight w-full ${
                isSelected ? 'text-[#DE0D64]' : 'text-slate-700'
              }`}>
                {cat.label}
              </span>

              <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
