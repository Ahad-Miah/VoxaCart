import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Heart, Wallet, ArrowUpRight, ShieldCheck, Clock, RefreshCw, Star } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell } from 'recharts';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';
import { Link } from 'react-router-dom';


const UserOverview = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({ cart: [], wish: [], orders: [] });

  useEffect(() => {
    if (user?.email) {
      const fetchData = async () => {
        try {
          const [cartRes, wishRes, orderRes] = await Promise.all([
            axios.get(`http://localhost:5000/cart/${user.email}`),
            axios.get(`http://localhost:5000/wishlist/${user.email}`),
            axios.get(`http://localhost:5000/orders/${user.email}`)
          ]);
          setData({ cart: cartRes.data, wish: wishRes.data, orders: orderRes.data });
        } catch (err) { console.error("Error", err); }
      };
      fetchData();
    }
  }, [user?.email]);

  // ক্যালকুলেশন
  const totalSpent = data.orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);
  
  const stats = [
    { label: "Cart Matrix Assets", value: `${data.cart.length} Items`, icon: ShoppingCart, color: "from-indigo-600 to-[#7c74ff]", glow: "shadow-indigo-500/10", desc: "Pending checkout resolution" },
    { label: "Wishlist Vault", value: `${data.wish.length} Saved`, icon: Heart, color: "from-purple-600 to-pink-500", glow: "shadow-purple-500/10", desc: "Monitored item price logs" },
    { label: "Total Value Invested", value: `৳ ${totalSpent}`, icon: Wallet, color: "from-emerald-600 to-teal-500", glow: "shadow-emerald-500/10", desc: "Lifetime transaction matrix" }
  ];

  const chartData = [
    { name: 'Orders', val: data.orders.length },
    { name: 'Cart', val: data.cart.length },
    { name: 'Wishlist', val: data.wish.length }
  ];

  return (
    <div className="space-y-8 select-none max-w-6xl mx-auto p-4">
      {/* হেডার */}
      <div className="bg-gradient-to-r from-[#08090e]/90 via-[#0e111a]/40 to-transparent border border-gray-900 rounded-[24px] p-6 relative overflow-hidden backdrop-blur-xl">
        <h2 className="text-xl md:text-3xl font-black font-mono text-white tracking-tight uppercase">
          Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c74ff] to-purple-400">{user?.displayName || "Operator_Node"}</span>
        </h2>
      </div>

      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((stat, idx) => {
  const Icon = stat.icon;
  
  // ড্যাশবোর্ড লেআউট অনুযায়ী পাথ সেট করা
  const getPath = (label) => {
    if (label.includes("Cart")) return "/dashboard/cart";
    if (label.includes("Wishlist")) return "/dashboard/wishlist";
    return "/dashboard/orders"; // Default
  };

  return (
    <Link to={getPath(stat.label)} key={idx} className="block group">
      <div className={`bg-[#08090e]/70 border border-gray-900 rounded-[20px] p-5 shadow-lg ${stat.glow} group-hover:border-indigo-500/50 transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-600 tracking-widest uppercase">// {stat.label}</span>
            <h3 className="text-2xl font-black font-mono text-white">{stat.value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
})}
      </div>

      {/* গ্রাফ এবং অর্ডার টেবিল */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* গ্রাফ সেকশন (নতুন যোগ করা হয়েছে) */}
        <div className="lg:col-span-4 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-6">
          <h4 className="text-xs font-black font-mono uppercase text-white mb-6">Activity Matrix</h4>
          <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#333" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                  <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                    {chartData.map((e, i) => <Cell key={i} fill={i === 0 ? '#10b981' : i === 1 ? '#6366f1' : '#f43f5e'} />)}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* অর্ডার টেবিল */}
        <div className="lg:col-span-8 bg-[#08090e]/50 border border-gray-900 rounded-[24px] p-6">
           <table className="w-full text-left font-mono text-xs">
             <thead><tr className="border-b border-gray-900 text-gray-600 uppercase"><th className="pb-3">Matrix_ID</th><th className="pb-3">Timestamp</th><th className="pb-3">Total</th><th className="pb-3 text-right">Status</th></tr></thead>
             <tbody>
               {data.orders.slice(0, 3).map((o, i) => (
                 <tr key={i} className="border-b border-gray-900/40">
                   <td className="py-3 text-gray-300">{o._id.slice(-6)}</td>
                   <td className="py-3 text-gray-500">{new Date().toLocaleDateString()}</td>
                   <td className="py-3 text-white font-black">৳ {o.price}</td>
                   <td className="py-3 text-right text-emerald-400">{o.status || 'PROCESSING'}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;