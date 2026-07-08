import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ShieldAlert, Users, ShoppingBag, Landmark, Activity, Zap } from 'lucide-react';

const systemData = [
  { day: 'Mon', UserLoad: 240, Sales: 400 },
  { day: 'Tue', UserLoad: 350, Sales: 700 },
  { day: 'Wed', UserLoad: 600, Sales: 500 },
  { day: 'Thu', UserLoad: 420, Sales: 1100 },
  { day: 'Fri', UserLoad: 700, Sales: 900 },
  { day: 'Sat', UserLoad: 950, Sales: 1500 },
];

const AdminOverview = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none font-mono">
     
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          OVERLORD / <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">SYSTEM_OVERVIEW</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Global mainframe system infrastructure metrics and network data logs.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Global Users", value: "1,420 Nodes", icon: Users, color: "text-[#7c74ff]" },
          { label: "Active Vendors", value: "88 Entities", icon: Landmark, color: "text-amber-400" },
          { label: "Total Platform Sales", value: "৳ 4,82,000", icon: ShoppingBag, color: "text-emerald-400" },
          { label: "System Latency", value: "12 ms", icon: Zap, color: "text-cyan-400" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#08090e]/70 border border-gray-900 rounded-2xl p-5 relative overflow-hidden group hover:border-red-900/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">// {item.label}</span>
                <h4 className="text-xl font-black text-white tracking-tight">{item.value}</h4>
              </div>
              <div className={`p-2.5 bg-black/40 border border-gray-900 rounded-xl ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-5 backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-5">
          <Activity className="w-4 h-4 text-red-500 animate-pulse" />
          <h5 className="text-xs font-black uppercase text-white tracking-widest">Quantum System Load vs Conversion Ratio</h5>
        </div>
        <div className="h-72 text-[10px]">
          <ResponsiveContainer width="100%" h="100%">
            <BarChart data={systemData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#4b5563" />
              <YAxis stroke="#4b5563" />
              <Tooltip contentStyle={{ backgroundColor: '#08090e', borderColor: '#1f2937', color: '#fff' }} />
              <Bar dataKey="UserLoad" fill="#7c74ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Sales" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;