import React, { useState, useMemo } from 'react';
import { 
  Search, Mic, Sparkles, ShoppingBag, Star, ArrowUpDown,
  Cpu, Layers, Home, Droplet, Trophy, HeartPulse, Watch, Smartphone, Box 
} from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'VoxaStream Wireless Pods', category: 'Gadgets', price: 129, rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'AeroFit Neon Cyber Jacket', category: 'Fashion', price: 189, rating: 4.8, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Lumina Peptide Glow Serum', category: 'Beauty', price: 75, rating: 4.7, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Quantum Mechanical Keyboard', category: 'Electronics', price: 210, rating: 4.9, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Minimalist Hologram Clock', category: 'Home & Living', price: 115, rating: 4.6, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Evo-Knit Pro Smart Trainer', category: 'Sports', price: 195, rating: 4.8, image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'O2-Vitality Smart Band', category: 'Health', price: 135, rating: 4.5, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&auto=format&fit=crop' },
  { id: 8, name: 'Carbon Fiber Tech Ring', category: 'Accessories', price: 95, rating: 4.7, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' },
];

const categories = [
  { id: 'All', label: 'All Products', icon: <Box className="w-3.5 h-3.5" /> },
  { id: 'Electronics', label: 'Electronics', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'Fashion', label: 'Fashion', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'Home & Living', label: 'Home & Living', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'Beauty', label: 'Beauty', icon: <Droplet className="w-3.5 h-3.5" /> },
  { id: 'Sports', label: 'Sports', icon: <Trophy className="w-3.5 h-3.5" /> },
  { id: 'Health', label: 'Health', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { id: 'Accessories', label: 'Accessories', icon: <Watch className="w-3.5 h-3.5" /> },
  { id: 'Gadgets', label: 'Gadgets', icon: <Smartphone className="w-3.5 h-3.5" /> },
];

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // default, lowToHigh, highToLow

  
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    
    if (searchQuery.trim() !== '') {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

   
    if (sortBy === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#050508] text-white min-h-screen overflow-x-clip relative  select-none pb-32">
      
     
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      
      <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/10 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      
      <div className="max-w-7xl mx-auto pt-24 pb-4 px-6 md:px-12 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1 rounded-full text-[10px] font-black italic tracking-widest text-[#7c74ff] uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Voxa Ultra Catalog
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold italic tracking-tighter uppercase">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">Products</span> GRID
        </h1>
      </div>

     
      <div className="sticky top-24 z-10 max-w-6xl mx-auto px-4 md:px-6 my-8">
        <div className="bg-[#0d0f17]/80 border border-gray-900/90 rounded-[24px] p-2.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
          
          
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[10px] font-black italic tracking-wider uppercase px-4 py-3 rounded-xl transition-all duration-300 shrink-0 flex items-center gap-2 border ${
                    isActive 
                      ? 'bg-[#5046e5] border-transparent text-white shadow-lg shadow-indigo-500/30 scale-[1.03]' 
                      : 'bg-black/40 border-gray-900 text-gray-400 hover:text-white hover:border-gray-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-indigo-400'}>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row gap-4 items-center justify-between">
        
       
        <div className="flex items-center gap-3 bg-[#11131c]/40 border border-gray-900/80 focus-within:border-[#5046e5]/50 px-5 py-3.5 rounded-[20px] backdrop-blur-md transition-all duration-300 shadow-inner w-full md:max-w-xl">
          <Search className="w-4 h-4 text-gray-600 shrink-0" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type code to search across the ecosystem..."
            className="bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none w-full font-medium"
          />
          <Mic className="w-4 h-4 text-indigo-400/50 hover:text-indigo-400 cursor-pointer transition" />
        </div>

        
        <div className="flex items-center gap-2 bg-[#11131c]/40 border border-gray-900/80 px-4 py-3 rounded-[20px] backdrop-blur-md w-full md:w-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-indigo-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-black italic tracking-wider text-gray-400 uppercase focus:outline-none cursor-pointer w-full md:w-auto"
          >
            <option value="default" className="bg-[#0c0d14] text-white">Default Matrix</option>
            <option value="lowToHigh" className="bg-[#0c0d14] text-white">Price: Low to High</option>
            <option value="highToLow" className="bg-[#0c0d14] text-white">Price: High to Low</option>
          </select>
        </div>

      </div>

      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-[#0c0d14] border border-gray-900/80 rounded-[28px] p-3 relative group hover:border-[#5046e5]/40 transition-all duration-500 flex flex-col justify-between shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/[0.02] via-purple-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px] pointer-events-none" />

                <div className="space-y-4">
                  
                  <div className="aspect-square w-full relative overflow-hidden rounded-[20px] bg-black/60 border border-gray-950">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-transparent to-transparent opacity-90" />
                    
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-gray-800 text-gray-400 text-[8px] font-black italic tracking-widest uppercase px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>

                 
                  <div className="space-y-1 px-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="text-[10px] font-bold text-gray-500">{product.rating}</span>
                    </div>
                    <h3 className="text-base font-black italic tracking-wide text-white group-hover:text-[#7c74ff] transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                </div>

              
                <div className="pt-4 mt-4 border-t border-gray-900/40 flex items-center justify-between px-1">
                  <div>
                    <p className="text-[8px] font-black italic text-gray-600 uppercase tracking-widest">NET VAL</p>
                    <p className="text-lg font-black italic text-white">${product.price}</p>
                  </div>
                  <button className="text-[10px] font-black italic tracking-wider text-white bg-[#5046e5] hover:bg-[#6359e9] px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md">
                    <ShoppingBag className="w-3.5 h-3.5" /> BUY
                  </button>
                </div>

               
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-[#5046e5] to-purple-500 group-hover:w-full transition-all duration-500" />
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#0d0f17]/30 border border-gray-900 rounded-[28px]">
            <p className="text-gray-500 font-black italic tracking-widest uppercase text-xs">No Matrix Matches Your Query</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AllProducts;