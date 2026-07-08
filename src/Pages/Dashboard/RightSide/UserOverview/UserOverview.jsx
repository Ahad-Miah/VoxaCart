import React, { useContext } from 'react';
import { ShoppingCart, Heart, Wallet, ArrowUpRight, ShieldCheck, Clock, RefreshCw, Star } from 'lucide-react';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';

const UserOverview = () => {
  const { user } = useContext(AuthContext);

  
  const stats = [
    { 
      label: "Cart Matrix Assets", 
      value: "05 Items", 
      icon: ShoppingCart, 
      color: "from-indigo-600 to-[#7c74ff]", 
      glow: "shadow-indigo-500/10",
      desc: "Pending checkout resolution"
    },
    { 
      label: "Wishlist Vault", 
      value: "12 Saved", 
      icon: Heart, 
      color: "from-purple-600 to-pink-500", 
      glow: "shadow-purple-500/10",
      desc: "Monitored item price logs"
    },
    { 
      label: "Total Value Invested", 
      value: "৳ 24,500", 
      icon: Wallet, 
      color: "from-emerald-600 to-teal-500", 
      glow: "shadow-emerald-500/10",
      desc: "Lifetime transaction matrix"
    }
  ];

 
  const recentOrders = [
    { id: "VOXA-9831", date: "06-07-2026", total: "৳ 12,200", status: "PROCESSING", node: "DHAKA_CORE_01" },
    { id: "VOXA-9742", date: "28-06-2026", total: "৳ 4,300", status: "DELIVERED", node: "CHITTAGONG_NODE" },
    { id: "VOXA-9510", date: "15-06-2026", total: "৳ 8,000", status: "DELIVERED", node: "SYLHET_HUB_03" },
  ];

  return (
    <div className="space-y-8 select-none max-w-6xl mx-auto">
      
      
      <div className="bg-gradient-to-r from-[#08090e]/90 via-[#0e111a]/40 to-transparent border border-gray-900 rounded-[24px] p-6 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none hidden md:block">
          <Star className="w-40 h-40 text-white animate-spin" style={{ animationDuration: '30s' }} />
        </div>
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-0.5 rounded-md font-mono text-[9px] text-[#7c74ff] tracking-widest uppercase">
            <span className="w-1 h-1 bg-[#7c74ff] rounded-full animate-ping" /> Terminal Session Initialized
          </div>
          <h2 className="text-xl md:text-3xl font-black font-mono text-white tracking-tight uppercase">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">{user?.displayName || "Operator_Node"}</span>
          </h2>
          <p className="text-[11px] text-gray-500 font-mono">Mainframe tracking data for user node terminal: {user?.email || "unknown_session@voxa.com"}</p>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`bg-[#08090e]/70 border border-gray-900 rounded-[20px] p-5 relative overflow-hidden shadow-lg ${stat.glow} group hover:border-gray-800 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-gray-600 tracking-widest uppercase block">// {stat.label}</span>
                  <h3 className="text-2xl font-black font-mono text-white tracking-tight">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-900/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>{stat.desc}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
      
        <div className="lg:col-span-8 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-6 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-900 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-black font-mono uppercase text-white tracking-widest">Active Order Pipeline</h4>
              </div>
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">Updated Realtime</span>
            </div>

           
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-gray-900 text-gray-600 text-[10px] tracking-wider uppercase">
                    <th className="pb-3 font-bold pl-2">Matrix_ID</th>
                    <th className="pb-3 font-bold">Timestamp</th>
                    <th className="pb-3 font-bold">Quantum_Total</th>
                    <th className="pb-3 font-bold text-right pr-2">Pipeline_State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/40">
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.01] transition-all">
                      <td className="py-3.5 font-bold text-gray-300 pl-2 group-hover:text-[#7c74ff] transition-colors">{order.id}</td>
                      <td className="py-3.5 text-gray-500">{order.date}</td>
                      <td className="py-3.5 text-white font-black">{order.total}</td>
                      <td className="py-3.5 text-right pr-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold tracking-widest ${
                          order.status === "PROCESSING" 
                            ? "bg-amber-950/40 border border-amber-500/30 text-amber-400" 
                            : "bg-emerald-950/40 border border-emerald-500/30 text-emerald-400"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="w-full mt-4 bg-black/40 border border-gray-900 hover:border-gray-800 text-gray-500 hover:text-white py-2.5 rounded-xl font-mono text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2">
            <RefreshCw className="w-3 h-3" /> FLUSH_AND_VIEW_ALL_ORDERS
          </button>
        </div>

       
        <div className="lg:col-span-4 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-6 backdrop-blur-md space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-black font-mono uppercase text-white tracking-widest">Node Encryption</h4>
          </div>

          <div className="space-y-3.5">
            <div className="p-3.5 bg-black/40 border border-gray-950 rounded-xl space-y-1">
              <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Identity Matrix Validation</span>
              <p className="text-[11px] font-mono text-gray-400 font-bold">2-Factor Handshake Active</p>
            </div>
            
            <div className="p-3.5 bg-black/40 border border-gray-950 rounded-xl space-y-1">
              <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Node IP Endpoint</span>
              <p className="text-[11px] font-mono text-indigo-400 font-bold tracking-wide">192.168.42.109 [SSL]</p>
            </div>

            <div className="p-3.5 bg-black/40 border border-gray-950 rounded-xl space-y-1">
              <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase block">Account Created Token</span>
              <p className="text-[11px] font-mono text-purple-400 font-bold truncate">Firebase_Auth_SHA256_Valid</p>
            </div>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3 text-[10px] font-mono text-emerald-500/80 leading-relaxed">
            Your centralized node data profile has been verified and encrypted via Firebase JWT matrix layer protocols.
          </div>
        </div>

      </div>

     
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; display: block; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default UserOverview;