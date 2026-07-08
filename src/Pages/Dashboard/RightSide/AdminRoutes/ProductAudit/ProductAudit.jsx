import React from 'react';
import { FileSpreadsheet, Eye, ThumbsUp, ThumbsDown, User } from 'lucide-react';

const ProductAudit = () => {
  const auditQueue = [
    { id: "PROD-AUD-02", title: "GoolRC Custom Coiled Aviator Cable", vendor: "Apex Tech", price: "৳ 1,800" }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">PRODUCT_AUDIT_NODE</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Inspect marketplace item inventory metadata before core grid broadcasting.</p>
      </div>

      <div className="space-y-4">
        {auditQueue.length > 0 ? (
          auditQueue.map((item) => (
            <div key={item.id} className="bg-[#08090e]/60 border border-gray-900 rounded-[22px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl hover:border-gray-800 transition-all duration-300">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                <div>
                  <span className="text-[8px] text-gray-600 block uppercase tracking-widest">Audit ID</span>
                  <span className="text-xs font-bold text-gray-400">{item.id}</span>
                </div>
                <div>
                  <span className="text-[8px] text-gray-600 block uppercase tracking-widest">Asset Title</span>
                  <h4 className="text-xs font-bold text-white truncate max-w-[180px]">{item.title}</h4>
                </div>
                <div>
                  <span className="text-[8px] text-gray-600 block uppercase tracking-widest">Vendor Node</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><User className="w-3.5 h-3.5 text-indigo-500" /> {item.vendor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-900/40 shrink-0">
                <span className="text-xs text-white font-black">{item.price}</span>
                <div className="flex gap-1.5">
                  <button className="p-2 bg-black/40 border border-gray-900 hover:border-[#7c74ff]/40 text-gray-500 hover:text-white rounded-xl transition-all">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-xl transition-all hover:bg-emerald-500 hover:text-white">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl transition-all hover:bg-red-500 hover:text-white">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="border border-dashed border-gray-900 rounded-2xl p-12 text-center text-gray-600 text-xs uppercase">
            All marketplace inventory nodes are cleared and certified.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAudit;