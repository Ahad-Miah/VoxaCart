import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Package, DollarSign, Target, Activity } from 'lucide-react';

// চার্ট মক ডাটা
const salesData = [
  { name: 'Jan', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 7000, orders: 45 },
  { name: 'Mar', revenue: 5000, orders: 30 },
  { name: 'Apr', revenue: 12000, orders: 75 },
  { name: 'May', revenue: 9000, orders: 58 },
  { name: 'Jun', revenue: 18000, orders: 94 },
];

const pieData = [
  { name: 'Hardware', value: 400 },
  { name: 'Peripherals', value: 300 },
  { name: 'LED Matrix', value: 200 },
];
const COLORS = ['#7c74ff', '#a855f7', '#06b6d4'];

const VendorStats = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto select-none font-mono">
     
      <div className="space-y-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
          VENDOR_CORE / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-cyan-400">ANALYTICS_MATRIX</span>
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider">Enterprise-level revenue visualization and operational metrics.</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Gross Revenue", value: "৳ 55,200", icon: DollarSign, color: "text-emerald-400" },
          { label: "Active Deployments", value: "42 Nodes", icon: Package, color: "text-[#7c74ff]" },
          { label: "Conversion Index", value: "+24.5%", icon: TrendingUp, color: "text-cyan-400" },
          { label: "Target Threshold", value: "88%", icon: Target, color: "text-purple-400" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#08090e]/70 border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all duration-300">
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

     
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
        <div className="lg:col-span-8 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-5">
            <Activity className="w-4 h-4 text-[#7c74ff]" />
            <h5 className="text-xs font-black uppercase text-white tracking-widest">Revenue Flow Line</h5>
          </div>
          <div className="h-64 text-[10px]">
            <ResponsiveContainer width="100%" h="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c74ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7c74ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip contentStyle={{ backgroundColor: '#08090e', borderColor: '#1f2937', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#7c74ff" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="lg:col-span-4 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-5">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <h5 className="text-xs font-black uppercase text-white tracking-widest">Category Load</h5>
            </div>
            <div className="h-44 flex justify-center items-center">
              <ResponsiveContainer width="100%" h="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#08090e', borderColor: '#1f2937', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
         
          <div className="space-y-1.5 pt-3 border-t border-gray-900/60">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[10px] items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  {item.name}
                </span>
                <span className="text-white font-bold">{item.value} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorStats;