import React from 'react';
import { PlusCircle, Image, FileText, Tag, Layers, Database } from 'lucide-react';

const AddProduct = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          INVENTORY / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#7c74ff]">ADD_NEW_ASSET</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Deploy a brand new hardware or utility asset node onto the customer catalog grid.</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl space-y-6">
        
        
        <div className="border border-dashed border-gray-900 hover:border-[#7c74ff]/30 transition-all rounded-xl p-8 bg-black/20 text-center flex flex-col items-center justify-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-purple-950/20 border border-purple-900/40 rounded-xl flex items-center justify-center group-hover:bg-purple-950/40">
            <Image className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-[10px] text-gray-500 tracking-widest uppercase group-hover:text-purple-300">Upload Product Payload Image</span>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[9px] text-gray-600 tracking-widest uppercase block pl-1">Asset Nomenclature (Title)</label>
            <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#7c74ff]/40 px-4 py-3 rounded-xl transition-all">
              <FileText className="w-4 h-4 text-gray-600" />
              <input type="text" placeholder="e.g. Cyberpunk Hot-Swappable Switch Pack" className="bg-transparent text-xs text-white placeholder-gray-700 focus:outline-none w-full" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-600 tracking-widest uppercase block pl-1">Price Credit (৳ BDT)</label>
            <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#7c74ff]/40 px-4 py-3 rounded-xl transition-all">
              <Tag className="w-4 h-4 text-gray-600" />
              <input type="number" placeholder="5500" className="bg-transparent text-xs text-white placeholder-gray-700 focus:outline-none w-full" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-600 tracking-widest uppercase block pl-1">Available Node Supply (Stock)</label>
            <div className="flex items-center gap-3 bg-black/40 border border-gray-900 focus-within:border-[#7c74ff]/40 px-4 py-3 rounded-xl transition-all">
              <Database className="w-4 h-4 text-gray-600" />
              <input type="number" placeholder="25" className="bg-transparent text-xs text-white placeholder-gray-700 focus:outline-none w-full" />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[9px] text-gray-600 tracking-widest uppercase block pl-1">Asset Grid Core Specifications (Description)</label>
            <textarea placeholder="Compile detailed asset structural protocols and package details here..." rows="4" className="w-full bg-black/40 border border-gray-900 focus:border-[#7c74ff]/40 p-4 rounded-xl text-xs text-white placeholder-gray-700 focus:outline-none resize-none transition-all" />
          </div>
        </div>

        
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-[#7c74ff] hover:from-purple-700 hover:to-indigo-600 text-white py-3.5 rounded-xl font-black italic tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10">
          <PlusCircle className="w-4 h-4" /> PUSH_PRODUCT_TO_GRID
        </button>
      </form>
    </div>
  );
};

export default AddProduct;