import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Cpu, TrendingUp, Package, DollarSign, PieChart as PieIcon, Layers } from 'lucide-react';
import { AuthContext } from '../../../../Provider/Authprovider/AuthProvider';

const VendorStats = () => {
  // const user?.email = "vendor@voxa.com";
  const {user}=useContext(AuthContext);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেজ থেকে ভেন্ডরের লাইভ প্রোডাক্ট ডাটা ফেচ করা
  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/myProduct/${user?.email}`);
        if (response.data) {
          setVendorProducts(response.data);
        }
      } catch (error) {
        console.error("Stats Page Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorProducts();
  }, [user]);

  // ২. লাইভ ডাটা থেকে ডাইনামিক ম্যাট্রিক্স ক্যালকুলেশন
  const totalProducts = vendorProducts.length;
  const totalStock = vendorProducts.reduce((sum, item) => sum + Number(item?.stock || 0), 0);
  const totalValue = vendorProducts.reduce((sum, item) => sum + (Number(item?.price || 0) * Number(item?.stock || 0)), 0);
  const optimizedCount = vendorProducts.filter(item => item?.aiOptimized).length;

  // ৩. ডাইনামিক PIE CHART DATA (ক্যাটাগরি অনুযায়ী প্রোডাক্ট কাউন্ট)
  const categoryCounts = vendorProducts.reduce((acc, product) => {
    const category = product?.category || 'General';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCounts).map(category => ({
    name: category,
    value: categoryCounts[category]
  }));

  // পাই চার্টের কালার প্যালেট
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  // ৪. ডাইনামিক SALES / PERFORMANCE CHART DATA
  // আপনার লাইভ প্রোডাক্টের প্রাইস ও স্টকের ওপর ভিত্তি করে একটি ডাইনামিক রেভিনিউ প্রজেকশন চার্ট
  const salesData = vendorProducts.slice(0, 6).map((product, index) => {
    const shortName = product?.name ? (product.name.split(' ')[0] || 'Item') : `Item ${index + 1}`;
    const price = Number(product?.price || 0);
    const stock = Number(product?.stock || 0);
    
    return {
      name: shortName.substring(0, 8), // বড় নাম হলে ট্রাঙ্কেট করার জন্য
      potentialRevenue: price * stock,
      stockValue: stock,
      price: price
    };
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#05060a] text-white p-8 flex items-center justify-center">
        <div className="space-y-3 text-center">
          <Cpu className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-widest text-purple-400 uppercase animate-pulse">Generating Statistics Matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white p-4 sm:p-6 md:p-8 font-sans relative overflow-hidden">
      {/* গ্লোবাল নিয়ন ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER */}
        <div className="pb-6 border-b border-gray-900">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-purple-500" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-purple-400 bg-clip-text text-transparent">
              Vendor Analytics Workbench
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time data visualization stream for: <span className="text-purple-400 font-mono font-bold">{user?.email}</span>
          </p>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0"><Layers className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Products</p>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">{totalProducts} Items</h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0"><Package className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Stock Inventory</p>
              <h3 className="text-lg sm:text-xl font-black text-blue-400 mt-0.5">{totalStock} Pcs</h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><DollarSign className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inventory Value</p>
              <h3 className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">${totalValue.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0"><Cpu className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AI Optimized</p>
              <h3 className="text-lg sm:text-xl font-black text-purple-300 mt-0.5">{optimizedCount} Items</h3>
            </div>
          </div>
        </div>

        {/* CHARTS WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LINE CHART: PRODUCT REVENUE PROJECTION */}
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl shadow-2xl lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">Product Potential Value Stream</h3>
              <p className="text-xs text-gray-500">Analysis of top inventory item value calculation (Price × Stock)</p>
            </div>
            <div className="h-72 w-full">
              {salesData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-600">No product metrics available</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111322" />
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} />
                    <YAxis stroke="#4b5563" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0e111c', borderColor: '#1f2937', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="potentialRevenue" name="Potential Revenue ($)" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="price" name="Unit Price ($)" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* PIE CHART: CATEGORY DISTRIBUTION */}
          <div className="bg-[#0a0c14] border border-gray-900 p-5 rounded-2xl shadow-2xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">Category Spread</h3>
              </div>
              <p className="text-xs text-gray-500">Live share of inventory categorized across store sections</p>
            </div>

            <div className="h-56 w-full relative flex items-center justify-center">
              {pieData.length === 0 ? (
                <div className="text-gray-600">No categories mapped</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0e111c', borderColor: '#1f2937', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {/* পাই চার্টের মাঝখানে টোটাল আইটেম কাউন্টার */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">{totalProducts}</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Total Types</span>
              </div>
            </div>

            {/* ডাইনামিক লিজেন্ড স্ক্রিন */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs font-semibold">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-gray-400 capitalize">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VendorStats;