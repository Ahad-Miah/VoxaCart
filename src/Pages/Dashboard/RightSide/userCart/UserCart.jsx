import React from 'react';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, Terminal } from 'lucide-react';

const UserCart = () => {
  const cartItems = [
    { id: 1, name: "Cyberpunk Mechanical Keyboard v2", price: 8500, qty: 1, img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Quantum Neon LED Light Pack", price: 2200, qty: 2, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=200&auto=format&fit=crop" }
  ];

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryCharge = 120;
  const grandTotal = subTotal + deliveryCharge;

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          CART_MATRIX / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">ASSETS_CHECKOUT</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Review active tokens inside the purchase terminal queue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PRODUCT LIST */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="bg-[#08090e]/60 border border-gray-900 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl hover:border-gray-800 transition-all duration-300">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gray-800 shrink-0" />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-mono font-bold text-white truncate max-w-[250px] sm:max-w-[350px]">{item.name}</h4>
                    <span className="text-[10px] font-mono text-gray-500 block mt-1">UNIT_PRICE: ৳ {item.price}</span>
                  </div>
                </div>

                {/* QUANTITY CONTROL & DELETE BUTTON */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-900/60">
                  <div className="flex items-center bg-black/40 border border-gray-900 rounded-lg p-1 font-mono">
                    <button className="p-1 hover:text-[#7c74ff] transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 text-xs text-white font-bold">{item.qty}</span>
                    <button className="p-1 hover:text-[#7c74ff] transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-right font-mono min-w-[80px]">
                    <span className="text-xs text-white font-black block">৳ {item.price * item.qty}</span>
                  </div>
                  <button className="text-gray-600 hover:text-red-400 p-2 border border-transparent hover:border-red-950/20 hover:bg-red-950/10 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 font-mono text-xs uppercase">
              No assets in queue terminal.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SUMMARY PANEL */}
        <div className="lg:col-span-4 bg-[#08090e]/80 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7c74ff]/40 to-transparent" />
          <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-4">
            <Terminal className="w-4 h-4 text-[#7c74ff]" />
            <h5 className="text-xs font-black font-mono uppercase text-white tracking-widest">Billing Blueprint</h5>
          </div>

          <div className="space-y-3 font-mono text-xs border-b border-gray-900 pb-4">
            <div className="flex justify-between text-gray-500">
              <span>SUBTOTAL_VAL:</span>
              <span className="text-gray-300 font-bold">৳ {subTotal}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>SHIPPING_NODE:</span>
              <span className="text-gray-300 font-bold">৳ {deliveryCharge}</span>
            </div>
          </div>

          <div className="flex justify-between items-center font-mono py-4">
            <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">NET_ESTIMATE:</span>
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">৳ {grandTotal}</span>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-mono text-xs font-black italic tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 mt-2 group">
            <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
            INITIALIZE_PURCHASE
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;