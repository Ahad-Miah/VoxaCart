import React from 'react';
import { ShoppingBag, Eye, Calendar, PackageCheck, Layers } from 'lucide-react';

const  Orders = () => {
  
  const orders = [
    { orderId: "VOXA-9831", timestamp: "06 July 2026", total: 12200, itemsCount: 3, state: "PROCESSING" },
    { orderId: "VOXA-9742", timestamp: "28 June 2026", total: 4300, itemsCount: 1, state: "DELIVERED" },
    { orderId: "VOXA-9510", timestamp: "15 June 2026", total: 8000, itemsCount: 2, state: "DELIVERED" }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black font-mono text-white uppercase tracking-tight">
          PIPELINE / <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">PURCHASE_LOGS</span>
        </h3>
        <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Historical matrix database for completed transactions and system shipments.</p>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <div key={idx} className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 backdrop-blur-xl hover:border-gray-800 transition-all duration-300 relative overflow-hidden group">
              
            
              <div className={`absolute top-0 bottom-0 left-0 w-[2.5px] ${order.state === "PROCESSING" ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />

              {/* LEFT GROUP: DATA HEADERS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-4 lg:gap-10 flex-1 pl-2">
                
                
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Transaction ID</span>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white group-hover:text-[#7c74ff] transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
                    {order.orderId}
                  </div>
                </div>

               
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Timestamp Log</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-600" />
                    {order.timestamp}
                  </div>
                </div>

               
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Quantum Payload</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
                    <Layers className="w-3.5 h-3.5 text-gray-600" />
                    {order.itemsCount} {order.itemsCount > 1 ? 'Items' : 'Item'}
                  </div>
                </div>

                
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Total Net Value</span>
                  <span className="font-mono text-xs font-black text-white block">৳ {order.total}</span>
                </div>
              </div>

              {/* RIGHT GROUP: ACTIONS & STATUS TILES */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-900/60 shrink-0">
                
               
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-[10px] font-bold tracking-widest ${
                  order.state === "PROCESSING" 
                    ? "bg-amber-950/30 border border-amber-500/20 text-amber-400" 
                    : "bg-emerald-950/30 border border-emerald-500/20 text-emerald-400"
                }`}>
                  <PackageCheck className="w-3.5 h-3.5" />
                  {order.state}
                </span>

                
                <button className="flex items-center gap-1 bg-black/40 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white px-3.5 py-2 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-200">
                  <Eye className="w-3.5 h-3.5" /> DETAILED_SPEC
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 font-mono text-xs uppercase">
            No active historical transaction logs recorded.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;