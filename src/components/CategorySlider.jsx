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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#DE0D64] rounded-full inline-block"></span>
            Popular Categories
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse through our wide range of in-stock gadgets
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-[#DE0D64] hover:underline cursor-pointer"
          >
            View All Categories
          </button>
        )}
      </div>

      {/* Categories Grid/Row */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2.5 sm:gap-3">
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
              className={`flex flex-col items-center p-3 rounded-2xl border transition group cursor-pointer text-center ${
                isSelected 
                  ? 'bg-pink-50/80 border-[#DE0D64] shadow-xs' 
                  : 'bg-white border-slate-100 hover:border-pink-200 hover:shadow-xs'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                isSelected 
                  ? 'bg-[#DE0D64] text-white shadow-sm' 
                  : 'bg-pink-50 text-[#DE0D64] group-hover:bg-[#DE0D64] group-hover:text-white'
              }`}>
                <Icon className="w-6 h-6" />
              </div>

              <span className={`text-[11px] font-bold line-clamp-1 leading-tight ${
                isSelected ? 'text-[#DE0D64]' : 'text-slate-700'
              }`}>
                {cat.label}
              </span>

              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.count} items
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
