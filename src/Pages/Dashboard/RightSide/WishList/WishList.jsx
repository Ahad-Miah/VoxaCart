import React from 'react';
import { ShoppingCart, Trash2, Heart, ShieldAlert } from 'lucide-react';

const WishList = () => {
  
  const wishlistItems = [
    { id: 101, name: "Nordic Edition Desk Mat Matte", price: 1800, stock: true, img: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=200&auto=format&fit=crop" },
    { id: 102, name: "Anker PowerPort Quantum III", price: 3400, stock: false, img: "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=200&auto=format&fit=crop" }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          WISHLIST / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MONITORED_VAULT</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Bookmarked mainframe hardware assets and active price monitoring nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="bg-[#08090e]/60 border border-gray-900 rounded-[20px] p-4 flex gap-4 backdrop-blur-xl relative group hover:border-purple-500/20 transition-all duration-300">
              
             
              <div className="w-20 h-20 bg-black/40 border border-gray-900 rounded-xl overflow-hidden shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              
              <div className="flex flex-col justify-between flex-1 overflow-hidden">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-mono font-bold text-white truncate w-full">{item.name}</h4>
                    <button className="text-gray-600 hover:text-red-400 p-1 rounded-md transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-purple-400 font-black block">৳ {item.price}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-900/40 mt-2">
                  <div>
                    {item.stock ? (
                      <span className="text-[8px] font-mono px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-bold rounded">IN_STOCK</span>
                    ) : (
                      <span className="text-[8px] font-mono px-2 py-0.5 bg-red-950/40 border border-red-500/20 text-red-400 font-bold rounded">DEPLETED</span>
                    )}
                  </div>
                  
                  <button 
                    disabled={!item.stock}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9px] font-black tracking-widest uppercase transition-all ${
                      item.stock 
                        ? 'bg-[#7c74ff]/10 hover:bg-[#7c74ff] text-[#7c74ff] hover:text-white border border-[#7c74ff]/20' 
                        : 'bg-black/20 border border-gray-900 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-3 h-3" /> INJECT_TO_CART
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 font-mono text-xs uppercase">
            No bookmarks saved inside the grid vault.
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;