import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { Users, ShoppingBag, Package, Star, TrendingUp } from 'lucide-react';

const COLORS = ['#7c74ff', '#5046e5', '#3b82f6', '#10b981', '#f59e0b'];

const AdminOverview = () => {
  const [data, setData] = useState({ users: [], orders: [], products: [], vendors: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, o, p, v] = await Promise.all([
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/orders'),
          axios.get('http://localhost:5000/products'),
          axios.get('http://localhost:5000/verified-vendors')
        ]);
        setData({ users: u.data, orders: o.data, products: p.data, vendors: v.data });
        setLoading(false);
      } catch (err) { console.error("API Error", err); setLoading(false); }
    };
    fetchData();
  }, []);

  // ক্যাটাগরি ডাটা
  const categoryCount = data.products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));

  // রেভিনিউ ডাটা (Orders এর ওপর ভিত্তি করে)
  const revenueData = data.orders.map((order, i) => ({
    name: `Order ${i + 1}`,
    amount: order.price || order.total || 0 // আপনার অর্ডারের ফিল্ড অনুযায়ী নাম ঠিক করে নিন
  }));

  if (loading) return <div className="text-white p-20 text-center text-xl font-bold">Loading System...</div>;

  return (
    <div className="bg-[#09090d] min-h-screen text-white p-4 md:p-8">
      <h1 className="text-3xl font-black italic mb-8">ADMIN <span className="text-[#7c74ff]">DASHBOARD</span></h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', val: data.users.length, icon: Users },
          { label: 'Total Orders', val: data.orders.length, icon: ShoppingBag },
          { label: 'Total Products', val: data.products.length, icon: Package },
          { label: 'Total Vendors', val: data.vendors.length, icon: Star },
        ].map((item, i) => (
          <div key={i} className="bg-[#11131c] border border-gray-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-[#7c74ff]/10 rounded-2xl"><item.icon className="text-[#7c74ff]" /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500">{item.label}</p>
              <p className="text-2xl font-black">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New Revenue Chart */}
      <div className="bg-[#11131c] border border-gray-800 p-6 rounded-3xl h-[300px] mb-8">
        <h2 className="text-sm font-bold mb-4 uppercase text-gray-400 flex items-center gap-2">
            <TrendingUp size={16}/> Revenue Overview
        </h2>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c74ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c74ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '10px' }} />
            <Area type="monotone" dataKey="amount" stroke="#7c74ff" fillOpacity={1} fill="url(#colorAmt)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#11131c] border border-gray-800 p-6 rounded-3xl h-[400px]">
          <h2 className="text-sm font-bold mb-4 uppercase text-gray-400">Category Distribution</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={chartData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '10px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#11131c] border border-gray-800 p-6 rounded-3xl h-[400px]">
          <h2 className="text-sm font-bold mb-4 uppercase text-gray-400">Products per Category</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '10px' }} />
              <Bar dataKey="value" fill="#7c74ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;