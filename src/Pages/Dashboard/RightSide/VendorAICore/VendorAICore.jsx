import React from 'react';
import { BrainCircuit, Sparkles, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

const VendorAICore = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto select-none font-mono">
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          INTELLIGENCE / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">AI_CORE_OPTIMIZER</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Predictive grid neural matrix mapping real-time e-commerce user demands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        
        <div className="md:col-span-7 bg-[#08090e]/60 border border-gray-900 rounded-[24px] p-6 backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 bg-purple-950/30 border border-purple-500/20 p-3.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
              <p className="text-[11px] text-purple-300 leading-relaxed">
                <span className="font-bold uppercase">Market Pulse Insight:</span> High customer demand pattern detected in <span className="text-white underline font-bold">Tactile Keyboards</span> over the past 48 hours grid node cycle.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] text-gray-600 tracking-widest uppercase block">// Suggested Matrix Protocols</span>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-black/40 border border-gray-950 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400">Optimize Price Threshold</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1"><Zap className="w-3 h-3" /> Reduce 3%</span>
                </div>
                <div className="p-3 bg-black/40 border border-gray-950 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400">Restock Urgency Level</span>
                  <span className="text-red-400 font-bold uppercase">CRITICAL_HIGH</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-950/40 via-purple-600 to-indigo-600 text-white py-3 rounded-xl text-xs font-black tracking-widest uppercase shadow-md transition-all hover:opacity-90">
            RUN_SYNAPSE_SYSTEM_OPTIMIZATION
          </button>
        </div>

        
        <div className="md:col-span-5 bg-gradient-to-b from-[#0a0616] to-[#04050a] border border-purple-900/20 rounded-[24px] p-6 flex flex-col justify-between min-h-[250px]">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Synapse Network Health</h4>
              <span className="text-[9px] text-gray-600 block">AI Engine: Model_Voxa_v4.2</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-gray-900/60 pt-4 mt-4 font-mono text-[10px]">
            <div className="flex justify-between text-gray-500">
              <span>MODEL_SYNC:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% OPERATIONAL
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>LAST_SCAN_CYCLE:</span>
              <span className="text-gray-400 font-bold">3 mins ago</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorAICore;