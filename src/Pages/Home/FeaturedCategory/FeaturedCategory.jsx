import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Laptop, Shirt, Home, Sparkles, Trophy, Heart, Watch, Camera ,Star, ShoppingCart,  Eye, X, Check, ShieldCheck, Truck, RefreshCw, LayoutGrid, Cpu,    Filter, PocketKnife} from 'lucide-react';
import axios from 'axios';

// const categories = [
//   { id: 1, name: 'Electronics', count: '120+', icon: <Laptop className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
//   { id: 2, name: 'Fashion', count: '120+', icon: <Shirt className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop' },
//   { id: 3, name: 'Home & Living', count: '120+', icon: <Home className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop' },
//   { id: 4, name: 'Beauty', count: '120+', icon: <Sparkles className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop' },
//   { id: 5, name: 'Sports', count: '120+', icon: <Trophy className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop' },
//   { id: 6, name: 'Health', count: '90+', icon: <Heart className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop' },
//   { id: 7, name: 'Accessories', count: '150+', icon: <Watch className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
//   { id: 8, name: 'Gadgets', count: '80+', icon: <Camera className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=600&auto=format&fit=crop' },
// ];
const icons = { Cpu, Shirt, Home, Sparkles, Trophy,Heart,PocketKnife };
const FeaturedCategory = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/category');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

  // Auto Scroll Logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }
    }, 1500); 

    return () => clearInterval(interval);
  }, [isHovered]);

  // Manual Navigation Control
  const scroll = (direction) => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#09090d] text-white py-16 px-6 md:px-12 overflow-hidden select-none">
      <div className="max-w-8xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold italic tracking-tight">
              Explore by <span className="text-[#5046e5]">Category</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Curated collections from the world's most trusted independent verified vendors.
            </p>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-6 pt-2">
            <button className="text-xs font-black italic tracking-widest uppercase text-gray-300 hover:text-white transition flex items-center gap-1 group">
              Show All Products 
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200" />
            </button>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 bg-[#12151e] border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1f2c] transition duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 bg-[#12151e] border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1f2c] transition duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- SLIDER CONTAINER --- */}
        <div 
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) =>{
          const Icon = icons[category.icon] || Cpu;
            return(
               <div 
              key={category.id}
              className="min-w-[260px] sm:min-w-[280px] h-[360px] relative rounded-[32px] overflow-hidden group snap-start border border-gray-950 shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end space-y-3 z-10">
                {/* Icon Box */}
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center shadow-lg">
                 <Icon></Icon>
                </div>
                
                {/* Text Group */}
                <div>
                  <h3 className="text-xl font-black italic tracking-wide text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-[11px] font-black italic tracking-widest text-gray-400 uppercase">
                    {category.count} Products
                  </p>
                </div>
              </div>
            </div>
            )
          }     
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategory;